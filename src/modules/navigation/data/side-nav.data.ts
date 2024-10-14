import { SideNavItems, SideNavSection } from '@modules/navigation/models';

export const sideNavSections: SideNavSection[] = [
    // {
    //     text: 'CORE',
    //     items: ['dashboard'],
    // },
    // {
    //     text: 'INTERFACE',
    //     items: ['layouts', 'pages'],
    // },
    // {
    //     text: 'ADDONS',
    //     items: ['charts', 'tables', 'config'],
    // },

    // {
    //     text: '',
    //     items: ['Utilisateurs', 'Profiles', 'Clients', 'Chauffeurs'],
    // },
    // {
    //     text: '',
    //     items: ['Bus', 'Billets', 'Axes', 'Fdr'],
    // },
    // {
    //     text: '',
    //     items: ['Agences', 'Villes', 'Quartiers'],
    // },

    {
        items: [
            'Accueil',
            'Billets',
            'Clients',
            'Fdr',
            'Configurations',
        ],

    },

    // {
    //     text: 'Configurations',
    //     items: [
    //         'Agences',
    //         'Axes',
    //         'Bus',
    //         'Chauffeurs',
    //         'Profiles',
    //         'Quartiers',
    //         'Villes',
    //         'Utilisateurs',
    //             ],
    // },
];

export const sideNavItems: SideNavItems = {
    // dashboard: {
    //     icon: 'tachometer-alt',
    //     text: 'Dashboard',
    //     link: '/dashboard',
    // },    
    // layouts: {
    //     icon: 'columns',
    //     text: 'Layouts',
    //     submenu: [
    //         {
    //             text: 'Static Navigation',
    //             link: '/dashboard/static',
    //         },
    //         {
    //             text: 'Light Sidenav',
    //             link: '/dashboard/light',
    //         },
    //     ],
    // },
    // pages: {
    //     icon: 'book-open',
    //     text: 'Pages',
    //     submenu: [
    //         {
    //             text: 'Authentication',
    //             submenu: [
    //                 {
    //                     text: 'Login',
    //                     link: '/auth/login',
    //                 },
    //                 {
    //                     text: 'Register',
    //                     link: '/auth/register',
    //                 },
    //                 {
    //                     text: 'Forgot Password',
    //                     link: '/auth/forgot-password',
    //                 },
    //             ],
    //         },
    //         {
    //             text: 'Error',
    //             submenu: [
    //                 {
    //                     text: '401 Page',
    //                     link: '/error/401',
    //                 },
    //                 {
    //                     text: '404 Page',
    //                     link: '/error/404',
    //                 },
    //                 {
    //                     text: '500 Page',
    //                     link: '/error/500',
    //                 },
    //             ],
    //         },
    //     ],
    // },
    // charts: {
    //     icon: 'chart-area',
    //     text: 'Charts',
    //     link: '/charts',
    // },
    // tables: {
    //     icon: 'table',
    //     text: 'Tables',
    //     link: '/tables',
    // },
    Configurations: {
        icon: 'columns',
        text: 'Configuration',
        submenu: [
            {
                text: 'Utilisateurs',
                link: '/users',
                icon: 'user',
            },
            {
                icon: 'house-user',
                text: 'Agences',
                link: '/agences',
            },
            {
                text: 'Axes',
                icon: 'road',
                link: '/axes',
            },
            {
                text: 'Bus',
                link: '/bus',
                icon: 'bus',
            },
            {
                icon: 'user-tie',
                text: 'Chauffeurs',
                link: '/chauffeurs',
            },
            {
                icon: 'id-badge',
                text: 'Profiles',
                link: '/profiles',
            },
            {
                text: 'Quartiers',
                link: '/quartiers',
                icon: 'building',
            },
            {
                text: 'Villes',
                link: '/villes',
                icon: 'city',
                
            },
            {
                text: 'Escales',
                link: '/escales',
                icon: 'city',
                
            },
        ],
    },


    Utilisateurs: {
        icon: 'user',
        text: 'Utilisateurs',
        link: '/users',
    },
    Profiles: {
        icon: 'id-badge',
        text: 'Profiles',
        link: '/profiles',
    },

    Clients: {
        icon: 'users',
        text: 'Clients',
        link: '/clients',
    },
    Chauffeurs: {
        icon: 'user-tie',
        text: 'Chauffeurs',
        link: '/chauffeurs',
    },
    Agences: {
        icon: 'house-user',
        text: 'Agences',
        link: '/agences',
    },
    Axes: {
        icon: 'road',
        text: 'Axes',
        link: '/axes',
    },
   
    Fdr: {
        icon: 'newspaper',
        text: 'Feuille de route',
        link: '/fdr',
    }, 
    Bus: {
        icon: 'bus',
        text: 'Bus',
        link: '/bus',
    },
    Billets: {
        icon: 'memory',
        text: 'Billets',
        link: '/billets',
    },
    Villes: {
        icon: 'city',
        text: 'Villes',
        link: '/villes',
    },
    Quartiers: {
        icon: 'building',
        text: 'Quartiers',
        link: '/quartiers',
    },
    Accueil : {
        icon: 'tachometer-alt',
        text: 'Accueil',
        link: '/tableau',
    }
};
