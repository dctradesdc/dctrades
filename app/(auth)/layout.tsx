export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      {/* Left Side */}
      <section className="hidden bg-zinc-950 text-white lg:flex flex-col justify-center p-16">
        <div className="max-w-md space-y-6">
          <h1 className="text-5xl font-bold">
            DC Trades
          </h1>

          <p className="text-zinc-400 text-lg">
            Track every trade, analyze your performance,
            and become a consistently profitable trader.
          </p>
        </div>
      </section>

      {/* Right Side */}
      <section className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {children}
        </div>
      </section>
    </main>
  );
}