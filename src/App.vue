<script setup>
    import { ref } from "vue";

    const model = ref("");
</script>
<template class="border">
    <Navbar class="text-white" />
    <div class="min-h-[70vh]">
        <router-view />
    </div>
    <Footer class="text-white" />
</template>
