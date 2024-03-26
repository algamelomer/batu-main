<template>
    <form class="w-full px-8 py-4 rounded overflow-hidden shadow-lg bg-gray-700 m-auto flex flex-col gap-4"
          @submit.prevent="handleSubmit">
          <!-- Faculty and department selection -->
          <div class="relative flex gap-8">
              <!-- Faculty select -->
              <select id="faculty" v-model="form.faculty_id" @change="updateFilteredDepartments"
                  class="block appearance-none w-full bg-gray-400 border border-gray-300 text-gray-900 py-3 px-4 pr-8 rounded-lg focus:outline-none focus:bg-white focus:border-gray-500">
                  <option disabled value="">Select Faculty</option>
                  <option v-for="faculty in college" :key="faculty.id" :value="faculty.id">{{ faculty.name }}</option>
              </select>
              <!-- Department select -->
              <select id="department" v-model="form.department_id"
                  class="block appearance-none w-full bg-gray-400 border border-gray-300 text-gray-900 py-3 px-4 pr-8 rounded-lg focus:outline-none focus:bg-white focus:border-gray-500">
                  <option disabled value="">Select Department</option>
                  <option v-for="dep in filteredDepartments" :key="dep.id" :value="dep.id">{{ dep.name }}</option>
              </select>
          </div>
  
          <!-- Uploaded image display -->
          <img loading="lazy"  v-if="form.imageUrl" :src="form.imageUrl" alt="Uploaded bg" class="mx-auto my-4 max-w-full h-auto" />
  
          <!-- Image upload -->
          <div class=" flex justify-between px-12">
              <label for="bg">member image</label>
              <input id="bg" type="file" @change="handleImageFileChange"
                  class="block w-3/4 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
          </div>
  
          <!-- Form fields -->
          <div class="px-6 py-4 flex flex-col w-full gap-4">
              <label for="departmen">member name</label>
              <input id="departmen" class="text-black text-base resizable bg-gray-400 placeholder-gray-700" type="text"
                  placeholder="departmen name" v-model="form.name" />
              <!-- Add other form fields here -->
          </div>
  
          <!-- Submit button -->
          <button type="submit"
              class="m-auto bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-gray-500 rounded">Upload</button>
  
      </form>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    college: Array, // Assuming this data will be passed from parent
  });
  
  const form = ref({
    faculty_id: '',
    department_id: '',
    imageUrl: '',
    name: '',
    // Add other form fields here
  });
  
  const filteredDepartments = ref([]);
  
  const handleSubmit = () => {
    // Handle form submission
    emit('submit', form.value); // Emit an event with the form data
  };
  
  const updateFilteredDepartments = () => {
    // Logic to update filtered departments based on selected faculty
  };
  
  const handleImageFileChange = () => {
    // Logic to handle image file change
  };
  </script>
  