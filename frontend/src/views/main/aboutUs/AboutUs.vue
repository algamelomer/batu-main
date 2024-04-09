<template>
  <template v-if="loader">
    <BaseHeaderImage :title="aboutData.header[0].title" :subtitle="aboutData.header[0].description"
      imgPath="/src/assets/aboutUs.png" />
    <template v-for="items in aboutData.history">
      <BaseImgSection class="mt-40" :title="items.title" :description="items.description" :imgPath="items.image"
        :animate="true" />
    </template>
    <template v-for="items in supervisory.data">
      <template v-if="items.position == 'university_president' || items.position == 'vice_president'">
        <BaseImgSection :title="items.position + ' ' + items.name" :description="items.description"
          :imgPath="items.image" :animate="true" :reverse="true" />
      </template>
    </template>



    <!-- <BaseTitle title="Our Majors" :animate="true" class="mx-auto" /> -->
    <Departments :departments="departmentData" v-if="departmentData" />
    <DepartmentsSlide />
    <newsSlide :news="news" class=" mt-16" />

    <div class="bg-gray-light dark:bg-darkMode-gray-light flex flex-col justify-around h-[30rem] mt-20">
      <template v-for="items in aboutData.UniversityInfo">
        <BaseTitle :title="items.title" :animate="true" class="mx-auto" />
        <BaseSubtitle :subtitle="items.description" />
      </template>
    </div>
    <template v-for="items in aboutData.policies">
      <div class="bg-gray-light dark:bg-darkMode-gray-light flex flex-col justify-around h-[30rem] mt-20">
        <BaseTitle :title="items.title" :animate="true" class="mx-auto" />
        <BaseSubtitle :subtitle="items.description" />
      </div>
    </template>
    <!-- counter -->
    <BatuCounter :counter="details.counter" color="text-gray-dark" v-if="details.counter" />
  </template>
  <template v-else>
    <div class="flex justify-center items-center h-screen">
      <div class="loader">
        <div role="status">
          <svg aria-hidden="true" class="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-green"
            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor" />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill" />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup>
import BaseImgSection from "@components/BaseImgSection.vue";
import DepartmentsSlide from "@views/main/landingPage/components/Departments.vue";
import newsSlide from "@views/main/landingPage/components/news.vue";
import BatuCounter from "@views/main/landingPage/components/BatuCounter.vue";
import { useRouter } from 'vue-router';
import { useStore } from '@/store'
import { ref } from 'vue'
import filterData from '@/global/filterData.js';
import Departments from "@/views/main/landingPage/components/Departments.vue";

const router = useRouter();
const aboutData = ref(null)
const loader = ref(false)
const news = ref()
const supervisory = ref(null)
const departmentData = ref()
const details = ref(null)

const getData = async () => {
  await useStore().getPosts("/")
  news.value = useStore().posts
  filterData(Object.values(news.value), news, "type", "news");
  await useStore().getDepartments("/")
  departmentData.value = useStore().department.departments
  await useStore().getAbout()
  aboutData.value = useStore().about
  await useStore().getSupervisory("/")
  supervisory.value = useStore().supervisory
  await useStore().getDetailed()
  details.value = useStore().detailed.details
  loader.value = true;
}

getData()
</script>
