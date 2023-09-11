import { defineStore } from 'pinia'
import { useLanguageStore } from 'stores/languageStore'

export const useGeneralStore = defineStore('GeneralStore', {
    state: () => ({
        change_password: false,
        active_page: null,
        page_title: null,
        btn_loading: false,
        full_page_loading: false,
        table: null,
        revalidateServerData: null,
        filters: {
            model: false,
            options: {},
        },
        update_id: 0,
        event_message: null,
        newUpdatePushed: false,
    }),
    actions: {
        setActivePage(value) {
            this.active_page = value
        },
        setPageTitle(value) {
            const { translate } = useLanguageStore()
            this.page_title = translate(value)
        },
        setLoading(value, type = 'btn') {
            if (value) {
                if (type === 'btn') {
                    this.btn_loading = true
                } else {
                    this.full_page_loading = true
                }
            } else {
                this.btn_loading = false
                this.full_page_loading = false
            }
        },
        revalidate(table) {
            this.table = table
            this.revalidateServerData = table
        },
        setFilter(model, options) {
            this.filters = {
                model,
                options,
            }
        },
        setUpdateId(id) {
            this.update_id = id
        },
        setEventMessage(message) {
            this.event_message = message
        },
        setNewUpdatedPushed(status) {
            this.newUpdatePushed = status
        },
    },
})
