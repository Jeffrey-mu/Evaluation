<script setup lang="ts">
function handleShowMenu() {
  document.querySelector('.menu_phone').style.width = '100vw';
}
function shareLink(path) {
  let goPath = path.replace('xxxxx', window.location.href)
  window.open(goPath)
}
let showSearch = window.location.pathname.includes('search') ? true : false;
let searchResult= []
let adv= []
let searchKeys= ""
</script>

<template>
  <div class="header">
    <div class="phone_menu icon iconfont" @click="handleShowMenu">
      &#xe790;
    </div>
    <a :href="'/' + '?&type=' + type" class="text-wrapper_1" :style="{ display: showSearch ? 'none' : 'block' }"
      v-if="!showSearch">
      <span class="text_1">Evaluation</span>
      <span class="text_2">station</span>
    </a>
    <!-- 双标签解决双端正常显示网站名称-->
    <a :href="'/' + '?&type=' + type" class="text-wrapper_1 text-wrapper_2" v-else>
      <span class="text_1">Evaluation</span>
      <span class="text_2">station</span>
    </a>
    <div class="search_box" v-if="showSearch">
      <input type="text" v-model="searchKeys" class="search_box_input">
    </div>
    <div class="share">
      <!-- <img class="label_1" referrerpolicy="no-referrer" src="/images/faceBook"
        @click="shareLink('https://www.facebook.com/sharer/sharer.php?u=xxxxx')" />
      <img class="label_2"
        @click="shareLink('https://twitter.com/intent/tweet?url=xxxxx&text=I found a great article on the Evaluation station website.')"
        referrerpolicy="no-referrer" src="/images/Twitter" />
      <img class="label_3"
        @click="shareLink('https://pinterest.com/pin/create/button/?url=xxxxx&media=&description=I found a great article on the Evaluation station website.')"
        referrerpolicy="no-referrer" src="/images/Q" />
      <img class="label_4"
        @click="shareLink('https://share.flipboard.com/bookmarklet/popout?v=2&title=I found a great article on the Evaluation station website.&url=xxxxx')"
        referrerpolicy="no-referrer" src="/images/San" />
      <img class="label_5" @click="shareLink('mailto:info@example.com?&subject=&cc=&bcc=&body=xxxxx%0A')"
        referrerpolicy="no-referrer" src="/images/Email" /> -->
      <div class="search_box_icon" v-if="!showSearch">
        <a href="./search" class="icon iconfont" style="line-height: 30px;margin: 0 10px;font-size: 23px">
          &#xe600;
        </a>
        <a href="./search" style="color:#ccc">Search</a>

      </div>
      <div class="search_box_pc" v-if="showSearch">
        <div class="icon iconfont" style="line-height: 30px;margin: 0 10px;">
          &#xe600;
        </div>
        <input type="text" v-model="searchKeys" class="search_box_input">
      </div>
    </div>
    <a href="./search" class="phone_search icon iconfont">
      &#xe600;
    </a>
  </div>
</template>
