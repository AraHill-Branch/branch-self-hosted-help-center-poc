---
title: "Windows Testing"
slug: windows-cpp-testing
---

## Test Deep Link

Create a deep link from the [Branch Dashboard](https://dashboard.branch.io/marketing).

1. Delete your app from the PC if a production release is installed.
2. Compile and test on a PC.
3. Paste deep link into an anchor (`<a>` element) in an HTML page. See the example.html for each TestBed app in the repo.
4. Open the HTML page in a browser.
5. Click the link in the browser.
6. If a dialog appears offering to redirect to your app, click OK.
7. The link should launch your app.

::: info Testing deferred deep linking
Deferred deep linking is simply deep linking into an app that is not yet installed. Once the app is installed, the context is preserved and the user's first app-open will have the deep link data from the original Branch link. To test this, uninstall the app from your device, click the Branch link, and manually launch the app from Visual Studio. You should be routed to the correct content within your app.
:::

## Enable Logging

The SDK optionally supports logging diagnostic messages to a file. It supports five defined log levels in decreasing order of severity: Error, Warning, Info, Debug and Verbose. The default log level is Error for Release builds and Debug for Debug builds. Debug and Verbose level messages are compiled out in Release builds. Only Error, Warning and Info are available in Release builds. If necessary, you must create the containing directory for the log file.

Enable log output two ways:

1. (Simple) Set two environment variables: `BRANCHIO_LOG_LEVEL` and `BRANCHIO_LOG_FILE`. Restart your app after setting these environment variables.

   *[Image: 1758]*
2. (Custom) Call `BranchIO::Log::setLevel` and `BranchIO::Log::enableFileLogging`. Logging is enabled from the time of the call. Call before `Branch::create` to ensure logging all available messages.

```
#include <BranchIO/Util/Log.h>

// Debug and Verbose levels are compiled out in Release builds.
BranchIO::Log::setLevel(Log::Verbose);

// This ia a UTF-8 string, not UTF-16.
// Be sure to escape backslashes in file paths.
BranchIO::Log::enableFileLogging("C:\\path\\to\\logfile.log");
```

See the `setupSDKLogging` method in `BranchOperations.cpp` in the TestBed apps in the repo for a full working example of SDK logging to `%LocalAppData%`.

## Use Test Key

1. Use the Branch `test key` instead of the `live key`
2. Use in `Branch::create` [Initialize Branch](windows-cpp-testing.md#initialize-branch)
3. The Branch key of your app must match the Branch key of your deep link
4. Remove before releasing to production

```
auto* branch = BranchIO::Branch::create(L"key_test_xxxxxxxx", &appInfo);
```

The Branch key is passed from the app to the Branch SDK as the first parameter when calling `create`. You may pass any valid Branch key. For example, the TestBed apps in the repo pass the key using a command-line build parameter, `/D "BRANCH_KEY=L\"key_live_xxxxxxxx\""`. This preprocessor definition is then available to pass to the `Branch::create` call. This approach allows you to specify a different key per build configuration, e.g. test key for Debug and live key for Release.

::: info Note
If you use a different URI scheme for your app's test key in the Dashboard, you must also adjust the URI scheme you use in the Registry or your MSIX package. See the Basic Integration guide for more details.
:::

## Sample Apps

There are four variants in the [GitHub repo](https://github.com/BranchMetrics/cpp-branch-deep-linking-attribution/tree/master/BranchSDK-Samples) of an example application called TestBed. In all cases except TestBed-Conan, you must first install the [BranchSDK.msi](https://github.com/BranchMetrics/cpp-branch-deep-linking-attribution/releases/latest). Each app has a separate Branch key and domain so that they can all be installed side-by-side on the same PC. Each app has a separate example.html page with a link on that domain to launch the associated app. All apps may be uninstalled along with all Registry configuration via Add or Remove Programs in Windows Settings. All TestBed variants require the Windows 10 SDK version 10.0.18363.0 (1909), available through the Visual Studio Installer.

All TestBed variants leave SDK log files in `%LocalAppData%\Branch\TestBed`. Debug builds will generate Verbose-level logs. Release builds generate Info-level logs.

::: info Note
It may be necessary to enable [Developer Mode](https://docs.microsoft.com/en-us/windows/apps/get-started/enable-your-device-for-development) on a Windows device in order to deploy TestBed to the Start menu.
:::

### 1. [TestBed](https://github.com/BranchMetrics/cpp-branch-deep-linking-attribution/tree/master/BranchSDK-Samples/TestBed)

This app is built against the Branch SDK and all dependencies from the installed MSI. It uses MSIX to package the Win32 app for deployment with a URI protocol to launch the app.

To build and test:

- Ensure you have the UWP workload installed for Visual Studio (necessary for MSIX).
- Install the MSI.
- Open the TestBed.sln.
- Select a build configuration (Debug or Release) and an architecture (x86 or x64) and then Build > Deploy Solution.
- The app will appear in the Start menu.
- The app is not installed in a system location. The binary is located in your local build folder in the repo.
- Click the link in example.html to open a Branch link in the app.

### 2. [TestBed-Local](https://github.com/BranchMetrics/cpp-branch-deep-linking-attribution/tree/master/BranchSDK-Samples/TestBed-Local)

This app is built against source code from the local repo, taking only Poco and other dependencies from the installed MSI. It uses MSIX to package the Win32 app for deployment with a URI protocol to launch the app.

To build and test:

- Ensure you have the UWP workload installed for Visual Studio (necessary for MSIX).
- Install the MSI.
- Open the TestBed-Local.sln.
- Select a build configuration (Debug or Release) and an architecture (x86 or x64) and then Build > Deploy Solution.
- The app will appear in the Start menu.
- The app is not installed in a system location. The binary is located in your local build folder in the repo.
- Click the link in example.html to open a Branch link in the app.

### 3. [TestBed-Basic](https://github.com/BranchMetrics/cpp-branch-deep-linking-attribution/tree/master/BranchSDK-Samples/TestBed-Basic)

This app is built against source code from the local repo, taking only Poco and other dependencies from the installed MSI. It uses the Wix toolset to package the Win32 app for deployment as an MSI with custom Registry entries to launch the app from a URI. This version of TestBed does not use MSIX or require the UWP workload.

To build and test:

- Install the MSI.
- Install the Wix Toolset from <https://github.com/wixtoolset/wix3/releases>.
- Install the Wix Visual Studio Extension (Extensions > Manage Extensions).
- Open the TestBed-Basic.sln.
- Select Debug build configuration (required for the Wix installer project).
- Select x86 architecture (required for the Wix installer project).
- Select Build > Build Solution
- The app will not appear in the Start menu.
- The app is installed in C:\Program Files (x86)\Branch TestBed (Basic).
- Click the link in Welcome.html to open a Branch link in the app.

::: info Note
The Wix Toolset requires .NET Framework 3.5.1. Enable it under Windows Features to install the Wix Toolset.
:::

*[Image: 415]*

###