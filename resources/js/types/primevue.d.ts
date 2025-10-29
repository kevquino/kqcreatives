// PrimeVue 4.x type declarations
declare module 'primevue/config' {
    import type { Plugin } from 'vue';
    
    interface PrimeVueOptions {
        ripple?: boolean;
        inputStyle?: 'outlined' | 'filled';
        unstyled?: boolean;
        pt?: any;
        ptOptions?: any;
        theme?: {
            preset?: any;
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

// Theme declarations for @primeuix/themes
declare module '@primeuix/themes/aura' {
    const Aura: any;
    export default Aura;
}