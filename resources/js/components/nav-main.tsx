import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { truncateText } from './utils';

export function NavMain({ items = [], permissions, title}: { items: NavItem[], permissions: string[], title: string }) {
    const { props }:any = usePage();
    function hasPermission(item: NavItem, permissions: string[]): boolean {
        if (item.permission) {
            return permissions.includes(item.permission);
        }
        if (Array.isArray(item.items)) {
            return item.items.some((subItem) => hasPermission(subItem, permissions));
        }
        return false;
    }

    return (
        <>
            {items.filter((item) => hasPermission(item, permissions)).length > 0 && (
                <SidebarGroup className="px-2 py-0">
                    <SidebarGroupLabel>{title}</SidebarGroupLabel>
                    <SidebarMenu>
                        {items
                            .filter((item) => hasPermission(item, permissions))
                            .map((item) => {
                                const hasSubItems = Array.isArray(item.items) && item.items.length > 0;
                                if (!hasSubItems) {
                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={props.location.startsWith(route(item.href))}
                                                tooltip={{ children: item.title }}
                                            >
                                                <Link href={route(item.href)} prefetch>
                                                    {item.icon && <item.icon />}
                                                    <span>{truncateText(item.title)}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                } else {
                                    const filteredSubItems = item.items?.filter((subItem) =>
                                        hasPermission(subItem, permissions)
                                    );
                                    if (filteredSubItems?.length === 0) return null;

                                    const isSubmenuActive = filteredSubItems?.some(subItem =>
                                        props.location.startsWith(route(subItem.href))
                                    );

                                    return (
                                        <Collapsible
                                            key={item.title}
                                            asChild
                                            defaultOpen={isSubmenuActive}
                                            className="group/collapsible"
                                        >
                                            <SidebarMenuItem>
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuButton tooltip={item.title} className='cursor-pointer'>
                                                        {item.icon && <item.icon />}
                                                        <span>{truncateText(item.title)}</span>
                                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                                    </SidebarMenuButton>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent>
                                                    <SidebarMenuSub>
                                                        {filteredSubItems?.map((subItem) => (
                                                            <SidebarMenuSubItem key={subItem.title}>
                                                                <SidebarMenuSubButton 
                                                                    asChild
                                                                    isActive={props.location.startsWith(route(subItem.href))}
                                                                >
                                                                    <Link href={route(subItem.href)} prefetch>
                                                                        <span>{subItem.title}</span>
                                                                    </Link>
                                                                </SidebarMenuSubButton>
                                                            </SidebarMenuSubItem>
                                                        ))}
                                                    </SidebarMenuSub>
                                                </CollapsibleContent>
                                            </SidebarMenuItem>
                                        </Collapsible>
                                    );
                                }
                            })}
                    </SidebarMenu>
                </SidebarGroup>
            )}
        </>
    );
}
