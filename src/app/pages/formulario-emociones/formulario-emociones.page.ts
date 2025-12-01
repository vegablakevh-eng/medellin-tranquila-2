import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-formulario-emociones',
  templateUrl: './formulario-emociones.page.html',
  styleUrls: ['./formulario-emociones.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar
  ]
})
export class FormularioEmocionalPage implements OnInit {
  daysRegistered: number = 9;
  positiveState: number = 40;
  dateActually: string = '';
  selectedEmotion: string = ''; 
    energyLevel: number = 0;
  constructor() { }

  ngOnInit() {
    this.getDate();
  }

   setEnergyLevel(level: number): void {
    this.energyLevel = level;
    console.log('Nivel de energía:', level);
  }

  // Obtener etiqueta del nivel
  getEnergyLabel(): string {
    switch(this.energyLevel) {
      case 1: return 'Bajo';
      case 2: return 'Medio';
      case 3: return 'Alto';
      default: return 'No seleccionado';
    }
  }

  // Obtener color según el nivel
  getEnergyColor(): string {
    switch(this.energyLevel) {
      case 1: return 'bg-danger';
      case 2: return 'bg-warning';
      case 3: return 'bg-success';
      default: return 'bg-secondary';
    }
  }

  getDate(): void {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    this.dateActually = now.toLocaleDateString('es-ES', options);
  }

  // Función para seleccionar emoción
  selectEmotion(emotion: string): void {
    this.selectedEmotion = emotion;
    console.log('Emoción seleccionada:', emotion);
  }

  registerEmotionalState() {
    if (this.selectedEmotion) {
      console.log('Registrando estado emocional:', this.selectedEmotion);
      // Aquí puedes guardar la emoción seleccionada
    } else {
      console.log('Por favor selecciona una emoción');
    }
  }

  goToMeditation() {
    console.log('Navegar a meditación');
  }

  goToHelp() {
    console.log('Navegar a ayuda');
  }
}