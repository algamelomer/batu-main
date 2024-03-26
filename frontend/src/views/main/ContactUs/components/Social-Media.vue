<template>
    <div class=" w-full md:w-11/12 bg-[#F5F7FA] p-8 rounded-lg text-center items-center flex flex-col m-auto gap-4">
        <h2 class=" text-green-dark font-mulish font-bold text-5xl">{{ title }}</h2>
        <hr width="50px" class="border-black border-[1.5px] mt-5" />
        <p class=" text-[#CCD2E9] font-Roboto font-medium text-xl px-2">{{ p }}</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full items-center mt-4 gap-8">
            <a class=" w-64 h-64 bg-white rounded-lg justify-center items-center m-auto flex"
                href="https://www.facebook.com/people/%D8%AC%D8%A7%D9%85%D8%B9%D8%A9-%D8%A8%D8%B1%D8%AC-%D8%A7%D9%84%D8%B9%D8%B1%D8%A8-%D8%A7%D9%84%D8%AA%D9%83%D9%86%D9%88%D9%84%D9%88%D8%AC%D9%8A%D8%A9/100085885038638/"><font-awesome-icon
                    :icon="['fab', 'facebook']" class="text-[#1877F2] text-8xl " /></a>
            <a href="" class=" w-64 h-64 bg-white rounded-lg justify-center items-center m-auto flex"><div class="ig w-fit h-fit m-auto p-2 rounded-3xl"><font-awesome-icon :icon="['fab', 'instagram']" class=" text-white text-8xl" /></div></a>
            <a href="" class=" w-64 h-64 bg-white rounded-lg justify-center items-center m-auto flex"><font-awesome-icon :icon="['fab', 'square-x-twitter']" class=" text-8xl"/></a>
        </div>
    </div>
</template>

<script setup>
const title = "Our Social-Media"
const p = "Stay connected, stay informed. Join our vibrant social media community for health tips, updates, and a supportive network. Your wellness journey starts here!"

</script>

<style>
.ig {
    background: radial-gradient(circle farthest-corner at 35% 90%, #fec564, transparent 50%), radial-gradient(circle farthest-corner at 0 140%, #fec564, transparent 50%), radial-gradient(ellipse farthest-corner at 0 -25%, #5258cf, transparent 50%), radial-gradient(ellipse farthest-corner at 20% -50%, #5258cf, transparent 50%), radial-gradient(ellipse farthest-corner at 100% 0, #893dc2, transparent 50%), radial-gradient(ellipse farthest-corner at 60% -20%, #893dc2, transparent 50%), radial-gradient(ellipse farthest-corner at 100% 100%, #d9317a, transparent), linear-gradient(#6559ca, #bc318f 30%, #e33f5f 50%, #f77638 70%, #fec66d 100%);
}</style>