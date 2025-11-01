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
  "flex h-dvh shrink-0 flex-col gap-4 border-r bg-sidebar transition-[width]",
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
          className={cn(sidebarVariants({ collapsed }), className)}
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
      className={cn("flex h-16 items-center border-b px-4", className)}
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
        "text-lg font-semibold text-sidebar-foreground",
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
    <nav className={cn("grid gap-1 px-2", className)} {...props} />
  )
}

function SidebarNavLink({
  href,
  children,
  className,
  ...props
}: Omit<React.ComponentProps<"a">, "href"> & {
  href: string
}) {
  const { collapsed } = useSidebar()
  const content = collapsed ? <TooltipTrigger asChild>{children}</TooltipTrigger> : children;

  return (
    <Tooltip>
        <a
          href={href}
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            className,
          )}
          {...props}
        >
          {content}
        </a>
        <TooltipContent side="right">
          {children}
        </TooltipContent>
    </Tooltip>
  )
}

function SidebarNavTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { collapsed } = useSidebar()
  return (
    <div
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
    <div className={cn("mt-auto border-t p-2", className)} {...props}>
      <Button
        variant="ghost"
        size="icon"
        className="size-9"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronsRight /> : <ChevronsLeft />}
      </Button>
    </div>
  )
}

function SidebarFooterUser({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { collapsed } = useSidebar()
  return (
    <div className={cn("flex items-center gap-2", className)} {...props} >
        <div className={cn(
            "flex items-center gap-2",
            collapsed && "hidden"
            )}
        >
            {props.children}
        </div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-9">
                    <MoreVertical />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
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
    SidebarFooterUser,
}
