<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import Card from '../CardComp.vue';
import breadCrumb from '../breadCrumb.vue';

// State
const animeList = ref([]);
const namaKategori = ref('');
const currentPage = ref(1);
const totalPage = ref(1);
const nsfw = ref(true);

// Route params
const route = useRoute();

const dataAnimeByCategory = async (categoryId) => {
    try {
        let animeResponse;
        let genreResponse;

        if (route.path.startsWith('/kategori/genre')) {
            [animeResponse, genreResponse] = await axios.all([
                axios.get('https://api.jikan.moe/v4/anime', {
                    params: {
                        genres: categoryId,
                        page: currentPage.value,
                        limit: 25,
                        sfw: nsfw.value
                    }
                }),
                axios.get('https://api.jikan.moe/v4/genres/anime')
            ]);
            namaKategori.value = genreResponse.data.data.find(g => g.mal_id == categoryId).name;
        } else {
            animeResponse = await axios.get('https://api.jikan.moe/v4/top/anime', {
                params: {
                    page: currentPage.value,
                    limit: 25,
                    sfw: nsfw.value
                }
            });
            namaKategori.value = 'Top Anime';
        }

        animeList.value = animeResponse.data.data;
        totalPage.value = Math.ceil(animeResponse.data.pagination.items.total / 25);
    } catch (error) {
        console.log(error);
    }
};

onMounted(() => {
    dataAnimeByCategory(route.params.id);
});

watch(() => route.params.id, (newId) => {
    currentPage.value = 1;
    dataAnimeByCategory(newId);
});

const changePage = (page) => {
    if (page > 0 && page <= totalPage.value) {
        currentPage.value = page;
        dataAnimeByCategory(route.params.id);
    }
};

const changeNsfw = () => {
    nsfw.value = !nsfw.value;
    dataAnimeByCategory(route.params.id);
};

</script>

<template>
    <breadCrumb :tittle="' / ' + namaKategori" :before="'Kategori'" :link="'/kategori/genre'" @nsfw="changeNsfw"/>
    <div class="lg:w-[70%] md:w-[85%] w-[90%] grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 my-3 bg-[#393E46] p-4 mx-auto rounded-md place-items-center">
        <Card v-for="a in animeList" :key="a.mal_id" :anime="a"/>
    </div>
    <!-- Pagination -->
    <div class="border-[#F96D00] text-white rounded-md border-2 flex flex-col gap-4 md:flex-row justify-center p-3 bg-[#393E46] lg:w-[70%] md:w-[85%] w-[90%] text-center mx-auto my-2 mt-4">
       <button @click="changePage(currentPage - 1)" :disabled="currentPage <= 1" class="font-bold" :class="{ 'hover:text-[#F96D00]': currentPage > 1 }">Previous</button>
       <span>Page {{ currentPage }} of {{ totalPage }}</span>
       <button @click="changePage(currentPage + 1)" :disabled="currentPage >= totalPage" class="font-bold" :class="{ 'hover:text-[#F96D00]': currentPage < totalPage }">Next</button>
   </div>
</template>
