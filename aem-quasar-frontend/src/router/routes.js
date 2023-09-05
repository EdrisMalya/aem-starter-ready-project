const routes = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', component: () => import('pages/IndexPage.vue') },
            {
                path: '/user-management',
                children: [
                    {
                        path: '',
                        component: () =>
                            import(
                                'pages/UserManagement/UserManagementIndex.vue'
                            ),
                    },
                    {
                        path: 'users',
                        children: [
                            {
                                path: '',
                                component: () =>
                                    import(
                                        'pages/UserManagement/Users/UserPage.vue'
                                    ),
                            },
                            {
                                path: ':id/:active',
                                component: () =>
                                    import(
                                        'pages/UserManagement/Users/UserDetails/UserDetailPage.vue'
                                    ),
                            },
                        ],
                    },
                    {
                        path: 'activity-log',
                        component: () =>
                            import(
                                'pages/UserManagement/ActivityLog/ActivityLogPage.vue'
                            ),
                    },
                    {
                        path: 'login-log',
                        component: () =>
                            import(
                                'pages/UserManagement/LoginLog/LoginLogPage.vue'
                            ),
                    },
                    {
                        path: 'roles',
                        children: [
                            {
                                path: '',
                                component: () =>
                                    import(
                                        'pages/UserManagement/Roles/RolePage.vue'
                                    ),
                            },
                            {
                                path: ':id/:name?',
                                component: () =>
                                    import(
                                        'pages/UserManagement/Roles/RoleDetails/RoleDetailsPage.vue'
                                    ),
                            },
                        ],
                    },
                    {
                        path: 'permissions',
                        component: () =>
                            import(
                                'pages/UserManagement/Permissions/PermissionsPage.vue'
                            ),
                    },
                ],
            },
            {
                component: () => import('layouts/ConfigurationsLayout.vue'),
                path: '/configurations',
                children: [
                    {
                        path: '',
                        component: () =>
                            import(
                                'pages/Configurations/ConfigurationsPage.vue'
                            ),
                        meta: {
                            breadcrumb: [
                                {
                                    text: 'Configurations',
                                    link: '',
                                },
                            ],
                            active: '',
                        },
                    },
                    {
                        path: 'languages',
                        children: [
                            {
                                path: '',
                                component: () =>
                                    import(
                                        'pages/Configurations/Languages/LanguagePage.vue'
                                    ),
                                meta: {
                                    active: 'languages',
                                    breadcrumb: [
                                        {
                                            text: 'Configurations',
                                            link: '/configurations',
                                        },
                                        {
                                            text: 'Languages',
                                            link: '/configurations/languages',
                                        },
                                    ],
                                },
                            },
                            {
                                path: ':id/:name',
                                component: () =>
                                    import(
                                        'pages/Configurations/Languages/LanguageDetails/LanguageDetailsPage.vue'
                                    ),
                                meta: {
                                    active: 'languages',
                                    breadcrumb: [
                                        {
                                            text: 'Configurations',
                                            link: '/configurations',
                                        },
                                        {
                                            text: 'Languages',
                                            link: '/configurations/languages',
                                        },
                                        {
                                            text: 'Language dictionary',
                                            link: '',
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                    {
                        path: 'backups',
                        children: [
                            {
                                path: '',
                                component: () =>
                                    import(
                                        'pages/Configurations/Backups/BackupsPage.vue'
                                    ),
                            },
                        ],
                        meta: {
                            breadcrumb: [
                                {
                                    text: 'Configurations',
                                    link: '/configurations',
                                },
                                {
                                    text: 'Backups',
                                    link: '/configurations/languages',
                                },
                            ],
                            active: 'backups',
                        },
                    },
                ],
            },
        ],
    },

    {
        path: '/login',
        component: () => import('pages/LoginPage.vue'),
    },
    {
        path: '/server-error',
        component: () => import('pages/ServerErrorPage.vue'),
    },
    {
        path: '/forbidden',
        component: () => import('pages/ForbiddenPage.vue'),
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
    },
]

export default routes
