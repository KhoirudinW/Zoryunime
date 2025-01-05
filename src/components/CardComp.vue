<script setup>
    const props = defineProps({ anime: Array });
</script>
<template lang="">
    <router-link
        :to="'/detail'"
        class="relative w-32 h-48 bg-[#222831] overflow-hidden group/card"
    >
        <img
            :src="anime.images.webp.large_image_url"
            class="w-full h-full"
            alt=""
        />
        <div
            class="bg-gradient-to-t -bottom-60 absolute from-black w-full transition-all delay-100 duration-200 h-1/2 group-hover/card:bottom-0"
        >
            <h1
                class="text-center -bottom-60 absolute text-white text-sm transition-all delay-100 duration-300 px-4 group-hover/card:bottom-7"
            >
                {{ anime.title }}
            </h1>
        </div>
    </router-link>
</template>
