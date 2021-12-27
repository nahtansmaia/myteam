<template>
  <v-container>
    <v-app-bar color="primary" dark dense app>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          :src="require('../assets/icon/dashboard.svg')"
          transition="scale-transition"
          width="30"
        />
        <h1>My Team</h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn text @click="$router.push('/login')">
        <span class="mr-2">Login</span>
      </v-btn>
    </v-app-bar>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/icon/dashboard.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h2 class="display-2 font-weight-bold mb-3">
          Bem vindo ao <span class="text-primary">MyTeam</span>
        </h2>

        <p class="subheading font-weight-regular">
          Ajuda supervisores a administrar seus times de forma fácil e rápida.
        </p>
      </v-col>
      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">Links importantes</h2>
        <v-row justify="center">
          <a
            v-for="(link, i) in importantLinks"
            :key="i"
            :href="link.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ link.text }}
          </a>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HomeComponent",

  data: () => ({
    importantLinks: [
      {
        text: "Karoo",
        href: "https://www.karoo.com.br/chat/#/classificacao?conta=136",
      },
      {
        text: "Intranet",
        href: "https://novaintranet.alterdata.com.br/",
      },
      {
        text: "BimerUp",
        href: "http://bimer.alterdata.com.br/",
      },
      {
        text: "Artigos",
        href: "http://ajuda.alterdata.com.br/",
      },
    ],
  }),
};
</script>
