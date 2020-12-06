import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { TipoCondominioService } from './../../_service/tipoCondominio.service';
import { TipoCondominioDialogoComponent } from './tipo-condominio-dialogo/tipo-condominio-dialogo.component';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { TipoCondominio } from './../../_model/tipoCondominio';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tipo-condominio',
  templateUrl: './tipo-condominio.component.html',
  styleUrls: ['./tipo-condominio.component.css']
})
export class TipoCondominioComponent implements OnInit {

  displayedColumns = ['id', 'nombre', 'acciones'];
  dataSource: MatTableDataSource<TipoCondominio>;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true}) sort: MatSort;


  constructor(private tipoCondominioService: TipoCondominioService, private dialog: MatDialog, private snackBar: MatSnackBar, public route: ActivatedRoute) { }

  ngOnInit() {
     
    this.tipoCondominioService.tipoCondominioCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.tipoCondominioService.mensajeCambio.subscribe(data => {
        this.snackBar.open(data, 'AVISO', {
          duration: 2000,
        });
    });

    this.tipoCondominioService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  abrirDialogo(tipoCondominio? : TipoCondominio) {
    let ocupa = tipoCondominio != null ? tipoCondominio : new TipoCondominio();
    this.dialog.open(TipoCondominioDialogoComponent, {
      width: '250px',
      data: ocupa
    });
  }

  eliminar(tipoCondominio: TipoCondominio) {
   this.tipoCondominioService.eliminar(tipoCondominio.idTipoCondominio).pipe(switchMap(() => {
     return this.tipoCondominioService.listar();
   })).subscribe(data => {
     this.tipoCondominioService.tipoCondominioCambio.next(data);
     this.tipoCondominioService.mensajeCambio.next('Se ELIMINO');
   });
  }
}

