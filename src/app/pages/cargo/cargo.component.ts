import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { CargoDialogoComponent } from './cargo-dialogo/cargo-dialogo.component';
import { CargoService } from './../../_service/cargo.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { Cargo } from './../../_model/cargo';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.css']
})
export class CargoComponent implements OnInit {

  displayedColumns = ['id', 'nombre', 'acciones'];
  dataSource: MatTableDataSource<Cargo>;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true}) sort: MatSort;


  constructor(private cargoService: CargoService, private dialog: MatDialog, private snackBar: MatSnackBar, public route: ActivatedRoute) { }

  ngOnInit() {
     
    this.cargoService.cargoCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.cargoService.mensajeCambio.subscribe(data => {
        this.snackBar.open(data, 'AVISO', {
          duration: 2000,
        });
    });

    this.cargoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  abrirDialogo(cargo? : Cargo) {
    let carg = cargo != null ? cargo : new Cargo();
    this.dialog.open(CargoDialogoComponent, {
      width: '250px',
      data: carg
    });
  }

  eliminar(cargo: Cargo) {
   this.cargoService.eliminar(cargo.idCargo).pipe(switchMap(() => {
     return this.cargoService.listar();
   })).subscribe(data => {
     this.cargoService.cargoCambio.next(data);
     this.cargoService.mensajeCambio.next('Se ELIMINO');
   });
  }
}
