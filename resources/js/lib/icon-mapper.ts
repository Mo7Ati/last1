import { LucideIcon } from 'lucide-react';
import {
    BookOpen,
    Folder,
    LayoutGrid,
    Menu,
    Search,
    // Add more icons as needed
} from 'lucide-react';

/**
 * Map of icon names to their corresponding Lucide React components
 */
const iconMap: Record<string, LucideIcon> = {
    LayoutGrid,
    BookOpen,
    Folder,
    Menu,
    Search,
    // Add more icon mappings as needed
};

/**
 * Get icon component by name
 * @param iconName - The name of the icon (e.g., 'LayoutGrid')
 * @returns The icon component or null if not found
 */
export function getIconByName(iconName: string | null | undefined): LucideIcon | null {
    if (!iconName) {
        return null;
    }
    return iconMap[iconName] || null;
}



