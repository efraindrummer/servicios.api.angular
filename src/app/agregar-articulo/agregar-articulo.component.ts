import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { ArticulosService } from '../services/articulos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Articulo } from '../models/articulo';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar-articulo',
  templateUrl: './agregar-articulo.component.html',
  styleUrls: ['./agregar-articulo.component.scss']
})
export class AgregarArticuloComponent implements OnInit {
  usuarios: Array<User> = new Array<User>();
  formularioArticulo: FormGroup;
  articulo: Articulo = new Articulo();
  esNuevo: boolean = true;
  titulo: string = '';

  constructor(private ArticuloInyectado: ArticulosService, private fbGenerador: FormBuilder, 
    private RutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    this.esNuevo = JSON.parse(this.RutaActiva.snapshot.params.esNuevo);
    this.titulo = this.esNuevo ? 'Agregar': 'Editar';
    
    this.formularioArticulo = this.fbGenerador.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      UserId: ['', Validators.required]
    })
    
    if(!this.esNuevo){
      this.articulo = this.ArticuloInyectado.articulo;
      this.formularioArticulo.setValue({
        title: this.articulo.title,
        body: this.articulo.body,
        userId: this.articulo.userId
      })
    }

    this.ArticuloInyectado.leerTodosLosUsuarios().subscribe((usuarioRecibidos)=>{
      this.usuarios = usuarioRecibidos;
    });
  }

  agregar(){
    this.articulo = this.formularioArticulo.value as Articulo;
    this.ArticuloInyectado.guardarArticulo(this.articulo).subscribe((articuloRecibido) => {
      console.log(articuloRecibido);
      console.log('felicidades ha registrado el primer articulo');
      this.formularioArticulo.reset();
    })
  }

  editar(){
    this.articulo.body = this.formularioArticulo.value.body;
    this.articulo.title = this.formularioArticulo.value.title;
    this.articulo.userId = this.formularioArticulo.value.userId;

    this.ArticuloInyectado.actualizarArticulo(this.articulo).subscribe((articuloRecibido)=>{
      console.log(articuloRecibido);
      console.log('Se edito correctamente');
    })
  }

}
