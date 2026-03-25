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
  - icon: 👤
    title: Account Hub
    details: Account and admin resources for setting up and configuring Branch.
    link: /account-hub/
  - icon: 📊
    title: Marketer Hub
    details: Resources for your daily Branch workflows, like campaign management and analytics.
    link: /marketer-hub/
  - icon: 🔗
    title: Developer Hub
    details: SDK, API, and integration documentation for developers using Branch.
    link: /developer-hub/
---

<style>
.home-sections {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 24px;
}

.home-sections h2 {
  font-size: 32px;
  font-weight: 700;
  margin: 72px 0 40px;
}

/* Featured Resources */
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

.resources-col h3 {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 16px;
}

.resources-col ul {
  list-style: disc;
  padding-left: 20px;
  margin: 0 0 16px;
}

.resources-col li {
  margin: 0 0 8px;
}

.resources-col li a {
  color: var(--vp-c-text-1);
  text-decoration: none;
  font-size: 14px;
}

.resources-col li a:hover {
  color: var(--vp-c-brand-1);
}

.view-all {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
}

.view-all:hover {
  color: var(--vp-c-brand-2);
}

/* University callout */
.university-card {
  display: flex;
  align-items: center;
  gap: 40px;
  margin: 72px 0;
  padding: 40px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
}

@media (max-width: 768px) {
  .university-card {
    flex-direction: column;
    text-align: center;
  }
}

.university-card img {
  width: 360px;
  max-width: 100%;
  border-radius: 8px;
}

.university-card h3 {
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 12px;
}

.university-card p {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin: 0 0 16px;
  line-height: 1.6;
}

.university-card a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
}

.university-card a:hover {
  color: var(--vp-c-brand-2);
}

/* FAQ */
.faq-layout {
  display: flex;
  gap: 56px;
  margin: 72px 0;
}

@media (max-width: 768px) {
  .faq-layout { flex-direction: column; gap: 32px; }
}

.faq-heading {
  width: 35%;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .faq-heading { width: 100%; }
}

.faq-heading h2 {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 24px;
}

.faq-btn {
  display: inline-block;
  padding: 12px 24px;
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-brand-1);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}

.faq-btn:hover {
  background: var(--vp-c-brand-1);
  color: #fff;
}

.faq-list {
  flex: 1;
}

.faq-item {
  padding: 24px 0;
  border-top: 1px solid var(--vp-c-brand-1);
}

.faq-item:last-child {
  border-bottom: 1px solid var(--vp-c-brand-1);
}

.faq-item summary {
  cursor: pointer;
  font-size: 16px;
  color: var(--vp-c-text-2);
  list-style: none;
  transition: color 0.2s;
}

.faq-item summary::-webkit-details-marker { display: none; }

.faq-item[open] summary {
  color: var(--vp-c-text-1);
}

.faq-item summary:hover {
  color: var(--vp-c-text-1);
}

.faq-item p {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin: 16px 0 0;
  line-height: 1.6;
}

.faq-item a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

/* Branch Links visual section */
.links-section {
  display: flex;
  align-items: center;
  gap: 48px;
  margin: 72px 0;
}

@media (max-width: 768px) {
  .links-section { flex-direction: column; }
}

.links-text { flex: 1; }

.links-text .mono-label {
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  color: #FF6900;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 0 12px;
}

.links-text h2 {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 16px;
}

.links-text p {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin: 0 0 24px;
  line-height: 1.6;
}

.links-visual {
  flex: 1;
  text-align: center;
}

.links-visual img {
  max-width: 100%;
  border-radius: 8px;
}

.cta-outline {
  display: inline-block;
  padding: 12px 32px;
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-brand-1);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}

.cta-outline:hover {
  background: var(--vp-c-brand-1);
  color: #fff;
}

/* Contact section */
.contact-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin: 72px 0 48px;
}

@media (max-width: 768px) {
  .contact-row { grid-template-columns: 1fr; }
}

.contact-item h3 {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.contact-item p {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin: 0 0 12px;
  line-height: 1.5;
}

.contact-item a.contact-link {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
}

.contact-item a.contact-link:hover {
  color: var(--vp-c-brand-2);
}
</style>

<div class="home-sections">

## Featured Resources

<div class="resources-row">
  <div class="resources-col">
    <h3>Beginner Resources</h3>
    <ul>
      <li><a href="/account-hub/what-is-branch">What is Branch?</a></li>
      <li><a href="/account-hub/onboarding-guide">Onboarding Guide</a></li>
      <li><a href="/account-hub/glossary">Glossary</a></li>
    </ul>
    <a href="/account-hub/getting-started" class="view-all">View All</a>
  </div>
  <div class="resources-col">
    <h3>Use Cases</h3>
    <ul>
      <li><a href="/marketer-hub/ads-overview">SEO and AIO App Attribution</a></li>
      <li><a href="/account-hub/qr-codes">QR Codes</a></li>
      <li><a href="/account-hub/household-measurement">Household Measurement</a></li>
    </ul>
    <a href="/account-hub/" class="view-all">View All</a>
  </div>
  <div class="resources-col">
    <h3>Branch Dashboard</h3>
    <ul>
      <li><a href="/account-hub/branch-dashboard-overview">Branch Dashboard Overview</a></li>
      <li><a href="/account-hub/configure-default-link-behaviors">Configure Link Behaviors</a></li>
      <li><a href="/account-hub/attribution-windows-link-settings">Adjust Attribution Windows</a></li>
    </ul>
    <a href="/account-hub/dashboard-configuration" class="view-all">View All</a>
  </div>
  <div class="resources-col">
    <h3>Branch Links</h3>
    <ul>
      <li><a href="/account-hub/creating-a-deep-link">Create Deep Links</a></li>
      <li><a href="/account-hub/create-quick-links">Create Quick Links</a></li>
      <li><a href="/marketer-hub/ad-links">Create Ad Links</a></li>
    </ul>
    <a href="/account-hub/create-branch-links" class="view-all">View All</a>
  </div>
</div>

<div class="university-card">
  <img src="/img/new_visual_img_01_2.png" alt="Branch University" />
  <div>
    <h3>Branch University</h3>
    <p>Branch University offers self-paced learning with curated training paths, certifications, and hands-on modules to help marketers master deep linking, attribution, and the Branch Growth Platform for effective mobile marketing.</p>
    <a href="https://university.branch.io" target="_blank">Learn More About Branch →</a>
  </div>
</div>

<div class="faq-layout">
  <div class="faq-heading">
    <h2>Frequently Asked Questions</h2>
    <a href="/account-hub/products" class="faq-btn">More About Branch Products</a>
  </div>
  <div class="faq-list">
    <details class="faq-item">
      <summary>What is the difference between Engagement and Performance?</summary>
      <p>Branch's <a href="/account-hub/products#engagement">Engagement</a> and <a href="/account-hub/products#performance">Performance</a> products serve two distinct purposes. Engagement is for <strong>owned</strong> and <strong>organic</strong> channel campaigns, while Performance is for <strong>paid</strong> channel campaigns.</p>
    </details>
    <details class="faq-item">
      <summary>Which Engagement features are best used for organic marketing campaigns?</summary>
      <p>For organic marketing campaigns, start by looking at <a href="/account-hub/create-quick-links">Quick Links</a>, <a href="/account-hub/journeys-overview">Journeys</a>, <a href="/account-hub/qr-codes">QR Codes</a>, and <a href="/marketer-hub/email-overview">Email</a> features.</p>
    </details>
    <details class="faq-item">
      <summary>Which Performance features are best used for paid ad campaigns?</summary>
      <p>For paid ad campaigns, start by looking at <a href="/marketer-hub/ads-overview">Ads</a>, <a href="/account-hub/engagement-builder">Engagement Builder</a>, and <a href="/account-hub/roi-hub">ROI Hub</a> features.</p>
    </details>
    <details class="faq-item">
      <summary>What is an attribution window?</summary>
      <p>An attribution window is the length of time in which a conversion event (like an app install) can be claimed by an event caused by an advertising campaign (like a link click). You can set your attribution window in the <a href="/account-hub/attribution-windows-link-settings">Branch Dashboard</a>.</p>
    </details>
    <details class="faq-item">
      <summary>What is the difference between deep linking and deferred deep linking?</summary>
      <p><a href="/account-hub/creating-a-deep-link">Deep linking</a> takes users directly to content within your app, whereas <a href="/marketer-hub/san-deferred-deep-linking">deferred deep linking</a> asks a user to install the app before taking them to the content.</p>
    </details>
    <details class="faq-item">
      <summary>What is Advanced Compliance?</summary>
      <p><a href="/account-hub/advanced-compliance">Advanced Compliance</a> is a Branch feature that helps companies in healthcare or other highly regulated industries benefit from Branch's measurement tools, without sacrificing user privacy.</p>
    </details>
  </div>
</div>

<div class="links-section">
  <div class="links-text">
    <p class="mono-label">/ Deep Linking</p>
    <h2>Branch Links</h2>
    <p>Create Branch Links to share web links, deeplink to pages in your app, track ads, and more.</p>
    <a href="/account-hub/create-branch-links" class="cta-outline">Create a Link</a>
  </div>
  <div class="links-visual">
    <img src="/img/new_visual_img_02_2.png" alt="Branch Links" />
  </div>
</div>

## Can't find what you're looking for?

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
