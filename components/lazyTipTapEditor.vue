<template>
    <!-- <ClientOnly> -->
        <div class="editor" v-if="isAdmin && editor">
            <div class="fixed-menu">
                <div class="elements">
                    <button @click="editor.chain().focus().toggleBold().run()" :class="{ active: editor.isActive('bold') }">Bold</button>
                    <button @click="editor.chain().focus().toggleItalic().run()" :class="{ active: editor.isActive('italic') }">Italic</button>
                    <button @click="editor.chain().focus().toggleStrike().run()" :class="{ active: editor.isActive('strike') }">Strike</button>
                    <button @click="editor.chain().focus().toggleBulletList().run()" :class="{ active: editor.isActive('bulletList') }">Bullet List</button>
                    <button @click="editor.chain().focus().toggleOrderedList().run()" :class="{ active: editor.isActive('orderedList') }">Ordered List</button>
                    <button @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ active: editor.isActive('codeBlock') }">Code Block</button>
                    <button @click="editor.chain().focus().toggleCode().run()" :class="{ active: editor.isActive('code') }">Code</button>
                    <button @click="editor.chain().focus().toggleBlockquote().run()" :class="{ active: editor.isActive('blockquote') }">Blockquote</button>
                    <button @click="editor.chain().focus().toggleLink({ href: 'https://example.com' }).run()" :class="{ active: editor.isActive('link') }">Link</button>
                    <button @click="editor.chain().focus().unsetLink().run()" :class="{ active: editor.isActive('link') }">Unlink</button>
                    <button @click="editor.chain().focus().toggleUnderline().run()" :class="{ active: editor.isActive('underline') }">Underline</button>
                    <button @click="editor.chain().focus().setTextAlign('left').run()" :class="{ active: editor.isActive({ textAlign: 'left' }) }">Left</button>
                    <button @click="editor.chain().focus().setTextAlign('center').run()" :class="{ active: editor.isActive({ textAlign: 'center' }) }">Center</button>
                    <button @click="editor.chain().focus().setTextAlign('right').run()" :class="{ active: editor.isActive({ textAlign: 'right' }) }">Right</button>
                    <button @click="editor.chain().focus().setTextAlign('justify').run()" :class="{ active: editor.isActive({ textAlign: 'justify' }) }">Justify</button>
                </div>
                <div class="actions">
                    <button @click="editor.chain().focus().undo().run()">Undo</button>
                    <button @click="editor.chain().focus().redo().run()">Redo</button>                    
                </div>
                <div class="styling">
                    <button @click="editor.chain().focus().setParagraph().run()" :class="{ active: editor.isActive('paragraph') }">Paragraph</button>
                    <button @click="editor.chain().focus().setHeading({ level: 1 }).run()" :class="{ active: editor.isActive('heading', { level: 1 }) }">H1</button>
                    <button @click="editor.chain().focus().setHeading({ level: 2 }).run()" :class="{ active: editor.isActive('heading', { level: 2 }) }">H2</button>
                    <button @click="editor.chain().focus().setHeading({ level: 3 }).run()" :class="{ active: editor.isActive('heading', { level: 3 }) }">H3</button>
                    <button @click="editor.chain().focus().setHeading({ level: 4 }).run()" :class="{ active: editor.isActive('heading', { level: 4 }) }">H4</button>
                </div>
            </div>
            <floating-menu :editor="editor" :tippy-options="{ duration: 100 }">
                <div class="floating-menu">
                    <button @click="editor.chain().focus().toggleParagraph().run()" :class="{ active: editor.isActive('paragraph') }">P</button>
                    <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ active: editor.isActive('heading', { level: 1 }) }">H1</button>
                    <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ active: editor.isActive('heading', { level: 2 }) }">H2</button>
                </div>
            </floating-menu>
            <bubble-menu :editor="editor" :tippy-options="{ duration: 100 }">
                <div class="bubble-menu">
                    <button @click="editor.chain().focus().toggleBold().run()" :class="{ active: editor.isActive('bold') }">Bold</button>
                    <button @click="editor.chain().focus().toggleItalic().run()" :class="{ active: editor.isActive('italic') }">Italic</button>
                    <button @click="editor.chain().focus().toggleStrike().run()" :class="{ active: editor.isActive('strike') }">Strike</button>
                </div>
            </bubble-menu>
            <editor-content :editor="editor" />
        </div>
        <div v-else>
            <p>Only admins can access the editor.</p>
        </div>
    <!-- </ClientOnly> -->
</template>

<script lang="ts" setup>
import { useAuth } from '@/composables/useAuth';
import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/vue-3';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import StarterKit from '@tiptap/starter-kit'

const props = defineProps<{
    content: EditorContent;
}>();

const { isAdmin } = useAuth();

const editor = useEditor({
    extensions: [
        StarterKit,
        Link,
        Underline,
        TextAlign.configure({ types: ['heading', 'paragraph'] })
    ],
    content: props.content,
});

</script>

<style lang="scss" scoped>
.editor {
    border: 1px solid #ccc;
    border-left: none;
    border-right: none;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    height: 1000px;
}

.floating-menu {
    display: flex;
    background-color: var(--gray-3);
    padding: 0.1rem;
    border-radius: 0.5rem;
    gap: 0.25rem;
}

.bubble-menu {
    background-color: white;
    border: 1px solid grey;
    border-radius: 0.7rem;
    box-shadow: 0px 0px 30px 0px rgba(0,0,0,0.25);
    display: flex;
    padding: 0.2rem;
    gap: 0.25rem;
}

.fixed-menu {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 3fr 1fr;
    gap: 0.25rem;
    position: sticky;
    padding-top: 1rem;
    padding-bottom: 1rem;
    background: white;
    border-bottom: 1px solid #ccc;
    z-index: 1;

    > * {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem;

    }

    .actions {
        justify-content: flex-end;
    } 
}

button {
    font-family: 'Inter', sans-serif;
    background-color: #f0eeec;
    border: none;
    height: 1.8rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    border-radius: 0.5rem;
    transition: color 0.2s cubic-bezier(0.165, 0.84, 0.44, 1), background-color 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);

    &:hover {
        background-color: #e0e0e0;
    }

    &.active {
        background-color: var(--text-color-main);
        color: var(--background-color-secondary);
    }
}
</style>

<style lang="scss">
.tiptap {
    border: none;
    margin-top: 2rem;

    &.ProseMirror-focused {
        &:focus {
            outline: none;
        }
    }

    h1, h2, h3, h4, p, ul {
        font-family: 'Inter', sans-serif;
        color: var(--text-color-dark);
        font-weight: 500;

        strong {
            font-weight: 700;
        }

        em {
            font-style: oblique 4deg;
        }
    }

    h1 {
        font-size: 2.8rem;
        line-height: 52px;
    }

    h2 {
        font-size: 1.6rem;
        margin-top: 1rem;
        margin-bottom: 2rem;
    }

    h3 {
        font-size: 2rem;
        margin-top: 2rem;
        margin-bottom: 1rem;
    }

    h4 {
        font-size: 1.5rem;
        margin-top: 2rem;
        margin-bottom: 1rem;
    }

    p {
        font-size: 1.2rem;
        line-height: 1.5rem;
        margin-top: 1rem;
        margin-bottom: 1rem;

        strong {
            font-weight: 600;
        }
    }

    ul {
        padding: 0 1rem;
        margin-top: 1.25rem 1rem 1.25rem .4rem;
        box-sizing: border-box;
        list-style-type: disc;

        li {
            p {
                margin-top: 0rem;
                margin-bottom: .25rem;
            }
        }
    }
}
// Add global tip tap styles

</style>