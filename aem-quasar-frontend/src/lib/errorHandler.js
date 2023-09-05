export const errorHandler = (error, setError, router) => {
    switch (error.response?.status) {
        case 422:
            const data = error.response.data?.errors
            const errors = {}
            for (const key in data) {
                // Check if the value of the key is an array
                if (Array.isArray(data[key])) {
                    // If it is an array, join the array elements into a string
                    errors[key] = data[key].join(' ')
                } else {
                    // If it is not an array, assign the value as it is
                    errors[key] = data[key]
                }
            }

            setError(errors)
            break
        case 401:
            console.log(router)
            router.push('/login')
            break
        case 403:
            window.location.href = '/#/forbidden'
            router.push('/forbidden')
            break
        default:
        /*router.push('/server-error')*/
    }
}
