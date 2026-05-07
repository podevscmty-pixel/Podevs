import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("card p-6 transition-colors duration-200", className)}
      {...props}
    >
      {children}
    </div>
  );
}
