<script setup>
    import { ref } from "vue";

    const model = ref("");
</script>
<template class="border">
    <Navbar />
    <div class="h-screen">
        <router-view />
    </div>
    <Footer />
</template>
