"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Order } from "@/features/firebase/firestore/types/order";
import { OrderMessages } from "./OrderMessages";
import { statusLabel, statusStyles } from "./constants";
import { formatDate } from "./utils";
import { useTranslation } from "@/hooks/useTranslation";

interface OrderDetailDesktopProps {
  orders: Order[];
  selected: Order | null;
}

export function OrderDetailDesktop({ orders, selected }: OrderDetailDesktopProps) {

  const { t } = useTranslation();

  if (orders?.length === 0) {
    return (
      <div className="flex flex-col gap-2 items-start justify-start">
        <h3 className="text-2xl font-bold">{ t('componentOrderDetailNoOrderHeader.text') }</h3>
        <p className="text-gray-600">
         { t('componentOrderDetailNoOrder.text') }
        </p>
        <Link href="/order">
          <Button variant="default">
            { t('componentOrderDetailNoDoOrder.text') }
          </Button>
        </Link>
      </div>
    );
  }

  if (!selected) {
    return (
      <div className="p-6 border rounded-md">
        <p className="text-gray-600">
            { t('componentOrderDetailChoseOrder.text') }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Order Info Section */}
      <div className="flex flex-col w-full gap-4">
        {/* Meta Information - Consistent styling */}
        <div className="space-y-1">
          <h3 className="text-base font-semibold mb-3">
            Detaljer
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-xs text-gray-500 mb-1">Opprettet</p>
              <p className="text-gray-900 font-medium">{formatDate(selected.createdAt)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Sist oppdatert</p>
              <p className="text-gray-900 font-medium">{formatDate(selected.updatedAt)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Ansvarlige</p>
              <p className="text-gray-900 font-medium truncate">Ansatt, Kunde</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Levering</p>
              <p className="text-gray-900 font-medium">{selected.is_pickup ? "Hentes" : "Sendes"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Beskrivelse</p>
              <p className="text-gray-900 font-medium truncate">{selected.description}</p>
            </div>
          </div>
        </div>

        {/* Attachments */}
        {selected.attachments?.length ? (
          <div className="space-y-3 pt-4 mt-4 border-t border-t-black/10">
            <h3 className="text-base font-semibold">
              Vedlegg
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lgup:grid-cols-3 gap-4">
              {selected.attachments.map((src, idx) => (
                <div
                  className="overflow-hidden rounded-md border"
                  key={`${src}-${idx}`}
                >
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
      </div>

      {/* Messages Section */}
      <OrderMessages orderId={selected.id} isMobile={false} />
    </div>
  );
}
