<template>
    <div class="w-full h-[40rem] overflow-hidden relative">
        <img loading="lazy" :src="imgPath" alt="" class="w-full h-full brightness-75 object-cover blur-sm" />

        <div class="absolute w-screen top-[30%] flex flex-row items-center justify-around">
            <div class="w-[30rem] rounded-md h-96 bg-white bg-opacity-60 flex flex-col items-center p-5">
                <BaseTitle :title="title" />
                <BaseSubtitle :subtitle="subtitle" color=" text-gray-500" />
            </div>
            <img loading="lazy"  src="@assets/logo.png"
                class="hidden md:block hover:animate-Bpulse w-96 h-96filter grayscale brightness-[4]" alt="logo" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: "",
        },
        subtitle: {
            type: String,
            default: "",
        },
        imgPath: {
            type: String,
            default: "",
        },
    },
};
</script>