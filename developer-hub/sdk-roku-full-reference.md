---
title: "Roku Full Reference"
slug: sdk-roku-full-reference
---

### initSession

| Method | Description |
| --- | --- |
| `initSession: function(inputArgs = {}, callbackFunc = "") as void` | Initializes your Branch session. |

| Argument | Type | Description |
| --- | --- | --- |
| `inputArgs` | `Object` | Input arguments. Typically `m.global.launchArgs` |
| `callbackFunc` | `String` | Name of the callback function for initialization. |

#### Example Usage

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
    ShowMessageDialog("initSession" + " " + message)
  end if
end function
```

### setPreinstallData

| Method | Description |
| --- | --- |
| [setPreinstallData: function(campaign = "", partner = "") as void](https://github.com/BranchMetrics/branch-roku-sdk/blob/827986a1b5630c6b3923de4a2aa3ccc217416a35/source/libs/BranchSdkLibrary.brs#L1033) | If your app is preinstalled on Roku devices, for builds distributed to Roku, use this method to set configuration settings for your Branch session to attribute the pre-install to a specific partner. |

| Argument | Type | Description |
| --- | --- | --- |
| `campaign` | `String` | Name of the campaign. |
| `partner` | `String` | Name of the partner. This will typically be a `$3p` value. Reach out to your Branch account manager to retrieve the `$3p` value. |

```
sub init()
    ' BRANCH SDK INTEGRATION - Create Instance'
    m.branchSdkObj = CreateBranchSdkForSceneGraphApp()
    if (m.branchSdkObj = invalid) then
        ShowMessageDialog("Failed to initialize Branch SDK!")
    else
        print "MainScene : setPreinstallData"
        ' BRANCH SDK INTEGRATION - Call API'
        m.branchSdkObj.setPreinstallData("MyCampaign", "MyPartner")
        InitSession_Clicked()
    end if
end sub
```

### handleInput

| Method | Description |
| --- | --- |
| `handleInput: function(inputArgs = {}, callbackFunc = "") as void` | Handles an input to retrieve deep linking data |

| Argument | Type | Description |
| --- | --- | --- |
| `inputArgs` | `Object` | Input arguments. Typically `m.global.launchArgs`. |
| `callbackFunc` | `String` | Name of the callback function for initialization. |

#### Example Usage

```
sub HandleInput_Clicked()
    if (m.branchSdkObj = invalid) then
        ShowMessageDialog("Branch SDK is not initialized!")
        return
    end if

    print "Calling Branch HandleInput API"
    print "m.global.launchArgs : " m.global.launchArgs
    if (m.global.launchArgs <> invalid) then
        ' BRANCH SDK INTEGRATION - Call API'
        m.branchSdkObj.handleInput(m.global.launchArgs, "OnHandleInputCallbackFunc")
    else
        ShowMessageDialog("Please provide deepLinking arguments!")
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
    ShowMessageDialog("handleInput" + " " + message)
end function
```

### logEvent

| Method | Description |
| --- | --- |
| [logEvent: function(name = "", customer\_event\_alias = "", transaction\_id = "", currency = "", revenue = "", callbackField = "", callbackFunc = "") as void](https://github.com/BranchMetrics/branch-roku-sdk/blob/827986a1b5630c6b3923de4a2aa3ccc217416a35/source/libs/BranchSdkLibrary.brs#L1061) | Tracks an event or conversion like PURCHASE or VIEW\_STREAM. |

| Argument | Type | Description |
| --- | --- | --- |
| `name` | `String` | Name of the event. List of compatible events can be found [here](https://github.com/BranchMetrics/branch-roku-sdk/blob/827986a1b5630c6b3923de4a2aa3ccc217416a35/source/libs/BranchSdkLibrary.brs#L57). |
| `customer_event_alias` | `String` | The alias of your event. |
| `transaction_id` | `String` | The ID of of your event. |
| `currency` | `String` | The currency value of your event. List of compatible events can be found [here](https://github.com/BranchMetrics/branch-roku-sdk/blob/827986a1b5630c6b3923de4a2aa3ccc217416a35/source/libs/BranchSdkLibrary.brs#L85). |
| `revenue` | `String` | The revenue of your event. |
| `callbackFunc` | `String` | Name of the callback function for your event. |

#### Example Usage

```
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

### disableTracking

| Method | Description |
| --- | --- |
| [disableTracking: function(isDisable as boolean) as void](https://github.com/BranchMetrics/branch-roku-sdk/blob/827986a1b5630c6b3923de4a2aa3ccc217416a35/source/libs/BranchSdkLibrary.brs#L1128) | If you need to comply with a user's request to not be tracked for GDPR purposes, or otherwise determine that a user should not be tracked, utilize this field to prevent Branch from sending network requests. |

| Argument | Type | Description |
| --- | --- | --- |
| `isDisable` | `boolean` | Set to `true` to disable tracking. Set to `false` to enable tracking. |

#### Example Usage

```
sub init()
    m.bTracking.observeField("buttonSelected", "Tracking_Clicked")

    ' m.bInitSession.setFocus(true)'
    m.bSetIdentity.setFocus(true)

    ' BRANCH SDK INTEGRATION - Create Instance'
    m.branchSdkObj = CreateBranchSdkForSceneGraphApp()
end sub

sub Tracking_Clicked()
    if (m.branchSdkObj = invalid) then
        ShowMessageDialog("Branch SDK is not initialized!")
        return
    end if

    print "Calling Branch Tracking API"
    ' BRANCH SDK INTEGRATION - Call API'
    m.branchSdkObj.disableTracking(m.IsTracking)
    m.IsTracking = not m.IsTracking
    SetTrackingButtonText()
end sub
```

### setIdentity

| Method | Description |
| --- | --- |
| [setIdentity: function(developer\_identity = "", callbackFunc = "") as void](https://github.com/BranchMetrics/branch-roku-sdk/blob/827986a1b5630c6b3923de4a2aa3ccc217416a35/source/libs/BranchSdkLibrary.brs#L1135) | Sets the identity of the user. Typically performed when the user logs in. |

| Argument | Type | Description |
| --- | --- | --- |
| `developer_identity` | `String` | The ID of the user logging in. |
| `callbackFunc` | `String` | Name of the callback function for setting identity. |

#### Example Usage

```
sub init()
    m.bSetIdentity.observeField("buttonSelected", "SetIdentity_Clicked")

    ' m.bInitSession.setFocus(true)'
    m.bSetIdentity.setFocus(true)

    ' BRANCH SDK INTEGRATION - Create Instance'
    m.branchSdkObj = CreateBranchSdkForSceneGraphApp()

    SetTrackingButtonText()
end sub

sub SetIdentity_Clicked()
    if (m.branchSdkObj = invalid) then
        ShowMessageDialog("Branch SDK is not initialized!")
        return
    end if

    print "Calling Branch SetIdentity API"
    ' BRANCH SDK INTEGRATION - Call API'
    m.branchSdkObj.setIdentity("User123", "OnSetIdentityCallbackFunc")
end sub
```

### logout

| Method | Description |
| --- | --- |
| [logout: function(callbackFunc = "") as void](https://github.com/BranchMetrics/branch-roku-sdk/blob/827986a1b5630c6b3923de4a2aa3ccc217416a35/source/libs/BranchSdkLibrary.brs#L1143) | Removes the identity set from `setIdentity`. Typically used when the user logs out. |

| Argument | Type | Description |
| --- | --- | --- |
| `callbackFunc` | `String` | Name of the callback function for removing identity. |

#### Example Usage

```
sub init()
    m.bLogout.observeField("buttonSelected", "Logout_Clicked")

    ' m.bInitSession.setFocus(true)'
    m.bSetIdentity.setFocus(true)

    ' BRANCH SDK INTEGRATION - Create Instance'
    m.branchSdkObj = CreateBranchSdkForSceneGraphApp()

    SetTrackingButtonText()
end sub

sub Logout_Clicked()
    if (m.branchSdkObj = invalid) then
        ShowMessageDialog("Branch SDK is not initialized!")
        return
    end if

    print "Calling Branch Logout API"
    ' BRANCH SDK INTEGRATION - Call API'
    m.branchSdkObj.logout("OnLogoutCallbackFunc")
end sub
```