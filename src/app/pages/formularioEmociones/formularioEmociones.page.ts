import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { EmocionesService } from '../../services/emociones.service';
import { provideAuth, getAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-formularioEmociones',
  templateUrl: './formularioEmociones.page.html',
  styleUrls: ['./formularioEmociones.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class FormularioEmocionalPage implements OnInit, OnDestroy {

  energia = 100; // Nivel de energía inicial
  emocionesDelDia: Array<'feliz' | 'tranquilo' | 'ansioso' | 'triste'> = [];

  // Valores de energía por emoción
  valores: Record<'feliz' | 'tranquilo' | 'ansioso' | 'triste', number> = {
    feliz: 5,
    tranquilo: 2,
    ansioso: -3,
    triste: -5
  };

  private intervaloGuardado!: any;

  constructor(
   // private emocionesService: EmocionesService,
    private auth: Auth
  ) {}

  ngOnInit() {
    // Revisar cada minuto si es final del día
    this.intervaloGuardado = setInterval(() => {
      const ahora = new Date();
      if (ahora.getHours() === 23 && ahora.getMinutes() === 59) {
        this.guardarAutomatico();
      }
    }, 60000);
  }

  ngOnDestroy() {
    clearInterval(this.intervaloGuardado);
  }

  // El usuario pulsa una emoción
  agregarEmocion(emocion: 'feliz' | 'tranquilo' | 'ansioso' | 'triste') {
    this.emocionesDelDia.push(emocion);
    this.actualizarEnergia();
  }

  // Actualiza la barra de energía según emociones del día
  actualizarEnergia() {
    let total = 100; // siempre inicia en 100
    this.emocionesDelDia.forEach(e => {
      // 🔹 Cast seguro para que no de error de TS
      total += this.valores[e as 'feliz' | 'tranquilo' | 'ansioso' | 'triste'];
    });
    this.energia = Math.max(0, Math.min(total, 100)); // Mantener entre 0 y 100%
  }

  // Guardado automático al final del día
  async guardarAutomatico() {
    const usuario = this.auth.currentUser;
    if (!usuario) return;

   // await this.emocionesService.registrarEmocion(
   //   usuario.uid,
   //   this.emocionesDelDia,
   //   this.energia
   // );

    // Reiniciar día
    this.emocionesDelDia = [];
    this.energia = 100;
  }

}
