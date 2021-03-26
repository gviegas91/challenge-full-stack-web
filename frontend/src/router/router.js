import Vue from 'vue';
import VueRouter from 'vue-router';
import Student from '../views/Student.vue';
import Welcome from '../components/Welcome.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Welcome,
  },
  {
    path: '/students',
    name: 'Student',
    component: Student,
  },
];

const router = new VueRouter({
  mode: '',
  base: '/',
  routes,
});

export default router;
