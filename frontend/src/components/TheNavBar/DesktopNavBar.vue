<template>
  <header
    class="z-11 header sticky top-0 bg-green-dark shadow-md flex items-center justify-between px-8 py-02"
  >
  
    <PagesBar
      :navigations="[
        { name: 'Home', path: '/' },
        { name: 'About us', path: '/aboutUs' },
        { name: 'Contact Us', path: '/contactUs' },
      ]"
    />
    <SocialBar/>
  </header>

  <header
    class="z-10 header sticky flex-row top-0 bg-white shadow-md flex items-center justify-between px-8 pl-0 pr-0"
  >
    <div class="flex flex-row gap-2 caret-green">
      <button
        class="px-5 justify-evenly h-16 text-base font-medium text-white bg-green hover:bg-green-dark duration-200 text-center"
      >
        <font-awesome-icon
          icon="fa-solid fa-search"
          class="text-white"
          size="xl"
        />
      </button>
      <input
        type="text"
        class="bg-gray-50 border-none focus:outline-none placeholder-green h-16 text-gray-900 text-sm"
        placeholder="Search our university..."
      />
    </div>

    <PagesBar
      :isTextGreen="true"
      :navigations="[
        { name: 'Home', path: '/' },
        { name: 'About us', path: '/aboutUs' },
        { name: 'Contact Us', path: '/contactUs' },
      ]"
    ><TextDropDown/></PagesBar>

    <DropDown
      :navigations="[
        { name: 'Home', path: '/' },
        { name: 'About us', path: '/aboutUs' },
        { name: 'Contact Us', path: '/contactUs' },
      ]"
    />
  </header>
</template>

<script setup>
import SocialBar from "./SocialBar.vue";
import PagesBar from "./PagesBar.vue";
import DropDown from "./DropDown.vue"
import TextDropDown from "./TextDropDown.vue";
</script>


