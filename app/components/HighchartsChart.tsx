'use client';

import { useEffect, useRef } from 'react';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any;
}

export default function HighchartsChart({ options }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hcRef = useRef<any>(null);

  // Load Highcharts on mount
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const hcMod = await import('highcharts');
      const Highcharts = hcMod.default || hcMod;
      const moreMod = await import('highcharts/highcharts-more');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const more: any = moreMod.default || moreMod;
      more(Highcharts);
      if (!cancelled) {
        hcRef.current = Highcharts;
        if (containerRef.current) {
          chartRef.current = Highcharts.chart(containerRef.current, options);
        }
      }
    })();
    return () => {
      cancelled = true;
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  // Only run on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update chart when options change (after initial mount)
  useEffect(() => {
    if (chartRef.current && hcRef.current) {
      chartRef.current.destroy();
      chartRef.current = hcRef.current.chart(containerRef.current, options);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  return <div ref={containerRef} style={{ width: '100%', minHeight: 420 }} />;
}
