<script setup>
const props = defineProps({ 
    tittle: String,
    before: String,
    link: String
});
</script>
<template lang="">
    <div class="text-white flex flex-row justify-between bg-[#393E46] lg:w-[70%] md:w-[85%] w-[90%] mx-auto p-4 mt-20 mb-2 rounded-md">
        <h1><router-link :to="link">{{ before }}</router-link> {{ tittle }} </h1>
        <div class="flex flex-row gap-2">
            <input type="checkbox" name="nsfw" id="nsfw" @click="$emit('nsfw')" class="border-none rounded-full">
            <label for="nsfw" class="font-bold">NSFW</label>
        </div>

    </div>
</template>