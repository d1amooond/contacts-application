import VueRouter from 'vue-router';
import Home from '../pages/Home';
import Contact from '../pages/Contact';

const routes = [
    { path: '/', component: Home},
    { name: 'contact', path: '/contact', component: Contact},
]

export const router = new VueRouter({
  routes,
});
