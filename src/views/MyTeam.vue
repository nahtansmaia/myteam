<template>
  <v-container>
    <toolbar-component />
    <my-team-component />
  </v-container>
</template>

<script>
import MyTeamComponent from "../components/MyTeamComponent.vue";
import ToolbarComponent from "../components/ToolbarComponent.vue";

export default {
  name: "MyTeam",

  components: {
    MyTeamComponent,
    ToolbarComponent,
  },
};
</script>
