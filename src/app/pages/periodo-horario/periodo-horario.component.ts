import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { PeriodoHorarioService } from './../../_service/periodoHorario.service';
import { PeriodoHorarioDialogoComponent } from './periodo-horario-dialogo/periodo-horario-dialogo.component';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { PeriodoHorario } from './../../_model/periodoHorario';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-periodo-horario',
  templateUrl: './periodo-horario.component.html',
  styleUrls: ['./periodo-horario.component.css']
})
export class PeriodoHorarioComponent implements OnInit {

  displayedColumns = ['id', 'nombre', 'acciones'];
  dataSource: MatTableDataSource<PeriodoHorario>;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true}) sort: MatSort;


  constructor(private periodoHorarioService: PeriodoHorarioService, private dialog: MatDialog, private snackBar: MatSnackBar, public route: ActivatedRoute) { }

  ngOnInit() {
     
    this.periodoHorarioService.periodoHorarioCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.periodoHorarioService.mensajeCambio.subscribe(data => {
        this.snackBar.open(data, 'AVISO', {
          duration: 2000,
        });
    });

    this.periodoHorarioService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  abrirDialogo(periodoHorario? : PeriodoHorario) {
    let periodo = periodoHorario != null ? periodoHorario : new PeriodoHorario();
    this.dialog.open(PeriodoHorarioDialogoComponent, {
      width: '250px',
      data: periodo
    });
  }

  eliminar(periodoHorario: PeriodoHorario) {
   this.periodoHorarioService.eliminar(periodoHorario.idPeriodoHorario).pipe(switchMap(() => {
     return this.periodoHorarioService.listar();
   })).subscribe(data => {
     this.periodoHorarioService.periodoHorarioCambio.next(data);
     this.periodoHorarioService.mensajeCambio.next('Se ELIMINO');
   });
  }
}


