import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import axios from 'axios'

export const useAuthStore = defineStore('AuthStore', {
    state: () => ({
        token: null,
        user: null,
    }),
    actions: {
        async getToken() {
            await axios.get(
                process.env.END_POINT_URL.replace('/api', '') +
                    'sanctum/csrf-cookie',
            )
        },
        async login(email, password) {
            return await api.post('login', {
                email: email,
                password: password,
            })
        },
        async getLoggedInUse() {
            const result = await api.get('user')
            this.user = result.data.data
            return result
        },
        async changePassword(old_password, new_password, confirm_password) {
            return api.post('change-password', {
                old_password,
                new_password,
                confirm_password,
            })
        },
        async logout() {
            return api.post('logout')
        },
        isAllowed(permissionKey) {
            if (this.user.id === 1) {
                return true
            } else {
                return this.user.permissions.includes(permissionKey)
            }
        },
    },
})
