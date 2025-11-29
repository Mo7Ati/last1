import { SharedData } from '@/types';
import { PanelType } from '@/types';
import { usePage } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';

export type Appearance = 'light' | 'dark' | 'system';

const prefersDark = () => {
    if (typeof window === 'undefined') {
        return false;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const applyTheme = (appearance: Appearance) => {
    const isDark =
        appearance === 'dark' || (appearance === 'system' && prefersDark());

    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
};

const mediaQuery = () => {
    if (typeof window === 'undefined') {
        return null;
    }

    return window.matchMedia('(prefers-color-scheme: dark)');
};

export function initializeTheme(panel: PanelType) {
    const storageKey = `${panel}_appearance`;
    const savedAppearance =
        (localStorage.getItem(storageKey) as Appearance) || 'system';

    applyTheme(savedAppearance);

    const query = mediaQuery();
    if (!query) {
        return;
    }

    const handleSystemThemeChange = () => {
        const currentAppearance = localStorage.getItem(
            storageKey,
        ) as Appearance | null;
        applyTheme(currentAppearance || 'system');
    };

    // Add the event listener for system theme changes...
    query.addEventListener('change', handleSystemThemeChange);
}

export function useAppearance() {
    const [appearance, setAppearance] = useState<Appearance>('system');
    const { panel } = usePage<SharedData>().props;
    const storageKey = `${panel}_appearance`;

    const updateAppearance = useCallback((mode: Appearance) => {
        setAppearance(mode);

        // Store in localStorage for client-side persistence...
        localStorage.setItem(storageKey, mode);

        // Store in cookie for SSR...
        setCookie(storageKey, mode);

        applyTheme(mode);
    }, [storageKey]);

    useEffect(() => {
        const savedAppearance = localStorage.getItem(
            storageKey,
        ) as Appearance | null;

        // eslint-disable-next-line react-hooks/set-state-in-effect
        updateAppearance(savedAppearance || 'system');

        return () =>
            mediaQuery()?.removeEventListener('change', () => {
                /* no-op cleanup */
            });
    }, [storageKey, updateAppearance]);

    return { appearance, updateAppearance } as const;
}
