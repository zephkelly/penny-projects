import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import ImageComponent from '../components/ImageComponent.vue'

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        customImage: {
            setCustomImage: (options: { src: string, alt?: string, title?: string, height?: string | number, objectFit?: 'cover' | 'contain' }) => ReturnType,
            updateImageObjectFit: (objectFit: 'cover' | 'contain') => ReturnType,
            updateImageHeight: (height: string | number) => ReturnType,
            addImageSubtitle: (subtitle: string) => ReturnType,
            removeImageSubtitle: () => ReturnType,
        }
    }
}

export default Node.create({
  name: 'customImage',

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      subtitle: {
        default: null,
      },
      height: {
        default: '300px',
        parseHTML: element => element.style.height,
        renderHTML: attributes => {
          if (!attributes.height) {
            return {}
          }
          const height = typeof attributes.height === 'number' ? `${attributes.height}px` : attributes.height
          return {
            style: `height: ${height}`,
          }
        },
      },
      objectFit: {
        default: 'contain',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="custom-image"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', { 'data-type': 'custom-image' }, ['img', mergeAttributes(HTMLAttributes)]]
  },

  addNodeView() {
    return VueNodeViewRenderer(ImageComponent)
  },
  
  addKeyboardShortcuts() {
    return {
        Enter: ({ editor }) => {
          if (editor.isActive(this.name)) {
            const { $anchor } = editor.state.selection
            const pos: number = $anchor.pos + 1;
            editor.chain().focus().insertContentAt(pos, { type: 'paragraph' }).run()
            return true
          }
          return false
        },
      }
  },

  addCommands() {
    return {
      setCustomImage: options => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: options,
        })
      },
      updateImageObjectFit: objectFit => ({ tr, state }) => {
        const { selection } = state
        const node = state.doc.nodeAt(selection.from)
        if (node && node.type.name === this.name) {
          tr.setNodeMarkup(selection.from, null, {
            ...node.attrs,
            objectFit,
          })
          return true
        }
        return false
      },
      updateImageHeight: height => ({ tr, state }) => {
        const { selection } = state
        const node = state.doc.nodeAt(selection.from)
        if (node && node.type.name === this.name) {
          const newHeight = typeof height === 'number' ? `${height}px` : height
          tr.setNodeMarkup(selection.from, null, {
            ...node.attrs,
            height: newHeight,
          })
          return true
        }
        return false
      },
      addImageSubtitle: subtitle => ({ tr, state }) => {
        const { selection } = state
        const node = state.doc.nodeAt(selection.from)
        if (node && node.type.name === this.name) {
          tr.setNodeMarkup(selection.from, null, {
            ...node.attrs,
            subtitle,
          })
          return true
        }
        return false
      },
      removeImageSubtitle: () => ({ tr, state }) => {
        const { selection } = state
        const node = state.doc.nodeAt(selection.from)
        if (node && node.type.name === this.name) {
          const newAttrs = { ...node.attrs }
          delete newAttrs.subtitle
          tr.setNodeMarkup(selection.from, null, newAttrs)
          return true
        }
        return false
      },
    }
  },
})