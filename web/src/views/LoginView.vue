<template>
    <div>
        <UserLogin />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserLogin from '@/components/UserLogin.vue';

export default defineComponent({
    components: {
        UserLogin,
    },
});
</script>