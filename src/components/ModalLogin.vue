<script setup>
    const props = defineProps({ title: String });
</script>

<template>
    <div
        class="w-72 bg-slate-400 flex flex-col justify-center items-center p-2 rounded-lg"
    >
        <h1 class="text-2xl font-bold text-white">{{ title }}</h1>
        <div>
            <div class="flex flex-col py-2 gap-2 px-3">
                <div class="">
                    <label for="name"> Username </label>
                    <input
                        class="w-full border-2 border-black rounded-lg p-1"
                        type="text"
                        id="name"
                        name="name"
                    />
                </div>
                <div class="" v-if="title === 'Register'">
                    <label for="email"> Email </label>
                    <input
                        class="w-full border-2 border-black rounded-lg p-1"
                        type="email"
                        id="email"
                        name="email"
                    />
                </div>
                <div class="">
                    <label for="password"> Password </label>
                    <input
                        class="w-full border-2 border-black rounded-lg p-1"
                        type="password"
                        id="password"
                        name="password"
                    />
                </div>
                <div class="" v-if="title === 'Register'">
                    <label for="password"> Confirm Password </label>
                    <input
                        class="w-full border-2 border-black rounded-lg p-1"
                        type="password"
                        id="password"
                        name="password"
                    />
                </div>
                <div class="">
                    <button
                        class="bg-green-600 my-1 py-1 rounded-md font-bold text-white w-full"
                        @click="$emit('submit')"
                    >
                        Submit
                    </button>
                    <button
                        class="bg-red-600 my-1 py-1 rounded-md font-bold text-white w-full"
                        @click="$emit('close')"
                    >
                        close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
