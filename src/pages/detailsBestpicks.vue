<script setup lang="ts">
import jquery from 'jquery'
let params = getQueryParams()
let details_info = ref<any>({})
let active = ref<any>('')
let adv = ref<any[]>([])
console.log(params)
watch(active, (value) => {
  // @ts-ignore
  setTimeout(() => { document.querySelector('.included').scrollLeft = value * 150 }, 200)
})
onBeforeMount(async () => {
  details_info.value = await getJson('/api/details/details-' + params.id + '.json');
  document.title = details_info.value.title
  window.addEventListener('scroll', (e) => {
    console.log(e)
    // 导航跟随
    try {
      // @ts-ignore
      let elements = details_info.value.content_list.map(el => el.amazon_adv).flat(1).map(el => ({ top: document.getElementById(el.id).offsetTop, ...el })).filter(Boolean)
      for (let i = 0; i < elements.length; i++) {
        if (window.pageYOffset >= elements[i].top - 100) {
          active.value = i
        }
      }
      // @ts-ignore
      let arr = [...document.querySelectorAll('#app .content .details .details_body .left .included .included_item img')]
      console.log(arr)
      if (window.pageYOffset > 400) {
        arr.map(el => el.style.display = "none")
      } else {
        arr.map(el => el.style.display = "block")
      }
    } catch (error) {
      console.log(error)
    }
  })
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
  <div class="details detailsBestpicks" v-if="details_info.title">

    <div class="details_body">
      <div class="left">
        <div class="crumbs">
          <a @click="go('/' + '?&type=' + type)">Home</a> > <a
            @click="go('./bestpicksPage?id=1-18-1' + '&type=' + type)">Best.picks</a>
        </div>
        <div class="detailstop">
        </div>
        <h2 class="text_20">
          {{ details_info.title }}
        </h2>
        <p class="text_23">
          <span class="text_23">By {{ details_info.author_name }} published {{
            Math.floor((+new Date() - +new
              Date(details_info.release_time)) / 1000 / (60 * 60 * 24))
          }} days ago</span>
        </p>
        <p class="text_25">
          {{ details_info.description }}
        </p>
        <ShareLinkUi />
        <p class="text_22">
          included in this guide:
        </p>
        <div class="included">
          <template v-for="item, index in details_info.content_list.map(el => el.amazon_adv).flat(1)">
            <a :style="{ borderBottom: index == active ? '4px solid red' : '' }" :href="'#' + item.id"
              class="included_item">
              <!--序号1显示红色-->
              <div class="tag"
                :style="{ backgroundColor: index == active ? 'red' : '', color: index == active ? '#fff' : '' }">
                <!--内外下标相加得到序号-->
                {{ index + 1}}
              </div>
              <div class="arrow icon iconfont">
                <!--内外下标相加得到序号-->
                &#xe61f;
              </div>
              <img :src="item.picture" alt="">
              <h2 class="text_22">{{ item.title }}</h2>
              <p>{{ item.specifications }}</p>
              <a :href="item.link" target="_blank"><button>CHECK PRICE</button></a>
            </a>
          </template>
        </div>
        <div class="content_line"></div>
        <h2 class="text_21">
          Latest Reviews
        </h2>
        <img width="100%" class="details_img" :src="details_info.first_picture" alt="">
        <template v-for="item in details_info.content_list">

          <div style="margin-top: 20px;" :id="item.amazon_adv[0] ? item.amazon_adv[0].id : ''">
            <div class="details_subtitle" v-if="item.subtitle">
              <div>{{ item.subtitle }}</div>
            </div>
            <div v-html="item.content"></div>
            <!--<div class="amazon_adv">
                <div class="amazon_adv_item" v-for="amazon_adv in item.amazon_adv">
                  <img src="amazon_adv.picture">
                  {{amazon_adv.title}}
                  <p class="amazon_adv_price">{{amazon_adv.actual_price}}</p>
                  <a :href="amazon_adv.link">VIEW</a>
                </div>
              </div>-->
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
                  <img style="display: block;" :src="item.first_picture" alt="">
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
                  <img :src="item.first_picture" alt="">
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
