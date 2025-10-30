<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue';

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
import { useToast } from 'primevue/usetoast';

// Define FilterMatchMode manually
const FilterMatchMode = {
    CONTAINS: 'contains'
};

// Define TypeScript interfaces
interface Product {
    id: string;
    code: string;
    name: string;
    description: string;
    image: string;
    price: number;
    category: string;
    quantity: number;
    inventoryStatus: string;
    rating: number;
}

interface StatusOption {
    label: string;
    value: string;
}

interface StatData {
    label: string;
    value: string;
    growth: string;
    icon: string;
    trend: 'up' | 'down';
}

interface Activity {
    id: number;
    action: string;
    user: string;
    time: string;
    status: string;
}

interface RecentOrder {
    id: string;
    customer: string;
    product: string;
    amount: number;
    status: string;
    date: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

// User greeting based on time of day
const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
};

const greeting = getGreeting();
const userName = 'Alex Johnson'; // This could come from your auth system

// Sample data for demonstration
const recentActivities = ref<Activity[]>([
    { id: 1, action: 'User Login', user: 'John Doe', time: '2 min ago', status: 'Completed' },
    { id: 2, action: 'Data Export', user: 'Jane Smith', time: '5 min ago', status: 'Processing' },
    { id: 3, action: 'Report Generated', user: 'Mike Johnson', time: '10 min ago', status: 'Completed' },
    { id: 4, action: 'System Backup', user: 'System', time: '15 min ago', status: 'Failed' },
    { id: 5, action: 'Payment Received', user: 'Sarah Wilson', time: '1 hour ago', status: 'Completed' },
]);

const recentOrders = ref<RecentOrder[]>([
    { id: 'ORD-001', customer: 'Sarah Wilson', product: 'MacBook Pro', amount: 2499, status: 'Completed', date: '2024-01-15' },
    { id: 'ORD-002', customer: 'Mike Chen', product: 'iPhone 15', amount: 999, status: 'Processing', date: '2024-01-15' },
    { id: 'ORD-003', customer: 'Emma Davis', product: 'AirPods Pro', amount: 249, status: 'Pending', date: '2024-01-14' },
    { id: 'ORD-004', customer: 'James Brown', product: 'iPad Air', amount: 599, status: 'Completed', date: '2024-01-14' },
    { id: 'ORD-005', customer: 'Lisa Taylor', product: 'Apple Watch', amount: 399, status: 'Cancelled', date: '2024-01-13' },
]);

const statsData = ref<StatData[]>([
    { label: 'Total Revenue', value: '$45,678', growth: '+12.5%', icon: 'pi pi-dollar', trend: 'up' },
    { label: 'New Customers', value: '1,234', growth: '+8.2%', icon: 'pi pi-users', trend: 'up' },
    { label: 'Orders', value: '567', growth: '+23.1%', icon: 'pi pi-shopping-cart', trend: 'up' },
    { label: 'Conversion Rate', value: '3.24%', growth: '-1.2%', icon: 'pi pi-chart-line', trend: 'down' },
]);

// Product Management Data
const toast = useToast();
const dt = ref();
const products = ref<Product[]>([]);
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref<Partial<Product>>({});
const selectedProducts = ref<Product[]>();
const filters = ref({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const submitted = ref(false);
const statuses = ref<StatusOption[]>([
    { label: 'INSTOCK', value: 'instock' },
    { label: 'LOWSTOCK', value: 'lowstock' },
    { label: 'OUTOFSTOCK', value: 'outofstock' }
]);

// Mock product data
const mockProducts: Product[] = [
    {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5
    },
    {
        id: '1001',
        code: 'nvklal433',
        name: 'Black Watch',
        description: 'Product Description',
        image: 'black-watch.jpg',
        price: 72,
        category: 'Accessories',
        quantity: 61,
        inventoryStatus: 'INSTOCK',
        rating: 4
    },
    {
        id: '1002',
        code: 'zz21cz3c1',
        name: 'Blue Band',
        description: 'Product Description',
        image: 'blue-band.jpg',
        price: 79,
        category: 'Fitness',
        quantity: 2,
        inventoryStatus: 'LOWSTOCK',
        rating: 3
    },
    {
        id: '1003',
        code: '244wgerg2',
        name: 'Blue T-Shirt',
        description: 'Product Description',
        image: 'blue-t-shirt.jpg',
        price: 29,
        category: 'Clothing',
        quantity: 25,
        inventoryStatus: 'INSTOCK',
        rating: 5
    },
    {
        id: '1004',
        code: 'h456wer53',
        name: 'Bracelet',
        description: 'Product Description',
        image: 'bracelet.jpg',
        price: 15,
        category: 'Accessories',
        quantity: 73,
        inventoryStatus: 'INSTOCK',
        rating: 4
    },
    {
        id: '1005',
        code: 'av2231fwg',
        name: 'Brown Purse',
        description: 'Product Description',
        image: 'brown-purse.jpg',
        price: 120,
        category: 'Accessories',
        quantity: 0,
        inventoryStatus: 'OUTOFSTOCK',
        rating: 4
    }
];

onMounted(() => {
    // Simulate API call
    products.value = mockProducts;
});

const getStatusSeverity = (status: string) => {
    switch (status) {
        case 'Completed': return 'success';
        case 'Processing': return 'warning';
        case 'Failed': return 'danger';
        case 'Pending': return 'info';
        case 'Cancelled': return 'danger';
        default: return 'info';
    }
};

const getOrderStatusSeverity = (status: string) => {
    switch (status) {
        case 'Completed': return 'success';
        case 'Processing': return 'warning';
        case 'Pending': return 'info';
        case 'Cancelled': return 'danger';
        default: return 'info';
    }
};

const getTrendSeverity = (trend: 'up' | 'down') => {
    return trend === 'up' ? 'success' : 'danger';
};

// Product Management Functions
const formatCurrency = (value: number) => {
    if (value)
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return '';
};

const openNew = () => {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
};

const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
};

const saveProduct = () => {
    submitted.value = true;

    if (product.value?.name?.trim()) {
        if (product.value.id) {
            // For existing product
            product.value.inventoryStatus = (product.value.inventoryStatus as any)?.value 
                ? (product.value.inventoryStatus as any).value 
                : product.value.inventoryStatus;
            
            const index = findIndexById(product.value.id);
            if (index !== -1) {
                products.value[index] = { ...product.value } as Product;
            }
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        } else {
            // For new product
            const newProduct: Product = {
                id: createId(),
                code: createId(),
                name: product.value.name || '',
                description: product.value.description || '',
                image: 'product-placeholder.svg',
                price: product.value.price || 0,
                category: product.value.category || '',
                quantity: product.value.quantity || 0,
                inventoryStatus: (product.value.inventoryStatus as any)?.value 
                    ? (product.value.inventoryStatus as any).value 
                    : product.value.inventoryStatus || 'INSTOCK',
                rating: 0
            };
            products.value.push(newProduct);
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        }

        productDialog.value = false;
        product.value = {};
    }
};

const editProduct = (prod: Product) => {
    product.value = { ...prod };
    productDialog.value = true;
};

const confirmDeleteProduct = (prod: Product) => {
    product.value = prod;
    deleteProductDialog.value = true;
};

const deleteProduct = () => {
    if (product.value.id) {
        products.value = products.value.filter(val => val.id !== product.value.id);
        deleteProductDialog.value = false;
        product.value = {};
        toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    }
};

const findIndexById = (id: string) => {
    return products.value.findIndex(product => product.id === id);
};

const createId = () => {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
};

const exportCSV = () => {
    if (dt.value) {
        dt.value.exportCSV();
    }
};

const confirmDeleteSelected = () => {
    deleteProductsDialog.value = true;
};

const deleteSelectedProducts = () => {
    if (selectedProducts.value) {
        products.value = products.value.filter(val => !selectedProducts.value!.includes(val));
        deleteProductsDialog.value = false;
        selectedProducts.value = undefined;
        toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    }
};

const getStatusLabel = (status: string) => {
    switch (status) {
        case 'INSTOCK':
            return 'success';
        case 'LOWSTOCK':
            return 'warning';
        case 'OUTOFSTOCK':
            return 'danger';
        default:
            return null;
    }
};

const getActivityIcon = (status: string) => {
    switch (status) {
        case 'Completed': return 'pi pi-check-circle text-green-500';
        case 'Processing': return 'pi pi-spinner text-yellow-500';
        case 'Failed': return 'pi pi-times-circle text-red-500';
        default: return 'pi pi-info-circle text-blue-500';
    }
};
</script>

<template>
    <Head title="Dashboard" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-6 p-6">
            <!-- Toast component for notifications -->
            <Toast />

            <!-- Header Section with Greeting -->
            <div class="flex flex-col gap-2">
                <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ greeting }}, {{ userName }}! 👋</h1>
                <p class="text-gray-600 dark:text-gray-400">Here's what's happening with your business today.</p>
            </div>

            <!-- Stats Cards Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card v-for="stat in statsData" :key="stat.label" class="shadow-lg border-0">
                    <template #content>
                        <div class="flex flex-col gap-3">
                            <div class="flex items-center justify-between">
                                <div>
                                    <span class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ stat.label }}</span>
                                    <div class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ stat.value }}</div>
                                </div>
                                <div class="text-2xl p-3 rounded-lg" 
                                     :class="stat.trend === 'up' ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'">
                                    <i :class="stat.icon"></i>
                                </div>
                            </div>
                            <div class="flex items-center gap-2">
                                <Badge :value="stat.growth" :severity="getTrendSeverity(stat.trend)" />
                                <span class="text-xs text-gray-500 dark:text-gray-400">from last week</span>
                            </div>
                        </div>
                    </template>
                </Card>
            </div>

            <!-- Main Content Grid -->
            <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <!-- Recent Orders Table -->
                <div class="xl:col-span-2">
                    <Card class="shadow-lg border-0">
                        <template #title>
                            <div class="flex items-center justify-between">
                                <span class="text-lg font-semibold">Recent Orders</span>
                                <Button label="View All" icon="pi pi-arrow-right" text />
                            </div>
                        </template>
                        <template #content>
                            <DataTable :value="recentOrders" class="p-datatable-sm" paginator :rows="5"
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                :rowsPerPageOptions="[5, 10, 25]"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} orders">
                                <Column field="id" header="Order ID" sortable style="min-width: 120px"></Column>
                                <Column field="customer" header="Customer" sortable style="min-width: 140px"></Column>
                                <Column field="product" header="Product" sortable style="min-width: 140px"></Column>
                                <Column field="amount" header="Amount" sortable style="min-width: 100px">
                                    <template #body="slotProps">
                                        {{ formatCurrency(slotProps.data.amount) }}
                                    </template>
                                </Column>
                                <Column field="status" header="Status" sortable style="min-width: 120px">
                                    <template #body="slotProps">
                                        <Tag 
                                            :value="slotProps.data.status" 
                                            :severity="getOrderStatusSeverity(slotProps.data.status)"
                                        />
                                    </template>
                                </Column>
                                <Column field="date" header="Date" sortable style="min-width: 120px"></Column>
                                <Column :exportable="false" style="min-width: 80px">
                                    <template #body>
                                        <Button icon="pi pi-ellipsis-v" text rounded />
                                    </template>
                                </Column>
                            </DataTable>
                        </template>
                    </Card>
                </div>

                <!-- Recent Activities & Quick Stats -->
                <div class="flex flex-col gap-6">
                    <!-- Recent Activities -->
                    <Card class="shadow-lg border-0">
                        <template #title>
                            <span class="text-lg font-semibold">Recent Activities</span>
                        </template>
                        <template #content>
                            <div class="space-y-4">
                                <div v-for="activity in recentActivities" :key="activity.id" 
                                     class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <div class="flex-shrink-0 mt-1">
                                        <i :class="getActivityIcon(activity.status)" class="text-lg"></i>
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-medium text-gray-900 dark:text-white">{{ activity.action }}</p>
                                        <p class="text-xs text-gray-500 dark:text-gray-400">{{ activity.user }} • {{ activity.time }}</p>
                                    </div>
                                    <Tag :value="activity.status" :severity="getStatusSeverity(activity.status)" class="text-xs" />
                                </div>
                            </div>
                        </template>
                    </Card>

                    <!-- Quick Stats Card -->
                    <Card class="shadow-lg border-0 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        <template #content>
                            <div class="flex flex-col gap-4">
                                <div class="flex items-center gap-3">
                                    <div class="p-2 bg-white/20 rounded-lg">
                                        <i class="pi pi-chart-bar text-xl"></i>
                                    </div>
                                    <div>
                                        <div class="text-sm opacity-90">Monthly Goal</div>
                                        <div class="text-xl font-bold">85% Completed</div>
                                    </div>
                                </div>
                                <ProgressBar :value="85" class="h-2 [&_.p-progressbar-value]:bg-white" />
                                <Button label="View Details" icon="pi pi-arrow-right" text class="justify-start p-0 text-white hover:bg-white/10 w-fit" />
                            </div>
                        </template>
                    </Card>
                </div>
            </div>

            <!-- Product Management Section -->
            <Card class="shadow-lg border-0">
                <template #title>
                    <div class="flex items-center justify-between">
                        <span class="text-lg font-semibold">Product Management</span>
                        <div class="flex gap-2">
                            <Button label="Export" icon="pi pi-download" severity="secondary" outlined @click="exportCSV()" />
                            <Button label="New Product" icon="pi pi-plus" @click="openNew" />
                        </div>
                    </div>
                </template>
                <template #content>
                    <div class="card">
                        <Toolbar class="mb-4">
                            <template #start>
                                <Button 
                                    label="Delete Selected" 
                                    icon="pi pi-trash" 
                                    severity="danger" 
                                    @click="confirmDeleteSelected" 
                                    :disabled="!selectedProducts || !selectedProducts.length" 
                                />
                            </template>

                            <template #end>
                                <FileUpload 
                                    mode="basic" 
                                    accept="image/*" 
                                    :maxFileSize="1000000" 
                                    label="Import" 
                                    chooseLabel="Import" 
                                    class="mr-2" 
                                />
                                <IconField iconPosition="left">
                                    <InputIcon class="pi pi-search" />
                                    <InputText v-model="filters['global'].value" placeholder="Search products..." />
                                </IconField>
                            </template>
                        </Toolbar>

                        <DataTable
                            ref="dt"
                            v-model:selection="selectedProducts"
                            :value="products"
                            dataKey="id"
                            :paginator="true"
                            :rows="5"
                            :filters="filters"
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            :rowsPerPageOptions="[5, 10, 25]"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                            class="p-datatable-sm"
                        >
                            <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                            <Column field="code" header="Code" sortable style="min-width: 8rem"></Column>
                            <Column field="name" header="Name" sortable style="min-width: 12rem"></Column>
                            <Column header="Image" style="min-width: 6rem">
                                <template #body="slotProps">
                                    <img 
                                        :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`" 
                                        :alt="slotProps.data.image" 
                                        class="rounded border shadow-sm" 
                                        style="width: 48px; height: 48px; object-fit: cover;" 
                                    />
                                </template>
                            </Column>
                            <Column field="price" header="Price" sortable style="min-width: 8rem">
                                <template #body="slotProps">
                                    {{ formatCurrency(slotProps.data.price) }}
                                </template>
                            </Column>
                            <Column field="category" header="Category" sortable style="min-width: 10rem"></Column>
                            <Column field="rating" header="Reviews" sortable style="min-width: 10rem">
                                <template #body="slotProps">
                                    <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />
                                </template>
                            </Column>
                            <Column field="inventoryStatus" header="Status" sortable style="min-width: 10rem">
                                <template #body="slotProps">
                                    <Tag 
                                        :value="slotProps.data.inventoryStatus" 
                                        :severity="getStatusLabel(slotProps.data.inventoryStatus)" 
                                    />
                                </template>
                            </Column>
                            <Column :exportable="false" style="min-width: 10rem">
                                <template #body="slotProps">
                                    <Button 
                                        icon="pi pi-pencil" 
                                        rounded 
                                        text
                                        class="mr-2" 
                                        @click="editProduct(slotProps.data)" 
                                    />
                                    <Button 
                                        icon="pi pi-trash" 
                                        rounded 
                                        text
                                        severity="danger" 
                                        @click="confirmDeleteProduct(slotProps.data)" 
                                    />
                                </template>
                            </Column>
                        </DataTable>
                    </div>
                </template>
            </Card>

            <!-- Product Management Dialogs -->
            <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Product Details" :modal="true" class="p-fluid">
                <div class="flex flex-col gap-4">
                    <div class="field">
                        <label for="name" class="font-semibold">Name</label>
                        <InputText 
                            id="name" 
                            v-model.trim="product.name" 
                            required="true" 
                            autofocus 
                            :class="{ 'p-invalid': submitted && !product.name }" 
                        />
                        <small class="p-error" v-if="submitted && !product.name">Name is required.</small>
                    </div>
                    <div class="field">
                        <label for="description" class="font-semibold">Description</label>
                        <Textarea 
                            id="description" 
                            v-model="product.description" 
                            required="true" 
                            rows="3" 
                            cols="20" 
                        />
                    </div>
                    <div class="field">
                        <label for="inventoryStatus" class="font-semibold">Inventory Status</label>
                        <Dropdown 
                            id="inventoryStatus" 
                            v-model="product.inventoryStatus" 
                            :options="statuses" 
                            optionLabel="label" 
                            placeholder="Select a Status" 
                        />
                    </div>
                    <div class="field">
                        <label class="font-semibold mb-3 block">Category</label>
                        <div class="grid grid-cols-2 gap-2">
                            <div class="flex items-center">
                                <RadioButton id="category1" v-model="product.category" name="category" value="Accessories" />
                                <label for="category1" class="ml-2">Accessories</label>
                            </div>
                            <div class="flex items-center">
                                <RadioButton id="category2" v-model="product.category" name="category" value="Clothing" />
                                <label for="category2" class="ml-2">Clothing</label>
                            </div>
                            <div class="flex items-center">
                                <RadioButton id="category3" v-model="product.category" name="category" value="Electronics" />
                                <label for="category3" class="ml-2">Electronics</label>
                            </div>
                            <div class="flex items-center">
                                <RadioButton id="category4" v-model="product.category" name="category" value="Fitness" />
                                <label for="category4" class="ml-2">Fitness</label>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="field">
                            <label for="price" class="font-semibold">Price</label>
                            <InputNumber 
                                id="price" 
                                v-model="product.price" 
                                mode="currency" 
                                currency="USD" 
                                locale="en-US" 
                            />
                        </div>
                        <div class="field">
                            <label for="quantity" class="font-semibold">Quantity</label>
                            <InputNumber 
                                id="quantity" 
                                v-model="product.quantity" 
                                integeronly 
                            />
                        </div>
                    </div>
                </div>
                <template #footer>
                    <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
                    <Button label="Save" icon="pi pi-check" @click="saveProduct" />
                </template>
            </Dialog>

            <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                <div class="flex items-center gap-4">
                    <i class="pi pi-exclamation-triangle text-3xl text-red-500" />
                    <span v-if="product">
                        Are you sure you want to delete <b>{{ product.name }}</b>?
                    </span>
                </div>
                <template #footer>
                    <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false" />
                    <Button label="Yes" icon="pi pi-check" text @click="deleteProduct" severity="danger" />
                </template>
            </Dialog>

            <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                <div class="flex items-center gap-4">
                    <i class="pi pi-exclamation-triangle text-3xl text-red-500" />
                    <span>Are you sure you want to delete the selected products?</span>
                </div>
                <template #footer>
                    <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false" />
                    <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" severity="danger" />
                </template>
            </Dialog>
        </div>
    </AppLayout>
</template>