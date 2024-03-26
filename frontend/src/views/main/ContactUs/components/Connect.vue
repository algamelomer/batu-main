<template>
    <div class=" m-auto w-full md:w-[652px] flex flex-col gap-8 text-center items-center">
        <h1 class=" text-green font-mulish font-bold text-4xl md:text-5xl">{{ title }}</h1>
        <p class=" font-robo font-medium text-lg md:text-xl text-green-light">{{ p }}</p>
        <button class=" text-white w-44 h-14 md:w-48 md:h-16 rounded-[55px] bg-green-dark" @click.prevent>Connect</button>
    </div>
</template>

<script setup>
const title = "Get in Touch: Connect with Our Care Team"
const p = "Reach out effortlessly. Our contact page ensures swift communication with our dedicated care team. Your health inquiries matter to us."
</script>