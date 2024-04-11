<template>
    <div class="flex flex-col items-center w-full mx-auto py-8 px-10 bg-gray-light dark:bg-darkMode-gray-light justify-around gap-5">
        <div>
            <div class=" flex flex-col items-center">
                <BaseTitle class="text-center font-bold font-mulish text-4xl text-green-dark" title="Our Staff"
                    :animate="true" />
            </div>
            <p class="text-[#ccd2e9] text-center text-xl mt-10" v-motion-fade-visible>At Industry and Energy College, our
                dedicated staff comprises
                industry experts and passionate educators committed to nurturing talent, fostering innovation, and shaping
                future leaders.</p>
        </div>
        <swiper :slidesPerView="slides" :spaceBetween="30" :centeredSlides="true" :loop="true" :autoplay="{
            delay: 2500,
            disableOnInteraction: true,
        }" :freeMode="true" :pagination="false" :modules="modules" class="mySwiper flex flex-col w-11/12">
            <swiper-slide v-for="items in props.FacultyMember" :key="items.id" v-motion-fade-visible
                class="flex flex-col text-center items-center relative ">
                <img loading="lazy"  :src="items.image" alt="">
                <div @click="togglePopup(items)"
                    class="flex flex-col items-center cursor-pointer absolute w-full bottom-0 bg-white opacity-85 justify-around h-2/6">
                    <h3 class="text-green-dark font-bold text-xl">{{ items.name }}</h3>
                    <div class="w-7 h-7 bg-green-dark transform rotate-90 text-white rounded-full">
                        <font-awesome-icon :icon="['fas', 'angle-up']" />
                    </div>
                </div>
            </swiper-slide>
        </swiper>
        <!-- Popup Card -->
        <div v-if="popup.visible" @click="closePopupOutside"
            class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
            <transition name="popup-slide">
                <div class="bg-white rounded-lg relative flex flex-col w-[48.3rem] p-4 gap-4" @click.stop>
                    <div class=" m-auto w-72 h-52 relative rounded-xl overflow-hidden">
                        <img loading="lazy"  :src="popup.staff.image" alt="" class=" w-full h-full object-cover">
                        <div
                            class="flex flex-col items-center rounded-t-lg absolute w-full bottom-0 bg-white opacity-85 justify-around h-2/6 py-2 leading-4">
                            <h3 class="text-green-dark font-bold text-xl leading-3">{{ popup.staff.name }}</h3>
                            <h3 class="text-green-dark font-semibold text-md">{{ popup.staff.title }}</h3>
                            <h3 v-if="popup.staff.sub_title" class="text-green-dark font-semibold text-md">{{
                                popup.staff.sub_title }}</h3>
                        </div>
                    </div>
                    <div class="w-full m-auto gap-5 flex flex-col">
                        <div class="w-full h-8 justify-between sm:flex hidden">
                            <button @click="showContent('career')" class="btn">career</button>
                            <button @click="showContent('experience')" class="btn">experience</button>
                            <button @click="showContent('scientific_interests')" class="btn">scientific_interests</button>
                        </div>
                        <div class=" sm:hidden m-auto relative flex flex-col gap-2">
                            <button @click="toggleDropdown" class="btn cursor-pointer">Drop down</button>
                            <div v-show="isDropdownOpen"
                                class=" w-full absolute top-12 z-10 flex flex-col bg-green text-white rounded-xl">
                                <button @click="showContent('career')" class="btn">Career</button>
                                <button @click="showContent('experience')" class="btn">Experience</button>
                                <button @click="showContent('scientific_interests')" class="btn">Scientific
                                    Interests</button>
                            </div>
                        </div>
                        <transition name="fade">
                            <div v-if="activeContent" key="overview"
                                class="content bg-card_gray font-mulish font-light text-lg text-center text-[#7D7987] w-full p-4 h-64 overflow-auto">
                                {{ activeContent }}
                            </div>
                        </transition>
                    </div>
                    <button @click="closePopup"
                        class="text-gray-200 bg-gray-800 px-2 py-1 rounded-lg absolute top-2 right-2 text-sm border hover:border-gray-800 hover:bg-gray-500 hover:text-gray-900 transition-all duration-300 ease-in-out transform hover:scale-105">X</button>
                </div>
            </transition>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watchEffect } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';
import filterData from "@/global/filterData"
import { useStore } from '@/store'

const props = defineProps({ FacultyMember: Array })

const slides = ref()
const handleResize = () => {
    if (window.innerWidth > 1300) {
        slides.value = 3;
    }
    else if (window.innerWidth > 733) {
        slides.value = 2;
    }
    else {
        slides.value = 1;
    }
}

const isDropdownOpen = ref(false);

function toggleDropdown() {
    isDropdownOpen.value = !isDropdownOpen.value;
}

onMounted(() => {
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});
watchEffect(() => {
    handleResize();
});
const modules = [FreeMode, Pagination, Autoplay]
const staff = ref()
// filterData(response.data.data, staff, "faculty_id", faculty);

const getData = async () => {
    await useStore().getfacultyMember("/")
    // (useStore().facultyMember.data)
    filterData(useStore().facultyMember.data, staff, "faculty_id", props.id);
    // (staff.value)
}

getData();

const popup = ref({
    visible: false,
    staff: null
});

const togglePopup = (staffMember) => {
    popup.value.staff = staffMember;
    popup.value.visible = true;
};

const closePopup = () => {
    popup.value.visible = false;
};

const activeContent = ref('');

const showContent = (content) => {
    if (popup.value.staff && popup.value.staff[content]) {
        activeContent.value = popup.value.staff[content];
    }
    else {
        activeContent.value = "No content available for this section";
    }
};
const closePopupOutside = (event) => {
    // Check if the click target is the background div itself
    if (event.target === event.currentTarget) {
        closePopup(); // Close the popup
    }
};

</script>

<style scoped>
.swiper {
    @apply w-full h-full
}

.swiper-slide {
    @apply text-center text-lg bg-white flex justify-center items-center
}

.swiper-slide img {
    @apply block w-full h-full object-cover
}



.popup-slide-enter-active,
.popup-slide-leave-active {
    transition: transform 0.5s;
    transition: opacity 0.5s;
}

.popup-slide-enter,
.popup-slide-leave-to {
    transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.btn {
    @apply w-52 h-8 rounded-3xl bg-green-dark text-xs text-center text-white
}
</style>

