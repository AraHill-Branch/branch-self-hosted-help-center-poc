---
title: "Third Party Integrations and PII"
slug: third-party-integrations-and-pii
---

*The information provided in this document is for general informational purposes only. These materials and any recommendations within are not legal, privacy, security, compliance, or business advice. Customers are responsible for obtaining legal, security, privacy, compliance, or business advice from their own lawyer or other professional advisor and should not rely on any recommendations herein.*

## Overview

This document aims to educate **Advanced Compliance customers** about the potential use of personally identifiable information ("PII") data in various third-party integrations. Our goal is to provide transparency and help you understand the data that may be collected by third parties as you configure the service to satisfy your legal requirements. Please note that Branch operates under a [shared responsibility model](https://help.branch.io/using-branch/docs/shared-responsibility). We're responsible for protecting the data within our environment in accordance with the privacy and security requirements under HIPAA. You're responsible for your configuration of the service to meet your legal and security requirements.

## Notice

If you want to enable third-party integrations through the Engagement and Performance products while leveraging Advanced Compliance, you'll need to review the terms and policies of the integration partner to determine if the integration meets your compliance requirements. Many of the integrations require that PII is made available in plaintext in order for the third-party service to work properly. You should consult with your legal team to evaluate third-party data collection and to identify integration partners that align with your legal requirements.

## Integrations

### SANs integrations

The SAN integrations use callouts to complete an attribution reconciliation. The following integrations use IP Address as a data point to complete an attribution callout to an ad network. While we make these integrations available for Advanced Compliance customers, note that once enabled, these integrations require IP addresses to complete attribution.

- Meta
- TikTok
- Snap
- Twitter
- Google
- Apple Search
- Oath
- Roku
- Vizio
- LG
- NBCUniversal

### Non-SANs integrations

The Non-SANs are set up to receive information through Postbacks to learn if there was an attributed event for a campaign. These integrations can be customized by you to omit or to include PII data. For example, when working with the ad network, Impact, the integration can inform if the Impact campaign successfully drove an install, but the query parameters may include PII, such as a device ID.

### Custom ad network integrations

The Custom Ad Networks are set up to receive information through postbacks to be told if there was an attributed event for a campaign. These integrations can be customized by you to include or omit PII data.

### Data integrations

The data integrations, specifically outbound, have specific parameters set for each integration. Some of these parameters may require PII to make an integration work properly. For example, Braze needs to have the IDFA available to complete the integration successfully.

### Custom webhook integrations

The custom webhook integrations are fully set up by you for specific events to be sent to a destination of your choice. Dependent on what events you (e.g., INSTALL or CLICK) choose, there could be PII.

### Email integrations

Integrated email partners have different scenarios to resolve a select after a link is selected. Some ESP integrations receive a callout to resolve the select, while others leverage an underlying Branch Link. However, these integrations typically don't send additional PII data for resolving this information.