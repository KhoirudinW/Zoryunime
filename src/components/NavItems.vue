<script setup>
    const props = defineProps({ status: String });
</script>
<template lang="">

    <ul
        class="absolute md:hidden left-0 top-20 bg-[#393E46] text-white p-2 w-full flex flex-col gap-1 z-50"
    >
    <div class="w-full h-1 bg-[#F96D00] my-2"></div>
        <li class="border-2 p-1 rounded-md transition-all duration-150 ease-in-out" :class="{ 'border-[#F96D00] text-[#F96D00]': $route.path === '/' }">
            <router-link to="/"
                ><button class="text-left p-1 px-2 w-full font-bold">home</button></router-link
            >
        </li>
        <li class="border-2 p-1 rounded-md transition-all duration-150 ease-in-out" :class="{ 'border-[#F96D00] text-[#F96D00]': $route.path === '/kategori/genre' }">
            <router-link to="/kategori/genre"
                ><button class="text-left p-1 px-2 w-full font-bold">
                    kategori genre
                </button></router-link
            >
        </li>
        <li class="border-2 p-1 rounded-md transition-all duration-150 ease-in-out" :class="{ 'border-[#F96D00] text-[#F96D00]': $route.path === '/kategori/season' }">
            <router-link to="/kategori/season"
                ><button class="text-left p-1 px-2 w-full font-bold">
                    kategori musim
                </button></router-link
            >
        </li>
        <li class="border-2 p-1 rounded-md transition-all duration-150 ease-in-out" :class="{ 'border-[#F96D00] text-[#F96D00]': $route.path === '/search' }">
            <router-link to="/search"
                ><button class="text-left p-1 px-2 w-full font-bold">Search</button></router-link
            >
        </li>
        <li class="p-1">
            <ul
                class="flex h-16 gap-4 w-48 items-center float-end"
                v-if="status === 'login'"
            >
                <li>
                    <button
                        @click="$emit('status', '')"
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
            <ul
                class="flex h-16 gap-4 w-48 items-center float-end"
                v-else
            >
                <li>
                    <button
                        class="bg-green-600 px-4 py-1 rounded-md font-bold text-white"
                        @click="$emit('model', 'Login')"
                    >
                        Login
                    </button>
                </li>
                <li>
                    <button
                        class="bg-blue-600 px-4 py-1 rounded-md font-bold text-white"
                        @click="$emit('model', 'Register')"
                    >
                        Register
                    </button>
                </li>
            </ul>
        </li>
    </ul>
</template>
