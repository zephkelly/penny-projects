<template>
    <section class="tiptap component">
        <div class="container" :class="{ inactive: (!isAdmin || !editor) }">
            <div class="editor" v-if="editor && isAdmin">
                <div class="fixed-menu">
                    <div class="elements">
                        <h6>Elements</h6>
                        <div class="wrapper">
                            <button @click="editor?.chain().focus().setParagraph().run()" :class="{ active: editor.isActive('paragraph') }">Paragraph</button>
                            <button @click="editor?.chain().focus().setHeading({ level: 1 }).run()" :class="{ active: editor.isActive('heading', { level: 1 }) }">H1</button>
                            <button @click="editor?.chain().focus().setHeading({ level: 2 }).run()" :class="{ active: editor.isActive('heading', { level: 2 }) }">H2</button>
                            <button @click="editor?.chain().focus().setHeading({ level: 3 }).run()" :class="{ active: editor.isActive('heading', { level: 3 }) }">H3</button>
                            <button @click="editor?.chain().focus().setHeading({ level: 4 }).run()" :class="{ active: editor.isActive('heading', { level: 4 }) }">H4</button>
                        </div>
                    </div>
                    <div class="styles">
                        <h6>Styling</h6>
                        <div class="wrapper">
                            <div class="group">
                                <button @click="editor?.chain().focus().toggleBold().run()" :class="{ active: editor.isActive('bold') }">Bold</button>
                                <button @click="editor?.chain().focus().toggleItalic().run()" :class="{ active: editor.isActive('italic') }">Italic</button>
                                <button @click="editor?.chain().focus().toggleStrike().run()" :class="{ active: editor.isActive('strike') }">Strike</button>
                                <button @click="editor?.chain().focus().toggleBulletList().run()" :class="{ active: editor.isActive('bulletList') }">Bullet List</button>
                                <button @click="editor?.chain().focus().toggleOrderedList().run()" :class="{ active: editor.isActive('orderedList') }">Ordered List</button>
                                <button @click="editor?.chain().focus().toggleUnderline().run()" :class="{ active: editor.isActive('underline') }">Underline</button>
                                <button @click="editor?.chain().focus().toggleBlockquote().run()" :class="{ active: editor.isActive('blockquote') }">Blockquote</button>
                            </div>
                            <div class="group">
                                <button @click="editor?.chain().focus().setTextAlign('left').run()" :class="{ active: editor.isActive({ textAlign: 'left' }) }">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="M140-140v-60h680v60H140Zm0-155v-60h440v60H140Zm0-155v-60h680v60H140Zm0-155v-60h440v60H140Zm0-155v-60h680v60H140Z"/></svg>
                                </button>
                                <button @click="editor?.chain().focus().setTextAlign('center').run()" :class="{ active: editor.isActive({ textAlign: 'center' }) }">
                                    <svg class="center" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="M164-164v-52h632v52H164Zm144-145v-52h344v52H308ZM164-454v-52h632v52H164Zm144-145v-52h344v52H308ZM164-744v-52h632v52H164Z"/></svg>
                                </button>
                                <button @click="editor?.chain().focus().setTextAlign('right').run()" :class="{ active: editor.isActive({ textAlign: 'right' }) }">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="M140-140v-60h680v60H140Zm0-155v-60h440v60H140Zm0-155v-60h680v60H140Zm0-155v-60h440v60H140Zm0-155v-60h680v60H140Z"/></svg>
                                </button>
                                <button @click="editor?.chain().focus().setTextAlign('justify').run()" :class="{ active: editor.isActive({ textAlign: 'justify' }) }">
                                    <svg class="justify" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="M164-164v-52h632v52H164Zm0-145v-52h632v52H164Zm0-145v-52h632v52H164Zm0-145v-52h632v52H164Zm0-145v-52h632v52H164Z"/></svg>
                                </button>
                            </div>
                            <div class="group">
                                <button @click="editor?.chain().focus().unsetLink().run()" :class="{ active: editor.isActive('link') }">Unlink</button>
                                <button @click="editor?.chain().focus().toggleLink({ href: 'https://example.com' }).run()" :class="{ active: editor.isActive('link') }">Link</button>
                            </div>
                        </div>
                    </div>
                    <div class="actions">
                        <h6>Actions</h6>
                        <div class="wrapper">
                            <button @click="editor?.chain().focus().undo().run()">Undo</button>
                            <button @click="editor?.chain().focus().redo().run()">Redo</button>
                        </div>
                    </div>
                </div>
                <floating-menu :editor="editor" :tippy-options="{ duration: 100 }">
                    <div class="floating-menu">
                        <button @click="editor?.chain().focus().setParagraph().run()" :class="{ active: editor.isActive('paragraph') }">P</button>
                        <button @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ active: editor.isActive('heading', { level: 1 }) }">H1</button>
                        <button @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ active: editor.isActive('heading', { level: 2 }) }">H2</button>
                    </div>
                </floating-menu>
                <bubble-menu :editor="editor" :tippy-options="{ duration: 100 }">
                    <div class="bubble-menu">
                        <button @click="editor?.chain().focus().toggleBold().run()" :class="{ active: editor.isActive('bold') }">Bold</button>
                        <button @click="editor?.chain().focus().toggleItalic().run()" :class="{ active: editor.isActive('italic') }">Italic</button>
                        <button @click="editor?.chain().focus().toggleStrike().run()" :class="{ active: editor.isActive('strike') }">Strike</button>
                    </div>
                </bubble-menu>
                <editor-content :editor="editor" />
            </div>
            <div class="editor" v-else>
                <div class="fixed-menu inactive">
                    <p><span>Unuthorised access:</span> You shouldn't be able to see this message! Try reloading your browser. If issue persists contact site maintainer.</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { useAuth } from '../composables/useAuth';
import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/vue-3';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import StarterKit from '@tiptap/starter-kit'

const props = defineProps<{
    content: string;
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
.header {
    font-family: 'Nunito', sans-serif;
    font-size: 3.6rem;
    letter-spacing: 0.3rem;
    font-weight: 700;
    color: var(--text-color-main);
    text-transform: uppercase;

    @media (max-width: 768px) {
        font-size: clamp(3rem, 8vw, 4rem);
    }
}

.container {
    &.inactive {
        .editor {
            width: 100%;
            flex: 0 0 auto;
            height: 400px;

            .fixed-menu {
                margin: 0rem;
                display: flex;
                justify-content: center;
                align-items: center;
                max-height: 6.15rem;

                p {
                    font-family: 'Inter', sans-serif;
                    width: auto;
                    max-width: 80%;
                    font-size: 1rem;
                    color: var(--grey3);
                    text-align: center;
                    margin-top: 1rem;
                    margin-bottom: 1rem;

                    span {
                        color: var(--grey3);
                        font-weight: 600;
                    }
                }
            }
        }
    }
}

.editor {
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
    border: 1px solid var(--grey4);
    border-radius: 0.7rem;
    box-shadow: 0px 0px 30px 0px rgba(0,0,0,0.25);
    display: flex;
    padding: 0.2rem;
    gap: 0.25rem;
}

.fixed-menu {
    display: grid;
    grid-template-columns: 0.6fr 2.6fr 0.6fr;
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.02);
    gap: 1rem;
    position: sticky;
    padding: 1rem;
    border: 1px solid var(--grey5);
    background: var(--background-color-secondary);
    border-radius: 0.5rem;
    box-sizing: border-box;
    z-index: 1;

    &.inactive {
        flex: 1;
        max-width: 1000px;
    }
    
    > div {
        border-radius: 0.5rem;
        // border: 1px solid var(--grey5);
        box-shadow: 0px 0px 30px 0px rgba(0,0,0,0.05);
        padding: 0.5rem;

        h6 {
            font-family: 'Inter', sans-serif;
            font-size: 0.9rem;
            font-weight: 600;
            letter-spacing: 0.06rem;
            margin-bottom: 0.5rem;
            color: var(--dark1);
        }

        * > div {
            display: flex;
            gap: 0.25rem;

        }

        .wrapper {
            display: flex;
            flex-wrap: wrap;
            gap: 0.25rem;
        }
    }
}

button {
    font-family: 'Inter', sans-serif;
    background-color: #f0eeec;
    border: none;
    height: 1.75rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    border-radius: 0.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s cubic-bezier(0.165, 0.84, 0.44, 1), background-color 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
    text-wrap: nowrap;

    &:hover {
        background-color: #e0e0e0;
    }

    &.active {
        background-color: var(--admin);
        color: var(--background-color-secondary);

        svg {
            fill: var(--background-color-secondary);
        }
    }

    svg {
        position: relative;
        width: 20px;
        height: 20px;
        fill: black;

        &.center, &.justify {
            width: 21.56px;
            height: 21.56px;
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
        color: var(--black2);
        font-weight: 500;

        strong {
            font-weight: 700;
        }

        em {
            font-style: oblique 4deg;
        }
    }

    h1 {
        font-family: 'Nunito', 'Inter', sans-serif;
    }

    h2, h3, h4 {
        font-family: "Poppins", sans-serif;
    }

    h1 {
        font-size: 3.6rem;
        line-height: 52px;
    }

    h2 {
        font-size: 1.6rem;
        margin-top: 1rem;
        margin-bottom: 2rem;
    }

    h3 {
        font-size: 1.5rem;
        margin-top: 2rem;
        margin-bottom: 1rem;
    }

    h4 {
        font-size: 1.4rem;
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
        margin: 1.25rem 1rem 1.25rem 0.4rem;
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