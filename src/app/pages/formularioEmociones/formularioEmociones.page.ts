import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { EmocionesService } from '../../services/emociones.service';
import { Auth, user } from '@angular/fire/auth';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-formularioEmociones',
  templateUrl: './formularioEmociones.page.html',
  styleUrls: ['./formularioEmociones.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class FormularioEmocionalPage implements OnInit, OnDestroy {
  private auth = inject(Auth);
  private emocionesService = inject(EmocionesService);
  
  energia = 100; // Nivel de energía inicial
  emocionesDelDia: Array<'feliz' | 'tranquilo' | 'ansioso' | 'triste'> = [];
  cargando = false;
  error: string | null = null;

  // Valores de energía por emoción
  private readonly VALORES_ENERGIA = {
    feliz: 5,
    tranquilo: 2,
    ansioso: -3,
    triste: -5
  } as const;

  private intervaloGuardado: any;

  async ngOnInit() {
    // Cargar emociones del día actual
    await this.cargarEmocionesDelDia();
    
    // Configurar guardado automático al final del día
    this.configurarGuardadoAutomatico();
  }

  private configurarGuardadoAutomatico() {
    const ahora = new Date();
    const tiempoHastaMedianoche = new Date(
      ahora.getFullYear(),
      ahora.getMonth(),
      ahora.getDate() + 1, // Siguiente día
      0, 0, 1 // 00:00:01
    ).getTime() - ahora.getTime();

    // Programa el guardado para la medianoche
    setTimeout(() => {
      this.guardarAutomatico();
      // Configura el intervalo para los próximos días
      this.intervaloGuardado = setInterval(() => {
        this.guardarAutomatico();
      }, 24 * 60 * 60 * 1000); // 24 horas
    }, tiempoHastaMedianoche);
  }

  private async cargarEmocionesDelDia() {
    this.cargando = true;
    try {
      const user = this.auth.currentUser;
      if (!user) throw new Error('Usuario no autenticado');

      const hoy = new Date();
      const emociones = await firstValueFrom(
        this.emocionesService.obtenerHistorialPorFecha(user.uid, hoy)
      );

      if (emociones.length > 0) {
        this.emocionesDelDia = emociones[0].emociones;
        this.energia = emociones[0].energiaFinal;
      }
    } catch (error) {
      console.error('Error al cargar emociones:', error);
      this.error = 'No se pudieron cargar las emociones del día';
    } finally {
      this.cargando = false;
    }
  }

  async seleccionarEmocion(emocion: 'feliz' | 'tranquilo' | 'ansioso' | 'triste') {
    if (this.cargando) return;

    const index = this.emocionesDelDia.indexOf(emocion);
    if (index === -1) {
      this.emocionesDelDia.push(emocion);
      this.energia += this.VALORES_ENERGIA[emocion];
    } else {
      this.emocionesDelDia.splice(index, 1);
      this.energia -= this.VALORES_ENERGIA[emocion];
    }

    await this.guardarEmociones();
  }

  private async guardarEmociones() {
    if (this.cargando) return;

    this.cargando = true;
    this.error = null;

    try {
      const user = this.auth.currentUser;
      if (!user) throw new Error('Usuario no autenticado');

      await this.emocionesService.registrarEmocion(
        user.uid,
        [...this.emocionesDelDia],
        this.energia
      );
    } catch (error) {
      console.error('Error al guardar emociones:', error);
      this.error = 'Error al guardar las emociones';
    } finally {
      this.cargando = false;
    }
  }

  private async guardarAutomatico() {
    if (this.emocionesDelDia.length > 0) {
      await this.guardarEmociones();
    }
  }

  ngOnDestroy() {
    if (this.intervaloGuardado) {
      clearInterval(this.intervaloGuardado);
    }
  }
}