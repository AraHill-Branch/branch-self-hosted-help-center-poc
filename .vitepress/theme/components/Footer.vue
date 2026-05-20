<script setup lang="ts">
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="branch-footer">
    <div class="footer-content">
      <div class="footer-columns">
        <!-- Logo -->
        <div class="footer-logo">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="url(#branchGradient)"/>
            <path d="M20 12L28 20L20 28L12 20L20 12Z" fill="white"/>
            <defs>
              <linearGradient id="branchGradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop stop-color="#FF6C04"/>
                <stop offset="1" stop-color="#651BC8"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        <!-- Shortcuts -->
        <div class="footer-column">
          <h3>Shortcuts</h3>
          <ul>
            <li><a href="https://branch.io/security" target="_blank">Security</a></li>
            <li><a href="https://branch.io/pricing" target="_blank">Pricing</a></li>
            <li><a href="https://branch.io/contact-sales" target="_blank">Contact Sales</a></li>
            <li><a href="https://branch.io/events" target="_blank">Growth Events</a></li>
          </ul>
        </div>

        <!-- Company -->
        <div class="footer-column">
          <h3>Company</h3>
          <ul>
            <li><a href="https://branch.io/about" target="_blank">About Branch</a></li>
            <li><a href="https://branch.io/customers" target="_blank">Customers</a></li>
            <li><a href="https://branch.io/partners" target="_blank">Partner Program</a></li>
            <li><a href="https://branch.io/careers" target="_blank">Careers</a></li>
          </ul>
        </div>

        <!-- Resources -->
        <div class="footer-column">
          <h3>Resources</h3>
          <ul>
            <li><a href="https://help.branch.io" target="_blank">Documentation</a></li>
            <li><a href="https://branch.io/support" target="_blank">Support</a></li>
            <li><a href="https://branch.io/status" target="_blank">Status</a></li>
            <li><a href="https://branch.io/contact" target="_blank">Contact</a></li>
          </ul>
        </div>
      </div>

      <!-- Bottom section -->
      <div class="footer-bottom">
        <div class="footer-tagline">
          <p>Branch powers every touchpoint with links that work and insights that prove it. From click to conversion, we make growth measurable.</p>
        </div>

        <div class="footer-social">
          <a href="https://www.linkedin.com/company/branch-metrics" aria-label="LinkedIn" target="_blank" rel="noopener">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="https://www.facebook.com/branchmetrics" aria-label="Facebook" target="_blank" rel="noopener">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
        </div>

        <div class="footer-copyright">
          <p>&copy; 2026 Branch. All rights reserved</p>
        </div>

        <div class="footer-legal">
          <a href="https://branch.io/policies/privacy" target="_blank">Privacy</a>
          <span class="separator">|</span>
          <a href="https://branch.io/policies/terms" target="_blank">Terms</a>
          <span class="separator">|</span>
          <a href="https://branch.io/policies/gdpr" target="_blank">GDPR</a>
          <span class="separator">|</span>
          <a href="https://branch.io/policies/ccpa" target="_blank">CCPA</a>
          <span class="separator">|</span>
          <a href="https://branch.io/policies/opt-out" target="_blank">Opt Out</a>
          <span class="separator">|</span>
          <a href="https://branch.io/policies/discovery" target="_blank">Discovery Policies</a>
        </div>

        <div class="footer-scroll-top">
          <button @click="scrollToTop" aria-label="Scroll to top">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="16 12 12 8 8 12"/>
              <line x1="12" y1="16" x2="12" y2="8"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.branch-footer {
  position: relative;
  width: 100%;
  padding: 120px 0 24px;
  margin-top: -80px;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    transparent 10%,
    rgba(9, 1, 19, 0.05) 15%,
    rgba(9, 1, 19, 0.15) 22%,
    rgba(9, 1, 19, 0.35) 30%,
    rgba(9, 1, 19, 0.6) 40%,
    #090113 55%
  );
  overflow: hidden;
}

/* Background image + gradient overlay (matches header) */
.branch-footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('/banner_bg.png');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  opacity: 1;
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.6) 12%,
    rgba(0, 0, 0, 0.85) 20%,
    black 30%,
    black 100%
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.6) 12%,
    rgba(0, 0, 0, 0.85) 20%,
    black 30%,
    black 100%
  );
  pointer-events: none;
  z-index: 0;
}

/* Pink-purple gradient layer with fade at top */
.branch-footer::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(
      ellipse 85% 140% at 50% 100%,
      rgba(129, 18, 99, 0.6) 0%,
      rgba(129, 18, 99, 0.4) 12%,
      rgba(129, 18, 99, 0.25) 25%,
      rgba(129, 18, 99, 0.15) 40%,
      rgba(55, 8, 81, 0.08) 60%,
      transparent 100%
    ),
    linear-gradient(
      180deg,
      transparent 0%,
      transparent 20%,
      rgba(9, 1, 19, 0.05) 35%,
      rgba(9, 1, 19, 0.15) 55%,
      rgba(9, 1, 19, 0.3) 75%,
      rgba(9, 1, 19, 0.5) 100%
    );
  pointer-events: none;
  z-index: 0;
}

.footer-content {
  position: relative;
  z-index: 1;
  max-width: 1158px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-columns {
  display: grid;
  grid-template-columns: auto repeat(3, 1fr);
  gap: 40px;
  margin-bottom: 32px;
}

.footer-logo {
  display: flex;
  align-items: flex-start;
}

.footer-column h3 {
  font-size: 16px;
  font-weight: 600;
  color: #FFFFFF;
  margin: 0 0 12px;
}

.footer-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-column li {
  margin-bottom: 8px;
}

.footer-column a {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-column a:hover {
  color: #48BC7D;
}

.footer-bottom {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  align-items: start;
  padding-top: 24px;
}

.footer-tagline p {
  font-size: 14px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
}

.footer-social {
  display: flex;
  gap: 16px;
  justify-content: flex-end;
}

.footer-social a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(101, 27, 200, 0.1);
  border-radius: 50%;
  transition: all 0.2s ease;
}

.footer-social a:hover {
  color: #FFFFFF;
  background: rgba(101, 27, 200, 0.3);
  transform: translateY(-2px);
}

.footer-copyright {
  grid-column: 1 / 2;
  margin-top: 12px;
}

.footer-copyright p {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
}

.footer-legal {
  grid-column: 1 / 2;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-top: 8px;
}

.footer-legal a {
  font-size: 12px;
  color: #00B8DB;
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-legal a:hover {
  color: #48BC7D;
}

.footer-legal .separator {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.3);
}

.footer-scroll-top {
  position: absolute;
  right: 20px;
  bottom: 40px;
}

.footer-scroll-top button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(101, 27, 200, 0.15);
  border: 1px solid rgba(101, 27, 200, 0.3);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
}

.footer-scroll-top button:hover {
  color: #FFFFFF;
  background: rgba(101, 27, 200, 0.3);
  border-color: rgba(101, 27, 200, 0.5);
  transform: translateY(-2px);
}

@media (max-width: 960px) {
  .footer-columns {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }

  .footer-logo {
    grid-column: 1 / -1;
    justify-content: center;
  }

  .footer-bottom {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .footer-social {
    justify-content: flex-start;
  }

  .footer-scroll-top {
    right: 50%;
    transform: translateX(50%);
  }
}

@media (max-width: 960px) {
  .branch-footer {
    padding: 60px 0 24px;
  }

  .branch-footer::before {
    mask-image: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.7) 8%,
      black 18%,
      black 100%
    );
    -webkit-mask-image: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.7) 8%,
      black 18%,
      black 100%
    );
  }
}

@media (max-width: 640px) {
  .branch-footer {
    padding: 60px 0 80px;
  }

  .footer-columns {
    grid-template-columns: 1fr;
    gap: 32px;
    text-align: center;
  }

  .footer-logo {
    justify-content: center;
  }

  .footer-legal {
    justify-content: center;
  }

  .footer-social {
    justify-content: center;
  }
}
</style>
