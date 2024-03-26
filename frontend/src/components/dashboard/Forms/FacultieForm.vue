<template>
    <form class="w-full px-8 py-4 rounded overflow-hidden shadow-lg bg-gray-700 m-auto flex flex-col gap-4"
        @submit.prevent="authStore.handleFacultie(form)">
        <img loading="lazy"  v-if="form.imageUrl" :src="form.imageUrl" alt="Uploaded bg" class="mx-auto my-4 w-80 h-auto" />
        <div class=" flex justify-between px-12">
            <label for="bg">bg img</label>
            <input id="bg" type="file" @change="handleBgImageFileChange"
                class="block w-3/4 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
        </div>
        <img loading="lazy"  v-if="form.logoUrl" :src="form.logoUrl" alt="Uploaded logo" class="mx-auto my-4 w-80 h-auto" />
        <div class=" flex justify-between px-12">
            <label for="logo">logo</label>
            <input id="logo" type="file" @change="handleLogoFileChange"
                class="block w-3/4 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
        </div>
        <div class="px-6 py-4 flex flex-col w-full gap-4">
            <label for="college">college name</label>
            <input id="college" class="dashInput text-black text-base resizable bg-gray-400 placeholder-gray-700"
                type="text" placeholder="college name" v-model="form.name" />
            <label for="description">description</label>
            <textarea id="description" class="dashTextArea text-black text-base resizable bg-gray-400 placeholder-gray-700"
                type="text" placeholder="description" v-model="form.description"></textarea>
            <label for="vision">vision</label>
            <textarea id="vision" class="dashTextArea text-black text-base resizable bg-gray-400 placeholder-gray-700"
                type="text" placeholder="vision" v-model="form.vision"></textarea>
            <iframe width="560" height="315" :src="form.video" class="m-auto"
                title="YouTube video player" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen></iframe>
            <label for="youtubevideourl">youtube video url</label>
            <input id="youtubevideourl" class="dashInput text-black text-base resizable bg-gray-400 placeholder-gray-700"
                type="url" placeholder="youtube video url" @input="VideoInput" v-model="video_url"/>
            <label for="description_video">description_video</label>
            <textarea id="description_video"
                class="dashTextArea text-black text-base resizable bg-gray-400 placeholder-gray-700" type="text"
                placeholder="description_video" v-model="form.description_video"></textarea>
            <label for="mission">mission</label>
            <textarea id="mission" class="dashTextArea text-black text-base resizable bg-gray-400 placeholder-gray-700"
                type="text" placeholder="mission" v-model="form.mission"></textarea>
        </div>
        <button
            class="m-auto bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-gray-500 rounded">Upload</button>
    </form>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios'
import embedYoutubeVideo from '@/global/videoEmbed'


const props = defineProps({
    id: String,
});

const VideoInput = (event) => {
    form.value.video = embedYoutubeVideo(event.target.value);
    return form.value.video
}

const video_url = ref()

const apiData = ref()

const form = ref({
    name: '',
    image: null,
    logo: null,
    video: null,
    description: '',
    description_video: '',
    vision: '',
    mission: '',
    user_id: '',
    id: '',
    logoUrl: null,
    imageUrl: null
});


const handleBgImageFileChange = (event) => {
    const selectedFile = event.target.files[0];
    form.value.image = selectedFile;
    form.value.imageUrl = URL.createObjectURL(selectedFile);
};

const handleLogoFileChange = (event) => {
    const selectedFile = event.target.files[0];
    form.value.logo = selectedFile;
    form.value.logoUrl = URL.createObjectURL(selectedFile);
};

const authStore = useAuthStore();

const user = ref()

const fetchData = async () => {
    try {
        user.value = await inject('user');
        form.value.user_id = user.value.authUser.id;
        // (form.value.user_id)
        if (props.id) {
            const response = await axios.get('/api/faculty/' + props.id);
            // (response.data.faculty)
            apiData.value = response.data.faculty
            form.value.name = apiData.value.name;
            form.value.logo = apiData.value.logo;
            form.value.image = apiData.value.image;
            form.value.video = apiData.value.video;
            form.value.description = apiData.value.description;
            form.value.description_video = apiData.value.description_video
            form.value.vision = apiData.value.vision;
            form.value.mission = apiData.value.mission;
            form.value.id = apiData.value.id;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        // (form.value)
        if (form.value.logo) {
            form.value.logoUrl = form.value.logo
        };
        if (form.value.image) {
            form.value.imageUrl = form.value.image
        }
        if(form.value.video){
            video_url.value = form.value.video
        }
    }
};



// onMounted(() => {
fetchData();
// });
</script>