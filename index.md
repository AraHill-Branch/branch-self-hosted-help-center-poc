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
   HOMEPAGE SECTIONS
   ================================ */
.home-sections {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ================================
   SECTION HEADINGS
   ================================ */
.section-heading {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 40px;
  letter-spacing: -0.3px;
}

.section-divider {
  margin: 80px 0 0;
  padding-top: 80px;
  border-top: 1px solid var(--vp-c-divider);
}

/* ================================
   FEATURED RESOURCES
   ================================ */
.resources-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
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
  right: -20px;
  width: 1px;
  height: 100%;
  background: linear-gradient(180deg, var(--vp-c-brand-1) 0%, transparent 100%);
  opacity: 0.25;
}

@media (max-width: 960px) {
  .resources-col:not(:last-child)::after { display: none; }
}

.resources-col h3 {
  font-size: 15px;
  font-weight: 700;
  margin: 0 0 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--vp-c-text-1);
}

.resources-col ul {
  list-style: none;
  padding: 0;
  margin: 0 0 20px;
}

.resources-col li {
  margin: 0;
}

.resources-col li a {
  display: block;
  padding: 8px 0;
  color: var(--vp-c-text-2);
  text-decoration: none;
  font-size: 14px;
  border-bottom: 1px solid var(--vp-c-divider);
  transition: all 0.2s ease;
}

.resources-col li a:hover {
  color: #48BC7D;
  padding-left: 6px;
}

.resources-col li a::before {
  content: "•";
  margin-right: 8px;
  color: var(--vp-c-brand-1);
  opacity: 0.5;
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
  gap: 48px;
  margin: 0;
  padding: 48px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

.dark .university-card {
  border-radius: 0;
  border-color: rgba(101, 27, 200, 0.3);
  background: linear-gradient(135deg, #130326 0%, #0F021F 100%);
}

.dark .university-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #FF6C04, #651BC8, #00B8DB);
  opacity: 0.6;
}

@media (max-width: 768px) {
  .university-card {
    flex-direction: column;
    padding: 32px;
    text-align: center;
  }
}

.university-card img {
  width: 340px;
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.dark .university-card img {
  border-radius: 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.university-card h3 {
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 12px;
}

.university-card p {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin: 0 0 20px;
  line-height: 1.7;
}

.university-card a.uni-link {
  color: #00B8DB;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: color 0.2s ease;
}

.university-card a.uni-link:hover {
  color: #48BC7D;
}

/* ================================
   FAQ SECTION
   ================================ */
.faq-layout {
  display: flex;
  gap: 64px;
  margin: 0;
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
  margin: 0 0 28px;
  letter-spacing: -0.3px;
}

.faq-btn {
  display: inline-block;
  padding: 14px 28px;
  color: var(--vp-c-text-1);
  border: 1px solid rgba(101, 27, 200, 0.5);
  background: transparent;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.dark .faq-btn {
  border-color: #651BC8;
  box-shadow: 0 0 0 0 rgba(101, 27, 200, 0);
}

.faq-btn:hover {
  background: #48BC7D;
  border-color: #48BC7D;
  color: #fff;
}

.dark .faq-btn:hover {
  box-shadow: 0 4px 16px rgba(72, 188, 125, 0.2);
}

.faq-list {
  flex: 1;
}

.faq-item {
  padding: 24px 0;
  border-top: 1px solid var(--vp-c-brand-1);
}

.dark .faq-item {
  border-top-color: #651BC8;
}

.faq-item:last-child {
  border-bottom: 1px solid var(--vp-c-brand-1);
}

.dark .faq-item:last-child {
  border-bottom-color: #651BC8;
}

.faq-item summary {
  cursor: pointer;
  font-size: 16px;
  color: var(--vp-c-text-2);
  list-style: none;
  transition: color 0.25s ease;
  padding-right: 32px;
  position: relative;
}

.faq-item summary::-webkit-details-marker { display: none; }

.faq-item summary::after {
  content: "+";
  position: absolute;
  right: 0;
  top: 0;
  font-size: 20px;
  font-weight: 300;
  color: var(--vp-c-brand-1);
  transition: transform 0.3s ease;
}

.faq-item[open] summary::after {
  transform: rotate(45deg);
}

.faq-item[open] summary {
  color: var(--vp-c-text-1);
}

.faq-item summary:hover {
  color: var(--vp-c-text-1);
}

.faq-item .faq-answer {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin: 16px 0 0;
  line-height: 1.7;
  padding-right: 32px;
}

.faq-item .faq-answer a {
  color: #00B8DB;
  text-decoration: none;
  transition: color 0.2s ease;
}

.faq-item .faq-answer a:hover {
  color: #48BC7D;
}

/* ================================
   BRANCH LINKS SECTION
   ================================ */
.links-section {
  display: flex;
  align-items: center;
  gap: 56px;
  margin: 0;
}

@media (max-width: 768px) {
  .links-section { flex-direction: column; }
}

.links-text {
  flex: 1;
}

.links-text .mono-label {
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  color: #FF6C04;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin: 0 0 16px;
  font-weight: 400;
}

.links-text h2 {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 16px;
  letter-spacing: -0.3px;
}

.links-text p {
  font-size: 15px;
  color: var(--vp-c-text-2);
  margin: 0 0 28px;
  line-height: 1.7;
}

.links-visual {
  flex: 1;
  text-align: center;
}

.links-visual img {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.dark .links-visual img {
  border-radius: 0;
  box-shadow: 0 8px 40px rgba(101, 27, 200, 0.15);
}

.cta-outline {
  display: inline-block;
  padding: 14px 36px;
  color: var(--vp-c-text-1);
  border: 1px solid rgba(101, 27, 200, 0.5);
  background: transparent;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.dark .cta-outline {
  border-color: #651BC8;
}

.cta-outline:hover {
  background: #48BC7D;
  border-color: #48BC7D;
  color: #fff;
}

.dark .cta-outline:hover {
  box-shadow: 0 4px 16px rgba(72, 188, 125, 0.2);
}

/* ================================
   CONTACT SECTION
   ================================ */
.contact-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin: 0 0 64px;
}

@media (max-width: 768px) {
  .contact-row { grid-template-columns: 1fr; }
}

.contact-item {
  padding: 32px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.dark .contact-item {
  border-radius: 0;
  border-color: rgba(101, 27, 200, 0.25);
  background: #130326;
}

.contact-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
}

.dark .contact-item:hover {
  border-color: #651BC8;
  box-shadow: 0 6px 24px rgba(101, 27, 200, 0.12);
}

.contact-item h3 {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 10px;
}

.contact-item p {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin: 0 0 16px;
  line-height: 1.6;
}

.contact-link {
  color: #00B8DB;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: color 0.2s ease;
}

.contact-link:hover {
  color: #48BC7D;
}
</style>

<div class="home-sections">

<div class="section-divider">
  <h2 class="section-heading">Featured Resources</h2>
</div>

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

<div class="section-divider">
  <div class="university-card">
    <img src="/img/new_visual_img_01_2.png" alt="Branch University" />
    <div>
      <h3>Branch University</h3>
      <p>Branch University offers self-paced learning with curated training paths, certifications, and hands-on modules to help marketers master deep linking, attribution, and the Branch Growth Platform for effective mobile marketing.</p>
      <a href="https://university.branch.io" target="_blank" class="uni-link">Learn More About Branch →</a>
    </div>
  </div>
</div>

<div class="section-divider">
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

<div class="section-divider">
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

<div class="section-divider">
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
