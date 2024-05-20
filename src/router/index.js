import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/landing',
            name: 'landing',
            component: () => import('../public/pages/landing-page.component.vue'),
            props: true,
        },
        {
            path: '/',
            redirect: 'landing'
        },
    ]
})

export default router