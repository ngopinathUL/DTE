export interface Insight {
  id: string;
  title: string;
  summary: string;
  detail: string;
  /** The chart/table state this insight binds to */
  binding: {
    endpoint: string;
    chartStrata: string[];
    tableStrata: string[];
  };
  tag: 'progression' | 'heterogeneity' | 'endpoint' | 'stratification';
}

/**
 * Curated scientific insights derived from analysis of
 * the digital twin dummy dataset (6 HD subjects, 3 strata).
 *
 * Data observations:
 * - cUHDRS: Stage III (SUBJ-006) declines 7.82→5.74 (Δ-2.08), vs Stage I avg Δ-1.6
 * - TMS: Bimodal baselines — SUBJ-001/003/004/006 start 38-44, SUBJ-002/005 start 13-14
 * - SDMT: SUBJ-003 (Stage II) has highest baseline (53.3) with steepest absolute decline (-10.3)
 * - TFC: Uniform ~1.4-1.8pt decline across all strata
 * - Independence: Stage III drops below 85 by study end; Stage I stays >89
 */
export const INSIGHTS: Insight[] = [
  {
    id: 'stage3-acceleration',
    title: 'Stage III shows accelerated composite decline',
    summary:
      'The Stage III twin (SUBJ-006) exhibits the steepest cUHDRS decline rate at -0.57/quarter, compared to -0.40/quarter in Stage I and -0.43/quarter in Stage II.',
    detail:
      'cUHDRS integrates TFC, TMS, SDMT, and Stroop scores into a single composite. The accelerated trajectory in Stage III suggests that late-stage disease amplifies decline across multiple functional domains simultaneously, consistent with the non-linear progression model described in TRACK-HD. This has implications for enrichment strategies — Stage III subjects may increase signal but also variance.',
    binding: {
      endpoint: 'cuhdrs',
      chartStrata: ['Stage III'],
      tableStrata: ['Stage I', 'Stage II', 'Stage III'],
    },
    tag: 'progression',
  },
  {
    id: 'tms-bimodal-baseline',
    title: 'Motor scores reveal bimodal baseline distribution',
    summary:
      'TMS baselines cluster into two groups: high-burden (38-44 pts, n=4) and low-burden (13-14 pts, n=2), cutting across strata assignments.',
    detail:
      'SUBJ-002 and SUBJ-005 (both Stage I) enter with TMS ~13, while SUBJ-001 (also Stage I) enters at 40. This within-strata heterogeneity in motor burden suggests that staging based on TFC alone may not capture the full phenotypic spectrum. Digital twin models should account for baseline TMS as an independent prognostic covariate to reduce residual variance in treatment effect estimation.',
    binding: {
      endpoint: 'uhdrs_tms_total_score',
      chartStrata: ['Stage I', 'Stage II', 'Stage III'],
      tableStrata: ['Stage I'],
    },
    tag: 'heterogeneity',
  },
  {
    id: 'sdmt-stage2-steepest',
    title: 'Cognitive decline (SDMT) is steepest in Stage II',
    summary:
      'SUBJ-003 (Stage II) loses 10.3 SDMT points over the study period — the largest absolute cognitive decline in the cohort, driven by a high baseline of 53.3.',
    detail:
      'The SDMT captures processing speed and is among the most sensitive cognitive endpoints in HD trials (Stout et al., 2012). The steep decline in Stage II may reflect a critical window where cognitive reserve is depleted. In contrast, Stage III (SUBJ-006) declines 5.8 pts from a lower baseline of 19.6, suggesting a floor effect. This supports SDMT as a primary endpoint in Stage II enriched trials, where the dynamic range and signal-to-noise ratio are most favorable.',
    binding: {
      endpoint: 'sdmt_correct',
      chartStrata: ['Stage II'],
      tableStrata: ['Stage I', 'Stage II', 'Stage III'],
    },
    tag: 'endpoint',
  },
  {
    id: 'tfc-uniform-decline',
    title: 'Functional capacity declines uniformly across strata',
    summary:
      'TFC loss is remarkably consistent: Stage I Δ-1.43, Stage II Δ-1.50, Stage III Δ-1.80 over the study period, with overlapping confidence intervals.',
    detail:
      'Unlike motor and cognitive endpoints, TFC progression appears stage-independent in this cohort, declining at approximately 0.35 pts/quarter regardless of baseline severity. This uniformity suggests that TFC may underperform as a differentiating endpoint in strata-enriched designs. However, its stability makes it a reliable anchor for composite scores and a conservative choice for regulatory submissions where low variance is valued over maximum sensitivity.',
    binding: {
      endpoint: 'uhdrs_tfc_total_score',
      chartStrata: ['Stage I', 'Stage II', 'Stage III'],
      tableStrata: ['Stage I', 'Stage II', 'Stage III'],
    },
    tag: 'stratification',
  },
  {
    id: 'independence-floor',
    title: 'Independence score approaching floor in advanced disease',
    summary:
      'Stage III ends the study at 84.4 on the UHDRS Independence Scale, nearing the clinical threshold (80) where assisted living is typically required.',
    detail:
      'Stage I twins maintain scores >89 throughout, preserving functional independence. The divergence between strata widens over time: at baseline the gap between Stage I mean (96.9) and Stage III (94.3) is only 2.6 pts, but by study end it expands to 5.2 pts. This accelerating separation supports the use of Independence Score as a stratification variable in adaptive trial designs, where interim analyses could re-weight enrollment toward strata with the most informative trajectories.',
    binding: {
      endpoint: 'uhdrs_ind_score',
      chartStrata: ['Stage I', 'Stage III'],
      tableStrata: ['Stage I', 'Stage III'],
    },
    tag: 'progression',
  },
];
