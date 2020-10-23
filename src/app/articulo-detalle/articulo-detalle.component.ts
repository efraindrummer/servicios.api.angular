import { Component, OnInit } from '@angular/core';
import { ArticulosService } from '../services/articulos.service';
import { Articulo } from '../models/articulo';
import { User } from '../models/user';

@Component({
  selector: 'app-articulo-detalle',
  templateUrl: './articulo-detalle.component.html',
  styleUrls: ['./articulo-detalle.component.scss']
})
export class ArticuloDetalleComponent implements OnInit {
  articulo: Articulo = new Articulo();
  usuario: User = new User();
  constructor(private ArticuloInyectado: ArticulosService) { 
    this.articulo = this.ArticuloInyectado.articulo;
  }

  ngOnInit(): void {
    this.ArticuloInyectado.leerUsuario(this.articulo.userId).subscribe((usuarioDesdeApi)=> {
      this.usuario = usuarioDesdeApi;
    });
  }

}
