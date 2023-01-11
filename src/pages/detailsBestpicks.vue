<script setup lang="ts">
let params = getQueryParams()
let details_info = ref<any>({})
let active = ref<any>('')
console.log(params)
onBeforeMount(async () => {
  details_info.value = await getJson('/api/details/details-' + params.id + '.json');
})
</script>
<template>
  <div class="details detailsBestpicks" v-if="details_info.title">

    <div class="details_body">
      <div class="left">
        <div class="crumbs">
          <a :href="'/' + '?&type=' + type">Home</a> > <a
            :href="'./bestpicksPage?id=1-18-1' + '&type=' + type">Best.picks</a>
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
        <div class="share">
          <img class="label_1" referrerpolicy="no-referrer" src="/images/faceBook.png"
            @click="shareLink('https://www.facebook.com/sharer/sharer.php?u=xxxxx')" />
          <img class="label_2"
            @click="shareLink('https://twitter.com/intent/tweet?url=xxxxx&text=I found a great article on the Evaluation station website.')"
            referrerpolicy="no-referrer" src="/images/Twitter.png" />
          <img class="label_3"
            @click="shareLink('https://pinterest.com/pin/create/button/?url=xxxxx&media=&description=I found a great article on the Evaluation station website.')"
            referrerpolicy="no-referrer" src="/images/Q.png" />
          <img class="label_4"
            @click="shareLink('https://share.flipboard.com/bookmarklet/popout?v=2&title=I found a great article on the Evaluation station website.&url=xxxxx')"
            referrerpolicy="no-referrer" src="/images/San.png" />
          <img class="label_5" @click="shareLink('mailto:info@example.com?&subject=&cc=&bcc=&body=xxxxx%0A')"
            referrerpolicy="no-referrer" src="/images/Email.png" />
        </div>
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
              <a :href="'author?id=' + details_info.author_id + '-1' + '&type=' + type" class="text_26"
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
                <a :href="item.type == 1 ? './detailsBestpicks?id=' + item.id + '&type=' + type : './detailsReviews?id=' + item.id + '&type=' + type"
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
                <a :href="item.type == 1 ? './detailsBestpicks?id=' + item.id + '&type=' + type : './detailsReviews?id=' + item.id + '&type=' + type"
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
        <div class="post">
          <div class="top">
            <!-- <img src="/images/Email" alt="" height="42"> -->
            <div class="right_flex">
              <p class="text_21">SIGN UP FOR EMAIL NEWSLETTERS</p>
            </div>

          </div>
          <p>
            Get the best reviews, product advice, newsand more!
          </p>
          <input type="text" class="input">
          <div>
            <input type="checkbox" name="Contact me with news and offers from otherFuture brands">
            <label for="Contact me with news and offers from otherFuture brands">Contact me with news and offers
              from
              otherFuture brands</label>
          </div>
          <div>
            <input type="checkbox" name="Receive email from us on behalf of ourtrusted
                            partners or
                            sponsors">
            <label for="Receive email from us on behalf of ourtrusted
                            partners or
                            sponsors">Receive email from us on behalf of ourtrusted
              partners or
              sponsors</label>
          </div>
          <div>
            <button>SIGE ME UP</button>
          </div>
          <p>By submitting your information you agree to theTerms Conditions and Privacy Policy and areaged 16 or
            over</p>
        </div>
      </div>
    </div>
  </div>
</template>
