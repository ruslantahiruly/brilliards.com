import Vue from 'vue';
import { ConfigProgrammatic, Navbar, Button, Carousel, Image, Table, Icon, Modal, Tabs, Tooltip, } from 'buefy';
Vue.use(Navbar);
Vue.use(Button);
Vue.use(Carousel);
Vue.use(Image);
Vue.use(Table);
Vue.use(Icon);
Vue.use(Modal);
Vue.use(Tabs);
Vue.use(Tooltip);
ConfigProgrammatic.setOptions({
  materialDesignIcons: false,
  defaultIconPack: 'fas',
  defaultIconComponent: 'font-awesome-icon',
})