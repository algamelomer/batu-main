<template>
  <div v-motion-fade-visible-once class="w-screen flex flex-col justify-center items-center bg-gray-light py-16">
    <BaseTitle title="Available Courses" :animate="true" class="mt-11" />
    <BaseSubtitle
      subtitle="Discover diverse academic paths. Explore our available courses, ranging from cutting-edge disciplines to time-tested subjects, shaping future leaders and innovators." />

    <!-- Filter semester -->
    <div class=" flex flex-col w-full items-center mb-5">
      <label for="semester" class="font-bold text-green-light py-2 px-4">academic year: <template
          v-for="item in filteredCourses" :key="item.id">
          <template v-if="item.id">{{ item.academic_year }}</template>
        </template></label>

      <select v-model="semester" id="semester"
        class=" border-2 border-green-light text-green-light hover:bg-green-light hover:border-green-light hover:text-white font-bold py-2 px-4 cursor-pointer rounded-full focus:outline-none focus:shadow-outline h-12 w-6/12 text-sm transition-all duration-300">
        <option value="" disabled key="fade">Select semester</option>
        <option class=" cursor-pointer hover:bg-green-light" v-for="semesterItem in props.availableCourses"
          :key="semesterItem.id" :value="semesterItem.semester">{{
            semesterItem.semester }}</option>
      </select>
    </div>

    <!-- cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
      <transition-group name="visible">
      
      <BaseDepartmentCard v-for="items in filteredCourses" cardWidth="w-[26rem]" :key="items.id"
        :title="items.name" :description="items.description" :lecturer="items.lecturer"
        iconPath="/src/assets/icons/courses.svg" :bgGreen="true" />
      </transition-group>

    </div>
  </div>
</template>

<script setup>
import BaseDepartmentCard from "@components/departments/BaseDepartmentCard.vue";
import { computed, ref } from 'vue'

const props = defineProps({ availableCourses: Array })
const semester = ref()
const filteredCourses = computed(() => {
  if (!semester.value) return [];
  return props.availableCourses.filter(item => item.semester === semester.value);
});
</script>
<style scoped>
/* select::-ms-expand {
  display: none;
}

select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
} */

</style>