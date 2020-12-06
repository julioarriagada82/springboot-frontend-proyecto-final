import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { OcupacionDialogoComponent } from './ocupacion-dialogo/ocupacion-dialogo.component';
import { OcupacionService } from './../../_service/ocupacion.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { Ocupacion } from './../../_model/ocupacion';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-ocupacion',
  templateUrl: './ocupacion.component.html',
  styleUrls: ['./ocupacion.component.css']
})
export class OcupacionComponent implements OnInit {

  displayedColumns = ['id', 'nombre', 'acciones'];
  dataSource: MatTableDataSource<Ocupacion>;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true}) sort: MatSort;


  constructor(private ocupacionService: OcupacionService, private dialog: MatDialog, private snackBar: MatSnackBar, public route: ActivatedRoute) { }

  ngOnInit() {
     
    this.ocupacionService.ocupacionCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.ocupacionService.mensajeCambio.subscribe(data => {
        this.snackBar.open(data, 'AVISO', {
          duration: 2000,
        });
    });

    this.ocupacionService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  abrirDialogo(ocupacion? : Ocupacion) {
    let ocupa = ocupacion != null ? ocupacion : new Ocupacion();
    this.dialog.open(OcupacionDialogoComponent, {
      width: '250px',
      data: ocupa
    });
  }
  
  eliminar(ocupacion: Ocupacion) {
   this.ocupacionService.eliminar(ocupacion.idOcupacion).pipe(switchMap(() => {
     return this.ocupacionService.listar();
   })).subscribe(data => {
     this.ocupacionService.ocupacionCambio.next(data);
     this.ocupacionService.mensajeCambio.next('Se ELIMINO');
   });
  }
}