'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/Logo';
import {
  LayoutDashboard,
  ListChecks,
  ClipboardList,
  Library,
  Timer,
  Info,
  ShieldCheck,
} from 'lucide-react';
import { useUser } from '@/firebase';

const ADMIN_EMAIL = 's28252463@gmail.com';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/syllabus', label: 'Syllabus Tracker', icon: ListChecks },
  { href: '/dashboard/mock-tests', label: 'Mock Tests', icon: ClipboardList },
  { href: '/dashboard/study-zone', label: 'Study Zone', icon: Library },
  { href: '/dashboard/pomodoro', label: 'Pomodoro Timer', icon: Timer },
  { href: '/dashboard/about', label: 'About Us', icon: Info },
];

const adminItem = { href: '/dashboard/admin', label: 'Admin', icon: ShieldCheck };

export function DashboardNav() {
  const pathname = usePathname();
  const { user } = useUser();

  const isUserAdmin = user?.email === ADMIN_EMAIL;

  return (
    <>
      <SidebarHeader className="hidden md:flex">
        <div className="flex items-center justify-center w-full" style={{ height: '50px' }}>
          <Logo />
        </div>
      </SidebarHeader>

      <SidebarMenu className="flex-1 p-2">
        {menuItems.map(({ href, label, icon: Icon }) => (
          <SidebarMenuItem key={href}>
            <SidebarMenuButton asChild isActive={pathname === href} tooltip={label}>
              <Link href={href}>
                <Icon />
                <span>{label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>

      <SidebarFooter className="p-2">
        {isUserAdmin && (
           <SidebarMenu>
             <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === adminItem.href} tooltip={adminItem.label}>
                    <Link href={adminItem.href}>
                        <adminItem.icon />
                        <span>{adminItem.label}</span>
                    </Link>
                </SidebarMenuButton>
             </SidebarMenuItem>
           </SidebarMenu>
        )}
      </SidebarFooter>
    </>
  );
}
