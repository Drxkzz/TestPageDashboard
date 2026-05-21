import React from 'react';

export type ChartCardProps = {
  label: string;
  unit?: string;
  data: number[];
  ticks?: number;
  height?: number;
};

function sparklinePath(data: number[], width: number, height: number, xOffset = 0) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);

  return data
    .map((value, index) => {
      const x = xOffset + index * step;
      const y = height - ((value - min) / range) * height;
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');
}

export default function ChartCard({ label, unit, data, ticks = 4, height = 120 }: ChartCardProps) {
  const width = 420;
  const leftPadding = 28;
  const chartWidth = width - leftPadding - 4;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const tickStep = (max - min) / (ticks - 1 || 1);
  const tickValues = Array.from({ length: ticks }, (_, i) => (max - i * tickStep).toFixed(1));

  const path = data.length ? sparklinePath(data, chartWidth, height, leftPadding) : '';
  const last = data.length ? data[data.length - 1] : undefined;
  const lastY = last !== undefined ? height - ((last - min) / (max - min || 1)) * height : 0;

  return (
    <div className="h-[26rem] rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-soft backdrop-blur-xl">
      <div className="flex items-center justify-between text-sm text-slate-400">
        <div>
          <p className="font-semibold text-white">{label}</p>
          <p className="text-xs text-slate-500">Últimos segundos</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-semibold text-white">{last !== undefined ? last : '—'}</p>
          {unit && <p className="text-sm text-slate-400">{unit}</p>}
        </div>
      </div>

      <div className="mt-6 h-28">
        <div className="relative h-full rounded-3xl bg-slate-950/70 p-2">
          <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMinYMin meet" className="h-full w-full block">
            <defs>
              <linearGradient id={`${label.replace(/\s+/g, '')}Grad`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
            <rect x={0} y={0} width={width} height={height} fill="transparent" />
            {tickValues.map((t, index) => {
              const y = (index / (tickValues.length - 1 || 1)) * height;
              return (
                <g key={t}>
                  <line x1={0} y1={y} x2={width} y2={y} stroke="rgba(148, 163, 184, 0.18)" strokeWidth={1} />
                  <text x={6} y={y - 4} fill="#94a3b8" fontSize="10" fontWeight="500">
                    {t}
                  </text>
                </g>
              );
            })}
            {path && <path d={path} fill="none" stroke={`url(#${label.replace(/\s+/g, '')}Grad)`} strokeWidth={2.5} strokeLinecap="round" />}
          </svg>

          {last !== undefined && (
            <div
              className="absolute right-3 -translate-y-1/2 rounded-full bg-slate-800/80 px-2 py-1 text-xs text-white"
              style={{ top: `${Math.max(8, Math.min(8 + lastY, 8 + height - 12))}px` }}
            >
              {last}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3 text-sm text-slate-300">
        <div className="rounded-2xl bg-slate-950/80 p-4">
          <p className="text-[0.65rem] uppercase tracking-[0.24em] text-slate-500">Mín</p>
          <p className="mt-2 text-lg font-semibold text-white">{min.toFixed(1)}</p>
        </div>
        <div className="rounded-2xl bg-slate-950/80 p-4">
          <p className="text-[0.65rem] uppercase tracking-[0.24em] text-slate-500">Máx</p>
          <p className="mt-2 text-lg font-semibold text-white">{max.toFixed(1)}</p>
        </div>
        <div className="rounded-2xl bg-slate-950/80 p-4">
          <p className="text-[0.65rem] uppercase tracking-[0.24em] text-slate-500">Atual</p>
          <p className="mt-2 text-lg font-semibold text-white">{last !== undefined ? last.toFixed(1) : '—'}</p>
        </div>
      </div>
    </div>
  );
}
