<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="bg-white shadow-lg p-8 rounded-lg max-w-sm w-full">
            <h2 class="text-2xl font-semibold text-center mb-6">Login</h2>
            <form @submit.prevent="submitLogin" class="space-y-4">
                <input type="text" v-model="email" placeholder="Email" required
                    class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                <div class="relative">
                    <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Senha" required
                        class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                    <span class="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                        @click="togglePasswordVisibility">
                        <EyeIcon v-if="!showPassword" class="h-5 w-5 text-gray-500" />
                        <EyeOffIcon v-else class="h-5 w-5 text-gray-500" />
                    </span>
                </div>
                <button type="submit"
                    class="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400">
                    Entrar
                </button>
            </form>
            <div class="text-center mt-4">
                <button @click="goToRegister" class="text-indigo-500 hover:underline focus:outline-none">
                    Não possui uma conta? Registre-se
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { EyeIcon, EyeOffIcon } from '@heroicons/vue/outline';

export default defineComponent({
    components: {
        EyeIcon,
        EyeOffIcon,
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        const email = ref('');
        const password = ref('');
        const showPassword = ref(false);

        const togglePasswordVisibility = () => {
            showPassword.value = !showPassword.value;
        };

        const submitLogin = async () => {
            try {
                await store.dispatch('user/login', { email: email.value, password: password.value });
                router.push({ name: 'Tasks' });
            } catch (error) {
                console.error('Erro no login:', error);
            }
        };

        const goToRegister = () => {
            router.push({ name: 'Register' });
        };

        return {
            email,
            password,
            showPassword,
            togglePasswordVisibility,
            submitLogin,
            goToRegister,
        };
    },
});
</script>