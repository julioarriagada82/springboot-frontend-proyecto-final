import { ActivatedRoute, Router, Params } from '@angular/router';
import { ListaNegraService } from './../../../_service/listaNegra.service';
import { CasaService } from './../../../_service/casa.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ListaNegra } from './../../../_model/listaNegra';
import { Casa } from './../../../_model/casa';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-lista-negra-edicion',
  templateUrl: './lista-negra-edicion.component.html',
  styleUrls: ['./lista-negra-edicion.component.css']
})
export class ListaNegraEdicionComponent implements OnInit {

  casas: Casa[] = [];
  casaSeleccionado: Casa;

  id: number; 
  listaNegra: ListaNegra;
  form: FormGroup;
  edicion: boolean = false;

  constructor(private listaNegraService: ListaNegraService,private casaService: CasaService, private route: ActivatedRoute, private router: Router) {   
  }

  ngOnInit() {

    this.listaNegra = new ListaNegra();

    this.form = new FormGroup({
      'id': new FormControl(0),
      'casa': new FormControl(),
      'rut': new FormControl(''),
      'nombre': new FormControl(''),
      'paterno': new FormControl(''),
      'materno': new FormControl(''),
      'motivo': new FormControl(''),
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];

      this.edicion = params['id'] != null;
      this.initForm();
    });

    this.listarCasas();
  }
  
  listarCasas() {
    this.casaService.listar().subscribe(data => {
      this.casas = data;
    });
  }

  initForm() {
    if(this.edicion) {
      this.listaNegraService.listarPorId(this.id).subscribe(data => {
        let id = data.idListaNegra;
        let rut = data.rutListaNegra;
        let nombre = data.nombreListaNegra;
        let paterno = data.paternoListaNegra;
        let materno = data.maternoListaNegra;
        let motivo = data.motivoListaNegra;

        this.form = new FormGroup({
          'id': new FormControl(id),
          'rut': new FormControl(rut),
          'nombre': new FormControl(nombre),
          'paterno': new FormControl(paterno),
          'materno': new FormControl(materno),
          'motivo': new FormControl(motivo)
        });
      });
    }
  }

  operar() {

    this.listaNegra.idListaNegra = this.form.value['id'];
    this.listaNegra.casa = this.casaSeleccionado;
    this.listaNegra.rutListaNegra = this.form.value['rut'];
    this.listaNegra.nombreListaNegra = this.form.value['nombre'];
    this.listaNegra.paternoListaNegra = this.form.value['paterno'];
    this.listaNegra.maternoListaNegra = this.form.value['materno'];
    this.listaNegra.motivoListaNegra = this.form.value['motivo'];

    if(this.listaNegra != null && this.listaNegra.idListaNegra > 0) {
      //BUENA PRÁCTICA AVANZADA
      this.listaNegraService.modificar(this.listaNegra).pipe(switchMap(() => {
        return this.listaNegraService.listar();
      })).subscribe(data => {
        this.listaNegraService.listaNegraCambio.next(data);
        this.listaNegraService.mensajeCambio.next('SE MODIFICO');
      });
    } else {
      //PRÁCTICA COMÚN
      this.listaNegraService.registrar(this.listaNegra).subscribe(data => {
        this.listaNegraService.listar().subscribe(especialidad => {
          this.listaNegraService.listaNegraCambio.next(especialidad);
          this.listaNegraService.mensajeCambio.next('SE REGISTRO');
        });
      });
    }
    this.router.navigate(['lista-negra']);
  }
}
