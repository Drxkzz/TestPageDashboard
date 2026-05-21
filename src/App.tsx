// React 18 JSX runtime handles React import automatically

const tempData = [22, 23, 24, 23, 25, 24.5, 24.8, 25, 24.6];
const luxData = [120, 160, 130, 140, 155, 170, 165, 158, 162];
const encoderXData = [15, 18, 22, 27, 33, 31, 28, 25, 21];
const encoderZData = [12, 14, 17, 19, 23, 22, 20, 18, 16];
const csiFpsData = [24, 25, 24, 26, 27, 25, 26, 27, 26];
const csiRssiData = [-32.8, -33.0, -33.4, -33.1, -33.6, -33.9, -34.0, -33.8, -34.2];

function sparklinePath(data: number[], width: number, height: number) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);

  return data
    .map((value, index) => {
      const x = index * step;
      const y = height - ((value - min) / range) * height;
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');
}

function valueTicks(data: number[], ticks = 4) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const step = (max - min) / (ticks - 1 || 1);
  return Array.from({ length: ticks }, (_, index) => (max - index * step).toFixed(1));
}

function MetricCard({ title, value, unit, children }: { title: string; value: string; unit?: string; children?: React.ReactNode }) {
  return (
    <div className="h-[26rem] rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-soft backdrop-blur-xl">
      <div className="flex items-center justify-between text-sm text-slate-400">
        <span>{title}</span>
        <span className="rounded-full bg-slate-800 px-3 py-1 text-slate-300">Realtime</span>
      </div>
      <div className="mt-5 flex items-end gap-2">
        <span className="text-4xl font-semibold text-white">{value}</span>
        {unit && <span className="mb-1 text-lg text-slate-400">{unit}</span>}
      </div>
      <div className="mt-6 h-20 overflow-hidden rounded-3xl bg-slate-950/70 p-3">{children ?? <div className="h-full w-full" />}</div>
    </div>
  );
}

// ChartPanel removed — UI simplified to MetricCard summaries only

export default function App() {
  // placeholders currently only; chart data is preserved for future real-time integration

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 py-8 text-slate-100">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-400/80">Painel de monitoramento</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">Sistema de sensores</h1>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 px-5 py-4 shadow-soft">
            <p className="text-sm text-slate-400">Última atualização</p>
            <p className="mt-1 text-lg font-semibold text-white">Agora mesmo</p>
          </div>
        </header>

        <section className="grid gap-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-2 gap-6">
              <MetricCard title="Temperatura" value="24.8" unit="°C">
                <div className="flex h-full w-full items-center justify-center rounded-3xl border border-dashed border-slate-700 bg-slate-950/80 text-slate-500">
                  gráfico aqui
                </div>
              </MetricCard>
              <MetricCard title="Luminosidade" value="162" unit="lux">
                <div className="flex h-full w-full items-center justify-center rounded-3xl border border-dashed border-slate-700 bg-slate-950/80 text-slate-500">
                  gráfico aqui
                </div>
              </MetricCard>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <MetricCard title="Encoder X" value="21" unit="segundos" />
              <MetricCard title="Encoder Z" value="18" unit="segundos" />
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <MetricCard title="CSI FPS" value="26" unit="fps" />
            <MetricCard title="CSI RSSI" value="-33.8" unit="dBm" />
          </div>
        </section>
      </div>
    </main>
  );
}
