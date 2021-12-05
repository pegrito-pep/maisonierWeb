import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/dashbord',
        name: 'dashbord',
        component: () => import('@/views/accueil/Dashbord.vue')
    },
    { path: '/', redirect: { name: 'home' } },
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
        path: '/patrimoine',
        name: 'patrimoine',
        component: () =>
            import ('@/views/patrimoine/patrimoine.vue'),
        children : [
            {
                path: 'batiments',
                name: 'batiments',
                component: () =>
                    import ('@/views/patrimoine/Batiments.vue')
            },
            {
                path: 'cites',
                name: 'cites',
                component: () =>
                    import ('@/views/patrimoine/Cites.vue')
            },
            {
                path: 'logements',
                name: 'logements',
                component: () =>
                    import ('@/views/logements/ListLogements.vue')
            },
        ]
    },
    

    /**
     * Gestion immobiliere
     */
    {
        path: '/gestion',
        name: 'gestion',
        component: () =>
            import ('@/views/gestion-immobiliere/gestion.vue'),
            children : [
                {
                    path: 'annonces',
                    name: 'annonces',
                    component: () =>
                        import ('@/views/gestion-immobiliere/annonces/Annonces.vue')
                },
                {
                    path: 'occupations',
                    name: 'occupations',
                    component: () =>
                        import ('@/views/gestion-immobiliere/Occupations.vue')
                },
                {
                    path: 'occupations/:id',
                    name: 'occupation',
                    component: () =>
                        import ('@/views/gestion-immobiliere/Occupations.vue')
                },
                
            ]
    }
    ,
    {
        path: '/occupations/:id',
        name: 'details-occupation',
        component: () => import('@/views/gestion-immobiliere/DetailsOccupations.vue')
    },
    /**
     * configuration et aide 
     */
    {
        path: '/configuration',
        name: 'configuration',
        component: () =>
            import ('@/views/configuration-aide/configuration.vue'),
            children : [
                {
                    path: 'contrats',
                    name: 'contrats',
                    component: () =>
                        import ('@/views/configuration-aide/Contrats/Contrats.vue')
                }
            ]
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
        path: '/finances',
        name: 'finances',
        component: () =>
            import ('@/views/finances/finances.vue'),
        children: [
            
            {
                path: 'indexes',
                name: 'indexes',
                component: () => import('@/views/finances/Indexes.vue')
            },
            {
                path: 'loyers',
                name: 'loyers',
                component: () => import('@/views/finances/Loyers.vue')
            },
            {
                path: 'recharges',
                name: 'recharges',
                component: () => import('@/views/finances/recharges/Recharges.vue')
            }
        ]
    },
     /**
     * Préférences
     */
      {
        path: '/parametres',
        name: 'parametres',
        component: () =>
            import ('@/views/parametres/parametres.vue'),
        children: [
            
            {
                path: 'preferences',
                name: 'preferences',
                component: () => import('@/views/parametres/preferences.vue')
            },
            {
                path: 'packs',
                name: 'packs',
                component: () => import('@/views/parametres/Packs.vue')
            }
        ]
    },

    /**
     * Locations
     */
     {
        path: '/locations',
        name: 'locations',
        component: () =>
            import ('@/views/locations/locations.vue'),
            children : [
                {
                    path: 'insolvables',
                    name: 'insolvables',
                    component: () =>
                        import ('@/views/locations/Insolvables.vue')
                },
                {
                    path: 'habitants',
                    name: 'habitants',
                    component: () =>
                        import ('@/views/gestion-immobiliere/habitants/Habitants.vue')
                }
            ]
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


router.beforeEach(async(to, from, next) => {
      //A Logged-in user can't go to login page again
    if (to.name === 'login' && localStorage.getItem("accessToken")) {
            router.push({
            name: 'home'
            })
    }
    if (to.matched.some(record => (record.meta.noAuth && true === record.meta.noAuth))) {
        next()
    } else {
        const access_token = storage.get('access_token')
        if (!access_token || access_token == null || access_token == '') {
            next({ name: 'login' })
        }
        /*else {
            if (!this.hasAccess(to.name)) {
              router.push({
                name: 'page-not-authorized'
              })
            }
        }*/
        next()
    }
});

 /*hasAccess(name) {
    permissions = localStorage.getItem("permissions")
  
    switch (name) {
  
      case "home":
        return true;
  
      case "users":
        return permissions.includes("View All Users")
  
      case "permissions":
        return permissions.includes("View All Permissions")
  
      case "roles":
        return permissions.includes("View All Roles")
  
      default:
        return false;
    }
}*/
export default router