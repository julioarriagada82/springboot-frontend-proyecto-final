import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { IntegranteService } from './../../_service/integrante.service';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Integrante } from './../../_model/integrante';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-integrante',
  templateUrl: './integrante.component.html',
  styleUrls: ['./integrante.component.css']
})
export class IntegranteComponent implements OnInit {

  displayedColumns = ['id', 'nombre', 'acciones'];
  dataSource: MatTableDataSource<Integrante>;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true}) sort: MatSort;


  constructor(private integranteService: IntegranteService, private snackBar: MatSnackBar, public route: ActivatedRoute) { }

  ngOnInit() {
     
    this.integranteService.integranteCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.integranteService.mensajeCambio.subscribe(data => {
        this.snackBar.open(data, 'AVISO', {
          duration: 2000,
        });
    });

    this.integranteService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(integrante: Integrante) {
   this.integranteService.eliminar(integrante.idIntegrante).pipe(switchMap(() => {
     return this.integranteService.listar();
   })).subscribe(data => {
     this.integranteService.integranteCambio.next(data);
     this.integranteService.mensajeCambio.next('Se ELIMINO');
   });
  }
}

