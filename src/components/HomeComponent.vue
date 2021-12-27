<template>
  <v-container>
    <v-row class="text-center">
      <dashboard-component />
    </v-row>
  </v-container>
</template>

<script>
import DashboardComponent from "./DashboardComponent.vue";
export default {
  name: "HomeComponent",
  components: {
    DashboardComponent,
  },
};
</script>
