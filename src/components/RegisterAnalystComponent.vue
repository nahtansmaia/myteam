<template>
  <v-container>
    <v-card flat>
      <v-form ref="form" @submit.prevent="submit">
        <v-container fluid>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="analyst.name"
                :rules="[(v) => !!v || 'Nome não informado ou inválido.']"
                label="Nome"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="analyst.email"
                label="E-mail"
                :rules="[(v) => !!v || 'E-Mail não informado ou inválido.']"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                :items="supervisorList"
                item-text="name"
                return-object
                v-model="analyst.team.supervisor"
                :rules="[(v) => !!v || 'Supervisor não informado ou inválido.']"
                label="Supervisor"
                required
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="resetForm" outlined> Cancelar </v-btn>
          <v-btn class="btnPrincipal" @click="submit()"> Cadastrar </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <SnackbarComponent
      :visible="snack.visible"
      :text="snack.text"
      @requestClose="snack.visible = false"
    />
  </v-container>
</template>

<script>
import SnackbarComponent from "./SnackbarComponent.vue";
import supervisorAxios from "../services/supervisor.js";
import analystAxios from "../services/analyst.js";
import teamAxios from "../services/team.js";

export default {
  name: "RegisterAnalystComponent",
  components: {
    SnackbarComponent,
  },
  data: () => ({
    formIsValid: false,
    defaultAnalyst: Object.freeze({
      id: "",
      name: "",
      email: "",
      team: {
        id: "",
        name: "",
        supervisor: {
          id: "",
          name: "",
          active: null,
        },
      },
    }),
    analyst: {
      id: "",
      name: "",
      email: "",
      team: {
        id: "",
        name: "",
        supervisor: {
          id: "",
          name: "",
          active: null,
        },
      },
    },
    snack: {
      visible: false,
      text: "Cadastro realizado com sucesso.",
    },
    team: {
      id: "",
      name: "",
      supervisor: {},
    },
    supervisorList: [],
  }),
  methods: {
    resetForm() {
      this.analyst = Object.assign({}, this.defaultAnalyst);
      this.snack = {
        visible: false,
        text: "Cadastro realizado com sucesso.",
      };
    },
    submit() {
      this.createTeam();
      this.createAnalyst(this.analyst);
      this.resetForm();
    },
    createAnalyst(analyst) {
      // analista1234@gmail.com

      analystAxios.ListAnalysts().then((response) => {
        response.data.forEach((element) => {
          if (element.name === analyst.name) {
            this.snack.visible = true;
            this.snack.text = "Já existe um analista cadastrado com este nome.";
            return;
          }
        });
      });
      this.analyst.team = this.team;

      analystAxios
        .saveAnalyst(analyst)
        .then(() => {
          this.snack.visible = true;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    createTeam() {
      this.team.name = "Equipe de " + this.analyst.team.supervisor.name;
      this.team.supervisor = this.analyst.team.supervisor;

      teamAxios.ListTeams().then((response) => {
        response.data.forEach((t) => {
          if (t.name == this.team.name) {
            this.team = t;
          }
        });
        if (this.team.id == "") {
          teamAxios
            .saveTeam(this.team)
            .then((response) => {
              this.analyst.team = response.data;
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
    },
    getSupervisors() {
      supervisorAxios
        .ListSupervisors()
        .then((response) => {
          this.supervisorList = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    loadAllObjects() {
      this.getSupervisors();
    },
  },
  created() {
    this.loadAllObjects();
  },
};
</script>

<style lang="scss" scoped>
form {
  padding: 1ch !important;

  label {
    font-size: 0.8rem !important;
  }
  .v-messages__message {
    font-size: 0.6rem !important;
  }
}
</style>