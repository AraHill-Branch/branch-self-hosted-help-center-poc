---
layout: home

hero:
  name: Branch Help Center
  text: ""
  tagline: Learn how to implement and maintain your Branch products.
  actions:
    - theme: brand
      text: Get Help
      link: https://www.branch.io/contact/

features:
  - icon:
      src: /img/icon-account.png
      width: 48
      height: 48
    title: Account Hub
    details: Account and admin resources for setting up and configuring Branch.
    link: /account-hub/
  - icon:
      src: /img/icon-marketer.png
      width: 48
      height: 48
    title: Marketer Hub
    details: Resources for your daily Branch workflows, like campaign management and analytics.
    link: /marketer-hub/
  - icon:
      src: /img/icon-developer.png
      width: 48
      height: 48
    title: Developer Hub
    details: SDK, API, and integration documentation for developers using Branch.
    link: /developer-hub/
---

<style>
/* ================================
   LAYOUT
   ================================ */
.home-sections {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 24px 64px;
}

.home-section {
  padding: 56px 0;
  border-top: 1px solid var(--vp-c-divider);
}

.home-section:first-child {
  padding-top: 48px;
  border-top: none;
}

.section-heading {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 32px;
  letter-spacing: -0.3px;
  color: var(--vp-c-text-1);
}

/* ================================
   FEATURE CARD ICON FIX (light mode)
   ================================ */
.VPFeature .icon img {
  padding: 8px;
  border-radius: 10px;
  background: #0F021F;
}

/* ================================
   FEATURED RESOURCES
   ================================ */
.resources-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}

@media (max-width: 960px) {
  .resources-row { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 580px) {
  .resources-row { grid-template-columns: 1fr; }
}

.resources-col {
  position: relative;
}

.resources-col:not(:last-child)::after {
  content: "";
  position: absolute;
  top: 0;
  right: -16px;
  width: 1px;
  height: 100%;
  background: linear-gradient(180deg, var(--vp-c-divider) 0%, transparent 100%);
}

.dark .resources-col:not(:last-child)::after {
  background: linear-gradient(180deg, rgba(101, 27, 200, 0.3) 0%, transparent 100%);
}

@media (max-width: 960px) {
  .resources-col:not(:last-child)::after { display: none; }
}

.resources-col h3 {
  font-size: 14px;
  font-weight: 700;
  margin: 0 0 16px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: var(--vp-c-text-1);
}

.resources-col ul {
  list-style: none;
  padding: 0;
  margin: 0 0 16px;
}

.resources-col li a {
  display: block;
  padding: 7px 0 7px 16px;
  color: var(--vp-c-text-2);
  text-decoration: none;
  font-size: 14px;
  border-bottom: 1px solid var(--vp-c-divider);
  transition: all 0.2s ease;
  position: relative;
}

.resources-col li a::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #651BC8;
}

.dark .resources-col li a::before {
  color: #9241FF;
}

.resources-col li a:hover {
  color: #48BC7D;
  padding-left: 20px;
}

.view-all {
  color: #00B8DB;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  transition: color 0.2s ease;
}

.view-all:hover {
  color: #48BC7D;
}

/* ================================
   UNIVERSITY CALLOUT
   ================================ */
.university-card {
  display: flex;
  align-items: center;
  gap: 40px;
  padding: 40px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

.university-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #651BC8, #00B8DB);
}

.dark .university-card {
  border-radius: 0;
  border-color: rgba(101, 27, 200, 0.3);
  background: linear-gradient(135deg, #130326 0%, #0F021F 100%);
}

.dark .university-card::before {
  background: linear-gradient(90deg, #FF6C04, #651BC8, #00B8DB);
  opacity: 0.7;
}

@media (max-width: 768px) {
  .university-card {
    flex-direction: column;
    padding: 0;
    text-align: center;
  }
  .university-card .uni-text { padding: 24px; }
}

.university-card img {
  width: 320px;
  max-width: 100%;
  border-radius: 8px;
  object-fit: cover;
}

.dark .university-card img {
  border-radius: 0;
}

.university-card h3 {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 10px;
  color: var(--vp-c-text-1);
}

.university-card p {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin: 0 0 16px;
  line-height: 1.7;
}

.uni-link {
  color: #00B8DB;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: color 0.2s ease;
}

.uni-link:hover {
  color: #48BC7D;
}

/* ================================
   FAQ SECTION
   ================================ */
.faq-layout {
  display: flex;
  gap: 56px;
}

@media (max-width: 768px) {
  .faq-layout { flex-direction: column; gap: 32px; }
}

.faq-heading {
  width: 30%;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .faq-heading { width: 100%; }
}

.faq-heading h2 {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 24px;
  letter-spacing: -0.3px;
  color: var(--vp-c-text-1);
}

.faq-btn {
  display: inline-block;
  padding: 12px 24px;
  color: var(--vp-c-text-1);
  border: 1px solid #651BC8;
  background: transparent;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.25s ease;
}

.faq-btn:hover {
  background: #48BC7D;
  border-color: #48BC7D;
  color: #fff;
}

.faq-list {
  flex: 1;
}

.faq-item {
  padding: 20px 0;
  border-top: 1px solid #e2e0e6;
}

.dark .faq-item {
  border-top-color: #651BC8;
}

.faq-item:last-child {
  border-bottom: 1px solid #e2e0e6;
}

.dark .faq-item:last-child {
  border-bottom-color: #651BC8;
}

.faq-item summary {
  cursor: pointer;
  font-size: 15px;
  color: var(--vp-c-text-2);
  list-style: none;
  transition: color 0.2s ease;
  padding-right: 32px;
  position: relative;
  line-height: 1.5;
}

.faq-item summary::-webkit-details-marker { display: none; }

.faq-item summary::after {
  content: "+";
  position: absolute;
  right: 0;
  top: 0;
  font-size: 18px;
  font-weight: 300;
  color: #651BC8;
  transition: transform 0.3s ease;
}

.dark .faq-item summary::after {
  color: #9241FF;
}

.faq-item[open] summary::after {
  transform: rotate(45deg);
}

.faq-item[open] summary,
.faq-item summary:hover {
  color: var(--vp-c-text-1);
}

.faq-answer {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin: 12px 0 0;
  line-height: 1.7;
  padding-right: 32px;
}

.faq-answer a {
  color: #00B8DB;
  text-decoration: none;
}

.faq-answer a:hover {
  color: #48BC7D;
}

/* ================================
   BRANCH LINKS SECTION
   ================================ */
.links-section {
  display: flex;
  align-items: center;
  gap: 48px;
}

@media (max-width: 768px) {
  .links-section { flex-direction: column; }
}

.links-text {
  flex: 1;
}

.mono-label {
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  color: #FF6C04;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin: 0 0 12px;
}

.links-text h2 {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 12px;
  letter-spacing: -0.3px;
  color: var(--vp-c-text-1);
}

.links-text p {
  font-size: 15px;
  color: var(--vp-c-text-2);
  margin: 0 0 24px;
  line-height: 1.7;
}

.links-visual {
  flex: 1;
  text-align: center;
}

.links-visual img {
  max-width: 100%;
  border-radius: 8px;
}

.dark .links-visual img {
  border-radius: 0;
}

.cta-outline {
  display: inline-block;
  padding: 12px 32px;
  color: var(--vp-c-text-1);
  border: 1px solid #651BC8;
  background: transparent;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.25s ease;
}

.cta-outline:hover {
  background: #48BC7D;
  border-color: #48BC7D;
  color: #fff;
}

/* ================================
   CONTACT SECTION
   ================================ */
.contact-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 768px) {
  .contact-row { grid-template-columns: 1fr; }
}

.contact-item {
  padding: 28px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  transition: all 0.25s ease;
}

.dark .contact-item {
  border-radius: 0;
  border-color: rgba(101, 27, 200, 0.25);
  background: #130326;
}

.contact-item:hover {
  transform: translateY(-2px);
  border-color: #651BC8;
  box-shadow: 0 4px 16px rgba(101, 27, 200, 0.08);
}

.dark .contact-item:hover {
  box-shadow: 0 4px 20px rgba(101, 27, 200, 0.15);
}

.contact-item h3 {
  font-size: 15px;
  font-weight: 700;
  margin: 0 0 8px;
  color: var(--vp-c-text-1);
}

.contact-item p {
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin: 0 0 14px;
  line-height: 1.6;
}

.contact-link {
  color: #00B8DB;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  transition: color 0.2s ease;
}

.contact-link:hover {
  color: #48BC7D;
}
</style>

<div class="home-sections">

<div class="home-section">
  <h2 class="section-heading">Featured Resources</h2>
  <div class="resources-row">
    <div class="resources-col">
      <h3>Beginner Resources</h3>
      <ul>
        <li><a href="/account-hub/what-is-branch">What is Branch?</a></li>
        <li><a href="/account-hub/onboarding-guide">Onboarding Guide</a></li>
        <li><a href="/account-hub/glossary">Glossary</a></li>
      </ul>
      <a href="/account-hub/getting-started" class="view-all">View All →</a>
    </div>
    <div class="resources-col">
      <h3>Use Cases</h3>
      <ul>
        <li><a href="/marketer-hub/ads-overview">SEO and AIO App Attribution</a></li>
        <li><a href="/account-hub/qr-codes">QR Codes</a></li>
        <li><a href="/account-hub/household-measurement">Household Measurement</a></li>
      </ul>
      <a href="/account-hub/" class="view-all">View All →</a>
    </div>
    <div class="resources-col">
      <h3>Branch Dashboard</h3>
      <ul>
        <li><a href="/account-hub/branch-dashboard-overview">Dashboard Overview</a></li>
        <li><a href="/account-hub/configure-default-link-behaviors">Configure Link Behaviors</a></li>
        <li><a href="/account-hub/attribution-windows-link-settings">Adjust Attribution Windows</a></li>
      </ul>
      <a href="/account-hub/dashboard-configuration" class="view-all">View All →</a>
    </div>
    <div class="resources-col">
      <h3>Branch Links</h3>
      <ul>
        <li><a href="/account-hub/creating-a-deep-link">Create Deep Links</a></li>
        <li><a href="/account-hub/create-quick-links">Create Quick Links</a></li>
        <li><a href="/marketer-hub/ad-links">Create Ad Links</a></li>
      </ul>
      <a href="/account-hub/create-branch-links" class="view-all">View All →</a>
    </div>
  </div>
</div>

<div class="home-section">
  <div class="university-card">
    <img src="/img/new_visual_img_01_2.png" alt="Branch University" />
    <div class="uni-text">
      <h3>Branch University</h3>
      <p>Branch University offers self-paced learning with curated training paths, certifications, and hands-on modules to help marketers master deep linking, attribution, and the Branch Growth Platform for effective mobile marketing.</p>
      <a href="https://university.branch.io" target="_blank" class="uni-link">Learn More About Branch →</a>
    </div>
  </div>
</div>

<div class="home-section">
  <div class="faq-layout">
    <div class="faq-heading">
      <h2>Frequently Asked Questions</h2>
      <a href="/account-hub/products" class="faq-btn">More About Branch Products</a>
    </div>
    <div class="faq-list">
      <details class="faq-item">
        <summary>What is the difference between Engagement and Performance?</summary>
        <p class="faq-answer">Branch's <a href="/account-hub/products#engagement">Engagement</a> and <a href="/account-hub/products#performance">Performance</a> products serve two distinct purposes. Engagement is for <strong>owned</strong> and <strong>organic</strong> channel campaigns, while Performance is for <strong>paid</strong> channel campaigns.</p>
      </details>
      <details class="faq-item">
        <summary>Which Engagement features are best used for organic marketing campaigns?</summary>
        <p class="faq-answer">For organic marketing campaigns, start by looking at <a href="/account-hub/create-quick-links">Quick Links</a>, <a href="/account-hub/journeys-overview">Journeys</a>, <a href="/account-hub/qr-codes">QR Codes</a>, and <a href="/marketer-hub/email-overview">Email</a> features.</p>
      </details>
      <details class="faq-item">
        <summary>Which Performance features are best used for paid ad campaigns?</summary>
        <p class="faq-answer">For paid ad campaigns, start by looking at <a href="/marketer-hub/ads-overview">Ads</a>, <a href="/account-hub/engagement-builder">Engagement Builder</a>, and <a href="/account-hub/roi-hub">ROI Hub</a> features.</p>
      </details>
      <details class="faq-item">
        <summary>What is an attribution window?</summary>
        <p class="faq-answer">An attribution window is the length of time in which a conversion event (like an app install) can be claimed by an event caused by an advertising campaign (like a link click). You can set your attribution window in the <a href="/account-hub/attribution-windows-link-settings">Branch Dashboard</a>.</p>
      </details>
      <details class="faq-item">
        <summary>What is the difference between deep linking and deferred deep linking?</summary>
        <p class="faq-answer"><a href="/account-hub/creating-a-deep-link">Deep linking</a> takes users directly to content within your app, whereas <a href="/marketer-hub/san-deferred-deep-linking">deferred deep linking</a> asks a user to install the app before taking them to the content.</p>
      </details>
      <details class="faq-item">
        <summary>What is Advanced Compliance?</summary>
        <p class="faq-answer"><a href="/account-hub/advanced-compliance">Advanced Compliance</a> is a Branch feature that helps companies in healthcare or other highly regulated industries benefit from Branch's measurement tools, without sacrificing user privacy.</p>
      </details>
    </div>
  </div>
</div>

<div class="home-section">
  <div class="links-section">
    <div class="links-text">
      <p class="mono-label">/ Deep Linking</p>
      <h2>Branch Links</h2>
      <p>Create Branch Links to share web links, deeplink to pages in your app, track ads, and more.</p>
      <a href="/account-hub/create-branch-links" class="cta-outline">Create a Link</a>
    </div>
    <div class="links-visual">
      <img src="/img/new_visual_img_02_2.png" alt="Branch Links — SMS, Social, Email, Ads" />
    </div>
  </div>
</div>

<div class="home-section">
  <h2 class="section-heading">Can't find what you're looking for?</h2>
  <div class="contact-row">
    <div class="contact-item">
      <h3>Contact Us</h3>
      <p>Send us a note and we'll get back to you as soon as we can.</p>
      <a href="https://www.branch.io/contact/" target="_blank" class="contact-link">Get in Touch →</a>
    </div>
    <div class="contact-item">
      <h3>Ask the Community</h3>
      <p>Find our developers and the Branch community on Stack Overflow.</p>
      <a href="https://stackoverflow.com/questions/tagged/branch.io" target="_blank" class="contact-link">Ask a Question →</a>
    </div>
    <div class="contact-item">
      <h3>System Status</h3>
      <p>Check the status of Branch's systems to see if everything's up and running.</p>
      <a href="https://status.branch.io/" target="_blank" class="contact-link">Check Status →</a>
    </div>
  </div>
</div>

</div>
