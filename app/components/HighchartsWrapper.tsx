'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';

interface HighchartsWrapperProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any;
}

export default function HighchartsWrapper({ options }: HighchartsWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartRef = useRef<any>(null);
  const [loaded, setLoaded] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const highchartsRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;
    async function loadHighcharts() {
      const hcModule = await import('highcharts');
      const Highcharts = hcModule.default || hcModule;
      const moreModule = await import('highcharts/highcharts-more');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const HighchartsMore: any = moreModule.default || moreModule;
      HighchartsMore(Highcharts);
      if (!cancelled) {
        highchartsRef.current = Highcharts;
        setLoaded(true);
      }
    }
    loadHighcharts();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!loaded || !containerRef.current || !highchartsRef.current) return;
    const Highcharts = highchartsRef.current;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = Highcharts.chart(containerRef.current, options);

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [loaded, options]);

  if (!loaded) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 370 }}>
        <CircularProgress size={32} />
      </Box>
    );
  }

  return <div ref={containerRef} />;
}
