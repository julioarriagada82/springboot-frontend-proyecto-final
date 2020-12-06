import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { CasaService } from './../../_service/casa.service';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Casa } from './../../_model/casa';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-casa',
  templateUrl: './casa.component.html',
  styleUrls: ['./casa.component.css']
})
export class CasaComponent implements OnInit {

  displayedColumns = ['id', 'nombre', 'acciones'];
  dataSource: MatTableDataSource<Casa>;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true}) sort: MatSort;


  constructor(private casaService: CasaService, private snackBar: MatSnackBar, public route: ActivatedRoute) { }

  ngOnInit() {
     
    this.casaService.casaCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.casaService.mensajeCambio.subscribe(data => {
        this.snackBar.open(data, 'AVISO', {
          duration: 2000,
        });
    });

    this.casaService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(casa: Casa) {
   this.casaService.eliminar(casa.idCasa).pipe(switchMap(() => {
     return this.casaService.listar();
   })).subscribe(data => {
     this.casaService.casaCambio.next(data);
     this.casaService.mensajeCambio.next('Se ELIMINO');
   });
  }
}
