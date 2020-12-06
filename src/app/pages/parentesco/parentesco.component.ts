import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ParentescoService } from './../../_service/parentesco.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { Parentesco } from './../../_model/parentesco';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ParentescoDialogoComponent } from './parentesco-dialogo/parentesco-dialogo.component';

@Component({
  selector: 'app-parentesco',
  templateUrl: './parentesco.component.html',
  styleUrls: ['./parentesco.component.css']
})
export class ParentescoComponent implements OnInit {

  displayedColumns = ['id', 'nombre', 'acciones'];
  dataSource: MatTableDataSource<Parentesco>;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true}) sort: MatSort;


  constructor(private parentescoService: ParentescoService, private dialog: MatDialog, private snackBar: MatSnackBar, public route: ActivatedRoute) { }

  ngOnInit() {
     
    this.parentescoService.parentescoCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.parentescoService.mensajeCambio.subscribe(data => {
        this.snackBar.open(data, 'AVISO', {
          duration: 2000,
        });
    });

    this.parentescoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  abrirDialogo(parentesco? : Parentesco) {
    let parent = parentesco != null ? parentesco : new Parentesco();
    this.dialog.open(ParentescoDialogoComponent, {
      width: '250px',
      data: parent
    });
  }

  eliminar(parentesco: Parentesco) {
   this.parentescoService.eliminar(parentesco.idParentesco).pipe(switchMap(() => {
     return this.parentescoService.listar();
   })).subscribe(data => {
     this.parentescoService.parentescoCambio.next(data);
     this.parentescoService.mensajeCambio.next('Se ELIMINO');
   });
  }
}