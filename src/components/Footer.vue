<script setup lang="ts">
const router = useRouter()
function go(path: string) {
  debugger
  console.log(123)
  router.push(path).then(res => {
    location.reload()
  })
}
let listLink = [
  [
  'Termsandconditions',
  'Privacypolicy',
  'Cookiespolicy',
  'AccessibilityStatement'
  ],
  [
    'Archives',
    'Advertise',
    'Aboutus',
    'Contactus'
  ]
]
</script>
<template>
  <div class="footer">
    <div class="footer_content">
      <p class="top_text">Top Ten Reviews is part of Future US Inc, an international media group and leading digital
        publisher. Visit our corporate site(opens in new tab)</p>
      <div class="footer_content_hr"></div>
      <p class="more_text" v-for="item in listLink">
        <a @click="go('/' + path)" v-for="path in item">
          {{ path }}
        </a>
      </p>
      <div class="footer_content_hr"></div>
      <p class="top_text">@Full 7130 West 42nd street , New York . NY 10036</p>
    </div>
  </div>
</template>
