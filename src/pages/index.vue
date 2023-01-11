<script setup lang="ts">
let indexResult = ref<indexResult | any>([])
interface indexResult  {
  newest_best_picks_list: []
  newest_reviews_list: []
}
onBeforeMount(async () => {
  indexResult.value = await getJson('/api/channel/index.json')
})
</script>
<template>
  <div class="typePage index_content" v-if="indexResult.newest_best_picks_list || indexResult.newest_reviews_list">
    <div class="top_content">
      <div class="read_more index_title">
        <span>Latest</span>
        <span class="bottom_border"></span>
      </div>
      <a class="right"
        :href="indexResult.newest_list[0].type == 1 ? './detailsBestpicks?id=' + indexResult.newest_list[0].id + '&type=' + type : './detailsReviews?id=' + indexResult.newest_list[0].id + '&type=' + type">
        <img class="image_2" referrerpolicy="no-referrer" :src="indexResult.newest_list[0].first_picture" />
        <div class="text-group_1 flex-col ">
          <h2 class="text_21">
            {{ indexResult.newest_list[0].title }}
          </h2>
          <p class="text_22">
            {{ indexResult.newest_list[0].main_title }}
          </p>
          <p class="text_23">By {{ indexResult.newest_list[0].author_name }}
          </p>
        </div>
      </a>
      <div class="left">
        <template v-for="item, index in indexResult.newest_list.slice(1, 3)">
          <a class="left_item"
            :href="item.type == 1 ? './detailsBestpicks?id=' + item.id + '&type=' + type : './detailsReviews?id=' + item.id + '&type=' + type">
            <div class="left_item_text-group_1 flex-col ">
              <h2 class="text_21">
                {{ item.title }}
              </h2>
              <p class="text_22">
                {{ item.main_title }}
              </p>
              <p class="text_23">By {{ item.author_name }}
              </p>
            </div>
            <img class="image_2" referrerpolicy="no-referrer" :src="item.first_picture" />
          </a>
          <div v-if="!index" class="left_item_hr"></div>
        </template>
      </div>
    </div>
    <div class="bottom">
      <a class="bottom_item" v-for="item in indexResult.newest_list.slice(3, 7)"
        :href="item.type == 1 ? './detailsBestpicks?id=' + item.id + '&type=' + type : './detailsReviews?id=' + item.id + '&type=' + type">
        <img class="image_2" referrerpolicy="no-referrer" :src="item.first_picture" />
        <div class="bottom_item_text-group_1 flex-col ">
          <h2 class="text_21">
            {{ item.title }}
          </h2>
          <p class="text_23">
            Updated {{ item.time_en }}
          </p>
        </div>
      </a>
    </div>
    <div class="content_line">

    </div>
    <div class="read_more">
      <span>Latest Best Picks</span>
      <span class="bottom_border"></span>
      <a :href="'./bestpicksPage?id=1-18-1' + '&type=' + type"><span>view more▶</span></a>
    </div>
    <div class="top_content best_picks">
      <a class="right" :href="'detailsBestpicks?id=' + indexResult.newest_best_picks_list[0].id + '&type=' + type">
        <img class="image_2" referrerpolicy="no-referrer" :src="indexResult.newest_best_picks_list[0].first_picture" />
        <div class="text-group_1 flex-col ">
          <h2 class="text_21">
            {{ indexResult.newest_best_picks_list[0].title }}
          </h2>
          <p class="text_22">
            {{ indexResult.newest_best_picks_list[0].main_title }}
          </p>
          <p class="text_23">
            By {{ indexResult.newest_best_picks_list[0].author_name }} published {{
              Math.floor((+new Date() - +new
                Date(indexResult.newest_best_picks_list[0].release_time)) / 1000 / (60 * 60 * 24))
            }} days ago
          </p>
        </div>
      </a>
      <div class="left">
        <template v-for="item, index in indexResult.newest_best_picks_list.slice(1, 4)">
          <a class="left_item" :href="'detailsBestpicks?id=' + item.id + '&type=' + type">
            <div class="left_item_text-group_1 flex-col ">
              <h2 class="text_21">
                {{ item.title }}
              </h2>
              <p class="text_22">
                {{ item.main_title }}
              </p>
              <p class="text_23">By {{ item.author_name }} published {{
                Math.floor((+new Date() - +new
                  Date(item.release_time)) / 1000 / (60 * 60 * 24))
              }} days ago
              </p>
            </div>
            <img class="image_2" referrerpolicy="no-referrer" :src="item.first_picture" />
          </a>
          <div v-if="index != 2" style="margin: 10px 0"></div>
        </template>
      </div>
    </div>
    <div class="bottom best_picks_bottom">
      <a class="bottom_item" v-for="item in indexResult.newest_best_picks_list.slice(1, 4)"
        :href="'detailsBestpicks?id=' + item.id + '&type=' + type">
        <img class="image_2" referrerpolicy="no-referrer" :src="item.first_picture" />
        <div class="bottom_item_text-group_1 flex-col ">
          <h2 class="text_21">
            {{ item.title }}
          </h2>
          <p class="text_22">
            {{ item.main_title }}
          </p>
          <p class="text_23">
            By {{ item.author_name }} published {{
              Math.floor((+new Date() - +new Date(item.release_time)) / 1000 / (60 *
                60
                * 24))
            }} days ago
          </p>
        </div>
      </a>
    </div>
    <div class="content_line">
    </div>
    <div class="read_more">
      <span>Latest Reviews</span>
      <span class="bottom_border"></span>
      <a :href="'./reviewsPage?id=1-19-1' + '&type=' + type"><span>view more▶</span></a>
    </div>
    <div class="bottom reviews_bottom">
      <a class="bottom_item" v-for="item in indexResult.newest_reviews_list.slice(0, 4)"
        :href="'detailsReviews?id=' + item.id + '&type=' + type">
        <img class="image_2" referrerpolicy="no-referrer" :src="item.first_picture" />
        <div class="bottom_item_text-group_1 flex-col ">
          <h2 class="text_21">
            {{ item.title }}
          </h2>
          <p class="start">
            <img v-for="_ in Math.floor(Number(('' + item.score)))" src="/images/start.png" width="16">
            <img src="/images/startx.png" width="16" v-if="('' + item.score).includes('.')">
            <img v-for="_ in 5" src="/images/start-.png" width="16">
          </p>
          <p class="text_22">
            {{ item.main_title }}
          </p>
          <p class="text_23">
            By {{ item.author_name }} published {{
              Math.floor((+new Date() - +new Date(item.release_time)) / 1000 / (60 *
                60
                * 24))
            }} days ago
          </p>
        </div>
      </a>
    </div>
    <div class="content_line" style="background:none">

    </div>
  </div>

</template>
