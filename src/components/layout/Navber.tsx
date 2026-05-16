import { Link } from "react-router";
import { toast } from "sonner";
import Logo from "../../assets/Icons/Logo";
import { role } from "../../constants/role";
import {
  authApi,
  useLogOutMutation,
  useUserInfoQuery,
} from "../../redux/features/auth/auth.api";
import { useAppDispatch } from "../../redux/hooks";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ModeToggle } from "./ModeToggle";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/admin", label: "Deshboard", role: role.admin },
  { href: "/admin", label: "Deshboard", role: role.superAdmin },
  { href: "/user", label: "Deshboard", role: role.user },
];

export default function Navbar() {
  const { data } = useUserInfoQuery(undefined);
  const dispatch = useAppDispatch();
  const [logOut] = useLogOutMutation();

 const handleLogOut = async () => {
    await logOut(undefined);
    dispatch(authApi.util.resetApiState());
    toast.success("Logout Successfully!");
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon">
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-1.75 transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-315"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-1.75 transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-135"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <>
                      {link.role === "PUBLICK" && (
                        <NavigationMenuItem key={index} className="w-full">
                          <NavigationMenuItem key={index}>
                            {/* it don't refresh */}
                            <Link to={link.href}>{link.label}</Link>
                          </NavigationMenuItem>
                        </NavigationMenuItem>
                      )}
                      {link.role === data?.data?.role && (
                        <NavigationMenuItem key={index} className="w-full">
                          <NavigationMenuItem key={index}>
                            {/* it don't refresh */}
                            <Link to={link.href}>{link.label}</Link>
                          </NavigationMenuItem>
                        </NavigationMenuItem>
                      )}
                    </>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <Link to={"/"}>
              <Logo />
            </Link>
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => (

                  <>
                    {link.role === "PUBLIC" && (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuLink
                          asChild
                          className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                        >
                          <Link to={link.href}>{link.label}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )}
                    {link.role === data?.data?.role && (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuLink
                          asChild
                          className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                        >
                          <Link to={link.href}>{link.label}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )}
                  </>
                
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          <ModeToggle />

          {data?.data?.email && (
            <Button
              onClick={handleLogOut}
              variant="outline"
              className="text-sm">
              Logout
            </Button>
          )}

          {!data?.data?.email && (
            <Button className="text-sm">
              <Link to={"/login"}>Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
