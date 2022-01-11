<template>
  <div class="column is-half">
    <div class="card">
      <div class="card-image">
        <figure class="image is-16by9">
          <h4 class="title is-size-8-mobile is-size-8-tablet is-size-7-desktop has-text-white has-text-weight-light">{{ promotion.name }}</h4>
          <img src="/img/club.jpg">
        </figure>
      </div>
      <div class="card-content">
        <div class="content">
          <div class="icon-text mb-1">
            <b-icon pack="fas" icon="user-friends" type="is-success"></b-icon>
            <span class="is-size-12-mobile is-size-12-tablet is-size-12-desktop">
              <span v-for="customer in promotion.customerCategories" :key="customer.id">
                <span>{{ customer }}</span><span v-if="promotion.customerCategories.indexOf(customer) !== promotion.customerCategories.length - 1" class="dot"></span>
              </span>
            </span>
          </div>
          <div class="icon-text mb-1">
            <b-icon pack="fas" icon="tag" type="is-success"></b-icon>
            <span class="is-size-12-mobile is-size-12-tablet is-size-12-desktop">{{ promotion.type }} {{ promotion.discount }}%</span>
          </div>
          <div class="icon-text mb-1">
            <b-icon pack="fas" icon="clock" type="is-success"></b-icon>
            <template v-if="promotion.timeFrom">
              <span class="is-size-12-mobile is-size-12-tablet is-size-12-desktop">
                с {{ promotion.timeFrom }} до {{ promotion.timeTo }}
                <template v-if="promotion.daysOfTheWeek.length == 7">каждый день</template>
                <template v-else>
                  <span v-for="day in promotion.daysOfTheWeek" :key="day.id">
                    <span>{{ day }}</span><span v-if="promotion.daysOfTheWeek.indexOf(customer) !== promotion.daysOfTheWeek.length - 1" class="dot"></span>
                  </span>
                </template>
              </span>
            </template>
            <template v-else>
              <template v-if="promotion.daysOfTheWeek.length == 7">
                <span class="is-size-12-mobile is-size-12-tablet is-size-12-desktop">Каждый день</span>
              </template>
              <template v-else>
                <span class="is-size-12-mobile is-size-12-tablet is-size-12-desktop">Весь день</span>
              </template>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['promotion'],
}
</script>

<style lang="scss" scoped>
.card {
  overflow: hidden;
}

.image h4 {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 80%;
  transform: translate(-50%, -50%);
  z-index: 100;
  // color: $white;
  // font-weight: normal;
}

.image::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  background-color: rgba(0,0,0,.7);
  z-index: 100;
}
</style>