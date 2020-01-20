/**
 * interface for the dashboard link
 */
export interface DashboardLink {
    title: string;
    link: string;
    icon: React.Component;
}

/**
 * the mobile drawer links
 */
export const mobileDrawerLinks: DashboardLink[] = [];

/**
 * the drawer links for the desktop
 */
export const desktopDrawerLinks: DashboardLink[] = [];
