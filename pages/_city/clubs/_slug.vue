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
            <div v-if="club.is_qr_code" class="mt-2">
              <div class="icon-text is-size-13-mobile is-size-12-tablet is-size-12-desktop">
                <b-icon pack="fas" icon="exclamation-triangle" type="is-warning" size="is-small"></b-icon>
                <span class="has-text-weight-light">Вход по QR-коду</span>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="button is-static is-danger is-size-13-mobile is-size-12-tablet is-size-12-desktop is-outlined is-rounded">
              <b-icon pack="fas" icon="exclamation-triangle" type="is-danger" size="is-small" custom-size="sm"></b-icon>
              <span>Закрыто</span>
            </div>
          </template>
          <div v-if="club.works_since" class="is-size-13-mobile is-size-12-tablet is-size-12-desktop has-text-weight-light mt-3">
            Работает с {{ club.works_since }} года
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container is-max-widescreen">
        <div class="columns is-variable is-0-mobile columns-reverse">
          <div class="column is-two-thirds">
            <section class="mb-6">
              <h2 class="title is-size-8-mobile is-size-8-tablet is-size-7-desktop has-text-weight-light has-text-left pb-4">Виды бильярда</h2>
              <template v-if="equipment">
                <b-table :data="equipment.games" :columns="gamesColumns" :mobile-cards=false></b-table>
              </template>
              <template v-else>
                <div>Нет данных по играм</div>
              </template>
            </section>
            <section class="mb-6">
              <h2 class="title is-size-8-mobile is-size-8-tablet is-size-7-desktop has-text-weight-light has-text-left pb-4">Оборудование</h2>
              <template v-if="equipment">
                <b-tabs v-model="equipmentActiveTab" size="is-medium">
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
              </template>
              <template v-else>
                <div>Нет данных по оборудованию</div>
              </template>
            </section>
            <section class="mb-6">
              <h2 class="title is-size-8-mobile is-size-8-tablet is-size-7-desktop has-text-weight-light has-text-left pb-4">Цены</h2>
              <template v-if="prices">
                <div v-for="price in prices" :key="price.id" class="mb-5">
                  <h3 class="title is-size-10-mobile is-size-10-tablet is-size-9-desktop has-text-weight-light has-text-left pb-3 mb-0">{{ price.type }} зал {{ price.name }}</h3>
                  <b-tabs v-model="price.pricesActiveTab" size="is-medium">
                    <template v-if="price.russianPrices.length > 0">
                      <b-tab-item label="Русский бильярд">
                        <b-table :data="price.russianPrices" :columns="pricesColumns" :bordered="isBordered" :mobile-cards=false></b-table>
                      </b-tab-item>
                    </template>
                    <template v-if="price.poolPrices.length > 0">
                      <b-tab-item label="Пул">
                        <b-table :data="price.poolPrices" :columns="pricesColumns" :bordered="isBordered" :mobile-cards=false></b-table>
                      </b-tab-item>
                    </template>
                    <template v-if="price.snookerPrices.length > 0">
                      <b-tab-item label="Снукер">
                        <b-table :data="price.snookerPrices" :columns="pricesColumns" :bordered="isBordered" :mobile-cards=false></b-table>
                      </b-tab-item>
                    </template>
                  </b-tabs>
                </div>
              </template>
              <template v-else>
                <div>Нет данных по ценам</div>
              </template>
            </section>
            <section class="mb-6">
              <h2 class="title is-size-8-mobile is-size-8-tablet is-size-7-desktop has-text-weight-light has-text-left pb-4">Сервис</h2>
              <div class="columns is-variable is-0-mobile is-mobile is-multiline">
                <div class="column is-half-mobile is-one-quarter-tablet is-one-fifth-desktop has-text-centered">
                  <div class="is-size-13-mobile is-size-13-tablet is-size-13-desktop mt-2 has-text-black">Турниры</div>
                  <template v-if="club.tournaments">
                    <span class="icon-text">
                      <b-icon pack="fas" icon="check" type="is-success" size="is-medium"></b-icon>
                      <span>Есть</span>
                    </span>
                  </template>
                  <template v-else>
                    <span class="icon-text">
                      <b-icon pack="fas" icon="times" type="is-danger" size="is-medium"></b-icon>
                      <span>Нет</span>
                    </span>
                  </template>
                </div>
                <div class="column is-half-mobile is-one-quarter-tablet is-one-fifth-desktop has-text-centered">
                  <div class="is-size-13-mobile is-size-13-tablet is-size-13-desktop mt-2 has-text-black">Школа бильярда</div>
                  <template v-if="club.school">
                    <span class="icon-text">
                      <b-icon pack="fas" icon="check" type="is-success" size="is-medium"></b-icon>
                      <span>Есть</span>
                    </span>
                  </template>
                  <template v-else>
                    <span class="icon-text">
                      <b-icon pack="fas" icon="times" type="is-danger" size="is-medium"></b-icon>
                      <span>Нет</span>
                    </span>
                  </template>
                </div>
                <div class="column is-half-mobile is-one-quarter-tablet is-one-fifth-desktop has-text-centered">
                  <div class="is-size-13-mobile is-size-13-tablet is-size-13-desktop mt-2 has-text-black">Магазин оборудования и аксессуаров</div>
                  <template v-if="club.shop">
                    <span class="icon-text">
                      <b-icon pack="fas" icon="check" type="is-success" size="is-medium"></b-icon>
                      <span>Есть</span>
                    </span>
                  </template>
                  <template v-else>
                    <span class="icon-text">
                      <b-icon pack="fas" icon="times" type="is-danger" size="is-medium"></b-icon>
                      <span>Нет</span>
                    </span>
                  </template>
                </div>
                <div class="column is-half-mobile is-one-quarter-tablet is-one-fifth-desktop has-text-centered">
                  <div class="is-size-13-mobile is-size-13-tablet is-size-13-desktop mt-2 has-text-black">Мастерская по ремонту киев</div>
                  <template v-if="club.repair">
                    <span class="icon-text">
                      <b-icon pack="fas" icon="check" type="is-success" size="is-medium"></b-icon>
                      <span>Есть</span>
                    </span>
                  </template>
                  <template v-else>
                    <span class="icon-text">
                      <b-icon pack="fas" icon="times" type="is-danger" size="is-medium"></b-icon>
                      <span>Нет</span>
                    </span>
                  </template>
                </div>
                <div class="column is-half-mobile is-one-quarter-tablet is-one-fifth-desktop has-text-centered">
                  <div class="is-size-13-mobile is-size-13-tablet is-size-13-desktop mt-2 has-text-black">Шкафчики для киев</div>
                  <template v-if="club.cues_lockers">
                    <span class="icon-text">
                      <b-icon pack="fas" icon="check" type="is-success" size="is-medium"></b-icon>
                      <span>Есть</span>
                    </span>
                  </template>
                  <template v-else>
                    <span class="icon-text">
                      <b-icon pack="fas" icon="times" type="is-danger" size="is-medium"></b-icon>
                      <span>Нет</span>
                    </span>
                  </template>
                </div>
              </div>
            </section>
            <section class="mb-6">
              <h2 class="title is-size-8-mobile is-size-8-tablet is-size-7-desktop has-text-weight-light has-text-left pb-4">Акции</h2>
              <template v-if="promotions">
                <div class="columns">
                  <Promotion
                    v-for="promotion in promotions"
                    :key="promotion.id"
                    :promotion="promotion"
                  />
                </div>
              </template>
              <template v-else>
                <div>Нет данных по промоакциям</div>
              </template>
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
              <template v-if="photos">
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
              </template>
              <template v-else>
                <div>Нет фотографий</div>
              </template>
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
                  <b-icon pack="fas" icon="map-marker-alt" type="is-info"></b-icon>
                </div>
                <div class="media-content">
                  <div class="is-size-12-mobile is-size-12-tablet is-size-11-desktop has-text-grey has-text-weight-light mb-2">Адрес</div>
                  <div class="is-size-10-mobile is-size-10-tablet is-size-10-desktop has-text-weight-light">{{ club.address }}</div>
                  <div v-if="club.house || club.floor || club.entrance" class="is-size-12-mobile is-size-12-tablet is-size-12-desktop has-text-grey has-text-weight-light">
                    <template v-if="club.house">{{ club.house }}</template>
                    <template v-if="club.floor && club.house"><span class="dot has-background-info"></span>{{ club.floor }} этаж</template>
                    <template v-else-if="club.floor">{{ club.floor }} этаж</template>
                    <template v-if="club.entrance && club.house || club.floor"><span class="dot has-background-info"></span>вход с {{ club.entrance }}</template>
                    <template v-else-if="club.entrance">вход с {{ club.entrance }}</template>
                  </div>
                  <div v-if="club.district" class="is-size-12-mobile is-size-12-tablet is-size-12-desktop has-text-grey has-text-weight-light">Район: {{ club.district }}</div>
                  <div v-if="club.metro" class="is-size-12-mobile is-size-12-tablet is-size-12-desktop has-text-grey has-text-weight-light">Метро: {{ club.metro }}</div>
                </div>
              </div>
              <div class="media">
                <div class="media-left mr-2">
                  <b-icon pack="fas" icon="phone-alt" type="is-info"></b-icon>
                </div>
                <div class="media-content">
                  <div class="is-size-12-mobile is-size-12-tablet is-size-11-desktop has-text-grey has-text-weight-light mb-2">Телефон</div>
                  <div class="is-size-10-mobile is-size-10-tablet is-size-10-desktop has-text-weight-light">{{ club.phone }}</div>
                </div>
              </div>
              <div class="media">
                <div class="media-left mr-2">
                  <b-icon pack="fas" icon="clock" type="is-info"></b-icon>
                </div>
                <div class="media-content">
                  <div class="is-size-12-mobile is-size-12-tablet is-size-11-desktop has-text-grey has-text-weight-light mb-2">Время работы</div>
                  <b-tooltip position="is-bottom" type="is-light" :triggers="['click']" :auto-close="['outside', 'escape']">
                    <div class="is-size-10-mobile is-size-10-tablet is-size-10-desktop has-text-weight-light is-clickable">
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
                  <div class="columns is-variable is-3-mobile is-mobile">
                    <template v-if="socials || club.website">
                      <div class="column is-narrow" v-for="social in socials" :key="social.id">
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
      pricesColumns: [
        {
          field: 'Time',
          label: 'Время',
          centered: true,
        },
        {
          field: 'MO',
          label: 'ПН',
          centered: true,
        },
        {
          field: 'TU',
          label: 'ВТ',
          centered: true,
        },
        {
          field: 'WE',
          label: 'СР',
          centered: true,
        },
        {
          field: 'TH',
          label: 'ЧТ',
          centered: true,
        },
        {
          field: 'FR',
          label: 'ПТ',
          centered: true,
        },
        {
          field: 'SA',
          label: 'СБ',
          centered: true,
        },
        {
          field: 'SU',
          label: 'ВС',
          centered: true,
        },
      ],
      equipmentActiveTab: 0,
      isBordered: true,
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
      if (this.club.halls.length) {
        let equipment = {};
        let games = [];
        let tables = [];
        let cues = [];
        let balls = [];

        for (let i = 0; i < this.club.halls.length; i++) {
          let hall = this.club.halls[i];
          let hallType = this.club.halls[i].type;
          if (this.club.halls[i].name) {
            let hallName = this.club.halls[i].name;
            hallType = `${hallType}, ${hallName}`;
          }

          for (let j = 0; j < hall.games.length; j++) {
            let game = hall.games[j];
            let gameName = hall.games[j].name;
            let tablesQuantity = game.tables.length ? game.tables.length : 'Нет данных';
            let tablesSize = game.tables[0].size ? `${game.tables[0].size} футов` : 'Нет данных';
            let tablesBrand = game.tables[0].brand ? `${game.tables[0].brand}` : 'Нет данных';
            let tablesCloth = game.tables[0].cloth ? `${game.tables[0].cloth}` : 'Нет данных';
            let tablesCues = game.tables[0].cues ? `${game.tables[0].cues}` : 'Нет данных';
            let tablesBalls = game.tables[0].balls ? `${game.tables[0].balls}` : 'Нет данных';
            let gamesRow = {
              'Game': gameName,
              'Hall': hallType,
              'Quantity': tablesQuantity,
              'Size': tablesSize,
            };
            let tablesRow = {
              'Game': gameName,
              'Hall': hallType,
              'Brand': tablesBrand,
              'Cloth': tablesCloth,
            };
            let cuesRow = {
              'Game': gameName,
              'Hall': hallType,
              'Brand': tablesCues,
            };
            let ballsRow = {
              'Game': gameName,
              'Hall': hallType,
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
      }
    },
    prices() {
      if (this.club.prices.length) {
        // Collecting timestamps, deleting duplicates and sorting numbers
        let timestamps = [];

        for (let i = 0; i < this.club.prices.length; i++) {
          let price = this.club.prices[i];

          timestamps.push(price.price_from);
          timestamps.push(price.price_to);
        }

        timestamps = [...new Set(timestamps)];

        function compareNumeric(a, b) {
          a = parseInt(a);
          b = parseInt(b);

          if (a > b) return 1;
          if (a == b) return 0;
          if (a < b) return -1;
        }

        timestamps.sort(compareNumeric);

        // Generating time intervals and excluding those're out of 'working_times'
        let timeIntervals = [];

        for (let i = 0; i < timestamps.length; i++) {
          if (i !== timestamps.length - 1) {
            timeIntervals.push(`${timestamps[i]} – ${timestamps[i+1]}`);
          } else {
            timeIntervals.push(`${timestamps[i]} – ${timestamps[0]}`);
          }
        }

        let maxClosingNum = Number.NEGATIVE_INFINITY;
        let maxClosingTime = null;

        for (let i = 0; i < this.club.working_times.length; i++) {
          let tempMaxClosingNum = null;

          if ( parseInt(this.club.working_times[i].opening_time) != parseInt(this.club.working_times[i].closing_time) ) {
            if ( parseInt(this.club.working_times[i].opening_time) < parseInt(this.club.working_times[i].closing_time) && tempMaxClosingNum == null ) {
              if ( parseInt(this.club.working_times[i].closing_time) > maxClosingNum ) {
                maxClosingNum = parseInt(this.club.working_times[i].closing_time);
                maxClosingTime = this.club.working_times[i].closing_time;
              }
            } else {
              if ( parseInt(this.club.working_times[i].closing_time) > maxClosingNum ) {
                maxClosingNum = parseInt(this.club.working_times[i].closing_time);
                maxClosingTime = this.club.working_times[i].closing_time;
                tempMaxClosingNum = parseInt(this.club.working_times[i].closing_time);
              }
            }
          }
        }

        let minOpeningNum = Number.POSITIVE_INFINITY;
        let minOpeningTime = null;

        for (let i = 0; i < this.club.working_times.length; i++) {
          if ( parseInt(this.club.working_times[i].opening_time) != parseInt(this.club.working_times[i].closing_time) ) {
            if (parseInt(this.club.working_times[i].opening_time) < minOpeningNum) {
              minOpeningNum = parseInt(this.club.working_times[i].opening_time);
              minOpeningTime = this.club.working_times[i].opening_time;
            }
          }
        }

        // Deleting time interval that's out of working time
        let indexesTimeIntervals = [];

        if (minOpeningTime != maxClosingTime) {
          for (let i = 0; i < timeIntervals.length; i++) {
            let times = timeIntervals[i].split(' – ');

            if ( parseInt(times[0]) == parseInt(maxClosingTime) ) {
              indexesTimeIntervals.push(i);
            }
          }

          timeIntervals = timeIntervals.filter(function(item, index) {
            return indexesTimeIntervals.indexOf(index) < 0;
          });
        }

        // Ordering 'timeIntervals' from 'opening_time'
        if (minOpeningTime != maxClosingTime) {
          for (let i = 0; i < timeIntervals.length; i++) {
            let times = timeIntervals[0].split(' – ');
            
            if ( parseInt(times[1]) <= parseInt(minOpeningTime) && parseInt(times[0]) < parseInt(times[1]) ) {
              let firstInterval = timeIntervals.shift();
              
              timeIntervals.push(firstInterval);
            }
          }
        } else {
          for (let i = 0; i < timeIntervals.length; i++) {
            let times = timeIntervals[0].split(' – ');
            
            if ( parseInt(times[1]) <= 6 ) {
              let firstInterval = timeIntervals.shift();
              
              timeIntervals.push(firstInterval);
            }
          }
        }

        // Populating table 'td's with prices' values
        let prices = [];
        let halls = [];

        // Generating list of halls
        for (let i = 0; i < this.club.prices.length; i++) {
          let price = this.club.prices[i];

          for (let j = 0; j < price.tables.length; j++) {
            let table = price.tables[j];

            halls.push({
              id: table.hall.id,
              type: table.hall.type,
              name: table.hall.name,
            });
          }
        }

        halls = halls.filter((item, index, self) =>
          index === self.findIndex((t) => (
            t.id === item.id
          ))
        )

        // Generating tables of prices
        for (let i = 0; i < halls.length; i++) {
          let hall = halls[i];

          let russianPrices = [];
          let poolPrices = [];
          let snookerPrices = [];

          for (let j = 0; j < timeIntervals.length; j++) {
            let time = timeIntervals[j];
            let times = timeIntervals[j].split(' – ');
            let timeFrom = times[0];
            let timeTo = times[1];

            let russianPricesRow = { 'Time': time, };
            let poolPricesRow = { 'Time': time, };
            let snookerPricesRow = { 'Time': time, };

            for (let k = 0; k < this.club.prices.length; k++) {
              let price = this.club.prices[k];

              if (price.tables.find(item => item.hall.id == hall.id)) {
                if ( (parseInt(timeFrom) == parseInt(price.price_from) || parseInt(timeTo) == parseInt(price.price_to)) && price.tables.find(item => item.game == 'Русский бильярд') ) {
                  if ( price.working_times.find(item => item.name == 'MO') ) {
                    russianPricesRow['MO'] = price.value;
                  }
                  if ( price.working_times.find(item => item.name == 'TU') ) {
                    russianPricesRow['TU'] = price.value;
                  }
                  if ( price.working_times.find(item => item.name == 'WE') ) {
                    russianPricesRow['WE'] = price.value;
                  }
                  if ( price.working_times.find(item => item.name == 'TH') ) {
                    russianPricesRow['TH'] = price.value;
                  }
                  if ( price.working_times.find(item => item.name == 'FR') ) {
                    russianPricesRow['FR'] = price.value;
                  }
                  if ( price.working_times.find(item => item.name == 'SA') ) {
                    russianPricesRow['SA'] = price.value;
                  }
                  if ( price.working_times.find(item => item.name == 'SU') ) {
                    russianPricesRow['SU'] = price.value;
                  }
                }

                if ( (parseInt(timeFrom) == parseInt(price.price_from) || parseInt(timeTo) == parseInt(price.price_to)) && price.tables.find(item => item.game == 'Пул') ) {
                  if ( price.working_times.find(item => item.name == 'MO') ) {
                    poolPricesRow['MO'] = price.value;
                  }
                  if ( price.working_times.find(item => item.name == 'TU') ) {
                    poolPricesRow['TU'] = price.value;
                  }
                  if ( price.working_times.find(item => item.name == 'WE') ) {
                    poolPricesRow['WE'] = price.value;
                  }
                  if ( price.working_times.find(item => item.name == 'TH') ) {
                    poolPricesRow['TH'] = price.value;
                  }
                  if ( price.working_times.find(item => item.name == 'FR') ) {
                    poolPricesRow['FR'] = price.value;
                  }
                  if ( price.working_times.find(item => item.name == 'SA') ) {
                    poolPricesRow['SA'] = price.value;
                  }
                  if ( price.working_times.find(item => item.name == 'SU') ) {
                    poolPricesRow['SU'] = price.value;
                  }
                }

                if ( (parseInt(timeFrom) == parseInt(price.price_from) || parseInt(timeTo) == parseInt(price.price_to)) && price.tables.find(item => item.game == 'Снукер') ) {
                  if ( price.working_times.find(item => item.name == 'MO') ) {
                    snookerPricesRow['MO'] = price.value;
                  }
                  if ( price.working_times.find(item => item.name == 'TU') ) {
                    snookerPricesRow['TU'] = price.value;
                  }
                  if ( price.working_times.find(item => item.name == 'WE') ) {
                    snookerPricesRow['WE'] = price.value;
                  }
                  if ( price.working_times.find(item => item.name == 'TH') ) {
                    snookerPricesRow['TH'] = price.value;
                  }
                  if ( price.working_times.find(item => item.name == 'FR') ) {
                    snookerPricesRow['FR'] = price.value;
                  }
                  if ( price.working_times.find(item => item.name == 'SA') ) {
                    snookerPricesRow['SA'] = price.value;
                  }
                  if ( price.working_times.find(item => item.name == 'SU') ) {
                    snookerPricesRow['SU'] = price.value;
                  }
                }
              }
            }

            if (Object.keys(russianPricesRow).length > 1) {
              russianPrices.push(russianPricesRow);
            }
            if (Object.keys(poolPricesRow).length > 1) {
              poolPrices.push(poolPricesRow);
            }
            if (Object.keys(snookerPricesRow).length > 1) {
              snookerPrices.push(snookerPricesRow);
            }
          }

          prices.push({
            pricesActiveTab: 0,
            id: hall.id,
            type: hall.type,
            name: hall.name,
            russianPrices,
            poolPrices,
            snookerPrices,
          });
        }

        return prices;
      }
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
      let currentTimeHours = date.getUTCHours() + parseInt(this.club.time_zone);

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