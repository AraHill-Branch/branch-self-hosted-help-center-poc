---
title: "Adobe Analytics Configuration"
slug: adobe-analytics-configuration
---

![1328](/img/0aa3903-Adobe_Analytics_branch.png "Adobe Analytics+ branch.png")

## Overview

With the Adobe Analytics Data Integration, you can send Branch data to your Adobe Analytics dashboard, helping you understand the power of Branch as an acquisition pathway.

## How does it work?

Once the Branch SDK is integrated into an app, Branch can detect which Branch Links are leading to installs, re-opens, and users' actions. Enabling this integration and providing your Adobe IDs will result in Branch automatically forwarding referred events to Adobe Analytics, in the exact format Adobe Analytics expects. This includes automatically setting various UTM tags that can be used to determine the source of new users.

### Branch Events Sent to Adobe Analytics

Branch will send *referred* **installs** and **opens**, as well as any **custom** and **commerce** events you track with Branch. Non-referred events, clicks, web session starts, and pageviews will be excluded. Branch also sends all the analytics tags that are attached to the link that drove the referred event. This will allow you to analyze which campaigns, channels, etc. are helping you acquire and engage users.

## What does it look like?

The data that appears in Adobe Analytics is based on how you configure your reports/workspaces stemming from the Processing Rules.

![](/img/5ab242f-adobe_analytics_.png "adobe analytics .png")

## Prerequisites

In order to enable Adobe Analytics, you need to have completed the following:

1. Admin access to your [Branch Dashboard](https://dashboard.branch.io/).
2. Have the Advanced Data Feeds add-on enabled on your Branch account. Advanced Data Feeds can be included as an add-on to both the Engagement and Performance [products](packaging.md).
3. Implemented the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   1. [Track events](track-branch-events.md)
4. [Implement the Adobe Analytics SDK](https://experienceleague.adobe.com/en/docs/mobile).
5. Admin access to your Adobe Analytics account.

## Enable Adobe Analytics

## 1. Retrieve your Adobe Analytics Information

Log into your Adobe Analytics Dashboard. Make sure that you have admin access.

1. Before navigating to the Branch Dashboard, in your Adobe Analytics Dashboard, navigate to the Mobile Marking UI and find your app.
2. Navigate to **Manage App Settings**, scroll down to **SDK Analytics Options**

   ![](/img/261d07a-adobe_analytics_info.png "adobe analytics info.png")
3. Find the following data:

| Branch Field | Adobe Field Value |
| --- | --- |
| Protocol | Use HTTPS |
| Analytics Server Domain | Tracking Server |
| Report Suite ID | Report Suite ID |
| Offline Tracking | Offline Tracking |

::: info Adobe Experience Cloud Debugger
You can also use Adobe Experience Cloud Debugger to find the information about your SDK Analytics Configuration. Here is a link to the help guide [Network Information | Adobe Data Collection](https://experienceleague.adobe.com/en/docs/experience-platform/debugger/network)

If you're still not sure about SDK Analytics Configuration please reach out to the Adobe Support team.
:::

## 2. Connect Adobe Analytics in Branch

In the Branch Dashboard in Data Feeds → [**Data Integrations** tab](https://dashboard.branch.io/data-feeds/integrations), find and search for Adobe Analytics (Processing Rules).

Enter your Adobe Analytics information  
 \* For `Tracking Server/Analytics Server Domain`, do not include `http` or `https`. If your value for this is `https://test.com`, simply put `test.com`.  
 Then click **Enable**

![](/img/265b990-adobe_analytics_enable.png "adobe analytics enable.png")

## 3. Pass Adobe IDs to Branch

::: warning Adobe Launch
This step is not required if the Branch SDK is implemented using the [Adobe Launch](plugins-overview.md) plugin.  
 If this step is not completed, the events that Branch sends to Adobe Analytics will not appear, and it will not connect to other data already tracked by Adobe Analytics.
:::

You'll need to pass through all user IDs configured with Adobe, to the Branch SDKs (There are three possible Adobe IDs this integration can track). First, figure out which ID you use by asking your Adobe Consultant/Account Manager, and then pass that value to Branch by calling the `setRequestMetadata` methods ([iOS](ios-advanced-features.md#set-initialization-metadata) | [Android](android-advanced-features.md#set-initialization-metadata)) of the Branch SDK, **BEFORE** initializing the session on the Branch SDK.

For example, if your Adobe integration uses the Marketing Cloud Visitor ID or Experience Cloud ID, retrieve the ID from Adobe's SDK, and pass it to Branch's SDK with a key called $marketing\_cloud\_visitor\_id. Sample snippets for all ID types below:

### Marketing Cloud Visitor ID / Experience Cloud ID

Value sent to Branch using `$marketing_cloud_visitor_id` key. Value sent to Adobe as `mid`.  
 Check to see if a cloud id is present, if not, initialize Branch within the callback to utilize the returned cloud id, otherwise initialize Branch outside of the Adobe callback. The best practice is to store the cloud id and then reuse it for subsequent app launches

::: code-group

```objectivec [Objective-C]
//Inside *didFinishLaunchingWithOptions*
Branch *branch = [Branch getInstance];
if (experienceCloudId == nil) {
    [ACPIdentity getExperienceCloudId:^(NSString * _Nullable retrievedCloudId) {
        [branch setRequestMetadataKey:@"$marketing_cloud_visitor_id" value:[retrievedCloudId]];
        ...
        [branch initSessionWithLaunchOptions...];
    }];
} else {
    [branch setRequestMetadataKey:@"$marketing_cloud_visitor_id" value:[experienceCloudId]];
    ...
    [branch initSessionWithLaunchOptions...];  
}
```

```swift [Swift]
//Inside *didFinishLaunchingWithOptions*
if let branch = Branch.getInstance() {
  if experienceCloudId == nil {
    ACPIdentity.getExperienceCloudId { (retrievedCloudId) in branch.setRequestMetadataKey("$marketing_cloud_visitor_id", value:retrievedCloudId)
    ...
    branch.initSession(...)  
  } else {
    branch.setRequestMetadataKey("$marketing_cloud_visitor_id", value:experienceCloudId)
    ...
    branch.initSession(...)
  }
}
```

```java [Java]
//Before you initialize the session.
if (experienceCloudId == null) {
  Identity.getExperienceCloudId(new AdobeCallback<String>() {    
    @Override    
    public void call(String id) {
      Branch branch = Branch.getInstance();
      branch.setRequestMetadata("$marketing_cloud_visitor_id", id);
      ...  
      branch.sessionBuilder(this)…init();
    }
  });
} else {
  Branch branch = Branch.getInstance();
  branch.setRequestMetadata("$marketing_cloud_visitor_id", experienceCloudId);
  ...
  branch.sessionBuilder(this)…init();
}
```

:::

### Analytics Custom Visitor ID

Value sent to Branch using the `$analytics_visitor_id` key. Value sent to Adobe as `vid`. This is a custom user ID that can be set using the Adobe SDK.

::: code-group

```objectivec [Objective-C]
//Inside *didFinishLaunchingWithOptions*
//Setting the Identifier with Adobe
[ADBMobile setUserIdentifier:@"Whipple"];
//Passing the Identifier to Branch
Branch *branch = [Branch getInstance];
[branch setRequestMetadataKey:@"$analytics_visitor_id" value:[ADBMobile userIdentifier]]
...
[branch initSessionWithLaunchOptions...]
```

```swift [Swift]
//Inside *didFinishLaunchingWithOptions*
//Setting the Identifier with Adobe
ADBMobile.setUserIdentifier("Whipple")
//Passing the Identifier to Branch
if let branch = Branch.getInstance() {
    branch.setRequestMetadataKey("$analytics_visitor_id", value:ADBMobile.userIdentifier())
    ...
    branch.initSession(...);
}
```

```java [Java]
//Before you initialize the session.
//Setting the Identifier with Adobe
Config.setUserIdentifier(""Whipple"");
//Passing the Identifier to Branch
Branch branch = Branch.getInstance();
Branch.getInstance().setRequestMetadata(""$analytics_visitor_id"", Config.getUserIdentifier());
...
Branch.sessionBuilder(this)...init();
```

:::

### Analytics Visitor ID

Value sent to Branch using the `$adobe_visitor_id` key. Value sent to Adobe as `aid`.

::: code-group

```objectivec [Objective-C]
//Inside *didFinishLaunchingWithOptions*
Branch *branch = [Branch getInstance];
[branch setRequestMetadataKey:@"$adobe_visitor_id" value:[ADBMobile trackingIdentifier]];
...
[branch initSessionWithLaunchOptions...]
```

```swift [Swift]
//Inside *didFinishLaunchingWithOptions*
if let branch = Branch.getInstance() {
    branch.setRequestMetadataKey("$adobe_visitor_id", value:ADBMobile.trackingIdentifier());
    ...
    branch.initSession(...);
}
```

```java [Java]
//Before you initialize the session.
Branch branch = Branch.getInstance();
branch.setRequestMetadata(""$adobe_visitor_id"", Analytics.getTrackingIdentifier());
...
Branch.sessionBuilder(this)...init();
```

:::

## 4. Configure the Adobe Analytics Dashboard

### Configure Processing Rules

1. Open the Report Suite where the data is being sent.
2. Navigate to the **Report suites** under the **Admin** tab.

   ![](/img/275c424-d631051-aa_admin.png "d631051-aa_admin.png")
3. Select a **Report Suite** from the list.

   ![](/img/5bf098b-d0b9fe1-aa_report_suite.png "d0b9fe1-aa_report_suite.png")
4. Navigate to **Edit Settings > General > Processing Rules**.

   ![](/img/878db6f-126f0af-aa_processing_rules.png "126f0af-aa_processing_rules.png")
5. Create new Data Processing Rules using the **Processing Rules** Dashboard.  
   If you are already sending Branch events to Adobe Analytics, you should see a list of Context Variables in the list of available parameters. If you don't see them there, we recommend sending some data and waiting for the list to be updated before configuring the data mapping.  
   Configure Branch data mapping to Adobe Analytics variables.

   ![](/img/56326ee-e70aa60-AA_PR_Mapping_Example.png "e70aa60-AA_PR_Mapping_Example.png")

   For additional assistance on configuring Processing Rules, please visit the [Processing Rules documentation](https://experienceleague.adobe.com/en/docs/analytics/admin/admin-tools/manage-report-suites/edit-report-suite/report-suite-general/c-processing-rules/processing-rules).
6. Save the rules.

## 5. Verify Data Sent

Once the above steps are complete, you are now ready to start launching campaigns. Branch-attributed conversions will be sent to Adobe Analytics. To verify data is being sent from Branch to Adobe Analytics, you can look at the Branch Dashboard's [Liveview Webhook Records](https://dashboard.branch.io/liveview/webhooks) and apply the following filter:

| Filter | Operator | Value |
| --- | --- | --- |
| webhook partner key | equals | di\_adobe\_analytics\_pr |

## Troubleshooting

## Android Latency

If you're concerned about the additional latency, you can call `expectDelayedSessionInitialization` conditionally

```
LauncherActivity.onStart() {
  ...
  Branch.expectDelayedSessionInitialization()
}

asyncOperationCallback() {
  Branch.sessionBuilder(activity).withCallback(callback)...init();
}
```

## Example Data Mapping

You are free to set your own data mapping when configuring the Processing Rules. Here is an example of a classification rule set that may be usable for your use case and Adobe configuration:

| Adobe Classification | Branch Analytics Tag |
| --- | --- |
| Source | Channel |
| Campaign | Campaign |
| Medium | Feature |
| Action | Branch Event Name |
| Action Property | Branch Tags |
| Custom | Custom Data |
| Action Property | Event Timestamp |

## Data isn't appearing after simulating an event

With the Adobe Analytics Dashboard, it may take up to ~2 hours for data to appear. We'd recommend you simulate 10-15 events in one testing session, and validate that they show up two hours later so that feedback is transparent and obvious.

If you're not seeing an Adobe ID appended to the Branch events in Adobe's dashboard, you can call enable logging ([iOS](ios-testing.md#enable-logging) | [Android](android-testing.md#enable-logging)) on the Branch SDK and inspect the requests to `v1/open` in-app to confirm the ID is being sent. The key you want to find in this request payload is either `$adobe_visitor_id`, `$marketing_cloud_visitor_id`, or `$analytics_visitor_id`.

## What is Context Data and where does Branch provide it to Adobe?

When sending server-to-server calls to Adobe, Context Data is the part in-between `&c`. and `&.c` in the server call. This call cannot be seen via the client (for example, it is not available via **Charles Proxy**). To see the detailed Branch server calls, please reach out to your Branch Account Manager. In general, values sent in Context Data can be visualized in the Adobe dashboard, and values outside of Context Data cannot. Values like the user identity (e.g. `vid`, `mid` or `aid`) are sent to Adobe, but not in Context Data, so they can’t be visualized in the Adobe Report Suite. However, they are appropriately formatted for Adobe to log events for that user in Adobe.