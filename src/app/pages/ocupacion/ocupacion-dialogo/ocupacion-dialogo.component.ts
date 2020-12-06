import { OcupacionService } from '../../../_service/ocupacion.service';
import { Ocupacion } from '../../../_model/ocupacion';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-ocupacion-dialogo',
  templateUrl: './ocupacion-dialogo.component.html',
  styleUrls: ['./ocupacion-dialogo.component.css']
})
export class OcupacionDialogoComponent implements OnInit {

  ocupacion: Ocupacion;

  constructor(
   private dialogRef: MatDialogRef<OcupacionDialogoComponent>,
   @Inject(MAT_DIALOG_DATA) private data: Ocupacion,
   private ocupacionService: OcupacionService
  ) { }

  ngOnInit() {
    this.ocupacion = new Ocupacion();
    this.ocupacion.idOcupacion = this.data.idOcupacion;
    this.ocupacion.nombre = this.data.nombre;
  }

  operar() {
    if(this.ocupacion != null && this.ocupacion.idOcupacion > 0) {
      // BUENA PRÁCTICA AVANZADA
      this.ocupacionService.modificar(this.ocupacion).pipe(switchMap(() => {
        return this.ocupacionService.listar();
      })).subscribe(data => {
        this.ocupacionService.ocupacionCambio.next(data);
        this.ocupacionService.mensajeCambio.next('SE MODIFICO');
      });
    } else {
      //PRÁCTICA BUENA Y MAS COMÚN
      this.ocupacionService.registrar(this.ocupacion).subscribe( () => {
        this.ocupacionService.listar().subscribe(data => {
          this.ocupacionService.ocupacionCambio.next(data);
          this.ocupacionService.mensajeCambio.next('SE REGISTRO');
        });
      });
    }
    this.dialogRef.close();
  }

  cancelar() {
    this.dialogRef.close();
  }
}

