<template>
    <div class=" flex flex-col p-12 items-center justify-center bg-gray-light dark:bg-darkMode-gray-light overflow-hidden">
        <BaseTitle :title="title" :animate="false" />
        <BaseSubtitle :subtitle="subtitle" class="-mx-4"/>
        <swiper />
    </div>
</template>
<script setup>
import BaseTitle from "@components/BaseTitle.vue"
import BaseSubtitle from "@components/BaseSubtitle.vue"
import swiper from "./swiper.vue"
import {ref} from "vue"
const title =ref("How To Apply Instructions");
const subtitle = ref("Follow these clear, concise instructions to navigate the application process effortlessly and secure your spot at Industry and Energy College.");




</script>