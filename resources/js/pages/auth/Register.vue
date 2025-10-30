<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import TextLink from '@/components/TextLink.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthBase from '@/layouts/AuthLayout.vue';
import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head } from '@inertiajs/vue3';
import { LoaderCircle } from 'lucide-vue-next';
import { ref } from 'vue';

const passwordFieldType = ref('password');
const confirmPasswordFieldType = ref('password');

const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    if (field === 'password') {
        passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
    } else {
        confirmPasswordFieldType.value = confirmPasswordFieldType.value === 'password' ? 'text' : 'password';
    }
};
</script>

<template>
    <Head title="Register" />
    
    <div
        class="min-h-screen px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:px-20 lg:py-20 flex items-center justify-center backdrop-blur-3xl bg-cover bg-center bg-no-repeat"
        style="background-image: url('https://fqjltiegiezfetthbags.supabase.co/storage/v1/object/public/block.images/blocks/signin/signin-glass.jpg')"
    >
        <div class="px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 lg:px-12 lg:py-12 flex flex-col items-center gap-8 sm:gap-10 md:gap-12 w-full backdrop-blur-2xl rounded-2xl bg-white/80 dark:bg-gray-900/80 border border-white/20 dark:border-gray-700/20 shadow-2xl max-w-xs sm:max-w-sm md:max-w-md">
            <div class="flex flex-col items-center gap-4 w-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 sm:h-14 sm:w-14" width="33" height="32" viewBox="0 0 33 32" fill="none">
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.09219 2.87829C5.94766 3.67858 4.9127 4.62478 4.01426 5.68992C7.6857 5.34906 12.3501 5.90564 17.7655 8.61335C23.5484 11.5047 28.205 11.6025 31.4458 10.9773C31.1517 10.087 30.7815 9.23135 30.343 8.41791C26.6332 8.80919 21.8772 8.29127 16.3345 5.51998C12.8148 3.76014 9.71221 3.03521 7.09219 2.87829ZM28.1759 5.33332C25.2462 2.06 20.9887 0 16.25 0C14.8584 0 13.5081 0.177686 12.2209 0.511584C13.9643 0.987269 15.8163 1.68319 17.7655 2.65781C21.8236 4.68682 25.3271 5.34013 28.1759 5.33332ZM32.1387 14.1025C28.2235 14.8756 22.817 14.7168 16.3345 11.4755C10.274 8.44527 5.45035 8.48343 2.19712 9.20639C2.0292 9.24367 1.86523 9.28287 1.70522 9.32367C1.2793 10.25 0.939308 11.2241 0.695362 12.2356C0.955909 12.166 1.22514 12.0998 1.50293 12.0381C5.44966 11.161 11.0261 11.1991 17.7655 14.5689C23.8261 17.5991 28.6497 17.561 31.9029 16.838C32.0144 16.8133 32.1242 16.7877 32.2322 16.7613C32.2441 16.509 32.25 16.2552 32.25 16C32.25 15.358 32.2122 14.7248 32.1387 14.1025ZM31.7098 20.1378C27.8326 20.8157 22.5836 20.5555 16.3345 17.431C10.274 14.4008 5.45035 14.439 2.19712 15.1619C1.475 15.3223 0.825392 15.5178 0.252344 15.7241C0.250782 15.8158 0.25 15.9078 0.25 16C0.25 24.8366 7.41344 32 16.25 32C23.6557 32 29.8862 26.9687 31.7098 20.1378Z"
                        class="fill-gray-900 dark:fill-white"
                    />
                </svg>
                <div class="flex flex-col gap-2 w-full">
                    <div class="text-center text-2xl sm:text-3xl font-medium text-gray-900 dark:text-white leading-tight">Create Account</div>
                    <div class="text-center text-sm sm:text-base">
                        <span class="text-gray-600 dark:text-gray-300">Already have an account? </span>
                        <TextLink 
                            :href="login()" 
                            class="text-gray-700 dark:text-gray-200 cursor-pointer hover:text-gray-900 dark:hover:text-white underline font-medium"
                        >
                            Log in
                        </TextLink>
                    </div>
                </div>
            </div>

            <Form
                v-bind="store.form()"
                :reset-on-success="['password', 'password_confirmation']"
                v-slot="{ errors, processing }"
                class="flex flex-col gap-6 sm:gap-8 w-full"
            >
                <div class="flex flex-col gap-6 w-full">
                    <!-- Name Field -->
                    <div class="grid gap-2">
                        <div class="relative">
                            <i class="pi pi-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 text-lg"></i>
                            <Input
                                id="name"
                                type="text"
                                required
                                autofocus
                                :tabindex="1"
                                autocomplete="name"
                                name="name"
                                placeholder="Full name"
                                class="pl-12 pr-4 h-12 sm:h-14 text-base sm:text-lg border border-gray-300 dark:border-gray-600 w-full outline-0 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-3xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <InputError :message="errors.name" class="text-red-600 dark:text-red-400 text-sm sm:text-base" />
                    </div>

                    <!-- Email Field -->
                    <div class="grid gap-2">
                        <div class="relative">
                            <i class="pi pi-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 text-lg"></i>
                            <Input
                                id="email"
                                type="email"
                                required
                                :tabindex="2"
                                autocomplete="email"
                                name="email"
                                placeholder="email@example.com"
                                class="pl-12 pr-4 h-12 sm:h-14 text-base sm:text-lg border border-gray-300 dark:border-gray-600 w-full outline-0 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-3xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <InputError :message="errors.email" class="text-red-600 dark:text-red-400 text-sm sm:text-base" />
                    </div>

                    <!-- Password Field -->
                    <div class="grid gap-2">
                        <div class="relative">
                            <i class="pi pi-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 text-lg"></i>
                            <Input
                                id="password"
                                :type="passwordFieldType"
                                required
                                :tabindex="3"
                                autocomplete="new-password"
                                name="password"
                                placeholder="Password"
                                class="pl-12 pr-12 h-12 sm:h-14 text-base sm:text-lg border border-gray-300 dark:border-gray-600 w-full outline-0 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-3xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                                type="button"
                                class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-lg"
                                @click="togglePasswordVisibility('password')"
                            >
                                <i :class="passwordFieldType === 'password' ? 'pi pi-eye' : 'pi pi-eye-slash'"></i>
                            </button>
                        </div>
                        <InputError :message="errors.password" class="text-red-600 dark:text-red-400 text-sm sm:text-base" />
                    </div>

                    <!-- Confirm Password Field -->
                    <div class="grid gap-2">
                        <div class="relative">
                            <i class="pi pi-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 text-lg"></i>
                            <Input
                                id="password_confirmation"
                                :type="confirmPasswordFieldType"
                                required
                                :tabindex="4"
                                autocomplete="new-password"
                                name="password_confirmation"
                                placeholder="Confirm password"
                                class="pl-12 pr-12 h-12 sm:h-14 text-base sm:text-lg border border-gray-300 dark:border-gray-600 w-full outline-0 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-3xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                                type="button"
                                class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-lg"
                                @click="togglePasswordVisibility('confirmPassword')"
                            >
                                <i :class="confirmPasswordFieldType === 'password' ? 'pi pi-eye' : 'pi pi-eye-slash'"></i>
                            </button>
                        </div>
                        <InputError :message="errors.password_confirmation" class="text-red-600 dark:text-red-400 text-sm sm:text-base" />
                    </div>

                    <!-- Submit Button -->
                    <Button
                        type="submit"
                        class="w-full rounded-3xl bg-blue-600 hover:bg-blue-700 border border-blue-600 text-white h-12 sm:h-14 mt-2 text-base sm:text-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                        tabindex="5"
                        :disabled="processing"
                        data-test="register-user-button"
                    >
                        <LoaderCircle
                            v-if="processing"
                            class="h-5 w-5 animate-spin mr-2"
                        />
                        {{ processing ? 'Creating Account...' : 'Create Account' }}
                    </Button>
                </div>
            </Form>
        </div>
    </div>
</template>

<style scoped>
/* Custom styles to ensure proper button appearance */
:deep(.button) {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 100% !important;
    border-radius: 24px !important;
    background-color: rgb(37 99 235) !important;
    border: 1px solid rgb(37 99 235) !important;
    color: white !important;
    font-weight: 500 !important;
    transition: all 0.2s ease-in-out !important;
}

:deep(.button:hover) {
    background-color: rgb(29 78 216) !important;
    transform: translateY(-1px) !important;
}

:deep(.button:disabled) {
    opacity: 0.7 !important;
    cursor: not-allowed !important;
    transform: none !important;
}

/* Input field styling */
:deep(.input) {
    font-size: 1rem !important;
    line-height: 1.5 !important;
    padding-left: 3rem !important;
    padding-right: 1rem !important;
    height: 3rem !important;
    border: 1px solid rgb(209 213 219) !important;
    background: white !important;
    color: rgb(17 24 39) !important;
    border-radius: 24px !important;
}

:deep(.dark .input) {
    border: 1px solid rgb(75 85 99) !important;
    background: rgb(31 41 55) !important;
    color: white !important;
}

:deep(.input::placeholder) {
    color: rgb(107 114 128) !important;
}

:deep(.input:focus) {
    outline: none !important;
    border-color: rgb(59 130 246) !important;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2) !important;
}

@media (min-width: 640px) {
    :deep(.input) {
        font-size: 1.125rem !important;
        height: 3.5rem !important;
    }
}
</style>