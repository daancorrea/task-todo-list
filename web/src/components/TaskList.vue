<template>
    <div>
        <div class="filters fixed top-0 w-full bg-white p-4 shadow-md">
            <input type="date" v-model="dueDateFilter"
                class="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <select v-model="statusFilter"
                class="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="">Todos</option>
                <option value="PENDING">Pendente</option>
                <option value="DONE">Concluída</option>
            </select>
            <button @click="fetchFilteredTasks"
                class="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">
                Aplicar Filtros
            </button>
            <button @click="openModal" class="bg-green-500 text-white px-4 py-2 ml-2 rounded-md hover:bg-green-600">
                Criar Nova Tarefa
            </button>
        </div>

        <div v-if="tasks && tasks.length === 0" class="mt-20">Não foram encontradas nenhuma tarefa.</div>
        <div v-else class="mt-20">
            <TaskItem v-for="task in orderedTasks" :key="task.id" :task="task" />
        </div>

        <TaskModal v-if="isModalOpen" @close="closeModal" @createTask="createTask" />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import TaskItem from './TaskItem.vue';
import TaskModal from './TaskModal.vue';
import { Task } from '@/types/task';

export default defineComponent({
    components: {
        TaskItem,
        TaskModal,
    },
    setup() {
        const store = useStore();
        const statusFilter = ref<string | null>(null);
        const dueDateFilter = ref<string | null>(null);
        const isModalOpen = ref(false);

        const tasks = computed<Task[]>(() => store.state.task.tasks || []);

        const orderedTasks = computed(() => {
            return tasks.value
                .filter((task) => {
                    const matchesStatus = statusFilter.value ? task.status === statusFilter.value : true;
                    const matchesDueDate = dueDateFilter.value
                        ? isSameDay(task.dueDate, dueDateFilter.value)
                        : true;
                    return matchesStatus && matchesDueDate;
                })
                .sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
        });
        
        const isSameDay = (taskDate: string, filterDate: string) => {
            const taskDateOnly = taskDate.split('T')[0];
            const selectedDate = new Date(filterDate);
            selectedDate.setDate(selectedDate.getDate() + 1);
            const incrementedDate = selectedDate.toISOString().split('T')[0];
            return taskDateOnly === incrementedDate;
        };

        const fetchFilteredTasks = () => {
            store.dispatch('task/fetchFilteredTasks', { status: statusFilter.value, dueDate: dueDateFilter.value });
        };

        const openModal = () => {
            isModalOpen.value = true;
        };

        const closeModal = () => {
            isModalOpen.value = false;
        };

        const createTask = (taskData: Task) => {
            store.dispatch('task/createTask', taskData);
            closeModal();
        };

        onMounted(fetchFilteredTasks);

        return {
            tasks,
            orderedTasks,
            statusFilter,
            dueDateFilter,
            fetchFilteredTasks,
            isModalOpen,
            openModal,
            closeModal,
            createTask,
        };
    },
});
</script>
