<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="bg-white shadow-lg p-8 rounded-lg max-w-sm w-full">
            <h2 class="text-2xl font-semibold text-center mb-6">Registrar</h2>
            <form @submit.prevent="submitRegister" class="space-y-4">
                <input type="text" v-model="email" placeholder="Email" required
                    class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                <div class="relative">
                    <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Senha" required
                        minlength="8"
                        class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                    <span class="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                        @click="togglePasswordVisibility">
                        <EyeIcon v-if="!showPassword" class="h-5 w-5 text-gray-500" />
                        <EyeOffIcon v-else class="h-5 w-5 text-gray-500" />
                    </span>
                </div>
                <button type="submit"
                    class="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400">
                    Registrar
                </button>
            </form>
            <div class="text-center mt-4">
                <button @click="goToLogin" class="text-indigo-500 hover:underline focus:outline-none">
                    Já tem uma conta? Voltar para Login
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

        const submitRegister = async () => {
            if (password.value.length < 8) {
                alert('A senha deve ter pelo menos 8 caracteres.');
                return;
            }
            try {
                await store.dispatch('user/register', { email: email.value, password: password.value });
                router.push({ name: 'Tasks' });
            } catch (error) {
                console.error('Erro no registro:', error);
            }
        };

        const goToLogin = () => {
            router.push({ name: 'Login' });
        };

        return {
            email,
            password,
            showPassword,
            togglePasswordVisibility,
            submitRegister,
            goToLogin,
        };
    },
});
</script>
