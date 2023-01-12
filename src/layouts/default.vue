<script setup>
import jquery from 'jquery'
console.log(jquery('div'))
let adv = ref([])
onMounted(async () => {
  adv.value = await getJson('/api/index_1.json');
  nextTick(() => {
  adv.value.forEach(item => {
    item.position_id == 1 ? jquery('head').append(item.script) : ''
    item.position_id == 2 ? jquery('.typePage').html(`<div class="Advertisement">Advertisement${item.script}</div>` + jquery('.typePage').html()) : ''
    item.position_id == 3 ? jquery('.typePage').html(jquery('.typePage').html() + `<div class="Advertisement">Advertisement${item.script}</div>`) : ''
    item.position_id == 4 ? jquery('.footer').html(jquery('.footer').html() + `<div style="position:fixed;bottom:0">${item.script}</div>`) : ''
  })
  })
})

</script>
<template>
  <Header />
  <Menu />
  <MobileMenu />
  <div class="content">
    <TopRecommendation />
    <RouterView />
  </div>

  <Footer />
</template>
