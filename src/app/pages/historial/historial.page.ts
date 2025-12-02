import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { EmocionesService } from '../../services/emociones.service';
import { Auth } from '@angular/fire/auth';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HistorialPage implements OnInit {

  private auth = inject(Auth);
  private emocionesService = inject(EmocionesService);

  historial: any[] = [];
  cargando = true;

  async ngOnInit() {
    const user = this.auth.currentUser;
    if (!user) return;

    this.historial = await firstValueFrom(
      this.emocionesService.obtenerHistorial(user.uid)
    );

    this.cargando = false;
  }
}
