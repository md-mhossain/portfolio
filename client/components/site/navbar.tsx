"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useAuthStore } from "@/lib/auth/store";
import { ArrowRight, LayoutDashboard, LogIn, Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Blog", path: "/blogs" },
  { label: "Contact", path: "/contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <nav className="container-page flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-display text-2xl font-extrabold uppercase tracking-tight"
          onClick={() => setOpen(false)}
        >
          dev<span className="text-accent">.monir</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "group relative text-sm font-medium transition-colors hover:text-foreground",
                  active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute -bottom-1.5 left-0 h-1 rounded-full bg-gradient-to-r from-teal-300 to-lime-500 transition-all duration-300",
                    active ? "w-full" : "w-0 group-hover:w-full",
                  )}
                />
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          {user ? (
            <Button asChild variant="outline" size="sm">
              <Link href={user.role === "ADMIN" ? "/dashboard" : "/"}>
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            </Button>
          ) : (
            <Button asChild size="sm">
              <Link href="/login">
                <LogIn className="h-4 w-4" />
                Login
              </Link>
            </Button>
          )}
          <Button asChild size="sm" variant="accent">
            <Link href="/contact">
              Start Project
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-background px-6 py-6 md:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => {
              const active = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "text-lg font-medium",
                    active ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-2 flex gap-3">
              {user ? (
                <Button asChild className="flex-1">
                  <Link href="/dashboard" onClick={() => setOpen(false)}>
                    Dashboard
                  </Link>
                </Button>
              ) : (
                <Button asChild className="flex-1">
                  <Link href="/login" onClick={() => setOpen(false)}>
                    Login
                  </Link>
                </Button>
              )}
              <Button asChild variant="accent" className="flex-1">
                <Link href="/contact" onClick={() => setOpen(false)}>
                  Start Project
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
