<template>
  <v-container>
    <toolbar-component />
    <service-component />
  </v-container>
</template>

<script>
import ServiceComponent from "../components/ServiceComponent.vue";
import ToolbarComponent from "../components/ToolbarComponent.vue";

export default {
  name: "Service",

  components: {
    ServiceComponent,
    ToolbarComponent,
  },
};
</script>
