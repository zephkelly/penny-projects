<template>
  <div class="editor">
    <editor-content :editor="editor" />
  </div>
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const props = defineProps({
  content: {
    type: String,
    default: '<p>Start writing...</p>'
  }
})

const emit = defineEmits(['update:content'])

const editor = useEditor({
  content: props.content,
  extensions: [
    StarterKit,
  ],
  onUpdate: ({ editor }) => {
    emit('update:content', editor.getHTML())
  },
})
</script>

<style lang="scss" scoped>
.editor {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
}
</style>