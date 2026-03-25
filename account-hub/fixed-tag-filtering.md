---
title: "Fixed Tag Filtering"
slug: fixed-tag-filtering
---

Using filters on `tags` in the Branch Dashboard caused some unexpected behavior. View the fix in this update.

## Overview

Previously, when multiple `tags`were added to a Branch Link comparing them in the Branch Dashboard reports would cause rows to "explode out", which leads to duplicate rows and misleading total counts.

Now, true row counts are now respected, with multiple-tagged rows handled in an array-concatenated format.

![](/img/b27c307-Tags.png)

::: tip
Looking to learn more about Branch Dashboard Analytics? View our guide here: [Dashboard Reports](dashboard-reports.md)
:::