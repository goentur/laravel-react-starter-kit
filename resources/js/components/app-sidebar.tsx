import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Key, LayoutGrid, UserRoundCog, Users } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: 'dashboard',
        icon: LayoutGrid,
        permission: 'dashboard'
    },
    {
        title: 'Managament Pengguna',
        href: '#',
        icon: Users,
        items: [
            {
                title: 'Role',
                href: 'role.index',
                permission: 'role-index',
            },
            {
                title: 'Permission',
                href: 'permission.index',
                permission: 'permission-index',
            },
        ]
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Role',
        href: 'role.index',
        icon: UserRoundCog,
        permission: 'role-index',
    },
    {
        title: 'Permission',
        href: 'permission.index',
        icon: Key,
        permission: 'permission-index',
    }
];

export function AppSidebar() {
    const { permissions }: any = usePage().props.auth
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={route('dashboard')} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} permissions={permissions} title="Dashboard" />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} permissions={permissions} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
