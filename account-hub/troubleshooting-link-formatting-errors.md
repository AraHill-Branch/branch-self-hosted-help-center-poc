---
title: "Troubleshooting Link Formatting Errors"
slug: troubleshooting-link-formatting-errors
---

## Overview

During [testing](https://help.branch.io/marketer-hub/docs/testing-ads-campaign-setup), you may run into issues with your Branch Link not being properly formatted or missing information required for accurate routing and attribution.  
Below you'll find possible causes for your test link to not work and how to fix the issue.

## AAID or IDFA is not correctly formatted

#### Cause

Attribution will not occur because the device ID on the link must be in an acceptable IDFA or AAID format, or removed altogether. A common cause for this error is leaving link macros on the link that have not been filled in.

#### Fix

Ensure you're using a real device ID. If you're testing, use a correctly formatted dummy ID. If you don't have a device ID and this link is not server to server, you can remove the device ID macro altogether and retest.

## S2S & no device ID present

#### Cause

Server to server clicks must have device IDs for attribution. Point in time modeling is not supported for server to server clicks.

#### Fix

Use a device ID macro like `$idfa` or `$aaid`.

## S2S & both $idfa AND $aaid

The error could also be: (`$idfa\_sha1` AND `$aaid\_sha1`) or (`$idfa\_md5` AND `$aaid\_md5`).

#### Cause

Server to server clicks can't have device IDs for both IDFA and AAID. Because S2S clicks don't have user agents, Branch uses the presence of a device ID to set the operating system.

#### Fix

Remove one of the device ID macros (e.g. `$idfa`, `$aaid`, `$idfa\_sha1`, `$aaid\_md5`) that are present on this link so there is only one macro present.