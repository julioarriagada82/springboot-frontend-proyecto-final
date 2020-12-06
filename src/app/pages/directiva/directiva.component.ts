import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { DirectivaService } from './../../_service/directiva.service';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Directiva } from './../../_model/directiva';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent implements OnInit {

  displayedColumns = ['id', 'nombre', 'acciones'];
  dataSource: MatTableDataSource<Directiva>;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true}) sort: MatSort;


  constructor(private directivaService: DirectivaService, private snackBar: MatSnackBar, public route: ActivatedRoute) { }

  ngOnInit() {
     
    this.directivaService.directivaCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.directivaService.mensajeCambio.subscribe(data => {
        this.snackBar.open(data, 'AVISO', {
          duration: 2000,
        });
    });

    this.directivaService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(directiva: Directiva) {
   this.directivaService.eliminar(directiva.idDirectiva).pipe(switchMap(() => {
     return this.directivaService.listar();
   })).subscribe(data => {
     this.directivaService.directivaCambio.next(data);
     this.directivaService.mensajeCambio.next('Se ELIMINO');
   });
  }
}
