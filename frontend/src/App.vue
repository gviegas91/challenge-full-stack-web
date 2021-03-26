<template>
  <v-app>
    <Sidebar />
    <v-main class="main-content">
      <v-container fluid>
        <transition
          name="slide"
          enter-active-class="animated slideInRight delay"
          leave-active-class="animated slideOutLeft"
        >
          <router-view></router-view>
        </transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from './components/Sidebar.vue';

export default {
  name: 'App',

  components: {
    Sidebar,
  },

  data: () => ({
    //
  }),
};
</script>
<style scoped>
.main-content {
  background-color: #e0f2f1;
}
</style>
