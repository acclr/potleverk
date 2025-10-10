"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Order } from "@/features/firebase/firestore/types/order";
import { OrderMessages } from "./OrderMessages";
import { statusLabel, statusStyles } from "./constants";
import { formatDate } from "./utils";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface OrderDetailMobileProps {
  selected: Order;
}

export function OrderDetailMobile({ selected }: OrderDetailMobileProps) {
  const [tab, setTab] = useState<"overview" | "messages">("overview");
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-full">
      <Tabs defaultValue={tab} className="flex flex-col h-full" onValueChange={(value) => setTab(value as "overview" | "messages")}>
        <div className="px-4 py-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">{ t(overview.text) }</TabsTrigger>
            <TabsTrigger value="messages">{ t(messages) }</TabsTrigger>
          </TabsList>
        </div>

        {tab == "overview" && (
          <TabsContent value="overview" className="flex-[999] h-full m-0 p-4 space-y-4">
            {/* Meta Information */}
            <div className="border rounded-lg p-4">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                { t('details.text') }
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-gray-500 mb-1">{ t('createdAt.text') }</p>
                  <p className="text-gray-900 font-medium">{formatDate(selected.createdAt)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">{ t('updatedAt.text') }</p>
                  <p className="text-gray-900 font-medium">{formatDate(selected.updatedAt)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">{ t('deliveryResponsible.text') }</p>
                  <p className="text-gray-900 font-medium truncate">{ t('deliveryCustomer.text') }</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">{ t('delivery.text') }</p>
                  <p className="text-gray-900 font-medium">{selected.is_pickup ? t('deliveryGet.text') : t('deliverySend.text') }</p>
                </div>
              </div>
            </div>

            {/* Description / Notes */}
            {selected.description && (
              <div className="border rounded-lg p-4">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  { t('deliveryMarket.text') }
                </h3>
                <p className="text-sm text-gray-900 whitespace-pre-wrap">
                  {selected.description}
                </p>
              </div>
            )}

            {/* Attachments */}
            {selected.attachments?.length ? (
              <div className="space-y-3">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  { t('deliveryAttachment.text') } ({selected.attachments.length})
                </h3>
                <div className="grid grid-cols-2 gap-4">
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
          </TabsContent>
        )}

        {tab == "messages" && (
          <TabsContent value="messages" className="flex-[999] flex flex-col h-full m-0 relative">
            {/* Messages with fixed bottom input */}
            <div className="flex-1 overflow-y-auto">
              <OrderMessages orderId={selected.id} isMobile={true} showInput={false} />
            </div>
            <OrderMessages orderId={selected.id} isMobile={true} onlyInput={true} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
