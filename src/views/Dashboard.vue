<template>
  <v-container>
    <toolbar-component />
    <home-component />
  </v-container>
</template>

<script>
import HomeComponent from "../components/HomeComponent.vue";
import ToolbarComponent from "../components/ToolbarComponent.vue";

export default {
  name: "Dashboard",

  components: {
    HomeComponent,
    ToolbarComponent,
  },
};
</script>
