<template>
  <v-container>
    <v-card>
      <v-card-title>Atendimentos</v-card-title>
      <v-form ref="form" @submit.prevent="submit">
        <v-container fluid>
          <v-row>
            <v-col cols="12" sm="4">
              <v-select
                :items="analysts"
                item-text="email"
                item-value="id"
                :rules="[(v) => !!v || 'Analista não informado ou inválido.']"
                label="Analista"
                required
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4">
              <v-menu
                ref="menu"
                v-model="menuDate"
                :close-on-content-click="false"
                :return-value.sync="service.date"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="picker"
                    label="Data"
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="picker"
                  locale="pt-br"
                  no-title
                  scrollable
                  @input="menuDate = false"
                >
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="4">
              <v-select
                :items="supervisors"
                item-text="email"
                item-value="id"
                :rules="[(v) => !!v || 'Supervisor não informado ou inválido.']"
                label="Supervisor"
                required
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="2">
              <v-text-field
                v-model="service.quantity"
                label="Quantidade"
                type="number"
                :rules="[(v) => !!v || 'Quantidade não informada ou inválida.']"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2">
              <v-text-field
                v-model="service.goal"
                label="Meta"
                type="number"
                :rules="[(v) => !!v || 'Meta não informada ou inválida.']"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2">
              <v-text-field
                v-model="service.goal"
                label="Encerrado de outros"
                type="number"
                :rules="[
                  (v) =>
                    !!v || 'Encerrado de outros não informado ou inválido.',
                ]"
                required
              ></v-text-field
            ></v-col>
            <v-col cols="12" sm="3">
              <v-text-field
                v-model="service.firstContactResolution"
                label="Resolução primeiro contato"
                type="number"
                :rules="[
                  (v) =>
                    !!v ||
                    'Resolução primeiro contato não informada ou inválida.',
                ]"
                required
              ></v-text-field
            ></v-col>
            <v-col cols="12" sm="3">
              <v-text-field
                v-model="service.ratingPercentage"
                label="Percentual de avaliação"
                type="number"
                :rules="[
                  (v) =>
                    !!v || 'Percentual de avaliação não informada ou inválida.',
                ]"
                required
              ></v-text-field
            ></v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="2">
              <v-text-field
                v-model="service.oneStars"
                label="Uma estrela"
                type="number"
                :rules="[
                  (v) => !!v || 'Uma estrela não informada ou inválida.',
                ]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2">
              <v-text-field
                v-model="service.twoStars"
                label="Duas estrela"
                type="number"
                :rules="[
                  (v) => !!v || 'Duas estrelas não informada ou inválida.',
                ]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2">
              <v-text-field
                v-model="service.threeStars"
                label="Três estrela"
                type="number"
                :rules="[
                  (v) => !!v || 'Três estrelas não informada ou inválida.',
                ]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2">
              <v-text-field
                v-model="service.fourStars"
                label="Quatro estrelas"
                type="number"
                :rules="[
                  (v) => !!v || 'Quatro estrelas não informada ou inválida.',
                ]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2">
              <v-text-field
                v-model="service.fiveStars"
                label="Cinco estrelas"
                type="number"
                :rules="[
                  (v) => !!v || 'Cinco estrelas não informada ou inválida.',
                ]"
                required
              ></v-text-field>
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
export default {
  name: "ServiceComponent",
  components: {
    SnackbarComponent,
  },
  data: () => ({
    picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menuDate: false,
    defaultService: {
      id: "",
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
            active: false,
          },
        },
      },
      date: null,
      quantity: null,
      goal: null,
      hitGoal: false,
      closedOthers: null,
      supervisor: {
        id: "",
        name: "",
        active: false,
      },
      fiveStars: null,
      fourStars: null,
      threeStars: null,
      twoStars: null,
      oneStars: null,
      firstContactResolution: null,
      ratingPercentage: null,
    },
    service: {
      id: "",
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
            active: false,
          },
        },
      },
      date: null,
      quantity: null,
      goal: null,
      hitGoal: false,
      closedOthers: null,
      supervisor: {
        id: "",
        name: "",
        active: false,
      },
      fiveStars: null,
      fourStars: null,
      threeStars: null,
      twoStars: null,
      oneStars: null,
      firstContactResolution: null,
      ratingPercentage: null,
    },
    fault: {
      id: "",
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
            active: false,
          },
        },
      },
      code: "",
      fault: {
        id: "",
        name: "",
        level: "",
      },
      date: null,
    },
    analysts: [
      {
        id: "1",
        email: "zé.sup.shop",
      },
      {
        id: "2",
        email: "maria.sup.shop",
      },
    ],
    supervisors: [
      {
        id: "1",
        email: "castro.sup.shop",
      },
      {
        id: "2",
        email: "igorpontes.sup.shop",
      },
    ],
    snack: {
      visible: false,
      text: "Cadastro realizado com sucesso.",
    },
  }),
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    resetForm() {
      this.service = Object.assign({}, this.defaultService);
    },
    submit() {
      this.snack.visible = true;
      this.resetForm();
    },
  },
};
</script>

<style lang="scss">
form {
  padding: 1ch !important;

  label {
    font-size: 0.8rem !important;
  }
  .v-messages__message {
    font-size: 0.6rem !important;
  }
  .v-text-field {
    label {
      color: var(--featured-darker) !important;
    }
    input {
      background-color: transparent !important;
      color: var(--featured-lighter) !important;
    }
    .v-input__slot::after {
      border-color: var(--featured-lighter) !important;
    }
    .v-input__slot::before {
      border-color: var(--featured-lighter) !important;
    }
    .v-label--active label {
      color: var(--featured-lighter) !important;
    }
    .v-icon {
      color: var(--featured-lighter) !important;
    }
  }
  .v-select__selection {
    color: var(--featured-darker) !important;
  }
  .v-list-item__title {
    color: var(--featured-darker) !important;
    border-radius: 8px;
  }
}
</style>
