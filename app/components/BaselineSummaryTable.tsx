'use client';

import React, { useMemo, useState } from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Stack,
  Chip,
  SelectChangeEvent,
} from '@mui/material';
import {
  RAW_DATA,
  TIME_POINTS,
  ENDPOINTS,
  SUBJECT_IDS,
  TwinRecord,
} from '../data/digitalTwinData';
import { charts, STRATA_COLORS } from '../theme/colors';

interface BaselineSummaryTableProps {
  selectedStrata: string[];
}

interface EndpointStats {
  n: number;
  mean: number;
  sd: number;
  median: number;
  min: number;
  max: number;
}

function computeBaselineStats(
  data: TwinRecord[],
  endpointKey: string,
  subjectIds: string[],
): EndpointStats {
  const baselineDay = TIME_POINTS[0];
  const values = subjectIds
    .map((id) => {
      const rec = data.find(
        (d) => d.subject_id === id && d.nominal_study_day === baselineDay,
      );
      return rec ? (rec[endpointKey as keyof TwinRecord] as number) : null;
    })
    .filter((v): v is number => v !== null);

  const n = values.length;
  if (n === 0) return { n: 0, mean: 0, sd: 0, median: 0, min: 0, max: 0 };

  const mean = values.reduce((a, b) => a + b, 0) / n;
  const sd =
    n > 1
      ? Math.sqrt(values.reduce((s, v) => s + (v - mean) ** 2, 0) / (n - 1))
      : 0;
  const sorted = [...values].sort((a, b) => a - b);
  const median =
    n % 2 === 0
      ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2
      : sorted[Math.floor(n / 2)];

  return { n, mean, sd, median, min: sorted[0], max: sorted[n - 1] };
}

const cellSx = {
  fontFamily: 'Roboto Mono, monospace',
  fontSize: '13px',
  color: '#262626',
  py: 1,
  borderColor: '#EEEBE4',
} as const;

const headerCellSx = {
  ...cellSx,
  fontWeight: 600,
  fontSize: '11px',
  color: '#666',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.36px',
  bgcolor: '#FAF9F7',
} as const;

const strataHeaderSx = {
  ...cellSx,
  fontWeight: 700,
  fontSize: '13px',
  bgcolor: '#FAF9F7',
  borderBottom: '2px solid #EEEBE4',
  py: 1.2,
} as const;

const fmt = (v: number) => v.toFixed(2);

export default function BaselineSummaryTable({
  selectedStrata,
}: BaselineSummaryTableProps) {
  const allEndpointKeys = Object.keys(ENDPOINTS);
  const [selectedEndpoints, setSelectedEndpoints] = useState<string[]>(allEndpointKeys);

  const handleEndpointChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    const next = typeof value === 'string' ? value.split(',') : value;
    if (next.length > 0) setSelectedEndpoints(next);
  };

  // Build stats per strata per endpoint
  const statsByStrata = useMemo(() => {
    const result: Record<string, Record<string, EndpointStats>> = {};

    // "Overall" across all selected strata
    const overallIds = SUBJECT_IDS.filter((id) => {
      const row = RAW_DATA.find((d) => d.subject_id === id);
      return row && selectedStrata.includes(row.strata);
    });
    result['Overall'] = {};
    for (const key of selectedEndpoints) {
      result['Overall'][key] = computeBaselineStats(RAW_DATA, key, overallIds);
    }

    // Per strata
    for (const strata of selectedStrata) {
      const ids = SUBJECT_IDS.filter((id) => {
        const row = RAW_DATA.find((d) => d.subject_id === id);
        return row && row.strata === strata;
      });
      result[strata] = {};
      for (const key of selectedEndpoints) {
        result[strata][key] = computeBaselineStats(RAW_DATA, key, ids);
      }
    }

    return result;
  }, [selectedStrata, selectedEndpoints]);

  const strataGroups = useMemo(() => {
    const groups = ['Overall'];
    if (selectedStrata.length > 1) {
      groups.push(...selectedStrata);
    }
    return groups;
  }, [selectedStrata]);

  const totalN = statsByStrata['Overall']?.[selectedEndpoints[0]]?.n ?? 0;

  return (
    <Paper
      elevation={0}
      sx={{ mb: 3, bgcolor: charts.backgroundColorInCard }}
    >
      <Stack
        direction="row"
        alignItems="flex-end"
        justifyContent="space-between"
        sx={{ px: 3, pt: 3, pb: 1 }}
      >
        <div>
          <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#262626' }}>
            Baseline summary statistics
          </Typography>
          <Typography
            sx={{
              fontSize: 13,
              color: '#888',
              pt: 0.5,
              fontFamily: 'Roboto Flex, sans-serif',
            }}
          >
            First observed timepoint (Day {TIME_POINTS[0]}) &mdash; {totalN} subjects
          </Typography>
        </div>

        {/* Table endpoint multi-select */}
        <FormControl size="small" sx={{ minWidth: 240 }}>
          <InputLabel
            sx={{ fontFamily: 'Roboto Mono, monospace', fontSize: 12, fontWeight: 500 }}
          >
            Table endpoints
          </InputLabel>
          <Select
            multiple
            value={selectedEndpoints}
            label="Table endpoints"
            onChange={handleEndpointChange}
            input={<OutlinedInput label="Table endpoints" />}
            renderValue={(selected) => (
              <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap' }}>
                {selected.map((k) => (
                  <Chip
                    key={k}
                    label={ENDPOINTS[k]}
                    size="small"
                    sx={{ height: 20, fontSize: 11, fontFamily: 'Roboto Flex, sans-serif' }}
                  />
                ))}
              </Stack>
            )}
            sx={{
              bgcolor: '#fff',
              borderRadius: 2,
              fontFamily: 'Roboto Flex, sans-serif',
              fontSize: 14,
            }}
          >
            {allEndpointKeys.map((key) => (
              <MenuItem key={key} value={key}>
                <Checkbox checked={selectedEndpoints.includes(key)} size="small" />
                <ListItemText
                  primary={ENDPOINTS[key]}
                  primaryTypographyProps={{ fontSize: 13, fontFamily: 'Roboto Flex, sans-serif' }}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <TableContainer sx={{ mt: 1 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={headerCellSx}>Endpoint</TableCell>
              <TableCell sx={headerCellSx} align="right">N</TableCell>
              <TableCell sx={headerCellSx} align="right">Mean ± SD</TableCell>
              <TableCell sx={headerCellSx} align="right">Median</TableCell>
              <TableCell sx={headerCellSx} align="right">Min</TableCell>
              <TableCell sx={headerCellSx} align="right">Max</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {strataGroups.map((group) => {
              const isOverall = group === 'Overall';
              const strataColor = STRATA_COLORS[group]?.line;
              const groupStats = statsByStrata[group] || {};

              return [
                // Strata group header row
                <TableRow key={`header-${group}`}>
                  <TableCell
                    colSpan={6}
                    sx={{
                      ...strataHeaderSx,
                      borderLeft: isOverall ? 'none' : `4px solid ${strataColor || '#999'}`,
                    }}
                  >
                    {group}
                    {!isOverall && groupStats[selectedEndpoints[0]] && (
                      <Typography
                        component="span"
                        sx={{ fontSize: 12, color: '#888', ml: 1, fontWeight: 400 }}
                      >
                        (n={groupStats[selectedEndpoints[0]].n})
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>,
                // Endpoint rows for this group
                ...selectedEndpoints.map((key) => {
                  const s = groupStats[key];
                  if (!s) return null;
                  return (
                    <TableRow key={`${group}-${key}`} hover>
                      <TableCell
                        sx={{
                          ...cellSx,
                          fontWeight: 500,
                          pl: isOverall ? 2 : 4,
                          borderLeft: isOverall ? 'none' : `4px solid ${strataColor || '#999'}`,
                        }}
                      >
                        {ENDPOINTS[key]}
                      </TableCell>
                      <TableCell sx={cellSx} align="right">{s.n}</TableCell>
                      <TableCell sx={cellSx} align="right">
                        {fmt(s.mean)} ± {fmt(s.sd)}
                      </TableCell>
                      <TableCell sx={cellSx} align="right">{fmt(s.median)}</TableCell>
                      <TableCell sx={cellSx} align="right">{fmt(s.min)}</TableCell>
                      <TableCell sx={cellSx} align="right">{fmt(s.max)}</TableCell>
                    </TableRow>
                  );
                }),
              ];
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
