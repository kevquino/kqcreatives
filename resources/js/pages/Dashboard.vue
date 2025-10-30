<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import PlaceholderPattern from '../components/PlaceholderPattern.vue';
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
}

interface Activity {
    id: number;
    action: string;
    user: string;
    time: string;
    status: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

// Sample data for demonstration
const testInput = ref('');
const recentActivities = ref<Activity[]>([
    { id: 1, action: 'User Login', user: 'John Doe', time: '2 min ago', status: 'Completed' },
    { id: 2, action: 'Data Export', user: 'Jane Smith', time: '5 min ago', status: 'Processing' },
    { id: 3, action: 'Report Generated', user: 'Mike Johnson', time: '10 min ago', status: 'Completed' },
    { id: 4, action: 'System Backup', user: 'System', time: '15 min ago', status: 'Failed' },
]);

const statsData = ref<StatData[]>([
    { label: 'Total Users', value: '1,234', growth: '+12%', icon: 'pi pi-users' },
    { label: 'Revenue', value: '$45,678', growth: '+8%', icon: 'pi pi-dollar' },
    { label: 'Orders', value: '567', growth: '+23%', icon: 'pi pi-shopping-cart' },
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
        default: return 'info';
    }
};

const showAlert = () => {
    alert(`You entered: ${testInput.value}`);
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
</script>

<template>
    <Head title="Dashboard" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <!-- Toast component for notifications -->
            <Toast />

            <!-- PrimeVue Stats Cards -->
            <div class="grid auto-rows-min gap-4 md:grid-cols-3">
                <Card v-for="stat in statsData" :key="stat.label" class="shadow-lg p-3">
                    <template #content>
                        <div class="flex items-center justify-between">
                            <div>
                                <span class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ stat.label }}</span>
                                <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ stat.value }}</div>
                                <Badge :value="stat.growth" severity="success" class="mt-2" />
                            </div>
                            <div class="text-3xl text-blue-500 dark:text-blue-400">
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
                    <template #title>
                        <span class="text-lg font-semibold">Quick Actions</span>
                    </template>
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
                    <template #title>
                        <span class="text-lg font-semibold">System Status</span>
                    </template>
                    <template #content>
                        <div class="space-y-4">
                            <div>
                                <div class="flex justify-between mb-1 text-sm">
                                    <span class="text-gray-600 dark:text-gray-300">CPU Usage</span>
                                    <span class="font-medium">65%</span>
                                </div>
                                <ProgressBar :value="65" class="h-2" />
                            </div>
                            <div>
                                <div class="flex justify-between mb-1 text-sm">
                                    <span class="text-gray-600 dark:text-gray-300">Memory</span>
                                    <span class="font-medium">42%</span>
                                </div>
                                <ProgressBar :value="42" class="h-2" />
                            </div>
                            <div>
                                <div class="flex justify-between mb-1 text-sm">
                                    <span class="text-gray-600 dark:text-gray-300">Storage</span>
                                    <span class="font-medium">78%</span>
                                </div>
                                <ProgressBar :value="78" class="h-2" />
                            </div>
                        </div>
                    </template>
                </Card>
            </div>

            <!-- Product Management Section -->
            <Card class="shadow-lg">
                <template #title>
                    <span class="text-lg font-semibold">Product Management</span>
                </template>
                <template #content>
                    <div class="card">
                        <Toolbar class="mb-4">
                            <template #start>
                                <Button label="New" icon="pi pi-plus" class="mr-2" @click="openNew" />
                                <Button 
                                    label="Delete" 
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
                                <Button label="Export" icon="pi pi-upload" severity="secondary" @click="exportCSV()" />
                            </template>
                        </Toolbar>

                        <DataTable
                            ref="dt"
                            v-model:selection="selectedProducts"
                            :value="products"
                            dataKey="id"
                            :paginator="true"
                            :rows="10"
                            :filters="filters"
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            :rowsPerPageOptions="[5, 10, 25]"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                            class="p-datatable-sm"
                        >
                            <template #header>
                                <div class="flex flex-wrap gap-2 items-center justify-between">
                                    <h4 class="m-0 text-lg font-semibold">Manage Products</h4>
                                    <IconField iconPosition="left">
                                        <InputIcon class="pi pi-search" />
                                        <InputText v-model="filters['global'].value" placeholder="Search..." />
                                    </IconField>
                                </div>
                            </template>

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

            <!-- Recent Activities Table -->
            <Card class="shadow-lg">
                <template #title>
                    <span class="text-lg font-semibold">Recent Activities</span>
                </template>
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
                    <Button label="Yes" icon="pi pi-check" text @click="deleteProduct" />
                </template>
            </Dialog>

            <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                <div class="flex items-center gap-4">
                    <i class="pi pi-exclamation-triangle text-3xl text-red-500" />
                    <span>Are you sure you want to delete the selected products?</span>
                </div>
                <template #footer>
                    <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false" />
                    <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
                </template>
            </Dialog>

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