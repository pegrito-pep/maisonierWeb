import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ListLogements from '../views/logements/ListLogements.vue'


Vue.use(VueRouter)

const routes = [{
        path: '/home',
        name: 'home',
        component: Home
    },
    { path: '/', redirect: { name: 'home' } },
    {
        path: '/housing',
        name: 'logements',
        component: ListLogements
    },
    {
        path: '/profil',
        name: 'profil',
        component: () => import('@/views/user/Profile.vue')
    },

    /**
     * Authentification
     */
    {
        path: '/login',
        name: 'login',
        meta: { layout: 'empty', noAuth: true },
        component: () =>
            import ('../views/auth/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        meta: { layout: 'empty', noAuth: true },
        component: () =>
            import ('../views/auth/Register.vue')
    },
    {
        path: '/confirm',
        name: 'confirm',
        meta: { layout: 'empty', noAuth: true },
        component: () =>
            import ('../views/auth/Confirm.vue')
    },
    {
        path: '/forgot-password',
        name: 'forgot-password',
        meta: { layout: 'empty', noAuth: true },
        component: () =>
            import ('../views/auth/ForgotPassword.vue')
    },

    /**
     * Patrimoine immobilier
     */
    {
        path: '/cites',
        name: 'cites',
        component: () =>
            import ('@/views/patrimoine/Cites.vue')
    },
    {
        path: '/batiments',
        name: 'batiments',
        component: () =>
            import ('@/views/patrimoine/Batiments.vue')
    },

    /**
     * Gestion immobiliere
     */
    {
        path: '/annonces',
        name: 'annonces',
        component: () =>
            import ('@/views/gestion-immobiliere/Annonces.vue')
    },
    {
        path: '/habitants',
        name: 'habitants',
        component: () =>
            import ('@/views/gestion-immobiliere/Habitants.vue')
    },
    {
        path: '/occupations',
        name: 'occupations',
        component: () =>
            import ('@/views/gestion-immobiliere/Occupations.vue')
    },
    {
        path: '/occupations/:id',
        name: 'details-occupation',
        component: () => import('@/views/gestion-immobiliere/DetailsOccupations.vue')
    },
    /**
     * configuration et aide 
     */
    {
        path: '/articles',
        name: 'articles',
        component: () =>
            import ('@/views/configuration-aide/article.vue')
    },
    {
        path: '/contrat',
        name: 'contrat',
        component: () =>
            import ('@/views/configuration-aide/contrat.vue')
    },
     /**
     * Analyse & stats, depenses
     */
      {
        path: '/depenses',
        name: 'depenses',
        component: () =>
            import ('@/views/gestion-immobiliere/depenses/ListDepenses.vue')
      },


    /**
     * Finances
     */
    {
        path: '/indexes',
        name: 'indexes',
        component: () => import('@/views/finances/Indexes.vue')
    }

]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})


router.beforeEach(async(to, from, next) => {
    if (to.matched.some(record => (record.meta.noAuth && true === record.meta.noAuth))) {
        next()
    } else {
        const access_token = storage.get('access_token')
        if (!access_token || access_token == null || access_token == '') {
            next({ name: 'login' })
        }
        next()
    }
})

export default router