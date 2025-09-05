import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  getDocs,
  query,
  QueryConstraint,
  onSnapshot,
  Unsubscribe,
  deleteDoc,
  writeBatch,
  addDoc,
  Timestamp,
  where,
  documentId
} from "firebase/firestore";
import { db } from "@/features/firebase/client";
import { Repository } from "@/features/firebase/firestore/interfaces/repository";
import { Identifiable } from "./interfaces/identifiable";

export class FirestoreRepository<T> implements Repository<T> {
  private collectionName: string;
  
  constructor(private name: string) {
    this.collectionName = this.name;
  }

  async getAllBy(...constraints: QueryConstraint[]): Promise<T[]> {
    const snap = await getDocs(query(collection(db, this.collectionName), ...constraints));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as T);
  }

  async getAll(): Promise<T[]> {
    const snap = await getDocs(collection(db, this.collectionName));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as T);
  }

  async getById(id: string): Promise<T | null> {
    const ref = doc(db, this.collectionName, id);
    const snap = await getDoc(ref);
    return snap.exists() ? ({ id: snap.id, ...snap.data() } as T) : null;
  }

  async getByIds(ids: string[]): Promise<T[]> {
    const snap = await getDocs(query(
      collection(db, this.collectionName),
      where(documentId(), "in", ids)
    ));

    return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as T);
  }

  async create(data: T): Promise<void> {
    await addDoc(collection(db, this.collectionName), {
      ...data,
      createdAt: Timestamp.fromDate(new Date()),
    }).catch((err) => {
      console.warn(err);
    })
  }

  async update(id: string, data: Partial<T>): Promise<void> {
    await updateDoc(doc(db, this.collectionName, id), data as any);
  }

  async createBatch(data: Array<Identifiable<T>>): Promise<void> {
    const batch = writeBatch(db);
    data.forEach((d) => {
      const docRef = doc(db, this.collectionName, d.id);
      batch.set(docRef, { ...d.data, createdAt: Timestamp.fromDate(new Date()) });
    });
    await batch.commit();
  }

  async updateBatch(data: Array<Identifiable<Partial<T>>>): Promise<void> {
    const batch = writeBatch(db);
    data.forEach((d) => {
      const docRef = doc(db, this.collectionName, d.id);
      batch.update(docRef, { ...d.data, updatedAt: Timestamp.fromDate(new Date()) });
    });
    await batch.commit();
  }

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(db, this.collectionName, id));
  }

  async deleteBatch(ids: string[]): Promise<void> {
    const batch = writeBatch(db);
    ids.forEach((id) => {
      const docRef = doc(db, this.collectionName, id);
      batch.delete(docRef);
    });
    await batch.commit();
  }

  async subscribeToDocument(id: string, callback: (data: T | null) => void): Promise<Unsubscribe> {
    const docRef = doc(db, this.collectionName, id);
    return onSnapshot(docRef, (snap) => {
      callback(snap.exists() ? ({ id: snap.id, ...snap.data() } as T) : null);
    });
  }

  async subscribeToCollection(callback: (data: T[] | T) => void): Promise<Unsubscribe> {
    const docRef = collection(db, this.collectionName);
    return onSnapshot(docRef, (snap) => {
      callback(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as T));
    });
  }
}
