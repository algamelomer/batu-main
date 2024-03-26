<template>
  <swiper v-motion-slide-visible-once-left class="ml-9 mt-16" :centered-slides="true" :center-insufficient-slides="true"
    :space-between="-10" :centered-slides-bounds="true" :breakpoints="{
      320: {
        slidesPerView: 1,
      },
      825: {
        slidesPerView: 2,
      },
      1218: {
        slidesPerView: 3,
      },
    }" effect="fade">
    <swiper-slide v-for="(card, index) in props.departments">
      <BaseDepartmentsCard :bgBlue="colorSequence(index, 0)" :bgGreen="colorSequence(index, 1)"
        :bgZinc="colorSequence(index, 2)" :title="card.name" :iconPath="card.logo" :description="card.description" />
    </swiper-slide>
  </swiper>
</template>

<script setup>
import BaseDepartmentsCard from "@components/departments/BaseDepartmentCard.vue";

import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";

// export default {
//   components: { Swiper, SwiperSlide, BaseDepartmentsCard },
//   setup() {
const props = defineProps({
  departments: Array
})
const dummyCardData = [
  {
    title: "Information Technology",
    description:
      "Discover cutting-edge Information Technology programs, shaping innovators for tomorrow's digital landscape. Unleash your potential with us.",
    iconPath: "src/assets/icons/solar_programming-broken.svg",
  },
  {
    title: "Pharmacy Assistant",
    description:
      "Delve into Pharmacy Assistant majors, blending expertise and compassion to contribute to healthcare excellence. Your journey starts here.",
    iconPath: "src/assets/icons/healthicons_pharmacy-outline.svg",
  },

  {
    title: "Nursing Assistant",
    description:
      "Empower yourself in Nursing Assistant majors, where care meets competence. Join us in shaping compassionate healthcare professionals.",
    iconPath: "src/assets/icons/nursing.svg",
  },
  {
    title: "Information Technology",
    description:
      "Discover cutting-edge Information Technology programs, shaping innovators for tomorrow's digital landscape. Unleash your potential with us.",
    iconPath: "src/assets/icons/solar_programming-broken.svg",
  },
  {
    title: "Pharmacy Assistant",
    description:
      "Delve into Pharmacy Assistant majors, blending expertise and compassion to contribute to healthcare excellence. Your journey starts here.",
    iconPath: "src/assets/icons/healthicons_pharmacy-outline.svg",
  },

  {
    title: "Nursing Assistant",
    description:
      "Empower yourself in Nursing Assistant majors, where care meets competence. Join us in shaping compassionate healthcare professionals.",
    iconPath: "src/assets/icons/nursing.svg",
  },
];

function colorSequence(index, colorIndex) {
  return index % 3 === colorIndex;
}
//   return {
//     dummyCardData,
//     colorSequence,
//   };
// },
// };
</script>
