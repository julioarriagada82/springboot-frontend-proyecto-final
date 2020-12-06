import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ListaNegraService } from './../../_service/listaNegra.service';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { ListaNegra } from './../../_model/listaNegra';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-lista-negra',
  templateUrl: './lista-negra.component.html',
  styleUrls: ['./lista-negra.component.css']
})
export class ListaNegraComponent implements OnInit {

  displayedColumns = ['id', 'nombre', 'acciones'];
  dataSource: MatTableDataSource<ListaNegra>;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true}) sort: MatSort;


  constructor(private listaNegraService: ListaNegraService, private snackBar: MatSnackBar, public route: ActivatedRoute) { }

  ngOnInit() {
     
    this.listaNegraService.listaNegraCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.listaNegraService.mensajeCambio.subscribe(data => {
        this.snackBar.open(data, 'AVISO', {
          duration: 2000,
        });
    });

    this.listaNegraService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(listaNegra: ListaNegra) {
   this.listaNegraService.eliminar(listaNegra.idListaNegra).pipe(switchMap(() => {
     return this.listaNegraService.listar();
   })).subscribe(data => {
     this.listaNegraService.listaNegraCambio.next(data);
     this.listaNegraService.mensajeCambio.next('Se ELIMINO');
   });
  }
}


