"use client";

import { useMemo, useState } from "react";
import { useAuth } from "@/features/firebase/auth";
import { useOrdersByClient } from "@/features/firebase/firestore/queries/orders.query";
import type {
  Order,
  OrderStatus,
} from "@/features/firebase/firestore/types/order";
import { Badge } from "@/components/ui/badge";
import { useOrderMessages } from "@/features/firebase/firestore/queries/user.query";
import Image from "next/image";
import type { Message } from "@/features/firebase/firestore/types";
import { cn } from "@/components/utils";
import { Timestamp } from "firebase/firestore";

const statusLabel: Record<OrderStatus, string> = {
  planned: "Planlagt",
  "in-progress": "Under arbeid",
  done: "Ferdig",
};

const statusStyles: Record<OrderStatus, string> = {
  planned: "bg-amber-100 text-amber-800",
  "in-progress": "bg-blue-100 text-blue-800",
  done: "bg-emerald-100 text-emerald-800",
};

function formatDate(input: Timestamp | string) {
  try {
    // Firestore Timestamp-like or ISO string fallback
    const date = (input instanceof Timestamp ? input.toDate() : new Date(input as string)) as Date;
    return new Intl.DateTimeFormat("no-NO", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }).format(date);
  } catch {
    return "-";
  }
}
  
function formatTimeAgo(input: Timestamp | string) {
  try {
    const date = (input instanceof Timestamp ? input.toDate() : new Date(input as string)) as Date;
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

export default function OrdersPage() {
  const { user } = useAuth();
  const { data: orders = [], isLoading } = useOrdersByClient(user?.uid);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  console.log({orders});


  const selected = useMemo<Order | null>(() => {
    if (!orders?.length) return null;
    return orders.find((o) => o.id === selectedId) ?? orders[0] ?? null;
  }, [orders, selectedId]);

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 lgup:px-8 py-10">
        <h1 className="text-2xl font-semibold">Mine bestillinger</h1>
        <p className="text-gray-600 mt-2">
          Vennligst logg inn for å se bestillingene dine.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lgup:px-8 py-8">
      <div className="flex flex-col lgup:flex-row gap-6">
        {/* Left: Orders list */}
        <aside className="lgup:col-span-6 border-r border-black/10 xl:col-span-3">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Mine bestillinger</h2>
          <ul className="space-y-1">
            {isLoading && (
              <div className="text-gray-500">Laster bestillinger…</div>
            )}
            {!isLoading && orders?.length === 0 && (
              <div className="text-gray-500">Ingen bestillinger funnet.</div>
            )}
            {orders?.map((order) => (
              <li key={order.id}>
                <button
                  onClick={() => setSelectedId(order.id)}
                  className="relative w-full text-left p-8 pr-12 transition-all"
                >
                  <div className={cn("absolute top-0 right-0 w-screen h-full",                    selected?.id === order.id
                      ? "bg-black/10 hover:bg-black/15"
                      : "bg-transparent hover:bg-black/5")} 
                    />
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium truncate max-w-[220px]">
                        {order.subject || "Uten tittel"}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Opprettet {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        statusStyles[order.status]
                      }`}
                    >
                      {statusLabel[order.status]}
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Right: Order detail */}
        <section className="lgup:col-span-8 xl:col-span-9">
          {!selected ? (
            <div className="p-6 border rounded-md">
              <p className="text-gray-600">Velg en bestilling fra listen for å se detaljer.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h1 className="text-2xl sm:text-3xl font-bold">
                  {selected.subject}
                </h1>
                <div className="flex items-center gap-2">
                  <Badge className={statusStyles[selected.status]}>
                    {statusLabel[selected.status]}
                  </Badge>
                </div>
              </div>

              {/* Meta */}
              <div className="p-4 rounded-md border">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Opprettet</p>
                    <p>{formatDate(selected.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Sist oppdatert</p>
                    <p>{formatDate(selected.updatedAt)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Ansvarlige</p>
                    <p className="truncate">Ansatt, Kunde</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Levering</p>
                    <p>{selected.is_pickup ? "Hentes" : "Sendes"}</p>
                  </div>
                </div>
              </div>

              {/* Description / Notes */}
              <div className="p-5 rounded-md border space-y-2">
                <h3 className="font-semibold">Merknad</h3>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {selected.description || "Ingen merknad"}
                </p>
              </div>

              {/* Attachments */}
              {selected.attachments?.length ? (
                <div className="space-y-3">
                  <h3 className="font-semibold">Vedlegg</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lgup:grid-cols-3 gap-4">
                    {selected.attachments.map((src, idx) => (
                      <div className="overflow-hidden rounded-md border" key={`${src}-${idx}`}>
                        <div className="relative aspect-[4/3]">
                          <Image
                            src={src}
                            alt="Vedlegg"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Messages */}
              <OrderMessages orderId={selected.id} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function OrderMessages({ orderId }: { orderId: string }) {
  const { data: fetched = [], isLoading } = useOrderMessages(orderId);

  // Mock data matching Message schema, used when no fetched messages
  const mockMessages: Message[] = [
    {
      id: "m1",
      senderId: "client",
      message: "Vedlagt korrektur. Mangler org. nr.",
      sentAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      status: undefined
    },
    {
      id: "m2",
      senderId: "admin",
      message: "Vennligst flytt bildet litt ned slik at mer av himmelen vises.",
      sentAt: new Date(Date.now() - 50 * 60 * 1000).toISOString(),
      status: undefined
    },
    {
      id: "m3",
      senderId: "client",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      sentAt: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
      status: undefined
    },
    {
      id: "m4",
      senderId: "admin",
      message:
        "Godkjent",
      sentAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      status: undefined
    }
  ];

  const messages: Message[] = (fetched?.length ? fetched : mockMessages) as Message[];

  // Mock approval status per message (not part of Message schema)
  const approvalById: Record<string, "approved" | "rejected" | undefined> = {
    m2: "rejected",
    m4: "approved"
  };

  return (
    <div className="">
      <h3 className="font-semibold mb-3">Historikk</h3>
      {isLoading ? (
        <p className="text-sm text-gray-600">Laster meldinger…</p>
      ) : messages.length === 0 ? (
        <p className="text-sm text-gray-600">Ingen meldinger ennå.</p>
      ) : (
        <div className="space-y-6">
          {/* Composer */}
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 shrink-0 rounded-full bg-gray-300" />
            <div className="flex-1">
              <div className="relative">
                <div className="h-14 rounded-md bg-gray-100 border" />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] px-2 py-1 rounded-md bg-gray-200 text-gray-700">Send</button>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">Godkjent</span>
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-red-100 text-red-800">Avvist</span>
              </div>
              <p className="text-[11px] text-rose-400 mt-1">Gi tilbakemelding</p>
            </div>
          </div>

          {/* Timeline */}
          <ul className="space-y-6">
            {messages.map((m) => {
              const approval = approvalById[m.id];
              return (
                <li key={m.id} className="flex items-start gap-3">
                  <div className="h-8 w-8 shrink-0 rounded-full bg-gray-300" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="font-medium capitalize">{m.senderId}</span>
                      <span>•</span>
                      <span>{formatTimeAgo(m.sentAt)}</span>
                      {approval === "approved" ? (
                        <span className="ml-2 rounded px-2 py-0.5 text-[11px] bg-emerald-100 text-emerald-800">Godkjent</span>
                      ) : approval === "rejected" ? (
                        <span className="ml-2 rounded px-2 py-0.5 text-[11px] bg-red-100 text-red-800">Avvist</span>
                      ) : null}
                    </div>
                    <p className="text-sm text-gray-800 whitespace-pre-wrap mt-1">{m.message}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
