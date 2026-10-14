export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          Research prototype
        </p>
        <h1 className="text-5xl font-semibold tracking-tight">TriageMesh</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
          Measure whether selective verification can preserve pipeline reliability
          while reducing verification calls, tokens, and latency.
        </p>
        <section className="mt-12 grid gap-5 md:grid-cols-3" aria-label="Strategies">
          {[
            ["A", "No verification", "Baseline four-step execution."],
            ["B", "Uniform verification", "Verify every step."],
            ["C", "Failure-routed", "Verify only observable failures."],
          ].map(([strategy, name, description]) => (
            <article key={strategy} className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="text-3xl font-bold text-cyan-300">{strategy}</div>
              <h2 className="mt-5 text-xl font-semibold">{name}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
            </article>
          ))}
        </section>
        <p className="mt-12 text-sm text-slate-400">
          Exactly four pipeline steps, three failure types, and three verifiers.
          Confidence is self-reported and uncalibrated; hidden ground truth is
          never passed to verifiers.
        </p>
      </div>
    </main>
  );
}
