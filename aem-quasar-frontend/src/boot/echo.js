import { boot } from 'quasar/wrappers'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import axios from 'axios'

export default boot(({ app }) => {
    app.config.globalProperties.Pusher = Pusher
    app.config.globalProperties.$echo = new Echo({
        auth: {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        },
        authEndpoint: `${process.env.END_POINT_URL.replace(
            '/api',
            '',
        )}broadcasting/auth`,
        broadcaster: 'pusher',
        key: process.env.VITE_PUSHER_APP_KEY,
        wsHost: process.env.VITE_PUSHER_HOST,
        wsPort: process.env.VITE_PUSHER_PORT ?? 80,
        wssPort: process.env.VITE_PUSHER_PORT ?? 443,
        forceTLS: false,
        enabledTransports: ['ws', 'wss'],
        cluster: process.env.VITE_PUSHER_APP_CLUSTER,
        disableStats: true,
        encrypted: true,
    })
})
