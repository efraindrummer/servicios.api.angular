import { Component, OnInit } from '@angular/core';
import { Articulo } from '../models/articulo';
import { UsuarioService } from '../services/usuario.service';
import { ArticulosService } from '../services/articulos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  articulos: Array<Articulo> = new Array<Articulo>();
  constructor(public UsuarioInyectado: UsuarioService, private ArticuloInyectado: ArticulosService, private Ruta: Router) { }

  ngOnInit(): void {
    this.ArticuloInyectado.leerNoticias().subscribe((articulosDesdeApi) => {
      this.articulos = articulosDesdeApi;
    });

    let articuloEnviar: Articulo = new Articulo();

    articuloEnviar.body = 'Este es el cuerpo del articulo';
    articuloEnviar.title = 'Este es de prueba';
    articuloEnviar.userId = 4;

    this.ArticuloInyectado.guardarArticulo(articuloEnviar).subscribe((articuloCreado) => {
      
      this.articulos.push(articuloCreado);
    })
  }

  irAlDetalle(articulo: Articulo){
    this.ArticuloInyectado.articulo = articulo;
    this.Ruta.navigateByUrl('articulo-detalle');
  }

  borrar(id:number){
    this.ArticuloInyectado.borrarArticulo(id).subscribe((datos)=>{
      console.log(datos);
      console.log("usuario eliminado correctamente");
    })
  }

  actualizar(articulo: Articulo){
    
    this.ArticuloInyectado.articulo = articulo;
    this.Ruta.navigateByUrl('/agregar-articulo/false');
  }

}
