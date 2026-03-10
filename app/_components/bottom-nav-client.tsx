"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
  House,
  Calendar,
  ChartNoAxesColumn,
  UserRound,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatOpenButton } from "@/app/_components/chat-open-button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

type ActivePage = "home" | "calendar" | "stats" | "profile";

interface BottomNavClientProps {
  activePage: ActivePage;
  calendarHref: string | null;
}

function NavItem({
  href,
  icon,
  label,
  active,
  disabled,
  variant = "mobile",
}: {
  href: string;
  icon: ReactNode;
  label: string;
  active: boolean;
  disabled?: boolean;
  variant?: "mobile" | "sidebar";
}) {
  const base =
    variant === "sidebar"
      ? "flex items-center gap-3 rounded-xl px-3 py-2 font-heading text-sm transition-colors"
      : "p-3";

  const activeClass =
    variant === "sidebar"
      ? "bg-primary/10 text-foreground"
      : "text-foreground";

  const inactiveClass =
    variant === "sidebar"
      ? "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      : "text-muted-foreground";

  const className = cn(base, active ? activeClass : inactiveClass);

  if (disabled) {
    return (
      <button className={cn(className, "cursor-not-allowed opacity-60")}>
        {icon}
        {variant === "sidebar" && <span>{label}</span>}
      </button>
    );
  }

  return (
    <Link href={href} className={className}>
      {icon}
      {variant === "sidebar" && <span>{label}</span>}
    </Link>
  );
}

function Sidebar({
  activePage,
  calendarHref,
}: BottomNavClientProps) {
  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-72 flex-col border-r border-border bg-background px-5 py-6 lg:flex">
      <div className="flex items-center justify-between">
        <p
          className="text-[22px] uppercase leading-[1.15] text-foreground"
          style={{ fontFamily: "var(--font-anton)" }}
        >
          Fit.ai
        </p>
      </div>

      <div className="mt-8 flex flex-1 flex-col gap-2">
        <NavItem
          href="/"
          icon={<House className="size-5" />}
          label="Home"
          active={activePage === "home"}
          variant="sidebar"
        />
        <NavItem
          href={calendarHref ?? "/"}
          icon={<Calendar className="size-5" />}
          label="Plano"
          active={activePage === "calendar"}
          disabled={!calendarHref}
          variant="sidebar"
        />
        <NavItem
          href="/stats"
          icon={<ChartNoAxesColumn className="size-5" />}
          label="Stats"
          active={activePage === "stats"}
          variant="sidebar"
        />
        <NavItem
          href="/profile"
          icon={<UserRound className="size-5" />}
          label="Perfil"
          active={activePage === "profile"}
          variant="sidebar"
        />

        <div className="mt-4">
          <div className="rounded-2xl border border-border bg-secondary p-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-col gap-0.5">
                <span className="font-heading text-sm font-semibold text-foreground">
                  Coach AI
                </span>
                <span className="font-heading text-xs text-muted-foreground">
                  Planeje e tire duvidas
                </span>
              </div>
              <ChatOpenButton
                className="p-3"
                iconClassName="size-5"
                label="Abrir Coach AI"
              />
            </div>
          </div>
        </div>
      </div>

      <p className="mt-6 font-heading text-xs text-muted-foreground">
        FIT.AI 2026
      </p>
    </aside>
  );
}

function TabletSheetNav({
  activePage,
  calendarHref,
}: BottomNavClientProps) {
  return (
    <div className="fixed right-4 top-4 z-50 hidden md:flex lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full shadow-sm"
          >
            <Menu className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[320px] p-5">
          <SheetHeader className="text-left">
            <SheetTitle
              style={{ fontFamily: "var(--font-anton)" }}
              className="uppercase"
            >
              Fit.ai
            </SheetTitle>
          </SheetHeader>

          <div className="mt-6 flex flex-col gap-2">
            <SheetClose asChild>
              <Link
                href="/"
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2 font-heading text-sm",
                  activePage === "home"
                    ? "bg-primary/10 text-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <House className="size-5" />
                Home
              </Link>
            </SheetClose>

            {calendarHref ? (
              <SheetClose asChild>
                <Link
                  href={calendarHref}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2 font-heading text-sm",
                    activePage === "calendar"
                      ? "bg-primary/10 text-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Calendar className="size-5" />
                  Plano
                </Link>
              </SheetClose>
            ) : (
              <button className="flex cursor-not-allowed items-center gap-3 rounded-xl px-3 py-2 font-heading text-sm text-muted-foreground opacity-60">
                <Calendar className="size-5" />
                Plano
              </button>
            )}

            <SheetClose asChild>
              <Link
                href="/stats"
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2 font-heading text-sm",
                  activePage === "stats"
                    ? "bg-primary/10 text-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <ChartNoAxesColumn className="size-5" />
                Stats
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link
                href="/profile"
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2 font-heading text-sm",
                  activePage === "profile"
                    ? "bg-primary/10 text-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <UserRound className="size-5" />
                Perfil
              </Link>
            </SheetClose>

            <div className="mt-4 rounded-2xl border border-border bg-secondary p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-col gap-0.5">
                  <span className="font-heading text-sm font-semibold text-foreground">
                    Coach AI
                  </span>
                  <span className="font-heading text-xs text-muted-foreground">
                    Planeje e tire duvidas
                  </span>
                </div>
                <SheetClose asChild>
                  <ChatOpenButton
                    className="p-3"
                    iconClassName="size-5"
                    label="Abrir Coach AI"
                  />
                </SheetClose>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function MobileBottomNav({
  activePage,
  calendarHref,
}: BottomNavClientProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-6 rounded-t-4xl border border-border bg-background px-6 py-4 lg:hidden">
      <NavItem
        href="/"
        icon={<House className="size-6" />}
        label="Home"
        active={activePage === "home"}
      />
      {calendarHref ? (
        <NavItem
          href={calendarHref}
          icon={<Calendar className="size-6" />}
          label="Plano"
          active={activePage === "calendar"}
        />
      ) : (
        <NavItem
          href="/"
          icon={<Calendar className="size-6" />}
          label="Plano"
          active={activePage === "calendar"}
          disabled
        />
      )}

      <ChatOpenButton label="Abrir Coach AI" />

      <NavItem
        href="/stats"
        icon={<ChartNoAxesColumn className="size-6" />}
        label="Stats"
        active={activePage === "stats"}
      />
      <NavItem
        href="/profile"
        icon={<UserRound className="size-6" />}
        label="Perfil"
        active={activePage === "profile"}
      />
    </nav>
  );
}

export function BottomNavClient(props: BottomNavClientProps) {
  return (
    <>
      <Sidebar {...props} />
      <TabletSheetNav {...props} />
      <MobileBottomNav {...props} />
    </>
  );
}
