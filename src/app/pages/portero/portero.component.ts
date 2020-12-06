import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { PorteroService } from './../../_service/portero.service';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Portero } from './../../_model/portero';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-portero',
  templateUrl: './portero.component.html',
  styleUrls: ['./portero.component.css']
})
export class PorteroComponent implements OnInit {

  displayedColumns = ['id', 'nombre', 'acciones'];
  dataSource: MatTableDataSource<Portero>;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true}) sort: MatSort;


  constructor(private porteroService: PorteroService, private snackBar: MatSnackBar, public route: ActivatedRoute) { }

  ngOnInit() {
     
    this.porteroService.porteroCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.porteroService.mensajeCambio.subscribe(data => {
        this.snackBar.open(data, 'AVISO', {
          duration: 2000,
        });
    });

    this.porteroService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(portero: Portero) {
   this.porteroService.eliminar(portero.idPortero).pipe(switchMap(() => {
     return this.porteroService.listar();
   })).subscribe(data => {
     this.porteroService.porteroCambio.next(data);
     this.porteroService.mensajeCambio.next('Se ELIMINO');
   });
  }
}


