export const state = () => ({
  clubs: [],
  indexClubs: [],
});

export const mutations = {
  setClubs(state, clubs) {
    state.clubs = clubs;
  },
  setIndexClubs(state, indexClubs) {
    state.indexClubs = indexClubs;
  },
};

export const actions = {
  async fetchClubs({commit}, params) {
    const clubs = await this.$axios.$get(`/card-clubs/?city=${params.city}&quantity=${params.quantity}`);
    commit('setClubs', clubs);
  },
  async fetchIndexClubs({commit}, params) {
    const indexClubs = await this.$axios.$get(`/card-clubs/?city=${params.city}&quantity=${params.quantity}`);
    commit('setIndexClubs', indexClubs);
  },
};

export const getters = {
  clubs: s => s.clubs,
  indexClubs: s => s.indexClubs,
};