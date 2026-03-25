---
title: "Roku Basic Integration"
slug: sdk-roku-basic-integration
---

## Prerequisites

In order to implement the Branch SDK into your Roku app, you need to have/complete the following:

1. Create a [Branch Dashboard](https://dashboard.branch.io/).

   - Obtain your [Branch Key](https://dashboard.branch.io/account-settings/profile).
2. Create a [Roku Account](https://my.roku.com/account).

   - Purchase a [Roku TV or Streaming Device](https://www.roku.com/en-gb/products/players)
   - Enroll in [Roku's Developer Program](https://developer.roku.com/en-gb/enrollment/standard)

## 1. Set Up Development Environment

The first step you should take is to set up your development environment for Roku.

- Enable Developer Mode on your Roku Device
- Get your device's IP Address and set a pasword
- Use the local IP address in your browser to access the developer workstation

  - Log in using the credentials you set

For a detailed guide on this, visit Roku's Developer Docs [here](https://developer.roku.com/docs/developer-program/getting-started/developer-setup.md).

*[Image: 794]*

## 2. Install Branch

You must download the Branch Roku SDK and retrieve the following library files:

- [BranchSdkLibrary.brs](https://github.com/BranchMetrics/branch-roku-sdk/blob/master/source/libs/BranchSdkLibrary.brs)
- [BranchSdkTask.xml](https://github.com/BranchMetrics/branch-roku-sdk/blob/master/components/tasks/BranchSdkTask.xml)
- [BranchSdkTask.brs](https://github.com/BranchMetrics/branch-roku-sdk/blob/master/components/tasks/BranchSdkTask.brs)

1. Create a new folder called `tasks` in the `components` folder of your application.
2. Copy both the `BranchSdkTask.xml` and `BranchSdkTask.brs` files into your project's new tasks folder.
3. Create a new folder called `libs` in the `source` folder of your application.
4. Copy the `BranchSdkLibrary.brs` file from the Branch repo into your project's new libs folder

In the end, your application's folder structure should look like this:

```
 └──  components
 │   └── tasks
 │       └──  BranchSdkTask.brs
 │       └── BranchSdkTask.xml
 └── source
       └── libs
           └── BranchSdkLibrary.brs
```

## 3. Configure Branch

In the `Main.brs` file of your project (the entry point of the SceneGraph application). add `ConfigureBranchSdk(screen)` using your an `roSGScreen` object.

Be sure to use your Branch Key obtained from the steps in the “Prerequisites” section of this article.

```
sub Main(args as dynamic)
	screen = CreateObject("roSGScreen")
	' Set Branch SDK configurations'
	ConfigureBranchSdk(screen)

	' Other screen configs below'
end sub
          
sub ConfigureBranchSdk(screen as dynamic)
    options = {}
    options.branchKey = "key_live_XXXX"
    options.logLevel = BranchSdkConstants().LOG_LEVEL.DEBUG
    options.environment = BranchSdkConstants().ENVIRONMENT.PRODUCTION

    ' Set Branch SDK configuration parameter as required'
    screen.getGlobalNode().addFields({branchSdkConfig: options})
end sub
```

You can view an example `Main.brs` [here](https://github.com/BranchMetrics/branch-roku-sdk/blob/master/source/Main.brs).

## 4. Initialize Branch

### 4.1 Add the Branch SDK Script

Open your main `Scene` file (ex. `MainScene.xml`) in your `components` folder, and add a new script file path for `BranchSdkLibrary.brs`

```
<?xml version="1.0" encoding="utf-8" ?>
<component name="MainScene" extends="Scene">
	<script type="text/brightscript" uri="pkg:/components/MainScene.brs"/>
	<!-- Replace with correct path if necessary -->
	<script type="text/brightscript" uri="pkg:/source/libs/BranchSdkLibrary.brs"/>
	<!-- Other Scripts Below -->
</component>
```

You can view an example `MainScene.xml` [here](https://cdn.us.document360.io/082e8be0-ad38-4650-9062-689a75e517a2/Images/Documentation/MainScene.xml).

### 4.2 Create & Initialize the Branch Instance

Next, open your main `Scene's` `.brs` file (ex. `MainScene.brs`), and create & initialize the Branch instance inside `sub init()` with a callback. This will initialise an app open event.

```
sub init()
  ' Other init Configs...'

  ' BRANCH SDK INTEGRATION - Create Instance'
  m.branchSdkObj = CreateBranchSdkForSceneGraphApp()

  if (m.branchSdkObj = invalid) then
    ShowMessageDialog("Failed to initialize Branch SDK!")
  else
    ' BRANCH SDK INTEGRATION - Initialize Branch'
    m.branchSdkObj.initSession(m.global.launchArgs, "OnInitSessionCallbackFunc")
  end if
    
  ' Other init Configs...'
end sub

function OnInitSessionCallbackFunc(event as object) as void
  data = event.GetData()
  print "OnInitSessionCallbackFunc: " data
    
  if (data <> invalid) then
    m.lSessionApiResultDetails.text = FormatJson(data)
  else
    m.lSessionApiResultDetails.text = "initSession API response received!"
  end if
    
  message = "API Succeeded!"
  if (data.error <> invalid)
    message = "API Error!"
  else
    print "Branch initSession details: " + message
  end if
end function
```

You can view an example `MainScene.brs` [here](https://github.com/BranchMetrics/branch-roku-sdk/blob/master/components/MainScene.brs).

## 5. Configure Deep Linking

When your Branch session is initialized, you'll want to configure your deep linking routing logic through a new `sub` method and handled through a callback function.

There are two primary ways in which links can trigger the Roku app to respond `/launch/{channel}` and `/input`. Here are curls that indicate the format of these links, which you can modify and use for testing:

::: code-group

```custom [/launch/{channel}]
curl -d '' 'http://ROKU_LOCAL_IP:8060/launch/dev?contentId=1234&mediaType=movie'
```

```custom [/input]
curl -d '' 'http://ROKU_LOCAL_IP:8060/input?contentId=1234&mediaType=movie'
```

:::

In both cases, please send up the data (`contentId`, `mediaType`, and any other query parameters) to Branch through the `handleInput(...)` method.

::: info Deep Linking Format
For proper deep linking, please make sure that you are using a correct format, ex. `contentId=1234&mediaType=movie`
:::

For a detailed guide on deep link routing please refer to Roku's dev docs on [deep linking](https://developer.roku.com/en-gb/docs/developer-program/discovery/implementing-deep-linking.md).

Roku also provides a useful deep link [testing tool](http://devtools.web.roku.com/DeepLinkingTester/).

```
sub init()
  ' After Branch is initialized...'
  HandleInput_Clicked()
end sub

sub HandleInput_Clicked()
  if (m.branchSdkObj = invalid) then
    print "Branch SDK is not initialized!"
    return
  end if

  print "Calling Branch HandleInput API"
  print "m.global.launchArgs : " m.global.launchArgs
  if (m.global.launchArgs <> invalid) then
    ' BRANCH SDK INTEGRATION - Call API'
    m.branchSdkObj.handleInput(m.global.launchArgs, "OnHandleInputCallbackFunc")
  else
    print "Please provide deep linking arguments!"
  end if
end sub
    
function OnHandleInputCallbackFunc(event as object) as void
  data = event.GetData()
  print "OnHandleInputCallbackFunc: " data
    
  m.global.launchArgs = invalid
  message = "API Succeeded!"

  if (data.error <> invalid)
    message = "API Error!"
  end if
    print "handleInput: " + message
end function
```

## 6. Track Events

You will want to start tracking events in order for Branch to attribute conversions made on your application to campaigns.

::: code-group

```custom [Time Spent Viewing & View Video]
function onKeyEvent(key as String, press as Boolean) as Boolean
  if press then
    if key = "play" then
      tmr = timer.start()
      m.branchSdkObj.logEvent("Video Stream", "Mandalorian-S2-EP5", "", "", 0, "OnLogEventVideoView")
      if key = "back" then
        timeSpentViewingMin = tmr.stop().toMin()
        m.branchSdkObj.logEvent("TSV(MIN)", "Mandalorian-S2-EP5", "", "", timeSpentViewingMin, "OnLogEventTSVMin")
      end if
    end if
  end if
end function
```

```custom [Track Purchase event]
sub LogEventPurchase_Clicked()
	if (m.branchSdkObj = invalid) then
		ShowMessageDialog("Branch SDK is not initialized!")
		return
	end if

	print "Calling Branch LogEvent Standard API"
	' BRANCH SDK INTEGRATION - Call API'
	m.branchSdkObj.logEvent(BranchSdkConstants().EVENT_TYPE.PURCHASE, "My First Purchase as customer_event_alias", "transaction_id", "INR", 99.99, "OnLogEventPurchaseCallbackFunc")
end sub

function OnLogEventPurchaseCallbackFunc(event as object) as void
    data = event.GetData()
    print "OnLogEventPurchaseCallbackFunc: " data
    message = "API Succeeded!"
    if (data.error <> invalid)
        message = "API Error!"
    end if
    ShowMessageDialog("logEvent Purchase" + " " + message)
end function
```

```custom [Track Custom Event]
sub LogEventCustom_Clicked()
	if (m.branchSdkObj = invalid) then
		ShowMessageDialog("Branch SDK is not initialized!")
		return
	end if

	print "Calling Branch LogEvent Custom API"
	' BRANCH SDK INTEGRATION - Call API'
	m.branchSdkObj.logEvent("Custom Event Name", "Custom Event Customer_event_alias", "transaction_id", "INR", 1199.99, "OnLogEventCustomCallbackFunc")
end sub
```

:::

Be sure to follow the [**event tracking guide**](track-branch-events.md) to determine which events you can track.

## 7. Verify Data in Branch

Once the above steps are complete, you are now ready to verify that conversions are being sent to Branch. To verify data is being sent to Branch [Branch Dashboard's Liveview](https://dashboard.branch.io/liveview/events) and apply the following filter:

| Filter | Operator | Value |
| --- | --- | --- |
| os | equals | ROKU |

*[Image: 922]*

Additionally, you will see conversions within the Branch Dashboard reports.

*[Image: 1027]*