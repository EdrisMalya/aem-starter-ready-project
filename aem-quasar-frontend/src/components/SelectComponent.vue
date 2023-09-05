<template>
    <div v-if="!data && !error" class="flex items-center justify-center">
        <q-spinner size="2rem" color="primary" />
    </div>
    <p class="text-red-600 text-center text-sm" v-else-if="error">
        Something went wrong
    </p>
    <div v-else>
        <q-select
            outlined
            dense
            use-input
            v-model="value"
            :options="options"
            :label="label"
            :multiple="multiple"
            @filter="filterFn"
            use-chips
            options-dense
            :error="!!errorMessage"
            :error-message="errorMessage"
        />
    </div>
</template>
<script>
import { defineComponent } from 'vue'
import useSWRV from 'swrv'
import { api } from 'boot/axios'
import { errorHandler } from 'src/lib/errorHandler'

export default defineComponent({
    name: 'SelectComponent',
    props: [
        'url',
        'multiple',
        'defaultValue',
        'onChange',
        'label',
        'errorMessage',
    ],
    setup(props) {
        const fetcher = url =>
            api
                .get(url)
                .then(res => res.data)
                .catch(err => errorHandler(err))
        const { data, error } = useSWRV(props.url, fetcher)

        return {
            data,
            error,
        }
    },
    data() {
        return {
            value: this.multiple
                ? this.defaultValue || []
                : this.defaultValue || null,
            options: [],
        }
    },
    methods: {
        filterFn(val, update) {
            if (val === '') {
                update(() => {
                    this.options =
                        this.data.data?.map(item => ({
                            ...item,
                            label: item.name,
                            value: item.id,
                        })) || []
                })
            } else {
                const newValue = val.toLowerCase()
                const filteredOptions =
                    this.data.data?.filter(item =>
                        item.name.toLowerCase().includes(newValue),
                    ) || []
                update(() => {
                    this.options = filteredOptions.map(item => ({
                        ...item,
                        label: item.name,
                        value: item.id,
                    }))
                })
            }
        },
    },
    watch: {
        data(newValue) {
            if (newValue) {
                this.options = newValue.data?.map(item => ({
                    ...item,
                    label: item.name,
                    value: item.id,
                }))
            }
        },
        value(newValue) {
            if (typeof this.onChange !== 'undefined') {
                this.onChange(newValue)
            }
        },
    },
})
</script>
