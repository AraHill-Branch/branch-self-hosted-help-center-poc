---
title: "Android Instant Apps"
slug: android-instant-apps
---

## Overview

At the 2017 Google IO, Google launched the public version of Instant Apps for developers to adopt and build on. Instant Apps are a way to load a partial section (or `split` as Google refers to them), without the user having to visit the Play Store and install your app. In effect, it's instant access to your native app. If you have been using a website as a fallback when your full Android app is not installed, an Instant App is an alternative. You'll have to choose between mobile web and your Instant App on Android so make sure you plan out your integration!

Branch has made it incredibly easy to start using your basic Branch Links in your Instant Apps as shown below. The guide on this page will walk you through the full configuration process to enable Branch in your new Instant App.



::: info Configuring your Android App to be an Instant App
This guide is not about how to configure your Android app to be an Instant App. Please see [Google's documentation for detailed instructions](https://developer.android.com/topic/instant-apps/index.html) on how to do this. Come back to this guide when you're ready to enable Branch.
:::

## Why Use Branch With Instant Apps

If you follow Google's guide, they'll have you integrate your own web links as Android App Links, that will trigger Instant Apps. What can Branch do for you then? First off, let me explain how Branch works with Instant Apps. Branch will act as a *new* web domain that you'll register for Android App Links in addition to your own web domain or as your only domain in the manifest. We act as your link.

Here's a list of the potential use cases for Branch Links and Instant Apps:

1. Branch will host personalized web links for you, since we provision a custom domain (yourapp.app.link or a domain of your choosing registered in the Branch Dashboard) for every app. If you don't have a website, this means that we can take care of all your Android App Links needs, automatically configuring and hosting the assetlinks.json file on your behalf.
2. If you have a popular website and have configured Android App Links, you likely don't want 100% of your web links triggering your Instant App. Your Instant App will only support a fraction of your full app functionality. You can configure your Instant App to only trigger on your Branch Link domains and paths, then use the usage of Branch to control when users are linked to Instant Apps.
3. Branch can measure and attribute `clicks`, `installs` and custom conversion events back to the Branch tracking link for *all visits to your Instant App*, which are visible on the dashboard.
4. You can use Branch Links to deferred deep link from the Android Instant App to the full Android App. You'll likely build a feature that pushes users from the Instant App to the full Android app, and Branch can do its magic on this transition.
5. Branch can measure and attribute `clicks`, `installs` and custom conversion events inside your full native Android App for users who were referred from an Instant App, showing the conversion from click -> Instant App -> Full App on the dashboard.

## Setup

The steps in this section outline how to integrate the Branch Android SDK into your Android Instant App.

If you'd like to see a real example, check out the [full demo application](https://github.com/BranchMetrics/Branch-Monster-Factory-Example-Android-Instant-Apps) on our Github. We've replicated our [original Android demo application](https://github.com/BranchMetrics/Branch-Example-Deep-Linking-Branchster-Android) and modified it to support Android Instant Apps.

### Initialize Branch Android SDK

Initialize the Branch Android SDK using the following snippet:

```
public class MyApplication extends Application {
  ...
  @Override
  public void onCreate() {
    super.onCreate();
  
    // Initialize the Branch SDK
    Branch.getAutoInstance(this);
  }
  ...
}
```

### Add Branch Keys and Register for Install Referrer

Instant Apps can be rather confusing as there are many different manifests, but you want to find the Manifest that contains your `application` tags. Make sure your Application class name is defined here, and then specify the Branch keys *inside* the `application` element.

```
<application
        android:allowBackup="true"
        android:label="@string/app_name"
        android:theme="@style/AppTheme"
        android:supportsRtl="true"
        android:name=".MyApplication">

  <meta-data android:name="io.branch.sdk.TestMode" android:value="false" /> <!-- Set to true to use Branch_Test_Key -->
  <meta-data android:name="io.branch.sdk.BranchKey" android:value="key_live_my_live_key" />
  <meta-data android:name="io.branch.sdk.BranchKey.test" android:value="key_test_my_test_key" />

  <receiver android:name="io.branch.referral.InstallListener" android:exported="true">
    <intent-filter>
       <action android:name="com.android.vending.INSTALL_REFERRER" />
    </intent-filter>
  </receiver>
</application>
```

If you plan on deep linking from your Android Instant App to your full Android app after it's installed, use the following snippet instead:

```
<application
        android:allowBackup="true"
        android:label="@string/app_name"
        android:theme="@style/AppTheme"
        android:supportsRtl="true"
        android:name=".MyApplication">

  <meta-data android:name="io.branch.sdk.TestMode" android:value="false" /> <!-- Set to true to use Branch_Test_Key -->
  <meta-data android:name="io.branch.sdk.BranchKey" android:value="key_live_my_live_key" />
  <meta-data android:name="io.branch.sdk.BranchKey.test" android:value="key_test_my_test_key" />

</application>
```

With this approach, you'll be utilizing the [Play Install Referrer Library](https://developer.android.com/google/play/installreferrer/library), which is bundled with the SDK. The referrer library returns deep linking information asynchronously, which may impact your startup time. The default timeout is 1.5 seconds.

### Configure Branch Links as Android App Links

This guide presumes that you've already configured Branch for Android App Links in the past.

Now, you simply need to edit the above manifest and paste in the following snippet *inside* the desired `activity.` Then you'll need to replace the `xxxx` with your own custom subdomain which will be visible on [the Branch link settings dashboard](https://dashboard.branch.io/link-settings) at the bottom of the page. If you're using a custom subdomain, you can find the advanced instructions in the above link regarding configuring Android App Links.

```
<application
  ......>

<activity...
  <intent-filter android:autoVerify="true">
      <action android:name="android.intent.action.VIEW" />
      <category android:name="android.intent.category.DEFAULT" />
      <category android:name="android.intent.category.BROWSABLE" />
      <data android:scheme="https" android:host="xxxx.app.link" />
      <data android:scheme="https" android:host="xxxx-alternate.app.link" />
  </intent-filter>
</activity>

</application>
```

#### Custom pathing on your Branch Links

Optionally, when you [create shortened Branch links](creating-a-deep-link.md#section-create-deep-links), you can specify a `alias` parameter (described [here](creating-a-deep-link.md#section-link-appearance)) in the creation flow to define a custom path (e.g. `https://example.app.link/product/id12345` or any custom strings). This can be helpful if you are managing multiple Instant App paths.

### Retrieve Branch Deep Link Data

Add Branch `sessionBuilder()...init()` in Activities which are configured to open from a link click in order to receive the deep link params.

```
protected void onStart() {
    super.onStart();
    Branch.sessionBuilder(this).withCallback(new Branch.BranchReferralInitListener() {
        @Override
        public void onInitFinished(JSONObject referringParams, BranchError error) {
            Log.d("Branch", "onInitFinished() with deep link data: " + referringParams);
        }
    }).init();
}
```

### Deep Link From Instant App to Full App

Now, the user has arrived in your Instant App and you're ready to convert them to install your full native app. Don't worry, Branch has got you covered! We have overridden the default `showInstallPrompt` with a method that auto configures the Google Play prompt with all of the deep link data you need to carry context through install. Additionally, we can provide you the full set of attribution on how many users convert through this prompt.

Branch SDK provides convenient methods to check for app types and full app conversion. This eliminates the dependency on Google IA support SDK (`com.google.android.instantapp`). Here are some of the methods that makes life easy

- `Branch#isInstantApp()`

This convenience methods checks whether the current version of app running is Instant App or Full Android App to allow you convenience

- `Branch#showInstallPrompt()`

This methods shows an install prompt for the full Android app, allowing you an easy way to pass Branch referring deep data to the full app through the install process. Similar to how deferred deep linking works for Branch normally, the full app will receive the deep link params in the handle callback.

The below example shows how to create a custom Branch Universal Object, the associate it with the installation prompt that will be passed through to your full native Android app after the user installs.

```
if (Branch.isInstantApp(this)) {
  myFullAppInstallButton.setVisibility(View.VISIBLE);
  myFullAppInstallButton.setOnClickListener(new OnClickListener() {
    @Override
    public void onClick(View v) {
       BranchUniversalObject branchUniversalObject = new BranchUniversalObject()
            .setCanonicalIdentifier("item/12345")
            .setTitle("My Content Title")
            .setContentDescription("My Content Description")
            .setContentImageUrl("https://example.com/mycontent-12345.png")
            .addContentMetadata("property1", "blue")
            .addContentMetadata("property2", "red");

      Branch.showInstallPrompt(myActivity, activity_ret_code, branchUniversalObject);
    }
  });
} else {
  myFullAppInstallButton.setVisibility(View.GONE);
}
```

## Troubleshooting

You can create Branch Links in a variety of ways, but to quickly test your Branch integration, head to the [Short Links section](https://dashboard.branch.io/quick-links) on our dashboard and create a link. If you configured deep linking via a specific key in the deep link data, make sure that you add it to your Short Link to properly simulate a real live Branch Link.