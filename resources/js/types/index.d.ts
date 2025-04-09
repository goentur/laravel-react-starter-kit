import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}
export interface IndexGate {
    gate: {
        create: boolean
        update: boolean
        delete: boolean
    }
}
export interface Gate {
    create: boolean
    update: boolean
    delete: boolean
}
export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    permission?: string;
    items? : {
        title: string
        href: string
        permission?: string;
    }[]
}

export interface SharedData {
    name: string;
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
export interface InfoDataTabel {
    page: number | 1,
    from: number | 0,
    to: number | 0,
    total: number | 0,
    perPage: number | 25,
    search: string | null,
}

export interface LinkPagination {
    label: string
    url: string | null
    active: boolean
}
