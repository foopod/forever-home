const API_ENDPOINT = import.meta.env.VITE_REACT_APP_API_ENDPOINT
const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT
const WS_ENDPOINT = import.meta.env.VITE_REACT_APP_WS_ENDPOINT

function isProduction() {
    return ENVIRONMENT === 'production'
}

console.log(API_ENDPOINT)

export { API_ENDPOINT, WS_ENDPOINT, isProduction }