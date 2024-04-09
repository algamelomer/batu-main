<!-- components/NewsSection.vue -->
<template>
  <div class="flex flex-col min-[1222px]:flex-row w-full justify-between">
    <!-- swiper -->
    <swiper :direction="direction" :slidesPerView="slidesPerView" :spaceBetween="30" :pagination="{
      type: 'progressbar',
    }" :autoplay="{
  delay: work,
  disableOnInteraction: disable,
}" :navigation="true" :modules="modules" class=" w-full h-60 min-[1222px]:w-[30rem]  min-[1222px]:h-[45rem]">

      <!-- slider for cards -->
      <swiper-slide v-for="item in props.apiData" :key="item.id">
        <NewsCard :item="item" :numWordsToShow="props.numWordsToShow" :isActive="item.isActive"
          @handleClick="props.handleClick" :truncatedDescription="props.truncatedDescription" />
      </swiper-slide>

    </swiper>

    <!-- main card -->
    <MainCard :mainCard="props.mainCard" />
  </div>
</template>
  
<script setup>
import NewsCard from './NewsCard.vue';
import MainCard from './MainNewsCard.vue';
import { ref, onMounted } from 'vue';

import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';

import 'swiper/css/pagination';


import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const props = defineProps({
  apiData: Array,
  mainCard: Object,
  numWordsToShow: Number,
  handleClick: Function,
  truncatedDescription: Function,
})
const work = 5000;

const disable = true;

const slidesPerView = ref(1);

const direction = ref("horizontal")


const updateSlidesPerView = () => {

  if (window.innerWidth < 901) {
    slidesPerView.value = 1;
  }

  else if (window.innerWidth < 1222) {
    slidesPerView.value = 2;
    direction.value = 'horizontal';
  }
  else {
    slidesPerView.value = 4;
    direction.value = 'vertical';
  }
};

updateSlidesPerView();
onMounted(() => {
  window.addEventListener('resize', updateSlidesPerView);

})
const modules = [Pagination, Autoplay, Navigation]
//     return {
//       modules: [Pagination ,Autoplay ,Navigation],
//       slidesPerView,
//       direction,
//       work,
//       disable

//     };
//   },
// };
</script>

  
<style scoped>
.swiper-slide {
  text-align: center;
  font-size: 18px;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

  