import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavLinkProps {
  href: string;
  exact?: boolean;
  onActive: string;
  children: React.ReactNode;
  className?: string;
}
export const NavLink: React.FC<NavLinkProps> = ({
  href,
  exact,
  onActive,
  children,
  ...props
}) => {
  const pathname = usePathname();
  const active = onActive;
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  if (isActive) {
    props.className += active;
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
};
