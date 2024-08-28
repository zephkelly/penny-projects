<template>
    <section class="new-project-hero component" style="justify-content: center;">
        <div class="container">
            <h1 class="header">New Project</h1>
            <button class="submit">Save</button>
        </div>
    </section>
    <section class="metadata component">
        <Expander
            :startExpanded="true"
            title="Main Settings"
            :totalOptions="6" 
            :completedOptions="5">
            <form class="container">
                <div class="wrapper title date submit">
                    <div class="group">
                        <div class="field title">
                            <label for="title">Title</label>
                            <input class="input-text" id="title" type="text" placeholder="Title" />
                        </div>
                        <div class="field date">
                            <label for="date">Created Date</label>
                            <input class="input-text" id="date" type="text" placeholder="Date" />
                        </div>
                    </div>
                </div>
                <div class="wrapper subtitle">
                    <div class="field subtitle">
                        <label for="subtitle">Subtitle</label>
                        <input class="input-text" id="subtitle" type="text" placeholder="Subtitle" />
                    </div>
                </div>
                <div class="wrapper">
                    <div class="field description">
                        <label for="description">Description</label>
                        <textarea class="input-text" id="description" type="text" placeholder="Description" />
                    </div>
                </div>
                <div class="wrapper cover-image">
                    <div class="field">
                        <label for="cover-image">Cover Image</label>
                        <DragAndDropImageUpload />
                    </div>
                </div>
            </form>
        </Expander>
        <Expander
            title="SEO Settings"
            :totalOptions="6" 
            :completedOptions="5">
            <form class="container">    
                <div class="wrapper uri date submit">
                    <div class="group">
                        <div class="field">
                            <label for="uri">URI</label>
                            <input id="uri" type="text" placeholder="URI" />
                        </div>
                        <div class="field">
                            <label for="date">Created Date</label>
                            <input id="date" type="text" placeholder="Date" />
                        </div>
                    </div>
                    <button type="submit" @click.prevent="">Save</button>
                    </div>
                    <div class="wrapper title">
                    <div class="field">
                        <label for="title">Title</label>
                        <input id="title" type="text" placeholder="Title" />
                    </div>
                    </div>
                    <div class="wrapper subtitle">
                    <div class="field">
                        <label for="subtitle">Subtitle</label>
                        <input id="subtitle" type="text" placeholder="Subtitle" />
                    </div>
                    </div>
                    <div class="wrapper cover-image">
                    <div class="field">
                        <label for="cover-image">Cover Image</label>
                        <DragAndDropImageUpload />
                    </div>
                </div>
            </form>
        </Expander>
    </section>
    <tipTapEditor :content="pageContent" style="justify-content: center;"/>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: ['admin']
})

const pageContent = ref(`
  <h1>Welcome to Our Page</h1>
  <h2>Here is a subheading that you would use for extra context</h2>
  <h3>Features</h3>
  <h4>Features</h4>
  <ul>
    <li>Headers</li>
    <li>Paragraphs</li>
    <li>Lists</li>
  </ul>
  <blockquote>And even blockquotes!</blockquote>
  <p></p>
`);
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

section.new-project-hero {
    margin-top: 14rem;
    margin-bottom: 4rem;
    background-color: var(--background-color-main);
    padding: 0rem 1rem 0rem 1rem;

    .container {
        flex-direction: row;
        justify-content: space-between;
    }
}

.header {
    color: var(--admin);
}

.metadata {
    margin-bottom: 2rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}


form.container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.wrapper {
    display: flex;
    flex-direction: row;
}

.wrapper.title {
    justify-content: flex-start;

    .group {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        width: 100%;

        @media (max-width: 550px) {
            flex-direction: column;
        }
    }

    .title {
        width: 100%;
    }

    .date {
        width: auto;
    }
}

.field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;

    &.description {
        height: 100px;
        width: 100%;

        textarea {
            height: 100%;
            flex: 1;
            min-width: calc(100% - 4px);
            max-width: calc((100% - 4px));
        }
    }
}

input,
textarea {
    margin: 2px;
    font-size: 1rem;
}

input:focus,
textarea:focus {
    outline: 1px solid var(--admin);
}

.wrapper.cover-image {
    .field {
        width: 100%;
    }

    .background {
        background-color: var(--background-color-secondary);
        padding: 1rem;
        border-radius: 0.5rem;
    }
}

button.submit {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 180px;
    padding: 0.5rem 1rem;
    background-color: var(--admin);
    color: var(--background-color-secondary);
    font-size: 1.2rem;
    letter-spacing: 1px;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
    will-change: background-color, color;

    &:hover {
        background-color: var(--admin-dark);
    }
}

.input-text {
    flex: 1;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid var(--admin);
    transition: border-color 0.3s ease;
    will-change: border-color;
}
</style>