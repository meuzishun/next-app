import { Menu } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger className="block md:hidden text-chingu-green-100">
        <Menu />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-auto h-fit py-6 px-6 mx-4 my-4 rounded-xl bg-chingu-blue-500 text-chingu-green-100 border-0"
      >
        <SheetHeader className="p-0 m-0">
          <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
        </SheetHeader>
        <NavigationMenu>
          <NavigationMenuList className="flex flex-col gap-3">
            <NavigationMenuItem>
              <NavigationMenuLink className="px-4 text-xl" href="/">
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className="px-4 text-xl" href="/list">
                List
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className="px-4 text-xl" href="/map">
                Map
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNav;
