<template>
    <div class=" w-full h-full ">
        <swiper :pagination="pagination" :modules="modules" class="mySwiper h-60">
            <template v-for=" items in data" :key=" items.id">
                <swiper-slide class=" py-8 px-4 flex flex-col items-center bg-green-light h-full">
                    <BaseTitle :title="items.title" styles="!text-2xl -mb-4" />
                    <BaseSubtitle :subtitle="items.subtitle" styles=" w-full" color="text-xs text-gray-400 mt-4" />
                </swiper-slide>
            </template>
        </swiper>
    </div>
</template>
<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';

import BaseTitle from "@components/BaseTitle.vue"
import BaseSubtitle from "@components/BaseSubtitle.vue"
const data = [
    {
        id: 1,
        title: "First available work title",
        subtitle: "First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description.",
    },
    {
        id: 2,
        title: "First available work title",
        subtitle: "First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description.",
    },
    {
        id: 3,
        title: "First available work title",
        subtitle: "First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description.",
    },
    {
        id: 4,
        title: "First available work title",
        subtitle: "First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description First available work description.",
    }
]

const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
        return '<span class="' + className + ' w-[20px] h-[20px] text-center opacity-100 text-xs leading-5 text-green-light bg-green">' + (index + 1) + '</span>';
    }
};



const modules = [Pagination];

</script>

<style>
.swiper-pagination-bullet-active {
    @apply !bg-green-dark
}
</style>