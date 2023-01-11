<script setup lang="ts">
let params = getQueryParams()
let channelResult = ref([])
let total = ref(0)
let page = ref(0)
let id = ref('')
onBeforeMount(async() => {
  let { res, total: t } = await getJson('/api/channel/channel-' + params.id + '.json');
  channelResult.value = res;
  total.value = Math.ceil(t / 10);
  id.value = params.id.slice(0, -1)
  page.value = +params.id.slice(-1) == total.value ? 1 : +params.id.slice(-1) + 1
})
</script>
<template>
<div class="typePage reviewsPage" v-if="channelResult.length">
  <div class="left">
    <div class="typePage_top_content">
      <a :href="'./detailsReviews?id=' + channelResult[0].id + '&type=' + type" class="left">
        <img class="image_2" referrerpolicy="no-referrer" :src="channelResult[0].first_picture" />
        <div class="text-group_1 flex-col">
          <h2 class=" text_21">
            {{ channelResult[0].title }}
          </h2>
          <p class="text_22">
            {{ channelResult[0].main_title }}
          </p>
        </div>
      </a>
      <div class="right">
        <a :href="'./detailsReviews?id=' + item.id + '&type=' + type" class="right_item"
          v-for="item in channelResult.slice(1, 4)">
          <img class="image_2" referrerpolicy="no-referrer" :src="item.first_picture" />
          <div class="right_item_text-group_1 flex-col">
            <h2 class=" text_24">
              {{ item.title }}
            </h2>
            <p class="text_23">
              Updated {{ item.time_en }}
            </p>
          </div>
        </a>
      </div>
    </div>
    <div class="content_line"></div>
    <div class="article_block">
      <div class="article_title">
        <span class="text_22">
          Latest Reviews
        </span>
        <span class="bottom_border"></span>
      </div>
      <div class="article_list">
        <a :href="'./detailsReviews?id=' + item.id + '&type=' + type" class="article_item"
          v-for="item in channelResult.slice(4)">
          <img class="image_2" referrerpolicy="no-referrer" :src="item.first_picture" />
          <div class="article_item_text-group_1">
            <div class="text_21">
              {{ item.title }}
            </div>
            <div class="text_23">
              By {{ item.author_name }} published {{
                Math.floor((+new Date() - +new Date(item.release_time)) / 1000 / (60 *
                  60 * 24))
              }} days ago
            </div>
            <div class="start">
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
          <a :class="{ active: item == page - 1 }"
            :href="'./reviewsPage?id=' + id + item + '&type=' + type">{{ item }}</a>
        </span>
        <span @click="handleNextPage">Next Page</span>
      </div>
    </div>
  </div>
  <div class="right">

  </div>
</div>
</template>
