<template>
  <v-container>
    <v-row class="text-center">
      <!-- <v-col cols="6">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3 logo-vuetify"
          contain
          height="200"
        />
      </v-col> -->
      <v-col cols="12">
        <a href="https://www.grupoa.com.br/" target="_blank">
          <v-img
            src="https://www.grupoa.com.br/hs-fs/hubfs/Logos%20BUs%20-%20Site%20Mais%20A%20Educa%C3%A7%C3%A3o/+a-22-22%20(1).png?width=100&name=+a-22-22%20(1).png"
            class="my-3 logo-grupo-a"
            contain
            height="200"
          />
        </a>
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Desafio Grupo A</h1>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">Responsáveis:</h2>

        <v-row justify="center">
          <p v-for="(item, i) in responsible" :key="i">{{ item.name }}</p>
        </v-row>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">Realizado por:</h2>

        <v-row justify="center">
          <p v-for="(item, i) in challenged" :key="i">{{ item.name }}</p>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Welcome',

  data: () => ({
    responsible: [
      {
        name: 'Gustavo',
      },
      {
        name: 'Jackson',
      },
      {
        name: 'Marina',
      },
      {
        name: 'Rogerio',
      },
    ],
    challenged: [
      {
        name: 'Guilherme Viegas',
      },
    ],
  }),
};
</script>

<style scoped>
.logo-grupo-a {
  margin: 0 auto;
  width: 100px;
}

p {
  margin: 10px 10px 0;
}

a {
  display: inline-block;
}
</style>
