import { ActivatedRoute, Router, Params } from '@angular/router';
import { CondominioService } from './../../../_service/condominio.service';
import { TipoCondominioService } from './../../../_service/tipoCondominio.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Condominio } from './../../../_model/condominio';
import { TipoCondominio } from './../../../_model/tipoCondominio';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-condominio-edicion',
  templateUrl: './condominio-edicion.component.html',
  styleUrls: ['./condominio-edicion.component.css']
})
export class CondominioEdicionComponent implements OnInit {

  tipoCondominios: TipoCondominio[] = [];
  tipoCondominioSeleccionado: TipoCondominio;

  id: number; 
  condominio: Condominio;
  form: FormGroup;
  edicion: boolean = false;

  constructor(private condominioService: CondominioService,private tipoCondominioService: TipoCondominioService, private route: ActivatedRoute, private router: Router) {   
  }

  ngOnInit() {

    this.condominio = new Condominio();

    this.form = new FormGroup({
      'id': new FormControl(0),
      'tipoCondominio': new FormControl(),
      'nombre': new FormControl(''),
      'descripcion': new FormControl(''),
      'direccion': new FormControl(''),
      'url': new FormControl(''),
      'telefono': new FormControl(''),
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];

      this.edicion = params['id'] != null;
      this.initForm();
    });

    this.listarTipoCondominios();
  }
  
  listarTipoCondominios() {
    this.tipoCondominioService.listar().subscribe(data => {
      this.tipoCondominios = data;
    });
  }

  initForm() {
    if(this.edicion) {
      this.condominioService.listarPorId(this.id).subscribe(data => {
        let id = data.idCondominio;
        let nombre = data.nombreCondominio;
        let descripcion = data.descripcionCondominio;
        let direccion = data.direccionCondominio;
        let url = data.urlCondominio;
        let telefono = data.telefonoCondominio;

        this.form = new FormGroup({
          'id': new FormControl(id),
          'nombre': new FormControl(nombre),
          'descripcion': new FormControl(descripcion),
          'direccion': new FormControl(direccion),
          'url': new FormControl(url),
          'telefono': new FormControl(telefono)
        });
      });
    }
  }

  operar() {

    this.condominio.idCondominio = this.form.value['id'];
    this.condominio.tipoCondominio = this.form.value['tipoCondominio'];
    this.condominio.nombreCondominio = this.form.value['nombre'];
    this.condominio.descripcionCondominio = this.form.value['descripcion'];
    this.condominio.direccionCondominio = this.form.value['direccion'];
    this.condominio.urlCondominio = this.form.value['url'];
    this.condominio.telefonoCondominio = this.form.value['telefono'];

    if(this.condominio != null && this.condominio.idCondominio > 0) {
      //BUENA PRÁCTICA AVANZADA
      this.condominioService.modificar(this.condominio).pipe(switchMap(() => {
        return this.condominioService.listar();
      })).subscribe(data => {
        this.condominioService.condominioCambio.next(data);
        this.condominioService.mensajeCambio.next('SE MODIFICO');
      });
    } else {
      //PRÁCTICA COMÚN
      this.condominioService.registrar(this.condominio).subscribe(data => {
        this.condominioService.listar().subscribe(especialidad => {
          this.condominioService.condominioCambio.next(especialidad);
          this.condominioService.mensajeCambio.next('SE REGISTRO');
        });
      });
    }
    this.router.navigate(['condominio']);
  }
}
