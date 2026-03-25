---
title: "Fraud Overview"
slug: fraud
---

## Overview

Prevent wasted spend with higher quality data based on a privacy-focused attribution model and a combination of accurate detection and quick, flexible response. Along with industry-standard blocking rules, Branch generates helpful Branch Dashboard views on how well your ad spend is protected.

### Fraud Indicators

| Fraud Indicator | ✔️ Fraud Method | ❌ Detection Strategy |
| --- | --- | --- |
| Fake Devices/Click Farms | Use emulators and device farms to generate fraudulent clicks. | **Blacklisted IPs**, because many conversions will come from the same IP address; high click-to-install rates, because this fraud method is most cost-effective when clicks lead to installs |
| Install Hijacking/Click Injection | Use a compromised app already on the device to detect installs, and fire off a click just before the new app is opened. | **Short click-to-install times**, because users typically open apps right after downloading |
| Click Flooding | Generate millions of clicks with random device IDs (IDFA or GAID), and hope that some of those users will install later. | **Long click-to-install times**, because there is no legitimate connection between click and install. |
| Ad Stacking | Layers dozens of ads on top of each other, leading to fraudulent clicks on ads that aren't visible. | **Low click-to-install rates**, because this fraud method generates excessive numbers of clicks. |
| Device Reset | New devices from suspicious IPs. | **High click to install rates**, because devices can repeatedly reset themselves and keeping an eye on user value metrics. |

## How Does It Work?

![](/img/296d55c-Fraud_Flow.png "Fraud Flow.png")

Branch’s unique, cross-platform scale provides the data depth and breadth required for a resilient, scalable detection model.

Branch uses constantly advancing proprietary algorithms to dynamically block attributions on browsers and devices showing suspicious behavior across our platform.

We also automate the detection of statistical variations across a vast pool of data signals to spot and block fraudulent patterns as they emerge.