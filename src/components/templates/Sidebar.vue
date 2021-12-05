<template>
    <div class="app-sidebar colored">
        <div class="sidebar-header" style="background:#020202;">
            <a class="header-brand" href="/">
                <div class="logo-img mr-2">
                    <img src="@/assets/img/logo-m0.png" class="header-brand-img" alt="lavalite" style="height: 1.5em; width: 1.5em"> 
                </div>
                <span class="text">Maisonier</span>
            </a>
            <button type="button" class="nav-toggle"><i data-toggle="expanded" class="ik ik-toggle-right toggle-icon"></i></button>
            <button id="sidebarClose" class="nav-close"><i class="ik ik-x"></i></button>
        </div>
        
        <div class="sidebar-content" style="background:#191c22">
            <div class="nav-container">
                <nav id="main-menu-navigation" class="navigation-main">
                    <div class="nav-item"><b-link :to="{name: 'home'}"><i style="color:whitesmoke;font-size:.9rem;" class="ik ik-monitor"></i><span>{{ $t('data.sidebar_acueil') }}</span></b-link></div>
                    <div class="nav-item"><b-link :to="{name: 'dashbord'}"><i style="color:whitesmoke;font-size:.9rem;" class="fa fa-tachometer-alt"></i><span>{{ $t('data.sidebar_dashboard') }}</span></b-link></div>
                    
                    <div class="nav-item has-sub">
                        <b-link :to="{name: 'cites'}"><i style="color:whitesmoke;font-size:.9rem;" class="fas fa-city"></i><span>{{ $t('data.sidebar_patrimoine_immobilier') }}</span></b-link>
                        <div class="submenu-content" style="background:#f3f3f32c;">
                            <b-link :to="{name: 'cites'}" class="menu-item"><i style="color:#f5365c;font-size:.9rem;" class="fas fa-city"></i><span>{{ $t('data.sidebar_mes_cites') }}</span></b-link>
                            <b-link :to="{name: 'batiments'}" class="menu-item"><i style="color:#f5365c;font-size:.9rem;" class="fa fa-building"></i><span>{{ $t('data.sidebar_mes_batiments') }}</span></b-link>
                            <b-link :to="{name: 'logements'}" class="menu-item"><i style="color:#f5365c;font-size:.9rem;" class="fas fa-home"></i><span>{{ $t('data.sidebar_mes_logements') }}</span></b-link>
                        </div>
                    </div>

                    <div class="nav-item has-sub">
                        <b-link :to="{name: 'occupations'}"><i style="color:whitesmoke;font-size:.9rem;" class="fas fa-ad"></i><span>{{ $t('data.sidebar_gestion_immobiliere') }}</span></b-link>
                        <div class="submenu-content" style="background:#f3f3f32c;">
                            <b-link :to="{name: 'occupations'}" class="menu-item"><i style="color:#f5365c;font-size:.9rem;" class="fa fa-building"></i><span>{{ $t('data.sidebar_mes_occupations') }}</span></b-link>
                            <b-link :to="{name: 'annonces'}" class="menu-item"><i style="color:#f5365c;font-size:.9rem;" class="fas fa-ad"></i><span>{{ $t('data.sidebar_mes_annonces') }}</span></b-link>
                        </div>
                    </div>

                     <div class="nav-item has-sub">
                        <b-link :to="{name: 'habitants'}"><i style="color:whitesmoke;font-size:.9rem;" class="fas fa-ad"></i><span>{{ $t('data.sidebar_locations') }}</span></b-link>
                        <div class="submenu-content" style="background:#f3f3f32c;">
                            <b-link :to="{name: 'habitants'}" class="menu-item"><i style="color:#f5365c;font-size:.9rem;" class="fas fa-user-tie"></i><span>{{ $t('data.sidebar_mes_habitants') }}</span></b-link>
                            <b-link :to="{name: 'insolvables'}" class="menu-item"><i style="color:#f5365c;font-size:.9rem;" class="fa fa-users"></i><span>{{ $t('data.sidebar_insolvables') }}</span></b-link>
                        </div>
                    </div>

                     <div class="nav-item"><b-link :to="{name: 'analyses'}"><i style="color:whitesmoke;font-size:.9rem;" class="fas fa-analytics"></i><span>{{ $t('data.sidebar_analyse_rentabilite') }}</span></b-link></div>
                     <div class="nav-item"><b-link :to="{name: 'depenses'}"><i style="color:whitesmoke;font-size:.9rem;" class="ik ik-menu"></i><span>{{ $t('data.sidebar_depenses') }}</span></b-link></div>

                    <div class="nav-item has-sub">
                        <b-link :to="{name: 'indexes'}"><i style="color:whitesmoke;font-size:.9rem;" class="fas fa-clipboard-list"></i><span>{{ $t('data.sidebar_finances') }}</span></b-link>
                        <div class="submenu-content" style="background:#f3f3f32c;">
                            <b-link :to="{name: 'indexes'}" class="menu-item"><i style="color:#f5365c;font-size:.9rem;" class="fas fa-clipboard-list"></i><span>{{ $t('data.sidebar_releves_indexes') }}</span></b-link>
                            <b-link :to="{name: 'loyers'}" class="menu-item"><i style="color:#f5365c;font-size:.9rem;" class="fas fa-clipboard-list"></i><span>{{ $t('data.sidebar_loyers') }}</span></b-link>
                            <b-link :to="{name: 'recharges'}" class="menu-item"><i style="color:#f5365c;font-size:.9rem;" class="fas fa-clipboard-list"></i><span>{{ $t('data.sidebar_recharge_comptes') }}</span></b-link>
                        </div>
                    </div>
                    
                    <div class="nav-item has-sub">
                        <b-link :to="{name: 'contrats'}"><i style="color:whitesmoke;font-size:.9rem;" class="fas fa-city"></i><span>{{ $t('data.sidebar_configuration_aide') }}</span></b-link>
                        <div class="submenu-content" style="background:#f3f3f32c;">
                            <b-link :to="{name: 'contrats'}" class="menu-item"><i style="color:#f5365c;font-size:.9rem;" class="ik ik-feather"></i><span>{{ $t('data.sidebar_modeles_contrats') }}</span></b-link>
                            <b-link :to="{name: 'doc'}" class="menu-item"><i style="color:#f5365c;font-size:.9rem;" class="ik ik-monitor"></i><span>{{ $t('data.sidebar_documentation') }}</span></b-link>
                        </div>
                    </div>

                    <div class="nav-item has-sub">
                        <b-link :to="{name: 'preferences'}"><i style="color:whitesmoke;font-size:.9rem;" class="fas fa-cogs"></i><span>{{ $t('data.sidebar_parametres') }}</span></b-link>
                        <div class="submenu-content" style="background:#f3f3f32c;">
                            <b-link :to="{name: 'preferences'}" class="menu-item"><i style="color:#f5365c;font-size:.9rem;" class="ik ik-settings"></i><span>{{ $t('data.sidebar_preferences') }}</span></b-link>
                            <b-link :to="{name: 'packs'}" class="menu-item"><i style="color:#f5365c;font-size:.9rem;" class="ik ik-settings"></i><span>{{ $t('data.sidebar_formules_dutilisation') }}</span></b-link>
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