import type { App } from 'vue';
import PrimeVue from 'primevue/config';

// Import available components from your installation
import Card from 'primevue/card';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ProgressBar from 'primevue/progressbar';

// Import styles
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.css';
import 'primeicons/primeicons.css';

const PrimeVuePlugin = {
    install(app: App) {
        app.use(PrimeVue, {
            ripple: true,
        });

        // Register components globally
        const components = {
            Card,
            Button,
            InputText,
            DataTable,
            Column,
            ProgressBar
        };

        Object.entries(components).forEach(([name, component]) => {
            app.component(name, component);
        });
    }
};

export default PrimeVuePlugin;