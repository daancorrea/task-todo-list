<template>
    <div>
        <TaskList />
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex';
import TaskList from '@/components/TaskList.vue';

export default defineComponent({
  components: {
    TaskList,
  },
  setup() {
    const store = useStore();
    onMounted(() => {
      if (!store.state.task.tasks.length) {
        store.dispatch('task/fetchTasks');
      }
    });

    return {
      store,
    };
  },
});
</script>
