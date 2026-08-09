import type { Metadata } from "next";
import { Link } from "next-view-transitions";

import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Trading & Financial Disclaimer",
  description:
    "Important information about trading risk, financial decisions, and the informational nature of DC Trades.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
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
            Trading &amp; Financial Disclaimer
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
                This Trading &amp; Financial Disclaimer applies to the DC Trades
                website, application, trading journal, analytics, calculations,
                educational materials, and related services.
              </p>
            </div>

            {/* Wikipedia-style Table of Contents */}
            <nav className="my-6 inline-block min-w-65 rounded border border-border bg-muted/30 p-3 text-xs">
              <p className="mb-2 border-b border-border pb-1 font-normal text-foreground">
                Contents
              </p>
              <ol className="space-y-1 text-muted-foreground list-decimal list-inside">
                <li><a href="#software-service" className="hover:underline">Software and Journaling Service</a></li>
                <li><a href="#no-advice" className="hover:underline">No Financial or Investment Advice</a></li>
                <li><a href="#trading-risk" className="hover:underline">Trading Risk</a></li>
                <li><a href="#user-responsibility" className="hover:underline">User Responsibility</a></li>
                <li><a href="#manual-entry" className="hover:underline">Manual Data Entry</a></li>
                <li><a href="#analytics" className="hover:underline">Calculations and Analytics</a></li>
                <li><a href="#market-info" className="hover:underline">Market Information</a></li>
                <li><a href="#crypto-assets" className="hover:underline">Cryptocurrency and Digital Assets</a></li>
                <li><a href="#no-guarantee" className="hover:underline">No Guarantee of Results</a></li>
                <li><a href="#regulatory" className="hover:underline">Regulatory Responsibility</a></li>
                <li><a href="#independent-advice" className="hover:underline">Independent Professional Advice</a></li>
                <li><a href="#acceptance" className="hover:underline">Acceptance</a></li>
                <li><a href="#contact" className="hover:underline">Contact</a></li>
              </ol>
            </nav>

            {/* Article Sections */}
            <article className="space-y-8 text-sm leading-relaxed">
              <section id="software-service">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  1. Software and Journaling Service
                </h2>
                <p className="mb-3">
                  DC Trades is a software platform designed to help users manually
                  record, organize, review, and analyze their own trading activity.
                </p>
                <p>
                  DC Trades does not execute trades, manage investments, hold
                  customer funds, operate a brokerage account, or act as a
                  cryptocurrency exchange.
                </p>
              </section>

              <section id="no-advice">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  2. No Financial or Investment Advice
                </h2>
                <p className="mb-3">
                  Nothing provided by DC Trades constitutes personalized financial,
                  investment, trading, tax, accounting, or legal advice.
                </p>
                <p className="mb-3">
                  Information displayed through the Service is provided for general
                  informational, analytical, and journaling purposes only.
                </p>
                <p>
                  You should independently evaluate financial decisions and obtain
                  advice from a qualified professional where appropriate.
                </p>
              </section>

              <section id="trading-risk">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  3. Trading Risk
                </h2>
                <p className="mb-3">
                  Trading financial instruments can involve substantial risk,
                  including the possibility of losing some or all of your invested
                  capital.
                </p>
                <p className="mb-3">
                  Depending on the instrument and strategy, losses may exceed the
                  amount initially expected or deposited.
                </p>
                <p className="mb-3">
                  Past performance does not guarantee future results.
                </p>
                <p>
                  No trading strategy, statistic, calculation, journal entry,
                  performance metric, or analytical result guarantees future
                  profitability.
                </p>
              </section>

              <section id="user-responsibility">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  4. User Responsibility
                </h2>
                <p className="mb-3">
                  You are solely responsible for your trading and investment
                  decisions.
                </p>
                <p className="mb-3">
                  You are responsible for verifying the accuracy of information
                  entered into your journal and for independently assessing any
                  calculations or analytics produced by the Service.
                </p>
                <p>
                  DC Trades is not responsible for losses resulting from trading
                  decisions made by users.
                </p>
              </section>

              <section id="manual-entry">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  5. Manual Data Entry
                </h2>
                <p className="mb-3">
                  DC Trades relies on information entered or uploaded by users for
                  journaling and analytical purposes.
                </p>
                <p className="mb-3">
                  We do not represent that user-entered trading information is
                  accurate, complete, current, or independently verified.
                </p>
                <p>
                  Users should verify important information before relying on it for
                  financial decisions.
                </p>
              </section>

              <section id="analytics">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  6. Calculations and Analytics
                </h2>
                <p className="mb-3">
                  DC Trades may provide calculations, statistics, charts,
                  performance metrics, risk measurements, and other analytical
                  features.
                </p>
                <p>
                  These features are intended to assist with record keeping and
                  analysis. They should not be treated as professional financial
                  recommendations or guarantees of future performance.
                </p>
              </section>

              <section id="market-info">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  7. Market Information
                </h2>
                <p className="mb-3">
                  Where the Service displays market-related information, prices,
                  calculations, or other financial information, such information may
                  be delayed, incomplete, inaccurate, or unavailable.
                </p>
                <p>
                  You should verify important market information using appropriate
                  primary or professional sources before making a financial
                  decision.
                </p>
              </section>

              <section id="crypto-assets">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  8. Cryptocurrency and Digital Assets
                </h2>
                <p className="mb-3">
                  Cryptocurrency and digital-asset markets can be highly volatile
                  and may involve significant risks, including price volatility,
                  liquidity risk, technology risk, regulatory risk, fraud, and
                  permanent loss of assets.
                </p>
                <p>
                  DC Trades does not provide cryptocurrency investment advice and
                  does not guarantee the value, security, or performance of any
                  digital asset.
                </p>
              </section>

              <section id="no-guarantee">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  9. No Guarantee of Results
                </h2>
                <p>
                  DC Trades does not guarantee that using the Service will improve
                  your trading performance, increase your win rate, reduce losses,
                  generate profits, or produce any particular financial result.
                </p>
              </section>

              <section id="regulatory">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  10. Regulatory Responsibility
                </h2>
                <p className="mb-3">
                  Financial markets and trading activities are subject to different
                  laws and regulations depending on your location and the products
                  you trade.
                </p>
                <p>
                  You are responsible for determining whether your trading activities
                  comply with the laws, regulations, tax requirements, and
                  restrictions applicable to you.
                </p>
              </section>

              <section id="independent-advice">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  11. Independent Professional Advice
                </h2>
                <p>
                  If you require financial, investment, tax, legal, or other
                  professional advice, you should consult an appropriately qualified
                  professional.
                </p>
              </section>

              <section id="acceptance">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  12. Acceptance
                </h2>
                <p>
                  By using DC Trades, you acknowledge that you understand the risks
                  associated with trading and that DC Trades provides software and
                  informational tools rather than personalized financial advice.
                </p>
              </section>

              <section id="contact">
                <h2 className="border-b border-border pb-1 font-serif text-xl font-normal text-foreground mb-3">
                  13. Contact
                </h2>
                <p className="mb-3">
                  If you have questions about this disclaimer or the DC Trades
                  Service, contact:
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
                  <dd>Financial Disclaimer</dd>
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