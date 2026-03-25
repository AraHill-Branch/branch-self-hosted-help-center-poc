---
title: "Predictive Modeling (PREM)"
slug: predictive-modeling
---

## Overview

Predictive Modeling (PREM) is a probabilistic recognition system, that cross-references past user interactions across the Branch Link Graph, to more accurately attribute conversion events. PREM analyzes patterns in device-level event metadata to uncover the most likely connection only used where allowed under platform policies These matches are a significant improvement over point-in-time Fingerprinting, and extremely reliable for most use cases, but should not be relied upon for authentication or other critical failure use cases. The probabilistic estimation is based on the uniqueness of a combination of device characteristics, the presence of web cookies, and the number of devices seen frequenting the same IP address over time.

### Benefits of using PREM

- User-level metrics
- Visibility of ongoing app activity
- Support for different accounting and value-based methods like top-of-the-funnel assists, re-engagement campaigns, and MTA
- Real-time optimization for continuous campaign optimization

## How does PREM work?

1. User clicks on any Branch Link
2. PREM observes key traffic characteristics like:

   - Device IP
   - Timestamp
   - OS
3. Branch attempts to match that device that has completed a conversion to an upstream advertisement click.
4. PREM estimates the probability that the device is the same as a previously seen device based on the uniqueness of a combination of device characteristics, presence of web cookies, and number of devices seen frequenting the same IP address over time)

## Where is PREM used?

By default, PREM is used in the follow scenarios:

### iOS:

1. To attribute conversions to paid channels ONLY if a user has opted in to Apple's AppTrackingTransparency modal
2. To attribute conversions to non-paid channels

### Android:

In all scenarios