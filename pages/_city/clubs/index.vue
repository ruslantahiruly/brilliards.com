<template>
  <div>
    <section class="section">
      <div class="container is-max-widescreen">
        <h1 class="title is-size-6-mobile is-size-6-tablet is-size-5-desktop has-text-weight-medium has-text-centered mb-6">Бильярдные клубы {{ofCurrentCity}}</h1>
        <div class="columns is-multiline is-variable is-0-mobile">
          <ClubCard
            v-for="club in clubs"
            :key="club.id"
            :club="club"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: `Бильярдные клубы ${this.ofCurrentCity} – Brilliards`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Бильярдные клубы ${this.ofCurrentCity}: контактная информация, цены, виды бильярда, столы, кии, турниры, обучение, дополнительные услуги.`
        },
      ],
    };
  },
  async fetch() {
    if (this.$store.getters['cities/cities'].length === 0) {
      await this.$store.dispatch('cities/fetchCities');
    }
    
    if (this.$store.getters['clubs/clubs'].length === 0) {
      await this.$store.dispatch('clubs/fetchClubs', this.$route.params.city);
    }
  },
  computed: {
    currentCity() {
      return this.$store.getters.currentCity;
    },
    ofCurrentCity() {
      return this.$store.getters.ofCurrentCity;
    },
    cities() {
      return this.$store.getters['cities/cities'];
    },
    clubs() {
      return this.$store.getters['clubs/clubs'];
    }
  },
}
</script>