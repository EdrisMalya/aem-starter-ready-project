<template>
    <div v-if="!data && !error" class="flex items-center justify-center h-64">
        <q-spinner size="2rem" color="primary" />
    </div>
    <div v-else-if="error" class="text-center text-red-500 py-12">
        <span v-if="error?.response?.data?.message">{{
            error?.response?.data?.message
        }}</span>
        <span v-else> Something went wrong </span>
    </div>
    <div v-else>
        <p v-if="data?.length < 1" class="text-red-500 text-center py-12">
            No data found
        </p>
        <slot v-else :data="data" />
    </div>
</template>
<script>
import { defineComponent, ref, watch } from 'vue'
import useSWRV from 'swrv'
import { api } from 'boot/axios'
import { errorHandler } from 'src/lib/errorHandler'
import { useRouter } from 'vue-router'
import { useGeneralStore } from 'stores/generalStore'

export default defineComponent({
    name: 'ServerData',
    props: {
        url: {
            type: String,
            default: '',
        },
        fromResource: {
            type: Boolean,
            default: true,
        },
        id: {
            type: String,
            default: null,
        },
    },
    setup(prop) {
        const router = useRouter()
        const fetcher = url =>
            api
                .get(url)
                .then(res => (prop.fromResource ? res.data.data : res.data))
                .catch(err => errorHandler(err, '', router))
        const { data: serverData, error, mutate } = useSWRV(prop.url, fetcher)
        const generalStore = useGeneralStore()
        let data = ref(undefined)

        watch(
            () => generalStore.revalidateServerData,
            newValue => {
                if (newValue && newValue === prop.id) {
                    data.value = undefined
                    mutate().finally(() => {
                        generalStore.revalidate(null)
                    })
                }
            },
        )

        watch(serverData, newValue => {
            if (newValue) {
                data.value = newValue
            }
        })

        return {
            serverData,
            error,
            data,
        }
    },
    mounted() {
        if (this.serverData) {
            this.data = this.serverData
        }
    },
})
</script>
