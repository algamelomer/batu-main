<template>
  <div class="flex justify-end gap-4">
    <IconAnchor href="#">
      <font-awesome-icon
        icon="fa-brands fa-youtube"
        class="text-white"
        size="xl"
      />
    </IconAnchor>

    <IconAnchor href="#">
      <font-awesome-icon
        icon="fa-brands fa-instagram"
        class="text-white"
        size="xl"
      />
    </IconAnchor>

    <IconAnchor href="#">
      <font-awesome-icon
        icon="fa-brands fa-x-twitter"
        class="text-white"
        size="xl"
      />
    </IconAnchor>

    <IconAnchor href="#">
      <font-awesome-icon
        icon="fa-brands fa-facebook-f"
        class="text-white"
        size="xl"
      />
    </IconAnchor>
  </div>
</template>

<script>
import IconAnchor from "./IconAnchor.vue";

export default { components: { IconAnchor } };
</script>

<style></style>
