import type { Metadata } from "next";
import { Link } from "next-view-transitions";

import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "Learn how DC Trades collects, uses, protects, and manages your personal information and trading journal data.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Navigation Link */}
        <nav className="mb-6 border-b border-border pb-3 text-xs">
          <Link
            href="/"
            className="text-muted-foreground transition-colors hover:text-foreground hover:underline"
          >
            ← Back to DC Trades
          </Link>
        </nav>

        {/* Main Article Header */}
        <header className="mb-6 border-b border-border pb-2">
          <h1 className="font-serif text-3xl font-normal tracking-tight md:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            From DC Trades, the free trading journal
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Main Content Column */}
          <div className="md:col-span-3">
            {/* Lead Paragraphs */}
            <div className="space-y-3 text-sm leading-relaxed">
              <p>
                DC Trades (&quot;DC Trades&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) respects your
                privacy and is committed to protecting the information you provide
                when using our website, application, and related services
                (collectively, the &quot;Service&quot;).
              </p>
              <p>
                This Privacy Policy explains what information we collect, why we
                collect it, how we use and protect it, when information may be
                shared, and the choices and rights available to you.
              </p>
            </div>

            {/* Wikipedia-style Table of Contents */}
            <nav className="my-6 inline-block min-w-65 rounded border border-border bg-muted/30 p-3 text-xs">
              <p className="mb-2 border-b border-border pb-1 font-normal text-foreground">
                Contents
              </p>
              <ol className="space-y-1 text-muted-foreground list-decimal list-inside">
                <li><a href="#about" className="hover:underline">About DC Trades</a></li>
                <li><a href="#info-collect" className="hover:underline">Information We Collect</a></li>
                <li><a href="#info-use" className="hover:underline">How We Use Information</a></li>
                <li><a href="#trading-financial" className="hover:underline">Trading and Financial Information</a></li>
                <li><a href="#user-content" className="hover:underline">User Content</a></li>
                <li><a href="#protect-info" className="hover:underline">How We Protect Information</a></li>
                <li><a href="#info-sharing" className="hover:underline">Information Sharing</a></li>
                <li><a href="#payments" className="hover:underline">Payments</a></li>
                <li><a href="#cookies" className="hover:underline">Cookies and Similar Technologies</a></li>
                <li><a href="#legal-basis" className="hover:underline">Legal Basis for Processing</a></li>
                <li><a href="#int-data" className="hover:underline">International Data Processing</a></li>
                <li><a href="#eea-uk-rights" className="hover:underline">European Economic Area and UK Privacy Rights</a></li>
                <li><a href="#india-rights" className="hover:underline">India Privacy Rights</a></li>
                <li><a href="#data-retention" className="hover:underline">Data Retention</a></li>
                <li><a href="#account-deletion" className="hover:underline">Account and Data Deletion</a></li>
                <li><a href="#incidents" className="hover:underline">Security Incidents</a></li>
                <li><a href="#childrens-privacy" className="hover:underline">Children&apos;s Privacy</a></li>
                <li><a href="#third-party" className="hover:underline">Third-Party Services</a></li>
                <li><a href="#changes" className="hover:underline">Changes to This Privacy Policy</a></li>
                <li><a href="#contact" className="hover:underline">Contact Us</a></li>
              </ol>
            </nav>

            {/* Article Sections */}
            <article className="space-y-8 text-sm leading-relaxed">
              <section id="about">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  1. About DC Trades
                </h2>
                <p className="mb-3">
                  DC Trades is a digital trading journal and record-keeping service.
                  It allows users to manually record, organize, review, and analyze
                  their own trading activity.
                </p>
                <p>
                  DC Trades does not act as a broker, exchange, investment manager,
                  financial institution, or custodian of customer funds. DC Trades
                  does not execute trades or make investment decisions on behalf of
                  users.
                </p>
              </section>

              <section id="info-collect">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  2. Information We Collect
                </h2>
                <p className="mb-4">
                  We collect information that is reasonably necessary to provide,
                  secure, maintain, and improve the Service.
                </p>

                <h3 className="text-base font-normal text-foreground mt-4 mb-2">
                  2.1 Account Information
                </h3>
                <p className="mb-2">When you create or maintain an account, we may collect:</p>
                <ul className="list-disc list-inside space-y-1 pl-2 text-muted-foreground mb-4">
                  <li>Your name</li>
                  <li>Your email address</li>
                  <li>Authentication and account information</li>
                  <li>Account preferences and settings</li>
                </ul>

                <h3 className="text-base font-normal text-foreground mt-4 mb-2">
                  2.2 Journal Information
                </h3>
                <p className="mb-2">
                  You may voluntarily enter information into your trading journal,
                  including:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2 text-muted-foreground mb-3">
                  <li>Trading instruments</li>
                  <li>Entry and exit information</li>
                  <li>Trade dates and times</li>
                  <li>Position sizes</li>
                  <li>Profit and loss information</li>
                  <li>Risk and reward information</li>
                  <li>Trading strategies</li>
                  <li>Trade notes and observations</li>
                  <li>Images and screenshots</li>
                </ul>
                <p className="mb-4">
                  This information is entered by you. DC Trades does not connect to
                  your brokerage account to execute trades or move funds on your
                  behalf unless a future feature explicitly states otherwise.
                </p>

                <h3 className="text-base font-normal text-foreground mt-4 mb-2">
                  2.3 Technical and Security Information
                </h3>
                <p>
                  We may process limited technical information necessary to operate
                  and secure the Service, such as information relating to your
                  browser, device, session, network connection, and security events.
                </p>
              </section>

              <section id="info-use">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  3. How We Use Information
                </h2>
                <p className="mb-3">We may use information to:</p>
                <ul className="list-disc list-inside space-y-1 pl-2 text-muted-foreground">
                  <li>Create and maintain your account</li>
                  <li>Authenticate and secure your account</li>
                  <li>Provide trading journal functionality</li>
                  <li>Store and display your journal entries</li>
                  <li>Provide calculations, statistics, and analytics</li>
                  <li>Allow you to upload and manage journal images</li>
                  <li>Provide customer support</li>
                  <li>Process subscriptions and payments</li>
                  <li>Detect fraud, abuse, and security threats</li>
                  <li>Maintain and improve the Service</li>
                  <li>Communicate important service information</li>
                  <li>Comply with applicable legal obligations</li>
                </ul>
              </section>

              <section id="trading-financial">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  4. Trading and Financial Information
                </h2>
                <p className="mb-3">
                  DC Trades is a journaling and analytical tool. Information
                  displayed by the Service is intended to help users record and
                  review their own trading activity.
                </p>
                <p className="mb-3">
                  DC Trades does not provide personalized investment, financial,
                  tax, legal, or trading advice.
                </p>
                <p className="mb-3">
                  DC Trades does not guarantee profits, returns, trading performance,
                  investment outcomes, or financial results.
                </p>
                <p>
                  You are solely responsible for your trading decisions and for
                  independently evaluating any information generated or displayed by
                  the Service.
                </p>
              </section>

              <section id="user-content">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  5. User Content
                </h2>
                <p className="mb-3">
                  You retain responsibility for the information and content you
                  submit to your journal.
                </p>
                <p className="mb-3">
                  You should only submit information that you are legally entitled
                  to provide.
                </p>
                <p>
                  For your own security, do not enter passwords, private
                  cryptocurrency keys, recovery phrases, authentication secrets,
                  payment credentials, or other credentials into journal entries,
                  notes, screenshots, or other user-generated content.
                </p>
              </section>

              <section id="protect-info">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  6. How We Protect Information
                </h2>
                <p className="mb-3">
                  We maintain reasonable technical, administrative, and
                  organizational safeguards designed to protect information against
                  unauthorized access, alteration, disclosure, loss, misuse, or
                  destruction.
                </p>
                <p className="mb-3">
                  Security measures may include access controls, authentication
                  protections, encryption where appropriate, secure development
                  practices, monitoring, and other safeguards appropriate to the
                  nature of the information and the Service.
                </p>
                <p>
                  No internet service can guarantee absolute security. You are also
                  responsible for protecting your account credentials and maintaining
                  the security of devices you use to access the Service.
                </p>
              </section>

              <section id="info-sharing">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  7. Information Sharing
                </h2>
                <p className="mb-3">
                  We do not sell your personal information.
                </p>
                <p className="mb-3">
                  We may share or permit access to information only where reasonably
                  necessary to operate the Service, provide requested functionality,
                  process transactions, protect the Service, comply with legal
                  obligations, or protect the rights, safety, and security of DC
                  Trades, our users, or others.
                </p>
                <p>
                  Service providers that process information on our behalf may be
                  subject to contractual, technical, and organizational safeguards
                  appropriate to their role.
                </p>
              </section>

              <section id="payments">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  8. Payments
                </h2>
                <p className="mb-3">
                  Certain DC Trades features or subscriptions may require payment.
                  Payments may be processed through third-party payment providers,
                  including cryptocurrency payment services.
                </p>
                <p className="mb-3">
                  Payment providers may collect and process information necessary to
                  authorize, verify, process, and record transactions.
                </p>
                <p className="mb-3">
                  DC Trades does not request or require users to provide private
                  cryptocurrency keys, recovery phrases, or wallet passwords to us.
                </p>
                <p>
                  Payment transactions may also be subject to the terms and privacy
                  policies of the applicable payment provider.
                </p>
              </section>

              <section id="cookies">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  9. Cookies and Similar Technologies
                </h2>
                <p className="mb-3">
                  We may use cookies, session technologies, local storage, and
                  similar technologies where necessary to authenticate users,
                  maintain sessions, remember preferences, provide security, and
                  operate essential features.
                </p>
                <p>
                  Where required by applicable law, we will provide appropriate
                  information and choices regarding non-essential cookies or similar
                  technologies.
                </p>
              </section>

              <section id="legal-basis">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  10. Legal Basis for Processing
                </h2>
                <p className="mb-3">
                  Where applicable data protection laws require a legal basis for
                  processing, we may rely on one or more appropriate legal bases,
                  including:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2 text-muted-foreground">
                  <li>Performance of a contract with you</li>
                  <li>Compliance with legal obligations</li>
                  <li>Our legitimate interests</li>
                  <li>Your consent, where required</li>
                </ul>
              </section>

              <section id="int-data">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  11. International Data Processing
                </h2>
                <p className="mb-3">
                  DC Trades may use service providers and infrastructure located in
                  different countries. As a result, your information may be
                  processed or stored outside the country where you live.
                </p>
                <p>
                  Where required, we take appropriate measures for international
                  transfers and processing in accordance with applicable data
                  protection laws.
                </p>
              </section>

              <section id="eea-uk-rights">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  12. European Economic Area and UK Privacy Rights
                </h2>
                <p className="mb-3">
                  If applicable data protection laws such as the GDPR apply to you,
                  you may have rights including:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2 text-muted-foreground">
                  <li>Access to your personal information</li>
                  <li>Correction of inaccurate information</li>
                  <li>Deletion of personal information</li>
                  <li>Restriction of certain processing</li>
                  <li>Objection to certain processing</li>
                  <li>Data portability where applicable</li>
                  <li>Withdrawal of consent where applicable</li>
                  <li>The right to lodge a complaint with a competent supervisory authority</li>
                </ul>
              </section>

              <section id="india-rights">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  13. India Privacy Rights
                </h2>
                <p className="mb-3">
                  Where applicable, DC Trades will process personal data in
                  accordance with India&apos;s applicable data protection and privacy
                  requirements.
                </p>
                <p>
                  Depending on applicable law, individuals may have rights relating
                  to access, correction, deletion, consent, and grievance
                  redressal.
                </p>
              </section>

              <section id="data-retention">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  14. Data Retention
                </h2>
                <p className="mb-3">
                  We retain information only for as long as reasonably necessary for
                  the purposes described in this Privacy Policy, including providing
                  the Service, maintaining security, resolving disputes, enforcing
                  agreements, and complying with legal obligations.
                </p>
                <p>
                  When information is no longer required, we may delete, anonymize,
                  or securely dispose of it, subject to applicable legal and
                  operational requirements.
                </p>
              </section>

              <section id="account-deletion">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  15. Account and Data Deletion
                </h2>
                <p className="mb-3">
                  You may request deletion of your DC Trades account and associated
                  personal information by contacting us at the address provided
                  below.
                </p>
                <p>
                  We may retain limited information where required by law, necessary
                  to prevent fraud or abuse, resolve disputes, protect security, or
                  establish or defend legal claims.
                </p>
              </section>

              <section id="incidents">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  16. Security Incidents
                </h2>
                <p className="mb-3">
                  If we identify a security incident involving personal information,
                  we will investigate and take reasonable steps to contain,
                  remediate, and prevent further unauthorized access.
                </p>
                <p>
                  Where notification is required by applicable law, we will notify
                  affected individuals and/or relevant authorities as required.
                </p>
              </section>

              <section id="childrens-privacy">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  17. Children&apos;s Privacy
                </h2>
                <p className="mb-3">
                  The Service is not intended for individuals who are not legally
                  permitted to use the Service under applicable law.
                </p>
                <p>
                  If we become aware that personal information has been collected in
                  violation of applicable requirements, we will take reasonable
                  steps to address and delete it where appropriate.
                </p>
              </section>

              <section id="third-party">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  18. Third-Party Services
                </h2>
                <p className="mb-3">
                  The Service may rely on carefully selected third-party providers
                  for infrastructure, authentication, payment processing, email,
                  security, analytics, hosting, and other operational requirements.
                </p>
                <p>
                  These providers may process information necessary to perform their
                  services and may have their own privacy policies and legal
                  obligations.
                </p>
              </section>

              <section id="changes">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  19. Changes to This Privacy Policy
                </h2>
                <p className="mb-3">
                  We may update this Privacy Policy from time to time to reflect
                  changes to the Service, our practices, technology, or applicable
                  legal requirements.
                </p>
                <p>
                  The latest version will always be published on this page with the
                  applicable &quot;Last updated&quot; date.
                </p>
              </section>

              <section id="contact">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  20. Contact Us
                </h2>
                <p className="mb-3">
                  For privacy questions, data requests, account deletion requests,
                  or other privacy-related matters, contact:
                </p>
                <div className="rounded border border-border p-3 text-xs leading-relaxed">
                  <p>DC Trades</p>
                  <p>Privacy & Support</p>
                  <p>
                    Email:{" "}
                    <a
                      href="mailto:support@dctrades.in"
                      className="text-foreground hover:underline"
                    >
                      support@dctrades.in
                    </a>
                  </p>
                </div>
              </section>
            </article>
          </div>

          {/* Wikipedia Sidebar / Info Box */}
          <aside className="md:col-span-1">
            <div className="sticky top-6 rounded border border-border bg-muted/20 p-4 text-xs">
              <h2 className="mb-3 border-b border-border pb-1 font-serif text-sm font-normal text-foreground text-center">
                Document Details
              </h2>
              <dl className="space-y-2">
                <div>
                  <dt className="text-muted-foreground">Type</dt>
                  <dd>Legal Policy</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Platform</dt>
                  <dd>DC Trades</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Last updated</dt>
                  <dd>August 9, 2026</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Contact Email</dt>
                  <dd className="break-all">support@dctrades.in</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Status</dt>
                  <dd>Active</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}