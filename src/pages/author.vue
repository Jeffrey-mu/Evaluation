<script setup lang="ts">
let authorResult = ref({})
let total = ref(0)
let page = ref(0)
let id = ref('')
let params = getQueryParams()
onBeforeMount(async() => {
  let data = await getJson('/api/author/author-' + params.id + '.json')
  authorResult.value = data;
  total.value = Math.ceil(data.total / 10);
  id.value = params.id.slice(0, -1)
  page.value = params.id.slice(-1) == total.value ? 1 : +params.id.slice(-1) + 1
})
</script>
<template>
  <div class="author author_content">
    <div class="left">
      <div class="author_info">
        <div class="author_top">
          <div class="author_img">
            <img :src="authorResult.author_head_portrait" alt="">
          </div>
          <div class="author_title">
            <span class="text_20">
              {{ authorResult.author_name }}
            </span>
          </div>
        </div>
        <div class="author_des">
          <span class="text_author_des">
            {{ authorResult.author_introduction }}
          </span>
        </div>
      </div>
      <div class="content_line"></div>
      <div class="article_block">
        <div class="article_title">
          <span class="text_22">
            ARTICLES BY: {{ authorResult.author_name }}
          </span>
          <span class="bottom_border"></span>
        </div>
        <div class="article_list">

          <a :href="item.type == 1 ? './detailsBestpicks?id=' + item.id + '&type=' + type : './detailsReviews?id=' + item.id + '&type=' + type"
            class="article_item" v-for="item in authorResult.article_list">
            <img class="image_2" referrerpolicy="no-referrer" :src="item.first_picture" />
            <div class="article_item_text-group_1">
              <div class="text_21">
                {{ item.title }}
              </div>
              <div class="text_23">
                By {{ authorResult.author_name }} published {{
                  Math.floor((+new Date() - +new Date(item.release_time)) / 1000
                    / (60 * 60 * 24))
                }} days ago
              </div>
              <div class="start" v-if="item.type == 2">
                <img v-for="el in Math.floor(Number(('' + item.score)))" src="/images/start.png" width="16">
                <img src="/images/startx.png" width="16" v-if="('' + item.score).includes('.')">
                <img v-for="el in 5" src="/images/start-.png" width="16">
              </div>
              <div class="text_22">
                {{ item.main_title }}
              </div>

            </div>
          </a>
        </div>
        <div class="article_limit_page">
          <span v-for="item in total">
            <a :class="{ active: item == page - 1 }" :href="'./author?id=' + id + item + '&type=' + type">{{
              item
            }}</a>
          </span>
          <span @click="handleNextPage">Next Page</span>
        </div>
      </div>
    </div>
    <div class="right">

    </div>
  </div>

</template>
