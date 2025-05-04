import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
const NavItem = ({
  to,
  children
}: {
  to: string;
  children: React.ReactNode;
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return <Link to={to} className={cn("px-4 py-2 text-sm font-medium transition-colors hover:text-primary", isActive ? "text-primary" : "text-foreground/60 dark:text-foreground/60")}>
      {children}
    </Link>;
};
export function Header() {
  return <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <span className="hidden font-bold sm:inline-block"></span>
        </Link>
        <nav className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="flex items-center">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/projects">Projects</NavItem>
            <NavItem to="/blog">Blog</NavItem>
          </div>
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>;
}