export const appRoutes = {
    user_management: {
        users: {
            api: '/user-management/users',
            details: {
                path: '/user-management/users/:id/:active',
            },
        },
        activity_log: {
            api: {
                user_log: 'user-management/activity-log/user-log/:id',
                get_log: 'user-management/activity-log/:log',
                restore_log: 'user-management/activity-log/restore-log/:log',
                index: 'user-management/activity-log',
            },
        },
        login_log: {
            api: 'user-management/login-log',
        },
        roles: {
            api: '/user-management/roles',
            role_details: {
                path: '/user-management/roles/{id}/{name}',
                api: '/user-management/roles/{id}',
            },
        },
        permission: {
            api: '/user-management/permission',
            permission_group_api: '/user-management/permission-groups',
        },
    },
    configurations: {
        languages: {
            api: 'configurations/languages',
            details: {
                path: '/configurations/languages/:id/:name',
                api: 'configurations/language/words',
            },
        },
        backup: {
            api: 'configurations/backup/run',
            index_api: 'configurations/backup',
        },
    },
}
