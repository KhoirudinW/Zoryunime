<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Card from '../CardComp.vue';

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

const animeTopList = ref([]);
const animeNowList = ref([]);
const animeUpComingList = ref([]);
const nsfw = ref(true);
const searchResult = ref([]);
const searching = ref(false);
const searchQuery = ref("");


onMounted(async () => {
    try {
        const [Top, now, upcoming] = await axios.all([
            axios.get("https://api.jikan.moe/v4/top/anime"),
            axios.get("https://api.jikan.moe/v4/seasons/now"),
            axios.get("https://api.jikan.moe/v4/seasons/upcoming"),
        ]);
        animeTopList.value = Top.data.data.slice(0, 8);
        animeNowList.value = now.data.data.slice(0, 8);
        animeUpComingList.value = upcoming.data.data.slice(0, 8);
    } catch (error) {
        console.log(error);
    }
});

const searchAnime = debounce(async () => {
    if (searchQuery.value.trim() !== "") {
        searching.value = true;
        try {
            const response = await axios.get('https://api.jikan.moe/v4/anime', {
                params: {
                    q: searchQuery.value,
                    limit: 24,
                    sfw: nsfw.value,
                }
            });
            searchResult.value = response.data.data;
        } catch (error) {
            console.log(error);
        }
    } else {
        searching.value = false;
    }
}, 300); // Delay set to 300ms

const changeNsfw = () => {
    nsfw.value = !nsfw.value;
    searchAnime();
}
</script>
<template class="" lang="">
    <div class="text-white  bg-[#393E46] lg:w-[70%] md:w-[85%] w-[90%] mx-auto p-4 mt-20 mb-2 rounded-md">
        <div class="mx-auto flex lg:w-[40%] md:w-[60%] my-2 relative">
            <input v-model="searchQuery" type="search" @input="searchAnime" class="w-full py-2 pl-8 pr-2 rounded-md bg-slate-800 border-[#F96D00] border-2 focus:outline-none" placeholder="Search">
            <svg class="absolute top-[0.60rem] left-2 w-6 h-6 text-[#F96D00] " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="search"><g class="fill-current"><path d="m20.71 19.29-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z"></path></g></svg>
        </div>

        <div v-if="searching" class="">
            <div class="flex flex-row justify-between items-center px-5 py-2">
                <h1>Search Result</h1>
                <div class="flex flex-row gap-2">
                    <input type="checkbox" name="nsfw" id="nsfw" @click="changeNsfw" class="border-none rounded-full">
                    <label for="nsfw" class="font-bold">NSFW</label>
                </div>
            </div>
            <hr>
            <div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4 my-3 place-items-center">
                <Card v-for="a in searchResult" :key="a.mal_id" :anime="a" />
            </div>
        </div>
        <div v-if="!searching" class="">
            <div class="">
                <div class="flex flex-row justify-between items-baseline px-5 py-2">
                    <h1>Top Anime</h1>
                    <a href="/kategori/top" class="bg-yellow-500 font-bold py-1 px-2 rounded-md">Show more</a>
                </div>
                <hr>
                <div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4 my-3 place-items-center">
                    <Card v-for="a in animeTopList" :key="a.mal_id" :anime="a"/>
                </div>
            </div>
            <div class="">
                <div class="flex flex-row justify-between items-baseline px-5 py-2">
                    <h1>Season Now</h1>
                    <a href="/kategori/season/now" class="bg-yellow-500 font-bold py-1 px-2 rounded-md">Show more</a>
                </div>
                <hr>
                <div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4 my-3 place-items-center">
                    <Card v-for="a in animeNowList" :key="a.mal_id" :anime="a"/>
                </div>
            </div>
            <div class="">
                <div class="flex flex-row justify-between items-baseline px-5 py-2">
                    <h1>Upcoming Season</h1>
                    <a href="/kategori/season/upcoming" class="bg-yellow-500 font-bold py-1 px-2 rounded-md">Show more</a>
                </div>
                <hr>
                <div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4 my-3 place-items-center">
                    <Card v-for="a in animeUpComingList" :key="a.mal_id" :anime="a"/>
                </div>
            </div>
        </div>
    </div>
</template>