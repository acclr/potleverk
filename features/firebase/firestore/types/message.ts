/**
 * 2. The messages Subcollection:
For the chat messages related to each order, a subcollection within each order document is the ideal solution. You'd have orders/{orderId}/messages . Each document in this messages subcollection would represent a single message:
senderId (string): Who sent the message (e.g., client's UID, or an identifier like 'admin').
sentAt (timestamp): When the message was sent.
message (string): The content of the message.
status (string, optional): Like 'sent' or 'read'.
 */

export enum MessageStatus {
  SENT = "sent",
  READ = "read"
}

export interface Message {
  id: string;
  senderId: string;
  sentAt: string;
  message: string;
  status?: MessageStatus;
}