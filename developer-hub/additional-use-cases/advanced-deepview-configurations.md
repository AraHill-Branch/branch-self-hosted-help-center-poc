---
title: "Advanced Deepview Configurations"
slug: advanced-deepview-configurations
---

## Advanced Configurations

The default Deepview template simply displays the content from three of the link's [control parameters](creating-a-deep-link.md#redirections). You can specify the content of these parameters when creating your link to control what will display in that link’s Deepview. If nothing is set for a particular link, we will gracefully fall back to [the OG values set for your entire app](https://dashboard.branch.io/configuration/general).

| Key | Value |
| --- | --- |
| **$og\_title** | The title you'd like to appear on the deepview |
| **$og\_description** | The description you'd like to appear on the deepview |
| **$og\_image\_url** | The URL for the image you'd like to appear on the deepview |
| **$uri\_redirect\_mode** | Allows you to control how and when Branch uses URI schemes to open your app. 0 - This is the default value that yields the standard behavior where we don't try to open the app if the user can see an error. 1 - Smart redirect mode. Same behavior as 0 until we know the user has the app installed through Branch persona data. In that case, force URI schemes to open the app. 2 - Forceful redirect mode. Always try to force open the app, even if it risks showing an error message when the app is not installed. |

::: info Hosting your own OG tags
If you want to use OG tags you host elsewhere, leave these parameters empty and specify a **$desktop\_url** control parameter when you create the link. Branch will perform a one-time scrape to populate the Deepview using the OG tags from the URL you specify.
:::

If you're creating a link by appending query parameters, just append the parameters to the URL. Please make sure to URL encode everything, lest the link will break.

```
"https://[branchsubdomain]?%24og_title=MyApp%20is%20disrupting%20apps&$og_image_url=http%3A%2F%2Fmyapp.com%2Fimage.png"
```

When you create links via a mobile SDK, you simply need to set the OG tag parameters..

::: code-group

```objectivec [Objective-C]
BranchUniversalObject *branchUniversalObject = [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"];
// Facebook OG tags -- this will overwrite any defaults you set up on the Branch Dashboard
branchUniversalObject.title = @"My Content Title";
branchUniversalObject.contentDescription = @"My Content Description";
branchUniversalObject.imageUrl = @"https://example.com/mycontent-12345.png";

// Add any additional custom OG tags here
[branchUniversalObject addMetadataKey:@"$og_video" value:@"http://mysite/video.mpg"];
```

```swift [Swift]
let branchUniversalObject: BranchUniversalObject = BranchUniversalObject(canonicalIdentifier: "item/12345")
// Facebook OG tags -- this will overwrite any defaults you set up on the Branch Dashboard
branchUniversalObject.title = "My Content Title"
branchUniversalObject.contentDescription = "My Content Description"
branchUniversalObject.imageUrl = "https://example.com/mycontent-12345.png"

// Add any additional custom OG tags here
branchUniversalObject.addMetadataKey("$og_video", value: "http://mysite/video.mpg")
```

```java [Java]
BranchUniversalObject branchUniversalObject = new BranchUniversalObject()
                 .setCanonicalIdentifier("item/12345")
 // Facebook OG tags -- This will overwrite any defaults you have set on the Branch Dashboard
                 .setTitle("My Content Title")
                 .setContentDescription("My Content Description")
                 .setContentImageUrl("https://example.com/mycontent-12345.png")

 // Add any additional custom OG tags here
                 .setContentMetadata(new ContentMetadata().addCustomMetadata("$og_video", "http://mysite/video.mpg"));
```

:::

Note: The *Deep Link* section accepts most link control parameters, but `$og_title`, `$og_description` and `$og_image_url` **cannot** be specified there.

## Enable per-link Deepviews

If you don't want to enable Deepviews globally, you can do it for each platform on a per-link basis by inserting custom link control parameters [link control parameters](creating-a-deep-link.md#section-deepview).

Enable Desktop Deepviews by appending query parameters:

```
"https://[branchsubdomain]?%24desktop_deepview=default_template&%24ios_deepview=default_template"
```

Enable iOS and Android Deepviews through the SDK.

::: code-group

```objectivec [Objective-C]
BranchLinkProperties *linkProperties = [[BranchLinkProperties alloc] init];
 linkProperties.feature = @"sharing";
 linkProperties.channel = @"facebook";
 [linkProperties addControlParam:@"$ios_deepview" withValue:@"default_template"];
 [linkProperties addControlParam:@"$android_deepview" withValue:@"default_template"];
```

```swift [Swift]
let linkProperties: BranchLinkProperties = BranchLinkProperties()
 linkProperties.feature = "sharing"
 linkProperties.channel = "facebook"
 linkProperties.addControlParam("$ios_deepview", withValue: "default_template")
 linkProperties.addControlParam("$android_deepview", withValue: "default_template")
```

```java [Java]
LinkProperties linkProperties = new LinkProperties()
               .setChannel("facebook")
               .setFeature("sharing")
               .addControlParameter("$ios_deepview", "default_template")
               .addControlParameter("$android_deepview", "default_template");
```

:::

## Disable per-link Deepviews

If you've enabled Deepviews globally, it's likely that you'll want to disable them now and again for specific use cases. To do so, just follow the instructions for [*enabling Deepviews for one link*](advanced-deepview-configurations.md#enable-perlink-deepviews) and set one or more of the key values to `false`.

| Key | Value |
| --- | --- |
| `$ios_deepview` | `false` |
| `$android_deepview` | `false` |
| `$desktop_deepview` | `false` |

## Customize a Single Template

Follow the steps below to customize a single Deepview template in the Branch Dashboard (without impacting other templates):

1. Create copy of an existing Deepview:

   1. Navigate to the Branch Dashboard.
   2. Go to **Campaigns → Deepviews → Deepview Manager**.
   3. Select the Deepview you wish to copy.
   4. Create a copy of this Deepview. *Ensure you do not make changes directly to the copied template as it will affect all associated Branch Links.*
   5. Rename the **Title** and **Key** of the copied Deepview.

      1. Example: If the original Deepview is titled `branch_loading_modal`, rename the copy to something like `branch_loading_modal_test`.
   6. Save these changes.
2. Edit the new Deepview with your specific customizations:

   1. Next to your newly created Deepview, click on **Edit**.
   2. Select the **iOS**, **Android**, or **Desktop** tab.
   3. Click on **Editor** to access the HTML/CSS editor.
3. Update the HTML and CSS

   1. In the editor, update the CSS and HTML to display the desired text and icons.
   2. Ensure that your customizations are confined to this particular template.
4. Apply new Deepview to specific Branch Links:

   1. To display this customized Deepview for specific Branch Links, use the `deepview` key in the link data.

      1. Format: `$desktop_passive_deepview = [Name of Deepview Key]`
      2. Example: `$desktop_passive_deepview = branch_loading_modal_test`