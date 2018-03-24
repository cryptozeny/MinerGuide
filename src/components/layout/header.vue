<template>
  <header id="header">
    <div class="container">
      <h1>MinerGuide<span class="sub">Cryptocurrency Miner setting guide</span></h1>
      <nav id="header-nav">
        <ul>
          <li><a href="#">Help</a></li>
          <li><a href="#">About</a></li>
          <li class="lang">
            <a href="#">Select Language</a>
            <ul>
              <li :class="{active: $i18n.locale === 'ko'}">
                <a href="#" @click.prevent="changeLanguage('ko')">한국어</a>
              </li>
              <li :class="{active: $i18n.locale === 'jp'}">
                <a href="#" @click.prevent="changeLanguage('jp')">日本語</a>
              </li>
              <li :class="{active: $i18n.locale === 'en'}">
                <a href="#" @click.prevent="changeLanguage('en')">English</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    changeLanguage (Lang) {
      this.$i18n.locale = Lang
      this.$parent.Lang = Lang
    }
  }
}
</script>
