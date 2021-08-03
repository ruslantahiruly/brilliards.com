<template>
  <div id="page">
    <div id="wrapper">
      <header>
        <TheNavbar />
      </header>
      <main>
        <Nuxt />
      </main>
    </div>
    <TheFooter />
  </div>
</template>

<style lang="scss" scoped>
#page {
  display: flex;
  flex-direction: column;
  height: 100%;
}

#wrapper {
  flex: 1;
}
</style>