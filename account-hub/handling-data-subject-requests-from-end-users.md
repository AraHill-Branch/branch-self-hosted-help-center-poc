---
title: "Handle Data Subject Requests From End Users"
slug: handling-data-subject-requests-from-end-users
---

## Overview

This documentation contains information on the procedure for submitting data subject requests to Branch for your end users, to support you in your compliance efforts with applicable data protection laws like GDPR. When your end users exercise their rights under applicable data protection laws, Branch is committed to working with you to fulfill these requests, provided the request comes directly from you. The purpose of this document is to outline the process in which you & Branch will coordinate to facilitate data subject requests for your end users.

## Branch Data Subject Deletion Request Process

- **Construct a batched request in .CSV file format for all outstanding data deletion requests which contains the following information and adhere** [**to this file format**](https://cdn.us.document360.io/082e8be0-ad38-4650-9062-689a75e517a2/Images/Documentation/gdpr-request-template.xlsx) **("Data Subject Deletion Request Template").**

  - **device\_id** - an ID pertaining to the end user’s device. This could be a number of different identifiers depending on the user’s device type (e.g. IDFA, GAID, IDFV, AAID, MAC address, Roku RIDA, Fire Ad ID, etc.)

    - Note: In the event IDFA is unavailable due to iOS 14 updates, Branch will only be able to process the respective data subject request if you provide a secondary identifier like IDFV or developer\_id.
  - **developer\_id** - an ID set by you. This is a way for you to identify your users using your own convention (e.g. unique alphanumeric ID, etc.)
  - **browser\_id** - also known as browser\_fingerprint\_id, which is a unique ID created by Branch to identify a specific browser
  - **user\_id** - an ID set by you. This is a way for you to identify your users using your own naming convention (e.g. unique alphanumeric ID, etc.)
- **Submit the batched request through our Data Subject Request Portal:**

  - Visit the Branch Privacy Center and fill out the Deletion Request[form](https://preferences.branch.io/form/deletion).
  - **Required Fields:**

    - **Email Address**: your email address
    - **Requestor**: Select “Someone else’s behalf”
    - **Request Type:** Select "Data Deletion"
    - **Original Request Date**: Input date of submission
    - **Subject**: "[Your company Name] - Deletion request - [MM/DD/YYYY]"
    - **Description**: "Requesting data deletion request for the list of attached IDs."

      - Please Include your App ID. *see below Security/Request Validation*
    - **Attachments**: upload .CSV file
- **Security/Request Validation:**

  - If it is the first time Branch has received a data subject request from you, we will need to validate the request for security purposes and ask that you provide the following information to carry out the request:

    - Your Branch App ID(s) for the app(s) at issue (available under **Account > Settings > Profile** in [legacy Branch](branch-dashboard-overview.md) or under **Configuration > App Settings > General** in [new Branch](new-branch-overview.md));
    - Please copy in your reply at least one person who is listed as an admin on the app's Branch account, and have each admin reply-all to confirm that the request should be executed
- **Branch’s Privacy Team** will confirm completion via email.

  - **Please note that you should expect a confirmation within 7-14 business days from submission time**

## Branch Data Subject Access Request Process

- **Construct a batched request for all outstanding data access requests which contains the following information and adheres to** [**this file format**](https://cdn.us.document360.io/082e8be0-ad38-4650-9062-689a75e517a2/Images/Documentation/gdpr-request-template.xlsx) **(" Data Subject Access Request Template")**

  - **device\_id** - an ID pertaining to the end user’s device. This could be a number of different identifiers depending on the user’s device type (e.g. IDFA, GAID, IDFV, AAID, MAC address, etc)

    - Note: In the event IDFA is unavailable due to iOS 14 updates, Branch will only be able to process the respective data subject request if you provide a secondary identifier like IDFV or developer\_id.
  - **developer\_id** - an ID set by you. This is a way for you to identify your users using your own convention (e.g. unique alphanumeric ID, etc)
  - **browser\_id** - also known as browser\_fingerprint\_id, which is a unique ID created by Branch to identify a specific browser
  - **user\_id** - an ID set by you. This is a way for you to identify your users using your own naming convention (e.g. unique alphanumeric ID, etc)
- **Submit a Request through our Data Subject Request Portal:**

  - Visit the Branch Privacy Center and fill out the Deletion Request[form](https://preferences.branch.io/form/deletion).
  - **Required Fields:**

    - **Email Address**: your email address/alias
    - **Requestor** Select “Someone else’s behalf”
    - **Request Type:** Select "Access to Data"
    - **Original Request Date**: Input date of submission
    - **Subject**: "[Your company Name] - Data Access Request - [MM/DD/YYYY]"
    - **Description**: "Requesting data on the list of attached IDs."

      - Please Include your App ID. *see below Security/Request Validation*
    - **Attachments**: upload .CSV file
- **Security/ Request Validation:**

  - If it is the first time we have received a data subject request from you, we ask that you provide the following information to carry out the request (and for security reasons):

    - Your Branch App ID(s) for the app(s) at issue (available under **Account > Settings > Profile** in [legacy Branch](branch-dashboard-overview.md) or under **Configuration > App Settings > General** in [new Branch](new-branch-overview.md));
    - Please copy in your reply at least one person who is listed as an admin on the app's Branch account, and have each admin reply-all to confirm that the request should be executed
- **Branch’s Privacy Team will confirm completion of executing the request via email**

  - **Please note that you should expect a confirmation within 7-14 business days from submission time**

    - **NOTE: If applicable law requires a prompter response, please contact us at** [**privacy@branch.io**](mailto:privacy@branch.io)**.**
  - Branch will provide you with a file that contains the end user’s personal data subject to the request
  - File Details:

    - There will be one output file per submission request
    - **Status:** if Branch possesses personal data for the end user status will be 200; if not it will be 400
    - **URL**: if Branch possesses personal data for a particular end user subject to the data access request, the file will contain a URL for which the end user can click and a separate JSON file can be opened in browser. The generated report is available for seven days from the time of completion of the request.