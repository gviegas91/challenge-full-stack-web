<template>
  <v-app>
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
