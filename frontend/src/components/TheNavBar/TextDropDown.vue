<template>
  <div @mouseleave="deActivateDropDown" @mouseenter="activateDropDown">
    <button type="button" class="text-base text-green h-full m-auto" data-dropdown-toggle="dropdown">
      {{ name }}
      <font-awesome-icon icon="fa-solid fa-angle-down" class="text-green" size="xl" />
    </button>
    <transition>
      <div v-if="dropIsActive" class="rounded-sm absolute bg-white  origin-top-left divide-y divide-gray-100 shadow">
        <ul class="py-2 text-green-dark text-sm font-thin relative" @mouseleave="clearHoveredFaculty()">
          <li v-for="faculty in faculties" :key="faculty.id" class="">
            <router-link :to="'/faculty/' + faculty.id" class="block px-4 py-2 group p-2 relative hover:text-white text-green-dark hover:bg-green-dark"
              @mouseenter="setHoveredFaculty(faculty)">
              {{ faculty.name }}
            </router-link>
            <ul v-if="isHovered(faculty)" 
              class="absolute top-0 left-full bg-white shadow-md rounded-sm w-40 group-hover:block">
              <li v-for="department in test(faculty.id)" :key="department.id"
                class="group p-2 hover:bg-green-dark text-green-dark hover:text-white cursor-pointer">
                <router-link :to="'/departments/' + department.id">{{ department.name }}</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from '@/store'

const faculties = ref([])
const facultyData = ref([])
const hoveredFaculty = ref(null); // Track the currently hovered faculty

const getData = async () => {
  await useStore().getFaculties()
  faculties.value = useStore().faculties
  await useStore().getDepartments('/')
  facultyData.value = useStore().department.departments
  // (facultyData.value)
}

const test = (fac) => {
  const test = ref([])
  facultyData.value.map(item => {
    if (item.faculty_id == fac) {
      test.value.push(item);
    };
  });
  // (test.value)
  // facultyData.value = useStore().faculty.faculty.department
  // (facultyData.value)
  return test.value
}

getData()

const props = defineProps({
  navigations: {
    type: Array,
    default: () => [],
  },
  name: {
    type: String,
    default: "Faculties",
  },
});

const dropIsActive = ref(false);

function activateDropDown() {
  dropIsActive.value = true;
}

function deActivateDropDown() {
  dropIsActive.value = false;
}

function setHoveredFaculty(faculty) {
  hoveredFaculty.value = faculty;
}

function clearHoveredFaculty() {
  hoveredFaculty.value = null;
}

function isHovered(faculty) {
  return hoveredFaculty.value === faculty;
}
</script>

<style scoped>
.v-enter-from {
  @apply transition-all opacity-0 scale-0;
}

.v-enter-to {
  @apply opacity-100 scale-100 duration-300;
}

.v-leave-from {
  @apply transition-all scale-100 opacity-100;
}

.v-leave-to {
  @apply opacity-0 scale-0 duration-300;
}
</style>
