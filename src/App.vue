<script setup>
    import { ref } from "vue";

    const model = ref("");
</script>
<template class="border">
    <Navbar class="text-white" />
    <div>
        <router-view />
    </div>
    <Footer class="text-white" />
</template>
