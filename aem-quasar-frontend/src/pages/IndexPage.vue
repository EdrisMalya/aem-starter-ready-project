<template>
    <protected-component for-all>
        <q-page>
            <div class="p-5">
                <div
                    class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
                >
                    <div
                        class="p-8 shadow-lg rounded-lg bg-white text-center"
                        v-for="item in dashboardBoxNumber"
                        :key="item"
                    >
                        <p class="text-lg">Box</p>
                        {{ item }}
                    </div>
                </div>
                <div class="grid grid-cols-8 gap-6 mt-6">
                    <div
                        class="col-span-12 md:col-span-5 bg-white p-8 rounded-lg shadow-lg"
                    >
                        <p class="text-lg font-semibold">
                            Some important chart
                        </p>
                        <DashboardLineChart />
                    </div>
                    <div
                        class="col-span-12 md:col-span-3 bg-white p-8 rounded-lg shadow-lg"
                    >
                        <DashboardPieChart />
                    </div>
                </div>
            </div>
        </q-page>
    </protected-component>
</template>

<script>
import { defineComponent } from 'vue'
import { useGeneralStore } from 'stores/generalStore'
import DashboardPieChart from 'components/DashbordPieChart.vue'
import DashboardLineChart from 'components/DashboardLineChart.vue'
import ProtectedComponent from 'components/ProtectedComponent.vue'
import { useLanguageStore } from 'stores/languageStore'

export default defineComponent({
    name: 'IndexPage',
    components: { ProtectedComponent, DashboardLineChart, DashboardPieChart },
    setup() {
        const generalStore = useGeneralStore()
        const { translate } = useLanguageStore()
        return {
            generalStore,
            translate,
        }
    },
    data() {
        return {
            dashboardBoxNumber: [1, 2, 3, 4, 5, 6],
        }
    },
    mounted() {
        this.generalStore.setActivePage('home')
        this.generalStore.setPageTitle('Home page')
    },
})
</script>
