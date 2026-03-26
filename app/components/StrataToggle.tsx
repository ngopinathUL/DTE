'use client';

import { Chip, Stack, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { STRATA } from '../data/digitalTwinData';
import { STRATA_COLORS } from '../theme/colors';

interface StrataToggleProps {
  selectedStrata: string[];
  onChange: (next: string[]) => void;
  disabled?: boolean;
}

export default function StrataToggle({ selectedStrata, onChange, disabled }: StrataToggleProps) {
  const handleToggle = (strata: string) => {
    if (disabled) return;
    const isActive = selectedStrata.includes(strata);
    if (isActive && selectedStrata.length === 1) return;
    const next = isActive
      ? selectedStrata.filter((s) => s !== strata)
      : [...selectedStrata, strata];
    onChange(next);
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 500,
          color: disabled ? '#bbb' : '#888',
          fontFamily: 'Roboto Mono, monospace',
          textTransform: 'uppercase',
          letterSpacing: '0.36px',
          mr: 0.5,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        {disabled && <LockIcon sx={{ fontSize: 12 }} />}
        Strata
      </Typography>
      {STRATA.map((s) => {
        const active = selectedStrata.includes(s);
        const color = STRATA_COLORS[s]?.line || '#999';
        return (
          <Chip
            key={s}
            label={s}
            size="small"
            onClick={() => handleToggle(s)}
            disabled={disabled}
            sx={{
              height: 28,
              fontSize: 13,
              fontFamily: 'Roboto Flex, sans-serif',
              fontWeight: active ? 600 : 400,
              bgcolor: active ? STRATA_COLORS[s]?.band || '#eee' : 'transparent',
              border: `2px solid ${active ? color : '#ddd'}`,
              color: active ? color : '#aaa',
              cursor: disabled ? 'default' : 'pointer',
              opacity: disabled ? 0.6 : 1,
              transition: 'all 0.15s ease',
              '&:hover': disabled
                ? {}
                : {
                    bgcolor: STRATA_COLORS[s]?.band || '#f5f5f5',
                    borderColor: color,
                  },
              '&.Mui-disabled': {
                opacity: 0.6,
                color: active ? color : '#ccc',
                bgcolor: active ? STRATA_COLORS[s]?.band || '#eee' : 'transparent',
                border: `2px solid ${active ? color : '#ddd'}`,
              },
            }}
          />
        );
      })}
    </Stack>
  );
}
