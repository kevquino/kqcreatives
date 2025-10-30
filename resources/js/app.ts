import '../css/app.css';

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import type { DefineComponent } from 'vue';
import { createApp, h } from 'vue';
import { initializeTheme } from './composables/useAppearance';

// PrimeVue 4.x imports
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

// PrimeVue will handle CSS through the theme preset
import ToastService from 'primevue/toastservice';

// Import PrimeVue components
import Card from 'primevue/card';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ProgressBar from 'primevue/progressbar';
import Badge from 'primevue/badge';
import Tag from 'primevue/tag';
import Toolbar from 'primevue/toolbar';
import FileUpload from 'primevue/fileupload';
import Rating from 'primevue/rating';
import Dialog from 'primevue/dialog';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Dropdown from 'primevue/dropdown';
import RadioButton from 'primevue/radiobutton';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';

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
        
        // Register all PrimeVue components
        app.component('Card', Card);
        app.component('Button', Button);
        app.component('InputText', InputText);
        app.component('DataTable', DataTable);
        app.component('Column', Column);
        app.component('ProgressBar', ProgressBar);
        app.component('Badge', Badge);
        app.component('Tag', Tag);
        app.component('Toolbar', Toolbar);
        app.component('FileUpload', FileUpload);
        app.component('Rating', Rating);
        app.component('Dialog', Dialog);
        app.component('IconField', IconField);
        app.component('InputIcon', InputIcon);
        app.component('Dropdown', Dropdown);
        app.component('RadioButton', RadioButton);
        app.component('InputNumber', InputNumber);
        app.component('Textarea', Textarea);
        app.component('Toast', Toast);
        
        // PrimeVue configuration with Aura theme and proper dark mode
        app.use(PrimeVue, {
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: '.dark',
                }
            },
            ripple: true
        });
        
        // Add ToastService
        app.use(ToastService);
        
        app.use(plugin);
        
        // Initialize your appearance system
        initializeTheme();
        
        // Set up theme synchronization for PrimeVue
        const updatePrimeVueTheme = () => {
            const isDark = document.documentElement.classList.contains('dark');
            document.documentElement.setAttribute('data-pr-theme', isDark ? 'dark' : 'light');
        };

        // Initial theme setup
        updatePrimeVueTheme();
        
        // Watch for theme changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    updatePrimeVueTheme();
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        // Mount the app
        app.mount(el);

        // Return the app instance (required by Inertia)
        return app;
    },
    progress: {
        color: '#4B5563',
    },
});