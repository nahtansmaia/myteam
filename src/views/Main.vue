<template>
  <v-app>
    <main-component />
  </v-app>
</template>

<script>
import MainComponent from "../components/MainComponent.vue";

export default {
  name: "Home",

  components: {
    MainComponent,
  },
};
</script>
