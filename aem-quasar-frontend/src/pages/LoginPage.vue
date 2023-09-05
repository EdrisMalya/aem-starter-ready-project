<template>
    <div
        v-if="fullPageLoading"
        class="flex items-center justify-center h-screen"
    >
        <q-spinner color="primary" size="3rem" />
    </div>
    <div v-else>
        <div
            class="border p-12 shadow-lg max-w-2xl mx-auto min-h-[40vh] mt-20 md:mt-44"
        >
            <h3 class="text-3xl text-center">{{ $translate('Sign in') }}</h3>
            <ValidationForm
                :validation-schema="schema"
                @submit="onSubmit"
                class="py-4 flex flex-col"
            >
                <Field name="email" v-slot="{ errorMessage, value, field }">
                    <q-input
                        label="Email"
                        :model-value="value"
                        v-bind="field"
                        :error-message="errorMessage"
                        :error="!!errorMessage"
                        outlined
                        dense
                    />
                </Field>
                <Field name="password" v-slot="{ errorMessage, value, field }">
                    <q-input
                        outlined
                        bottom-slots
                        :model-value="value"
                        v-bind="field"
                        :error-message="errorMessage"
                        :error="!!errorMessage"
                        label="Password"
                        :type="showPassword ? 'text' : 'password'"
                        dense
                    >
                        <template v-slot:append>
                            <q-icon
                                :name="
                                    showPassword
                                        ? 'visibility'
                                        : 'visibility_off'
                                "
                                @click="onPasswordButtonClick"
                                class="cursor-pointer"
                            />
                        </template>
                    </q-input>
                </Field>

                <q-btn
                    class="mt-2"
                    color="primary"
                    :loading="loading"
                    type="submit"
                    icon-right="login"
                >
                    Login
                </q-btn>
            </ValidationForm>
        </div>
    </div>
</template>
<script>
import { computed, defineComponent, ref } from 'vue'
import { Form as ValidationForm, Field } from 'vee-validate'
import * as yup from 'yup'
import { useAuthStore } from 'stores/UserManagementStores/AuthStore'
import { useQuasar } from 'quasar'
import { errorHandler } from 'src/lib/errorHandler'
import { useRouter } from 'vue-router/dist/vue-router'

export default defineComponent({
    name: 'LoginPage',
    components: {
        ValidationForm,
        Field,
    },
    setup() {
        const authStore = useAuthStore()
        const q = useQuasar()
        const router = useRouter()
        const schema = yup.object({
            email: yup.string().required().default('This is for testt'),
            password: yup
                .string()
                .required()
                .min(6)
                .label('Password')
                .default('password@123'),
        })
        return {
            schema,
            q,
            router,
            authStore,
        }
    },
    data() {
        return {
            email: '',
            password: '',
            showPassword: false,
            loading: false,
            fullPageLoading: true,
        }
    },
    methods: {
        onPasswordButtonClick() {
            this.showPassword = !this.showPassword
        },
        async onSubmit(values, actions) {
            this.loading = true

            try {
                await this.authStore.getToken()
                const result = await this.authStore.login(
                    values?.email,
                    values?.password,
                )
                this.loading = false
                this.authStore.token = result.data
                localStorage.setItem('token', result.data)
                this.$q.notify({
                    message: 'Logged in successfully',
                    color: 'green',
                })
                this.router.push('/')
            } catch (e) {
                this.loading = false
                this.$q.notify({
                    message: 'Something went wrong',
                    color: 'red',
                })
                errorHandler(e, actions.setErrors)
            }
        },
    },
    async mounted() {
        try {
            await this.authStore.getLoggedInUse()
            this.router.push('/')
        } catch (e) {
            this.fullPageLoading = false
        }
    },
})
</script>
