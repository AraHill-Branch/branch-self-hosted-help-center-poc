---
title: "SDK Privacy Controls"
slug: sdk-privacy-controls
---

## Overview

If you have determined that a user doesn't want to be tracked by third-party data processors, and that this preference extends to disabling elements of your core functionality, the Branch SDKs allow you to honor this right. You can flag in the Branch SDK that a particular user has requested that their data not be processed by Branch, in which case Branch will no longer process engagement data on your behalf for that user.

Branch supports the following methods to honor end user data privacy:

- [Restricting End User Data Processing](honoring-opt-out-of-processing-requests.md)
- [Filtering Ad Network Data](filtering-ad-network-data.md)

## FAQ

<details>
<summary>How does Limit Ad Tracking impact Branch attribution?</summary>

A user's Limit Ad Tracking preference is passed through from Branch to ad networks. The ad network can then decide whether or not to target the user. The value of the flag does not explicitly affect attribution.

Having said that, when limit ad tracking is enabled on iOS, no IDFA is made available on the device. This means that for iOS users with limit ad tracking enabled, Branch will not make calls to self-attributing networks (e.g. Twitter, Facebook, Google, Snap) using the IDFA. However, Branch will use IDFV instead when available.

For more privacy tools, including the ability to opt users out of Branch attribution, please visit our docs page on [SDK Privacy Controls](https://help.branch.io/developers-hub/docs/sdk-privacy-controls).

</details>