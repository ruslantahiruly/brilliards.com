<template>
  <footer class="footer is-size-12-mobile is-size-12-tablet is-size-12-desktop has-text-grey mt-6">
    <div class="container is-max-widescreen">
      <div class="columns">
        <div class="column has-text-centered-mobile">© 2019-2021 Brilliards</div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  border-top: 1px solid $grey-lighter;
}

@include mobile {
  .footer {
    padding: 1.5rem .5rem 1.5rem;
  }
}
</style>