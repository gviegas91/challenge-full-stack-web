<template>
  <v-navigation-drawer color="#209378" app clipped permanent>
    <v-list nav dense tag="ul">
      <li v-for="(link, i) in links" :key="i">
        <v-list-item :to="link.to" dense exact color="white">
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
        text: 'Dashboard',
        to: '/',
        icon: 'mdi-view-dashboard',
      },
      {
        text: 'Alunos',
        to: 'students',
        icon: 'mdi-account-group',
      },
    ],
  }),
};
</script>

<style scoped>
.v-list {
  list-style-type: none;
  padding: 30px 0;
}

.v-list--nav.v-list--dense .v-list-item {
  margin: 0 !important;
  padding: 5px 20px;
}
</style>
