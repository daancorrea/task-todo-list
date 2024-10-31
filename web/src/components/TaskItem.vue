<template>
  <div class="bg-white shadow-md rounded-lg p-4 mb-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <input type="checkbox" :checked="task.status === Status.DONE" @change="toggleStatus" class="mr-2" />
        <div v-if="isEditing" class="flex flex-col">
          <input v-model="editedTitle" type="text"
            class="text-xl font-semibold text-gray-800 border-b-2 border-gray-300 focus:border-indigo-500 outline-none mb-2" />
          <input v-model="editedDescription"
            class="text-sm text-gray-500 border-b-2 border-gray-300 focus:border-indigo-500 outline-none mb-2"
            type="text" />
        </div>
        <div v-else>
          <p class="text-xl font-semibold text-gray-800">{{ task.title }}</p>
          <p class="text-sm text-gray-500">{{ task.description }} - {{ formatDate(task.dueDate) }}</p>
          <p class="text-sm font-semibold" :class="task.status === Status.DONE ? 'text-green-500' : 'text-yellow-500'">
            {{ task.status === Status.DONE ? 'Concluída' : 'Pendente' }}
          </p>
        </div>
      </div>
      <div class="flex gap-2">
        <button v-if="isEditing" @click="saveTask"
          class="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition">
          Salvar
        </button>
        <button v-if="isEditing" @click="cancelEdit"
          class="bg-gray-300 text-black px-4 py-1 rounded hover:bg-gray-400 transition">
          Cancelar
        </button>
        <button v-else @click="editTask" class="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition">
          Editar
        </button>
        <button @click="confirmDelete" class="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition">
          Excluir
        </button>
      </div>
    </div>
    <div v-if="showDeleteConfirmation" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded shadow-lg w-80">
        <p class="text-center font-semibold mb-4">Tem certeza que deseja excluir?</p>
        <div class="flex justify-around">
          <button @click="deleteTask" class="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">Sim</button>
          <button @click="showDeleteConfirmation = false"
            class="bg-gray-300 text-black px-4 py-1 rounded hover:bg-gray-400">
            Não
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { Task, Status } from '@/types/task';

export default defineComponent({
  props: {
    task: {
      type: Object as () => Task,
      required: true,
    }
  },
  setup(props, { emit }) {
    const store = useStore();
    const isEditing = ref(false);
    const showDeleteConfirmation = ref(false);
    const editedTitle = ref(props.task.title);
    const editedDescription = ref(props.task.description);

    const editTask = () => {
      isEditing.value = true;
    };

    const cancelEdit = () => {
      isEditing.value = false;
      editedTitle.value = props.task.title;
      editedDescription.value = props.task.description;
    };

    const saveTask = async () => {
      try {
        await store.dispatch("task/editTask", {
          id: props.task.id,
          title: editedTitle.value,
          description: editedDescription.value,
          status: props.task.status
        });
        isEditing.value = false;
        emit("update");
      } catch (error) {
        console.error("Erro ao salvar tarefa:", error);
      }
    };

    const confirmDelete = () => {
      showDeleteConfirmation.value = true;
    };

    const deleteTask = async () => {
      showDeleteConfirmation.value = false;
      try {
        await store.dispatch("task/deleteTask", props.task.id);
        emit("update");
      } catch (error) {
        console.error("Erro ao excluir tarefa:", error);
      }
    };

    const toggleStatus = async () => {
      const newStatus = props.task.status === Status.DONE ? Status.PENDING : Status.DONE;
      try {
        await store.dispatch("task/toggleTaskStatus", { id: props.task.id, status: newStatus });
        emit("update");
      } catch (error) {
        console.error("Erro ao atualizar status da tarefa:", error);
      }
    };

    const formatDate = (date: string): string => {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      };
      return new Date(date).toLocaleDateString(undefined, options);
    };

    return {
      Status,
      isEditing,
      showDeleteConfirmation,
      editedTitle,
      editedDescription,
      editTask,
      cancelEdit,
      saveTask,
      confirmDelete,
      deleteTask,
      toggleStatus,
      formatDate
    };
  }
});
</script>

<style scoped>
.task-item {
  position: relative;
  transition: all 0.3s ease-in-out;
  border-left: 6px solid #4f46e5;
}

.task-item.bg-gray-100 {
  background-color: #f0f4f8;
}

.task-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.task-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 6px;
  background-color: #4f46e5;
  border-radius: 2px 0 0 2px;
}
</style>
