import { Order, User } from "./types";
import { FirestoreRepository } from "./repository";

export const ordersRepo = new FirestoreRepository<Order>("orders");
export const usersRepo = new FirestoreRepository<User>("users");
