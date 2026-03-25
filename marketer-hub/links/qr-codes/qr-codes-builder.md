---
title: "Customize QR Codes"
slug: qr-codes-builder
---

::: info Attention
Explore Branch’s new linking experience for [Web Links](https://help.branch.io/docs/create-web-links-1#view-and-manage-links) and [App Links](https://help.branch.io/docs/create-app-links-new), which offer deep linking, flexible configuration, and link analysis across multiple platforms!
:::

## Overview

QR codes (Quick Response codes) are a great way to advertise your brand and get users to your mobile app easily.

The **QR Code** [tab](https://dashboard.branch.io/configuration/qr-code) of the **Configuration** [section](https://dashboard.branch.io/configuration/) of the Branch Dashboard allows you to design and edit your Branch QR Code, so that your company's branding remains seamless and consistent, whenever and wherever you use Branch Links.



## QR Codes Customization

::: tip Preview
Making changes to the configuration will automatically update the preview, which is accessible using the **Preview** button in the top-right corner.
:::

The configurator allows you to edit the following elements of your default Branch QR code:

#### Style & Pattern



**Finder Style** lets you change the shape of the three corner elements (top-left, bottom-right, and lower-left) of your QR Code.

**Code Pattern** lets you change the shape of the pattern used for filling out the QR Code.

#### Color



You are also able to change the **Code Pattern Color**, **Background Color**, and **Finder Color**. You can either input an HTML color code (hexadecimal triplet) or use the color picker to choose your preferred color.

#### Images

Additionally, you can either input a valid image URL or upload a file (PNG, JPG, JPEG, or SVG) to change your QR Code's **Center Logo** and/or **Background Image**.

::: info Note
We recommend using images with transparent backgrounds.
:::

#### Save & Reset

When you are satisfied with the result of your customization, you can click the blue **Save** button to confirm your edit, and any newly generate QR Codes created via the Branch QR Code API will have your new design.

Alternatively, if you wish to start over, you may click the **Reset** button to change the settings back to their original state.

## Best Practices

#### Customizing for Scan Reliability

The Branch QR Code can be customized with different colors and logos. These customizations may impact a camera's ability to interpret the Branch QR Code being scanned.

When creating your Branch QR Code, consider the contrast level of your Branch QR Code. Contrast is an important factor in scan reliability. For example, a dark code color on a light background is a safe display option because it would be high contrast.

##### QR Code Physical Sizing

Branch QR Code’s physical sizing should be determined by the QR code's scanning distance and the data to be encoded. The ratio of the scanning distance to the size of the QR code should be close to 10:1, and you can use the following basic rule as described by [scanova.io](https://scanova.io/blog/qr-code-minimum-size/).



##### File Format Best Practices

Branch QR Codes are designed to be high resolution - any file format you download from the Branch Dashboard will give you a Branch QR Code with a resolution of **300 pixels per inch (DPI)** and an image size of **1667 x 1667 pixels**.

However, each file format (PNG, JPEG, and SVG) has its different use cases and benefits. Which one you should use depends on how you plan to use your Branch QR Code.

- **PNG**: Recommended for most general use cases. Larger file size. Can support a transparent background if you upload a background image with a transparent background.
- **JPEG**: Recommended for most general use cases. This includes digital content and printed materials. Not transparent.
- **SVG**: Recommended when being able to resize the image without losing quality is essential. This could include high-quality print materials (posters, flyers, large banners) or certain websites. Can support a transparent background if you upload a background image with a transparent background.