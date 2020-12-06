import { CargoService } from '../../../_service/cargo.service';
import { Cargo } from '../../../_model/cargo';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cargo-dialogo',
  templateUrl: './cargo-dialogo.component.html',
  styleUrls: ['./cargo-dialogo.component.css']
})
export class CargoDialogoComponent implements OnInit {

  cargo: Cargo;

  constructor(
   private dialogRef: MatDialogRef<CargoDialogoComponent>,
   @Inject(MAT_DIALOG_DATA) private data: Cargo,
   private cargoService: CargoService
  ) { }

  ngOnInit() {
    this.cargo = new Cargo();
    this.cargo.idCargo = this.data.idCargo;
    this.cargo.nombre = this.data.nombre;
  }

  operar() {
    if(this.cargo != null && this.cargo.idCargo > 0) {
      // BUENA PRÁCTICA AVANZADA
      this.cargoService.modificar(this.cargo).pipe(switchMap(() => {
        return this.cargoService.listar();
      })).subscribe(data => {
        this.cargoService.cargoCambio.next(data);
        this.cargoService.mensajeCambio.next('SE MODIFICO');
      });
    } else {
      //PRÁCTICA BUENA Y MAS COMÚN
      this.cargoService.registrar(this.cargo).subscribe( () => {
        this.cargoService.listar().subscribe(data => {
          this.cargoService.cargoCambio.next(data);
          this.cargoService.mensajeCambio.next('SE REGISTRO');
        });
      });
    }
    this.dialogRef.close();
  }

  cancelar() {
    this.dialogRef.close();
  }
}

