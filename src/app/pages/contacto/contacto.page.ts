import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { call, heart, people } from 'ionicons/icons';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ContactoPage {

  constructor() {
    addIcons({ call, heart, people });
  }

  contactos = [
    { nombre: 'Línea de Atención', telefono: '123', descripcion: 'Atención general y orientación', icon: 'call' },
    { nombre: 'Psicólogos Medellín', telefono: '3214567890', descripcion: 'Soporte emocional y crisis', icon: 'people' },
    { nombre: 'Emergencias', telefono: '112', descripcion: 'Emergencias inmediatas', icon: 'heart' },
    { nombre: 'Salud Mental', telefono: '018000123456', descripcion: 'Apoyo psicológico nacional', icon: 'people' }
  ];

  llamar(numero: string) {
    window.open(`tel:${numero}`, '_self');
  }
}

