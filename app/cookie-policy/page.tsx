import type { Metadata } from "next";
import { Link } from "next-view-transitions";

import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Cookie Policy",
  description:
    "Learn how DC Trades uses cookies and similar technologies to operate, secure, and improve its services.",
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
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
            Cookie Policy
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            From DC Trades, the free trading journal
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Main Content Column */}
          <div className="md:col-span-3">
            {/* Lead Paragraph */}
            <div className="text-sm leading-relaxed">
              <p>
                This Cookie Policy explains how DC Trades uses cookies and similar
                technologies when you use our website, application, and related
                services.
              </p>
            </div>

            {/* Wikipedia-style Table of Contents */}
            <nav className="my-6 inline-block min-w-[260px] rounded border border-border bg-muted/30 p-3 text-xs">
              <p className="mb-2 border-b border-border pb-1 font-normal text-foreground">
                Contents
              </p>
              <ol className="space-y-1 text-muted-foreground list-decimal list-inside">
                <li><a href="#what-are-cookies" className="hover:underline">What Are Cookies?</a></li>
                <li><a href="#how-we-use-cookies" className="hover:underline">How DC Trades Uses Cookies</a></li>
                <li><a href="#essential-cookies" className="hover:underline">Essential Cookies</a></li>
                <li><a href="#preference-technologies" className="hover:underline">Preference Technologies</a></li>
                <li><a href="#analytics-performance" className="hover:underline">Analytics and Performance</a></li>
                <li><a href="#third-party-technologies" className="hover:underline">Third-Party Technologies</a></li>
                <li><a href="#your-choices" className="hover:underline">Your Choices</a></li>
                <li><a href="#legal-requirements" className="hover:underline">Legal Requirements</a></li>
                <li><a href="#policy-changes" className="hover:underline">Changes to This Policy</a></li>
                <li><a href="#contact" className="hover:underline">Contact</a></li>
              </ol>
            </nav>

            {/* Article Sections */}
            <article className="space-y-8 text-sm leading-relaxed">
              <section id="what-are-cookies">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  1. What Are Cookies?
                </h2>
                <p>
                  Cookies are small files or pieces of information that may be
                  stored on your device when you visit a website. Similar
                  technologies may also be used to maintain sessions, remember
                  preferences, improve security, and provide essential
                  functionality.
                </p>
              </section>

              <section id="how-we-use-cookies">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  2. How DC Trades Uses Cookies
                </h2>
                <p className="mb-3">
                  We may use cookies and similar technologies for purposes including:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2 text-muted-foreground">
                  <li>Authentication and account sessions</li>
                  <li>Security and fraud prevention</li>
                  <li>Remembering user preferences</li>
                  <li>Maintaining essential application functionality</li>
                  <li>Understanding service performance</li>
                  <li>Improving the user experience</li>
                </ul>
              </section>

              <section id="essential-cookies">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  3. Essential Cookies
                </h2>
                <p className="mb-3">
                  Some cookies or similar technologies are necessary for the Service
                  to function correctly.
                </p>
                <p className="mb-3">
                  These technologies may be required to authenticate your account,
                  maintain a secure session, protect the Service, or provide
                  requested functionality.
                </p>
                <p>
                  Disabling essential technologies may prevent certain parts of the
                  Service from working correctly.
                </p>
              </section>

              <section id="preference-technologies">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  4. Preference Technologies
                </h2>
                <p>
                  We may use technologies that remember choices you make, such as
                  interface preferences or other settings, so that you do not have
                  to configure them repeatedly.
                </p>
              </section>

              <section id="analytics-performance">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  5. Analytics and Performance
                </h2>
                <p className="mb-3">
                  If we use analytics or performance technologies, they may help us
                  understand how the Service is used, identify technical problems,
                  measure performance, and improve the product.
                </p>
                <p>
                  Where applicable law requires consent for non-essential
                  technologies, we will request the appropriate consent before using
                  them.
                </p>
              </section>

              <section id="third-party-technologies">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  6. Third-Party Technologies
                </h2>
                <p className="mb-3">
                  Certain third-party services used to provide functionality may
                  place or access cookies or similar technologies.
                </p>
                <p>
                  The use of such technologies may also be governed by the relevant
                  third party&apos;s privacy policy and terms.
                </p>
              </section>

              <section id="your-choices">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  7. Your Choices
                </h2>
                <p className="mb-3">
                  Most modern browsers allow you to view, block, delete, or restrict
                  cookies through browser settings.
                </p>
                <p className="mb-3">
                  You may also be able to control certain non-essential technologies
                  through consent or privacy settings made available by the Service.
                </p>
                <p>
                  Blocking essential cookies or session technologies may affect your
                  ability to log in or use certain features.
                </p>
              </section>

              <section id="legal-requirements">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  8. Legal Requirements
                </h2>
                <p className="mb-3">
                  Where applicable privacy or electronic-communications laws require
                  consent before placing or accessing certain non-essential cookies,
                  DC Trades will seek consent as required.
                </p>
                <p>
                  Essential technologies that are necessary to provide a service
                  explicitly requested by you may be handled differently under
                  applicable law.
                </p>
              </section>

              <section id="policy-changes">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  9. Changes to This Policy
                </h2>
                <p className="mb-3">
                  We may update this Cookie Policy when our technologies, services,
                  or legal requirements change.
                </p>
                <p>
                  The latest version will always be available on this page with the
                  applicable &quot;Last updated&quot; date.
                </p>
              </section>

              <section id="contact">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  10. Contact
                </h2>
                <p className="mb-3">
                  If you have questions about cookies or privacy at DC Trades,
                  contact:
                </p>
                <div className="rounded border border-border p-3 text-xs leading-relaxed">
                  <p>DC Trades</p>
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
                  <dd>Cookie Policy</dd>
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