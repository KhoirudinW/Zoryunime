<script setup>
    import ModalLogin from "./ModalLogin.vue";
    import NavItems from "./NavItems.vue";
    import { ref } from "vue";

    const status = ref("");
    const model = ref("");
    const device = ref(false);
    const dropdownKategori = ref(false);

    function chooseCategory() {
        dropdownKategori.value = true;
    }

    function hideCategory() {
        dropdownKategori.value = false;
    }
</script>
<template lang="">
    <div class="bg-[#393E46] h-20 p-5 flex justify-between md:justify-around items-center select-none">
        <div class="w-20">
            <h1 class="text-2xl font-bold text-white"><span class="text-[#F96D00]">Zoryu</span>nime</h1>
        </div>
        <ul class="hidden md:flex gap-4 items-center text-white">
            <li><router-link to="/" class="font-bold transition-all duration-150 ease-in-out py-1 hover:text-[#F96D00]" :class="{ 'text-[#F96D00]  border-b-2': $route.path === '/' }">Home</router-link></li>

            <li class="relative" @mouseover="chooseCategory" @mouseleave="hideCategory">
                <span class="font-bold transition-all duration-150 ease-in-out py-1 hover:text-[#F96D00] cursor-pointer" :class="{ 'text-[#F96D00] border-b-2': $route.path === '/kategori/season' || $route.path === '/kategori/genre' }"
                >Kategori</span>
                <div v-if="dropdownKategori" class="absolute w-40 flex flex-col gap-1 top-[1.6rem] bg-[#393E46] text-white p-2 border-2 border-[#F96D00] rounded-md z-40">
                    <router-link to="/kategori/genre" class="font-bold transition-all duration-150 ease-in-out py-1 hover:text-[#F96D00] cursor-pointer">Genre</router-link>
                    <hr>
                    <router-link to="/kategori/season" class="font-bold transition-all duration-150 ease-in-out py-1 hover:text-[#F96D00] cursor-pointer">Musim</router-link>
                </div>
            </li>

            <li><router-link to="/search" class="font-bold transition-all duration-150 ease-in-out py-1 hover:text-[#F96D00]" :class="{ 'text-[#F96D00] border-b-2': $route.path === '/search' }">Search</router-link></li>
        </ul>
        <ul
            class="hidden md:flex gap-4 w-44 items-center"
            v-if="status === 'login'"
        >
            <li>
                <button
                    @click="status = ''"
                    class="bg-red-600 px-4 py-1 rounded-md font-bold text-white"
                >
                    logout
                </button>
            </li>
            <li>
                <button>
                    <img
                        class="size-10 rounded-full"
                        src="../assets/nopict.png"
                        alt=""
                    />
                </button>
            </li>
        </ul>
        <ul class="hidden md:flex gap-4 w-44 items-center" v-else>
            <li>
                <button
                    class="bg-green-600 px-4 py-1 rounded-md font-bold text-white"
                    @click="model = 'Login'"
                >
                    Login
                </button>
            </li>
            <li>
                <button
                    class="bg-blue-600 px-4 py-1 rounded-md font-bold text-white"
                    @click="model = 'Register'"
                >
                    Register
                </button>
            </li>
        </ul>
        <button
            class="md:hidden flex items-center"
            @click="device === true ? (device = false) : (device = true)"
        >
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50" class="size-9">
                <path class="fill-[#F96D00]" d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z"></path>
            </svg>
        </button>

        <NavItems
            :status="status"
            v-if="device"
            @model="model = $event"
            @status="status = $event"
        />

        <ModalLogin
            class="z-50 absolute md:right-24 top-24 right-1/2 md:translate-x-0 translate-x-1/2"
            v-if="model === 'Login'"
            @close="model = false"
            @submit="
                model = false;
                status = 'login';
            "
            :title="model"
        />
        <ModalLogin
            class="z-50 absolute md:right-24 top-24 right-1/2 md:translate-x-0 translate-x-1/2"
            v-else-if="model === 'Register'"
            @close="model = false"
            @submit="
                model = false;
                status = 'login';
            "
            :title="model"
        />
    </div>
    <div class="bg-[#F96D00] w-full h-1"></div>
</template>
