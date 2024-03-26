<template>
    <form class="w-full px-8 py-4 rounded overflow-hidden shadow-lg bg-gray-700 m-auto flex flex-col gap-4"
        @submit.prevent="authStore.handleProject(form)">
        <div class="relative">
            <select id="department" v-model="form.department_id"
                class="block appearance-none w-full bg-gray-400 border border-gray-300 text-gray-900 py-3 px-4 pr-8 rounded-lg focus:outline-none focus:bg-white focus:border-gray-500">
                <option disabled value="">Select department</option>
                <option v-for="faculty in college" :key="faculty.id" :value="faculty.id">{{ faculty.name }}</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                        d="M8.293 11.293a1 1 0 011.414 0L12 13.586V7a1 1 0 112 0v6.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                </svg>
            </div>
        </div>

        <img loading="lazy"  v-if="form.imageUrl" :src="form.imageUrl" alt="Uploaded image" class="mx-auto my-4 w-80 h-auto" />
        <div class=" flex justify-between px-12">
            <label for="bg">project photo</label>
            <input id="bg" type="file" @change="handleImageFileChange"
                class="block w-3/4 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
        </div>
        <div class="flex justify-between px-12">
            <label for="projectFile">Project File (PDF)</label>
            <input id="projectFile" type="file" @change="handleProjectFileChange"
                class="block w-3/4 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
        </div>
        <div class="flex justify-between px-12">
            <button v-if="form.fileUrl" @click.prevent="downloadProjectFile" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-gray-500 rounded">
                Download Project File
            </button>
            <span v-else class="text-gray-500">No project file uploaded</span>
        </div>
        <div class="px-6 py-4 flex flex-col w-full gap-4">
            <label for="departmen">project name</label>
            <input id="departmen" class="dashInput text-black text-base resizable bg-gray-400 placeholder-gray-700" type="text"
                placeholder="project name" v-model="form.name" />
            <label for="team">team name</label>
            <input id="team" class="dashInput text-black text-base resizable bg-gray-400 placeholder-gray-700" type="text"
                placeholder="team name" v-model="form.team_name" />
            <label for="description">description</label>
            <textarea id="description" class="dashTextArea text-black text-base resizable bg-gray-400 placeholder-gray-700" type="text"
                placeholder="description" v-model="form.description"></textarea>
        </div>
        <button
            class="m-auto bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-gray-500 rounded">Upload</button>

    </form>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios'


const props = defineProps({
    id: String,
});



const apiData = ref()

const college = ref()

const form = ref({
    name: '',
    image: null,
    description: '',
    file: null,
    team_name: '',
    user_id: '',
    id: '',
    imageUrl: null,
    fileUrl: null,
    department_id: ''
});


const handleImageFileChange = (event) => {
    const selectedFile = event.target.files[0];
    form.value.image = selectedFile;
    form.value.imageUrl = URL.createObjectURL(selectedFile);
};

const handleProjectFileChange = (event) => {
    const selectedFile = event.target.files[0];
    form.value.file = selectedFile;
    form.value.fileUrl = URL.createObjectURL(selectedFile);
};

const downloadProjectFile = () => {
    const file = form.value.file;
    if (file) {
        const blob = new Blob([file], { type: file.type });
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', 'project_file.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};


const authStore = useAuthStore();

const user = ref()

const fetchData = async () => {
    try {
        user.value = await inject('user');
        form.value.user_id = user.value.authUser.id;
        const faculty = await axios.get('/api/department/');
        college.value = faculty.data.departments;
        if (props.id) {
            const response = await axios.get('/api/projects/' + props.id);
            apiData.value = response.data.data
            form.value.name = apiData.value.name;
            form.value.image = apiData.value.image;
            form.value.file = apiData.value.file;
            form.value.description = apiData.value.description;
            form.value.team_name = apiData.value.team_name;
            form.value.id = apiData.value.id;
            form.value.department_id = apiData.value.department_id;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        if (form.value.image) {
            form.value.imageUrl = form.value.image
        }
        if (form.value.file) {
            form.value.fileUrl = form.value.file
        }
    }
};



// onMounted(() => {
    fetchData();
// });
</script>
