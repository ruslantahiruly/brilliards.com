<template>
  <div class="column is-half-tablet is-one-third-desktop">
    <NuxtLink :to="`/${currentCity.url}/clubs/${club.slug}/`">
      <div class="card">
        <div class="card-image">
          <figure class="image is-16by9">
            <template v-if="club.photos.length">
              <img :src="`${club.photos[0].file}`">
            </template>
            <template v-else>
              <img src="/img/club.jpg">
            </template>
          </figure>
        </div>
        <div class="card-content">
          <h3 class="title is-size-8-mobile is-size-8-tablet is-size-9-desktop has-text-weight-light mb-2">{{ club.name }}</h3>
          <div class="content">
            <b-icon pack="fas" icon="map-marker-alt" type="is-primary"></b-icon>
            <span class="is-size-11-mobile is-size-11-tablet is-size-12-desktop has-text-weight-light">{{ club.address }}</span>
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  props: ['club'],
  computed: {
    currentCity() {
      return this.$store.getters.currentCity;
    },
  },
}
</script>

<style lang="scss" scoped>
.card:hover {
  box-shadow: 0 0.5em 1em -0.125em rgba($scheme-invert, 0.4), 0 0px 0 1px rgba($scheme-invert, 0.05);
}

@include mobile {
  .column {
    border-top: 1px solid $grey-lighter;
  }

  .column:last-child {
    border-bottom: 1px solid $grey-lighter;
  }

  .card {
    padding: 0 1rem;
    border-radius: 0;
    box-shadow: none;
  }

  .card-content {
    padding-left: 0;
    padding-right: 0;
  }

  .card img {
    border-radius: 5px;
  }

  .card:hover {
    box-shadow: none;
  }
}
</style>
