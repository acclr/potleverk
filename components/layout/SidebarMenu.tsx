import Link from 'next/link';
import { DrawerClose } from '../ui/drawer';
import { NavigationDocumentDataItemsItem } from "@/prismicio-types"

export default function SidebarMenu({ navigation }: { navigation: NavigationDocumentDataItemsItem[] }) {
  return (
    <nav className="px-4 py-4 md:px-6 lg:px-8 flex w-full flex-col space-y-1">
      {navigation.map((item, i) => (
        <DrawerClose key={i} asChild>
          <Link
            key={item.text}
            href={(item.link as any).url ?? '/'}
            className="relative text-black w-max border-b-2 border-transparent -mt-0.5 hover:border-secondary-800 hover:text-secondary-800  text-xl font-normal"
          >
            {item.text}
          </Link>
        </DrawerClose>
      ))}
    </nav>
  );
}