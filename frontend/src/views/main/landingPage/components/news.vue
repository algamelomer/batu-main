<!-- views/NewsPage.vue -->
<template>
    <div class="flex flex-col items-center w-full">
      <h1 class="text-green font-mulish text-5xl font-bold mb-4">Recent News</h1>
      <div class="line mb-8"></div>
      <p class="max-w-[53rem] text-center text-[#ccd2e9] text-lg font-medium mb-9">{{ green }}</p>
      <NewsSection :apiData="apiData" :mainCard="mainCard" :numWordsToShow="numWordsToShow" :handleClick="handleClick"
        :truncatedDescription="truncatedDescription" />
  </div>
</template>
<script setup>
import { ref } from 'vue';
// import axios from 'axios';
import NewsSection from './news_components/NewsList.vue';

// js functions
import autoChangeData from './news_components/js/autoChangeData'
import clickhandler from './news_components/js/clickhandler'
import truncatedDescription from './news_components/js/truncatedDescription'
import isActive from './news_components/js/isActive'
import filterData from '@/global/filterData.js';
import { useStore } from '@/store'

const props = defineProps({ news: Array })


const mainCard = ref({ title: '', content: '', img: '' });
const apiData = ref(props.news);
let counter = 1;
let isPaused = false;
const green = ref("Explore our latest university news. Stay informed about breakthroughs, events, and achievements shaping our dynamic academic community. Discover more.");
const numWordsToShow = 15;

const handleClick = (items) => {
  clickhandler(apiData, mainCard, isPaused, items)
};


const activeCard = () => {
  isActive(apiData, mainCard)
};

const test = () => {
  autoChangeData(apiData, mainCard, counter, isPaused, activeCard);
}

test()
// const response = ref()
// const fetchData = async () => {
//   try {
//     await useStore().getPosts("/")
//     response.value = useStore().posts
//     filterData(Object.values(response.value), apiData, "type", "news");
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   } finally {
//     autoChangeData(apiData, mainCard, counter, isPaused, activeCard);
//   }
// };


// fetchData();
</script>
