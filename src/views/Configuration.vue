<template>
  <v-container>
    <toolbar-component />
    <configuration-component />
  </v-container>
</template>

<script>
import ConfigurationComponent from "../components/ConfigurationComponent.vue";
import ToolbarComponent from "../components/ToolbarComponent.vue";

export default {
  name: "Configuration",

  components: {
    ConfigurationComponent,
    ToolbarComponent,
  },
};
</script>
