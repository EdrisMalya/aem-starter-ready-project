<template>
    <q-dialog :model-value="model" persistent>
        <q-card class="min-w-[500px]">
            <q-card-section>
                <p class="font-semibold text-lg">Role Form</p>
            </q-card-section>
            <ValidationFrom :validation-schema="schema" @submit="onSubmit">
                <q-card-section>
                    <Field
                        name="word"
                        :value="language?.word"
                        v-slot="{ errorMessage, value, field }"
                    >
                        <q-input
                            :model-value="value"
                            dense
                            outlined
                            :error="!!errorMessage"
                            :error-message="errorMessage"
                            v-bind="field"
                            label="Word"
                            autogrow
                            type="textarea"
                        >
                        </q-input>
                    </Field>
                    <Field
                        :value="language?.translation"
                        name="translation"
                        v-slot="{ errorMessage, value, field }"
                    >
                        <q-input
                            :model-value="value"
                            dense
                            outlined
                            :error="!!errorMessage"
                            :error-message="errorMessage"
                            v-bind="field"
                            label="Translation"
                            autogrow
                            type="textarea"
                            :dir="dir"
                            @keypress="event => checkDir(event.target)"
                        />
                    </Field>
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn
                        dense
                        outline
                        color="red"
                        icon-right="close"
                        type="button"
                        @click="handleLanguageWordFormModel(false, null)"
                    >
                        {{ $t('Close') }}
                    </q-btn>
                    <q-btn
                        dense
                        outline
                        color="green"
                        icon-right="save"
                        type="submit"
                        :loading="loading"
                    >
                        Save
                    </q-btn>
                </q-card-actions>
            </ValidationFrom>
        </q-card>
    </q-dialog>
</template>
<script>
import { defineComponent } from 'vue'
import { Form as ValidationFrom, Field } from 'vee-validate'
import * as yup from 'yup'
import { api } from 'boot/axios'
import { appRoutes } from 'src/appRouter/routes'
import { errorHandler } from 'src/lib/errorHandler'
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router'
import { useGeneralStore } from 'stores/generalStore'
import { detectLanguage } from 'src/lib/helpers'
import { useLanguageStore } from 'stores/languageStore'

export default defineComponent({
    components: { ValidationFrom, Field },
    name: 'LanguageDetailsFormModel',
    props: ['model', 'handleLanguageWordFormModel', 'mutate', 'language'],
    setup() {
        const schema = yup.object({
            word: yup.string().required(),
            translation: yup.string().required(),
        })
        const q = useQuasar()
        const route = useRoute()
        const generalStore = useGeneralStore()
        const languageStore = useLanguageStore()
        return {
            schema,
            q,
            route,
            generalStore,
            detectLanguage,
            languageStore,
        }
    },
    data() {
        return {
            loading: false,
            dir: 'ltr',
        }
    },
    methods: {
        async onSubmit(values, actions) {
            this.loading = true
            try {
                const url = this.language
                    ? appRoutes.configurations.languages.details.api +
                      '/' +
                      this.language.id
                    : appRoutes.configurations.languages.details.api
                const method = this.language ? 'PUT' : 'POST'
                const data = {
                    ...values,
                    language_id: this.route.params.id,
                    id: this.language ? this.language.id : 0,
                }
                const result = await api({
                    url,
                    method,
                    data,
                })

                if (result.data.result) {
                    this.generalStore.revalidate(this.mutate)
                    this.loading = false
                    this.q.notify({
                        message: result.data.message,
                        color: 'green',
                    })
                    this.handleLanguageWordFormModel(false, null)
                    this.languageStore.getLanguageDictionary()
                } else {
                    this.loading = false
                    this.q.notify({
                        message: result.data.message,
                        color: 'red',
                    })
                }
            } catch (e) {
                errorHandler(e, actions.setErrors)
                this.loading = false
            }
        },
        checkDir(value) {
            this.dir = this.detectLanguage(value.value)
        },
    },
})
</script>
