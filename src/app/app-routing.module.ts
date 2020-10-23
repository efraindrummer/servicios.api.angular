import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ArticuloDetalleComponent } from './articulo-detalle/articulo-detalle.component';
import { AgregarArticuloComponent } from './agregar-articulo/agregar-articulo.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'perfil', component: PerfilComponent
  },
  {
    path: 'articulo-detalle', component: ArticuloDetalleComponent
  },
  {
    path: 'agregar-articulo/:esNuevo', component: AgregarArticuloComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
