<script setup lang="ts">
let menu = [{ "id": 18, "name": "Best-picks", "type": "1" }, { "id": 19, "name": "Review", "type": "1" }, { "id": 20, "name": "Home & Garden", "type": "2" }, { "id": 21, "name": "Money", "type": "2" }, { "id": 22, "name": "Tech", "type": "2" }, { "id": 23, "name": "Health", "type": "2" }]
onBeforeMount(async () => {
  menu.value = await getJson('../api/channel/menu.json');
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
    <div class="menu">
      <div class="menu_content">
        <div class="block_1 flex-row">
          <a @click="go('/' + '?&type=' + type)" class="block_1_item flex-col" style="margin: 14px 0;">
            <div class="icon iconfont" style="color:#fff; font-size: 23px">
              &#xe750;
            </div>
          </a>
          <div class="block_1_item flex-col" v-for="item in menu">
            <a @click="go(item.id == '18' ? './bestpicksPage?id=' + item.type + '-' + item.id + '-' + 1 + '&type=' + type :
            item.id == '19' ? './reviewsPage?id=' + item.type + '-' + item.id + '-' + 1 + '&type=' + type : './channelPage?id=' + item.type + '-' + item.id + '-' + 1 + '&type=' + type)"
              class="text_6">{{ item.name }}</a>
          </div>
        </div>
      </div>
    </div>
</template>
