<template>
  <div class="container">
    <h1>{{ $t('guide_header_title') }}</h1>
    <p>{{ $t('guide_header_content') }}</p>

    <div class="markdown-content"
         v-html="$parent.importMarkdown('download')">
    </div>

    <div class="markdown-content"
         v-html="$parent.importMarkdown('install')">
    </div>

    <div class="hero">
      <p>해당 실행 스크립트를 마이너가 위치할 폴더와 같은곳에 넣어주세요</p>
      <a class="pc-button"
         :href="'data:application/octet-stream;charset=utf-8,' + $parent.makeRunScript(true)"
         :download="$parent.makeRunScriptFilename()">실행스크립트 파일 다운로드</a>
      <p>실행 스크립트는 운영체제에 직접적인 영향을 줄 수 있습니다. 꼭 내용이 아래와 일치하는지 확인 후 다운로드를 진행하세요</p>
      <code>{{ $parent.makeRunScript(false) }}</code>
    </div>

    <div class="markdown-content"
         v-html="$parent.importMarkdown('run')">
    </div>
  </div>
</template>
