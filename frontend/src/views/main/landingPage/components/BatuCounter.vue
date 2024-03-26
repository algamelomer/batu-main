<!-- <template>
  <div v-if="view"
    class="grid divide-y-[5.5px] sm:divide-y-0 sm:divide-x-[5.5px] divide-gray-dark -col-1 pb-20 pt-11 sm:grid-cols-3 md:grid-col-3 gap-y-10 gap-x-6 justify-items-center items-center"
    :class="{ 'divide-white': useWhite }">
    <div>
      <BaseCard @visible="animateFacultiesCount(5)" :notHoverable="true" :useWhite="useWhite" :card="{
        iconPath: 'src/assets/icons/la_university.svg',
        title: facultiesCount + ' Faculties',
        subtitle:
          faculty.description,
      }" />
    </div>
    <div>
      <BaseCard @visible="animateStudentsCount(5)" :notHoverable="true" :useWhite="useWhite" :card="{
        iconPath: 'src/assets/icons/carbon_education.svg',
        title: studentsCount + ' students',
        subtitle:
          students.description,
      }" />
    </div>
    <div>
      <BaseCard @visible="animateStudentClubsCount(5)" :notHoverable="true" :useWhite="props.useWhite"
        :card="{
          iconPath: 'src/assets/icons/fluent-emoji-high-contrast_handshake.svg',
          title: studentClubsCount + ' student clubs',
          subtitle:
            clubs.description,
        }">
      </BaseCard>
    </div>
  </div>
</template>

<script setup>
import BaseCard from "@components/BaseCard.vue";
import countUp from "@/global/countUpAnimationValues";
import { ref } from "vue";
import { useStore } from '@/store'

const props = defineProps({
  useWhite: {
    type: Boolean,
    required: false,
    default: false,
  },
  counter: Array
})

const faculty = ref(0)
const students = ref(0)
const clubs = ref(0)
const view = ref(false)

const getData = async () => {
  await useStore().getDetailed()
  useStore().detailed.original.counter.forEach(element => {
    switch (element.title) {
      case "faculty":
        return faculty.value = element;
      case "student":
        return students.value = element;
      case "clubs":
        return clubs.value = element;
      default:
        break;
    }
  });
  view.value = true
}

getData()
const facultiesCount = ref(0);
const studentsCount = ref(0);
const studentClubsCount = ref(0);
function animateFacultiesCount(limit) {
  countUp(0, limit, 1.5, (value) => {
    facultiesCount.value = value;
  });
}
function animateStudentsCount(limit) {
  countUp(0, limit, 1.5, (value) => {
    studentsCount.value = value;
  });
}
function animateStudentClubsCount(limit) {
  countUp(0, limit, 1.5, (value) => {
    studentClubsCount.value = value;
  });
}
</script> -->
<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 w-11/12 md:grid-cols-2 items-center">
    <div v-for="item in props.counter" :key="item.id"
      class=" w-80 text-center items-center px-7 py-4 flex flex-col m-auto gap-4"
      :class="props.color">
      <img loading="lazy"  :src="item.image" alt="" class="m-auto">
      <h3 class=" font-sans text-xl font-bold flex justify-center gap-2"><count-up :end-val="item.counter_number" :duration="2.5" :autoplay="true" :options="options"></count-up> {{ item.title }}</h3>
      <p class=" text-xs font-normal">{{ item.description }}</p>
    </div>
  </div>
  
</template>

<script setup>
import CountUp from 'vue-countup-v3'
import { ref } from 'vue';
import BaseCard from "@components/BaseCard.vue";



const options = {
  enableScrollSpy: true,
};

const props = defineProps({
  counter: Array,
  color: String,
})
const faculty = ref(0)
const students = ref(0)
const clubs = ref(0)
const view = ref(false)

const getData = () => {
  props.counter.forEach(element => {
    switch (element.title) {
      case "faculty":
        return faculty.value = element;
      case "student":
        return students.value = element;
      case "clubs":
        return clubs.value = element;
      default:
        break;
    }
  });
  view.value = true
}

getData()
const facultiesCount = ref(0);
const studentsCount = ref(0);
const studentClubsCount = ref(0);
</script>
