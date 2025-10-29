<!-- In your current AppLayout.vue -->
<script setup lang="ts">
import AppLayout from '@/layouts/app/AppSidebarLayout.vue';
import Toast from 'primevue/toast'; // Add this import
import type { BreadcrumbItemType } from '@/types';

interface Props {
    breadcrumbs?: BreadcrumbItemType[];
}

withDefaults(defineProps<Props>(), {
    breadcrumbs: () => [],
});
</script>

<template>
    <div>
        <Toast />
        <AppLayout :breadcrumbs="breadcrumbs">
            <slot />
        </AppLayout>
    </div>
</template>