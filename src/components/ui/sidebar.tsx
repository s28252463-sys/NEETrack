"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronLeft, ChevronsLeft, ChevronsRight, MoreVertical } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const sidebarVariants = cva(
  "flex h-dvh shrink-0 flex-col gap-4 transition-[width]",
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

function Sidebar({
  className,
  collapsed: initialCollapsed = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { collapsed?: boolean }) {
  const [collapsed, setCollapsed] = React.useState(initialCollapsed)

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <TooltipProvider>
        <div
          className={cn(sidebarVariants({ collapsed }), "bg-black/10 backdrop-blur-sm text-white", className)}
          {...props}
        />
      </TooltipProvider>
    </SidebarContext.Provider>
  )
}

function SidebarHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex h-16 items-center gap-2 px-4", className)}
      {...props}
    />
  )
}

function SidebarHeaderTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { collapsed } = useSidebar()
  return (
    <div
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
  React.ComponentProps<"a">
>(({ href, children, className, ...props }, ref) => {
  const { collapsed } = useSidebar();
  
  const renderContent = () => {
    if (collapsed) {
      return (
        <TooltipTrigger asChild>
          <a href={href} ref={ref} className={cn("flex items-center justify-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-white/20", className)} {...props}>
            {React.Children.map(children, child =>
              React.isValidElement(child) && child.type !== 'string' ? child : null
            )}
          </a>
        </TooltipTrigger>
      );
    }
    return (
      <a href={href} ref={ref} className={cn("flex items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-white/20", className)} {...props}>
        {children}
      </a>
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
}: React.HTMLAttributes<HTMLDivElement>) {
  const { collapsed } = useSidebar()
  return (
    <div
      className={cn(
        "px-3 py-2 text-xs font-semibold text-white/50",
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
    <div className={cn("mt-auto border-t border-white/20 p-2", className)} {...props}>
      <Button
        variant="ghost"
        size="icon"
        className="size-9 hover:bg-white/20"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronsRight /> : <ChevronsLeft />}
      </Button>
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
