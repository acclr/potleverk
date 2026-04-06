"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/components/utils";
import { useAuth } from "@/features/firebase/auth";
import {
  subscribeToOrderMessages,
  useCreateOrderMessage,
} from "@/features/firebase/firestore/queries/user.query";
import { type Message } from "@/features/firebase/firestore/types";
import { MessageType } from "@/features/firebase/firestore/types/message";
import { UserIcon, SendIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  formatTimeAgo,
  shouldShowTimestamp,
  formatMessageTimestamp,
} from "./utils";
import { useLocale } from "@/features/translations/translations-context";

interface OrderMessagesProps {
  orderId: string;
  isMobile?: boolean;
  showInput?: boolean;
  onlyInput?: boolean;
}

export function OrderMessages({
  orderId,
  isMobile = false,
  showInput = true,
  onlyInput = false
}: OrderMessagesProps) {
  const { user } = useAuth();
  const t = useLocale();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(MessageType.APPROVE);
  const [messages, setMessages] = useState<Message[]>([]);
  const createOrderMessage = useCreateOrderMessage(orderId);

  const sendMessage = (msg: string, type?: MessageType) => {
    if (!msg.trim()) return;

    console.log(t["dashboard.sendingMessage"], {
      orderId,
      senderId: user?.uid,
      senderName: user?.userDetails?.name ?? user?.userDetails?.email ?? user?.uid?.slice(0, 5),
      message: msg,
      type: type,
    });

    createOrderMessage.mutate({
      senderId: user?.uid ?? "",
      senderName: user?.userDetails?.name ?? user?.userDetails?.email ?? user?.uid?.slice(0, 5),
      sentAt: new Date().toISOString(),
      message: msg,
      type: MessageType.APPROVE,
    }, {
      onSuccess: () => {
        console.log(t["dashboard.messageSentSuccessfully"]);
      },
      onError: (error) => {
        console.error(t["dashboard.errorSendingMessage"], error);
      }
    });
    setMessage("");
  };

  useEffect(() => {
    if (!onlyInput) {
      const unsubscribe = subscribeToOrderMessages(
        orderId,
        (messages: Message[]) => {
          setMessages(messages);
        }
      );
      return () => unsubscribe?.();
    }
  }, [orderId, onlyInput]);

  // Mobile fixed input
  if (isMobile && onlyInput) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 z-50">
        <div className="relative">
          <Textarea
            placeholder="Skriv en melding..."
            className="w-full p-3 bg-gray-100 border-none pr-24 resize-none"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="absolute bottom-2 right-2 flex gap-1">
            <Button
              size="sm"
              variant="outline"
              onClick={() => sendMessage(message)}
              className="text-xs"
            >
              <SendIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Message history only (mobile)
  if (isMobile && !showInput) {
    if (!messages.length) {
      return (
        <div className="p-4 text-sm text-gray-600">
          {t["dashboard.noMessagesYet"]}
        </div>
      );
    }

    return (
      <div className="space-y-4 p-4">
        {messages
          .sort((a, b) => a?.sentAt?.localeCompare(b?.sentAt))
          .map((m, i, sortedMessages) => {
            const isFromCurrentUser = m.senderId === user?.uid;
            const isRightAligned = i % 2 === 1;
            const showTimestamp = shouldShowTimestamp(
              m.sentAt,
              i > 0 ? sortedMessages[i - 1].sentAt : undefined
            );

            return (
              <div key={m.id}>
                {showTimestamp && (
                  <div className="flex items-center justify-center my-4">
                    <div className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                      {formatMessageTimestamp(m.sentAt)}
                    </div>
                  </div>
                )}

                <div
                  className={cn(
                    "flex w-full items-end gap-2",
                    isRightAligned ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <div className="h-8 w-8 flex items-center justify-center shrink-0 rounded-full bg-secondary-950">
                    <UserIcon className="h-4 w-4" color="white" />
                  </div>

                  <div
                    className={cn(
                      "flex flex-col max-w-[75%]",
                      isRightAligned ? "items-end" : "items-start"
                    )}
                  >
                    <div
                      className={cn(
                        "relative rounded-2xl p-2.5",
                        isRightAligned
                          ? "bg-primary-900 text-white rounded-br-md"
                          : "bg-gray-100 text-gray-800 rounded-bl-md"
                      )}
                    >
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">
                        {m.message}
                      </p>

                      {m.type === MessageType.APPROVE ? (
                        <span
                          className={cn(
                            "inline-flex items-center mt-2 rounded-full px-2 py-0.5 text-[11px] font-medium",
                            isRightAligned
                              ? "bg-green-100 text-green-800"
                              : "bg-emerald-100 text-emerald-800"
                          )}
                        >
                          {t["dashboard.approved"]}
                        </span>
                      ) : m.type === MessageType.REJECT ? (
                        <span
                          className={cn(
                            "inline-flex items-center mt-2 rounded-full px-2 py-0.5 text-[11px] font-medium",
                            "bg-red-100 text-red-800"
                          )}
                        >
                          {t["dashboard.rejected"]}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  }

  // Desktop layout (original)
  return (
    <div className="flex flex-col p-4 -ml-4 min-w-[calc(100%+32px)] pt-4 mt-4 border-t border-t-black/10">
      <h3 className="text-base font-semibold mb-3">
        {t["dashboard.history"]}
      </h3>
      <Textarea
        placeholder={t["dashboard.writeMessage"]}
        className="w-full md:text-[13px]"
        rows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="mt-2.5 mb-6 w-full justify-between items-center flex gap-6">
        <div className="flex flex-row gap-1">
          <Button
            size="xs"
            variant="destructive"
            className="md:text-[13px]"
            onClick={() => sendMessage("Avvist", MessageType.REJECT)}
          >
            {t["dashboard.reject"]}
          </Button>
          <Button
            size="xs"
            variant="default"
            className="md:text-[13px]"
            onClick={() => sendMessage("Godkjent", MessageType.APPROVE)}
          >
            {t["dashboard.approve"]}
          </Button>
        </div>
        <Button
          size="xs"
          variant="ghost"
          onClick={() => sendMessage(message)}
          className="md:text-[13px]"
        >
          {t["dashboard.send"]}
        </Button>
      </div>
      {messages.length === 0 ? (
        <p className="text-sm md:text-[13px] text-gray-600">
          {t["dashboard.noMessagesYet"]}
        </p>
      ) : (
        <div className="space-y-4 md:space-y-3">
          {messages
            .sort((a, b) => a?.sentAt?.localeCompare(b?.sentAt))
            .map((m, i, sortedMessages) => {
              const isFromCurrentUser = m.senderId === user?.uid;
              const isRightAligned = i % 2 === 1; // Alternate based on message index

              // Check if we should show a timestamp divider
              const showTimestamp = shouldShowTimestamp(
                m.sentAt,
                i > 0 ? sortedMessages[i - 1].sentAt : undefined
              );

              return (
                <div key={m.id}>
                  {/* Timestamp divider - only shows when needed */}
                  {showTimestamp && (
                    <div className="flex items-center justify-center my-4">
                      <div className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                        {formatMessageTimestamp(m.sentAt)}
                      </div>
                    </div>
                  )}

                  {/* Message */}
                  <div
                    className={cn(
                      "flex w-full items-end gap-2",
                      isRightAligned ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    {/* Avatar */}
                    <div className="h-8 w-8 md:h-6 md:w-6 flex items-center justify-center shrink-0 rounded-full bg-secondary-950">
                      <UserIcon className="h-4 w-4" color="white" />
                    </div>

                    {/* Chat bubble */}
                    <div
                      className={cn(
                        "flex flex-col max-w-[75%] sm:max-w-[60%]",
                        isRightAligned ? "items-end" : "items-start"
                      )}
                    >

                      {/* Message bubble */}
                      <div
                        className={cn(
                          "relative rounded-2xl py-2 px-2.5",
                          isRightAligned
                            ? "bg-primary-950 text-white rounded-br-md"
                            : "bg-gray-100 text-gray-800 rounded-bl-md"
                        )}
                      >
                        {/* Message text */}
                        <p className="text-sm md:text-[13px] whitespace-pre-wrap leading-relaxed">
                          {m.message}
                        </p>

                        {/* Status badge - inside bubble at bottom */}
                        {m.type === MessageType.APPROVE ? (
                          <span
                            className={cn(
                              "inline-flex items-center mt-2 rounded-full px-2 py-0.5 text-[11px] font-medium",
                              isRightAligned
                                ? "bg-green-100 text-green-800"
                                : "bg-emerald-100 text-emerald-800"
                            )}
                          >
                            {t["dashboard.approved"]}
                          </span>
                        ) : m.type === MessageType.REJECT ? (
                          <span
                            className={cn(
                              "inline-flex items-center mt-2 rounded-full px-2 py-0.5 text-[11px] font-medium",
                              isRightAligned
                                ? "bg-red-100 text-red-800"
                                : "bg-red-100 text-red-800"
                            )}
                          >
                            {t["dashboard.rejected"]}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
