<template>
    <div class="app-sidebar colored">
        <div class="sidebar-header">
            <a class="header-brand" href="index.html">
                <div class="logo-img mr-2">
                    <img src="/img/logo-m0.png" class="header-brand-img" alt="lavalite" style="height: 1.5em; width: 1.5em"> 
                </div>
                <span class="text">Maisonier</span>
            </a>
            <button type="button" class="nav-toggle"><i data-toggle="expanded" class="ik ik-toggle-right toggle-icon"></i></button>
            <button id="sidebarClose" class="nav-close"><i class="ik ik-x"></i></button>
        </div>
        
        <div class="sidebar-content">
            <div class="nav-container">
                <nav id="main-menu-navigation" class="navigation-main">
                    <div class="nav-lavel">Accueil</div>
                    <div class="nav-item"><b-link :to="{name: 'home'}"><i class="ik ik-monitor"></i><span>Accueil</span></b-link></div>
                    
                     <div class="nav-item"><b-link :to="{name: 'analyse'}"><i class="fas fa-analytics"></i><span>Analyse & Rentabilité</span></b-link></div>
                     <div class="nav-item"><b-link :to="{name: 'depenses'}"><i class="ik ik-menu"></i><span>Dépenses</span></b-link></div>
                    <!--<div class="nav-item has-sub">
                        <a href="javascript:void(0)"><i class="ik ik-layers"></i><span>Widgets</span> <span class="badge badge-danger">150+</span></a>
                        <div class="submenu-content">
                            <a href="pages/widgets.html" class="menu-item">Basic</a>
                            <a href="pages/widget-statistic.html" class="menu-item">Statistic</a>
                            <a href="pages/widget-data.html" class="menu-item">Data</a>
                            <a href="pages/widget-chart.html" class="menu-item">Chart Widget</a>
                        </div>
                    </div>-->
                    <div class="nav-lavel">Patrimoine immobilier</div>
                    <div class="nav-item"><b-link :to="{name: 'cites'}"><i class="fas fa-city"></i><span>Mes cités</span></b-link></div>
                    <div class="nav-item"><b-link :to="{name: 'batiments'}"><i class="fa fa-building"></i><span>Mes batiments</span></b-link></div>
                    <div class="nav-item"><b-link :to="{name: 'logements'}"><i class="fas fa-home"></i><span>Mes logements</span></b-link></div>
                    
                    <div class="nav-lavel">Gestion immobilière</div>
                    <div class="nav-item"><b-link :to="{name: 'annonces'}"><i class="fas fa-ad"></i><span>Mes annonces</span></b-link></div>
                    <div class="nav-item"><b-link :to="{name: 'occupations'}"><i class="fas fa-building"></i><span>Mes occupations</span></b-link></div>
                    <div class="nav-item"><b-link :to="{name: 'habitants'}"><i class="fas fa-users"></i><span>Mes habitants</span></b-link></div>
                    
                    <div class="nav-lavel">Finances</div>
                    <div class="nav-item"><b-link :to="{name: 'indexes'}"><i class="fas fa-clipboard-list"></i><span>Rélévés d'indexes</span></b-link></div>
                    
                    <div class="nav-lavel">Configuration et Aide</div>
                    <div class="nav-item"><a href="javascript:void(0)"><i class="ik ik-monitor"></i><span>Documentation</span></a></div>
                    <div class="nav-item"><b-link :to="{name: 'articles'}"><i class="fas fa-newspaper"></i><span>Mes Articles et Rubriques</span></b-link></div>
                    <div class="nav-item"><b-link :to="{name: 'contrat'}"><i class="fas fa-file-signature"></i><span>Mes Modèles Contrats</span></b-link></div>
                    
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Sidebar'
}
</script>