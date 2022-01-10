import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#A60000',
                secondary: '#66A3D2',
                error: '#b71c1c',
            },
        },
        options: {
            customProperties: true,
        },
    },
});
