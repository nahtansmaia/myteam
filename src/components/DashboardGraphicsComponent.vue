<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="4">
        <h3>Grafico 1</h3>
      </v-col>
      <v-col cols="12" sm="4">
        <h3>Grafico 2</h3>
      </v-col>
      <v-col cols="12" sm="4">
        <h3>Grafico 3</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="4">
        <h3>Grafico 4</h3>
      </v-col>
      <v-col cols="12" sm="4">
        <h3>Grafico 5</h3>
      </v-col>
      <v-col cols="12" sm="4">
        <h3>Grafico 6</h3>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "DashboardComponent",
  data: () => ({}),
};
</script>

<style lang="scss">
.row {
  .col {
    margin: 3px;
    border-radius: 8px;
    border: 1px solid var(--featured-lighter) !important;
  }
}
</style>