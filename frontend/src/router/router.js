import Vue from 'vue';
import VueRouter from 'vue-router';
import Student from '../views/Student.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Student a',
    component: Student,
  },
  {
    path: '/student',
    name: 'Student a',
    component: Student,
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: '',
  routes,
});

export default router;
