<template>
  <div class="lg:w-[70%] md:w-[85%] w-[90%] my-20 mx-auto bg-[#393E46] text-white p-4 rounded-md">
    <h2 class="text-2xl font-bold mb-4 text-center">Kategori Anime Berdasarkan Musim</h2>
    <div class="w-full my-2 h-1 bg-[#F96D00]"></div>

    <!-- Loop through each season -->
      <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <li v-for="category in categories" :key="category.mal_id" class="relative py-2 px-2 bg-[#2f333a] rounded-md">
          <div class="text-lg font-medium text-white">{{ category.year }}</div>
          <div class="flex flex-col gap-2 mt-2">
            <router-link
              v-for="season in category.seasons"
              :key="season"
              :to="'/kategori/season/' + category.year + '/' + season"
              class="text-lg font-medium text-white hover:text-[#F96D00]"
            >
              <button class="w-full">{{ season }}</button>
            </router-link>
          </div>
        </li>
      </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      categories: [], // Daftar kategori anime
      groupedCategories: {}, // Kategori yang dikelompokkan berdasarkan musim
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get("https://api.jikan.moe/v4/seasons");
        this.categories = response.data.data;
        this.groupCategoriesBySeason();
      } catch (error) {
        console.error("Error fetching categories from Jikan:", error);
      }
    },
    groupCategoriesBySeason() {
      this.groupedCategories = this.categories.reduce((acc, category) => {
        category.seasons.forEach((season) => {
          if (!acc[season]) {
            acc[season] = [];
          }
          acc[season].push(category);
        });
        return acc;
      }, {});
    },
  },
};
</script>

<style scoped>
.category-list {
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 8px;
}

li.relative {
  position: relative;
}
</style>
