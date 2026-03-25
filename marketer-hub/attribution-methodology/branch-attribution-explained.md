---
title: "Branch Attribution Explained"
slug: branch-attribution-explained
---

## How Branch attribution works

Branch determines which marketing touchpoint motivated a user to install or open an app, then attributes that action back to the source using multiple attribution methods prioritized by accuracy.

### Understanding attribution

Attribution is the process of connecting user actions across different environments—typically from clicking a link in a web browser to installing or opening an app on a mobile device. This connection is essential for understanding which marketing efforts drive results and optimizing campaigns accordingly.

Branch uses multiple attribution methods to make these connections, always prioritizing the most accurate method available for each situation. The key differentiator in attribution accuracy is whether Branch can make a **deterministic match** (100% certain) or must rely on **probabilistic matching** (high confidence based on statistical modeling).

#### The match guarantee flag

When Branch achieves 100% certainty about an attribution match, the deep link data includes the flag `+match_guaranteed=true`. This flag is critical for sensitive use cases:

- **Auto-login flows:** Only log users in automatically when matches are guaranteed
- **Personal data display:** Only show personalized information with certain matches
- **High-value actions:** Gate critical actions on match certainty

Mobile app logic should parse this flag from the SDK initialization callback and proceed with sensitive actions only when the value is `true`.

#### iOS 14+ and match certainty

Post-iOS 14, Apple's App Tracking Transparency framework limits access to the IDFA (Identifier for Advertisers) unless users explicitly opt in. As a result, `+match_guaranteed` is usually `false` on new install events, making deterministic attribution more challenging. This shift has made solutions like NativeLink™ increasingly important for maintaining attribution accuracy on iOS.

## Attribution methods by accuracy

### Deterministic attribution (100% accuracy)

Deterministic methods provide absolute certainty about attribution matches. These methods rely on passing unique identifiers or using platform-provided mechanisms that create direct, verifiable connections between clicks and app sessions.

Deterministic methods include:

- Direct deep linking
- iOS NativeLink
- Install referrers
- Device ID matching across the Branch platform
- Platform integrations
- SKAdNetwork

#### Direct deep linking

**Use case:** Attributing users when the app is already installed on their device.

**How it works:** When a user with the app already installed clicks a Branch link configured with the app's URI scheme (e.g., `myapp://`) or Universal/App Links, the link opens the app immediately. Branch passes a unique click identifier through the deep link—for example, `myapp://open?link_click_id=123456`. The Branch SDK parses this identifier and sends it back to Branch servers, which return the complete data dictionary associated with that specific link click.

**Why it's deterministic:** The identifier passes directly through the app itself in a closed loop. There's no ambiguity—the click ID that went into the link is the same ID that comes out in the app.

**Platforms:** iOS, Android, and any platform supporting deep linking protocols.

#### iOS NativeLink™ (deferred deep linking)

**Use case:** Attributing new iOS app installs with guaranteed accuracy despite iOS 14+ privacy restrictions.

**The challenge:** Traditional deferred deep linking (connecting a click before app install to the first app open after install) became problematic with iOS 15 and iCloud+ Private Relay, which obscures IP addresses and other matching signals.

**How it works:** NativeLink™ uses the iOS pasteboard (clipboard) to pass attribution data across the install boundary:

1. User clicks a Branch link and sees a Deepview (preview page)
2. When the user taps the main call-to-action, attribution data is written to the device pasteboard
3. User proceeds to the App Store and installs the app
4. On first launch, the Branch SDK reads the pasteboard data
5. Match is guaranteed: `+match_guaranteed=true`

**Why it's deterministic:** Attribution data is physically passed through the device's pasteboard, creating a direct connection that doesn't rely on matching signals or IDs.

**Implementation note:** Requires specific setup documented in Branch's developer documentation. Once enabled, it provides the most reliable attribution for new iOS installs in the post-iOS 14 era.

#### Install referrers (Android)

**Use case:** Attributing Android app installs from supported app stores.

**How it works:** Android app stores provide a built-in attribution mechanism called the install referrer. When a user clicks an ad or link that leads to an app store:

1. The advertiser delivers content with an install referrer to the app store
2. User clicks and is directed to the app store
3. User installs the app
4. The app store writes the install referrer data to an API
5. On first launch, the Branch SDK queries the app store's API and retrieves the referrer
6. The install is attributed back to the source with 100% certainty

**Supported app stores:**

- Google Play Store (app version 8.3.73+)
- Huawei AppGallery (EMUI v3.0+, HMS Core v2.6.5+)
- Samsung Galaxy Store (v4.5.20.1+)
- Xiaomi GetApps (v22.6.0.0+)

**Why it's deterministic:** The app store itself confirms where the install came from through its official API, eliminating any ambiguity.

**Requirements:** Apps must use an up-to-date Branch Android SDK with proper dependencies implemented to support install referrer collection.

#### Device ID matching across the Branch platform

**Use case:** Recognizing users who have previously interacted with any Branch-powered app or link.

**How it works:** As users engage with apps and websites where the Branch SDK is integrated, Branch's attribution engine builds connections between browser cookies (collected on Branch link clicks) and device identifiers (collected when users engage with apps).

When a user clicks a Branch link, if Branch has previously seen that user and successfully paired their browser cookie to a device ID, Branch can deterministically attribute that user immediately. This means when they install an app and a device ID becomes available, Branch knows with 100% certainty this is the same user who clicked the Branch link.

**The network effect:** This method improves over time as more users interact with Branch-powered apps. Each successful browser-to-app connection strengthens the attribution engine's ability to recognize users across the platform. With hundreds of millions of users clicking Branch Links, the platform continually makes new connections that benefit all Branch customers.

**Why it's deterministic:** Branch has verified the connection between this specific browser cookie and device ID through previous first-party interactions. When both identifiers appear again, Branch can definitively say they belong to the same user.

**Privacy consideration:** This method relies on first-party data collected through direct user interactions with Branch-integrated apps and links, not third-party tracking.

#### Platform integrations (self-attributing networks)

**Use case:** Attributing users from major advertising platforms with direct confirmation.

**How it works:** Branch maintains direct integrations with major platforms including Apple, Facebook, Google, Twitter, and Snap. These platforms can definitively confirm whether a specific user engaged with an ad on their platform.

When an app install occurs, Branch compares the touchpoints it has observed (from Branch Links) against engagement data provided directly by these platforms. This allows Branch to attribute with greater certainty across both organic and paid channels.

**Why it's deterministic:** The platforms themselves verify user engagement, providing authoritative confirmation that removes uncertainty from the attribution decision.

#### SKAdNetwork

**Use case:** Campaign-level attribution for iOS 14+ in compliance with Apple's privacy framework.

**How it works:** SKAdNetwork is Apple's privacy-preserving attribution framework. Rather than providing user-level data, Apple verifies and reports attribution at the campaign level. When a conversion occurs, Apple cryptographically signs the attribution data, guaranteeing its accuracy.

**Limitations:** SKAdNetwork doesn't provide user-level insights—you can't track individual user journeys. However, all app store installs are verified by Apple with 100% certainty at the campaign level.

**Why it's deterministic:** Apple itself validates and confirms the attribution, making the campaign-level data completely reliable even though it's aggregated.

---

### Probabilistic attribution (high confidence)

When deterministic methods aren't available, Branch uses sophisticated modeling to make high-confidence attribution decisions. These methods analyze patterns and metadata to statistically determine matches, showing `+match_guaranteed=false` because they're predictive rather than definitive.

#### Predictive modeling engine

**Use case:** Attributing users when device IDs aren't available but contextual signals are strong.

**How it works:** Branch's predictive modeling engine leverages machine learning trained on hundreds of millions of user interactions. When a user clicks a Branch link, Branch collects their browser cookie along with associated device metadata like IP addresses and user agents. Even if their device ID is unavailable, Branch can pair the browser cookie to this metadata and use it for probabilistic attribution.

When the app opens, Branch compares the app's device metadata against the browser metadata from recent clicks. If the patterns align strongly enough—same IP, similar timing, matching device characteristics—Branch can attribute with high confidence even without a device ID match.

**Why it's high confidence:** With hundreds of millions of data points, Branch's models can identify patterns that are statistically very unlikely to represent different users. The probability of two different users having identical IP addresses, user agents, device models, OS versions, and timing within the same geographic area is extremely low.

**Accuracy improvement:** As more users interact with Branch-powered apps, the predictive models continuously improve, providing greater attribution accuracy when connecting app behaviors back to browser touches.

#### Browser-to-app fingerprinting

**Use case:** Fallback attribution when no other mechanism is available.

**What Branch collects:**

- IP address (including IPv6)
- Operating system and version
- Device model
- User agent string
- Browser information

**How it works:** Branch collects limited device-level information in two moments—when a user clicks a Branch link in their browser, and again when they open the app. Branch then compares these "fingerprints" to find unique matches within specific time windows.

The key is uniqueness combined with timing. If enough data points align and the timing is right (click followed shortly by app open), Branch can say with high probability that it's the same user.

**Example scenario:** A user with a specific phone model, running a particular OS version, on a residential IP address in a specific city, clicks a link at 2:00 PM and opens the app at 2:03 PM. If no other clicks from that exact configuration occurred in that timeframe, it's extremely probable they're the same person.

**Privacy compliance:** Branch collects only limited, non-personal data as outlined in Branch's Privacy Policy. This data cannot identify individuals but can create sufficiently unique fingerprints for attribution purposes.

### Additional attribution techniques

#### Custom user IDs

**Use case:** Improving attribution accuracy with app-specific anonymous identifiers.

**How it works:** Branch's mobile and web SDKs allow developers to assign custom user IDs to web and app events. When a user interacts with both web and app while using the same custom ID, Branch can use this as an additional signal to augment attribution.

**Important restriction:** Developers must never use personally identifiable information (PII) in these fields. Custom IDs should be anonymous identifiers specific to the app's internal user system.

**Benefit:** These IDs provide another data point that can strengthen attribution confidence, especially for apps with strong cross-platform user bases.

#### Web SDK attribution

**Use case:** Tracking web-to-app user journeys and attributing mobile web conversions.

**How it works:** The Branch Web SDK must be implemented across multiple pages (homepage, product pages, etc.) to ensure proper measurement. When a user lands on a page with the SDK initialized, it makes requests to Branch endpoints (`v1/open` and `v1/pageview`). A cookie is stored in local storage containing data used for attribution and, if applicable, displaying Journeys banners.

**Click-to-event matching:** Using Branch's predictive modeling, the Web SDK can create matches between link clicks and subsequent web events. When a user clicks a Branch link, the system observes characteristics like IP and user agent. Later, when that user's web session contains similar characteristics, Branch can probabilistically tie subsequent web events back to the original click.

**ITP considerations:** Safari's Intelligent Tracking Prevention (ITP) limits data storage in localStorage and sessionStorage, potentially causing the Web SDK to create new browser IDs when data is wiped. However, the impact is minimal because Branch's Link Graph is built on first-party interactions with deep links. The system can reconnect identity fragments in a privacy-friendly way as ITP creates them. Even with ITP's 7-day cap on script-writable storage, Branch maintains attribution accuracy through its first-party data approach.

## Special considerations and platform-specific behavior

### iOS privacy changes and ATT

Apple's App Tracking Transparency framework fundamentally changed mobile attribution by requiring apps to request permission before accessing the IDFA. When Limit Ad Tracking is enabled or ATT permission is denied, no IDFA is available on the device.

**Branch's response:**

- For users without IDFA, Branch doesn't make calls to self-attributing networks (Twitter, Facebook, Google, Snap) using IDFA
- Branch uses IDFV (Identifier for Vendor) instead when available
- The flag doesn't explicitly affect attribution—it's passed through to ad networks who decide whether to target the user
- NativeLink™ provides a deterministic alternative that doesn't rely on IDFA

### Safari 26 and iOS version detection

**The issue:** Safari 26 on iOS/iPadOS/visionOS freezes the OS token in the user agent string at iPhone OS 18\_6, regardless of the actual OS version. This means Branch receives iOS 18.6 as the OS version even for devices running iOS 26.

**Branch's solution (no SDK update required):**

- If `os_version` is present and shows iOS 18.6 or higher, Branch uses the browser version for attribution
- If `os_version` is present but `browser_version` is missing, Branch falls back to `os_version`
- If neither is present, matching would not succeed and probabilistic attribution won't work

**Impact areas:** This affects deferred deep linking, matching and attribution logic, and analytics reporting by OS version.

**Recommended approach:** For best results with iOS 26 users, implement NativeLink™, which bypasses these user agent limitations entirely.

### Customizing match criteria for strictness

**The concern:** In probabilistic matching, there's a theoretical risk that different users might have identical anonymous metadata (same device model, IP address, timing, etc.), leading to incorrect attribution.

**The solution:** In the Dashboard's Link Settings page under advanced options, set Match Type to "Unique." This tells Branch to make no attribution decision if two identical sets of metadata are under consideration—essentially prioritizing precision over recall.

**Trade-off:** This setting is more conservative and will result in fewer attributed installs, but those that are attributed will have even higher confidence.

### Attribution windows and lookback periods

**What they are:** Attribution windows define how long after a click or impression Branch can attribute a downstream conversion (like an install or in-app event).

**Example:** With a 7-day click attribution window, if a user clicks a link on Monday and installs the app the following Tuesday (6 days later), Branch attributes the install. If they install 8 days later, Branch considers it organic.

**Customization:** Attribution windows can be modified for each integration through the Dashboard. This allows alignment with partner agreements and campaign-specific requirements.

**Standard defaults:**

- Click attribution: 7 days (industry standard)
- View attribution: 1 day
- Re-attribution: 90 days

### Desktop impression tracking and view-through attribution

**Impression recording:** Branch records impressions on both desktop and mobile platforms.

**View-through attribution (VTA) limitation:** VTA is only applicable for mobile because it requires device identifiers (AAID for Android, IDFA for iOS). Desktop conversions recorded without mobile device identifiers are counted as organic, as there's no way to deterministically or probabilistically connect the desktop impression to a mobile app install.

### User location tracking

**How it works:** Branch determines user location using signals from the SDK combined with IP address geolocation.

**Available in:**

- Dashboard: Use "Country," "Geo," or "Region" to compare by location
- Data exports: Location information appears in log-level exports

## Attribution methodology summary

Branch's attribution approach prioritizes accuracy and transparency by using the best available method for each situation. The hierarchy flows from deterministic methods that provide guaranteed matches to sophisticated probabilistic models when direct identification isn't possible. This multi-method approach, combined with the network effects of hundreds of millions of users on the Branch platform, delivers reliable attribution across diverse scenarios while respecting user privacy and platform restrictions.

For sensitive use cases, always check the `+match_guaranteed` flag before taking action on attribution data. For iOS apps facing attribution challenges post-iOS 14, implementing NativeLink™ provides the most reliable path to deterministic attribution without depending on opt-in tracking permissions.