
<template>
    <nav class="bg-green-dark fixed z-10 w-full top-0">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        
                        <!-- Your logo or brand -->
                        <img loading="lazy"  class="h-8 w-8" src="/src/assets/logo.svg" alt="Logo">
                    </div>

                </div>
                
                <div class="-mr-2 flex ">
                    <!-- Mobile menu button -->
                    <button @click="toggleNavBar " type="button" class="bg-green-light hover:bg-transparent hover:scale-125 rounded-full inline-flex items-center justify-center p-2 text-white rounded-mdtext-white duration-200 " aria-controls="mobile-menu" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <!-- Icon for menu button -->
                        <font-awesome-icon :icon="['fas', 'bars']" />
                    </button>
                </div>
            </div>
        </div>


        <!-- Mobile menu -->
        <transition >
            <div v-if="isOpen" class=" absolute w-full bg-white  origin-top-right" id="mobile-menu">
                <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <!-- Your navigation links -->
                    <router-link @click="closeNavBar" to="/" class="text-green-dark hover:bg-green-dark hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</router-link>
                    <router-link  @click="closeNavBar" to="/aboutUs" class="text-green-dark hover:bg-green-dark hover:text-white block px-3 py-2 rounded-md text-base font-medium">About</router-link>
                    <button @click=" facultiesIsOpen=!facultiesIsOpen" class="text-green-dark w-full text-start hover:bg-green-dark hover:text-white block px-3 py-2 rounded-md text-base font-medium">faculties</button> 
                    <div class=" grid grid-cols-1 px-10" v-if="facultiesIsOpen">
                        <router-link  @click="closeNavBar" v-for="faculty in  useStore().faculties" :to="'/faculty/' + faculty.id" class="text-green-dark p-1 hover:bg-green-dark hover:text-white block rounded-md text-base font-medium" >{{faculty.name}}</router-link>
                    </div>
                    <router-link  @click="closeNavBar() ; ('hello ther this is a text')" to="/ContactUs" class="text-green-dark hover:bg-green-dark hover:text-white block px-3 py-2 rounded-md text-base font-medium">contact us</router-link>
                </div>
            </div>
        </transition>
    </nav>
</template>

<script setup>
import { ref ,computed} from 'vue'
import { useStore } from '@/store'

const isOpen = ref(false)
const facultiesIsOpen = ref(false)
const toggleNavBar= computed(()=>{
    isOpen.value = !isOpen.value
    
}) 

const closeNavBar= ()=>{
    isOpen.value =false
    
}
const faculties = ref([])


const getData = async () => {
  await useStore().getFaculties()
  faculties.value = useStore().faculties
    // (faculties.value)    
}


getData()
</script>

<style scoped>
.v-enter-from {
  @apply transition-all opacity-0 scale-0;
}
.v-enter-to {
  @apply opacity-100 scale-100 duration-300;
}

.v-leave-from {
  @apply transition-all scale-100 opacity-100;
}
.v-leave-to {
  @apply opacity-0 scale-0 duration-300;
}


</style>

