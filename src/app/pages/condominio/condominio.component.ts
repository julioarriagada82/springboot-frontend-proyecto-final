import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { CondominioService } from './../../_service/condominio.service';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Condominio } from './../../_model/condominio';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-condominio',
  templateUrl: './condominio.component.html',
  styleUrls: ['./condominio.component.css']
})
export class CondominioComponent implements OnInit {

  displayedColumns = ['id', 'nombre', 'acciones'];
  dataSource: MatTableDataSource<Condominio>;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true}) sort: MatSort;


  constructor(private condominioService: CondominioService, private snackBar: MatSnackBar, public route: ActivatedRoute) { }

  ngOnInit() {
     
    this.condominioService.condominioCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.condominioService.mensajeCambio.subscribe(data => {
        this.snackBar.open(data, 'AVISO', {
          duration: 2000,
        });
    });

    this.condominioService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(condominio: Condominio) {
   this.condominioService.eliminar(condominio.idCondominio).pipe(switchMap(() => {
     return this.condominioService.listar();
   })).subscribe(data => {
     this.condominioService.condominioCambio.next(data);
     this.condominioService.mensajeCambio.next('Se ELIMINO');
   });
  }
}
