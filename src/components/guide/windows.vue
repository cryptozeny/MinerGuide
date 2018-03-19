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

    <div class="download-container">
      <p>{{ $t('guide_script_description') }}</p>
      <a class="pc-button"
         :href="'data:application/octet-stream;charset=utf-8,' + $parent.makeRunScript(true)"
         :download="$parent.makeRunScriptFilename()">{{ $t('guide_script_button') }}</a>
      <p>{{ $t('guide_script_alert') }}</p>
      <code>{{ $parent.makeRunScript(false) }}</code>
    </div>

    <div class="markdown-content"
         v-html="$parent.importMarkdown('run')">
    </div>
  </div>
</template>
