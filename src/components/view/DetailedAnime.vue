<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const animeDetail = ref(null);
const videos = ref([]);
const characters = ref([]);
const recommendations = ref([]);
const reviews = ref([]);
const route = useRoute();

onMounted(async () => {
  const animeId = route.params.id;
  try {
    const [animeDetailRes, videosRes, charactersRes, recommendationsRes, reviewsRes] = await axios.all([
        axios.get(`https://api.jikan.moe/v4/anime/${animeId}`),
        axios.get(`https://api.jikan.moe/v4/anime/${animeId}/videos`),
        axios.get(`https://api.jikan.moe/v4/anime/${animeId}/characters`),
        axios.get(`https://api.jikan.moe/v4/anime/${animeId}/recommendations`),
        axios.get(`https://api.jikan.moe/v4/anime/${animeId}/reviews`),
    ]);
    animeDetail.value = animeDetailRes.data.data;
    videos.value = videosRes.data.data.promo;
    characters.value = charactersRes.data.data.slice(0, 14);
    recommendations.value = recommendationsRes.data.data.slice(0, 14);
    reviews.value = reviewsRes.data.data.map(review => ({ ...review, isExpanded: false }));
    console.log(reviews.value);
  } catch (error) {
    console.log(error);
  }
});

const toggleReadMore = (review) => {
  review.isExpanded = !review.isExpanded;
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
            <span class="font-bold">Episodes: {{ animeDetail.episodes }}</span>
            <span class="font-bold">Status: {{ animeDetail.status }}</span>
            <span class="font-bold">Rating: {{ animeDetail.score }}</span>
          </div>
          <div class="mt-4">
            <h2 class="text-2xl font-bold">Genres:</h2>
            <ul class="list-disc list-inside">
              <li v-for="genre in animeDetail.genres" :key="genre.mal_id">{{ genre.name }}</li>
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
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="character in characters" :key="character.mal_id" class="flex items-center">
          <img :src="character.character.images.jpg.image_url" alt="character image" class="w-16 h-16 rounded-full mr-4">
          <div>
            <h3 class="font-bold text-clip ">{{ character.character.name }}</h3>
            <p>{{ character.role }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="recommendations.length > 0" class="mt-8">
      <h2 class="text-2xl font-bold mb-2">Recommendations</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="recommendation in recommendations" :key="recommendation.mal_id" class="flex items-center">
          <img :src="recommendation.entry.images.jpg.image_url" alt="recommendation image" class="w-16 h-16 object-contain rounded-md mr-4">
          <div class="w-[80%] flex flex-row justify-between">
            <h3 class="font-bold">{{ recommendation.entry.title }}</h3>
            <a href="" class="bg-yellow-500 font-bold py-1 px-2 rounded-md">See More</a>
          </div>
        </div>
      </div>
    </div>

    <div v-if="reviews.length > 0" class="mt-8">
      <h2 class="text-2xl font-bold mb-2">Reviews</h2>
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

    <div v-else class="text-center">Loading...</div>
  </div>
</template>
