<template>
  <v-container>
    <div>
      <v-row>
        <v-col>
          <h3>Grafico 1</h3>
        </v-col>
        <v-col>
          <h3>Grafico 2</h3>
        </v-col>
        <v-col>
          <h3>Grafico 3</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h3>Grafico 4</h3>
        </v-col>
        <v-col>
          <h3>Grafico 5</h3>
        </v-col>
        <v-col>
          <h3>Grafico 6</h3>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "DashboardComponent",
  data: () => ({}),
};
</script>
<style lang="scss" scoped>
div {
  margin: 5px;
  height: 40vh;
  background-color: var(--light) !important;
}
.row {
  .col {
    padding: 0 !important;
    margin: 3px;
    width: 33.33%;
    border-radius: 8px;
    border: 1px solid var(--featured-lighter) !important;
  }
}
</style>