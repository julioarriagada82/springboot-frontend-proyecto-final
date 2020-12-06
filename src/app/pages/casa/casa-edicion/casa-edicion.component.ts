import { ActivatedRoute, Router, Params } from '@angular/router';
import { CasaService } from './../../../_service/casa.service';
import { CondominioService } from './../../../_service/condominio.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Casa } from './../../../_model/casa';
import { Condominio } from './../../../_model/condominio';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-casa-edicion',
  templateUrl: './casa-edicion.component.html',
  styleUrls: ['./casa-edicion.component.css']
})
export class CasaEdicionComponent implements OnInit {

  condominios: Condominio[] = [];
  condominioSeleccionado: Condominio;

  id: number; 
  casa: Casa;
  form: FormGroup;
  edicion: boolean = false;

  constructor(private casaService: CasaService,private condominioService: CondominioService, private route: ActivatedRoute, private router: Router) {   
  }

  ngOnInit() {

    this.casa = new Casa();

    this.form = new FormGroup({
      'id': new FormControl(0),
      'condominio': new FormControl(),
      'nombre': new FormControl(''),
      'direccion': new FormControl(''),
      'telefono': new FormControl(''),
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];

      this.edicion = params['id'] != null;
      this.initForm();
    });

    this.listarCondominios();
  }
  
  listarCondominios() {
    this.condominioService.listar().subscribe(data => {
      this.condominios = data;
    });
  }

  initForm() {
    if(this.edicion) {
      this.casaService.listarPorId(this.id).subscribe(data => {
        let id = data.idCasa;
        let nombre = data.nombreCasa;
        let direccion = data.direccionCasa;
        let telefono = data.telefonoCasa;

        this.form = new FormGroup({
          'id': new FormControl(id),
          'nombre': new FormControl(nombre),
          'direccion': new FormControl(direccion),
          'telefono': new FormControl(telefono)
        });
      });
    }
  }

  operar() {

    this.casa.idCasa = this.form.value['id'];
    this.casa.condominio = this.form.value['condominio'];
    this.casa.nombreCasa = this.form.value['nombre'];
    this.casa.direccionCasa = this.form.value['direccion'];
    this.casa.telefonoCasa = this.form.value['telefono'];

    if(this.casa != null && this.casa.idCasa > 0) {
      //BUENA PRÁCTICA AVANZADA
      this.casaService.modificar(this.casa).pipe(switchMap(() => {
        return this.casaService.listar();
      })).subscribe(data => {
        this.casaService.casaCambio.next(data);
        this.casaService.mensajeCambio.next('SE MODIFICO');
      });
    } else {
      //PRÁCTICA COMÚN
      this.casaService.registrar(this.casa).subscribe(data => {
        this.casaService.listar().subscribe(especialidad => {
          this.casaService.casaCambio.next(especialidad);
          this.casaService.mensajeCambio.next('SE REGISTRO');
        });
      });
    }
    this.router.navigate(['casa']);
  }
}

