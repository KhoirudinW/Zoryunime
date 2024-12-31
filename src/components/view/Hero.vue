<script setup>
    import { ref, onMounted } from "vue";
    import anime1 from "../../assets/bg/bg1.jpg";
    import anime2 from "../../assets/bg/bg2.jpg";
    import anime3 from "../../assets/bg/bg3.jpg";
    import anime4 from "../../assets/bg/bg4.jpg";
    import anime5 from "../../assets/bg/bg5.jpg";

    const backgrounds = ['bg-A1', 'bg-A2', 'bg-A3', 'bg-A4', 'bg-A5'];

    const currentBackground = ref(backgrounds[0]);


    onMounted(() => {
        let index = 0;
        setInterval(() => {
            index = (index + 1) % backgrounds.length;
            currentBackground.value = backgrounds[index];
        }, 5000); // Change every 5 seconds
    });
</script>

<template>
    <section
        :class="[
            'relative bg-cover bg-center h-screen md:h-[72.8vh] flex items-center justify-center transition-all duration-[3000ms]',
            currentBackground,
        ]"
    >
        <!-- Overlay -->
        <div class="absolute inset-0 bg-black bg-opacity-80"></div>

        <!-- Content -->
        <div class="z-10 text-center text-white max-w-2xl px-4 md:px-0">
            <h1
                class="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
                Welcome to <span class="text-[#F96D00]">Zoryu</span>nime
            </h1>
            <p class="text-base md:text-lg lg:text-xl mb-8 leading-relaxed">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde nam temporibus quia doloribus similique. Consequuntur molestias consectetur ea illum assumenda.
            </p>
            <div class="flex flex-col md:flex-row md:justify-center gap-4">
                <router-link
                    to="/list"
                    class="bg-[#F96D00] px-6 py-3 rounded-md text-base md:text-lg font-bold hover:bg-[#f9851a] transition"
                >
                    Browse List
                </router-link>
                <router-link
                    to="/kategori"
                    class="bg-white text-[#393E46] px-6 py-3 rounded-md text-base md:text-lg font-bold hover:bg-gray-300 transition"
                >
                    Explore Categories
                </router-link>
            </div>
        </div>
    </section>
</template>