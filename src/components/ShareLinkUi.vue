<template>
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
</template>
