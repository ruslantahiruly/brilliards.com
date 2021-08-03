import { cityIn, cityFrom, cityTo } from 'lvovich';

export const state = () => ({
  currentCity: {},
});

export const mutations = {
  setCurrentCity(state, currentCity) {
    state.currentCity = currentCity;
  },
};

export const actions = {
  async nuxtServerInit({ commit }, { app, params }) {
    if (params.city) {
      const city = await this.$axios.$get(`/cities/${params.city}`);
      const currentCity = {
        name: city.name,
        url: city.url,
      };
      commit('setCurrentCity', currentCity);
    } else if (app.$cookies.get('city')) {
      const currentCity = {
        name: app.$cookies.get('city').name,
        url: app.$cookies.get('city').url,
      };
      commit('setCurrentCity', currentCity);
    } else {
      const currentCity = {
        name: 'Москва',
        url: 'moscow',
      };
      commit('setCurrentCity', currentCity);
    }
  },
};

export const getters = {
  currentCity: s => s.currentCity,
  ofCurrentCity: s => {
    const name = s.currentCity.name;
    return cityFrom(name);
  },
};