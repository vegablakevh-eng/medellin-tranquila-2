import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) {}

  save(collectionName: string, data: any) {
    const ref = collection(this.firestore, collectionName);
    return addDoc(ref, data);
  }
}