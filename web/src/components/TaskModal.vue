<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h3 class="text-xl font-semibold mb-4">Nova Tarefa</h3>
            <form @submit.prevent="submitForm">
                <input
                    v-model="title"
                    type="text"
                    placeholder="Título"
                    class="border w-full px-3 py-2 mb-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                />
                <textarea
                    v-model="description"
                    placeholder="Descrição"
                    class="border w-full px-3 py-2 mb-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                ></textarea>
                <select v-model="status" class="border w-full px-3 py-2 mb-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="PENDING">Pendente</option>
                    <option value="DONE">Concluída</option>
                </select>
                <input
                    v-model="dueDate"
                    type="datetime-local"
                    class="border w-full px-3 py-2 mb-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                />
                <div class="flex justify-end mt-4">
                    <button @click="$emit('close')" type="button" class="bg-gray-300 px-4 py-2 mr-2 rounded hover:bg-gray-400">Cancelar</button>
                    <button type="submit" class="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">Salvar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    setup(_, { emit }) {
        const title = ref('');
        const description = ref('');
        const status = ref('PENDING');
        const dueDate = ref('');

        const submitForm = () => {
            emit('createTask', {
                title: title.value,
                description: description.value,
                status: status.value,
                dueDate: new Date(dueDate.value).toISOString(),
            });
        };

        return {
            title,
            description,
            status,
            dueDate,
            submitForm,
        };
    },
});
</script>
