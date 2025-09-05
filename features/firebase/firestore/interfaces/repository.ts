import type { QueryConstraint, Unsubscribe } from "firebase/firestore";

export interface Repository<T> {
  getAll?: () => Promise<T[]>;
  getById?: (id: string) => Promise<T | null>;
  getByIds?: (ids: string[]) => Promise<T[]>;
  create?: (data: T) => Promise<void>;
  update?: (id: string, data: Partial<T>) => Promise<void>;
  delete?: (id: string) => Promise<void>;
  getAllBy?: (...constraints: QueryConstraint[]) => Promise<T[]>;
  subscribeToDocument?: (id: string, callback: (data: T | null) => void) => Promise<Unsubscribe>;
  subscribeToCollection?: (callback: (data: T[] | T) => void) => Promise<Unsubscribe>;
}
