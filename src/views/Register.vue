<template>
  <v-container>
    <toolbar-component />
    <register-component />
  </v-container>
</template>

<script>
import RegisterComponent from "../components/RegisterComponent.vue";
import ToolbarComponent from "../components/ToolbarComponent.vue";

export default {
  name: "Register",

  components: {
    RegisterComponent,
    ToolbarComponent,
  },
};
</script>
