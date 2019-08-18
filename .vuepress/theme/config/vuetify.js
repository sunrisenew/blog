import 'vuetify/dist/vuetify.min.css';
import Vuetify from 'vuetify';
import colors from 'vuetify/lib/util/colors';

const install = (Vue, options) => {
  Vue.use(Vuetify);
  options && (Object.assign(options, {
    vuetify: new Vuetify({
      theme: {
        themes: {
          light: {
            primary: colors.orange.base
          }
        }
      }
    })
  }));
};

export default {
  install
};
