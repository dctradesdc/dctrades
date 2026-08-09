import type { Metadata } from "next";
import { Link } from "next-view-transitions";

import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Refund & Cancellation Policy",
  description:
    "Learn about DC Trades subscriptions, cancellations, refunds, cryptocurrency payments, and billing.",
  path: "/refund-policy",
});

export default function RefundPolicyPage() {
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
            Refund &amp; Cancellation Policy
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
                This Refund &amp; Cancellation Policy explains how cancellations,
                refunds, payments, and subscription-related matters are handled
                for DC Trades services.
              </p>
            </div>

            {/* Wikipedia-style Table of Contents */}
            <nav className="my-6 inline-block min-w-65 rounded border border-border bg-muted/30 p-3 text-xs">
              <p className="mb-2 border-b border-border pb-1 font-normal text-foreground">
                Contents
              </p>
              <ol className="space-y-1 text-muted-foreground list-decimal list-inside">
                <li><a href="#subscriptions" className="hover:underline">Subscriptions</a></li>
                <li><a href="#cancellation" className="hover:underline">Cancellation</a></li>
                <li><a href="#refunds" className="hover:underline">Refunds</a></li>
                <li><a href="#incorrect-charges" className="hover:underline">Duplicate or Incorrect Charges</a></li>
                <li><a href="#crypto-payments" className="hover:underline">Cryptocurrency Payments</a></li>
                <li><a href="#crypto-refunds" className="hover:underline">Cryptocurrency Refunds</a></li>
                <li><a href="#failed-payments" className="hover:underline">Failed Payments</a></li>
                <li><a href="#disputes" className="hover:underline">Chargebacks and Payment Disputes</a></li>
                <li><a href="#promotions" className="hover:underline">Promotional Offers</a></li>
                <li><a href="#free-plans" className="hover:underline">Free Plans and Trials</a></li>
                <li><a href="#termination" className="hover:underline">Account Termination</a></li>
                <li><a href="#service-changes" className="hover:underline">Service Changes</a></li>
                <li><a href="#request-refund" className="hover:underline">How to Request a Refund</a></li>
                <li><a href="#processing" className="hover:underline">Processing Refund Requests</a></li>
                <li><a href="#consumer-rights" className="hover:underline">Consumer Rights</a></li>
                <li><a href="#policy-changes" className="hover:underline">Changes to This Policy</a></li>
                <li><a href="#contact" className="hover:underline">Contact</a></li>
              </ol>
            </nav>

            {/* Article Sections */}
            <article className="space-y-8 text-sm leading-relaxed">
              <section id="subscriptions">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  1. Subscriptions
                </h2>
                <p className="mb-3">
                  Certain DC Trades features may be offered through paid
                  subscriptions or other paid plans. The applicable price, billing
                  period, and subscription terms will be displayed before you
                  complete a purchase.
                </p>
                <p>
                  By completing a purchase, you authorize the applicable payment
                  provider to process the payment according to the selected plan
                  and payment terms.
                </p>
              </section>

              <section id="cancellation">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  2. Cancellation
                </h2>
                <p className="mb-3">
                  You may cancel your subscription according to the cancellation
                  options made available through your account or the applicable
                  payment provider.
                </p>
                <p className="mb-3">
                  Cancellation normally prevents future renewal but does not
                  automatically create a refund for a payment that has already been
                  completed.
                </p>
                <p>
                  Unless otherwise stated at checkout, you may continue to access
                  paid features until the end of the applicable paid billing period.
                </p>
              </section>

              <section id="refunds">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  3. Refunds
                </h2>
                <p className="mb-3">
                  Refund eligibility depends on the plan, purchase terms, applicable
                  law, and circumstances of the request.
                </p>
                <p className="mb-3">
                  Where a refund is required by applicable law, DC Trades will honor
                  the applicable legal requirement.
                </p>
                <p>
                  Except where required by law or expressly stated at checkout,
                  completed subscription payments are generally non-refundable after
                  the applicable billing period has started.
                </p>
              </section>

              <section id="incorrect-charges">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  4. Duplicate or Incorrect Charges
                </h2>
                <p className="mb-3">
                  If you believe you were charged more than once for the same
                  transaction or were charged incorrectly, contact us as soon as
                  reasonably possible.
                </p>
                <p>
                  We may review the transaction and, where appropriate, correct
                  duplicate or erroneous charges.
                </p>
              </section>

              <section id="crypto-payments">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  5. Cryptocurrency Payments
                </h2>
                <p className="mb-3">
                  DC Trades may support cryptocurrency payments through third-party
                  payment services.
                </p>
                <p className="mb-3">
                  Cryptocurrency transactions may involve blockchain network fees,
                  confirmation delays, exchange-rate changes, transaction
                  irreversibility, and other factors outside the direct control of
                  DC Trades.
                </p>
                <p className="mb-3">
                  You are responsible for sending the correct cryptocurrency,
                  amount, and transaction to the payment destination provided during
                  checkout.
                </p>
                <p className="mb-3">
                  Sending cryptocurrency to an incorrect address, using an
                  unsupported asset or network, or otherwise failing to follow
                  payment instructions may result in the payment not being
                  recognized.
                </p>
                <p>
                  DC Trades does not request private keys, seed phrases, recovery
                  phrases, or wallet passwords.
                </p>
              </section>

              <section id="crypto-refunds">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  6. Cryptocurrency Refunds
                </h2>
                <p className="mb-3">
                  Where a refund is approved for a cryptocurrency payment, the
                  refund method and amount may depend on the payment provider,
                  transaction status, applicable law, and technical availability.
                </p>
                <p className="mb-3">
                  Because cryptocurrency values can change after a transaction,
                  the amount of cryptocurrency returned may differ from the
                  cryptocurrency amount originally sent.
                </p>
                <p className="mb-3">
                  Any applicable blockchain or payment-provider fees may affect the
                  amount received.
                </p>
                <p>
                  We will provide reasonable information about the applicable refund
                  method when a cryptocurrency refund is approved.
                </p>
              </section>

              <section id="failed-payments">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  7. Failed Payments
                </h2>
                <p>
                  If a payment fails, expires, is rejected, or cannot be confirmed,
                  access to paid features may not be activated or may be suspended
                  until the payment issue is resolved.
                </p>
              </section>

              <section id="disputes">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  8. Chargebacks and Payment Disputes
                </h2>
                <p className="mb-3">
                  If you believe a payment was made incorrectly, please contact us
                  before initiating a payment dispute where reasonably possible.
                </p>
                <p>
                  Nothing in this policy limits any rights you may have under
                  applicable consumer-protection or payment laws.
                </p>
              </section>

              <section id="promotions">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  9. Promotional Offers
                </h2>
                <p className="mb-3">
                  Promotional offers, discounts, trials, or special pricing may be
                  subject to additional terms displayed when the offer is provided.
                </p>
                <p>
                  Unless expressly stated otherwise, promotional pricing does not
                  create a permanent entitlement to the discounted price.
                </p>
              </section>

              <section id="free-plans">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  10. Free Plans and Trials
                </h2>
                <p className="mb-3">
                  If DC Trades offers a free plan or trial, access may be limited
                  according to the applicable plan terms.
                </p>
                <p>
                  A free plan or trial does not necessarily convert into a paid
                  subscription unless the applicable purchase terms clearly state
                  otherwise.
                </p>
              </section>

              <section id="termination">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  11. Account Termination
                </h2>
                <p>
                  If your account is suspended or terminated because of fraud,
                  abuse, unlawful activity, security violations, or material
                  violations of our Terms of Service, you may not be entitled to a
                  refund except where required by applicable law.
                </p>
              </section>

              <section id="service-changes">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  12. Service Changes
                </h2>
                <p className="mb-3">
                  We may change, suspend, or discontinue paid features when
                  reasonably necessary.
                </p>
                <p>
                  Where applicable law requires a refund or other remedy because of
                  a material service change, we will provide the remedy required by
                  that law.
                </p>
              </section>

              <section id="request-refund">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  13. How to Request a Refund
                </h2>
                <p className="mb-3">
                  To request a refund or report a billing issue, contact us using
                  the email address below.
                </p>
                <p className="mb-2">Please include:</p>
                <ul className="list-disc list-inside space-y-1 pl-2 text-muted-foreground mb-3">
                  <li>Your DC Trades account email</li>
                  <li>Transaction date</li>
                  <li>Transaction or payment reference, if available</li>
                  <li>A brief explanation of the issue</li>
                </ul>
                <p>
                  Do not send passwords, private keys, seed phrases, recovery
                  phrases, or other authentication credentials in a refund request.
                </p>
              </section>

              <section id="processing">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  14. Processing Refund Requests
                </h2>
                <p className="mb-3">
                  We will review refund requests and respond within a reasonable
                  period.
                </p>
                <p>
                  If a refund is approved, the timing of the refund may depend on
                  the payment provider, payment method, banking system, blockchain
                  network, and other factors outside our control.
                </p>
              </section>

              <section id="consumer-rights">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  15. Consumer Rights
                </h2>
                <p>
                  Nothing in this policy is intended to remove, restrict, or waive
                  any mandatory consumer rights or legal remedies that apply to you.
                </p>
              </section>

              <section id="policy-changes">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  16. Changes to This Policy
                </h2>
                <p className="mb-3">
                  We may update this Refund &amp; Cancellation Policy when our pricing,
                  payment methods, services, or legal requirements change.
                </p>
                <p>
                  The latest version will be published on this page with the
                  applicable &quot;Last updated&quot; date.
                </p>
              </section>

              <section id="contact">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  17. Contact
                </h2>
                <p className="mb-3">
                  For billing, cancellation, or refund questions, contact:
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
                  <dd>Billing Policy</dd>
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