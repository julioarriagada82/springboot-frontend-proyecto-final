import { ParentescoService } from '../../../_service/parentesco.service';
import { Parentesco } from '../../../_model/parentesco';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-parentesco-dialogo',
  templateUrl: './parentesco-dialogo.component.html',
  styleUrls: ['./parentesco-dialogo.component.css']
})
export class ParentescoDialogoComponent implements OnInit {

  parentesco: Parentesco;

  constructor(
   private dialogRef: MatDialogRef<ParentescoDialogoComponent>,
   @Inject(MAT_DIALOG_DATA) private data: Parentesco,
   private parentescoService: ParentescoService
  ) { }

  ngOnInit() {
    this.parentesco = new Parentesco();
    this.parentesco.idParentesco = this.data.idParentesco;
    this.parentesco.nombre = this.data.nombre;
  }

  operar() {
    if(this.parentesco != null && this.parentesco.idParentesco > 0) {
      // BUENA PRÁCTICA AVANZADA
      this.parentescoService.modificar(this.parentesco).pipe(switchMap(() => {
        return this.parentescoService.listar();
      })).subscribe(data => {
        this.parentescoService.parentescoCambio.next(data);
        this.parentescoService.mensajeCambio.next('SE MODIFICO');
      });
    } else {
      //PRÁCTICA BUENA Y MAS COMÚN
      this.parentescoService.registrar(this.parentesco).subscribe( () => {
        this.parentescoService.listar().subscribe(data => {
          this.parentescoService.parentescoCambio.next(data);
          this.parentescoService.mensajeCambio.next('SE REGISTRO');
        });
      });
    }
    this.dialogRef.close();
  }

  cancelar() {
    this.dialogRef.close();
  }
}

