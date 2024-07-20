const API_ENDPOINT = import.meta.env.VITE_REACT_APP_API_ENDPOINT
const ENVIRONMENT = import.meta.env.ENVIRONMENT

function isProduction() {
    console.log("We are in production")
    return ENVIRONMENT === 'production'
}

console.log(API_ENDPOINT)

export { API_ENDPOINT, isProduction }