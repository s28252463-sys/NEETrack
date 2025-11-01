'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const sidebarVariants = cva(
  'flex h-full shrink-0 flex-col gap-4 border-r bg-card text-card-foreground transition-all',
  {
    variants: {
      collapsed: {
        true: 'w-16',
        false: 'w-64',
      },
    },
    defaultVariants: {
      collapsed: false,
    },
  }
);

function Sidebar({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <TooltipProvider>
      <div className={cn(sidebarVariants({ collapsed }), className)}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { collapsed } as React.Attributes);
          }
          return child;
        })}
      </div>
    </TooltipProvider>
  );
}

function SidebarHeader({
  className,
  collapsed,
  children,
}: React.HTMLAttributes<HTMLDivElement> & { collapsed?: boolean }) {
  return (
    <div className={cn('flex h-16 items-center border-b px-4', className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { collapsed } as React.Attributes);
        }
        return child;
      })}
    </div>
  );
}

function SidebarHeaderTitle({
  className,
  collapsed,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { collapsed?: boolean }) {
  return <h2 className={cn('text-lg font-semibold', collapsed && 'hidden', className)} {...props} />;
}

function SidebarContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex-1 overflow-y-auto', className)} {...props} />;
}

function SidebarNav({
  className,
  children,
  collapsed,
}: React.HTMLAttributes<HTMLDivElement> & { collapsed?: boolean }) {
  return (
    <nav className={cn('grid gap-1 px-2', className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { collapsed } as React.Attributes);
        }
        return child;
      })}
    </nav>
  );
}

const SidebarNavLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<typeof Link> & { collapsed?: boolean }
>(({ href, children, className, collapsed, ...props }, ref) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const linkContent = (
    <span className={cn('flex items-center justify-start gap-3 rounded-md p-2')}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child) && child.type !== 'string' ? child : null
      )}
      {!collapsed && (
        <span className="truncate">
          {React.Children.map(children, (child) =>
            typeof child === 'string' || (React.isValidElement(child) && typeof child.props.children === 'string')
              ? child
              : null
          )}
        </span>
      )}
    </span>
  );

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          ref={ref}
          className={cn(
            'text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
            isActive && 'bg-accent text-accent-foreground',
            collapsed && 'flex items-center justify-center',
            className
          )}
          {...props}
        >
          {linkContent}
        </Link>
      </TooltipTrigger>
      {collapsed && (
        <TooltipContent side="right">
          {React.Children.map(children, (child) =>
            typeof child === 'string' || (React.isValidElement(child) && typeof child.props.children === 'string')
              ? child
              : null
          )}
        </TooltipContent>
      )}
    </Tooltip>
  );
});
SidebarNavLink.displayName = 'SidebarNavLink';

function SidebarFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mt-auto border-t p-2', className)} {...props} />;
}

export {
  Sidebar,
  SidebarHeader,
  SidebarHeaderTitle,
  SidebarContent,
  SidebarNav,
  SidebarNavLink,
  SidebarFooter,
};
