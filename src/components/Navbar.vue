<script setup>
    import ModalLogin from "./ModalLogin.vue";
    import NavItems from "./NavItems.vue";
    import { ref } from "vue";

    const status = ref("");
    const model = ref("");
    const device = ref(false);
</script>
<template lang="">
    <div class="bg-[#393E46] h-20 p-5 flex justify-between md:justify-around items-center">
        <div class="w-20">
            <h1 class="text-2xl font-bold text-white"><span class="text-[#F96D00]">Zoryu</span>nime</h1>
        </div>
        <ul class="hidden md:flex gap-4 items-center">
            <li><router-link to="/" class="font-bold text-white transition-all duration-150 ease-in-out py-1" :class="{ 'text-[#F96D00] border-b-2': $route.path === '/' }">Home</router-link></li>
            <li><router-link to="/kategori" class="font-bold text-white transition-all duration-150 ease-in-out py-1" :class="{ 'text-[#F96D00] border-b-2': $route.path === '/kategori' }">Kategori</router-link></li>
            <li><router-link to="/list" class="font-bold text-white transition-all duration-150 ease-in-out py-1" :class="{ 'text-[#F96D00] border-b-2': $route.path === '/list' }">List</router-link></li>
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
            hamburger bar
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
