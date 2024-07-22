import { createApp } from '/plugins/vue3.4.33.js'
import App from '/scripts/app.js'
const app = createApp(App)
const customtags = ['ion-icon']

app.config.compilerOptions.isCustomElement = function (tag) {
    return customtags.includes(tag)
}
app.mount('#app')
