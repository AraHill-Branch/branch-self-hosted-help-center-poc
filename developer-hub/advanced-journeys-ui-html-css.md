---
title: "Advanced Journeys UI (HTML & CSS)"
slug: advanced-journeys-ui-html-css
---

## CSS Editor

The Journeys CSS Editor is used to customize the look and feel of how HTML elements are to be displayed on screen.



### Use Custom Font

Use the following code when [configuring creatives](create-journey-banner-or-interstitial.md#2-configure-creatives) **CSS Editor** to use a custom font:

```
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:600,900');

#branch-banner {
  …
  font-family: 'Source Sans Pro', sans-serif;
  …
}
```

### Add Background Images

Use the following code when [configuring creatives](create-journey-banner-or-interstitial.md#2-configure-creatives) **CSS Editor** to use a different background image to existing template objects:

```
#branch-banner .branch-banner-content {
  …
background-image: url('url of your desired image');
  …
}
```



### Animating Journeys

Use the following code when [configuring creatives](create-journey-banner-or-interstitial.md#2-configure-creatives) **CSS Editor** to create an animation using `@keyframes` rule:

```
@keyframes example {
  0% {
    content: "\a\a £5 OFF!";
    transform: translateX(-85%);
  }
 …
100% {
    content: "\a\a £5 OFF!";
  }

.branch-banner-title::after {
  content: "\a\a £5 OFF!";
  …
  animation-name: example;
  animation-duration: 3s;
  animation-iteration-count: infinite;
}
```

::: warning Caveats
It is possible to use GIFs, but compared to CSS animations, GIFs are:

- Larger
- Take longer to load
- Inflexible (have to create a new GIF anytime you want to change something)
:::



### Remove Focus Indicator

To remove unwanted focus indicator borders on your banners, navigate to the **CSS Editor** and add the following code when [configuring creatives](create-journey-banner-or-interstitial.md#2-configure-creatives):

```
#branch-banner .branch-banner-content.focus: {
	outline: color of banner;
}
```



### Specific Screen Sizes (CSS)

There is an ability to customize banners for specific screen sizes or even potentially, specific devices, through the use of CSS @media queries. This is a feature of modern browsers and allows you to add logic and apply CSS formats based on the parameters provided by the browser.

1. You can choose to do this at the `#branch-banner-iframe container` level or at the individual `#branch-banner objects` level.
2. Determine what property changes you want to make and tie them to what is available via `@media` query parameters. For example:

   - You want to make the title, stars, reviews, and icons smaller for smaller screen devices.
   - You might want to provide special formatting for a very specific family of devices.
3. Translate your logic into CSS code. Use resources on the web if you are unfamiliar with the syntax:

   - <https://developer.mozilla.org/en-US/docs/Web/CSS/@media>
   - Web search "@media standard queries" to find some work published to target specific device models, if desired
   - Here's an example that says, for browsers that report a screen width of 1px to 350px, set this CSS:

```
@media only screen and (min-device-width: 200px) and (max-device-width: 350px) {
  #branch-banner .branch-banner-title {
    font-weight: bold;
    color: #333333;
    padding-bottom: 1px;
    font-size: 10px;
  }
  #branch-banner .branch-banner-stars {
    display: inline-block;
    color: rgba(255, 180, 0, 1);
    letter-spacing: -2px;
    font-size: 14px;
    margin-left: -2px;
  }
  #branch-banner .branch-banner-reviews {
    font-size: 10px;
    color: #777;
    display: inline-block;
    margin-left: 4px;
    position: relative;
    top: -1px;
  }
  #branch-banner .branch-banner-icon img {
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }
  #branch-banner .branch-banner-icon {
    float: left;
    border-radius: 10px;
    width: 40px;
    height: 40px;
    margin-right: 10px;
    padding: 10px 0;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    z-index: 2;
  }
```

4. Use the test feature to preview the changes in a separate browser instance while emulating different device models/sizes to ensure the banner renders as intended. Inspect the CSS of the page if necessary to validate that these properties are reflected in the real banner.
5. Lastly, make sure your logical operators do not have any loopholes or cases left without proper CSS formatting. One approach is an inverse block that reads: `@media not screen and (min-device-width: 1px) and (max-device-width: 350px) {` to catch all other screen sizes the only block above ignores.

## HTML Editor

The Journeys HTML Editor is used to customize which elements are present in your banner/interstitial. You have access to all the `<>` elements that make up your Journeys creative for you to play around with.



### Allowed Elements & Attributes

| Element | Attributes |
| --- | --- |
| `<>` | n/a |
| `<>` | n/a |
| `<>` | -`type`  - `id` |
| `<>` | n/a |
| `<>` | - `data-id`  - `data-default`  - `id`  - `class`  - `aria-label`  - `data-star-count`  - `alt`  - `role`  - `tabindex`  - `title` |
| `<>` | - `data-id`  - `data-default`  - `id`  - `class`  - `aria-label`  - `src`  - `alt`  - `role`  - `tabindex`  - `title` |
| `<>` | - `data-id`  - `data-default`  - `id`  - `class`  - `aria-label`  - `style`  - `alt`  - `role`  - `tabindex`  - `title` |
| `<>` | - `data-id`  - `class` |
| `<>` | - `data-id`  - `id`  - `class`  - `aria-label`  - `role`  - `tabindex` |
| `<>` | - `name`  - `content` |
| `<>` | - `data-id`  - `data-default`  - `id`  - `class`  - `aria-label`  - `data-star-count`  - `alt`  - `role`  - `tabindex`  - `title` |

## Page Placement

### Reduce Cumulative Layout Shift

Cumulative Layout Shift (CLS) is part of [Google's PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) that measures the largest burst of layout shift scores for every unexpected layout shift that occurs during the entire lifespan of a page. The CLS score will vary based on the web page setup, the type of banner/interstitial, and page placement.

Google recommends reserving space for banners along with a placeholder option when the actual banner is not shown. Alternatively, this can be managed by using the CSS transform property in the Journeys editor.

Below are guidelines for reducing any negative contribution related to Journeys:

1. Set the Page Placement of the banner/interstitial to the "Customize Container (iFrame)" option



2. Change the CSS based on the type of banner/interstitial:

| Page Placement Setting | Banner Type | Changes Needed | Example |
| --- | --- | --- | --- |
| Inline | - Full Page Interstitial  - Partial Interstitial  - Top Banner | - Add `body { transform: translate(0, );="">`   - Change value of top for `#branch-banner-iframe { top: -;="">`  Please note the value of top is negative. | # branch-banner-iframe {  `top: -456px; left: 0; right: 0; border: 0; height: 100vh; z-index: 99999; box-shadow: 0 0 5px rgba(0, 0, 0, .35); width: 1px; min-width: 100%; position: absolute;`   }   body {  transform: translate(0, 456px);  } |
| Sticky | -Full Page Interstitial  - Partial Interstitial  - Top Banner | - Add `body > * { transform: translate(0, );="">`   - Change value of top for `#branch-banner-iframe { top: -;="">`  Please note the value of top is negative. | # branch-banner-iframe {  `top: -76px; left: 0; right: 0; border: 0; height: 100vh; z-index: 99999; box-shadow: 0 0 5px rgba(0, 0, 0, .35); width: 1px; min-width: 100%; position: absolute;`   }   body>\* {  transform: translate(0, 76px);  } |