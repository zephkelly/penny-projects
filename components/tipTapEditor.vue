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
                                <div class="wrapper author-image"><img class="profile-image" :src="pageRelatedSettings.authorImage" /></div>
                                <div class="text-information">
                                    <div class="wrapper">
                                        <div class="group author-title">
                                            <p class="author-name">{{ pageRelatedSettings.authorName }}</p>
                                            <span class=divider>·</span>
                                            <div class="socials">
                                                <a v-if="hasInstagramLink" :href="pageRelatedSettings.author_instagram" :title="`${pageRelatedSettings.authorName}'s Instagram`">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                                </a>
                                                <a v-if="hasFacebookLink" :href="pageRelatedSettings.author_facebook" :title="`${pageRelatedSettings.authorName}'s Facebook`">
                                                    <svg class="facebook" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 32 32"><path d="M 7 5 C 5.90625 5 5 5.90625 5 7 L 5 25 C 5 26.09375 5.90625 27 7 27 L 25 27 C 26.09375 27 27 26.09375 27 25 L 27 7 C 27 5.90625 26.09375 5 25 5 Z M 7 7 L 25 7 L 25 25 L 19.8125 25 L 19.8125 18.25 L 22.40625 18.25 L 22.78125 15.25 L 19.8125 15.25 L 19.8125 13.3125 C 19.8125 12.4375 20.027344 11.84375 21.28125 11.84375 L 22.90625 11.84375 L 22.90625 9.125 C 22.628906 9.089844 21.667969 9.03125 20.5625 9.03125 C 18.257813 9.03125 16.6875 10.417969 16.6875 13 L 16.6875 15.25 L 14.0625 15.25 L 14.0625 18.25 L 16.6875 18.25 L 16.6875 25 L 7 25 Z"></path></svg>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="group">
                                            <p class="created-date">{{ createdDate }}</p>
                                        </div>
                                    </div>
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

import { formatFromDDMMYYYYToISO } from '~/utils/date';

const { isAdmin } = useAuth();

const emit = defineEmits(['update:content']);
const props = defineProps<{
    content: string;
    pageRelatedSettings: any;
}>();

const createdDate = computed(() => {
    const isoString = formatFromDDMMYYYYToISO(props.pageRelatedSettings.created_date);
    const deconstructedDate = getDeconstructedDate(isoString);

    return `${deconstructedDate.day_number} ${deconstructedDate.month_string}, ${deconstructedDate.year_number}`;
});

const hasFacebookLink = computed(() => {
    return props.pageRelatedSettings.author_facebook !== undefined;
});

const hasInstagramLink = computed(() => {
    return props.pageRelatedSettings.author_instagram !== undefined;
});

const editor = useEditor({
    extensions: [
        StarterKit,
        Link,
        Image,
    ],
    content: props.content,
    // onUpdate({ editor }) {
    //     emit('update:content', editor.getHTML());
    // }
});

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

    .post-information {
        display: flex;
        align-items: center;
        width: 100%;
        height: 52px;
 
        .wrapper.author-image {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--grey5);
            overflow: hidden;

            .profile-image {
                display: flex;
                min-width: 53px;
                height: 53px;
                object-fit: cover;
            }
        }
    }

    .text-information {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        height: 100%;
        // flex: 1;
        // height: 100%;
        margin-left: 1rem;

        .group.author-title {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 0.25rem;

            .socials {
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 0.25rem;

                a {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }

            svg:first-child {
                margin-left: 1px;
            }

            svg {
                width: 16px;
                height: 16px;
                fill: var(--black2);
                margin: 0px 4px;
                transition: fill 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
                will-change: fill;

                &:hover {
                    fill: var(--text-color-main);
                }
            }

            svg.facebook {
                padding-bottom: 0.191px;
                width: 22px;
                height: 22px;
            }

            
            span.divider {
                font-size: 24px;
                margin: 0px 8px;
                user-select: none;
            }
        }

        .wrapper {
            height: 90%;
            display: flex;
            flex-direction: column;
        }

        .author-name {
            font-family: 'Inter', sans-serif;
            font-size: 1rem;
            font-weight: 400;
            color: var(--black1);
        }

        .created-date {
            font-family: 'Inter', sans-serif;
            font-size: 0.8rem;
            font-weight: 400;
            color: var(--grey2);
        }
    }
}

.page-main-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
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
        line-height: 3.8rem;
    }

    h2 {
        font-size: 1.4rem;
        line-height: 1.8rem;
        color: var(--grey2);
        margin-top: 0.4rem;
        margin-bottom: 30px;
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

.tiptap {
    max-width: 1000px;
}
// Add global tip tap styles

</style>