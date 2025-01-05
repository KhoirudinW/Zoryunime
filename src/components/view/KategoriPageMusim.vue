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

const dataAnimeByCategory = async (year, season) => {
    try {
        let response;

        if (year === 'now') {
            response = await axios.get('https://api.jikan.moe/v4/seasons/now', {
                params: {
                    page: currentPage.value,
                    limit: 25,
                    sfw: nsfw.value
                }
            });
        } else if (year === 'upcoming') {
            response = await axios.get('https://api.jikan.moe/v4/seasons/upcoming', {
                params: {
                    page: currentPage.value,
                    limit: 25,
                    sfw: nsfw.value
                }
            });
        } else {
            response = await axios.get(`https://api.jikan.moe/v4/seasons/${year}/${season}`, {
                params: {
                    page: currentPage.value,
                    limit: 25,
                    sfw: nsfw.value
                }
            });
        }

        animeList.value = response.data.data;
        namaKategori.value = year;
        totalPage.value = Math.ceil(response.data.pagination.items.total / 25);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

onMounted(() => {
    dataAnimeByCategory(route.params.year, route.params.season);
});

watch(() => [route.params.year, route.params.season], ([newYear, newSeason]) => {
    dataAnimeByCategory(newYear, newSeason);
});

const changePage = (page) => {
    if (page > 0 && page <= totalPage.value) {
        currentPage.value = page;
        dataAnimeByCategory(route.params.year, route.params.season);
    }
};

const changeNsfw = () => {
    nsfw.value = !nsfw.value;
    dataAnimeByCategory(route.params.year, route.params.season);    
};

</script>

<template>
    <breadCrumb :tittle="route.params.season ? ' / ' + route.params.year + ' / ' + route.params.season : ' / ' + route.params.year" :before="'Kategori'" :link="'/kategori/season'" @nsfw="changeNsfw"/>
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
