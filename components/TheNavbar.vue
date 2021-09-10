<template>
  <b-navbar spaced shadow centered>
    <template slot="brand">
      <b-navbar-item tag="router-link" to="/" class="logo is-family-secondary is-size-8-mobile is-size-7-tablet is-size-6-desktop">
        <span class="has-text-primary is-size-6-mobile is-size-6-tablet is-size-5-desktop">B</span>rilliard<span class="has-text-info">s</span>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" :to="`/${currentCity.url}/clubs/`" class="is-size-9-mobile is-size-9-tablet is-size-11-desktop">
        Бильярдные клубы
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="`/${currentCity.url}/schools/`" class="is-size-9-mobile is-size-9-tablet is-size-11-desktop">
        Школы бильярда
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="`/${currentCity.url}/coaches/`" class="is-size-9-mobile is-size-9-tablet is-size-11-desktop">
        Тренеры
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item tag="div">
        <button class="button is-size-12 is-white has-text-grey has-text-weight-medium" type="button"
          @click="isModalActive = true">
          <template>
            <b-icon pack="fas" icon="location-arrow" custom-class="fa-sm"></b-icon>
            <span>{{ currentCity.name }}</span>
          </template>
        </button>
        <b-modal v-model="isModalActive" scroll="keep" :width="350">
          <div class="box">
            <h4 class="title is-size-11-mobile is-size-11-tablet is-size-9-desktop has-text-grey has-text-weight-medium p-3 mb-0">Выберите город</h4>
            <ul>
              <li @click.prevent="changeCity(city)" class="is-size-12-mobile is-size-12-tablet is-size-12-desktop p-1 pl-4" v-for="city in cities" :key="city.id">
                {{ city.name }}
              </li>
            </ul>
          </div>
        </b-modal>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      isModalActive: false,
    };
  },
  computed: {
    currentCity() {
      return this.$store.getters.currentCity;
    },
    cities() {
      return this.$store.getters['cities/cities'];
    },
  },
  methods: {
    changeCity(city) {
      const cityCookie = { name: city.name, url: city.url };
      this.$cookies.set('city', cityCookie, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });
      location.href = '/';
    },
  },
}
</script>

<style lang="scss" scoped>
.logo:hover {
  color: $grey-dark;
}

.box {
  padding: 0;
  padding-bottom: 2rem;
}

.box .title {
  border-bottom: 1px solid $grey-light;
}

.box li:hover {
  color: $grey-dark;
  background: $grey-lighter;
  cursor: pointer;
}

@include touch {
  .navbar-start .navbar-item {
    font-weight: 300;
  }
}

@include desktop {
  .navbar-start .navbar-item {
    font-weight: 500;
  }
}
</style>