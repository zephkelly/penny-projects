<template>
    <NodeViewWrapper class="image-component" :style="{ height: node.attrs.height }">
        <img 
            :src="node.attrs.src" 
            :alt="node.attrs.alt" 
            :title="node.attrs.title" 
            :style="{ objectFit: node.attrs.objectFit, height: '100%', width: '100%' }" 
        />
        <p v-if="node.attrs.subtitle" class="image-subtitle">{{ node.attrs.subtitle }}</p>
    </NodeViewWrapper>
</template>
  
<script>
import { NodeViewWrapper } from '@tiptap/vue-3'

export default {
    components: {
        NodeViewWrapper,
    },
    props: {
        node: {
            type: Object,
            required: true,
        },
        updateAttributes: {
            type: Function,
            required: true,
        },
    },
    // computed: {
    //     componentHeight() {
    //         return typeof this.node.attrs.height === 'number' ? `${this.node.attrs.height}px` : this.node.attrs.height;
    //     }
    // }
}
</script>

<style scoped>
.image-component {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

}
img {
    width: 100%;
    height: 100%;
}
</style>