<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import Card from "../CardComp.vue";

const animeDetail = ref(null);
const videos = ref([]);
const characters = ref([]);
const recommendations = ref([]);
const reviews = ref([]);
const seeMoreChar = ref(false);
const seeMoreComment = ref(false);
const route = useRoute();

onMounted(async () => {
  const animeId = route.params.id;
  try {
    const animeDetailRes = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}`);
    animeDetail.value = animeDetailRes.data.data;

    // Tambahkan delay kecil antar permintaan
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    await delay(500);
    const videosRes = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}/videos`);
    videos.value = videosRes.data.data.promo;

    await delay(500);
    const charactersRes = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}/characters`);
    characters.value = charactersRes.data.data;

    await delay(500);
    const recommendationsRes = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}/recommendations`);
    recommendations.value = recommendationsRes.data.data.slice(0, 14);

    await delay(500);
    const reviewsRes = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}/reviews`);
    reviews.value = reviewsRes.data.data.map(review => ({ ...review, isExpanded: false }));
  } catch (error) {
    console.log(error);
  }


});

const toggleReadMore = (review) => {
  review.isExpanded = !review.isExpanded;
};

const toggleSeeMoreChar = () => {
  seeMoreChar.value = !seeMoreChar.value;
};

const toggleSeeMoreComment = () => {
  seeMoreComment.value = !seeMoreComment.value;
};
</script>

<template>
  <div class="text-white bg-[#393E46] lg:w-[70%] md:w-[85%] w-[90%] mx-auto p-4 mt-20 mb-2 rounded-md">
    <div v-if="animeDetail" class="p-4 flex flex-col md:flex-row">
      <img :src="animeDetail.images.jpg.large_image_url" alt="anime image" class="rounded-md object-contain mx-auto mb-4 md:mb-0 md:mr-4 md:w-1/3">
      <div class="m-4">
          <h1 class="text-3xl font-bold mb-2">{{ animeDetail.title }}</h1>
          <p class="mb-4">{{ animeDetail.synopsis }}</p>
          <div class="flex flex-col md:flex-row justify-between">
            <span class="font-bold">Episodes: <span class="bg-[#F96D00] px-2 py-1 rounded-md">{{ animeDetail.episodes }}</span></span>
            <span class="font-bold">Status: <span class="bg-[#18bb21] px-2 py-1 rounded-md">{{ animeDetail.status }}</span></span>
            <span class="font-bold">Rating: <span class="bg-[#c4b91e] px-2 py-1 rounded-md">{{ animeDetail.score }}</span></span>
          </div>
          <div class="mt-4">
            <h2 class="text-2xl font-bold">Genres:</h2>
            <ul class="">
              <li v-for="genre in animeDetail.genres" :key="genre.mal_id" class="my-3 mx-2">
                <router-link :to="`/kategori/genre/${genre.mal_id}`" class="bg-blue-500 text-white px-2 py-1 rounded-md min-w-10 max-w-[100%]">
                  {{ genre.name }}
                </router-link>
              </li>
            </ul>
          </div>
      </div>
    </div>
    
    <div v-if="videos.length > 0" class="mt-8">
      <h2 class="text-2xl font-bold mb-2">Videos</h2>
      <div v-for="video in videos" :key="video.mal_id" class="grid grid-cols-1 gap-4">
          <p class="mt-2 font-bold">{{ video.title }}</p>
        <div class="rounded-md md:w-[560px] md:h-[340px] overflow-hidden">
            <iframe :src="video.trailer.embed_url" class="w-full h-full "></iframe>
        </div>
      </div>
    </div>

    <div v-if="characters.length > 0" class="mt-8">
      <h2 class="text-2xl font-bold mb-2">Characters</h2>
      <div :class=" seeMoreChar ? 'h-auto' : 'h-[400px]'" class="w-full h-[400px] overflow-hidden">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div v-for="character in characters" :key="character.mal_id" class="flex items-center">
            <img :src="character.character.images.jpg.image_url" alt="character image" class="w-16 h-16 rounded-full mr-4">
            <div>
              <h3 class="font-bold text-clip ">{{ character.character.name }}</h3>
              <p>{{ character.role }}</p>
            </div>
          </div>
        </div>
      </div>
      <button class="bg-yellow-500 font-bold py-1 px-2 rounded-md mt-5" @click="toggleSeeMoreChar()">{{ seeMoreChar ? 'See Less' : 'See More' }}</button>
    </div>

    <div v-if="recommendations.length > 0" class="mt-8">
      <h2 class="text-2xl font-bold mb-2">Recommendations</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 w-[100%] gap-4">
        <Card v-for="recommendation in recommendations" :key="recommendation.mal_id" :anime="recommendation.entry"/>
      </div>
    </div>

    <div v-if="reviews.length > 0" class="mt-8">
      <h2 class="text-2xl font-bold mb-2">Reviews</h2>
      <div :class=" seeMoreComment ? 'h-[100%]' : 'h-[560px]'" class="w-full h-[560px] overflow-hidden">
        <div class="grid grid-cols-1 gap-4">
          <div v-for="review in reviews" :key="review.mal_id" class="bg-gray-800 p-4 rounded-md">
            <h3 class="font-bold">{{ review.user.username }}</h3>
            {{ review.isExpanded ? review.review : review.review.slice(0, 100) + '...' }}
              <span v-if="review.review.length > 100" class="text-blue-500 cursor-pointer" @click="toggleReadMore(review)">
                {{ review.isExpanded ? 'Read Less' : 'Read More' }}
              </span>
          </div>
        </div>
      </div>
      <button class="bg-yellow-500 font-bold py-1 px-2 rounded-md mt-5" @click="toggleSeeMoreComment()">{{seeMoreComment ? 'See Less' : 'See More'}}</button>
    </div>

    <div v-else class="text-center">Loading...</div>
  </div>
</template>
