<template>
  <v-app>
    <Sidebar />
    <v-main>
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
