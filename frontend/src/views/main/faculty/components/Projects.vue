<template>
    <swiper :items="props.Projects" title="Projects" :downloadProjectFile="downloadProjectFile" Card="projects" />
</template>
  
<script setup>
import swiper from '@/components/faculty/swiper.vue';


const props = defineProps({ Projects: Array })

// const test = () =>{
//     // (props.Projects)
// }
// test()
const downloadProjectFile = (file) => {
    // const file = form.value.file;
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

</script>