import { boot } from 'quasar/wrappers'
import { useLanguageStore } from 'stores/languageStore'

const { translate } = useLanguageStore()
export default boot(({ app }) => {
    app.config.globalProperties.$translate = translate
})
