<template>
  <v-navigation-drawer app clipped permanent>
    <v-list nav dense tag="ul">
      <li v-for="(link, i) in links" :key="i">
        <v-list-item :to="link.to" exact color="blue">
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-title v-text="link.text" />
        </v-list-item>
        <v-divider />
      </li>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    links: [
      {
        text: 'Alunos',
        to: '/students',
        icon: 'mdi-account-group',
      },
    ],
  }),
};
</script>

<style scoped>
.v-list {
  list-style-type: none;
  padding: 20px;
}
</style>
