"use client";

import { XIcon } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import type { Order } from "@/features/firebase/firestore/types/order";
import { OrderDetail } from "./OrderDetail";

interface OrderDetailModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selected: Order | null;
}

export function OrderDetailModal({
  isOpen,
  onOpenChange,
  selected,
}: OrderDetailModalProps) {
  return (
    <Drawer direction="bottom" open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="w-full rounded-tl-xl rounded-tr-xl fixed bottom-0 left-0 h-[90vh] z-[999]">
        <div className="flex flex-col w-full h-full overflow-y-auto">
          <DrawerHeader className="flex flex-row items-center justify-between">
            <DrawerTitle className="py-1 mb-0 pb-0">
              {selected?.subject || "Bestillingsdetaljer"}
            </DrawerTitle>
            <DrawerClose asChild>
              <XIcon
                className="p-1 rounded-full bg-gray-100"
                color="black"
                size={30}
                strokeWidth={1.5}
              />
            </DrawerClose>
          </DrawerHeader>
          <OrderDetail orders={[]} selected={selected} isMobile={true} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
