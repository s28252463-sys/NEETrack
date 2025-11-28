import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const Logo = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative w-auto h-10 aspect-square", className)}
    {...props}
  >
    <Image
      src="/icon.png"
      alt="NEETrack Logo"
      fill
      sizes="40px"
      className="object-contain"
      priority
    />
  </div>
));
Logo.displayName = "Logo";

export { Logo };
