<template>
  <div id="app">
    <v-snackbar class="snack" v-model="visible" v-on:requestClose="close" dark>
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          class="close"
          v-bind="attrs"
          @click.native="$emit('requestClose')"
        >
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "SnackBarComponent",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: "Importar prop 'text'",
    },
  },
  data: () => ({
    //
  }),
  methods: {
    close() {
      this.visible = false;
    },
  },
};
</script>
