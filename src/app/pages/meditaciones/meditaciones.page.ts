import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-meditaciones',
  templateUrl: './meditaciones.page.html',
  styleUrls: ['./meditaciones.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MeditacionesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
