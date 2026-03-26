'use client';

import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import BaselineSummaryTable from './BaselineSummaryTable';
import ProgressionChart from './ProgressionChart';
import {
  ENDPOINTS,
  SUBJECT_IDS,
  STRATA,
} from '../data/digitalTwinData';
import { charts } from '../theme/colors';

export default function DiseaseProgressionExplorer() {
  const [endpoint, setEndpoint] = useState<string>('cuhdrs');
  const [strataFilter, setStrataFilter] = useState<string>('All');

  const strataOptions = useMemo(() => ['All', ...STRATA], []);

  return (
    <Box
      sx={{
        maxWidth: 1280,
        mx: 'auto',
        p: { xs: 2, md: 5 },
        bgcolor: charts.backgroundColor,
        minHeight: '100vh',
      }}
    >
      {/* Header */}
      <Typography
        sx={{
          letterSpacing: 2,
          fontSize: 11,
          fontWeight: 500,
          color: '#999',
          textTransform: 'uppercase',
          mb: 1,
          fontFamily: 'Roboto Mono, monospace',
        }}
      >
        Unlearn &mdash; Digital Twin Visualization
      </Typography>
      <Typography variant="h1" sx={{ mb: 1 }}>
        Disease progression explorer
      </Typography>
      <Typography variant="subtitle1" sx={{ maxWidth: 700, mb: 3 }}>
        Population average and individual digital twin trajectories for a
        simulated endpoint. Hover any twin line to isolate it and view its
        prediction band.
      </Typography>

      {/* Controls */}
      <Stack direction="row" spacing={2} sx={{ mb: 3, flexWrap: 'wrap' }}>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel
            sx={{
              fontFamily: 'Roboto Mono, monospace',
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            Endpoint
          </InputLabel>
          <Select
            value={endpoint}
            label="Endpoint"
            onChange={(e: SelectChangeEvent) => setEndpoint(e.target.value)}
            sx={{
              bgcolor: '#fff',
              borderRadius: 2,
              fontFamily: 'Roboto Flex, sans-serif',
              fontSize: 14,
            }}
          >
            {Object.entries(ENDPOINTS).map(([key, label]) => (
              <MenuItem key={key} value={key}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel
            sx={{
              fontFamily: 'Roboto Mono, monospace',
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            Strata
          </InputLabel>
          <Select
            value={strataFilter}
            label="Strata"
            onChange={(e: SelectChangeEvent) => setStrataFilter(e.target.value)}
            sx={{
              bgcolor: '#fff',
              borderRadius: 2,
              fontFamily: 'Roboto Flex, sans-serif',
              fontSize: 14,
            }}
          >
            {strataOptions.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {/* Baseline Summary Table */}
      <BaselineSummaryTable strataFilter={strataFilter} />

      {/* Single chart */}
      <ProgressionChart
        endpoint={endpoint}
        subjectIds={SUBJECT_IDS}
        strataFilter={strataFilter}
      />

      {/* Footer */}
      <Typography
        sx={{
          textAlign: 'right',
          fontSize: 13,
          color: '#bbb',
          mt: 3,
          fontFamily: 'Roboto Flex, sans-serif',
        }}
      >
        Change from baseline &middot; Simulated endpoint data
      </Typography>
    </Box>
  );
}
