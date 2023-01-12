<script setup lang="ts">
const { MobileMenuWidth, setMobileMenuWidth } = menu_hooks()
function handleEmpy(e) {
  if (e.target.className === 'menu_phone_content') {
    setMobileMenuWidth('0')
  }
}
let menu = ref([])
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
  <div class="menu_phone" :style="{ width: MobileMenuWidth }">
    <div class="menu_phone_content" @click="handleEmpy">
      <div class="box_1">
        <a @click="go('/' + '?&type=' + type)">
          <div class="block_1 icon iconfont" style="font-size: 23px">
            &#xe750;
          </div>
        </a>
      </div>
      <div class="box_2">
        <div class="menu_item" v-for="item in menu">
          <a @click="go(item.id == '18' ? './bestpicksPage?id=' + item.type + '-' + item.id + '-' + 1 + '&type=' + type :
          item.id == '19' ? './reviewsPage?id=' + item.type + '-' + item.id + '-' + 1 + '&type=' + type : './channelPage?id=' + item.type + '-' + item.id + '-' + 1 + '&type=' + type)"
            class="text_6">{{ item.name }}</a>
        </div>
      </div>
    </div>
  </div>
</template>
