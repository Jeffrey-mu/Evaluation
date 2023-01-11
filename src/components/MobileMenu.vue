<script setup>
function handleEmpy(e) {
  if (e.target.className === 'menu_phone_content') {
    document.querySelector('.menu_phone').style.width = '0';
  }
}
let menu = ref([])
onBeforeMount(async () => {
  menu.value = await getJson('../api/channel/menu.json');
})
</script>
<template>
    <div class="menu_phone">
      <div class="menu_phone_content" @click="handleEmpy">
        <div class="box_1">
          <a :href="'/' + '?&type=' + type">
            <div class="block_1 icon iconfont" style="font-size: 23px">
              &#xe750;
            </div>
          </a>
        </div>
        <div class="box_2">
          <div class="menu_item" v-for="item in menu">
            <a :href="item.id == '18' ? './bestpicksPage?id=' + item.type + '-' + item.id + '-' + 1 + '&type=' + type :
            item.id == '19' ? './reviewsPage?id=' + item.type + '-' + item.id + '-' + 1 + '&type=' + type : './channelPage?id=' + item.type + '-' + item.id + '-' + 1 + '&type=' + type"
              class="text_6">{{ item.name }}</a>
          </div>
        </div>
      </div>
    </div>
</template>
