import '../css/app.css';

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import type { DefineComponent } from 'vue';
import { createApp, h } from 'vue';
import { initializeTheme } from './composables/useAppearance';

// PrimeVue 4.x imports - using the new theme system
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import 'primeicons/primeicons.css';

// Import and register components globally
import Card from 'primevue/card';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ProgressBar from 'primevue/progressbar';
import Badge from 'primevue/badge';
import Tag from 'primevue/tag';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.vue`,
            import.meta.glob<DefineComponent>('./pages/**/*.vue'),
        ),
    setup({ el, App, props, plugin }) {
        const app = createApp({ render: () => h(App, props) });
        
        // Register components globally
        app.component('Card', Card);
        app.component('Button', Button);
        app.component('InputText', InputText);
        app.component('DataTable', DataTable);
        app.component('Column', Column);
        app.component('ProgressBar', ProgressBar);
        app.component('Badge', Badge);
        app.component('Tag', Tag);
        
        // Use PrimeVue with Aura theme - CORRECT CONFIGURATION
        app.use(PrimeVue, {
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: '.dark', // or 'media' for system preference
                    cssLayer: false
                }
            },
            ripple: true,
            unstyled: false // Make sure this is false to apply styles
        } as any);
        
        app.use(plugin).mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});

initializeTheme();