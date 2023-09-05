<template>
    <protected-component permission-key="languages-accss" is-page>
        <div class="flex items-center justify-between">
            <h2 class="text-xl">{{ $translate('List of backups') }}</h2>
            <protected-component permission-key="backup-run-backup">
                <q-btn :loading="loading" color="primary" @click="runBackup">
                    <template v-slot:loading>
                        <q-spinner-facebook />
                    </template>
                    {{ $translate('Run Backup') }}
                </q-btn>
            </protected-component>
        </div>
        <datatable-component
            :url="appRoutes.configurations.backup.index_api"
            table-name="backup_table"
            :datatable-actions="[
                {
                    icon: 'download',
                    tooltip: 'View options',
                    show_on_select: true,
                    permission_key: 'backup-download-backup',
                    onClick: data => {
                        downloadBackup(data.path)
                    },
                },
            ]"
            :columns="[
                {
                    name: 'id',
                    label: 'ID',
                },
                {
                    name: 'user',
                    label: 'Backup by',
                },
                {
                    name: 'name',
                    label: 'Backup name',
                },
                {
                    name: 'path',
                    label: 'Path',
                },
                {
                    name: 'size',
                    label: 'Size',
                },
                {
                    name: 'created_at',
                    label: 'Backup created at',
                },
            ]"
        />
    </protected-component>
</template>
<script>
import { defineComponent } from 'vue'
import { api } from 'boot/axios'
import { appRoutes } from 'src/appRouter/routes'
import DatatableComponent from 'components/DatatableComponent.vue'
import ProtectedComponent from 'components/ProtectedComponent.vue'

export default defineComponent({
    name: 'BackupsPage',
    components: { ProtectedComponent, DatatableComponent },
    setup() {
        return {
            appRoutes,
        }
    },
    data() {
        return {
            loading: false,
        }
    },
    methods: {
        async runBackup() {
            this.loading = true
            try {
                const result = await api.get(
                    this.appRoutes.configurations.backup.api,
                )
                if (result.data.result) {
                    this.$q.notify({
                        message: result.data.message,
                        color: 'green',
                    })
                }
            } catch (err) {
                this.$q.notify({
                    message: 'Something went wrong',
                    color: 'red',
                })
            } finally {
                this.loading = false
            }
        },
        downloadBackup(path) {
            window.open(path, '_blank')
        },
    },
    mounted() {
        this.$generalStore.setActivePage('user-management')
        this.$generalStore.setPageTitle('Backup')
    },
})
</script>
