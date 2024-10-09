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
                                    <button @click="editor?.chain().focus().setHeading({ level: 3 }).run()" :class="{ active: editor.isActive('heading', { level: 3 }) }">H1</button>
                                    <button @click="editor?.chain().focus().setHeading({ level: 4 }).run()" :class="{ active: editor.isActive('heading', { level: 4 }) }">H2</button>
                                    <button @click="openImageManager" :class="{ active: editor.isActive('customImage') }">Image</button>
                                </div>
                            </div>
                            <div class="styles">
                                <h6>Styling</h6>
                                <div class="wrapper">
                                    <div class="group">
                                        <button @click="editor?.chain().focus().toggleBold().run()" :class="{ active: editor.isActive('bold') }">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M272-200v-560h221q65 0 120 40t55 111q0 51-23 78.5T602-491q25 11 55.5 41t30.5 90q0 89-65 124.5T501-200H272Zm121-112h104q48 0 58.5-24.5T566-372q0-11-10.5-35.5T494-432H393v120Zm0-228h93q33 0 48-17t15-38q0-24-17-39t-44-15h-95v109Z"/></svg>
                                        </button>
                                        <button @click="editor?.chain().focus().toggleItalic().run()" :class="{ active: editor.isActive('italic') }">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M215.77-215v-72.31h152.69l129.62-385.38H345.39V-745h366.15v72.31H571.15L441.54-287.31h140.38V-215H215.77Z"/></svg>
                                        </button>
                                        <button @click="editor?.chain().focus().toggleBulletList().run()" :class="{ active: editor.isActive('bulletList') }">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M372.31-210v-60H820v60H372.31Zm0-240v-60H820v60H372.31Zm0-240v-60H820v60H372.31ZM206.54-173.46q-27.45 0-46.99-19.55Q140-212.55 140-240q0-27.45 19.55-46.99 19.54-19.55 46.99-19.55 27.45 0 46.99 19.55 19.55 19.54 19.55 46.99 0 27.45-19.55 46.99-19.54 19.55-46.99 19.55Zm0-240q-27.45 0-46.99-19.55Q140-452.55 140-480q0-27.45 19.55-46.99 19.54-19.55 46.99-19.55 27.45 0 46.99 19.55 19.55 19.54 19.55 46.99 0 27.45-19.55 46.99-19.54 19.55-46.99 19.55Zm0-240q-27.45 0-46.99-19.55Q140-692.55 140-720q0-27.45 19.55-46.99 19.54-19.55 46.99-19.55 27.45 0 46.99 19.55 19.55 19.54 19.55 46.99 0 27.45-19.55 46.99-19.54 19.55-46.99 19.55Z"/></svg>
                                        </button>
                                        <button @click="editor?.chain().focus().toggleOrderedList().run()" :class="{ active: editor.isActive('orderedList') }">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M140-100v-47.69h100V-190h-60v-47.69h60V-280H140v-47.69h113.85q14.38 0 24.11 9.73 9.73 9.73 9.73 24.11v47.7q0 14.38-9.73 24.11-9.73 9.73-24.11 9.73 14.38 0 24.11 9.73 9.73 9.73 9.73 24.12v44.61q0 14.39-9.73 24.12T253.85-100H140Zm0-266.15V-470q0-14.38 9.73-24.12 9.73-9.73 24.12-9.73H240v-42.3H140v-47.7h113.85q14.38 0 24.11 9.73 9.73 9.74 9.73 24.12v70q0 14.38-9.73 24.12-9.73 9.73-24.11 9.73h-66.16v42.3h100v47.7H140Zm60-266.16v-180h-60V-860h107.69v227.69H200ZM372.31-210v-60H820v60H372.31Zm0-240v-60H820v60H372.31Zm0-240v-60H820v60H372.31Z"/></svg>
                                        </button>
                                        <button @click="editor?.chain().focus().toggleBlockquote().run()" :class="{ active: editor.isActive('blockquote') }">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m245.69-253.85 93.93-163.46q-3.46 1.92-8.08 2.69t-9.23.77q-61 0-103.58-42.96-42.57-42.96-42.57-103.19 0-61 42.57-103.58 42.58-42.57 103.58-42.57 60.23 0 103.19 42.57Q468.46-621 468.46-560q0 21.08-5.11 39.23-5.12 18.15-14.97 34.62l-133.77 232.3h-68.92Zm355.39 0L695-417.31q-3.46 1.92-8.08 2.69-4.61.77-9.23.77-61 0-103.57-42.96-42.58-42.96-42.58-103.19 0-61.38 42.58-103.77 42.57-42.38 103.57-42.38 60.23 0 103.19 42.57Q823.84-621 823.84-560q0 21.08-5.11 39.23-5.12 18.15-14.96 34.62L670-253.85h-68.92Z"/></svg>
                                        </button>
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
                                    <button @click="editor?.chain().focus().undo().run()">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M288.08-220v-60h287.07q62.62 0 107.77-41.35 45.16-41.34 45.16-102.11 0-60.77-45.16-101.93-45.15-41.15-107.77-41.15H294.31l111.3 111.31-42.15 42.15L180-596.54 363.46-780l42.15 42.15-111.3 111.31h280.84q87.77 0 150.35 58.58t62.58 144.5q0 85.92-62.58 144.69Q662.92-220 575.15-220H288.08Z"/></svg>
                                    </button>
                                    <button @click="editor?.chain().focus().redo().run()">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M384.85-220q-87.77 0-150.35-58.77t-62.58-144.69q0-85.92 62.58-144.5t150.35-58.58h280.84l-111.3-111.31L596.54-780 780-596.54 596.54-413.08l-42.15-42.15 111.3-111.31H384.85q-62.62 0-107.77 41.15-45.16 41.16-45.16 101.93 0 60.77 45.16 102.11Q322.23-280 384.85-280h287.07v60H384.85Z"/></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <floating-menu :editor="editor" :tippy-options="{ duration: 100 }" v-show="!imageManagerPopupOpen().value">
                    <div class="floating-menu">
                        <button @click="editor?.chain().focus().setParagraph().run()" :class="{ active: editor.isActive('paragraph') }">Text</button>
                        <button @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ active: editor.isActive('heading', { level: 3 }) }">H1</button>
                        <button @click="editor?.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ active: editor.isActive('heading', { level: 4 }) }">H2</button>
                        <button @click="openImageManager" :class="{ active: editor.isActive('customImage') }">Image</button>
                    </div>
                </floating-menu>
                <bubble-menu :editor="editor" :tippy-options="{ duration: 100 }">
                    <div v-if="editor?.isActive('customImage')" class="bubble-menu image">
                        <div class="group">
                            <p>Image Fit:</p>
                            <div class="wrapper">
                                <button @click="setImageObjectFit('contain')" :class="{ active: imageObjectFit === 'contain' }">Contain</button>
                                <button @click="setImageObjectFit('cover')" :class="{ active: imageObjectFit === 'cover' }">Fill</button>
                            </div>
                        </div>
                        <div class="group">
                            <p>Height:</p>
                            <div class="height-input wrapper">
                                <button @click="adjustImageHeight('down')" class="height-button">-</button>
                                <span class="height-display">{{ imageHeight }}px</span>
                                <button @click="adjustImageHeight('up')" class="height-button">+</button>
                            </div>
                        </div>
                        <div class="group">
                            <p>Subtitle:</p>
                            <div class="subtitle-input wrapper">
                                <button v-if="!imageHasSubtitle" @click="addImageSubtitle" >
                                    Add Subtitle
                                </button>
                                <button v-else @click="removeImageSubtitle" >
                                    Remove Subtitle
                                </button>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="editor?.isActive('paragraph')" class="bubble-menu paragraph">
                        <div class="group">
                            <p>Styling:</p>
                            <div class="wrapper">
                                <button @click="editor?.chain().focus().toggleBold().run()" :class="{ active: editor.isActive('bold') }">Bold</button>
                                <button @click="editor?.chain().focus().toggleItalic().run()" :class="{ active: editor.isActive('italic') }">Italic</button>
                                <button @click="editor?.chain().focus().toggleStrike().run()" :class="{ active: editor.isActive('strike') }">Strike</button>
                            </div>
                        </div>
                        <div class="group">
                            <p>Link:</p>
                            <div class="link-input wrapper">
                                <button v-if="editor?.isActive('paragraph') && !editor?.isActive('link')" @click="openLinkPopup()" :class="{ active: editor.isActive('link') }">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M424.62-316.92H283.08q-67.68 0-115.38-47.69Q120-412.3 120-479.96t47.7-115.39q47.7-47.73 115.38-47.73h141.54v40H283.08q-50.77 0-86.93 36.16Q160-530.77 160-480t36.15 86.92q36.16 36.16 86.93 36.16h141.54v40ZM340-460v-40h280v40H340Zm195.38 143.08v-40h141.54q50.77 0 86.93-36.16Q800-429.23 800-480t-36.15-86.92q-36.16-36.16-86.93-36.16H535.38v-40h141.54q67.68 0 115.38 47.69Q840-547.7 840-480.04t-47.7 115.39q-47.7 47.73-115.38 47.73H535.38Z"/></svg>
                                    Link
                                </button>
                                <button v-if="editor?.isActive('paragraph') && editor?.isActive('link')" @click="editor?.chain().focus().unsetLink().run()" :class="{ active: editor.isActive('link') }">Unlink</button>
                            </div>
                        </div>
                    </div>
                    <div v-else class="bubble-menu">
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
                                <div class="wrapper author-image"><img class="profile-image" :src="pageRelatedSettings.author_image" /></div>
                                <div class="text-information">
                                    <div class="wrapper">
                                        <div class="group author-title">
                                            <p class="author-name">{{ pageRelatedSettings.author_name }}</p>
                                            <span class=divider>·</span>
                                            <div class="socials">
                                                <a v-if="hasInstagramLink" :href="pageRelatedSettings.social_instagram" :title="`${pageRelatedSettings.author_name}'s Instagram`">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                                </a>
                                                <a v-if="hasFacebookLink" :href="pageRelatedSettings.social_facebook" :title="`${pageRelatedSettings.author_name}'s Facebook`">
                                                    <svg class="facebook" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 32 32"><path d="M 7 5 C 5.90625 5 5 5.90625 5 7 L 5 25 C 5 26.09375 5.90625 27 7 27 L 25 27 C 26.09375 27 27 26.09375 27 25 L 27 7 C 27 5.90625 26.09375 5 25 5 Z M 7 7 L 25 7 L 25 25 L 19.8125 25 L 19.8125 18.25 L 22.40625 18.25 L 22.78125 15.25 L 19.8125 15.25 L 19.8125 13.3125 C 19.8125 12.4375 20.027344 11.84375 21.28125 11.84375 L 22.90625 11.84375 L 22.90625 9.125 C 22.628906 9.089844 21.667969 9.03125 20.5625 9.03125 C 18.257813 9.03125 16.6875 10.417969 16.6875 13 L 16.6875 15.25 L 14.0625 15.25 L 14.0625 18.25 L 16.6875 18.25 L 16.6875 25 L 7 25 Z"></path></svg>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="group">
                                            <p class="created-date">{{ createdDate }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="status">
                                    <span 
                                        class="project-status-label selected"
                                        :class="pageRelatedSettings.status.replace(' ', '-')"
                                        style="cursor: default;"
                                    >
                                        {{ formatStatusName(pageRelatedSettings.status) }}
                                </span>
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
import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/vue-3';
import Link from '@tiptap/extension-link';
import StarterKit from '@tiptap/starter-kit'
import CustomImage from '~/tiptap/extensions/CustomImage'
import { formatFromDDMMYYYYToISO } from '~/utils/date';

import { useAuth } from '../composables/useAuth';
import { useImageManager } from '~/composables/useImageManager';

import { type Image } from '~/types/database';

const { isAdmin } = useAuth();

const { imageManagerPopupOpen, selectImage } = await useImageManager();

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

const hasInstagramLink = computed(() => {
    return props.pageRelatedSettings.social_instagram !== undefined || props.pageRelatedSettings.social_instagram !== '';
});

const hasFacebookLink = computed(() => {
    return props.pageRelatedSettings.social_facebook !== undefined || props.pageRelatedSettings.social_instagram !== '';
});

//@ts-ignore
const handleEditorUpdate = ({ editor }) => {
  try {
    editor.getHTML();

    emit('update:content', editor.getHTML());
  } catch (error) {
    console.error('Error updating editor content:', error);
  }
};

const editor = useEditor({
    extensions: [
        StarterKit,
        Link,
        CustomImage,
    ],
    content: props.content,
    onUpdate: handleEditorUpdate,
});

onErrorCaptured((err, instance, info) => {
  console.error('Error in TipTapEditor:', err, instance, info);
  return false;
});

const imageObjectFit = computed(() => {
    return editor.value?.getAttributes('customImage').objectFit || 'contain'
})

function setImageObjectFit(objectFit: 'cover' | 'contain') {
    editor.value?.chain().focus().updateImageObjectFit(objectFit).run()
}

async function openImageManager() {
  try {
    const selectedImage = await selectImage()
    if (selectedImage) {
        onImageSelected(selectedImage);
    }
    else {
      console.log('No image selected or selection cancelled')
    }
  }
  catch (error) {
    console.error('Error selecting image:', error)
  }
}

function onImageSelected(image: Image) {
    if (image && editor.value) {
        const { state } = editor.value;
        const { $anchor } = state.selection;
        const insertPos = $anchor.pos;

        const isAtEnd = insertPos === state.doc.content.size || insertPos === state.doc.content.size - 1;
        const existingNode = state.doc.nodeAt(insertPos);
        const isExistingImage = existingNode && existingNode.type.name === 'customImage';

        if (isExistingImage === true) {
            console.log('Existing image');
            editor.value.chain().focus().setCustomImage({ src: image.url }).run();
            return;
        }

        if (isAtEnd) {
            editor.value.chain()
                .focus()
                .setCustomImage({ src: image.url })
                .insertContentAt(insertPos, { type: 'paragraph' })
                .run();
        }
        else {
            editor.value.chain()
                .focus()
                .setCustomImage({ src: image.url })
                .run();
        }
    }
    else {
        console.log('No image selected');
        window.alert('No image selected');
    }
}

const getImageHeight = computed(() => {
    const getImageHeight = editor.value?.getAttributes('customImage').height;

    if (getImageHeight) {
        return parseInt(getImageHeight.replace('px', ''));
    }

    return 300;
});

const imageHeight = ref(getImageHeight);

function adjustImageHeight(direction: 'up' | 'down') {
  const adjustment = direction === 'up' ? 50 : -50;
  const newHeight = Math.max(50, imageHeight.value + adjustment); // Ensure height doesn't go below 50px
  imageHeight.value = newHeight;
  editor.value?.chain().focus().updateImageHeight(`${newHeight}px`).run();
}

const getImageHasSubtitle = computed(() => {
    const getImageSubtitle = editor.value?.getAttributes('customImage').subtitle;

    if (getImageSubtitle) {
        return true;
    }

    return false;
});

const imageHasSubtitle = ref(getImageHasSubtitle);

function addImageSubtitle() {
  const subtitle = window.prompt('Enter image subtitle:');
  if (subtitle) {
    editor.value?.chain().focus().addImageSubtitle(subtitle).run();
  }
}

function removeImageSubtitle() {
  editor.value?.chain().focus().removeImageSubtitle().run();
}


function openLinkPopup() {
  const link = window.prompt('Enter the URL');
    if (link) {
        editor.value?.chain().focus().setLink({ href: link }).run();
    }
}

const formatStatusName = (status: string) => {
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

watch(() => props.content, (newContent) => {
    if (editor.value && newContent !== editor.value.getHTML()) {
        editor.value.commands.setContent(newContent);
    }
});

onMounted(() => {
    if (editor.value && props.content) {
        editor.value.commands.setContent(props.content);
    }
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
    position: relative;
    display: flex;
    background-color: var(--gray-3);
    padding: 0.1rem;
    border-radius: 0.5rem;
    gap: 0.25rem;
    z-index: 100;
}

.bubble-menu {
    background-color: white;
    border: 1px solid var(--grey4);
    border-radius: 0.7rem;
    box-shadow: 0px 0px 30px 0px rgba(0,0,0,0.25);
    display: flex;
    padding: 0.3rem;
}

.bubble-menu.image, .bubble-menu.paragraph {
    .group {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 0.25rem; 
        border-right: 1px solid var(--grey4);
        padding: 0rem 0.3rem;
        margin-top: auto;

        &:first-child {
            padding-left: 0rem;
        }

        &:last-child {
            border-right: none;
            padding-right: 0rem;
        }

        .wrapper {
            display: flex;
            gap: 0.25rem;
        }
    }

    p {
        padding: 0.2rem;
        font-family: 'Inter', sans-serif;
        font-size: 0.8rem;
        font-weight: 400;
        color: var(--grey2);
    }

    .height-input {
        display: flex;
        align-items: center;

        span {
            font-family: 'Inter', sans-serif;
            font-size: 0.8em;
            margin: 0rem 0.5rem;
        }
    }
}

.bubble-menu.image {
    width: 391px;
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
    padding: 1rem 1rem;
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
        max-width: 1000px;

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

button:not(.project-status-label) {
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

    &:hover  {
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
        fill: var(--black2);

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
    padding: 0rem 1rem;
    padding-top: 4rem;

    .container {
        max-width: 800px;
        margin: auto;
    }

    .post-information {
        display: flex;
        // align-items: center;
        width: 100%;
        // height: 75px;
        // padding: 0.75rem 0rem;
        // border-bottom: 1px solid var(--grey5);
        // border-top: 1px solid var(--grey5);
 
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

        .status {
            margin-left: auto;
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

        .author-name, .created-date {
            font-family: 'Inter', sans-serif;
            margin-top: 0rem;
            font-weight: 400;
        }

        .author-name {
            font-size: 1rem;
            color: var(--black1);
        }

        .created-date {
            font-size: 0.8rem;
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
    padding-top: 0rem;
    padding-bottom: 6rem;
    background-color: var(--white1);
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
}

// Positional Overrides
.page-main-content {
    .tiptap {
        > h3:first-child {
            margin-top: 2.15rem;
        }

        > h4:first-child {
            margin-top: 2.15rem;
        }

        > h3 + p:first-of-type {
            margin-top: 1.2rem;
        }

        > h4 + p:first-of-type {    
            margin-top: 1rem;
        }

        > p:first-of-type {    
            margin-top: 2.15rem;
        }

        > .image-component:first-of-type {
            margin-top: 2.15rem;
        }

        .image-component + p {
            margin-top: 0rem;
        }

        .image-component + p {
            .image-component {
                margin-bottom: 0rem;
            }
        }

        h3 + p {
            margin-top: 1.2rem;
        }

        h4 + p {
            margin-top: 1rem;
        }
    }
}

// Main styles
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

    h1, h2, h3, h4, p, ul, ol {
        font-family: 'Inter', sans-serif;
        color: var(--black2);
        font-weight: 500;

        strong {
            font-weight: 700;
        }

        em {
            font-style: oblique 6deg;
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
        font-size: 2.2rem;
        font-weight: 600; 
        margin-top: 4rem;
    }

    h4 {
        font-size: 1.4rem;
        font-weight: 600;
        margin-top: 3rem;
    }

    blockquote {
        position: relative;
        margin: 3rem 5%;

        p {
            font-style: oblique 6deg;
            color: var(--grey2);
            font-size: 22px;
        }

        p:nth-child(2n) {
            margin-top: 0rem;
            text-align: right;
            font-size: 20px;
        }
    }

    p {
        font-size: 18px;
        font-weight: 400;
        margin-top: 1.85rem;
        line-height: 32px;

        strong {
            font-weight: 600;
        }

        a {
            color: var(--text-color-main);
            text-decoration: underline;
            font-weight: 500;
            cursor: pointer;
        }
    }

    ul, ol {
        padding: 0 1.4rem;
        margin: 0rem 1.2rem;
        margin-top: 1.15rem;
        margin-bottom: 1.85rem;
        box-sizing: border-box;

        li {
            p {
                margin-top: 0rem;
                margin-bottom: .25rem;

            }
        }
    }

    ul {
        list-style-type: disc;
    }

    ol {
        list-style-type: decimal;
        margin-left: 2.3rem;
        padding-left: 0.5rem;
    }

    .image-component {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 500px;
        margin: 2rem 0rem;

        .image-subtitle {
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            font-style: oblique 6deg;
            color: var(--grey2);
            margin-top: 0.5rem;
        }

        img {
            position: relative;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}

.page-heading-content {
    p {
        line-height: 24px;
    }
}

.tiptap {
    max-width: 800px;
    margin: 0rem auto;
}
</style>