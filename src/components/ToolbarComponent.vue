<template>
  <v-container>
    <v-app-bar color="primary" dark dense app>
      <v-btn class="btnLink" depressed @click="drawer = true">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <h1>MyTeam</h1>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title @click="navigation(item.route)">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block class="btnPrincipal" @click="logout"> Logout </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
export default {
  name: "ToolbarComponent",
  data: () => ({
    drawer: false,
    items: [
      { title: "Dashboard", icon: "mdi-view-dashboard", route: "/home" },
      { title: "Cadastros", icon: "mdi-account-box", route: "/register" },
      { title: "Lançamentos", icon: "mdi-gavel", route: "/service" },
    ],
  }),
  methods: {
    navigation(where) {
      this.$router.push(where);
    },
    logout() {
      this.$router.push("/login");
    },
  },
};
</script>
