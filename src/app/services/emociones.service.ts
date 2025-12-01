import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class EmocionesService {

  constructor(private firestore: Firestore) {}

  registrarEmocion(uid: string, emociones: any, energia: number) {
    const ref = collection(this.firestore, `usuarios/${uid}/historial`);

    return addDoc(ref, {
      fecha: new Date(),
      emociones: emociones,
      energiaFinal: energia
    });
  }

  obtenerHistorial(uid: string) {
    const ref = collection(this.firestore, `usuarios/${uid}/historial`);
    return collectionData(ref, { idField: 'id' });
  }
}
