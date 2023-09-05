<template>
    <q-list padding>
        <SidebarLink
            icon="dashboard"
            :name="$translate('Dashboard')"
            to="/"
            :active="generalStore.active_page === 'home'"
        />
        <protected-component permission-key="user-management-access">
            <SidebarLink
                icon="people"
                :name="$translate('User management')"
                to="/user-management"
                :active="generalStore.active_page === 'user-management'"
            />
        </protected-component>
        <protected-component permission-key="configurations-access">
            <SidebarLink
                icon="settings"
                :name="$translate('Configurations')"
                to="/configurations"
                :active="generalStore.active_page === 'configurations'"
            />
        </protected-component>
    </q-list>
</template>
<script>
import { defineComponent } from 'vue'
import { useGeneralStore } from 'stores/generalStore'
import SidebarLink from 'components/SidebarLink.vue'
import ProtectedComponent from 'components/ProtectedComponent.vue'

export default defineComponent({
    name: 'SidebarLinks',
    components: { ProtectedComponent, SidebarLink },
    setup() {
        const generalStore = useGeneralStore()
        return {
            generalStore,
        }
    },
})
</script>
