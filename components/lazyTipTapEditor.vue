<template>
    <!-- <ClientOnly> -->
        <div class="editor" v-if="isAdmin && editor">
            <div class="fixed-menu">
                <div class="elements">
                    <button @click="editor.chain().focus().toggleBold().run()" :class="{ active: editor.isActive('bold') }">Bold</button>
                    <button @click="editor.chain().focus().toggleItalic().run()" :class="{ active: editor.isActive('italic') }">Italic</button>
                    <button @click="editor.chain().focus().toggleStrike().run()" :class="{ active: editor.isActive('strike') }">Strike</button>
                    <button @click="editor.chain().focus().toggleBulletList().run()" :class="{ active: editor.isActive('bulletList') }">Bullet List</button>
                </div>
                <div class="styling">
                    <button @click="editor.chain().focus().setParagraph().run()">Paragraph</button>
                    <button @click="editor.chain().focus().setHeading({ level: 1 }).run()" :class="{ active: editor.isActive('heading', { level: 1 }) }">H1</button>
                    <button @click="editor.chain().focus().setHeading({ level: 2 }).run()">H2</button>
                    <button @click="editor.chain().focus().setHeading({ level: 3 }).run()">H3</button>
                    <button @click="editor.chain().focus().setHeading({ level: 4 }).run()">H4</button>
                </div>
            </div>
            <editor-content :editor="editor" />
        </div>
        <div v-else>
            <p>Only admins can access the editor.</p>
        </div>
    <!-- </ClientOnly> -->
</template>

<script lang="ts" setup>
import { useAuth } from '@/composables/useAuth';
import { useEditor, EditorContent } from '@tiptap/vue-3';
// import Document from '@tiptap/extension-document';
// import Paragraph from '@tiptap/extension-paragraph';
// import Text from '@tiptap/extension-text';
import StarterKit from '@tiptap/starter-kit'

const props = defineProps<{
    content: EditorContent;
}>();

const { isAdmin } = useAuth();

const editor = useEditor({
    extensions: [StarterKit],
    content: props.content,
});

// console.log(editor.isActive('bold'));
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

.fixed-menu {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
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
    
    .elements {
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