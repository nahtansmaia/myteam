<template>
  <div class="apresentation">
    <v-img
      :src="require('../assets/icon/dashboard.svg')"
      contain
    />
    <h2 class="display-2 font-weight-bold mb-3">
      Bem vindo ao <span class="text-primary">MyTeam</span>
    </h2>

    <p class="subheading font-weight-regular">
      Ajuda supervisores a administrar seus times de forma fácil e rápida.
    </p>
  </div>
</template>

<script>
export default {
  name: "ApresentationComponent",
};
</script>

<style lang="scss" scoped>
.apresentation {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
