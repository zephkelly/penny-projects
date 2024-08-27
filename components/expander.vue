<template>
    <div class="expander container" :class="{ 'is-expanded': isExpanded }">
      <div class="expander-header" @click="toggle" :class="{ 'completed': isCompleted, 'is-expanded': isExpanded, 'incomplete': isIncompleted }">
        <div class="expander-title">
          <h3>{{ title }}</h3>
        </div>
        <div class="expander-toggle">
            <span v-if="totalOptions > 0" class="completion-status" :class="{ 'completed': isCompleted }">
                {{ completedOptions }}/{{ totalOptions }}
            </span>
            <svg :class="{ 'is-expanded': isExpanded }" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
      </div>
      <div class="expander-content" :class="{ 'is-expanded': isExpanded }">
        <div class="expander-content-inner">
          <slot></slot>
        </div>
      </div>
    </div>
  </template>
  
<script setup lang="ts">
    const props = defineProps({
        title: {
            type: String,
            required: true
        },
        totalOptions: {
            type: Number,
            default: 0
        },
        completedOptions: {
            type: Number,
            default: 0
        }
    });

    const emit = defineEmits(['update:completed']);
    
    const isExpanded = ref(false);
    const isCompleted = ref(false);
    const isIncompleted = ref(false);
    
    const toggle = () => {
        isExpanded.value = !isExpanded.value;
    };
    
    const completionPercentage = computed(() => {
        if (props.totalOptions === 0) return 0;
        return (props.completedOptions / props.totalOptions) * 100;
    });

    watch(() => props.completedOptions, (newValue) => {
        isCompleted.value = newValue === props.totalOptions;
        emit('update:completed', isCompleted.value);
    }, { immediate: true });
</script>
  
<style scoped lang="scss">
    .expander {
        border-radius: 4px;
        margin-bottom: 1rem;
        width: 100%;
        flex-direction: column;
        padding: 0;
        transition: margin-bottom 0.3s ease;
        will-change: margin-bottom;

        * {
            font-family: 'Inter', sans-serif;
            box-sizing: border-box;
        }

        &.is-expanded {
            margin-bottom: 4rem;
        }

        &:last-of-type {
            margin-bottom: 1rem;
        }
    }
    
    .expander-header {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        cursor: pointer;
        border: none;
        border-bottom: 1px dashed var(--background-color-secondary);
        background-color: var(--background-color-secondary);
        box-sizing: border-box;
        border-radius: 8px;
        font-weight: 500;
        transition: border-color 0.3s 0.3s ease, padding 0.3s ease, background-color 0.3s 0.3s ease, border-radius 0.3s ease, border 0.3s ease, border-bottom 0.3s ease;
        will-change: border-color, padding, background-color, border-radius;

        &.completed {
            border: 1px solid var(--background-color-secondary);
        }

        &.incompleted {
            border: 1px solid var(--error);
        }

        &.is-expanded {
            padding: 1rem 0rem;
            border-bottom: 1px dashed var(--black2);
            background-color: transparent;
            transition: border-color 0.3s ease, padding 0.3s ease, background-color 0.3s ease, border 0.3s ease;
            border-bottom-left-radius: 0px;
            border-bottom-right-radius: 0px;
        }
    }
    
    .expander-title {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        height: 100%;
    }
    
    .expander-header h3 {
        
        font-size: 1.2rem;
        margin: 0;
    }

    .expander-toggle {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .completion-status {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        padding: 0.4rem 0.7rem;
        font-weight: 700;
        letter-spacing: 1px;
        color: var(--background-color-secondary);
        background-color: var(--error);
        border-radius: 12px;
        transition: background-color 0.3s ease, color 0.3s ease;
        will-change: background-color, color;
    }

    .completion-status.completed {
        background-color: #4caf50;
        color: white;
    }

    .expander-settings.is-completed {
        border: 2px solid #4caf50;
    }
    
    .expander-header svg {
        transition: transform 0.2s ease;
    }
    
    .expander-header svg.is-expanded {
        transform: rotate(180deg);
    }
    
    .expander-content {
        max-height: 0;
        flex: 1;
        transition: max-height 0.4s ease;
        will-change: max-height;
        overflow: hidden;
    }
    
    .expander-content.is-expanded {
        max-height: 1000px;
    }
    
    .expander-content-inner {
        flex: 1;
        padding: 0rem;
        padding-top: 1.5rem;
    }
</style>