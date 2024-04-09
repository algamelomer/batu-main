<template>
    <div class="w-full h-screen" :style="{ backgroundImage: 'url(' + imageUrl + ')' }">
        <div class="w-full h-screen flex flex-col items-center justify-between bg-black bg-opacity-70 py-8">
            <div class="flex-1 flex flex-col items-center justify-center">
                <!-- <div
                    class="bg-white bg-opacity-10 px-4 py-2 rounded-xl flex items-center justify-center text-cyan-100 space-x-2 lg:space-x-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 lg:h-8 xl:h-10 w-6 lg:w-8 xl:w-10" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4">
                        </path>
                    </svg>
                    <span class="text-xl lg:text-2xl xl:text-3xl font-bold">Template</span>
                </div> -->
                <h1
                    class="text-6xl lg:text-7xl xl:text-8xl text-gray-200 tracking-wider font-bold font-serif mt-12 text-center">
                    Coming Soon</h1>
                <!-- <div class="flex flex-col items-center space-y-4 mt-24">
                    <p class="text-gray-300 uppercase text-sm">Notify me when it's ready</p>
                    <form class="w-full flex items-center">
                        <input type="email" name="email" id="email"
                            class="w-72 p-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded-tl rounded-bl text-sm"
                            placeholder="Email" autocomplete="off">
                        <button
                            class="bg-blue-600 hover:bg-blue-700 py-2 px-6 text-gray-100 border border-blue-600 rounded-tr rounded-br text-sm">Subscribe</button>
                    </form>
                </div> -->
            </div>
            <div class="w-full flex items-center justify-center">
                <!-- <ul class="flex items-center space-x-4 justify-evenly">
                    <li class="flex">
                        <a href="#" title="Facebook">
                            <font-awesome-icon icon="fa-brands fa-facebook" class="w-6 lg:w-8 h-6 lg:h-8 hover:scale-110 transition duration-300 text-[#e2e8f0] m-auto" />
                        </a>
                    </li>
                    <li class="flex">
                        <a href="mailto:https://www.youtube.com/@batu1022" title="youtube">
                            <font-awesome-icon icon="fa-brands fa-youtube" class="w-6 lg:w-8 h-6 lg:h-8 hover:scale-110 transition duration-300 text-[#e2e8f0] m-auto"/>
                        </a>
                    </li>
                    <li class="flex">
                        <a href="mailto:batu.mediadept@gmail.com" title="gmail">
                            <font-awesome-icon icon="fa-solid fa-envelope" class="w-6 lg:w-8 h-6 lg:h-8 hover:scale-110 transition duration-300 text-[#e2e8f0] m-auto"/>
                        </a>
                    </li>
                    <li></li>
                </ul> -->
                <ul v-if="data" class="flex items-center space-x-4 justify-evenly">
                    <li v-for="item in data" :key="item.id" class="flex">
                        <a v-if="item.icon === 'envelope'" :href="'mailto:' + item.link">
                            <font-awesome-icon :icon="[item.iconType, item.icon]"
                                class="w-6 lg:w-8 h-6 lg:h-8 hover:scale-110 hover:text-[#91bbee] transition duration-300 text-[#e2e8f0] m-auto" />
                        </a>
                        <a v-else :href="item.link"><font-awesome-icon :icon="[item.iconType, item.icon]"
                                class="w-6 lg:w-8 h-6 lg:h-8 hover:scale-110 hover:text-[#91bbee] transition duration-300 text-[#e2e8f0] m-auto" /></a>

                    </li>
                </ul>

            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";
import jsonData from '@components/social.json';
import comingSoonImage from '@/assets/coming-soon.jpg';
const imageUrl = comingSoonImage;

const data = ref(jsonData)

</script>
<style>
.cls-1 {
    fill: #e2e8f0;
}
</style>