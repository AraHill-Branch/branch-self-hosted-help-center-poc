---
title: "Roku Testing"
slug: sdk-roku-testing
---

### Sample Test App

1. To test the Branch test Roku app, open `./input/source/libs/Main.brs` and modify the following line:

```
options.branchKey = "key_live_TODO_YOUR_BRANCH_KEY_HERE"
```

2. Replace `key_live_TODO_YOUR_BRANCH_KEY_HERE` with your Branch Key from the [Branch Dashboard](https://branch.dashboard.branch.io/account-settings/profile).

::: info Live vs Test Mode
You can also use your Testing Mode "Test Key" which can be found by changing the toggling in the top left corner of your Branch dashboard from "Live" to "Test"  
The resulting key would look similar to this: key\_test\_TODO\_YOUR\_BRANCH\_KEY\_HERE

Why use Test?  
If you are planning to test a bunch of Event Names that won't be in the Live dashboard reports then using Test Mode will keep names from being added to the event pick list in Live mode.
:::

3. Select all folders (`components`, `images`, `manifest`, `source`) except the `out` folder. Compress these four files into a zip file. Move this zip file to the `out` folder for convenience.
4. Connect to your Roku and upload the zip file. If you have not previously done this, be sure to check out [Roku's guide](https://blog.roku.com/developer/developer-setup-guide) to configuring your device, uploading builds from your computer, and so on. Please email [ottctv@branch.com](mailto:ottctv@branch.com) with any questions.

::: info Note
You can use telnet to view your Roku device logs: `telnet ROKU_LOCAL_IP 8085`, where `ROKU_LOCAL_IP` is your Roku's local IP address.
:::