// PrimeVue 4.x type declarations
declare module 'primevue/config' {
    import type { Plugin } from 'vue';
    
    interface CSSLayerOptions {
        name: string;
        order: string;
    }

    interface PrimeVueOptions {
        ripple?: boolean;
        inputStyle?: 'outlined' | 'filled';
        unstyled?: boolean;
        pt?: any;
        ptOptions?: any;
        theme?: {
            preset?: any;
            options?: {
                darkModeSelector?: string;
                cssLayer?: boolean | CSSLayerOptions;
            };
        };
    }
    
    const PrimeVue: Plugin<[PrimeVueOptions?]>;
    export default PrimeVue;
}

// Component declarations
declare module 'primevue/card';
declare module 'primevue/button';
declare module 'primevue/inputtext';
declare module 'primevue/datatable';
declare module 'primevue/column';
declare module 'primevue/progressbar';
declare module 'primevue/badge';
declare module 'primevue/tag';
declare module 'primevue/toolbar';
declare module 'primevue/fileupload';
declare module 'primevue/rating';
declare module 'primevue/dialog';
declare module 'primevue/iconfield';
declare module 'primevue/inputicon';
declare module 'primevue/dropdown';
declare module 'primevue/radiobutton';
declare module 'primevue/inputnumber';
declare module 'primevue/textarea';
declare module 'primevue/toast';
declare module 'primevue/usetoast';

// Theme declarations for @primeuix/themes
declare module '@primeuix/themes/aura' {
    const Aura: any;
    export default Aura;
}