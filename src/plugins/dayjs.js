import Vue from 'vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs/plugin/customParseFormat'

require('dayjs/locale/fr')
dayjs.locale('fr')
dayjs.extend(customParseFormat)
dayjs.extend(relativeTime)

Vue.use({
    install: (Vue, options) => {
        Vue.dayjs = dayjs
        window.dayjs = dayjs
        Object.defineProperties(Vue.prototype, {
            $dayjs: {
                get: () => dayjs
            },
            $date: {
                get: () => dayjs
            }
        })
    }
})