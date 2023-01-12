
<script setup lang="ts">
const { searchResult } = searchResultHooks()
const router = useRouter()
function go(path: string) {
  console.log(useRouter)
  router.push(path).then(res => {
    location.reload()
  })
}
</script>
<template>
  <div class="author">
    <div class="left">
      <p class="website_top_text" style="padding: 0">top Ten Reviews is supported by its audienceWhen you purchase
        through links
        on our site ,
        wemay earn an
        affiliate
        commission . Here's why _ youcan trust us</p>
      <div class="content_line"></div>

      <div class="article_list search_result" style="color: #fff;" v-if="searchResult.length">
        <div class="article_block">
          <div class="article_title">
            <span class="text_22" style="margin: 0px 0 30px 0">
              Search result for laptop
            </span>
          </div>
        </div>
        <a v-for="item in searchResult"
          @click="go(item.type == 1 ? './detailsBestpicks?id=' + item.id : './detailsReviews?id=' + item.id + '&type=' + type)"
          class="article_item"
          style="padding-bottom: 20px;margin-top: 20px; border-bottom: 1px solid #ccc; display: inline-block;width: 100%">
          <img class="image_2" style="width: 100%;" referrerpolicy="no-referrer" :src="item.first_picture" />
          <div class="article_item_text-group_1">
            <div class="text_21">
              {{ item.title }}
            </div>
            <div class="text_23">
              By item.author_name published {{
            Math.floor((+new Date() - +new Date(item.release_time)) / 1000 / (60 * 60 *
              24)) }} days ago
            </div>
            <div class="start" :style="{ display: item.type == 2 ? '' : 'none' }">
              <img v-for="_ in Math.floor(Number(('' + item.score)))" src="/images/start.png" width="16">
              <img src="/images/startx.png" width="16" v-if="('' + item.score).includes('.')">
              <img v-for="_ in 5" src="/images/start-.png" width="16">
            </div>
            <div class="text_22">
              {{ item.main_title }}
            </div>

          </div>
        </a>

      </div>
    </div>
    <div class="right">

    </div>
  </div>

</template>
