<script setup lang="ts">
function handleShowMenu() {
  menu_hooks().setMobileMenuWidth('100vw')
}
const { searchResultFilter } = searchResultHooks()
let showSearch = window.location.pathname.includes('search') ? true : false;

let searchKeys= ref('')
watch(searchKeys, (value) => {
  searchResultFilter(value)
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
  <div class="header">
    <div class="phone_menu icon iconfont" @click="handleShowMenu">
      &#xe790;
    </div>
    <a @click="go('/' + '?&type=' + type)" class="text-wrapper_1" :style="{ display: showSearch ? 'none' : 'block' }"
      v-if="!showSearch">
      <span class="text_1">Evaluation</span>
      <span class="text_2">station</span>
    </a>
    <!-- 双标签解决双端正常显示网站名称-->
    <a @click="go('/' + '?&type=' + type)" class="text-wrapper_1 text-wrapper_2" v-else>
      <span class="text_1">Evaluation</span>
      <span class="text_2">station</span>
    </a>
    <div class="search_box" v-if="showSearch">
      <input type="text" v-model="searchKeys" class="search_box_input">
    </div>
    <div class="share">
    <ShareLinkUi />
      <div class="search_box_icon" v-if="!showSearch">
        <a @click="go('./search')" class="icon iconfont" style="line-height: 30px;margin: 0 10px;font-size: 23px">
          &#xe600;
        </a>
        <a @click="go('./search')" style="color:#ccc">Search</a>

      </div>
      <div class="search_box_pc" v-if="showSearch">
        <div class="icon iconfont" style="line-height: 30px;margin: 0 10px;">
          &#xe600;
        </div>
        <input type="text" v-model="searchKeys" class="search_box_input">
      </div>
    </div>
    <a @click="go('./search')" class="phone_search icon iconfont">
      &#xe600;
    </a>
  </div>
</template>
