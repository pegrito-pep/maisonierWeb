<template>
    <div class="app-sidebar colored">
        <div class="sidebar-header" style="background:#020202;">
            <a class="header-brand" href="index.html">
                <div class="logo-img mr-2">
                    <img src="/img/logo-m0.png" class="header-brand-img" alt="lavalite" style="height: 1.5em; width: 1.5em"> 
                </div>
                <span class="text">Maisonier</span>
            </a>
            <button type="button" class="nav-toggle"><i data-toggle="expanded" class="ik ik-toggle-right toggle-icon"></i></button>
            <button id="sidebarClose" class="nav-close"><i class="ik ik-x"></i></button>
        </div>
        
        <div class="sidebar-content" style="background:#191c22">
            <div class="nav-container">
                <nav id="main-menu-navigation" class="navigation-main">
                    <div class="nav-item"><b-link :to="{name: 'home'}"><i style="color:whitesmoke;font-size:.9rem;" class="ik ik-monitor"></i><span>Accueil</span></b-link></div>
                    
                    <div class="nav-item has-sub">
                        <b-link :to="{name: 'patrimoine'}"><i style="color:whitesmoke;font-size:.9rem;" class="fas fa-city"></i><span>Patrimoine immobilier</span></b-link>
                        <div class="submenu-content" style="background:#f3f3f32c;">
                            <b-link :to="{name: 'cites'}" class="menu-item"><i style="color:#f5365c;font-size:.9rem;" class="fas fa-city"></i><span>Mes cités</span></b-link>
                            <b-link :to="{name: 'batiments'}" class="menu-item"><i style="color:#f5365c;font-size:.9rem;" class="fa fa-building"></i><span>Mes batiments</span></b-link>
                            <b-link :to="{name: 'logements'}" class="menu-item"><i style="color:#f5365c;font-size:.9rem;" class="fas fa-home"></i><span>Mes logements</span></b-link>
                        </div>
                    </div>

                    <div class="nav-item has-sub">
                        <b-link :to="{name: 'gestion'}"><i style="color:whitesmoke;font-size:.9rem;" class="fas fa-ad"></i><span>Gestion immobilière</span></b-link>
                        <div class="submenu-content" style="background:#f3f3f32c;">
                            <b-link :to="{name: 'annonces'}" class="menu-item"><i style="color:#f5365c;font-size:.9rem;" class="fas fa-ad"></i><span>Mes annonces</span></b-link>
                            <b-link :to="{name: 'occupations'}" class="menu-item"><i style="color:#f5365c;font-size:.9rem;" class="fa fa-building"></i><span>Mes occupations</span></b-link>
                            <b-link :to="{name: 'habitants'}" class="menu-item"><i style="color:#f5365c;font-size:.9rem;" class="fas fa-users"></i><span>Mes habitants</span></b-link>
                        </div>
                    </div>

                     <div class="nav-item"><b-link :to="{name: 'analyses'}"><i style="color:whitesmoke;font-size:.9rem;" class="fas fa-analytics"></i><span>Analyse & Rentabilité</span></b-link></div>
                     <div class="nav-item"><b-link :to="{name: 'depenses'}"><i style="color:whitesmoke;font-size:.9rem;" class="ik ik-menu"></i><span>Dépenses</span></b-link></div>

                    <div class="nav-item has-sub">
                        <b-link :to="{name: 'indexes'}"><i style="color:whitesmoke;font-size:.9rem;" class="fas fa-clipboard-list"></i><span>Finances</span></b-link>
                        <div class="submenu-content" style="background:#f3f3f32c;">
                            <b-link :to="{name: 'indexes'}" class="menu-item"><i style="color:#f5365c;font-size:.9rem;" class="fas fa-clipboard-list"></i><span>Rélévés d'indexes</span></b-link>
                            <b-link :to="{name: 'loyers'}" class="menu-item"><i style="color:#f5365c;font-size:.9rem;" class="fas fa-clipboard-list"></i><span>Loyers</span></b-link>
                        </div>
                    </div>
                    
                    <div class="nav-item has-sub">
                        <b-link :to="{name: 'articles'}"><i style="color:whitesmoke;font-size:.9rem;" class="fas fa-city"></i><span>Configuration et Aide</span></b-link>
                        <div class="submenu-content" style="background:#f3f3f32c;">
                            <b-link :to="{name: 'articles'}" class="menu-item"><i style="color:#f5365c;font-size:.9rem;" class="fas fa-newspaper"></i><span>Mes Articles et Rubriques</span></b-link>
                            <b-link :to="{name: 'contrat'}" class="menu-item"><i style="color:#f5365c;font-size:.9rem;" class="fas fa-file-signature"></i><span>Templates Contrats</span></b-link>
                            <b-link :to="{name: 'contrats'}" class="menu-item"><i style="color:#f5365c;font-size:.9rem;" class="ik ik-feather"></i><span>Mes contrats</span></b-link>
                            <a href="javascript:void(0)" class="menu-item"><i style="color:#f5365c;font-size:.9rem;" class="ik ik-monitor"></i><span>Documentation</span></a>
                        </div>
                    </div>
                    
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Sidebar',
}
</script>
<style scoped>
    .nav-item i{
        color: white;
    }
    li{
        list-style: none;
    }
    ul{
        margin: 0;
        padding: 0;
        color: #191c22;
    }
    .menu-item.router-link-exact-active span{
        font-weight: 600;
        color: #f5365c ;
    }
</style>