<template>

    <AddButton buttonText="want to add subject?" buttonLabel="Add" :handleClick="handleClick" />
    <div class="flex flex-col items-center w-2/3 sm:w-9/12 md:w-5/6 lg:w-11/12 mt-2 border-t border-gray-700"></div>

    <div class="relative overflow-x-auto mx-4 mt-4 w-2/3 sm:w-9/12 md:w-5/6 lg:w-11/12">
        <div class="relative">
            <select id="department" v-if="departments" v-model="department"
                class="block appearance-none w-full bg-gray-400 border border-gray-300 text-gray-900 py-3 px-4 pr-8 rounded-lg focus:outline-none focus:bg-white focus:border-gray-500">
                <option disabled value="">Select Department</option>
                <option v-for="dep in departments" :key="dep.id" :value="dep.id">{{ dep.name }}</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                        d="M8.293 11.293a1 1 0 011.414 0L12 13.586V7a1 1 0 112 0v6.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                </svg>
            </div>
        </div>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-8">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        name
                    </th>
                    <th scope="col" class="px-6 py-3">
                        description
                    </th>
                    <th scope="col" class="px-6 py-3">
                        lecturer
                    </th>
                    <th scope="col" class="px-6 py-3">
                        academic year
                    </th>
                    <th scope="col" class="px-6 py-3">
                        semester
                    </th>
                    <th scope="col" class="px-6 py-3">
                        credits
                    </th>
                    <!-- <th scope="col" class="px-6 py-3">
                        department_id
                    </th>                     -->
                    <th scope="col" class="px-6 py-3">
                        edit subject
                    </th>
                    <th scope="col" class="px-6 py-3">
                        remove subject
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="items in apiData"
                    :key="items.id">
                    <template v-if="department == items.department_id">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ items.name }}
                        </th>
                        <td class="px-6 py-4">
                            {{ items.description }}
                        </td>
                        <td class="px-6 py-4">
                            {{ items.lecturer }}
                        </td>
                        <td class="px-6 py-4">
                            {{ items.academic_year }}
                        </td>
                        <td class="px-6 py-4">
                            {{ items.semester }}
                        </td>
                        <td class="px-6 py-4">
                            {{ items.credits }}
                        </td>

                        <!-- <td class="px-6 py-4">
                        {{ items.department_id }}
                    </td> -->
                        <td class="px-6 py-4">
                            <button @click="handleEdit(items.id)"
                                class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-500 rounded">edit</button>
                        </td>
                        <td class="px-6 py-4">
                            <button @click="DeleteItem(items.id)"
                                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-500 rounded">delete</button>
                        </td>
                    </template>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue'
import { useStore } from '@/store'
import { useAuthStore } from '@/stores/auth';
import AddButton from '@/components/dashboard/AddButton.vue';

const authstore = useAuthStore()

const router = useRouter();

const apiData = ref(null)

const departments = ref(null)

const department = ref("")

const getData = async () => {
    await useStore().getStudyPlan("/")
    apiData.value = useStore().studyPlan.data
    await useStore().getDepartments("/")
    departments.value = useStore().department.departments
    console.log(departments.value)   // (useStore().about)
}

getData()

const handleClick = () => {
    router.push({ name: 'DashboardUpload', params: { category: 'study' } });
};
const handleEdit = (id) => {
    router.push({ name: 'DashboardEdit', params: { category: 'study', id: id } });
}


const DeleteItem = async (id) => {
    await authstore.handleStudyDelete(id)
}
</script>