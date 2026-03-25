---
title: "Best Practices to Minimize Data Sent to Branch"
slug: best-practices-to-minimize-data-sent-to-branch
---

## Overview

To protect user privacy, users of Branch’s services should not send any data to Branch through our services that are considered personally identifiable information (PII).  
  
PII includes, but is not limited to, information such as full name, username, email addresses, and account numbers.

When configuring Branch on a digital property, review the best practices in this document to minimize the data sent to Branch. The information provided in this document is for informational purposes only. You should consult with legal counsel to confirm the sensitivity of the data you plan to send to Branch and any associated legal obligations.

This document will help you understand:

- How Branch treats different types of data—depending on whether they are categorized as personal data, PII, pseudonymous data, or anonymous data.
- Why it’s important to secure personal data before sharing with Branch or other third parties.
- Treatment of various data parameters across Branch’s services.

## PII, Personal Data, Pseudonymous & Anonymous Data

From a privacy perspective, data is often classified into four categories: personally identifiable data, personal data, pseudonymous data, or anonymous data. There are also additional categorizations of data depending on the data protection regulatory scheme, such as protected health information. In general, personally identifiable information includes the more sensitive forms of data that can identify individuals. Unless expressly set out in the permitted data fields below, personal data, PII and other sensitive data should either not be shared with Branch at all or should be pseudonymized or anonymized before being shared with Branch if at all. Below we discuss these different categories of data and some best practices for pseudonymization and anonymization.

### What is Personally Identifiable Information?

At Branch, we treat data as personal data or personally identifiable data depending on the laws of the relevant jurisdiction. Generally, Branch interprets **Personally Identifiable Information** (PII) as information that could be used on its own to directly identify, contact, or precisely locate an individual.  
This includes things like:

- email address
- mailing address
- phone number
- precise location (such as GPS coordinates of four decimal places or more)
- full names or usernames

Branch does not collect PII to provide our services and strongly advises customers not to do so to ensure they are not sending PII to Branch inadvertently.

### What is Personal Data?

**Personal data** is a relatively broad category of data that was introduced in 2018 under the European General Data Protection Regulation and is any information that relates to an identified or identifiable living individual such as IP address, cookie ID, and advertising identifiers like IDFA and GAID. Branch collects Personal Data from customers to provide our services.

### What is Pseudonymous Data?

**Pseudonymous data** is data that is rendered de-identified via a technique that replaces personal data or PII fields in a data record with pseudonyms so that the data record can no longer be attributed to an end user without the use of additional information. Pseudonymization is accomplished by ensuring that identifying reference information is maintained separately via technical and organizational measures to prevent re-identification to an end user.

### What is Anonymous Data?

**Anonymous data** is not linked to an end user’s device and does not specifically identify an end user in any way nor provide the potential for future identification of that end user. For instance, aggregated data that you view in your Branch dashboard on the number of installs in a given time period is anonymous data.

## What is Hashing?

**Hashing** (also known as obfuscation) is a pseudonymization technique whereby a text string (e.g. personal data or PII field) is transformed into an arbitrary numerical value. Hashing is a useful tool for pseudonymizing personal data and PII before sharing it with third parties for a few reasons:

- Hash values are unique, in that it is extremely unlikely that another text string will produce the same hash value.
- Hashing is deterministic, in that the same text string will produce the same hash value every time.
- Hash values are “one-way”, in that it is not possible in practice to take the hash value and reverse the algorithm to reveal the original text string.

Branch utilizes automatic hashing techniques to minimize the personal data we process. Additionally, to the extent you utilize PII in your app’s data records, you should ensure that you hash any such PII before sharing that data with your third-party service providers like Branch to practice data minimization.

### Standard Hashing Algorithms

There are several standard hashing algorithms you can use to encrypt personal data and PII and securely pass it to Branch and other third parties, such as:

- **MD5** – Produces a 128-bit (16-byte) hash value, typically rendered as a 32 digit hexadecimal number.
- **SHA-1** – Produces a 160-bit (20-byte) hash value, typically rendered as a 40 digit hexadecimal number.
- **SHA-256** – Produces a 256-bit (32-byte) hash value, typically rendered as a 64 digit hexadecimal number.

### Hashing Example

Say, for example, your end-user has provided you with their email address – [john@doe.com](mailto:john@doe.com) – which you recognize to be PII and therefore seek to hash it before sending this data to third-party service providers like Branch.

|  |  |
| --- | --- |
| Customer Email Address | [john@doe.com](mailto:john@doe.com) |
| MD5 Hashed Value | 6a6c19fea4a3676970167ce51f39e6ee |
| SHA-1 Hashed Value | fd9c796f4269b3484f9ef436627d0d1cb35071c5 |
| SHA-256 Hashed Value | d709f370e52b57b4eb75f04e2b3422c4d41a05148cad8f81776d94a048fb70af |

When hashing your data, keep in mind that capitalization and punctuation matter. [John@Doe.com](mailto:John@Doe.com) will produce a different hash than [john@doe.com.](mailto:john@doe.com.) The same is true for including parentheses, spaces, or dashes in phone numbers.

## Data at Branch

As part of [Branch’s guiding Privacy Principles](https://legal.branch.io/#branchio-privacypolicy), we practice data minimization, which means that we avoid collecting or storing information that we don’t need to provide our services. The personal data that we collect is limited to data like advertising identifiers, IP addresses, and information derived from resettable cookies. In addition, we take a variety of measures to make sure personal data like this isn’t stored in raw form in our systems for longer than we need it to provide our services.

### Data Branch Hashes

Branch has implemented automated hashing mechanisms for data parameters that are expected to or could reasonably include personal data. The following data parameters are salted and sha256 hashed after 7 days, then stored only in this hashed form thereafter:

- **user\_data\_aaid** - The Google Advertising ID associated with the user.
- **user\_data\_android\_id** - The Android ID associated with the user.
- **user\_data\_browser\_fingerprint\_id** - The web browser fingerprint ID associated with the user.
- **user\_data\_randomized\_device\_token** - The device fingerprint ID associated with the user.
- **user\_data\_developer\_identity** - The developer-specified identity associated with the user.
- **user\_data\_geo\_lat** - Latitude, derived from IP address (above), set server side.
- **user\_data\_geo\_lon** - Longitude, derived from IP address (above), set server side.
- **user\_data\_idfa** - The iOS advertising id of the device where the event occurred. specified by the client.
- **user\_data\_idfv** - The iOS vendor id of the device where the event occurred. Scoped to a vendor e.g. Facebook: idfv is the same for Facebook and Messenger but different Twitter. Specified by the client.
- **user\_data\_ip** - The IP address from which the API call tracking the event originated; set server side.
- **user\_data\_persona\_id** - The ID assigned by Branch’s Persona associated with the user.
- **last\_attributed\_touch\_data\_custom\_fields**

  - **$aaid** - The Google Advertising ID associated with the user.
  - **$idfa** - The iOS advertising ID of the device where the event occurred; specified by the client.
  - **+url** - %24idfa and %24aaid fields are appended to the '+url' as a query param. As such they are stripped and hashed and appended back to the '+url' field.

The following fields are also hashed, but after 60 days. In the case of JSON fields, the listed key-values are hashed, rather than all the data in the top-level JSON object.

- **last\_attributed\_touch\_data\_plus\_referring\_domain**
- **last\_cta\_view\_data\_plus\_referring\_domain**
- **user\_data\_http\_referrer**
- **install\_activity\_touch\_data\_plus\_referring\_domain**
- **install\_activity\_touch\_data\_additional\_data\_plus\_referring\_domain**
- **reengagement\_activity\_touch\_data\_plus\_referring\_domain**
- **reengagement\_activity\_touch\_data\_additional\_data\_plus\_referring\_domain**
- **last\_attributed\_touch\_data\_custom\_fields**, **install\_activity\_touch\_data\_additional\_data\_custom\_fields**, & **reengagement\_activity\_touch\_data\_additional\_data\_custom\_fields**

  - **+referrer**
  - **+url**
  - **$original\_url**
  - **$fallback\_url**
  - **$fallback\_url\_xx**
  - **$canonical\_url**
  - **$desktop\_url**
  - **$ios\_url**
  - **$ipad\_url**
  - **$android\_url**
  - **$samsung\_url**
  - **$huawei\_url**
  - **$windows\_phone\_url**
  - **$blackberry\_url**
  - **$fire\_url**
  - **$ios\_wechat\_url**
  - **$android\_wechat\_url**
  - **$android\_deeplink\_path**
  - **$ios\_deeplink\_path**
  - **$deeplink\_path**
  - **$og\_image\_url**
  - **$og\_video**
  - **$og\_url**
  - **$twitter\_image\_url**
  - **$og\_image**
  - **+apple\_search\_ads\_attribution\_response**
  - **email**
  - **email\_address**
  - **referral\_email**
  - **emailId**
  - **userEmail**
  - **$email**
  - **referrerEmail**
  - **pw**
  - **password**

## PII Best Practices

To protect user privacy, Branch policies strongly discourage you from passing us any data that we could recognize as personally identifiable information (PII).

Branch only collects (and soon thereafter hashes) the Personal Data listed [above](best-practices-to-minimize-data-sent-to-branch.md#data-branch-automatically-hashes).

Branch **does not** intend to collect any of the following PII:

- Email addresses
- Account numbers
- Mailing addresses
- Full names or usernames
- Protected Health Information protected by HIPAA

This is by no means an exhaustive list - if the specific data parameter is not the list in our [Privacy Policy](https://legal.branch.io/#branchio-privacypolicy) and you believe it to be PII or otherwise sensitive data, chances are you shouldn’t be sending it to Branch without at least anonymizing or pseudonymizing it first.

Please follow the best practices outlined below to reduce the risk of sending this PII to Branch.

### Do Not Send Raw PII to Branch

- Do not send raw PII to Branch via any data parameters you configure to collect information.

### Hash PII Before Sending to Branch

- If you do need to send PII through Branch, you must hash it before sending the data to Branch; ideally using the sha256 hashing function.
- Branch does not need to collect the [PII fields mentioned above](best-practices-to-minimize-data-sent-to-branch.md#pii-best-practices) for our services to work, and Branch does not support dedicated parameters for you to pass their hashed versions. If you need to send these hashed fields through Branch, you can do so by passing them into a custom data object via API or SDK. You should work with your account team to make sure this is done correctly before sending this data to Branch.

```
"custom_data": {
    "user_phone_sha256": "15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225",
    "user_email_sha256": "d709f370e52b57b4eb75f04e2b3422c4d41a05148cad8f81776d94a048fb70af"
  },
```

### Developer Identity

- **Developer Identity:** Branch customers can optionally set a custom parameter called Developer Identity by calling the .setIdentity method on our SDKs ([Android](android-advanced-features.md), [iOS](ios-basic-integration.md), [Web](web-advanced-features.md)). Generally this is done when a user logs in and should represent some sort of non-PII user ID.
- If you plan on using your own user identifier to join your offline data with Branch’s data, there are a few things to keep in mind when choosing what value to use as your **Developer Identity**.
- You may **NOT** use an identifier for Developer Identity that contains personally identifiable information (PII). This rules out email addresses, user logins, social security numbers, phone numbers, or any piece of data that is deemed to be "PII".
- You **CAN** use non-obfuscated alphanumeric database identifiers that you might create for your visitors. Another acceptable option is to pass to Branch a hashed or encrypted identifier that is based on PII but that is not Protected Health Information (as defined under HIPAA), as long as you use properly strong hashing or encryption. Branch recommends the use of a strong hashing algorithm and a salt.
- If you want to join Branch data back to your own unhashed internal identifiers, we recommend creating your own internal reference table that matches the raw PII or personal data with its hashed counterpart. Doing so will enable you to line up exported historical Branch data with your own internal databases without sensitive, unhashed data leaving the relative safety of your own systems.

### PII in URLs

- **URLs:** Email is often used for verification as part of site registration and sign-up processes, or in the context of password resets or newsletter signups. These verification emails can sometimes inadvertently include PII in the confirmation/registration link. For instance, `site.com/confirm?email=sample%40email.com&token=413203`.
- If the confirmation page’s URL contains PII and the page hosts Branch’s Web SDK, PII could inadvertently end up in Branch’s systems as part of the URL string.
- **Check links for PII:** Sign up for an account. Check if the URL in the verification/confirmation email includes the email address or other PII. As a best practice, you should never include raw PII in URLs under any circumstances. Instead, hash or encrypt this PII or use a safer, pseudonymous identifier instead.

### PII in Branch Link Data (Including Query Parameters)

- As outlined above, it is against Branch’s policies to include raw PII in Branch Link data. This includes adding PII as query parameters to an otherwise “clean” Branch Link, since Branch will store the full URL
- For example, imagine a Branch Link with a raw email appended as a query param, like this: `https://www.test.app.link/abc123?email=sample%40email.com&token=413203`. Branch will store the **full** URL, including the unwanted PII, in our systems when a user clicks on this link.
- As a best practice, make sure you’re not including raw PII in Branch Link data (even as query parameters added after link creation) by hashing or otherwise pseudonymizing it before appending it.

### HIPAA Disclaimer

- Unless otherwise specified in writing by Branch, Branch does not intend uses of the Branch Services to create obligations under the Health Insurance Portability and Accountability Act, as amended, (“HIPAA”), and makes no representations that the Branch Services satisfy HIPAA requirements. If you are (or become) a Covered Entity or Business Associate under HIPAA, you may not use the Branch Services for any purpose or in any manner involving Protected Health Information unless you have received prior written consent to such use from Branch.