---
title: "Test Postbacks"
slug: testing-postbacks
---

## Overview

Testing your configuration is a very important step that we highly recommend you take the time to complete before going live with marketing campaigns.

The following guide walks you through how to ensure Postbacks are correctly firing to your ad partner and passing all of the relevant data.

## Prerequisites

In order to test postbacks, you need to have completed the following:

1. Completed the [Ad Partner Integration Guide](ad-partner-integration-guide.md).
2. Added a [Test Device](add-test-devices.md) to your Branch Dashboard.

## Selecting Your Test Platform

In order to properly test the postbacks set up for your ad partner, you must first select the platform - Web Browser or Mobile App - on which you will be testing. Your selection impacts both the test link generated in the next step, as well as items shown during the test.

1. In the left-hand navigation, under **Channels & Links**, click on **Ads** and then **Partner Management**.
2. Select the appropriate Ad Partner and click on the **Postback Testing** tab.
3. Select either **Web (browser)** or **Mobile App**.

   - If you select **Mobile App**, also select your test device from the drop-down.
4. Click **Save & Continue**.



## Link Creation & Usage

Based on your selections, Branch creates a test link with all of the necessary information appended to allow you to fully test functionality.

To use your test link, Copy/Paste the Branch Ad Link to yourself (ex. send it to yourself via Slack).

Once you have your test link, click **Test**.



After you click the **Test** button, click the link on the device and perform the event you want to test.

## Viewing Test Results

Once you click the Branch test link provided in the steps above, Branch measures and attributes the click and resulting events. As this happens, these events are displayed in a timeline on the screen in real time.



For each event Branch measures, the following related data points are viewable. For each postback Branch fires, the following information is available:

- Response Status
- Response Time (in milliseconds)
- Request Timestamp
- Request URL
- Request Method
- Event Data (see previous itemized list)

#### What to Look For When Validating

- Check the expected macros are populated AND the response code. Most importantly, you'll want to verify the IDFA/AAID and the Click ID are populated.
- We recommend verifying the event with the ad partner even when the Response Code is 200 (successful). To do so, send them the event name, the postback request URL, device ID, timestamp, postback response code and response body.
- If you can’t find the postback you’re looking for, we recommend testing your ad link several more times to trigger the subsequent postback.

## Stopping and Restarting Testing

By default, once you click **Test**, Branch will listen for the resulting events for 10 minutes.

You can choose to stop the testing at any time by clicking **End Postback Testing** in the upper right-hand corner.



You can also restart the testing at any time by clicking **Start Postback Testing** in the upper right-hand corner.

