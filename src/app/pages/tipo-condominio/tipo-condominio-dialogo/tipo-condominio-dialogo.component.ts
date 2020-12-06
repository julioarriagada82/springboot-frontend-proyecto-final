import { TipoCondominioService } from '../../../_service/tipoCondominio.service';
import { TipoCondominio } from '../../../_model/tipoCondominio';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-tipo-condominio-dialogo',
  templateUrl: './tipo-condominio-dialogo.component.html',
  styleUrls: ['./tipo-condominio-dialogo.component.css']
})
export class TipoCondominioDialogoComponent implements OnInit {

  tipoCondominio: TipoCondominio;

  constructor(
   private dialogRef: MatDialogRef<TipoCondominioDialogoComponent>,
   @Inject(MAT_DIALOG_DATA) private data: TipoCondominio,
   private tipoCondominioService: TipoCondominioService
  ) { }

  ngOnInit() {
    this.tipoCondominio = new TipoCondominio();
    this.tipoCondominio.idTipoCondominio = this.data.idTipoCondominio;
    this.tipoCondominio.nombre = this.data.nombre;
  }

  operar() {
    if(this.tipoCondominio != null && this.tipoCondominio.idTipoCondominio > 0) {
      // BUENA PRÁCTICA AVANZADA
      this.tipoCondominioService.modificar(this.tipoCondominio).pipe(switchMap(() => {
        return this.tipoCondominioService.listar();
      })).subscribe(data => {
        this.tipoCondominioService.tipoCondominioCambio.next(data);
        this.tipoCondominioService.mensajeCambio.next('SE MODIFICO');
      });
    } else {
      //PRÁCTICA BUENA Y MAS COMÚN
      this.tipoCondominioService.registrar(this.tipoCondominio).subscribe( () => {
        this.tipoCondominioService.listar().subscribe(data => {
          this.tipoCondominioService.tipoCondominioCambio.next(data);
          this.tipoCondominioService.mensajeCambio.next('SE REGISTRO');
        });
      });
    }
    this.dialogRef.close();
  }

  cancelar() {
    this.dialogRef.close();
  }
}

