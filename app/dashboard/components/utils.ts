import { Timestamp } from "firebase/firestore";

export function formatDate(input: Timestamp | string) {
  try {
    // Firestore Timestamp-like or ISO string fallback
    const date = (
      input instanceof Timestamp ? input.toDate() : new Date(input as string)
    ) as Date;
    return new Intl.DateTimeFormat("no-NO", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }).format(date);
  } catch {
    return "-";
  }
}

export function formatTimeAgo(input: Timestamp | string) {
  try {
    const date = (
      input instanceof Timestamp ? input.toDate() : new Date(input as string)
    ) as Date;
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "nå";
    if (minutes < 60) return `${minutes} min siden`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} timer siden`;
    const days = Math.floor(hours / 24);
    return `${days} dag${days > 1 ? "er" : ""} siden`;
  } catch {
    return "";
  }
}

/**
 * Determines if a timestamp should be shown between two messages.
 * Shows timestamp when:
 * - It's the first message
 * - Messages are more than 15 minutes apart
 * - Messages are from different days
 */
export function shouldShowTimestamp(
  currentMessage: Timestamp | string,
  previousMessage?: Timestamp | string
): boolean {
  // Always show timestamp for the first message
  if (!previousMessage) return true;

  try {
    const currentDate = (
      currentMessage instanceof Timestamp
        ? currentMessage.toDate()
        : new Date(currentMessage as string)
    ) as Date;

    const previousDate = (
      previousMessage instanceof Timestamp
        ? previousMessage.toDate()
        : new Date(previousMessage as string)
    ) as Date;

    // Show timestamp if messages are from different days
    const isDifferentDay =
      currentDate.toDateString() !== previousDate.toDateString();
    if (isDifferentDay) return true;

    // Show timestamp if messages are more than 15 minutes apart
    const timeDiff = currentDate.getTime() - previousDate.getTime();
    const minutesDiff = Math.abs(timeDiff) / (1000 * 60);
    return minutesDiff > 15;
  } catch {
    return true;
  }
}

/**
 * Formats a message timestamp based on how recent it is.
 * - Today: Shows time only (e.g., "14:30")
 * - Yesterday: Shows "I går 14:30"
 * - Within a week: Shows day name and time (e.g., "Mandag 14:30")
 * - Older: Shows date and time (e.g., "15. jan 14:30")
 */
export function formatMessageTimestamp(input: Timestamp | string): string {
  try {
    const date = (
      input instanceof Timestamp ? input.toDate() : new Date(input as string)
    ) as Date;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const messageDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    const timeString = new Intl.DateTimeFormat("no-NO", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);

    // Today
    if (messageDay.getTime() === today.getTime()) {
      return timeString;
    }

    // Yesterday
    if (messageDay.getTime() === yesterday.getTime()) {
      return `I går ${timeString}`;
    }

    // Within last week
    const daysDiff = Math.floor(
      (today.getTime() - messageDay.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysDiff < 7) {
      const dayName = new Intl.DateTimeFormat("no-NO", {
        weekday: "long",
      }).format(date);
      return `${dayName.charAt(0).toUpperCase() + dayName.slice(1)} ${timeString}`;
    }

    // Older messages
    const dateString = new Intl.DateTimeFormat("no-NO", {
      day: "numeric",
      month: "short",
    }).format(date);
    return `${dateString} ${timeString}`;
  } catch {
    return "";
  }
}