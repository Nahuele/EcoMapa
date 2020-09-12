import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CamposFormulario} from '../campos-formulario';
import {FormArray, FormBuilder} from '@angular/forms';
import {ProyectoService} from '../../editar-db/proyecto.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {AuthService} from '../../editar-db/auth/auth.service';
import {filter, skip} from 'rxjs/operators';
import {AlertComponent} from 'ngx-bootstrap/alert';
import {BehaviorSubject, Subject} from 'rxjs';

@Component({
  selector: 'app-nuevo-proyecto',
  templateUrl: './nuevo-proyecto.component.html',
  styleUrls: ['./nuevo-proyecto.component.scss']
})



export class NuevoProyectoComponent implements OnInit, OnDestroy {

  @Input() userUidEdit;
  // public projId: string;
  @Input() projobj;
  public formProyecto;
  public userUid$ = new BehaviorSubject('');
  public formProyectoFinal;

  public alerta = false;

  alerts: any[] = [{
    type: 'success',
    msg: `Gracias! se ha agregado el proyecto a la base de datos`,
    timeout: 3000
  }];


  constructor(private formBuilder: FormBuilder,
              public proyectoService: ProyectoService,
              private modalService: BsModalService,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.userUid$.next( this.authService.userid);
    }



  registerForm = this.formBuilder.group({
    projectid: [''], //, [Validators.required, Validators.minLength(6)]],
    email: [''], // , [Validators.required, Validators.email]],
    tipo_enfoque: [''], //, Validators.required],
    nombre: [''],
    enfoque: [''],
    institucion: [''],
    titulo_extendido: [''],
    descripcion: [''],
    resumen: [''],
    tipo_estudio: [''],
    redes_sociales: this.formBuilder.group({
      facebook: [''],
      instagram: [''],
      twitter: [''],
      youtube: [''],
      researchgate: [''],
    }),
    pais: [''],
    provincia: [''],
    ciudad: [''],
    estado_actual: [''],
    coordenadas: this.formBuilder.array([]), // , Validators.required
    ano_inicio: [''],
    web: [''],
    tipo_sitio: [''],
    resultados: [''],
    linksvideos: this.formBuilder.array([]),
    personal: this.formBuilder.array([]),
    especies: this.formBuilder.array([])

  });

  submit() {
    let formProyectoFinal = {};
    // 2) Nested: actualizar el objeto final
    formProyectoFinal['detalles'] = this.removeEmptyFields(this.registerForm.value);
    formProyectoFinal['userUid'] = this.userUid$.value;
    console.log('detalles',formProyectoFinal);

    this.proyectoService.addProject(formProyectoFinal);
    this.alerta = true;
    window.scrollTo(0, 0);
    this.ngOnDestroy();
  }

  removeEmptyFields(obj) {
    return JSON.parse(JSON.stringify(obj, (key, value) => {
      return (value === null ? undefined : value === '' ? undefined : value.length === 0 ? undefined : value);
    }));
  }

  get email() {
    return this.registerForm.get('email');
  }

  get linksvideos() {
    return this.registerForm.get('linksvideos') as FormArray;
  }

  get personal() {
    return this.registerForm.get('personal') as FormArray;
  }
  get coordenadas() {
    return this.registerForm.get('coordenadas') as FormArray;
  }

  get especies() {
    return this.registerForm.get('especies') as FormArray;
  }

  borrarForm() {
    this.registerForm.reset();
    this.linksvideos.controls.splice(0, this.linksvideos.length);
    // this.especies.controls.splice(0,this.especies.length);
    this.personal.controls.splice(0, this.personal.length);
    window.scrollTo(0, 0);
  }

  agregarvideos() {
    let linksFormGroup = this.formBuilder.group({
      link:             '',
      descripcionvideo: '',
    });
    this.linksvideos.push(linksFormGroup);
  }
  // 3) Nested: funcion general que sirve para cualquier nested
  removerItem(indice: number, asignarForm: string, target: string,) {
   if (target === 'current' && indice !== -1) {
      if (asignarForm === 'videos') {
        this.linksvideos.removeAt(indice);
      } else if (asignarForm === 'especies') {
        this.especies.removeAt(indice);
        // this.listasppFromDB.splice(indice, 1);
      } else if (asignarForm === 'personal') {
        this.personal.removeAt(indice);
      } else if (asignarForm === 'coordenadas') {
        this.coordenadas.removeAt(indice);
      }
    }
  }

  agregarPersonal() {
    let personalFormGroup = this.formBuilder.group({
      nombre_personal: '',
      apellido_personal: '',
      rol: '',
      genero: '',
      fecha_nacimiento: '',
      pais_residencia: '',
      provincia_residencia: '',
      email_personal: [''], // , Validators.email
      redes_sociales_personal: this.formBuilder.group({
        facebook_personal: [''],
        instagram_personal: [''],
        twitter_personal: [''],
        youtube_personal: [''],
        researchgate_personal: [''],
      })
    });
    this.personal.push(personalFormGroup);
  }

  agregarEspecie() {
    let especiesFormGroup = this.formBuilder.group({
      spob: [''],
      nombre_vulgar: [''],
      tso: ['']
    });
    this.especies.push(especiesFormGroup);
  }

  agregarCoordenadas() {
    let coordenadasFormGroup = this.formBuilder.group({
      latitud: [''],
      longitud: ['']
    });
    this.coordenadas.push(coordenadasFormGroup);
  }


  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
    this.alerta = false;
  }

  ngOnDestroy() {
    this.projobj = null;
    this.formProyecto = null;
    this.registerForm.reset();
  }

}