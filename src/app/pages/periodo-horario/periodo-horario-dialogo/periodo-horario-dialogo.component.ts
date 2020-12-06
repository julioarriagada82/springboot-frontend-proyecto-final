import { PeriodoHorarioService } from '../../../_service/periodoHorario.service';
import { PeriodoHorario } from '../../../_model/periodoHorario';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-periodo-horario-dialogo',
  templateUrl: './periodo-horario-dialogo.component.html',
  styleUrls: ['./periodo-horario-dialogo.component.css']
})
export class PeriodoHorarioDialogoComponent implements OnInit {

  periodoHorario: PeriodoHorario;

  constructor(
   private dialogRef: MatDialogRef<PeriodoHorarioDialogoComponent>,
   @Inject(MAT_DIALOG_DATA) private data: PeriodoHorario,
   private periodoHorarioService: PeriodoHorarioService
  ) { }

  ngOnInit() {
    this.periodoHorario = new PeriodoHorario();
    this.periodoHorario.idPeriodoHorario = this.data.idPeriodoHorario;
    this.periodoHorario.nombrePeriodoHorario = this.data.nombrePeriodoHorario;

    console.log(this.periodoHorario.nombrePeriodoHorario);
  }

  operar() {
    if(this.periodoHorario != null && this.periodoHorario.idPeriodoHorario > 0) {
      // BUENA PRÁCTICA AVANZADA
      this.periodoHorarioService.modificar(this.periodoHorario).pipe(switchMap(() => {
        return this.periodoHorarioService.listar();
      })).subscribe(data => {
        this.periodoHorarioService.periodoHorarioCambio.next(data);
        this.periodoHorarioService.mensajeCambio.next('SE MODIFICO');
      });
    } else {
      //PRÁCTICA BUENA Y MAS COMÚN
      this.periodoHorarioService.registrar(this.periodoHorario).subscribe( () => {
        this.periodoHorarioService.listar().subscribe(data => {
          this.periodoHorarioService.periodoHorarioCambio.next(data);
          this.periodoHorarioService.mensajeCambio.next('SE REGISTRO');
        });
      });
    }
    this.dialogRef.close();
  }

  cancelar() {
    this.dialogRef.close();
  }
}

