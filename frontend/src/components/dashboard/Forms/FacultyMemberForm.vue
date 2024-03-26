<template>
    <form class="w-full px-8 py-4 rounded overflow-hidden shadow-lg bg-gray-700 m-auto flex flex-col gap-4"
        @submit.prevent="authStore.handleFacultyMember(form)">
        <div class="relative flex gap-8">
            <select id="faculty" v-model="form.faculty_id" @change="updateFilteredDepartments"
                class="block appearance-none w-full bg-gray-400 border border-gray-300 text-gray-900 py-3 px-4 pr-8 rounded-lg focus:outline-none focus:bg-white focus:border-gray-500">
                <option disabled value="">Select Faculty</option>
                <option v-for="faculty in college" :key="faculty.id" :value="faculty.id">{{ faculty.name }}</option>
            </select>
            <select id="department" v-model="form.department_id"
                class="block appearance-none w-full bg-gray-400 border border-gray-300 text-gray-900 py-3 px-4 pr-8 rounded-lg focus:outline-none focus:bg-white focus:border-gray-500">
                <option disabled value="">Select Department</option>
                <option v-for="dep in filteredDepartments" :key="dep.id" :value="dep.id">{{ dep.name }}</option>
            </select>
        </div>

        <img loading="lazy"  v-if="form.imageUrl" :src="form.imageUrl" alt="Uploaded bg" class="mx-auto my-4 max-w-80 h-auto" />
        <div class=" flex justify-between px-12">
            <label for="bg">member image</label>
            <input id="bg" type="file" @change="handleImageFileChange"
                class="block w-3/4 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
        </div>
        <div class="px-6 py-4 flex flex-col w-full gap-4">
            <label for="departmen">member name</label>
            <input id="departmen" class="dashInput text-black text-base resizable bg-gray-400 placeholder-gray-700" type="text"
                placeholder="member name" v-model="form.name" />
            <label for="title">title</label>
            <input id="title" class="dashInput text-black text-base resizable bg-gray-400 placeholder-gray-700" type="text"
                placeholder="title" v-model="form.title" />
            <label for="sub_title">sub_title</label>
            <input id="sub_title" class="dashInput text-black text-base resizable bg-gray-400 placeholder-gray-700" type="text"
                placeholder="sub_title" v-model="form.sub_title" />
            <label for="career">career</label>
            <textarea id="career" class="dashTextArea text-black text-base resizable bg-gray-400 placeholder-gray-700" type="text"
                placeholder="career" v-model="form.career"></textarea>
            <label for="experience">experience</label>
            <textarea id="experience" class="dashTextArea text-black text-base resizable bg-gray-400 placeholder-gray-700" type="text"
                placeholder="experience" v-model="form.experience"></textarea>

                <label for="scientific_interests">scientific_interests</label>
            <textarea id="scientific_interests" class="dashTextArea text-black text-base resizable bg-gray-400 placeholder-gray-700" type="text"
                placeholder="scientific_interests" v-model="form.scientific_interests"></textarea>
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


const college = ref()
const department = ref()

const apiData = ref()

const form = ref({
    department_id: '',
    faculty_id: '',
    name: '',
    image: null,
    title: '',
    sub_title: '',
    career: '',
    experience: '',
    scientific_interests: '',
    user_id: '',
    id: '',
    imageUrl: null,
});

const filteredDepartments = ref()

const updateFilteredDepartments = (event) => {
    let selectedFacultyId = ''
    if (event.target) {
        selectedFacultyId = event.target.value;
    }
    else {
        selectedFacultyId = event;
    }
    filteredDepartments.value = department.value.filter(dep => dep.faculty_id == selectedFacultyId);
};



const handleImageFileChange = (event) => {
    const selectedFile = event.target.files[0];
    form.value.image = selectedFile;
    form.value.imageUrl = URL.createObjectURL(selectedFile);
};

const authStore = useAuthStore();

const user = ref()
const fetchData = async () => {
    try {
        user.value = await inject('user');
        form.value.user_id = user.value.authUser.id;
        const faculty = await axios.get('/api/faculty/');
        college.value = faculty.data.data;
        const dep = await axios.get('/api/department/');
        department.value = dep.data.departments;
        // (department.value)
        if (props.id) {
            const response = await axios.get('/api/member/' + props.id);
            // (response.data.data)
            apiData.value = response.data.data
            form.value.department_id = apiData.value.department_id;
            form.value.faculty_id = apiData.value.faculty_id;
            form.value.name = apiData.value.name;
            form.value.image = apiData.value.image;
            form.value.title = apiData.value.title;
            form.value.sub_title = apiData.value.sub_title;
            form.value.career = apiData.value.career;
            form.value.experience = apiData.value.experience;
            form.value.scientific_interests = apiData.value.scientific_interests;
            form.value.id = apiData.value.id;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        if (form.value.image) {
            form.value.imageUrl = form.value.image
            form.value.image = form.value.image
        }
        if (form.value.faculty_id) {
            updateFilteredDepartments(form.value.faculty_id);
        }

    }
};



// onMounted(() => {
    fetchData();
// });
</script>