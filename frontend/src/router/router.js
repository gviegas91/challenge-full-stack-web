import Vue from 'vue';
import VueRouter from 'vue-router';
import Student from '../views/Student.vue';
import HelloWorld from '../components/HelloWorld.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home Page',
    component: HelloWorld,
  },
  {
    path: '/students',
    name: 'Student',
    component: Student,
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: '/',
  routes,
});

export default router;
