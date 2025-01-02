<template lang="">
    <div class="text-white bg-[#393E46] lg:w-[70%] md:w-[85%] w-[90%] mx-auto p-4 my-2 rounded-md">
        <h1><a href="">Kategori</a> / {{ namaKategori }}</h1>
    </div>
    <div class="lg:w-[70%] md:w-[85%] w-[90%] md:w- grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 my-3 bg-[#393E46] p-4 mx-auto rounded-md place-items-center">
        <router-link :to="'/detail'" v-for="anime in animeList" :key="anime.mal_id" class="relative w-32 h-48 bg-[#222831] overflow-hidden group/card">
            <img :src="anime.images.webp.large_image_url" class="w-full h-full" alt="">
            <div class="bg-gradient-to-t -bottom-60 absolute from-black w-full transition-all delay-100 duration-200 h-1/2 group-hover/card:bottom-0">
                <h1 class="text-center -bottom-60 absolute text-white text-sm transition-all delay-100 duration-300 px-4 group-hover/card:bottom-7">{{ anime.title }}</h1>
            </div>
        </router-link>
    </div>
    <!-- Pagination -->
    <div class="border-[#F96D00] text-white rounded-md border-2 flex flex-col gap-4 md:flex-row justify-center p-3 bg-[#393E46] lg:w-[70%] md:w-[85%] w-[90%] text-center mx-auto my-2 mt-4">
       <button @click="changePage(currentPage - 1)" :disabled="currentPage <= 1" class="font-bold" :class="{ 'hover:text-[#F96D00]': currentPage > 1 }">Previous</button>
       <span>Page {{ currentPage }} of {{ totalPage }}</span>
       <button @click="changePage(currentPage + 1)" :disabled="currentPage >= totalPage" class="font-bold hover:text-[#F96D00]" :class="{ 'hover:text-[#F96D00]': currentPage < totalPage }">Next</button>
   </div>
</template>

<script setup>
    import { ref, onMounted, watch } from 'vue';
    import { useRoute } from 'vue-router';
    import axios from 'axios';

    //state
    const animeList = ref([]);
    const namaKategori = ref('');
    const currentPage = ref(1);
    const totalPage = ref(1);
    
    //Route params
    const route = useRoute();

    const dataAnimeByCategory = async (categoryId) => {
        try {
            const [anime, genre] = await axios.all([
                axios.get('https://api.jikan.moe/v4/anime', {
                    params: {
                        genres: categoryId,
                        page: currentPage.value,
                        limit: 25
                    }, 
                }),
                axios.get('https://api.jikan.moe/v4/genres/anime')
            ]) 
            animeList.value = anime.data.data;
            namaKategori.value = genre.data.data[route.params.id - 1].name;
            totalPage.value = Math.ceil(anime.data.pagination.items.total / 25);
            console.log(totalPage.value);
        } catch (error) {
            console.log(error)
        }
    }

    onMounted(() => {
        dataAnimeByCategory(route.params.id);
    });
    watch(()=>route.params.id, (newId) => {
        console.log(newId);
        currentPage.value = 1;
        dataAnimeByCategory(newId);
    });

    const changePage = (page) => {
        if (page > 0 && page <= totalPage.value) {
            currentPage.value = page;
            dataAnimeByCategory(route.params.id);
        }
    }

</script>