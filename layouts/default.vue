<template>
  <Head>
    <title>Penny Projects</title>
    <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png">
    <link rel="manifest" href="/images/favicon/site.webmanifest">
    <link rel="mask-icon" href="/images/favicon/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">
    <meta name="description" content="Welcome to Penny Projects, a community of people dedicated to seeing a little go a long way." />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="author" content="Joel Slade" />
    <meta name="msapplication-navbutton-color" content="#1c1c20" />
    <meta name="apple-mobile-web-app-status-bar-style" content="#1c1c20" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="msapplication-tap-highlight" content="no" />
    <meta name="robots" content="index, follow" />
    <meta name="googlebot" content="index, follow" />
    <meta name="google" content="notranslate" />
    <meta name="google-site-verification" content="google-site-verification" />
    <meta property="og:image" content="https://www.pennyprojects.org/images/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content="Penny Projects" />
    <meta property="og:title" content="Penny Projects" />
    <meta property="og:description" content="Welcome to Penny Projects, a community of people dedicated to seeing a little go a long way." />
    <meta property="og:url" content="https://pennyprojects.org" />
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-9X0EKVWFPG"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-9X0EKVWFPG');
    </script>
  </Head>
  <main>
    <slot />
  </main>
</template>

<style lang="scss" scoped>

</style>

<script>
import '~/assets/scss/main.scss';
</script>