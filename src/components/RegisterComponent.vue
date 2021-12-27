<template>
  <v-container>
    <v-card>
    <v-tabs v-model="tab" background-color="transparent" grow>
      <v-tab v-for="item in items" :key="item.title">
        {{ item.title }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item.title">
        <v-card flat>
          <component v-bind:is="item.text"></component>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
import RegisterAnalystComponent from "./RegisterAnalystComponent.vue";
import RegisterFaultComponent from "./RegisterFaultComponent.vue";
export default {
  name: "RegisterComponent",
  data: () => ({
    items: [
      { title: "Analista", text: RegisterAnalystComponent },
      { title: "Faltas", text: RegisterFaultComponent },
    ],
    tab: null,
  }),
};
</script>

<style lang="scss" scoped>
.container {
  padding: 0 !important;
}
.v-tab {
  color: var(--featured-darker) !important;
}
</style>