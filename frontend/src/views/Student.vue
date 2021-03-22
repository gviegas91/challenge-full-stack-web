<template>
  <v-data-table
    :headers="headers"
    :items="studentList"
    class="elevation-1"
    item-key="register"
    :search="search"
    hide-default-footer
  >
    <template v-slot:top>
      <v-toolbar flat height="80">
        <v-text-field
          v-model="search"
          placeholder="Digite sua busca"
          class="mx-4"
          append-icon="mdi-magnify"
        ></v-text-field>

        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Cadastrar aluno
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.name"
                      placeholder="Nome"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.email"
                      placeholder="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.register"
                      placeholder="RA"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.cpf"
                      placeholder="CPF"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Cancelar
              </v-btn>
              <v-btn color="blue darken-1" text @click="save">
                Cadastrar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="600px">
          <v-card>
            <v-card-title class="headline"
              >Tem certeza que deseja deletar este aluno?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancelar</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
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
      <v-btn color="primary" @click="initialize">
        Clique aqui para carregar novamente
      </v-btn>
    </template>
    <template v-slot:no-result> Nenhum resultado encontrado </template>
  </v-data-table>
</template>
<script>
import axios from 'axios';
import endpoints from '../api/endpoints';

export default {
  name: 'Student',

  data: () => ({
    search: '',
    studentList: [],
    editedItem: {
      register: '',
      name: '',
      cpf: '',
      email: '',
    },
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
  }),
  computed: {
    headers() {
      return [
        {
          text: 'Registro Acadêmico',
          align: 'start',
          value: 'register',
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
    initialize() {
      this.studentList = [
        {
          register: '101239',
          name: 'Paula Souza',
          cpf: '121.999.999-99',
          actions: 'teste',
        },
        {
          register: '111687',
          name: 'João Silva',
          cpf: '122.999.999-99',
          actions: 'teste',
        },
        {
          register: '111365',
          name: 'Marina Miranda',
          cpf: '123.999.999-99',
          actions: 'teste',
        },
        {
          register: '101299',
          name: 'Maurício Souza',
          cpf: '124.999.999-99',
          actions: 'teste',
        },
      ];
    },

    editItem(item) {
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
      this.studentList.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
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
      if (this.editedIndex > -1) {
        Object.assign(this.studentList[this.editedIndex], this.editedItem);
      } else {
        this.studentList.push(this.editedItem);
      }
      this.close();
    },
  },
  created() {
    this.initialize();
  },
  mounted() {
    axios
      .get(endpoints.students)
      .then((response) => {
        console.log('RESPONSE ', response);
        this.posts = response.data;
      })
      .catch((e) => {
        console.log('ERROR ', e);
        this.errors.push(e);
      });
  },
};
</script>

<style scoped>
.v-data-table-header {
  background-color: #ccc;
}

.v-toolbar__content {
  align-items: center;
}
</style>
