<template>
  <div>
    <section class="hero is-grey">
      <div class="hero-body is-flex is-align-items-center">
        <div class="container is-max-widescreen">
          <h1 class="title is-size-7-mobile is-size-5-tablet is-size-3-desktop has-text-white has-text-weight-light has-text-centered">Бильярдные клубы, школы бильярда и тренеры {{ ofCurrentCity }}</h1>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container is-max-widescreen">
        <h2 class="title is-size-7-mobile is-size-7-tablet is-size-6-desktop has-text-grey-dark has-text-weight-light has-text-centered has-text-left-mobile mb-5 px-4">Бильярдные клубы {{ ofCurrentCity }}</h2>
        <div class="columns is-multiline is-variable is-0-mobile">
          <ClubCard
            v-for="club in indexClubs"
            :key="club.id"
            :club="club" 
          />
        </div>
        <div class="has-text-centered mt-6">
          <b-button
            tag="NuxtLink"
            type="is-info"
            :to="`/${currentCity.url}/clubs/`"
            outlined
            class="is-size-13 has-text-weight-medium is-uppercase">
            <span>Все бильярдные клубы</span>
            <b-icon pack="fas" icon="angle-right" custom-class="fa-lg"></b-icon>
          </b-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  head() {
    return {
      title: 'Brilliards – бильярдные клубы, школы бильярда и тренеры России',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Бильярдные клубы, школы бильярда и тренеры России: контактная информация, цены, виды бильярда, столы, кии, турниры, обучение, дополнительные услуги.'
        },
      ],
    };
  },
  async fetch() {
    if (this.$store.getters['cities/cities'].length === 0) {
      await this.$store.dispatch('cities/fetchCities');
    }
    
    if (this.$store.getters['clubs/indexClubs'].length === 0) {
      await this.$store.dispatch('clubs/fetchIndexClubs', {
        city: this.currentCity.url,
        quantity: 3,
      });
    }
  },
  computed: {
    cities() {
      return this.$store.getters['cities/cities'];
    },
    indexClubs() {
      return this.$store.getters['clubs/indexClubs'];
    },
    currentCity() {
      return this.$store.getters.currentCity;
    },
    ofCurrentCity () {
      return this.$store.getters.ofCurrentCity;
    }
  },
}
</script>

<style lang="scss" scoped>
.hero {
  height: 400px;
  background-image: url('/img/background.jpg');
  background-position: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  background-color: rgba(0,0,0,.7);
}

@include mobile {
  .hero {
    height: 250px;
  }

  .title {
    line-height: 1.3;
  }
}

@include tablet-only {
  .hero {
    height: 300px;
  }
}
</style>