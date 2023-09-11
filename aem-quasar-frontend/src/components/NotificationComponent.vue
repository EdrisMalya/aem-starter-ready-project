<template>
    <div class="relative">
        <div
            class="w-5 h-5 bg-red-500 text-[10px] flex items-center justify-center absolute right-4 top-[1.7px] z-50 truncate rounded-full"
        >
            {{
                notificationStore.notifications.length > 10
                    ? '+10'
                    : notificationStore.notifications.length
            }}
        </div>
        <q-btn-dropdown icon="notifications" push round size="sm">
            <protected-component
                v-for="notification in notificationStore.notifications"
                :key="notification.id"
                :for-all="notification.permissions === 'for-all'"
                :permission-key="notification.permissions"
            >
                <q-list>
                    <q-item
                        clickable
                        v-close-popup
                        @click="handleClick(notification)"
                    >
                        <q-item-section avatar>
                            <q-avatar
                                size="md"
                                :icon="getIcons(notification.model)"
                                color="primary"
                                text-color="white"
                            />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{
                                notification.message
                            }}</q-item-label>
                            <q-item-label caption>{{
                                dayjs(notification.created_at).format(
                                    'MMMM DD, YYYY',
                                )
                            }}</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </protected-component>
        </q-btn-dropdown>
    </div>
</template>
<script>
import { defineComponent } from 'vue'
import { useNotificationsStore } from 'stores/notificationStore'
import dayjs from 'dayjs'
import { useGeneralStore } from 'stores/generalStore'
import ProtectedComponent from 'components/ProtectedComponent.vue'

export default defineComponent({
    name: 'NotificationComponent',
    components: { ProtectedComponent },
    setup() {
        const notificationStore = useNotificationsStore()
        notificationStore.fetchNotifications()
        const generalStore = useGeneralStore()
        return {
            notificationStore,
            dayjs,
            generalStore,
        }
    },
    methods: {
        getIcons(model) {
            switch (model) {
                case 'BackupHistory':
                    return 'settings_backup_restore'
            }
        },
        async handleClick(notification) {
            this.notificationStore.removeNotification(notification.id)
            await this.$router.push({ path: '/configurations/backups' })
            this.generalStore.setUpdateId(notification.subject_id)
        },
    },
})
</script>
