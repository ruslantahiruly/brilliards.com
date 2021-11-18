<template>
  <div>
    <section class="hero is-primary" :style="{ backgroundImage: backgroundImage }">
      <div class="hero-body is-flex is-align-items-center">
        <div class="container is-max-widescreen">
          <h1 class="title is-size-3-mobile is-size-2-tablet is-size-1-desktop"><span class="is-size-12-mobile is-size-11-tablet is-size-11-desktop has-text-grey-light has-text-weight-normal mb-6">Бильярдный клуб</span><br>{{ club.name }}</h1>
          <template v-if="club.is_open">
            <div :class="[thisDay.isOpened ? 'is-success' : 'is-danger']" class="button is-static is-size-13-mobile is-size-12-tablet is-size-12-desktop is-outlined is-rounded">
              <template v-if="thisDay.isOpened">
                <template v-if="thisDay.is24Hours">
                  Открыто круглосуточно
                </template>
                <template v-else>
                  Открыто до {{ thisDay.closingTime }}
                </template>
              </template>
              <template v-else>
                Откроется в {{ thisDay.openingTime }}
              </template>
            </div>
            <div v-if="club.is_pre_entry" class="mt-2">
              <div class="icon-text is-size-13-mobile is-size-12-tablet is-size-12-desktop">
                <b-icon pack="fas" icon="exclamation-triangle" type="is-warning" size="is-small"></b-icon>
                <span class="has-text-weight-light">Вход по предварительной записи</span>
              </div>
            </div>
            <div v-if="club.is_medical_masks" class="mt-2">
              <div class="icon-text is-size-13-mobile is-size-12-tablet is-size-12-desktop">
                <b-icon pack="fas" icon="exclamation-triangle" type="is-warning" size="is-small"></b-icon>
                <span class="has-text-weight-light">Вход только в медицинских масках</span>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="button is-static is-danger is-size-13-mobile is-size-12-tablet is-size-12-desktop is-outlined is-rounded">
              <b-icon pack="fas" icon="exclamation-triangle" type="is-danger" size="is-small" custom-size="sm"></b-icon>
              <span>Закрыто</span>
            </div>
          </template>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container is-max-widescreen">
        <div class="columns is-variable is-0-mobile columns-reverse">
          <div class="column is-two-thirds">
            <section class="mb-6">
              <h2 class="title is-size-8-mobile is-size-8-tablet is-size-7-desktop has-text-weight-light has-text-left pb-4">Виды бильярда</h2>
              <b-table :data="equipment.games" :columns="gamesColumns" :mobile-cards=false></b-table>
            </section>
            <section class="mb-6">
              <h2 class="title is-size-8-mobile is-size-8-tablet is-size-7-desktop has-text-weight-light has-text-left pb-4">Оборудование</h2>
              <b-tabs v-model="activeTab" size="is-medium">
                <b-tab-item label="Столы">
                  <b-table :data="equipment.tables" :columns="tablesColumns" :mobile-cards=false></b-table>
                </b-tab-item>
                <b-tab-item label="Шары">
                  <b-table :data="equipment.balls" :columns="ballsColumns" :mobile-cards=false></b-table>
                </b-tab-item>
                <b-tab-item label="Кии">
                  <b-table :data="equipment.cues" :columns="cuesColumns" :mobile-cards=false></b-table>
                </b-tab-item>
              </b-tabs>
            </section>
            <section class="mb-6">
              <h2 class="title is-size-8-mobile is-size-8-tablet is-size-7-desktop has-text-weight-light has-text-left pb-4">Акции</h2>
              <div class="columns">
                <Promotion
                  v-for="promotion in promotions"
                  :key="promotion.id"
                  :promotion="promotion"
                />
              </div>
            </section>
            <section class="mb-6">
              <h2 class="title is-size-8-mobile is-size-8-tablet is-size-7-desktop has-text-weight-light has-text-left pb-4">Способы оплаты</h2>
              <ul>
                <li v-for="payment in payments" :key="payment.id">
                  <template v-if="payment === 'Наличные'">
                    <span class="icon-text">
                      <b-icon pack="fas" icon="wallet" type="is-info" size="is-medium"></b-icon>
                      <span>{{ payment }}</span>
                    </span>
                  </template>
                  <template v-if="payment === 'Карты'">
                    <span class="icon-text">
                      <b-icon pack="fas" icon="credit-card" type="is-info" size="is-medium"></b-icon>
                      <span>{{ payment }}</span>
                    </span>
                  </template>
                </li>
              </ul>
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
              <div class="columns is-variable is-0-mobile is-mobile is-multiline">
                <div v-if="club.table_reservation" class="column is-half-mobile is-one-quarter-tablet is-one-fifth-desktop has-text-centered">
                  <div>
                    <b-icon pack="fas" icon="book-open" type="is-info" size="is-medium"></b-icon>
                  </div>
                  <div class="is-size-13-mobile is-size-13-tablet is-size-13-desktop mt-2 has-text-black">Бронирование столов</div>
                </div>
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
          <div class="sidebar column">
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
                  <b-tooltip position="is-bottom" type="is-light" :triggers="['click']" :auto-close="['outside', 'escape']">
                    <div class="is-size-12-mobile is-size-12-tablet is-size-12-desktop has-text-weight-light is-clickable">
                      <template v-if="thisDay.is24Hours">
                        <div class="icon-text">
                          <span>Круглосуточно</span>
                          <b-icon pack="fas" icon="chevron-down" type="is-info" size="is-small" custom-size="xs"></b-icon>
                        </div>
                      </template>
                      <template v-else>
                        <div class="icon-text">
                          <span>Сегодня с {{ thisDay.openingTime }} до {{ thisDay.closingTime }}</span>
                          <b-icon pack="fas" icon="chevron-down" type="is-info" size="is-small" custom-size="xs"></b-icon>
                        </div>
                      </template>
                    </div>
                    <template v-slot:content>
                      <table class="table">
                        <tbody>
                          <tr v-for="workingTime in workingTimes" :key="workingTime.name">
                            <template v-if="workingTime.is24Hours">
                              <td>{{ workingTime.name }}</td>
                              <td>Круглосуточно</td>
                            </template>
                            <template v-else>
                              <td>{{ workingTime.name }}</td>
                              <td>{{ workingTime.openingTime }} – {{ workingTime.closingTime }}</td>
                            </template>
                          </tr>
                        </tbody>
                      </table>
                    </template>
                  </b-tooltip>
                </div>
              </div>
              <div class="media">
                <div class="media-content">
                  <div class="is-size-11-mobile is-size-11-tablet is-size-9-desktop has-text-weight-light mb-2">Социальные сети</div>
                  <div class="columns is-variable is-0-mobile is-mobile">
                    <template v-if="socials || club.website">
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
                        <template v-if="social.name === 'UT'">
                          <a :href="social.address" title="YouTube" rel="nofollow" target="_blank">
                            <b-icon pack="fab" icon="youtube" type="is-info" size="is-medium"></b-icon>
                          </a>
                        </template>
                        <template v-if="social.name === 'TT'">
                          <a :href="social.address" title="Tiktok" rel="nofollow" target="_blank">
                            <b-icon pack="fab" icon="tiktok" type="is-info" size="is-medium"></b-icon>
                          </a>
                        </template>
                      </div>
                      <div class="column" v-if="club.website">
                        <a :href="club.website" title="Официальный сайт" rel="nofollow" target="_blank">
                          <b-icon pack="fas" icon="globe" type="is-info" size="is-medium"></b-icon>
                        </a>
                      </div>
                    </template>
                    <template v-else>
                      <div class="column">
                        Нет данных
                      </div>
                    </template>
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
      tablesColumns: [
        {
          field: 'Game',
          label: 'Игра',
        },
        {
          field: 'Hall',
          label: 'Зал',
        },
        {
          field: 'Brand',
          label: 'Производитель',
        },
        {
          field: 'Cloth',
          label: 'Сукно',
        },
      ],
      ballsColumns: [
        {
          field: 'Game',
          label: 'Игра',
        },
        {
          field: 'Hall',
          label: 'Зал',
        },
        {
          field: 'Brand',
          label: 'Производитель',
        },
      ],
      cuesColumns: [
        {
          field: 'Game',
          label: 'Игра',
        },
        {
          field: 'Hall',
          label: 'Зал',
        },
        {
          field: 'Brand',
          label: 'Производитель',
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
    equipment() {
      let equipment = {};
      let games = [];
      let tables = [];
      let cues = [];
      let balls = [];

      for (let i = 0; i < this.club.halls.length; i++) {
        let hall = this.club.halls[i];
        let hallName = this.club.halls[i].name;

        for (let j = 0; j < hall.games.length; j++) {
          let game = hall.games[j];
          let gameName = hall.games[j].name;
          let tablesQuantity = game.tables.length ? game.tables.length : 'нет данных';
          let tablesSize = game.tables[0].size ? `${game.tables[0].size} футов` : 'нет данных';
          let tablesBrand = game.tables[0].brand ? `${game.tables[0].brand}` : 'нет данных';
          let tablesCloth = game.tables[0].cloth ? `${game.tables[0].cloth}` : 'нет данных';
          let tablesCues = game.tables[0].cues ? `${game.tables[0].cues}` : 'нет данных';
          let tablesBalls = game.tables[0].balls ? `${game.tables[0].balls}` : 'нет данных';
          let gamesRow = {
            'Game': gameName,
            'Hall': hallName,
            'Quantity': tablesQuantity,
            'Size': tablesSize,
          };
          let tablesRow = {
            'Game': gameName,
            'Hall': hallName,
            'Brand': tablesBrand,
            'Cloth': tablesCloth,
          };
          let cuesRow = {
            'Game': gameName,
            'Hall': hallName,
            'Brand': tablesCues,
          };
          let ballsRow = {
            'Game': gameName,
            'Hall': hallName,
            'Brand': tablesBalls,
          };

          games.push(gamesRow);
          tables.push(tablesRow);
          cues.push(cuesRow);
          balls.push(ballsRow);
        }
      }

      equipment.games = games;
      equipment.tables = tables;
      equipment.cues = cues;
      equipment.balls = balls;

      return equipment;
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
    workingTimes() {
      if (this.club.working_times.length) {
        let workingTimes = [];

        for (let i = 0; i < this.club.working_times.length; i++) {
          let workingTime = this.club.working_times[i];

          let is24Hours = false;

          if (workingTime.opening_time == workingTime.closing_time) {
            is24Hours = true;
          }

          if (workingTime.name == 'MO') {
            workingTimes.push({
              name: 'Пн',
              openingTime: workingTime.opening_time,
              closingTime: workingTime.closing_time,
              is24Hours,
            });
          } else if (workingTime.name == 'TU') {
            workingTimes.push({
              name: 'Вт',
              openingTime: workingTime.opening_time,
              closingTime: workingTime.closing_time,
              is24Hours,
            });
          } else if (workingTime.name == 'WE') {
            workingTimes.push({
              name: 'Ср',
              openingTime: workingTime.opening_time,
              closingTime: workingTime.closing_time,
              is24Hours,
            });
          } else if (workingTime.name == 'TH') {
            workingTimes.push({
              name: 'Чт',
              openingTime: workingTime.opening_time,
              closingTime: workingTime.closing_time,
              is24Hours,
            });
          } else if (workingTime.name == 'FR') {
            workingTimes.push({
              name: 'Пт',
              openingTime: workingTime.opening_time,
              closingTime: workingTime.closing_time,
              is24Hours,
            });
          } else if (workingTime.name == 'SA') {
            workingTimes.push({
              name: 'Сб',
              openingTime: workingTime.opening_time,
              closingTime: workingTime.closing_time,
              is24Hours,
            });
          } else if (workingTime.name == 'SU') {
            workingTimes.push({
              name: 'Вс',
              openingTime: workingTime.opening_time,
              closingTime: workingTime.closing_time,
              is24Hours,
            });
          }
        }

        return workingTimes;
      }
    },
    thisDay() {
      let weekDays = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
      let date = new Date();
      let currentDay = date.getUTCDay();
      let currentTimeHours = date.getUTCHours() + 3;

      if (currentTimeHours > 23) {
        currentTimeHours = currentTimeHours - 24;
        currentDay += 1;
      }
      
      let dayName = weekDays[currentDay];

      for (let i = 0; i < this.club.working_times.length; i++) {
        let workingTime = this.club.working_times[i];

        if (workingTime.name == dayName) {
          let thisDay = i;
          let openingTime = this.club.working_times[thisDay].opening_time;
          let closingTime = this.club.working_times[thisDay].closing_time;
          let openingTimeHours = parseInt(openingTime);
          let closingTimeHours = parseInt(closingTime);

          let is24Hours = false;

          if (openingTime == closingTime) {
            is24Hours = true;
          }

          let isOpened = false;

          if (openingTimeHours > closingTimeHours) {
            if (currentTimeHours >= openingTimeHours) {
              isOpened = true;
            }
          } else if (openingTimeHours < closingTimeHours) {
            if (currentTimeHours >= openingTimeHours && currentTimeHours < closingTimeHours) {
              isOpened = true;
            } 
          } else if (openingTimeHours === closingTimeHours) {
            isOpened = true;
          }

          return {
            is24Hours,
            isOpened,
            currentTimeHours,
            openingTimeHours,
            closingTimeHours,
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
    payments() {
      if (this.club.payment_methods.length) {
        let payments = this.club.payment_methods.split(', ');

        return payments;
      }
    },
    promotions() {
      if (this.club.promotions.length) {
        let promotions = [];

        for (let i = 0; i < this.club.promotions.length; i++) {
          let promotion = {
            name: this.club.promotions[i].name,
            type: this.club.promotions[i].type,
            timeFrom: this.club.promotions[i].time_from,
            timeTo: this.club.promotions[i].time_to,
            discount: this.club.promotions[i].discount,
            customerCategories: this.club.promotions[i].customer_categories.split(', '),
            daysOfTheWeek: this.club.promotions[i].days_of_the_week.split(', '),
          };

          promotions.push(promotion);
        }

        return promotions;
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.hero {
  min-height: 400px;
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

.sidebar .box {
  border: 1px solid $grey-lighter;
  border-radius: 4px;
  padding: 1rem;
  margin-top: -100px;
}

.sidebar .box .title,
section > .title {
  border-bottom: 1px solid $grey-lighter;
}

.media-content {
  overflow: visible;
}

@include mobile {
  .hero {
    min-height: 250px;
  }

  .sidebar .box {
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