'use client';

import * as Highcharts from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
import { HighchartsReact } from 'highcharts-react-official';
import { useEffect, useRef, useState } from 'react';

if (typeof window !== 'undefined') {
  highchartsMore(Highcharts);
}

interface Props {
  options: Highcharts.Options;
}

export default function HighchartsChart({ options }: Props) {
  const chartRef = useRef<HighchartsReact.RefObject>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  // Wait until the wrapper has a non-zero width before rendering the chart
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    if (el.offsetWidth > 0) {
      setReady(true);
      return;
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setReady(true);
          observer.disconnect();
        }
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Reflow when options change (e.g., endpoint/strata switch)
  useEffect(() => {
    if (ready && chartRef.current?.chart) {
      chartRef.current.chart.reflow();
    }
  }, [ready, options]);

  return (
    <div ref={wrapperRef} style={{ width: '100%', minHeight: 420 }}>
      {ready && (
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          ref={chartRef}
          containerProps={{ style: { width: '100%', height: '420px' } }}
        />
      )}
    </div>
  );
}
