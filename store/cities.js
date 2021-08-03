export const state = () => ({
  cities: [],
});

export const mutations = {
  setCities(state, cities) {
    state.cities = cities;
  },
};

export const actions = {
  async fetchCities({ commit }) {
    const cities = await this.$axios.$get(`/cities/`);
    commit('setCities', cities);
  },
};

export const getters = {
  cities: s => s.cities,
};