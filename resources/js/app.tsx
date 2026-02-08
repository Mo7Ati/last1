import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import './i18n';
import { PanelType } from '@/types';
import { changeLanguage } from 'i18next';
import { DirectionProvider } from './components/ui/direction';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        const { currentLocale, panel } = props.initialPage?.props;

        initializeTheme(panel as PanelType);
        changeLanguage(currentLocale as string);

        root.render(
            <DirectionProvider dir={currentLocale === 'ar' ? 'rtl' : 'ltr'}>
                <App {...props} />
            </DirectionProvider>
            // <StrictMode>
            // </StrictMode>,
        );
    },
    progress: {
        color: '#f59e0b',
    },
});
