import { Module } from "vuex";
import api from "@/config/api";
import { Task } from "@/types/task";

interface TaskState {
  tasks: Task[];
}

const taskStore: Module<TaskState, any> = {
  namespaced: true,
  state: {
    tasks: [],
  },
  mutations: {
    SET_TASKS(state, tasks: Task[]) {
      state.tasks = tasks;
    },
    ADD_TASK(state, task: Task) {
      state.tasks.push(task);
    },
    UPDATE_TASK(state, updatedTask: Task) {
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks.splice(index, 1, updatedTask);
      }
    },
    DELETE_TASK(state, taskId: number) {
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },
  },
  actions: {
    async fetchTasks({ commit, rootState }) {
      try {
        const token = rootState.user.token;
        const response = await api.get("/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        commit("SET_TASKS", response.data);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
        throw error;
      }
    },
    async toggleTaskStatus(
      { commit },
      { id, status }: { id: number; status: string }
    ) {
      try {
        const response = await api.put(`/tasks/status/${id}`, { status });
        commit("UPDATE_TASK", response.data);
      } catch (error) {
        console.error("Erro ao atualizar status da tarefa:", error);
        throw error;
      }
    },
    async deleteTask({ commit }, taskId: number) {
      try {
        await api.delete(`/tasks/${taskId}`);
        commit("DELETE_TASK", taskId);
      } catch (error) {
        console.error("Erro ao deletar tarefa:", error);
        throw error;
      }
    },
    async editTask(
      { commit },
      {
        id,
        title,
        description,
        status,
      }: { id: number; title: string; description: string; status: string }
    ) {
      try {
        const response = await api.put(`/tasks/${id}`, {
          title,
          description,
          status,
        });
        commit("UPDATE_TASK", response.data);
      } catch (error) {
        console.error("Erro ao editar tarefa:", error);
        throw error;
      }
    },
    async createTask(
      { commit },
      {
        title,
        description,
        status,
        dueDate,
      }: { title: string; description: string; status: string; dueDate: string }
    ) {
      try {
        const response = await api.post("/tasks", {
          title,
          description,
          status,
          dueDate,
        });
        commit("ADD_TASK", response.data);
      } catch (error) {
        console.error("Erro ao criar tarefa:", error);
        throw error;
      }
    },
  },
};

export default taskStore;
