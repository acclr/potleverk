export enum OrderStatus {
  PLANNED = "planned",
  IN_PROGRESS = "in-progress",
  DONE = "done"
}

export interface Order {
  id: string;
  subject: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  status: OrderStatus;
  is_pickup: boolean;
  attachments: string[];
  clientId: string;
}