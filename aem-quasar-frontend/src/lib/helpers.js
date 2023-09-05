export const resolve = (path, obj) => {
    return path.split('.').reduce(function (prev, curr) {
        return prev ? prev[curr] : null
    }, obj || self)
}
export const detectLanguage = text => {
    // Regular expressions to match Arabic and English characters
    const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/
    const englishRegex = /[A-Za-z]/

    let hasArabic = arabicRegex.test(text)
    let hasEnglish = englishRegex.test(text)

    if (hasArabic && !hasEnglish) {
        return 'rtl'
    } else if (!hasArabic && hasEnglish) {
        return 'ltr'
    } else if (hasArabic && hasEnglish) {
        return 'rtl'
    } else {
        return 'ltr'
    }
}
