<template>
  <div class="lg:w-[70%] md:w-[85%] w-[90%] my-20 mx-auto bg-[#393E46] text-white p-4 rounded-md">
    <h2 class="text-2xl font-bold mb-4 text-center">Kategori anime berdasarkan genre</h2>
    <div class="w-full my-2 h-1 bg-[#F96D00]"></div>
    <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <li v-for="category in categories" :key="category.mal_id" class="py-2 px-2 hover:bg-[#2f333a] transition duration-300">
        <router-link :to="'/kategori/genre/' + category.mal_id" class="text-lg font-medium text-white hover:text-[#F96D00]"><button class="w-full">{{ category.name }}</button></router-link>
      </li>
    </ul>
  </div>
</template>

  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        categories: [], // Daftar kategori anime
      };
    },
    created() {
      this.fetchCategories();
    },
    methods: {
      async fetchCategories() {
        try {
          const response = await axios.get('https://api.jikan.moe/v4/genres/anime', {
          });
          this.categories = response.data.data;
        } catch (error) {
          console.error("Error fetching categories from Jikan:", error);
        }
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
  </style>
  