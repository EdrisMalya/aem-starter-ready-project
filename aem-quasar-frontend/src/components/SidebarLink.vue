<template>
    <q-item :active="active" :to="to" clickable v-ripple>
        <q-item-section avatar>
            <q-icon :name="icon" />
        </q-item-section>
        <q-item-section class="-ml-4"> {{ name }} </q-item-section>
    </q-item>
</template>
<script>
import { defineComponent } from 'vue'
import { useGeneralStore } from 'stores/generalStore'

export default defineComponent({
    name: 'SidebarLink',
    props: ['active', 'name', 'icon', 'to'],
    setup() {
        const generalStore = useGeneralStore()
        return {
            generalStore,
        }
    },
})
</script>
