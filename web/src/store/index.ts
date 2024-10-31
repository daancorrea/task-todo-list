import { createStore } from 'vuex';
import userStore from './user-store';
import taskStore from './task-store';

const store = createStore({
  modules: {
    user: userStore,
    task: taskStore,
  },
});

export default store;
