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
        <v-list-item>
          <v-list-item-avatar>
            <span class="white--text text-h5">{{ user.initial }}</span>
          </v-list-item-avatar>
        </v-list-item>
        <v-list-item class="expansion">
          <v-expansion-panels flat>
            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-list-item-title>
                    Bem-vindo <strong>{{ user.name }}</strong>
                  </v-list-item-title>
                  <v-list-item-subtitle> {{ user.email }}</v-list-item-subtitle>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title @click="dialog = true">
                      <v-icon>mdi-account-circle</v-icon>
                      <span>Meu perfil</span>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-list-item>
        <v-divider class="divider"></v-divider>
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
    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card>
        <div class="account">
          <v-card-title> Meu perfil </v-card-title>
          <v-card-subtitle>Altere seus dados pessoais.</v-card-subtitle>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="user.name"
                label="Nome"
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-checkbox disabled v-model="user.active" label="Ativo"></v-checkbox>
            </v-col>
          </v-row>
          <v-text-field
            v-model="user.email"
            label="E-Mail"
            hide-details
          ></v-text-field>
          <v-text-field
            v-model="password1"
            label="Senha"
            :rules="[
              (v) => v.length >= 6 || 'A senha deve ter no mínimo 6 caracteres',
            ]"
            :type="showPassword1 ? 'text' : 'password'"
            :append-icon="showPassword1 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword1 = !showPassword1"
          ></v-text-field>
          <v-text-field
            v-model="password2"
            label="Confirme a senha"
            :rules="[(v) => v === password1 || 'As senhas não conferem']"
            :type="showPassword2 ? 'text' : 'password'"
            :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword2 = !showPassword2"
          ></v-text-field>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined @click="dialog = false"> Cancelar </v-btn>
          <v-btn
            class="btnPrincipal"
            :disabled="
              password1 != password2 ||
              password1 === '' ||
              password1.length <= 5
            "
            @click="update(user)"
          >
            Gravar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import supervisorAxios from "../services/supervisor.js";

export default {
  name: "ToolbarComponent",
  data: () => ({
    showPassword1: false,
    showPassword2: false,
    dialog: false,
    drawer: false,
    sendButton: false,
    password1: "",
    password2: "",
    items: [
      { title: "Dashboard", icon: "mdi-view-dashboard", route: "/home" },
      { title: "Cadastros", icon: "mdi-account-box", route: "/register" },
      { title: "Lançamentos", icon: "mdi-gavel", route: "/service" },
      { title: "Meu time", icon: "mdi-account-group", route: "/my-team" },
    ],
    user: {},
  }),
  methods: {
    navigation(where) {
      if(this.$router.currentRoute.path != where) {
        this.$router.push(where);
      }
    },
    logout() {
      localStorage.removeItem("user");
      this.$router.push("/login");
    },
    async update(user) {
      user.password = this.password1;
      await supervisorAxios
        .updateSupervisor(user)
        .then(() => {
          this.dialog = false;
          this.password1 = "";
          this.password2 = "";
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },
};
</script>