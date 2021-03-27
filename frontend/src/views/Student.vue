<template>
  <div>
    <v-progress-linear
      indeterminate
      color="#209378"
      v-show="loading"
    ></v-progress-linear>
    <v-data-table
      height="100vh"
      :headers="headers"
      :items="studentList"
      class="elevation-1"
      item-key="ra"
      :search="search"
      hide-default-footer
      loading-text="Carregando itens"
    >
      <template v-slot:top>
        <v-toolbar flat height="80" class="caca">
          <v-text-field
            color="#209378"
            v-model="search"
            placeholder="Digite sua busca"
            class="mx-4"
            append-icon="mdi-magnify"
          ></v-text-field>

          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="#209378" dark class="mb-2" v-bind="attrs" v-on="on">
                Cadastrar aluno
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-form ref="form">
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          color="#209378"
                          v-model="editedItem.name"
                          label="Nome"
                          :rules="[formRules.required, formRules.nameRule]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          color="#209378"
                          v-model="editedItem.email"
                          label="Email"
                          type="email"
                          :rules="[formRules.required, formRules.emailRule]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          color="#209378"
                          v-model="editedItem.ra"
                          label="RA"
                          type="tel"
                          :disabled="disableField"
                          :rules="disableField ? [] : [formRules.required]"
                          v-mask="'#############'"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          color="#209378"
                          v-model="editedItem.cpf"
                          label="CPF"
                          :disabled="disableField"
                          :rules="
                            disableField
                              ? []
                              : [formRules.required, formRules.cpfRule]
                          "
                          v-mask="'###.###.###-##'"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#209378" text @click="close"> Cancelar </v-btn>
                <v-btn color="#209378" text @click="save"> Cadastrar </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="600px">
            <v-card>
              <v-card-title class="headline"
                >Tem certeza que deseja deletar o aluno
                {{ editedItem.name }}?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#209378" text @click="closeDelete"
                  >Cancelar</v-btn
                >
                <v-btn color="#209378" text @click="deleteItemConfirm"
                  >Deletar</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-card flat min-height="200">
          <v-card-subtitle>Nenhum aluno cadastrado</v-card-subtitle>
        </v-card>
      </template>
      <template v-slot:no-result> Nenhum resultado encontrado </template>
    </v-data-table>
    <v-alert
      dense
      elevation="2"
      :type="alert.type"
      transition="scale-transition"
      v-show="alert.status"
    >
      {{ alert.message }}
      <v-icon small @click="closeAlert()"> mdi-close-circle </v-icon>
    </v-alert>
  </div>
</template>

<script>
import { mask } from 'vue-the-mask';
import axios from 'axios';
import endpoints from '../api/endpoints';

export default {
  name: 'Student',
  directives: { mask },
  data: () => ({
    alert: {
      status: false,
      message: '',
      type: 'success',
    },
    loading: false,
    disableField: false,
    search: '',
    studentList: [],
    editedItem: {
      ra: '',
      name: '',
      cpf: '',
      email: '',
    },
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    formRules: {
      required: (val) => (val && val.length > 0) || 'Este campo é obrigatório.',
      nameRule: (val) =>
        (val && val.length > 3) || 'Nome precisa ter no mínimo 3 caracteres.',
      emailRule: (val) =>
        (val && /.+@.+\..+/.test(val)) || 'Email precisa ser válido.',
      cpfRule: (val) =>
        (val && val.length >= 14) || 'CPF precisa ter 11 caracteres.',
    },
  }),
  computed: {
    headers() {
      return [
        {
          text: 'Registro Acadêmico',
          align: 'start',
          value: 'ra',
        },
        {
          text: 'Nome',
          value: 'name',
        },
        { text: 'CPF', value: 'cpf' },
        { text: 'Ações', value: 'actions', sortable: false },
      ];
    },
    formTitle() {
      return this.editedIndex === -1 ? 'Novo Aluno' : 'Editar Aluno';
    },
  },
  watch: {
    dialog(val) {
      return val || this.close();
    },
    dialogDelete(val) {
      return val || this.closeDelete();
    },
  },
  methods: {
    closeAlert() {
      this.alert.status = false;
    },

    showAlert(message, type = 'success') {
      this.alert.status = true;
      this.alert.message = message;
      this.alert.type = type;
    },

    resetForm() {
      this.$refs.form.resetValidation();
      this.$refs.form.reset();
    },

    editItem(item) {
      this.disableField = true;
      this.editedIndex = this.studentList.indexOf(item);
      this.editedItem = { ...item };
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.studentList.indexOf(item);
      this.editedItem = { ...item };
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.loading = true;
      axios
        .delete(endpoints.students, { data: this.editedItem })
        .then((response) => {
          this.studentList.splice(this.editedIndex, 1);
          this.loading = false;
          this.closeDelete();
          this.showAlert(response.data.message);
        })
        .catch((e) => {
          this.loading = false;
          this.showAlert(e.response.data.message, 'error');
        });
    },

    close() {
      this.disableField = false;
      this.dialog = false;
      this.resetForm();
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        if (this.editedIndex > -1) {
          axios
            .patch(endpoints.students, this.editedItem)
            .then((response) => {
              Object.assign(
                this.studentList[this.editedIndex],
                this.editedItem,
              );
              this.loading = false;
              this.close();
              this.showAlert(response.data.message);
            })
            .catch((e) => {
              this.loading = false;
              this.close();
              this.showAlert(e.response.data.message, 'error');
            });
        } else {
          axios
            .post(endpoints.students, this.editedItem)
            .then((response) => {
              this.loading = false;
              this.close();
              this.showAlert(response.data.message);
              this.studentList.push(response.data.result);
            })
            .catch((e) => {
              this.loading = false;
              this.close();
              this.showAlert(e.response.data.message, 'error');
            });
        }
      }
    },
  },
  mounted() {
    this.loading = true;
    axios
      .get(endpoints.students)
      .then((response) => {
        this.loading = false;
        this.studentList = response.data;
      })
      .catch((e) => {
        this.loading = false;
        this.showAlert(e.response.data.message, 'error');
      });
  },
};
</script>

<style>
.v-data-table-header {
  background-color: #ccc;
}

.v-toolbar__content {
  align-items: center;
}

.v-data-table__empty-wrapper .v-card {
  align-items: center;
  display: flex;
  justify-content: center;
}

.v-alert {
  bottom: 0;
  position: fixed;
  right: 10px;
}

.v-alert .v-icon {
  margin: 0 0 0 40px;
}

.v-data-table {
  border-radius: 0;
  padding: 30px;
}

.v-toolbar__content {
  padding: 0 !important;
}

.v-data-table-header {
  background-color: #e0f2f1;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover {
  background-color: #e0f2f1 !important;
}
</style>
