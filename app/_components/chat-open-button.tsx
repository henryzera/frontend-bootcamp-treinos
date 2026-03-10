"use client";

import { Sparkles } from "lucide-react";
import { useQueryStates, parseAsBoolean, parseAsString } from "nuqs";
import { cn } from "@/lib/utils";

interface ChatOpenButtonProps {
  className?: string;
  iconClassName?: string;
  label?: string;
}

export function ChatOpenButton({
  className,
  iconClassName,
  label = "Abrir Coach AI",
}: ChatOpenButtonProps) {
  const [, setChatParams] = useQueryStates({
    chat_open: parseAsBoolean.withDefault(false),
    chat_initial_message: parseAsString,
  });

  return (
    <button
      onClick={() => setChatParams({ chat_open: true })}
      aria-label={label}
      className={cn("rounded-full bg-primary p-4", className)}
    >
      <Sparkles
        className={cn("size-6 text-primary-foreground", iconClassName)}
      />
    </button>
  );
}
