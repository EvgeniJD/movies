import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Movie from '../views/Movie.vue';
import User from '../views/User.vue';
import PageNotFound from '../views/PageNotFound.vue';
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/movie/:movieId',
    name: 'Movie',
    component: Movie,
  },
  {
    path: '/settings',
    name: 'User',
    component: User,
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: PageNotFound,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const isAuthenticated = store.state.user.is_logged_in || !!user;

  console.log('BeforeRoute: ', isAuthenticated);
  console.log('To Name: ', to.name);

  if (isAuthenticated && to.name === 'Login') {
    next({ name: 'Home' });
  } else if (!isAuthenticated && to.name !== 'Login') {
    next({ name: 'Login' });
  } else {
    next();
  }


})

export default router
