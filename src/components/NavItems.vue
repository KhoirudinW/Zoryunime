<script setup>
    const props = defineProps({ status: String });
</script>
<template lang="">
    <ul
        class="absolute md:hidden left-0 top-20 bg-slate-400 p-2 w-full flex flex-col gap-3"
    >
        <li class="border-2 p-1">
            <router-link to="/"
                ><button class="text-left p-1 w-full">home</button></router-link
            >
        </li>
        <li class="border-2 p-1">
            <router-link to="/kategori"
                ><button class="text-left p-1 w-full">
                    kategori
                </button></router-link
            >
        </li>
        <li class="border-2 p-1">
            <router-link to="/list"
                ><button class="text-left p-1 w-full">List</button></router-link
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
