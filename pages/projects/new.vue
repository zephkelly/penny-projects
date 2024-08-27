<template>
    <ProjectsNewHero />
    <tipTapEditor :content="pageContent" />
</template>

<script setup lang="ts">
definePageMeta({
    middleware: ['admin']
})

const pageContent = ref(`
  <h1>Welcome to Our Page</h1>
  <h2>Here is a subheading that you would use for extra context</h2>
  <h3>Features</h3>
  <h4>Features</h4>
  <ul>
    <li>Headers</li>
    <li>Paragraphs</li>
    <li>Lists</li>
  </ul>
  <blockquote>And even blockquotes!</blockquote>
  <p></p>
`);
</script>