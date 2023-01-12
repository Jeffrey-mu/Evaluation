<script setup lang="ts">
import jquery from 'jquery';
let adv = ref<any[]>([])
let params = getQueryParams()
let details_info = ref<any>({})
console.log(params)
onBeforeMount(async () => {
  details_info.value = await getJson('/api/details/details-' + params.id + '.json');
   document.title = details_info.value.title
})
onMounted(async () => {
  adv.value = await getJson('/api/index_1.json');
  nextTick(() => {
    adv.value.forEach(item => {
      item.position_id == 1 ? jquery('head').append(item.script?.replace(/_pageID_/g, params.id)) : ''
      item.position_id == 2 ? jquery('.detailstop').html(`<div class="Advertisement">Advertisement${item.script?.replace(/_pageID_/g, params.id)}</div>` + jquery('.detailstop').html()) : ''
      item.position_id == 3 ? jquery('.detailsbottom').html(jquery('.detailsbottom').html() + `<div class="Advertisement">Advertisement${item.script?.replace(/_pageID_/g, params.id)}</div>`) : ''
      item.position_id == 4 ? jquery('.footer').html(jquery('.footer').html() + `<div style="position:fixed;bottom:0;">${item.script?.replace(/_pageID_/g, params.id)}</div>`) : ''
    })
  })
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
  <div class="details detailsReviews" v-if="details_info.title">
    <div class="crumbs">
      <a @click="go('/' + '?&type=' + type)">Home</a> > <a
        @click="go('./reviewsPage?id=1-19-1' + '&type=' + type)">Reviews</a>
    </div>
    <div class="detailstop">
    </div>
    <h2 class="text_20">
      {{ details_info.title }}
    </h2>

    <p class="text_23">
      <span class="start" style="display: inline_block">
        <img v-for="_ in Math.floor(Number(details_info.score))" src="/images/start.png" width="16">
        <img src="/images/startx.png" width="16" v-if="details_info.score.includes('.')">
        <img v-for="_ in 5" src="/images/start-.png" width="16">
      </span><span class="text_23"> By {{ details_info.author_name }} published
        {{ Math.floor((+new Date() - +new Date(details_info.release_time)) / 1000 / (60 * 60 * 24)) }} days ago</span>
    </p>
    <p class="text_25">
      {{ details_info.description }}
    </p>
    <ShareLinkUi />
    <img width="100%" class="details_img" :src="details_info.first_picture" alt="">
    <div class="details_body">
      <div class="left">
        <template v-for="item in details_info.content_list">
          <div class="details_subtitle" v-if="item.subtitle">
            <div>{{ item.subtitle }}</div>
          </div>
          <div>
            <div v-html="item.content"></div>
            <h2 class="text_21 amazon_adv_item_des" v-if="item.amazon_adv.length">Round up of today's best deals</h2>
            <div class="amazon_adv amazon_adv_reviews">
              <div class="amazon_adv_item" v-for="amazon_adv in item.amazon_adv">
                <img :src="amazon_adv.picture">
                <p class="amazon_adv_title">{{ amazon_adv.title }}</p>
                <p class="amazon_adv_price">{{ amazon_adv.actual_price }}</p>
                <a :href="amazon_adv.link" target="_blank">VIEW</a>
              </div>
            </div>
          </div>
        </template>
        <div class="detailsbottom">
        </div>
        <div class="author_info">
          <div class="author_top">
            <div class="author_img">
              <img :src="details_info.author_head_portrait" alt="">
            </div>
            <div class="author_title">
              <a @click="go('author?id=' + details_info.author_id + '-1' + '&type=' + type)" class="text_26"
                style="margin:0">
                {{ details_info.author_name || '--' }}
              </a>
            </div>
          </div>
          <div class="author_des">
            <span class="text_author_des">
              {{ details_info.author_introduction }}
            </span>
          </div>
          <div class="content_line"></div>
          <div class="recommended_by_the_author">
            <div class="recommended_by_left">
              <div class="author_nav">MORE ABOUT ELECTRONICS</div>
              <div class="author_article_list">
                <a @click="go(item.type == 1 ? './detailsBestpicks?id=' + item.id + '&type=' + type : './detailsReviews?id=' + item.id + '&type=' + type)"
                  class="author_article_list_item" v-for="item in details_info.category_recommend_list">
                  <img :src="item.first_picture" alt="">
                  <a class="text_21">{{ item.title }}►</a>
                </a>
              </div>
            </div>
            <div class="recommended_by_right">
              <div class="author_nav">
                <span>LATEST</span>
                <span>MORE►</span>
              </div>
              <div class="author_article_list">
                <a @click="go(item.type == 1 ? './detailsBestpicks?id=' + item.id + '&type=' + type : './detailsReviews?id=' + item.id + '&type=' + type)"
                  class="author_article_list_item" v-for="item in details_info.newest_recommend">
                  <img :src="item.first_picture" alt="" style="display: block;">
                  <a class="text_21">{{ item.title }}►</a>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <Subscribe />
      </div>
    </div>
  </div>
</template>
