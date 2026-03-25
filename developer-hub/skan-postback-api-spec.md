---
title: "SKAN Postback API Spec"
slug: skan-postback-api-spec
---

## Overview

Branch is actively working on a SKAdNetwork solution for our mutual advertisers. The goal is to have ad networks forward Apple Postbacks to Branch via an endpoint. Branch will then validate the postbacks using the Apple-provided cryptographic signature and aggregate the data on the dashboard.

## Requirements

1. Send Apple SKAdNetwork postbacks to our Branch endpoint: `curl -X POST https://api2.branch.io/v1/skadnetwork`
2. Send the following SKAdNetwork data:  
    a. **Required** Send Apple postback as originally received from Apple, sample:

   
::: info Full List of Fields
The full list of fields broken down by which version of SKAdNetwork can be found [here](skadnetwork-data.md).
:::

::: code-group

```json [SKAN 2]
{
  "version": "2.0",
  "ad-network-id": "com.example",
  "campaign-id": 42,
  "transaction-id": "6aafb7a5-0170-41b5-bbe4-fe71dedf1e28",
  "app-id": 525463029,
  "attribution-signature": "MDYCGQCsQ4y8d4BlYU9b8Qb9BPWPi+ixk/OiRysCGQDZZ8fpJnuqs9my8iSQVbJO/oU1AXUROYU=",
 "redownload": True/False,
  "source-app-id": 1234567891,
  "fidelity-type": 1,
  "conversion-value": 20
}
```

```json [SKAN 3]
{
  "version": "3.0",
  "ad-network-id": "9t245vhmpl.skadnetwork",
  "campaign-id": 7,
  "transaction-id": "56e0e737-e3c4-44d0-9737-6ddff601ba01",
  "app-id": 123456789,
  "attribution-signature": "MEUCIQDbSymkqFrHOsTCvfroQVtoSQByBhrHpHcmGd0Rj9Am5gIgYkZeqafuJJ3joNjVP18tcLcDTORrmikcI87t+Gqkdk0=",
 "redownload": false,
  "fidelity-type": 0,
  "conversion-value": 55,
  "did-win": true,
  "ip-address": "17.58.56.232",
  "user-agent": "App Store",
  "partner-campaign-id": "J4gijuk04yCAm8RR",
  "partner-campaign-name": "campaign_name"
}
```

```json [SKAN 4]
{
  "app-id": 1234567890,
  "attribution-signature": "MEUCIAiAL+hpGkXiqY2GbXAy36q/sGHiOAyP/fYBzDeInv40AiEAoXS6AFQlJ9W0KjiuiYTX6cxW1pt62QyAz5o4EpMPQBs=",
 "source-identifier": "15",
  "transaction-id": "ae47a409-0e2a-4649-b0bb-123456789012",
  "version": "4.0",
  "ad-network-id": "2tdux39lx8.skadnetwork",
  "redownload": false,
  "fidelity-type": 0,
  "did-win": true,
  "postback-sequence-index": 0,
  "coarse-conversion-value": "LOW",
  "timestamp": 1710439480,
  "partner-campaign-name": "test_campaign_name",
  "partner-campaign-id": "1861273762809970378",
  "partner-ad-set-name": "test_ad_set_name",
  "partner-ad-set-id": "1861273765427061291"
}
```

:::

3. Optional: Include the following additional data along with the above  
    a.  **partner-campaign-name** - Name of campaign name corresponding to campaign ID (String)  
    b. **partner-campaign-id** - ID of campaign name corresponding to campaign ID (String)  
    c.  **partner-ad-set-id** - (String)  
    d.  **partner-ad-set-name** - (String)  
    e.  **partner-ad-id** - (String)  
    f.  **partner-ad-name** - (String)  
    g.  **partner-creative-id** - (String)  
    h.  **partner-creative-name** - (String)  
    i. **test** - Send as true if sending a ping for testing purposes (Boolean)  
    j. **ip-address** - IP address of device the postback is received from (String)  
    k. **user-agent** - UA of device the postback is received from (String)
4. Please provide Branch your Apple issued Ad Network ID via your Account Manager.

## Responsibilities

**The Ad network’s responsibilities are to:**

- Register and provide its ad network ID to developers. See [Registering an Ad Network](https://developer.apple.com/documentation/storekit/skadnetwork/registering_an_ad_network).
- Provide signed ads to the source app. See [Generating the Signature to Validate an Installation](https://developer.apple.com/documentation/storekit/skadnetwork/generating_the_signature_to_validate_an_installation).
- Receive install validation postbacks at the URL it established during registration.
- Verify the postbacks. See [Verifying an Install Validation Postback](https://developer.apple.com/documentation/storekit/skadnetwork/verifying_an_install_validation_postback).

**The Publisher app’s responsibilities are to:**

- Add the ad network’s ID to its Info.plist. See [Configuring a Source App](https://developer.apple.com/documentation/storekit/configuring-a-source-app).
- Display ads that the ad network signs. See [Ad Network Install Validation Keys](https://developer.apple.com/documentation/storekit/ad-network-install-validation-keys).

**The test app’s responsibilities (implemented in Branch test app) are to:**

- Provide app install validation information by calling [registerAppForAdNetworkAttribution()](https://developer.apple.com/documentation/storekit/skadnetwork/2943654-registerappforadnetworkattributi) or [updateConversionValue(\_:)](https://developer.apple.com/documentation/storekit/skadnetwork/3566697-updateconversionvalue).
- Optionally, update a conversion value by calling [updateConversionValue(\_:)](https://developer.apple.com/documentation/storekit/skadnetwork/3566697-updateconversionvalue).

## Testing

**Download a Testing Profile**  
To reduce the time window for receiving ad attribution postbacks during testing, install the [SKAdNetwork profile](https://developer.apple.com/download/more/?=SKAdNetwork) on your test device. Downloading the profile requires you to log in to your Apple Developer account.

With this profile, the installed app has 5 minutes to update the conversion value after initially registering. The device sends the postback within another 5 minutes after the rolling 5-minute timer for conversion updates expires. Using this profile reduces the conversion value update and postback window from 24-48 hours, to 5-10 minutes.

This profile expires in two weeks. To continue testing, reinstall the profile.

**Generate test events**

- Install Branch Monster Factory App from the AppStore via a test Publisher app.
- Open it to generate Install (first open) or Open events (any following open)
- Create a Monster and Click Share, Copy link to generate a Purchase event

## Conversion Value Mapping Sharing

Branch has the ability to share mutual customers' conversion value mapping for those using the Branch SDK through two different methods:

1. Conversion Value API endpoint
2. Ad network postbacks

Please reach out to your BD contact to get either of these methods set up.

## Additional Info

Apple: [SKAdNetwork](https://developer.apple.com/documentation/storekit/skadnetwork)

Branch: [SKAdNetwork Mobile Integration](https://help.branch.io/using-branch/docs/enable-skadnetwork)

Branch Test App: [Branch Monster Factory](https://apps.apple.com/us/app/branch-monster-factory/id917737838)