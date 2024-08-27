<template>
    <ProjectsNewHero />
    <section class="metadata component">
        <Expander
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
                    <button class="submit" type="submit" @click.prevent="">Publish</button>
                </div>
                <div class="wrapper subtitle">
                <div class="field">
                    <label for="subtitle">Subtitle</label>
                    <input class="input-text" id="subtitle" type="text" placeholder="Subtitle" />
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
        margin-right: 3rem;
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
    padding: 2px;
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
    width: 180px;
    height: 46px;
    background-color: var(--admin);
    color: var(--background-color-secondary);
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
    will-change: background-color, color;
}

.input-text {
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid var(--admin);
    transition: border-color 0.3s ease;
    will-change: border-color;
}
</style>