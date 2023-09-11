import { defineStore } from 'pinia/dist/pinia'
import { api } from 'boot/axios'

export const useNotificationsStore = defineStore('NotificationStore', {
    state: () => ({
        notifications: [],
    }),
    actions: {
        async fetchNotifications() {
            try {
                const result = await api.get('notifications')
                this.notifications = result.data
            } catch (err) {}
        },
        setNotifications(notifications) {
            this.notifications = notifications
        },
        async removeNotification(id) {
            try {
                await api.delete('notifications/' + id)
                await this.fetchNotifications()
            } catch (err) {}
        },
    },
})
