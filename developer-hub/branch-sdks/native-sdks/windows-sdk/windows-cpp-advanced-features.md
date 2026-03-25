---
title: "Windows Advanced Features"
slug: windows-cpp-advanced-features
---

## Create a Branch Instance

Creating a Branch Instance takes a Branch Key, and Application Information.  
Initialize the AppInfo with settings specific to your app.

```
// Set AppInfo properties as necessary
BranchIO::AppInfo _appInfo;

_branchInstance = BranchIO::create("key_live_xxx", &_appInfo);
```

## Create a Branch Session

Creating a Branch Session takes an optional link parameter and a callback.

```
_branchInstance->openSession("", myCallback);
```

## Persistent identities

Often, you might have your own user IDs, or want referral and event data to persist across platforms or uninstall/reinstall. It's helpful if you know the users access the service from different devices. This where we introduce the concept of an 'identity'.

To identify a user, just call:

```
_branchInstance->setIdentity("user id", myCallback);
```

## Logout

If you provide a logout function in the app, be sure to clear the user when the logout completes. This will ensure that all the stored parameters get cleared and all events are properly attributed to the right identity.

```
_branchInstance->logout(myCallback):
```

::: info Note
Neither `setIdentity` nor `logout` can be called before `openSession`. This will generate an error and have no other effect. Once set or removed, the identity or lack of one is persistent.
:::

## Tracking User Actions and Events

### Standard Events

Use the BranchIO::StandardEvent class to track special user actions or application-specific events beyond app installs, opens, and sharing. You can track events such as when a user adds an item to an on-line shopping cart, or searches for a keyword etc. StandardEvent provides an interface to add content(s) in order to associate content(s) with events. You can view analytics for the StandardEvents you fire on the Branch dashboard.

*BranchIO::StandardEvent* enumerate the most commonly tracked events and event parameters that can be used with StandardEvent for the best results. You can always use custom event names and event parameters.

```
#include <BranchIO/Event/StandardEvent.h>

using namespace BranchIO;

StandardEvent event(StandardEvent::Type::PURCHASE);
event.setCoupon("TestCoupon")
     .setCurrency("USD")
     .setDescription("Test Description")
     .setRevenue(99.99)
     .setSearchQuery("Some Search Query")
     .setShipping(1.99)
     .setTax(.99)
     .setTransactionId("Transaction123");

_branchInstance->sendEvent(event, new StandardEventCallback);
```

### Custom Events

Use the BranchIO::CustomEvent class to track special user actions or application-specific events beyond standard Branch events. Custom Events also appear in Branch Dashboard analytics.

```
#include <BranchIO/Event/CustomEvent.h>

using namespace BranchIO;

CustomEvent event(L"MyCustomEvent");
event.setAdType(Event::AdType::BANNER);
event.addCustomDataProperty(L"foo", L"Bar");

_branchInstance->sendEvent(event, new CustomEventCallback);
```

## Enable or Disable User Tracking

If you need to comply with a user's request to not be tracked for GDPR purposes, or otherwise determine that a user should not be tracked, utilize this field to prevent Branch from sending network requests. This setting can also be enabled across all users for a particular link, or across your Branch Links.

```
_branchInstance->getAdvertiserInfo().disableTracking();
```

To enable tracking again once it's been disabled, call `enableTracking` instead of `disableTracking`.

```
_branchInstance->getAdvertiserInfo().enableTracking();
/*
 * When reenabling tracking, it's necessary to open a new session afterward.
 */
_branchInstance->openSession("", myCallback);
```

::: info Note
When reenabling tracking, a new session must be created using `Branch::openSession` before any further SDK calls may be made.
:::

To default to tracking disabled on first launch, add a `REG_DWORD` registry value `trackingDisabled` with value 1 to the key `HKEY_CURRENT_USER\SOFTWARE\BranchIO\`. This prevents deferred deep linking or install attribution. After SDK initialization, call `disableTracking()` to reenable.



## Generating Branch Links

Branch Links can be created in-app. When they are, and `setIdentity` has been called to associate a User ID with the current user session, Branch Links will be associated with that User ID.

```
// you can access this data from any instance that installs or opens the app from this link

BranchIO::LinkInfo linkInfo;
linkInfo
    .addTag("Tag1")
    .setChannel("Sharing_Channel_name")
    .setFeature("my_feature_name")
    .addControlParameter("$android_deeplink_path", "custom/path/*")
    .addControlParameter("$ios_url", "http://example.com/ios")
    .setDuration(100);

// Add some additional control parameters
linkInfo
    .addControlParameter("$canonical_identifier", "item/12345")
    .addControlParameter("$canonical_url", https://branch.io/deepviews")
    .addControlParameter("$og_title", "My Content Title")
    .addControlParameter("$og_description", "my_product_description1")
    .addControlParameter("$og_image_url", "https://example.com/mycontent-12345.png");

// Generate a long branch link, synchronously.
string url = linkInfo.createLongUrl(_branchInstance);

// Create a short branch link, asynchronously (requires a server round trip).
// Falls back to a long URL in case of request failure.
linkInfo.createUrl(_branchInstance, _myCallback);
```

::: info Notes
- The `LinkInfo` destructor blocks until the asynchronous URL request completes. Use `LinkInfo::cancel()` to force immediate termination of the asynchronous request.
- You can customize the Facebook OG tags of each URL if you want to dynamically share content by using the following  
  *optional keys in the data dictionary*. Please use this  
  [Facebook tool](https://developers.facebook.com/tools/debug/) to debug the OG tags.
:::

| Key | Value |
| --- | --- |
| "$og\_title" | The title you'd like to appear for the link in social media. |
| "$og\_description" | The description you'd like to appear for the link in social media. |
| "$og\_image\_url" | The URL for the image you'd like to appear for the link in social media. |
| "$og\_video" | The URL for the video. |
| "$og\_url" | The URL you'd like to appear. |
| "$og\_app\_id" | The OG app ID. Optional and rarely used. |

Also, you do custom redirection by inserting the following *optional keys in the dictionary*:

| Key | Value |
| --- | --- |
| "$desktop\_url" | Where to send the user on a desktop or laptop. By default it is the Branch-hosted text-me service. |
| "$android\_url" | The replacement URL for the Play Store to send the user if they don't have the app. *Only necessary if you want a mobile web splash* |
| "$ios\_url" | The replacement URL for the App Store to send the user if they don't have the app. *Only necessary if you want a mobile web splash* |
| "$ipad\_url" | Same as above but for iPad Store. |
| "$fire\_url" | Same as above but for Amazon Fire Store. |
| "$blackberry\_url" | Same as above but for Blackberry Store. |
| "$windows\_phone\_url" | Same as above but for Windows Store. |

You have the ability to control the direct deep linking of each link by inserting the following *optional keys in the dictionary*:

| Key | Value |
| --- | --- |
| "$deeplink\_path" | The value of the deep link path that you'd like us to append to the URI. For example, you could specify "$deeplink\_path": "radio/station/456" and we'll open the app with the URI "theapp://radio/station/456?link\_click\_id=branch-identifier". This is primarily for supporting legacy deep linking infrastructure. |
| "$always\_deeplink" | **true** or **false**. (default is not to deep link first) This key can be specified to have our linking service force try to open the app, even if we're not sure the user has the app installed. If the app is not installed, we fall back to the respective app store or $platform\_url key. By default, we only open the app if we've seen a user initiate a session in the app from a Branch Link (has been cookied and deep linked by Branch). |