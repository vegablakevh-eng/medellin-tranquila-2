import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, query, where, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface EmocionRegistro {
  fecha: Date;
  emociones: Array<'feliz' | 'tranquilo' | 'ansioso' | 'triste'>;
  energiaFinal: number;
}

@Injectable({
  providedIn: 'root'
})
export class EmocionesService {

  constructor(private firestore: Firestore) {}

  // Registrar un nuevo estado emocional dentro del historial del usuario
  registrarEmocion(uid: string, emociones: EmocionRegistro['emociones'], energia: number): Promise<any> {
    console.log(this.firestore)
    const ref = collection(this.firestore, `usuarios/${uid}/historial`);
    
    console.log(ref)
    return addDoc(ref, {
      fecha: new Date(),
      emociones: emociones,
      energiaFinal: energia
    });
  }

  // Obtener todo el historial de un usuario
  obtenerHistorial(uid: string): Observable<EmocionRegistro[]> {
    const ref = collection(this.firestore, `usuarios/${uid}/historial`);
    const q = query(ref, orderBy('fecha', 'desc')); // ordena del más reciente al más antiguo
    return collectionData(q, { idField: 'id' }) as Observable<EmocionRegistro[]>;
  }

  // Obtener historial de un usuario por fecha específica
  obtenerHistorialPorFecha(uid: string, fecha: Date): Observable<EmocionRegistro[]> {
    const ref = collection(this.firestore, `usuarios/${uid}/historial`);
    const inicio = new Date(fecha);
    inicio.setHours(0, 0, 0, 0);
    const fin = new Date(fecha);
    fin.setHours(23, 59, 59, 999);

    const q = query(ref,
      where('fecha', '>=', inicio),
      where('fecha', '<=', fin)
    );

    return collectionData(q, { idField: 'id' }) as Observable<EmocionRegistro[]>;
  }
}
