<script setup lang="ts">
let topRecommendation = ref([])

onBeforeMount(async() => {
  topRecommendation.value = await getJson('/api/channel/topping.json')
})
const router = useRouter()
function go(path: string) {
  console.log(useRouter)
  router.push(path).then(res => {
    location.reload()
  })
}
</script>
<template>
  <div class="top_recommendation">
    <a class="active_null active_null_des">
      <span class="text_13">HOT NOW</span>
    </a>
    <a @click="go(item.type == 1 ? './detailsBestpicks?id=' + item.id + '&type=' + type : './detailsReviews?id=' + item.id + '&type=' + type)"
      class="active_null" v-for="item in topRecommendation">
      <span class="text_13">{{item.topping_title}}</span></a>
  </div>
</template>
