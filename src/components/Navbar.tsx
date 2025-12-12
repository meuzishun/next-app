import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

export default function Navbar() {
  return (
    <NavigationMenu className="hidden md:block">
      <NavigationMenuList className="gap-3 text-chingu-green-100">
        <NavigationMenuItem>
          <NavigationMenuLink className="px-4" href="/">
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className="px-4" href="/list">
            List
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className="px-4" href="/map">
            Map
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
