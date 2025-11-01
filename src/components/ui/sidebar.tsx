"use client"

import * as React from "react"
import Link from "next/link"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const sidebarVariants = cva(
  "flex h-full shrink-0 flex-col gap-4 transition-[width] border-r",
  {
    variants: {
      collapsed: {
        true: "w-16",
        false: "w-64",
      },
    },
    defaultVariants: {
      collapsed: false,
    },
  },
)

type SidebarContextProps = {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void,
}

const SidebarContext = React.createContext<SidebarContextProps | undefined>(
  undefined,
)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

const SidebarProvider = ({
  initialCollapsed = false,
  children
}: {
  initialCollapsed?: boolean
  children: React.ReactNode
}) => {
  const [collapsed, setCollapsed] = React.useState(initialCollapsed);

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </SidebarContext.Provider>
  )
}

function Sidebar({
  className,
  children,
  initialCollapsed = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode, initialCollapsed?: boolean }) {
  
  return (
    <SidebarProvider initialCollapsed={initialCollapsed}>
      <SidebarInternal className={className} {...props}>
        {children}
      </SidebarInternal>
    </SidebarProvider>
  )
}

function SidebarInternal({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { collapsed } = useSidebar()
  return (
    <div
      className={cn(sidebarVariants({ collapsed }), "bg-sidebar text-sidebar-foreground", className)}
      {...props}
    >
      {children}
    </div>
  )
}

function SidebarHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex h-16 items-center gap-2 border-b border-sidebar-border px-4", className)}
      {...props}
    />
  )
}

function SidebarHeaderTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  const { collapsed } = useSidebar()
  return (
    <h2
      className={cn(
        "text-lg font-semibold",
        collapsed && "hidden",
        className,
      )}
      {...props}
    />
  )
}

function SidebarContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex-1 overflow-y-auto", className)} {...props} />
}

function SidebarNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <nav className={cn("grid gap-1 px-4", className)} {...props} />
  )
}

const SidebarNavLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<typeof Link>
>(({ href, children, className, ...props }, ref) => {
  const { collapsed } = useSidebar();
  
  const renderContent = () => {
    if (collapsed) {
      return (
        <TooltipTrigger asChild>
          <Link href={href} ref={ref} className={cn("flex items-center justify-center gap-3 rounded-md px-3 py-2 text-sidebar-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground", className)} {...props}>
            {React.Children.map(children, child =>
              React.isValidElement(child) && child.type !== 'string' ? child : null
            )}
          </Link>
        </TooltipTrigger>
      );
    }
    return (
      <Link href={href} ref={ref} className={cn("flex items-center gap-3 rounded-md px-3 py-2 text-sidebar-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground", className)} {...props}>
        {children}
      </Link>
    );
  };

  const tooltipContent = React.Children.toArray(children).filter(child => typeof child === 'string' || (React.isValidElement(child) && typeof child.props.children === 'string'));

  return (
    <Tooltip>
      {renderContent()}
      {collapsed && (
        <TooltipContent side="right">
          {tooltipContent}
        </TooltipContent>
      )}
    </Tooltip>
  );
});
SidebarNavLink.displayName = "SidebarNavLink";


function SidebarNavTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  const { collapsed } = useSidebar()
  return (
    <h3
      className={cn(
        "px-3 py-2 text-xs font-semibold text-sidebar-muted-foreground",
        collapsed && "hidden",
        className,
      )}
      {...props}
    />
  )
}

function SidebarFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { collapsed, setCollapsed } = useSidebar()
  return (
    <div className={cn("mt-auto border-t border-sidebar-border p-2", className)} {...props}>
    </div>
  )
}

export {
    Sidebar,
    SidebarHeader,
    SidebarHeaderTitle,
    SidebarContent,
    SidebarNav,
    SidebarNavLink,
    SidebarNavTitle,
    SidebarFooter,
}
