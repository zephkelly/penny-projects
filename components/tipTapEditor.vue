<template>
    <section class="tiptap-custom component">
        <div class="container" :class="{ inactive: (!isAdmin || !editor) }">
            <div class="editor" v-if="editor && isAdmin">
                <div class="fixed-menu-wrapper">
                    <div class="fixed-menu">
                        <div class="settings-block">
                            <div class="elements">
                                <h6>Elements</h6>
                                <div class="wrapper">
                                    <button @click="editor?.chain().focus().setParagraph().run()" :class="{ active: editor.isActive('paragraph') }">Text</button>
                                    <button @click="editor?.chain().focus().setHeading({ level: 3 }).run()" :class="{ active: editor.isActive('heading', { level: 3 }) }">Heading</button>
                                    <button @click="addImage">Image</button>
                                </div>
                            </div>
                            <div class="styles">
                                <h6>Styling</h6>
                                <div class="wrapper">
                                    <div class="group">
                                        <button @click="editor?.chain().focus().toggleBold().run()" :class="{ active: editor.isActive('bold') }">Bold</button>
                                        <button @click="editor?.chain().focus().toggleItalic().run()" :class="{ active: editor.isActive('italic') }">Italic</button>
                                        <!-- <button @click="editor?.chain().focus().toggleStrike().run()" :class="{ active: editor.isActive('strike') }">Strike</button> -->
                                        <button @click="editor?.chain().focus().toggleBulletList().run()" :class="{ active: editor.isActive('bulletList') }">Bullet List</button>
                                        <button @click="editor?.chain().focus().toggleOrderedList().run()" :class="{ active: editor.isActive('orderedList') }">Ordered List</button>
                                        <!-- <button @click="editor?.chain().focus().toggleUnderline().run()" :class="{ active: editor.isActive('underline') }">Underline</button> -->
                                        <button @click="editor?.chain().focus().toggleBlockquote().run()" :class="{ active: editor.isActive('blockquote') }">Blockquote</button>
                                        <!-- <button @click="editor?.chain().focus().setTextAlign('left').run()" :class="{ active: editor.isActive({ textAlign: 'left' }) }"> -->
                                            <!-- <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="M140-140v-60h680v60H140Zm0-155v-60h440v60H140Zm0-155v-60h680v60H140Zm0-155v-60h440v60H140Zm0-155v-60h680v60H140Z"/></svg>
                                        </button> -->
                                        <!-- <button @click="editor?.chain().focus().setTextAlign('center').run()" :class="{ active: editor.isActive({ textAlign: 'center' }) }">
                                            <svg class="center" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="M164-164v-52h632v52H164Zm144-145v-52h344v52H308ZM164-454v-52h632v52H164Zm144-145v-52h344v52H308ZM164-744v-52h632v52H164Z"/></svg>
                                        </button>
                                        <button @click="editor?.chain().focus().setTextAlign('right').run()" :class="{ active: editor.isActive({ textAlign: 'right' }) }">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="M140-140v-60h680v60H140Zm0-155v-60h440v60H140Zm0-155v-60h680v60H140Zm0-155v-60h440v60H140Zm0-155v-60h680v60H140Z"/></svg>
                                        </button> -->
                                        <!-- <button @click="editor?.chain().focus().setTextAlign('justify').run()" :class="{ active: editor.isActive({ textAlign: 'justify' }) }">
                                            <svg class="justify" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="M164-164v-52h632v52H164Zm0-145v-52h632v52H164Zm0-145v-52h632v52H164Zm0-145v-52h632v52H164Zm0-145v-52h632v52H164Z"/></svg>
                                        </button> -->
                                        <button @click="editor?.chain().focus().unsetLink().run()" :class="{ active: editor.isActive('link') }">Unlink</button>
                                        <button @click="editor?.chain().focus().toggleLink({ href: 'https://example.com' }).run()" :class="{ active: editor.isActive('link') }">Link</button>
                                    </div>
                                    <div class="group">
                                    </div>
                                    <div class="group">
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
                <div class="editor-content">
                    <div class="page-heading-content">
                        <div class="container">
                            <h1>{{ pageRelatedSettings.title }}</h1>
                            <h2>{{ pageRelatedSettings.subtitle }}</h2>
                            <div class="post-information">
                                <img :src="pageRelatedSettings.authorImage" alt="Main settings image" />
                                <div class="text-information">
                                    <p>{{ pageRelatedSettings.authorName }}</p>
                                    <p>{{ pageRelatedSettings.date }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <editor-content class="page-main-content" :editor="editor" />
                </div>
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
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image';

const props = defineProps<{
    content: string;
    pageRelatedSettings: any;
}>();


const { isAdmin } = useAuth();

const emit = defineEmits(['update:content']);

const editor = useEditor({
    extensions: [
        StarterKit,
        Link,
        Image,
    ],
    content: props.content,
    onUpdate({ editor }) {
        emit('update:content', editor.getHTML());
    }
});

    // watch(() => props.mainSettingsContent, (newSettings) => {
    // if (editor.value) {
    //     editor.value.commands.setContent(`
    //         <h1>${newSettings.title}</h1>
    //         <h2>${newSettings.subtitle}</h2>
    //         <p>${newSettings.description}</p>
    //     `);
    // }
    // }, { deep: true });

function addImage() {
    const url = window.prompt('URL')

    if (url && editor.value) {
        editor.value.chain().focus().setImage({ src: url }).run()
    }
}
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

.tiptap-custom {
    @media (max-width: 1000px) {
        padding: 0rem;
    }
}

.container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: none;
    padding: 0rem 0rem;
    width: 100%;

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

.editor-content {
    width: 100%;
    flex-grow: 1;
    padding-top: 4rem;
}

.editor {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 1000px;
    border: 1px solid var(--grey5);
    border-radius: 0.5rem;
    background-color: var(--off-white);
    box-sizing: border-box;
    margin-bottom: 6rem;
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

.fixed-menu-wrapper {
    position: sticky;
    top: 2.9rem;
    z-index: 10;
    display: flex;
    justify-content: center;
    width: 100%;
    box-sizing: border-box;

    @media (max-width: 767px) {
        position: relative;
        top: 0;
    }
}

.fixed-menu {
    display: flex;
    justify-content: center;
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.02);
    gap: 1rem;
    width: 100%;
    padding: 2rem 1rem;
    border-bottom: 1px solid var(--grey5);
    background: var(--background-color-secondary);
    border-radius: 0.5rem;
    box-sizing: border-box;
    z-index: 1;
    // max-width: 1000px;

    &.inactive {
        flex: 1;
        max-width: 1000px;
    }

    .settings-block {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        gap: 1rem;

        @media (max-width: 610px) {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-auto-flow: row;
        }

        > div {
            @media (max-width: 610px) {
                &.elements {
                    order: 1;
                    grid-column: 1;
                }
                &.actions {
                    order: 2;
                    grid-column: 2;
                }
                &.styles {
                    order: 3;
                    grid-column: 1 / -1;
                }
            }
        }
    }

    .styles {
        // max-width: 400px;

        .wrapper {

        }

        .group {
            display: flex;
            flex-wrap: wrap;
            gap: 0.25rem;
        }
    }
    
    .settings-block > div {
        border-radius: 0.5rem;
        width: auto;
        box-shadow: 0px 0px 30px 0px rgba(0,0,0,0.05);
        padding: 0.8rem;

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
.page-heading-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    // max-width: calc(1000px + 4rem);
    background-color: var(--white1);
    margin: auto;
    border-top: 1px solid var(--grey5);
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    padding: 1rem;
    padding-top: 4rem;

    .container {
        max-width: 1000px;
        margin: auto;
    }
}

.page-main-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    // max-width: calc(1000px + 4rem);
    margin: auto;
    min-height: 1000px;
    padding: 1rem;
    background-color: var(--white1);
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
}

.tiptap, .page-heading-content {
    width: 100%;

    &.ProseMirror-focused {
        &:focus {
            outline: none;
        }
    }

    h1, h2 {
        width: 100%;
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
        font-family: 'Poppins', sans-serif;
        font-size: 2.9rem;
        font-weight: 600; 
        margin-top: 2rem;
        margin-bottom: 1rem;
        line-height: 3.8rem;
    }

    h2 {
        font-size: 1.4rem;
        line-height: 1.8rem;
        color: var(--grey2);
    }

    h3 {
        font-family: 'Inter', sans-serif;
        font-size: 2.6rem;
        font-weight: 800; 
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

    img {
        width: 100%;
        container-type: inline-size;

        // @container (min-width: 600px) {
        //     max-width: 800px;
        //     margin: 0 auto;
        //     display: block;
        // }
    }
}

.tiptap {
    max-width: 1000px;
}
// Add global tip tap styles

</style>