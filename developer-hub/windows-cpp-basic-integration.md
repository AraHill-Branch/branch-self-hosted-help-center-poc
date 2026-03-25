---
title: "Windows Basic Integration"
slug: windows-cpp-basic-integration
---

::: info UWP & .NET
The Branch Windows SDK is not compatible with Universal Windows Platform (UWP) or .NET. Support for UWP and .NET applications is not currently available.
:::

::: tip SDK Stats
**Open Source Github Repo**:  
<https://github.com/BranchMetrics/cpp-branch-deep-linking-attribution>
:::

::: warning Prerequisite
Before you implement the SDK, please ensure you have [Configured Link Behaviors for Redirects and Link Domains](configure-default-link-behaviors.md#7-desktop-app-default-link-behavior).
:::

## Visual Studio Configuration

### Visual Studio 2022

- From within the Visual Studio Installer, install the **Universal Windows Platform development** workload.
- In **Installation Details** -> **Universal Windows Platform development,** check the **C++ (v14x) Universal Windows Platform tools** option(s).

*[Image: 2620]*

### Visual Studio 2019

Branch SDK uses C++/WinRT APIs. Visual Studio 2019 doesn’t include these APIs by default. So if you are using Visual Studio 2019 for developing your app, install **Microsoft.Windows.CppWinRT** NuGet package.

**To install**

- Click **Project** > **Manage NuGet Packages...** > **Browse**.
- Type or paste **Microsoft.Windows.CppWinRT** in the search box.
- Select the item in search results, and then click **Install** to install the package for that project.

*[Image: 2086]*

## 1. Download & Install the Branch SDK

::: info Note
Visual Studio 2019+ is required (Earlier versions are not supported.)
:::

**Download the SDK**

The Branch SDK Installer is available for download [here](https://github.com/BranchMetrics/cpp-branch-deep-linking-attribution/releases/latest). This downloads a file called `BranchSDK.msi`.

::: info Note
If you have installed any release of the MSI, you should manually uninstall before installing the new version.
:::

**Install the SDK**

Double-click the `BranchSDK.msi` file to begin installation.

*[Image: 988]*

Once the installation finishes, all headers and libraries will be installed under `C:\Program Files (x86)\Branch SDK`.

::: info Anti-malware Alert
The MSI may be flagged by malware blockers in some cases. For example, with Windows Defender, it may be necessary to click the "More info" link first to allow installation to proceed via the "Run anyway" button. Please be sure only to install the MSI from <https://github.com/BranchMetrics/cpp-branch-deep-linking-attribution/releases>.
:::

## 2. Build Against the Installed Branch SDK

The SDK will be installed in `C:\Program Files (x86)\Branch SDK`.

Open your project's Properties in Visual Studio.

#### 2.1 Update C++ Version

Branch SDK uses features from the C++17 standard, set project property C/C++ > Language > C++ Language Standard > ISO C++17 Standard (/std:c++17) in Visual Studio.

*[Image: 1574]*

#### 2.2 Add include path

Under `C/C++ > General`, add `C:\Program Files (x86)\Branch SDK\include` to `Additional Include Directories` for All Configurations and All Platforms. The corresponding command-line option is `/I"C:\Program Files (x86)\Branch SDK\include"`.

*[Image: 1792]**[Image: 1792]*

#### 2.3 Add preprocessor definitions

Under `C/C++ > Preprocessor`, define `DEBUG` in Debug builds. All screenshots are for Debug x64 where configurations differ.

*[Image: 1332]*

#### 2.4 Verify Runtime Library

We support `MD`, `MDd`, `MT` and `MTd` runtimes. Under `C/C++ > Code Generation`, select the appropriate option.

*[Image: 1792]*

#### 2.5 Add library paths

Under `Linker > General`, add the library directory for each combination of configuration and platform to `Additional Library Search Paths`:

| Platform | Additional Library Search Paths |
| --- | --- |
| Debug MDd | `C:\Program Files (x86)\Branch SDK\lib\MDd_64` |
| Release MD | `C:\Program Files (x86)\Branch SDK\lib\MD_64` |
| Debug MTd | `C:\Program Files (x86)\Branch SDK\lib\MTd_64` |
| Release MT | `C:\Program Files (x86)\Branch SDK\lib\MT_64` |

The command-line option for MDd, e.g., is `/LIBPATH:"C:\Program Files (x86)\Branch SDK\lib\MDd_64"`.

Screenshots show an MT example.

*[Image: 1022]**[Image: 1036]*

#### 2.6 Add libraries

Under `Linker > Input`, add the following (in order) to `Additional Dependencies`, depending on the configuration:

::: code-group

```plaintext [MDd]
BranchIOmdd.lib
                    Iphlpapi.lib
                    crypt32.lib
                    ws2_32.lib
```

```plaintext [MTd]
BranchIOmtd.lib
                    Iphlpapi.lib
                    crypt32.lib
                    ws2_32.lib
```

```plaintext [MD]
BranchIOmd.lib
                    Iphlpapi.lib
                    crypt32.lib
                    ws2_32.lib
```

```plaintext [MT]
BranchIOmt.lib
                    Iphlpapi.lib
                    crypt32.lib
                    ws2_32.lib
```

:::

*[Image: 1574]**[Image: 1332]*

Your app should now build and run. See the TestBed apps for reference.

## 3. Set up URI Redirection

For Win32 apps, Branch uses URI-based redirection. When a user opens a link to a Win32 app, Branch responds with a URI redirect using the custom URI scheme you configured in Branch:

- **New Branch**: In the left-hand navigation, go to **Configuration** and select **Link Controls**. Navigate to the **Link Routing Rules** tab, then find the **Desktop Routing** section to configure your Desktop Redirects.
- **Legacy Branch**: Navigate to the [Configuration page](https://branch.dashboard.branch.io/configuration/general) and find the Desktop Redirects section.

In order to launch the app from a Branch link, it is necessary to make certain entries in the Registry to open the app from a custom URI scheme.

#### 3.1 via Custom Registry Entries

When not using MSIX, it is necessary to make custom Registry entries to associate your URI scheme with your app. If your URI scheme is `myurischeme`, these entries should be made under `HKEY_CURRENT_USER\SOFTWARE\Classes\myurischeme`. If your app supports system-wide installation, you may optionally us `HKEY_CLASSES_ROOT\myurischeme`.

It is recommended to add this Registry key as part of your app's installation. For example, using the Wix packager with the WixUI\_InstallDir template:

```
<!-- Add Registry entries for URI redirection -->
        <!-- testbedbasic is the URI scheme from the Branch Dashboard -->
        <RegistryKey Root="HKCU" Key="SOFTWARE\Classes\myurischeme" >
        <RegistryValue Value="My Application" Type="string" KeyPath="yes" />
        <RegistryValue Name="URL Protocol" Value="" Type="string" />
        <RegistryKey Key="DefaultIcon">
        <RegistryValue Value="[INSTALLBINFOLDER]MyApp.exe,1" Type="string"/>
        </RegistryKey>
        <RegistryKey Key="shell\open\command">
        <RegistryValue Value='"[INSTALLBINFOLDER]MyApp.exe" "%1"' Type="string"/>
        </RegistryKey>
        </RegistryKey>
```

The `(Default)` value of the base registry key (`HKCU\SOFTWARE\Classes\myurischeme`) is a descriptive label. In many cases, it is `URL:myurischeme` by default.

The `shell\open\command` key passes the URI to the app as the command-line argument (`lpCmdLine`). You may also opt to pass the URI in any other way, e.g. using a command-line argument if your apps supports it.

```
<RegistryKey Key="shell\open\command">
        <RegistryValue
        Value='"[INSTALLBINFOLDER]MyApp.exe" "/uri:%1"'
        Type="string"/>
        </RegistryKey>
```

::: info Notes
1. The command-line argument may be received with surrounding quotes that need to be stripped.
2. When using MSIX, the package automatically sets up a similar Registry structure on installation.
:::

See the [TestBed-Basic](https://github.com/BranchMetrics/cpp-branch-deep-linking-attribution/tree/master/BranchSDK-Samples/TestBed-Basic) app in the repo for an example using Wix to create the required Registry keys. These Registry entries cause URIs with the `testbedbasic` scheme to open the TestBed-Basic app.

*[Image: 988]**[Image: 988]**[Image: 988]*

## 4. Initialize Branch

#### 4.1 Initialize the Branch SDK

Whenever the app starts, it is necessary to initialize the Branch SDK by calling `openSession` on the `Branch` instance returned by `Branch::create`, passing any URI received at the command line as the first argument to `Branch::create`. If no URI is received, pass a blank string. Because initialization involves an API call, it is recommended to initialize the Branch SDK at the earliest opportunity from `wWinMain`.

**Create a callback object**

All asynchronous Branch SDK methods require a callback object implementing the `BranchIO::IRequestCallback` interface. This interface has three methods: `onSuccess`, `onStatus` and `onError`. Either `onSuccess` or `onError` is guaranteed to be called exactly once.

- The `onStatus` method may or may not be called one or more times before `onSuccess` or `onError`.
- Link data and other results are returned to the caller in the second argument to `onSuccess`, a [BranchIO::JSONObject](https://github.com/BranchMetrics/cpp-branch-deep-linking-attribution/blob/master/BranchSDK/src/BranchIO/JSONObject.h).
- The caller manages the lifetime of the request callback. It's only necessary to guarantee that the callback object live until `onSuccess` or `onError` is called. In the examples here and in the repo, the callbacks delete themselves at the end of each of these methods.

```
#include <BranchIO/Branch.h>

        using namespace BranchIO;
        using namespace std;

        struct MyCallback: public virtual BranchIO::IRequestCallback {
        void onSuccess(int id, JSONObject payload) {
        // onSuccess or onError guaranteed to be called exactly once
        done();
        }

        void onStatus(int id, int code, string message) {
        // onStatus may be called one or more times before onStatus or onError
        }

        void onError(int id, int code, string message) {
        // onSuccess or onError guaranteed to be called exactly once
        done();
        }

        private:
        void done() {
        delete this;
        }
        };
```

**Create a Branch instance and initialize a Branch session**

Create an instance of a callback object, as above, for use with the `Branch::openSession` method. This callback will receive any link data when the app is opened from a link.

```
#include <BranchIO/Branch.h>

        using namespace BranchIO;
        using namespace std;

        struct MyCallback : public virtual IRequestCallback;

        int APIENTRY wWinMain(_In_ HINSTANCE hInstance,
        _In_opt_ HINSTANCE hPrevInstance,
        _In_ LPWSTR lpCmdLine,
        _In_ int nCmdShow)
        {
        UNREFERENCED_PARAMETER(hPrevInstance);

        // ----- Initialize the Branch SDK
        AppInfo appInfo;
        appInfo.setAppVersion("1.0");

        auto* branch = Branch::create(branchKey, &appInfo);

        wstring cmdLineArg(lpCmdLine ? lpCmdLine : L"");
        wstring uriScheme(L"myurischeme");
        if (cmdLineArg[0] == '"') {
        // Strip off any leading and trailing quotes
        cmdLineArg = cmdLineArg.substr(1, cmdLineArg.length() - 2);
        }
        wstring::size_type prefixLength = min(uriScheme.length(), cmdLineArg.length());
        wstring prefix = cmdLineArg.substr(0, prefixLength);
        if (prefix == uriScheme)
        {
        // Open any URI passed at the command line
        uriToOpen = cmdLineArg;
        }

        auto* myCallback = new MyCallback;
        branch->openSession(uriToOpen, myCallback);

        // ----- Continue with normal Win32 startup
        MyRegisterClass(hInstance);
```

#### 4.2 Receive the URI from the Command line

::: info Note
This entire process is very similar to associating a file extension with an app via the Registry.
:::

The Registry association via `shell\open\command` passes the URI to the app as a command-line argument. This is passed to the app as `lpCmdLine`, the third parameter in `wWinMain`.

The URI received from Windows will have the form `myurischeme://open?link_click_id=xxxx`, where `xxxx` is a 64-bit integer. This `link_click_id` parameter is used to correlate the action of opening the app with the link in the browser.

::: info Note
Opening a session with Branch will notify the app of any deferred deep links in the callback.  
If a URI was passed to `openSession`, link data will be passed to the `onSuccess` method in `myCallback`.

**Important**  
It is necessary to call `openSession` to initialize the SDK even if a URI is not received.  
Passing a blank string initializes the SDK and records an open event.
:::

**Configuring**

You may configure your app with these classes:

| Class | Description |
| --- | --- |
| `BranchIO::AppInfo` | Application Information, such as version and language. |
| `BranchIO::AdvertiserInfo` | Advertiser Information, including the ability to disable tracking. |

Any information you provide here is included in events transmitted to Branch.

Example to disable ad tracking:

```
_branchInstance->getAdvertiserInfo().disableTracking();
```

#### 4.3 Handle Multiple App Instances

Whenever a Branch link is opened, the URI redirect will always result in Windows starting a new instance of the application and passing the URI at launch via the `lpCmdLine` parameter. This is true not only when opened from a URI, but any time the application is launched from a shortcut, e.g. in the Start menu.

It is common practice to enforce a single running instance of an application via a shared mutex or similar IPC mechanism. In this case, it is necessary to forward the URI to the running instance. A common approach is to use a `WM_COPYDATA` message. Pass the URI to the running app in a message before exiting.

::: info Important Notes
- It is necessary to call `openSession` from the running instance, not from the ephemeral instance that exits after transmitting the URI.
- It is necessary to call `openSession` from the running instance even when no URI is received by the ephemeral instance, e.g. when it is launched from the Start menu. A blank string should be forwarded in a `WM_COPYDATA` message in order that the running instance records an open event. This is necessary for accurate analytics.
- It's recommended to call [SetForegroundWindow](https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-setforegroundwindow) to bring the running instance to the foreground when a link is opened.
:::