import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule} from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MapaComponent } from './mapa/mapa.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { HomeComponent } from './home/home.component';
import { ProyectoPageComponent } from './proyecto-page/proyecto-page.component';
import { ProyectosComponent } from './editar-db/proyectos/proyectos.component';

import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import { environment } from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './editar-db/login/login.component';
import { RegisterComponent } from './editar-db/register/register.component';
import { SendEmailComponent } from './editar-db/send-email/send-email.component';
import { ResetPassComponent } from './editar-db/reset-pass/reset-pass.component';
import {AuthService} from './editar-db/auth/auth.service';
import {CanEditGuard} from './editar-db/auth/can-edit.guard';
import { NuevoProyectoComponent } from './formularios/nuevo-proyecto/nuevo-proyecto.component';
import { EditarComponent } from './formularios/editar/editar.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    MapaComponent,
    HomeComponent,
    ProyectoPageComponent,
    ProyectosComponent,
    LoginComponent,
    RegisterComponent,
    SendEmailComponent,
    ResetPassComponent,
    NuevoProyectoComponent,
    EditarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    AngularFireAuthModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    HttpClientModule,
  ],
  exports:[],
  providers: [AuthService, CanEditGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
