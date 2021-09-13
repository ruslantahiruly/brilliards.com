import Vue from 'vue';
import VueGtag from 'vue-gtag';

export default ({ isDev }) => {
  if (!isDev) {
    Vue.use(VueGtag, {
      config: { id: 'UA-155180894-1' }
    });
  } else {
    console.log("Skipping GA in development");
  }
}