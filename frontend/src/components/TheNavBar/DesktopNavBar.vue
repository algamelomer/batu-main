<template>
  <header class="z-11 header sticky top-0 bg-green-dark shadow-md flex items-center justify-between px-8 py-02">

    <PagesBar :navigations="[
      { name: 'Home', path: '/' },
      { name: 'About us', path: '/aboutUs' },
      { name: 'Contact Us', path: '/contactUs' },
    ]" />
    <SocialBar />
  </header>

  <header class="z-10 header sticky flex-row top-0 bg-white dark:bg-[#18191A] shadow-md flex items-center justify-between px-8 pl-0 pr-0">
    <div class="flex flex-row gap-2 caret-green">
      <button
        class="px-5 justify-evenly h-16 text-base font-medium text-white bg-green hover:bg-green-dark duration-200 text-center">
        <font-awesome-icon icon="fa-solid fa-search" class="text-white" size="xl" />
      </button>
      <input type="text" class="bg-gray-50 dark:bg-[#18191A] dark:text-gray-50 border-none focus:outline-none placeholder-green h-16 text-gray-900 text-sm"
        placeholder="Search our university..." />
    </div>

    <PagesBar :isTextGreen="true" :navigations="[
      { name: 'Home', path: '/' },
      { name: 'About us', path: '/aboutUs' },
      { name: 'Contact Us', path: '/contactUs' },
    ]">
      <TextDropDown />
    </PagesBar>

    <div class="flex justify-between items-center gap-5">
    <button @click="toggleDark()" class="h-12 w-12 rounded-full p-2 hover:bg-[#18191A] dark:hover:bg-white">
      <svg class="fill-violet-700 block dark:hidden" fill="currentColor" viewBox="0 0 20 20">
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
      </svg>
      <svg class="fill-yellow-500 hidden dark:block" fill="currentColor" viewBox="0 0 20 20">
        <path
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
          fill-rule="evenodd" clip-rule="evenodd"></path>
      </svg>
    </button>
    <DropDown /></div>
  </header>
</template>

<script setup>
import SocialBar from "./SocialBar.vue";
import PagesBar from "./PagesBar.vue";
import DropDown from "./DropDown.vue"
import TextDropDown from "./TextDropDown.vue";

import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>
