<template>
    <div class="flex flex-col items-center justify-between w-full mx-auto py-16 bg-gray-light my-11 gap-7">
        <div class=" flex flex-col items-center">
            <BaseTitle class=" font-bold font-mulish text-4xl text-green-dark" :title="title" :animate="true" />
        </div>

        <!-- Pagination -->
        <swiper :pagination="false" :modules="modules" :slides-per-view="pang_view" :freeMode="true"
            class="pagination w-10/12 h-24 md:h-20 bg-white" @swiper="onSwiper" @slideChange="onSlideChange">
            <swiper-slide v-for="(item, index) in items" :key="index">
                <span :class="{ active: index === currentIndex }" @click="goToSlide(index)">{{ item.name }}</span>
            </swiper-slide>
        </swiper>

        <!-- Swiper for the content -->
        <div class="w-full">
            <swiper :pagination="false" :modules="modules" :slides-per-view="slides" :freeMode="true" :space-between="25"
                :centeredSlides="true" class="mySwiper facultie-swiper" @swiper="onSwiper" @slideChange="onSlideChange"
                :class="{ 'md:w-11/12': Card == 'projects' }">
                <swiper-slide v-for="item in items" :key="item.id" v-motion-fade-visible
                    class="swiper-slide-item relative !h-[30rem] md:!h-72 flex flex-col bg-green-light"
                    :class="{ 'cursor-pointer': Card == 'departments' }">
                    <div class="flex md:flex-row flex-col-reverse h-full" :class="{
                        '  h-fit gap-3 md:gap-0 justify-end md:justify-around px-4 pt-4 pb-10 items-start': Card == 'departments',
                        ' rounded bg-green-light justify-end': Card == 'projects'
                    }">
                        <div :class="{ 'p-4 flex flex-col gap-2 w-full md:w-3/4': Card == 'projects' }" class=" w-fit">
                            <div class="text-start w-10/12">
                                <h1 class="text-green-dark font-semibold text-xl">{{ item.name }}</h1>
                                <hr width="50px" class="border-black border-[1.5px] mt-1 mb-3">
                                <p class="font-normal text-xs text-cyan-light overflow-auto">{{ item.description }}</p>
                            </div>
                            <div v-if="Card == 'projects'"
                                class=" absolute gap-2 bottom-2 w-full left-0 md:w-3/4 flex flex-col">
                                <div class="bg-green-dark text-white text-center text-sm rounded-3xl w-11/12 m-auto py-2">
                                    {{
                                        item.team_name }}</div>
                                <div class="bg-green-dark text-white text-center text-sm rounded-3xl w-11/12 m-auto py-2 cursor-pointer"
                                    @click.prevent="downloadProjectFile(item.file)">download info</div>
                            </div>
                        </div>

                        <div
                            :class="{ 'h-60 w-full md:w-28 md:h-32': Card === 'departments', 'w-full h-60 md:h-full md:w-1/4': Card === 'projects' }">
                            <img loading="lazy"  :src="item.image" alt="" class="object-cover w-full h-full">
                        </div>
                        <div v-if="Card == 'departments'" @click="goToItemDepartment(item.id)"
                            class="flex justify-around w-3/4 absolute bottom-4 right-1/2 translate-x-1/2 m-auto items-center text-white bg-green-dark px-5 py-2 rounded-3xl gap-4">
                            <h3>Read More</h3>
                            <font-awesome-icon class="transform rotate-90 text-white" :icon="['fas', 'angle-up']" />
                        </div>

                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted, onUnmounted, watchEffect } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useRouter } from 'vue-router';
import { Pagination, FreeMode } from 'swiper/modules';

const props = defineProps({
    items: Array,
    title: String,
    downloadProjectFile: Function,
    first: Number,
    second: Number,
    third: Number,
    Card: String
});

const currentIndex = ref(0);
const swiperRef = ref(null);
const slides = ref()
const pang_view = ref()

const modules = [Pagination, FreeMode];

const goToSlide = (index) => {
    currentIndex.value = index;
    if (swiperRef.value && swiperRef.value.slideTo) {
        swiperRef.value.slideTo(index);
    }
};

const onSwiper = (swiper) => {
    swiperRef.value = swiper;
};

const onSlideChange = () => {
    if (swiperRef.value && swiperRef.value.activeIndex !== currentIndex.value) {
        currentIndex.value = swiperRef.value.activeIndex;
    }
};
const handleResize = () => {
    if (window.innerWidth > 1320) {
        slides.value = props.first;
        pang_view.value = 5;
    }
    else if (window.innerWidth > 790) {
        slides.value = props.second;
        pang_view.value = 3;
    }
    else if (window.innerWidth > 566) {
        slides.value = props.third;
        pang_view.value = 2;
    }
    else {
        slides.value = props.third;
        pang_view.value = 1;
    }
}

const router = useRouter();

const goToItemDepartment = (id) => {
    router.push("/departments/" + id);
};

onMounted(() => {
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});
watchEffect(() => {
    handleResize();
});
</script>
  
<style scoped>
.pagination {
    @apply flex justify-between border-[1px] border-green-dark h-[60px] rounded-[60px] mb-8
}

.pagination span {
    @apply cursor-pointer border-transparent rounded-[60px] w-full text-center flex py-1 px-2 items-center justify-center h-full
}

.pagination span.active {
    @apply bg-green-dark text-white
}
</style>
  