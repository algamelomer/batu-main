<template>
    <div class=" w-11/12 h-full">
        <div class=" w-10/12 h-screen">
            <swiper :effect="'cards'" :grabCursor="true" :modules="modules" class="mySwiper w-full h-full">
                <template v-for=" items in data" :key="items.id">
                    <swiper-slide class=" bg-white shadow-lg rounded flex flex-col items-center p-4 pb-8">
                        <BaseTitle :title="items.title" styles="!text-2xl -mb-4" />
                        <BaseSubtitle :subtitle="items.subtitle" styles=" w-full" color="text-xs text-gray-400 mt-4" />
                        <img :src="items.image" :alt="items.title" class=" mt-auto w-[491px] h-80 object-contain">
                    </swiper-slide>
                </template>
            </swiper>
        </div>
        

    </div>
</template>
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { ref } from "vue"
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import BaseTitle from "@components/BaseTitle.vue"
import BaseSubtitle from "@components/BaseSubtitle.vue"

const data = ref([
    {
        id: 1,
        title: "First available work title",
        subtitle: "First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description.",
        image: "http://127.0.0.1:8000/assets/images/2bffcc54c768db006ffeb4f8359a334a.png"
    },
    {
        id: 2,
        title: "First available work title",
        subtitle: "First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description.",
        image: "http://127.0.0.1:8000/assets/images/2bffcc54c768db006ffeb4f8359a334a.png"
    },
    {
        id: 3,
        title: "First available work title",
        subtitle: "First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description.",
        image: "http://127.0.0.1:8000/assets/images/2bffcc54c768db006ffeb4f8359a334a.png"
    },
    {
        id: 4,
        title: "First available work title",
        subtitle: "First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description.",
        image: "http://127.0.0.1:8000/assets/images/2bffcc54c768db006ffeb4f8359a334a.png"
    }
]);


const modules = [EffectCards];

</script>