<!-- <template>
  <div
    class="w-screen flex flex-col justify-center items-center bg-gray-light dark:bg-darkMode-gray-light py-16"
  >
    <BaseTitle title="Student Projects" class="mt-11" :animate="true" />
    <BaseSubtitle
      v-motion-fade-visible
      subtitle="Explore our students' innovative projects showcasing creativity, problem-solving, and real-world application across diverse disciplines on this dynamic page."
    />
    <BaseProjectCard v-motion-fade-visible />
    <BaseProjectCard class="mt-5" v-motion-fade-visible />
  </div>
  <swiper :items="projectsData" title="Projects" :downloadProjectFile="downloadProjectFile" Card="projects" />

</template>

<script>
import BaseProjectCard from "@components/BaseProjectCard.vue";

export default {
  components: {
    BaseProjectCard,
  },
};
</script> -->
<template>
  <swiper :items="props.StudentProjects" title="Projects" :downloadProjectFile="downloadProjectFile" Card="projects" />
</template>

<script setup>
import swiper from '@/components/faculty/swiper.vue';

const props = defineProps({ StudentProjects: Array })

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
