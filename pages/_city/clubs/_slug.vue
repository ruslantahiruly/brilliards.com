<template>
  <div>
    <section class="hero is-primary" :style="{ backgroundImage: backgroundImage }">
      <div class="hero-body is-flex is-align-items-center">
        <div class="container is-max-widescreen">
          <h1 class="title is-size-3-mobile is-size-2-tablet is-size-1-desktop"><span class="is-size-12-mobile is-size-11-tablet is-size-11-desktop has-text-grey-light has-text-weight-normal mb-6">Бильядрный клуб</span><br>{{ club.name }}</h1>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container is-max-widescreen">
        <div class="columns is-variable is-0-mobile columns-reverse">
          <div class="column is-two-thirds">
            <section class="mb-6">
              <h2 class="title is-size-8-mobile is-size-8-tablet is-size-7-desktop has-text-weight-light has-text-left pb-4">Виды бильярда</h2>
              <b-table :data="games" :columns="gamesColumns" :mobile-cards=false></b-table>
            </section>
            <section class="mb-6">
              <h2 class="title is-size-8-mobile is-size-8-tablet is-size-7-desktop has-text-weight-light has-text-left pb-4">Фото</h2>
              <b-carousel-list
                :data="photos"
                :arrow=true
                :arrow-hover=true
                :items-to-show=1
                :items-to-list=1
                :repeat=true
                :has-drag=true
                :has-grayscale=false
                :has-opacity=false
              />
            </section>
            <section class="mb-6">
              <h2 class="title is-size-8-mobile is-size-8-tablet is-size-7-desktop has-text-weight-light has-text-left pb-4">Удобства и услуги</h2>
              <div class="columns  is-variable is-0-mobile is-mobile is-multiline">
                <div v-if="club.wifi" class="column is-half-mobile is-one-quarter-tablet is-one-fifth-desktop has-text-centered">
                  <div>
                    <b-icon pack="fas" icon="wifi" type="is-info" size="is-medium"></b-icon>
                  </div>
                  <div class="is-size-13-mobile is-size-13-tablet is-size-13-desktop mt-2 has-text-black">Бесплатный Wi-Fi</div>
                </div>
                <div v-if="club.sports_broadcasts" class="column is-half-mobile is-one-quarter-tablet is-one-fifth-desktop has-text-centered">
                  <div>
                    <b-icon pack="fas" icon="tv" type="is-info" size="is-medium"></b-icon>
                  </div>
                  <div class="is-size-13-mobile is-size-13-tablet is-size-13-desktop mt-2 has-text-black">Спортивные трансляции</div>
                </div>
                <div v-if="club.kitchen" class="column is-half-mobile is-one-quarter-tablet is-one-fifth-desktop has-text-centered">
                  <div>
                    <b-icon pack="fas" icon="utensils" type="is-info" size="is-medium"></b-icon>
                  </div>
                  <div class="is-size-13-mobile is-size-13-tablet is-size-13-desktop mt-2 has-text-black">Кухня</div>
                </div>
                <div v-if="club.barroom" class="column is-half-mobile is-one-quarter-tablet is-one-fifth-desktop has-text-centered">
                  <div>
                    <b-icon pack="fas" icon="glass-whiskey" type="is-info" size="is-medium"></b-icon>
                  </div>
                  <div class="is-size-13-mobile is-size-13-tablet is-size-13-desktop mt-2 has-text-black">Бар</div>
                </div>
                <div v-if="club.vip_hall" class="column is-half-mobile is-one-quarter-tablet is-one-fifth-desktop has-text-centered">
                  <div>
                    <b-icon pack="fas" icon="user-shield" type="is-info" size="is-medium"></b-icon>
                  </div>
                  <div class="is-size-13-mobile is-size-13-tablet is-size-13-desktop mt-2 has-text-black">VIP-зал</div>
                </div>
                <div v-if="club.smoking_room" class="column is-half-mobile is-one-quarter-tablet is-one-fifth-desktop has-text-centered">
                  <div>
                    <b-icon pack="fas" icon="smoking" type="is-info" size="is-medium"></b-icon>
                  </div>
                  <div class="is-size-13-mobile is-size-13-tablet is-size-13-desktop mt-2 has-text-black">Места для курения</div>
                </div>
                <div v-if="club.air_conditioning" class="column is-half-mobile is-one-quarter-tablet is-one-fifth-desktop has-text-centered">
                  <div>
                    <b-icon pack="fas" icon="fan" type="is-info" size="is-medium"></b-icon>
                  </div>
                  <div class="is-size-13-mobile is-size-13-tablet is-size-13-desktop mt-2 has-text-black">Кондиционер</div>
                </div>
                <div v-if="club.wc" class="column is-half-mobile is-one-quarter-tablet is-one-fifth-desktop has-text-centered">
                  <div>
                    <b-icon pack="fas" icon="restroom" type="is-info" size="is-medium"></b-icon>
                  </div>
                  <div class="is-size-13-mobile is-size-13-tablet is-size-13-desktop mt-2 has-text-black">Туалет</div>
                </div>
                <div v-if="club.parking" class="column is-half-mobile is-one-quarter-tablet is-one-fifth-desktop has-text-centered">
                  <div>
                    <b-icon pack="fas" icon="parking" type="is-info" size="is-medium"></b-icon>
                  </div>
                  <div class="is-size-13-mobile is-size-13-tablet is-size-13-desktop mt-2 has-text-black">Парковка</div>
                </div>
                <div v-if="club.wardrobe" class="column is-half-mobile is-one-quarter-tablet is-one-fifth-desktop has-text-centered">
                  <div>
                    <b-icon pack="fas" icon="hat-cowboy" type="is-info" size="is-medium"></b-icon>
                  </div>
                  <div class="is-size-13-mobile is-size-13-tablet is-size-13-desktop mt-2 has-text-black">Гардероб</div>
                </div>
              </div>
            </section>
          </div>
          <div class="column">
            <section class="box is-shadowless pt-3">
              <h2 class="title is-size-8-mobile is-size-8-tablet is-size-7-desktop has-text-weight-light has-text-left-mobile has-text-centered mb-4 pb-3">Контакты</h2>
              <div class="media">
                <div class="media-left mr-2">
                  <b-icon pack="fas" icon="map-marker-alt" type="is-info" class="mt-1"></b-icon>
                </div>
                <div class="media-content">
                  <div class="is-size-11-mobile is-size-11-tablet is-size-9-desktop has-text-weight-light mb-2">Адрес</div>
                  <div class="is-size-12-mobile is-size-12-tablet is-size-12-desktop has-text-weight-light">{{ club.address }}</div>
                </div>
              </div>
              <div class="media">
                <div class="media-left mr-2">
                  <b-icon pack="fas" icon="phone-alt" type="is-info" class="mt-1"></b-icon>
                </div>
                <div class="media-content">
                  <div class="is-size-11-mobile is-size-11-tablet is-size-9-desktop has-text-weight-light mb-2">Телефон</div>
                  <div class="is-size-12-mobile is-size-12-tablet is-size-12-desktop has-text-weight-light">{{ club.phone }}</div>
                </div>
              </div>
              <div class="media">
                <div class="media-left mr-2">
                  <b-icon pack="fas" icon="clock" type="is-info" class="mt-1"></b-icon>
                </div>
                <div class="media-content">
                  <div class="is-size-11-mobile is-size-11-tablet is-size-9-desktop has-text-weight-light mb-2">Время работы</div>
                  <div class="is-size-12-mobile is-size-12-tablet is-size-12-desktop has-text-weight-light">
                    Сегодня с {{ thisDay.openingTime }} до {{ thisDay.closingTime }}
                  </div>
                </div>
              </div>
              <div class="media">
                <div class="columns">
                  <div class="column" v-for="social in socials" :key="social.id">
                    <template v-if="social.name === 'IN'">
                      <a :href="social.address" title="Instagram" rel="nofollow" target="_blank">
                        <b-icon pack="fab" icon="instagram" type="is-info" size="is-medium"></b-icon>
                      </a>
                    </template>
                    <template v-if="social.name === 'VK'">
                      <a :href="social.address" title="Вконтакте" rel="nofollow" target="_blank">
                        <b-icon pack="fab" icon="vk" type="is-info" size="is-medium"></b-icon>
                      </a>
                    </template>
                    <template v-if="social.name === 'FB'">
                      <a :href="social.address" title="Facebook" rel="nofollow" target="_blank">
                        <b-icon pack="fab" icon="facebook-f" type="is-info" size="is-medium"></b-icon>
                      </a>
                    </template>
                    <template v-if="social.name === 'OK'">
                      <a :href="social.address" title="Одноклассники" rel="nofollow" target="_blank">
                        <b-icon pack="fab" icon="odnoklassniki" type="is-info" size="is-medium"></b-icon>
                      </a>
                    </template>
                  </div>
                  <div class="column" v-if="club.website">
                    <a :href="club.website" title="Официальный сайт" rel="nofollow" target="_blank">
                      <b-icon pack="fas" icon="globe" type="is-info" size="is-medium"></b-icon>
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: `Бильярдный клуб ${this.club.name} – ${this.currentCity.name} – Brilliards`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Бильярдный клуб ${this.club.name}: фото, телефон, адрес, часы работы, цена часа игры, удобства и услуги.`
        }
      ],
    };
  },
  data() {
    return {
      gamesColumns: [
        {
          field: 'Game',
          label: 'Игра',
        },
        {
          field: 'Hall',
          label: 'Зал',
        },
        {
          field: 'Quantity',
          label: 'Количество столов',
        },
        {
          field: 'Size',
          label: 'Размер столов',
        },
      ],
      activeTab: 0,
    };
  },
  async asyncData({ $axios, params }) {
    try {
      let club = await $axios.$get(`/clubs/${params.slug}/?city=${params.city}`);

      return { club };
    } catch(e) {
      return { club: [] };
    }
  },
  async fetch() {
    if (this.$store.getters['cities/cities'].length === 0) {
      await this.$store.dispatch('cities/fetchCities');
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
    games() {
      let games = [];

      for (let i = 0; i < this.club.halls.length; i++) {
        let hall = this.club.halls[i];
        let hallName = this.club.halls[i].name;

        for (let j = 0; j < hall.games.length; j++) {
          let game = hall.games[j];
          let gameName = hall.games[j].name;
          let tablesQuantity = game.tables.length;
          let tablesSize = game.tables[0].size;
          let gamesRow = {
            'Game': gameName,
            'Hall': hallName,
            'Quantity': tablesQuantity,
            'Size': `${tablesSize} футов`,
          };

          games.push(gamesRow);
        }
      }

      return games;
    },
    photos() {
      if (this.club.photos.length) {
        let photos = [];

        for (let i = 0; i < this.club.photos.length; i++) {
          let photo = {
            image: this.club.photos[i].file,
          };

          photos.push(photo);
        }

        return photos;
      }
    },
    backgroundImage() {
      if (this.club.photos.length) {
        return `url('${this.club.photos[0].file}')`;
      } else {
        return `url('/img/background.jpg')`;
      }
    },
    thisDay() {
      let days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
      let day = new Date();
      let dayHours = day.getHours();
      let dayMinutes = day.getMinutes();
      let dayName = days[day.getDay()];

      for (let i = 0; i < this.club.working_times.length; i++) {
        let workingTime = this.club.working_times[i];

        if (workingTime.name == dayName) {
          let thisDay = i;
          let openingTime = this.club.working_times[thisDay].opening_time;
          let closingTime = this.club.working_times[thisDay].closing_time;

          return {
            openingTime,
            closingTime,
          };
        }
      }
    },
    socials() {
      if (this.club.social_networks.length) {
        let socials = [];

        for (let i = 0; i < this.club.social_networks.length; i++) {
          let social = {
            name: this.club.social_networks[i].name,
            address: this.club.social_networks[i].address,
          };

          socials.push(social);
        }

        return socials;
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.hero {
  height: 400px;
  background-position: 50%;
  background-size: cover;
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

.box {
  border: 1px solid $grey-lighter;
  border-radius: 4px;
  padding: 1rem;
  margin-top: -100px;
}

.box .title,
.section .title {
  border-bottom: 1px solid $grey-lighter;
}

@include mobile {
  .hero {
    height: 250px;
  }

  .box {
    border: 0;
    border-bottom: 1px solid $grey-lighter;
    padding: 1rem;
    margin-top: 0;
  }

  .column section {
    padding: 1rem;
    border-bottom: 1px solid $grey-lighter;
  }
}

@include tablet-only {
  .hero {
    height: 300px;
  }
}
</style>