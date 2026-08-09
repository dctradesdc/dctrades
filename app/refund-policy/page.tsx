import type { Metadata } from "next";
import { Link } from "next-view-transitions";

import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Refund & Cancellation Policy",
  description:
    "Learn about DC Trades payments, cancellations, refunds, cryptocurrency payments, and subscription terms.",
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
                This Refund &amp; Cancellation Policy explains how payments, cancellations,
                refunds, and subscription-related matters are handled for DC Trades, a
                trading journal platform.
              </p>
            </div>

            {/* Wikipedia-style Table of Contents */}
            <nav className="my-6 inline-block min-w-65 rounded border border-border bg-muted/30 p-3 text-xs">
              <p className="mb-2 border-b border-border pb-1 font-normal text-foreground">
                Contents
              </p>
              <ol className="space-y-1 text-muted-foreground list-decimal list-inside">
                <li><a href="#paid-plans" className="hover:underline">Paid Plans</a></li>
                <li><a href="#cancellation" className="hover:underline">Cancellation</a></li>
                <li><a href="#refunds" className="hover:underline">Refunds</a></li>
                <li><a href="#incorrect-payments" className="hover:underline">Duplicate or Incorrect Payments</a></li>
                <li><a href="#crypto-payments" className="hover:underline">Cryptocurrency Payments</a></li>
                <li><a href="#crypto-errors" className="hover:underline">Incorrect Cryptocurrency or Network</a></li>
                <li><a href="#crypto-refunds" className="hover:underline">Cryptocurrency Refunds</a></li>
                <li><a href="#failed-payments" className="hover:underline">Failed, Expired, or Unconfirmed Payments</a></li>
                <li><a href="#confirmation" className="hover:underline">Payment Confirmation and Activation</a></li>
                <li><a href="#disputes" className="hover:underline">Chargebacks and Payment Disputes</a></li>
                <li><a href="#promotions" className="hover:underline">Promotional Offers</a></li>
                <li><a href="#free-plan" className="hover:underline">Free Plan</a></li>
                <li><a href="#termination" className="hover:underline">Account Suspension or Termination</a></li>
                <li><a href="#service-changes" className="hover:underline">Service Changes</a></li>
                <li><a href="#request-refund" className="hover:underline">How to Request a Refund</a></li>
                <li><a href="#processing" className="hover:underline">Refund Processing</a></li>
                <li><a href="#consumer-rights" className="hover:underline">Consumer Rights</a></li>
                <li><a href="#policy-changes" className="hover:underline">Changes to This Policy</a></li>
                <li><a href="#contact" className="hover:underline">Contact</a></li>
              </ol>
            </nav>

            {/* Article Sections */}
            <article className="space-y-8 text-sm leading-relaxed">
              <section id="paid-plans">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  1. Paid Plans
                </h2>
                <p className="mb-3">
                  DC Trades currently offers paid subscription plans that may include:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2 text-muted-foreground mb-3">
                  <li>Basic: $15 for 92 days</li>
                  <li>Pro: $30 for 92 days</li>
                </ul>
                <p className="mb-3">
                  The applicable plan, price, duration, and payment instructions are
                  displayed before payment.
                </p>
                <p>
                  DC Trades currently processes cryptocurrency payments through a third-party
                  payment provider. Paid access is activated after the payment has been
                  successfully confirmed.
                </p>
              </section>

              <section id="cancellation">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  2. Cancellation
                </h2>
                <p className="mb-3">
                  DC Trades paid plans are currently purchased for a fixed 92-day period.
                </p>
                <p className="mb-3">
                  Unless otherwise stated at checkout, these plans do not automatically renew.
                </p>
                <p>
                  Because there is no automatic renewal, there is normally no recurring
                  subscription cancellation required. Your paid access remains available
                  until the end of the applicable 92-day period, unless your account is
                  suspended or terminated under our Terms of Service.
                </p>
              </section>

              <section id="refunds">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  3. Refunds
                </h2>
                <p className="mb-3">
                  Because DC Trades provides access to a digital service, completed payments
                  are generally non-refundable once the paid subscription has been activated.
                </p>
                <p className="mb-2">
                  However, DC Trades may consider refund requests in cases such as:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2 text-muted-foreground mb-3">
                  <li>Duplicate payments</li>
                  <li>Clearly incorrect charges</li>
                  <li>Technical problems that prevent access to a paid subscription</li>
                  <li>A payment being incorrectly processed</li>
                  <li>Other circumstances where a refund is required by applicable law</li>
                </ul>
                <p>
                  Nothing in this policy limits any mandatory consumer rights that apply to
                  you.
                </p>
              </section>

              <section id="incorrect-payments">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  4. Duplicate or Incorrect Payments
                </h2>
                <p className="mb-3">
                  If you believe you were charged more than once or paid an incorrect amount,
                  contact DC Trades as soon as possible.
                </p>
                <p className="mb-3">
                  We may review the payment and, where appropriate, issue a correction or
                  refund.
                </p>
                <p>
                  Please provide your payment reference ID or transaction information when
                  contacting us.
                </p>
              </section>

              <section id="crypto-payments">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  5. Cryptocurrency Payments
                </h2>
                <p className="mb-3">
                  DC Trades currently supports cryptocurrency payments through a third-party
                  payment provider.
                </p>
                <p className="mb-2">Payments may involve:</p>
                <ul className="list-disc list-inside space-y-1 pl-2 text-muted-foreground mb-3">
                  <li>Blockchain network fees</li>
                  <li>Confirmation delays</li>
                  <li>Exchange-rate changes</li>
                  <li>Network congestion</li>
                  <li>Blockchain transaction requirements</li>
                </ul>
                <p className="mb-3">
                  You are responsible for sending the correct cryptocurrency, exact amount, and
                  correct network shown during checkout.
                </p>
                <p>
                  For current DC Trades crypto checkout, payments may require USDT using the
                  TRC20 (TRON) network.
                </p>
              </section>

              <section id="crypto-errors">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  6. Incorrect Cryptocurrency or Network
                </h2>
                <p className="mb-3">
                  You must carefully verify the payment instructions before sending funds.
                </p>
                <p className="mb-2">Sending:</p>
                <ul className="list-disc list-inside space-y-1 pl-2 text-muted-foreground mb-3">
                  <li>The wrong cryptocurrency</li>
                  <li>The wrong network</li>
                  <li>An incorrect amount</li>
                  <li>Funds to an incorrect address</li>
                </ul>
                <p className="mb-3">
                  may result in the payment being delayed, rejected, or not recognized.
                </p>
                <p className="mb-3">
                  DC Trades cannot guarantee recovery of funds sent incorrectly.
                </p>
                <p>
                  DC Trades will never ask you for your private key, seed phrase, recovery
                  phrase, wallet password, or other wallet credentials.
                </p>
              </section>

              <section id="crypto-refunds">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  7. Cryptocurrency Refunds
                </h2>
                <p className="mb-3">
                  If DC Trades approves a refund for a cryptocurrency payment, the refund
                  method will depend on the payment provider, transaction status, technical
                  availability, and applicable law.
                </p>
                <p className="mb-3">
                  Because cryptocurrency prices can change, the cryptocurrency amount returned
                  may differ from the amount originally sent.
                </p>
                <p>
                  Blockchain and payment-provider fees may also affect the final amount
                  received.
                </p>
              </section>

              <section id="failed-payments">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  8. Failed, Expired, or Unconfirmed Payments
                </h2>
                <p className="mb-3">
                  A payment may remain pending while blockchain confirmation is being
                  completed.
                </p>
                <p className="mb-2">If a payment:</p>
                <ul className="list-disc list-inside space-y-1 pl-2 text-muted-foreground mb-3">
                  <li>Fails</li>
                  <li>Expires</li>
                  <li>Is rejected</li>
                  <li>Is not received</li>
                  <li>Cannot be confirmed</li>
                </ul>
                <p className="mb-3">
                  the corresponding paid plan may not be activated.
                </p>
                <p>
                  If you believe you completed a payment but your account was not activated,
                  contact DC Trades with your payment reference ID.
                </p>
              </section>

              <section id="confirmation">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  9. Payment Confirmation and Activation
                </h2>
                <p className="mb-3">
                  DC Trades activates a paid plan after the payment provider reports the payment
                  as successfully completed.
                </p>
                <p className="mb-3">
                  A payment showing as waiting or confirming does not necessarily mean that the
                  subscription has been activated.
                </p>
                <p>
                  Once the payment reaches the required completed status, DC Trades processes
                  the subscription automatically.
                </p>
              </section>

              <section id="disputes">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  10. Chargebacks and Payment Disputes
                </h2>
                <p className="mb-3">
                  If you believe there is a problem with a payment, please contact DC Trades first
                  so that we can investigate the issue.
                </p>
                <p>
                  Nothing in this policy limits any rights or remedies available to you under
                  applicable law.
                </p>
              </section>

              <section id="promotions">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  11. Promotional Offers
                </h2>
                <p className="mb-3">
                  Discounts, promotional pricing, or special offers may have additional
                  conditions.
                </p>
                <p>
                  Unless expressly stated otherwise, promotional pricing does not guarantee the
                  same price for future purchases.
                </p>
              </section>

              <section id="free-plan">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  12. Free Plan
                </h2>
                <p className="mb-3">
                  DC Trades currently provides a Free plan with limited functionality.
                </p>
                <p>
                  The Free plan does not require payment and does not automatically convert into
                  a paid plan unless you separately choose to purchase a paid plan.
                </p>
              </section>

              <section id="termination">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  13. Account Suspension or Termination
                </h2>
                <p>
                  If your account is suspended or terminated because of fraud, abuse,
                  unlawful activity, security violations, or material violations of the DC Trades
                  Terms of Service, you may not be entitled to a refund, except where required by
                  applicable law.
                </p>
              </section>

              <section id="service-changes">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  14. Service Changes
                </h2>
                <p className="mb-3">
                  DC Trades may modify, suspend, or discontinue features when reasonably
                  necessary.
                </p>
                <p>
                  If a material service change requires a refund or other remedy under applicable
                  law, DC Trades will provide the remedy required by law.
                </p>
              </section>

              <section id="request-refund">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  15. How to Request a Refund
                </h2>
                <p className="mb-3">
                  To request a refund or report a billing issue, contact:
                </p>
                <p className="mb-2">Email: <a href="mailto:support@dctrades.in" className="text-foreground hover:underline">support@dctrades.in</a></p>
                <p className="mb-2">Please include:</p>
                <ul className="list-disc list-inside space-y-1 pl-2 text-muted-foreground mb-3">
                  <li>Your DC Trades account email</li>
                  <li>Payment date</li>
                  <li>Payment Reference ID</li>
                  <li>Transaction hash, if available</li>
                  <li>Plan purchased</li>
                  <li>A brief explanation of the issue</li>
                </ul>
                <p>
                  Never send passwords, private keys, seed phrases, recovery phrases, or
                  wallet credentials.
                </p>
              </section>

              <section id="processing">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  16. Refund Processing
                </h2>
                <p className="mb-3">
                  Refund requests will be reviewed on a case-by-case basis.
                </p>
                <p>
                  If a refund is approved, processing time may depend on the payment provider,
                  payment method, blockchain network, and other factors outside DC Trades&apos;
                  control.
                </p>
              </section>

              <section id="consumer-rights">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  17. Consumer Rights
                </h2>
                <p>
                  Nothing in this policy is intended to remove, restrict, or waive any mandatory
                  consumer rights or legal remedies that apply to you.
                </p>
              </section>

              <section id="policy-changes">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  18. Changes to This Policy
                </h2>
                <p className="mb-3">
                  DC Trades may update this Refund &amp; Cancellation Policy when its services,
                  pricing, payment methods, or legal requirements change.
                </p>
                <p>
                  The latest version will be published on this page with the applicable Last
                  updated date.
                </p>
              </section>

              <section id="contact">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  19. Contact
                </h2>
                <p className="mb-3">
                  For payment, cancellation, or refund questions:
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
                  <dd>August 10, 2026</dd>
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