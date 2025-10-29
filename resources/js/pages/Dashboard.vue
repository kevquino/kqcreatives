<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import PlaceholderPattern from '../components/PlaceholderPattern.vue';
import { ref } from 'vue';

// Import PrimeVue components with type assertions if needed
import Card from 'primevue/card';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ProgressBar from 'primevue/progressbar';
import Badge from 'primevue/badge';
import Tag from 'primevue/tag';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

// Sample data for demonstration
const testInput = ref('');
const recentActivities = ref([
    { id: 1, action: 'User Login', user: 'John Doe', time: '2 min ago', status: 'Completed' },
    { id: 2, action: 'Data Export', user: 'Jane Smith', time: '5 min ago', status: 'Processing' },
    { id: 3, action: 'Report Generated', user: 'Mike Johnson', time: '10 min ago', status: 'Completed' },
    { id: 4, action: 'System Backup', user: 'System', time: '15 min ago', status: 'Failed' },
]);

const statsData = ref([
    { label: 'Total Users', value: '1,234', growth: '+12%', icon: 'pi pi-users' },
    { label: 'Revenue', value: '$45,678', growth: '+8%', icon: 'pi pi-dollar' },
    { label: 'Orders', value: '567', growth: '+23%', icon: 'pi pi-shopping-cart' },
]);

const getStatusSeverity = (status: string) => {
    switch (status) {
        case 'Completed': return 'success';
        case 'Processing': return 'warning';
        case 'Failed': return 'danger';
        default: return 'info';
    }
};

const showAlert = () => {
    alert(`You entered: ${testInput.value}`);
};
</script>

<template>
    <Head title="Dashboard" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div
            class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4"
        >
            <!-- PrimeVue Stats Cards -->
            <div class="grid auto-rows-min gap-4 md:grid-cols-3">
                <Card v-for="stat in statsData" :key="stat.label" class="shadow-lg">
                    <template #content>
                        <div class="flex items-center justify-between">
                            <div>
                                <span class="text-sm font-medium text-gray-500">{{ stat.label }}</span>
                                <div class="text-2xl font-bold">{{ stat.value }}</div>
                                <Badge :value="stat.growth" severity="success" />
                            </div>
                            <div class="text-3xl text-blue-500">
                                <i :class="stat.icon"></i>
                            </div>
                        </div>
                    </template>
                </Card>
            </div>

            <!-- PrimeVue Interactive Section -->
            <div class="grid gap-4 md:grid-cols-2">
                <!-- Quick Actions Card -->
                <Card class="shadow-lg">
                    <template #title>Quick Actions</template>
                    <template #content>
                        <div class="flex flex-col space-y-3">
                            <InputText 
                                v-model="testInput" 
                                placeholder="Enter something to test..." 
                                class="w-full"
                            />
                            <Button 
                                label="Test Input" 
                                icon="pi pi-check" 
                                class="w-full"
                                @click="showAlert"
                                :disabled="!testInput"
                            />
                            <div class="flex gap-2">
                                <Button label="Export" icon="pi pi-download" severity="secondary" class="flex-1" />
                                <Button label="Settings" icon="pi pi-cog" severity="secondary" class="flex-1" />
                            </div>
                        </div>
                    </template>
                </Card>

                <!-- System Status Card -->
                <Card class="shadow-lg">
                    <template #title>System Status</template>
                    <template #content>
                        <div class="space-y-4">
                            <div>
                                <div class="flex justify-between mb-1">
                                    <span>CPU Usage</span>
                                    <span>65%</span>
                                </div>
                                <ProgressBar :value="65" class="h-2" />
                            </div>
                            <div>
                                <div class="flex justify-between mb-1">
                                    <span>Memory</span>
                                    <span>42%</span>
                                </div>
                                <ProgressBar :value="42" class="h-2" />
                            </div>
                            <div>
                                <div class="flex justify-between mb-1">
                                    <span>Storage</span>
                                    <span>78%</span>
                                </div>
                                <ProgressBar :value="78" class="h-2" />
                            </div>
                        </div>
                    </template>
                </Card>
            </div>

            <!-- Recent Activities Table -->
            <Card class="shadow-lg">
                <template #title>Recent Activities</template>
                <template #content>
                    <DataTable :value="recentActivities" class="p-datatable-sm" paginator :rows="5">
                        <Column field="action" header="Action"></Column>
                        <Column field="user" header="User"></Column>
                        <Column field="time" header="Time"></Column>
                        <Column field="status" header="Status">
                            <template #body="slotProps">
                                <Tag 
                                    :value="slotProps.data.status" 
                                    :severity="getStatusSeverity(slotProps.data.status)"
                                />
                            </template>
                        </Column>
                    </DataTable>
                </template>
            </Card>

            <!-- Original Placeholder Sections -->
            <div class="grid auto-rows-min gap-4 md:grid-cols-3">
                <div
                    class="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border"
                >
                    <PlaceholderPattern />
                </div>
                <div
                    class="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border"
                >
                    <PlaceholderPattern />
                </div>
                <div
                    class="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border"
                >
                    <PlaceholderPattern />
                </div>
            </div>
            <div
                class="relative min-h-[100vh] flex-1 rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border"
            >
                <PlaceholderPattern />
            </div>
        </div>
    </AppLayout>
</template>