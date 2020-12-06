import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { HorarioTurnoService } from './../../_service/horarioTurno.service';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { HorarioTurno } from './../../_model/horarioTurno';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-horario-turno',
  templateUrl: './horario-turno.component.html',
  styleUrls: ['./horario-turno.component.css']
})
export class HorarioTurnoComponent implements OnInit {

  displayedColumns = ['id', 'nombre', 'acciones'];
  dataSource: MatTableDataSource<HorarioTurno>;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true}) sort: MatSort;


  constructor(private horarioTurnoService: HorarioTurnoService, private snackBar: MatSnackBar, public route: ActivatedRoute) { }

  ngOnInit() {
     
    this.horarioTurnoService.horarioTurnoCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.horarioTurnoService.mensajeCambio.subscribe(data => {
        this.snackBar.open(data, 'AVISO', {
          duration: 2000,
        });
    });

    this.horarioTurnoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(horarioTurno: HorarioTurno) {
   this.horarioTurnoService.eliminar(horarioTurno.idHorarioTurno).pipe(switchMap(() => {
     return this.horarioTurnoService.listar();
   })).subscribe(data => {
     this.horarioTurnoService.horarioTurnoCambio.next(data);
     this.horarioTurnoService.mensajeCambio.next('Se ELIMINO');
   });
  }
}

