---
title: "Pass Hashed Information for Facebook Advanced Matching"
slug: pass-hashed-information-for-facebook-advanced-matching
---

### Overview

Facebook has a way for attribution providers and customers to send up hashed information about users to enhance how they do matching for attribution and analytics. With this data, Facebook can match conversion events to your customers to optimize your ads and build larger re-marketing audiences.

For more information, please see Facebook's document on [Advanced Matching](https://developers.facebook.com/docs/app-events/advanced-matching).

### Fields Passed to Facebook

| User Data | Parameter | Format | Example |
| --- | --- | --- | --- |
| Email | `em` |  | `jsmith@example.com` |
| First Name | `fn` | Lowercase letters | `john` |
| Last Name | `ln` | Lowercase letters | `smith` |
| Phone | `ph` | Digits only including country code and area code | `16505554444` |
| External ID | `external_id` | Any unique ID from the advertiser, such as loyalty membership ID, user ID, and external cookie ID. | `a@example.com` |
| Gender | `ge` | Single lowercase letter, `f` or `m`, if unknown, leave blank | `f` |
| Birthdate | `db` | Digits only with birth year, month, then day | `19910526` for May 26, 1991. |
| City | `ct` | Lowercase with any spaces removed | `menlopark` |
| State or Province | `st` | Lowercase two-letter state or province code | `ca` |
| Zip or Postal Code | `zp` | Digits only | `94025` |
| Country | `country` | Lowercase two-letter country code | `us` |

### Set Hashed Information for the SDK

Branch provides methods in our iOS and Android SDKs to set the hashed information to pass for Facebook Advanced Matching (set before initializing the SDK). Once set, this parameter is attached to install, open, and events until cleared or the app restarts.

::: code-group

```swift [iOS - Swift]
...
//set hash parameters for Facebook Advanced Matching
Branch.getInstance().addFacebookPartnerParameter(withName: "em", value: "11234e56af071e9c79927651156bd7a10bca8ac34672aba121056e2698ee7088")
...
//initialize Branch session
Branch.getInstance().initSession(...)
```

```java [Andriod - Java]
Branch branch = Branch.getAutoInstance(getApplicationContext());
branch.addFacebookPartnerParameterWithName("em", "194b86d986ad041666822dad7602f1a7bac1d9e286273e86141666ffb4b1909b");
```

:::