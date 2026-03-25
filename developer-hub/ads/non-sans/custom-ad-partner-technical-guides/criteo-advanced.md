---
title: "Criteo Advanced Configuration"
slug: criteo-advanced
---

[Criteo](http://www.criteo.com) is the global leader in Performance Display. Criteo is a global technology company that enables brands and retailers to connect more shoppers to the things they need and love.

::: tip Tip
For basic Criteo configuration, visit our [Marketer Hub guide](criteo.md).
:::

## Server to server tracking links

If you just need a server to server tracking link, you can use the same flow as, above.

However, at the end, add the following:

- `&%24s2s=true` at the end of your link, so we know it’s a server to server link.
- Device ID macro `&%24idfa=` for iOS devices OR `&%24aaid=` for Android devices.
- Device OS macro `%24os=` for IOS or ANDROID.
- Send IP client’s address via URL parameter or HTTP Header.

```
- IP Header to override the IP information on click. e.g. `x-ip-override: {IP ADDRESS}`.

        - IP URL parameter `&device_ip={IP_Address}`.
```

## Add Static Track Transaction

Static Track Transaction is a custom template that replaces the default PURCHASE (Track Transaction) template. You should see STATIC\_TRACK\_TRANSACTION as an event under the **Postback Config** in the Criteo Partner Manager UI. You can copy the postback template from STATIC\_TRACK\_TRANSACTION, and paste it into the PURCHASE postback, replacing the previous postback. Click Save at the bottom of the screen, and you're good to go!

## Send dates for travel campaigns

Criteo can optimize campaigns based on travel search dates. To report travel search dates to Criteo, follow these steps:

1. In your app, add custom metadata to your events with keys din and dout, and a date string in format 'YYYY-MM-DD' for the date of the inbound and outbound flight respectively.
2. In the Branch dashboard, navigate to Postback Config within the Criteo entry of the Ads Partner Manager.
3. Find the postback you want to edit, and add the following string in the relevant place. For VIEW\_ITEM for example, it's another event in the events array.

```
{"event":"vs","din":<@json>${(custom_data.din)!}</@json>,"dout":<@json>${(custom_data.dout)!}</@json>}
```

## Send hashed emails

Criteo accepts hashed emails from your ad campaigns. To send hashed emails, please follow the below logic.

1. In your app, add [custom metadata](criteo.md#branch-and-criteo-event-mapping) to your events with keys `md5_hashed_email`, and a value of an MD5 hashed email address. Please do not send unhashed emails to Branch.
2. In the Branch dashboard, navigate to Postback Config within the Criteo entry of the Ads Partner Manager.
3. Find the postback you want to edit, and add the following string in the relevant place. This will generally be as another event in the `"events"` array. Please note that \_OPEN \_and \_INSTALL \_events do not support this parameter.

```
{"event":"setHashedEmail", "email":[<@json>${(custom_data.md5_hashed_email)!}</@json>]}
```

## Send non-Branch deep links

Criteo requests all deep links (including non-Branch Links) to be sent to their servers upon app open. Branch doesn't provide this by default, so you'll need to update your SDK initialization to support this.

**If you use any authentication or login libraries, please ensure you strip out all tokens, passwords and other sensitive information before passing this information to Branch.**

To pass the `$criteo_deep_link_url` to Branch, add this code to your AppDelegate or the relevant Activity/Application. You may already have some of this code inside you files, so simply copy the relevant Branch pieces.

**iOS**

```
- (BOOL)application:(UIApplication *)application
        continueUserActivity:(NSUserActivity *)userActivity
        restorationHandler:(void (^)(NSArray *))restorationHandler {

        // NOTE: you should sanitize and ensure no sensitive is passed from
        // userActivity.webpageURL.absolutelString.

        [[Branch getInstance] setRequestMetadataKey:@"$criteo_deep_link_url" value:userActivity.webpageURL.absoluteString];
        [[Branch getInstance] continueUserActivity:userActivity];

        // Process non-Branch userActivities here...
        return YES;
        }

        - (BOOL)application:(UIApplication *)application
        openURL:(NSURL *)url
        sourceApplication:(NSString *)sourceApplication
        annotation:(id)annotation {

        // NOTE: you should sanitize and ensure no sensitive is passed from
        // url.absolutelString.

        [[Branch getInstance] setRequestMetadataKey:@"$criteo_deep_link_url" value:url.absoluteString];
        // Required. Returns YES if Branch link, else returns NO
        [[Branch getInstance]
        application:application
        openURL:url
        sourceApplication:sourceApplication
        annotation:annotation];

        // Process non-Branch URIs here...
        return YES;
        }
```

**Android**

Before you initialize in your Application `onCreate` or Deep Link Activity's `onStart`.  
 You will want to persist the value from `onCreate`, or `onNewIntent`. mIntentData is a String field defined in the activity.

```
@Override
        protected void onCreate() {
        // NOTE: be sure to remove sensitive / PII data from the intent data coming in.
        mIntentData = this.getIntent().getData().toString();
        // other operations below
        }

        @Override
        public void onNewIntent(Intent intent) {
        // NOTE: be sure to remove sensitive / PII data from the intent data coming in.
        mIntentData = this.getIntent().getData().toString();
        // other operations below
        }

        Branch.getInstance().setRequestMetadata(""$criteo_deep_link_url"", mIntentData);

        ...

        Branch.sessionBuilder(this)...init();
```

## Identify users with setIdentity

Branch allows you to identify your users and will send those user identities to Criteo.

The method used to identify users is called `setIdentity`, and the value you set is called the `developer_identity`. Set this upon a user login event in your app, and Branch will use it for all subsequent events attributed to that user.

[Android](android-advanced-features.md#section-track-users)  
[iOS](android-advanced-features.md#section-track-users)

::: danger Do not send emails or PII with setIdentity
To respect user privacy, please do not use names, emails or other identifiable information as your developer identity.
:::

### Branch and Criteo event mapping

Branch supports the full suite of Criteo events. Please talk to your Criteo Solutions Engineer to ensure you've identified the right events for your app.

Important implementation details

- For events with Branch Event Categorization of "Custom Event," you must name the event as laid out in the below table.
- For events with Additional Metadata Keys, you must set the Custom Data on the event with a specific key so the postback is configured correctly for you.

For example, for "UI\_STATUS" the code snippet looks like this:

**iOS**

```
BranchEvent *event = [BranchEvent customEventWithName:@"UI_STATUS"];
        event.customData = (NSMutableDictionary*) @{
        "ui_status": "subscriber"
        };
        event.logEvent() // Log the event.
```

**Android**

```
new BranchEvent("UI_STATUS")
        .addCustomDataProperty("ui_status", "subscriber")
        .logEvent(MainActivity.this);
```

| Branch Event Name | Criteo Name | Branch Event Categorization | Additional Metadata Keys |
| --- | --- | --- | --- |
| OPEN | View Home & appDeeplink | SDK Default | `$criteo_deep_link_url` |
| INSTALL | Install | SDK Default | None |
| VIEW\_ITEMS | View Listing | Content Event | None |
| VIEW\_ITEM | View Product | Content Event | None |
| VIEW\_CART | View Basket | Commerce Event | None |
| PURCHASE | Track Transaction | Commerce Event | None |
| PURCHASE\* | Static Track Transaction | Commerce Event | None |
| ACHIEVE\_LEVEL | UI Level | User Lifecycle Event | `ui_level` |
| UNLOCK\_ACHIEVEMENT | UI Achievement | User Lifecycle Event | `ui_achievement` |
| COMPLETE\_REGISTRATION | Registration | User Lifecycle Event | None |
| COMPLETE\_TUTORIAL | Tutorial Finished | User Lifecycle Event | None |
| UI\_STATUS | UI Status | **Custom Event** | `ui_status` |
| UI\_LOGIN | UI Login | **Custom Event** | None |
| SUBSCRIPTION | Subscription | **Custom Event** | None |
| LOW\_PRIORITY | Low Priority | **Custom Event** | None |
| HIGH\_PRIORITY | High Priority | **Custom Event** | None |
| ABANDONED\_BASKET | Abandoned Basket | **Custom Event** | None |

The Static Track Transaction Postback is available as a custom version of the PURCHASE postback. Please see [Add Static Track Transaction](criteo.md#add-static-track-transaction) for setup.