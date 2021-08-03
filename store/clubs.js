export const state = () => ({
  clubs: [],
});

export const mutations = {
  setClubs(state, clubs) {
    state.clubs = clubs;
  },
};

export const actions = {
  async fetchClubs({commit}, city) {
    const clubs = await this.$axios.$get(`/clubs/?city=${city}`);
    commit('setClubs', clubs);
  },
};

export const getters = {
  clubs: s => s.clubs,
  lastClubs: s => s.clubs.slice(Math.max(s.clubs.length - 3, 0)),
};