<template>
    <q-btn-dropdown
        :model-value="dropdown"
        dropdown-icon="settings"
        size="sm"
        push
    >
        <q-list>
            <q-item clickable @click="changeSystemDatabase('current')">
                <q-item-section avatar>
                    <q-avatar
                        size="lg"
                        icon="refresh"
                        color="primary"
                        text-color="white"
                    />
                </q-item-section>
                <q-item-section>
                    <q-item-label>{{
                        $translate('Current system')
                    }}</q-item-label>
                </q-item-section>
            </q-item>
            <q-item
                v-for="backup in data"
                :key="backup"
                class="flex items-center"
                :active="backup === data.current_db"
            >
                <q-item-section
                    class="cursor-pointer"
                    avatar
                    @click="changeSystemDatabase(backup)"
                >
                    <q-avatar
                        size="lg"
                        icon="refresh"
                        color="primary"
                        text-color="white"
                    />
                </q-item-section>
                <q-item-section>
                    <q-item-label>{{ backup }}</q-item-label>
                </q-item-section>
                <q-item-section align="right">
                    <div class="flex-1">
                        <q-btn
                            @click="deleteBackup(backup)"
                            icon="delete"
                            size="sm"
                            color="red"
                            round
                        />
                    </div>
                </q-item-section>
            </q-item>
        </q-list>
    </q-btn-dropdown>
</template>
<script>
import { defineComponent, ref, watch } from 'vue'
import { api } from 'boot/axios'
import { appRoutes } from 'src/appRouter/routes'
import { useGeneralStore } from 'stores/generalStore'

export default defineComponent({
    name: 'dbSelectorComponent',
    setup() {
        const generalStore = useGeneralStore()
        const data = ref([])
        const fetcher = () => {
            api.get(appRoutes.configurations.backup.backup_list_api).then(
                res => {
                    data.value = res.data.backups
                },
                generalStore.setNewUpdatedPushed(false),
            )
        }
        watch(
            () => generalStore.newUpdatePushed,
            () => {
                fetcher()
            },
        )
        fetcher()
        return {
            data,
        }
    },
    data() {
        return {
            dropdown: false,
        }
    },
    methods: {
        changeSystemDatabase(db) {
            this.$q
                .dialog({
                    title: this.$translate('Confirm'),
                    message: this.$translate(
                        'Do you want to change your system database. When you change it no one will be able to perform (INSERT, DELETE)',
                    ),
                    cancel: true,
                })
                .onOk(() => {
                    this.dropdown = false
                    this.$q.loading.show({
                        message: this.$translate(
                            'Some important process is running',
                        ),
                    })
                    try {
                        api.post(
                            appRoutes.configurations.backup.change_backup,
                            {
                                db,
                            },
                        )
                    } catch (e) {
                    } finally {
                        this.$q.loading.hide()
                        this.$q.notify({
                            message: 'Succeed',
                            color: 'green',
                        })
                    }
                })
        },
        deleteBackup(db) {
            this.$q
                .dialog({
                    title: this.$translate('Confirm'),
                    message: this.$translate('Are you sure you want to delete'),
                    cancel: true,
                })
                .onOk(async () => {
                    this.$q.loading.show()
                    try {
                        api.delete(
                            appRoutes.configurations.backup.index_api +
                                '/' +
                                db,
                        )
                        this.$q.notify({
                            message: this.$translate('Deleted successfully'),
                            color: 'green',
                        })
                        this.$generalStore.setNewUpdatedPushed(true)
                    } catch (err) {
                    } finally {
                        this.$q.loading.hide()
                    }
                })
        },
    },
})
</script>
