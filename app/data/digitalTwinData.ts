export interface TwinRecord {
  subject_id: string;
  nominal_study_day: number;
  cuhdrs: number;
  uhdrs_tms_total_score: number;
  uhdrs_tfc_total_score: number;
  uhdrs_ind_score: number;
  sdmt_correct: number;
  strata: string;
}

export const ENDPOINTS: Record<string, string> = {
  cuhdrs: "cUHDRS",
  uhdrs_tms_total_score: "UHDRS TMS Total Score",
  uhdrs_tfc_total_score: "UHDRS TFC Total Score",
  uhdrs_ind_score: "UHDRS Independence Score",
  sdmt_correct: "SDMT Correct",
};

export const RAW_DATA: TwinRecord[] = [
  { subject_id: "SUBJ-001", nominal_study_day: 0,   cuhdrs: 11.32337, uhdrs_tms_total_score: 39.92517, uhdrs_tfc_total_score: 12.84599, uhdrs_ind_score: 99.27901, sdmt_correct: 33.45290, strata: "Stage I" },
  { subject_id: "SUBJ-001", nominal_study_day: 92,  cuhdrs: 10.91447, uhdrs_tms_total_score: 40.48359, uhdrs_tfc_total_score: 12.49766, uhdrs_ind_score: 97.32812, sdmt_correct: 31.89219, strata: "Stage I" },
  { subject_id: "SUBJ-001", nominal_study_day: 183, cuhdrs: 10.51001, uhdrs_tms_total_score: 41.03594, uhdrs_tfc_total_score: 12.15312, uhdrs_ind_score: 95.39844, sdmt_correct: 30.34844, strata: "Stage I" },
  { subject_id: "SUBJ-001", nominal_study_day: 274, cuhdrs: 10.09385, uhdrs_tms_total_score: 41.57031, uhdrs_tfc_total_score: 11.78750, uhdrs_ind_score: 93.37891, sdmt_correct: 28.74609, strata: "Stage I" },
  { subject_id: "SUBJ-001", nominal_study_day: 365, cuhdrs: 9.74576,  uhdrs_tms_total_score: 42.30938, uhdrs_tfc_total_score: 11.49531, uhdrs_ind_score: 91.53593, sdmt_correct: 27.25625, strata: "Stage I" },
  { subject_id: "SUBJ-001", nominal_study_day: 456, cuhdrs: 9.31897,  uhdrs_tms_total_score: 42.79531, uhdrs_tfc_total_score: 11.06328, uhdrs_ind_score: 89.46562, sdmt_correct: 25.98516, strata: "Stage I" },
  { subject_id: "SUBJ-002", nominal_study_day: 0,   cuhdrs: 14.22036, uhdrs_tms_total_score: 12.03109, uhdrs_tfc_total_score: 12.01089, uhdrs_ind_score: 99.62520, sdmt_correct: 41.32963, strata: "Stage I" },
  { subject_id: "SUBJ-002", nominal_study_day: 92,  cuhdrs: 14.03411, uhdrs_tms_total_score: 12.83672, uhdrs_tfc_total_score: 11.87188, uhdrs_ind_score: 98.52734, sdmt_correct: 40.97578, strata: "Stage I" },
  { subject_id: "SUBJ-002", nominal_study_day: 183, cuhdrs: 13.84988, uhdrs_tms_total_score: 13.63359, uhdrs_tfc_total_score: 11.73438, uhdrs_ind_score: 97.44141, sdmt_correct: 40.62578, strata: "Stage I" },
  { subject_id: "SUBJ-002", nominal_study_day: 274, cuhdrs: 13.62453, uhdrs_tms_total_score: 14.82969, uhdrs_tfc_total_score: 11.62031, uhdrs_ind_score: 96.36328, sdmt_correct: 40.11328, strata: "Stage I" },
  { subject_id: "SUBJ-002", nominal_study_day: 365, cuhdrs: 13.44715, uhdrs_tms_total_score: 15.65234, uhdrs_tfc_total_score: 11.44297, uhdrs_ind_score: 95.21484, sdmt_correct: 40.43750, strata: "Stage I" },
  { subject_id: "SUBJ-002", nominal_study_day: 456, cuhdrs: 13.24439, uhdrs_tms_total_score: 16.79141, uhdrs_tfc_total_score: 11.33516, uhdrs_ind_score: 94.20703, sdmt_correct: 40.01016, strata: "Stage I" },
  { subject_id: "SUBJ-003", nominal_study_day: 0,   cuhdrs: 13.37747, uhdrs_tms_total_score: 37.92999, uhdrs_tfc_total_score: 11.98435, uhdrs_ind_score: 99.44372, sdmt_correct: 55.92731, strata: "Stage II" },
  { subject_id: "SUBJ-003", nominal_study_day: 92,  cuhdrs: 12.95489, uhdrs_tms_total_score: 38.04531, uhdrs_tfc_total_score: 11.69922, uhdrs_ind_score: 97.43359, sdmt_correct: 53.27188, strata: "Stage II" },
  { subject_id: "SUBJ-003", nominal_study_day: 183, cuhdrs: 12.53690, uhdrs_tms_total_score: 38.15938, uhdrs_tfc_total_score: 11.41719, uhdrs_ind_score: 95.44531, sdmt_correct: 50.64531, strata: "Stage II" },
  { subject_id: "SUBJ-003", nominal_study_day: 274, cuhdrs: 12.06492, uhdrs_tms_total_score: 38.25156, uhdrs_tfc_total_score: 11.12578, uhdrs_ind_score: 93.64453, sdmt_correct: 47.63281, strata: "Stage II" },
  { subject_id: "SUBJ-003", nominal_study_day: 365, cuhdrs: 11.65198, uhdrs_tms_total_score: 38.26484, uhdrs_tfc_total_score: 10.84922, uhdrs_ind_score: 91.78516, sdmt_correct: 45.14766, strata: "Stage II" },
  { subject_id: "SUBJ-003", nominal_study_day: 456, cuhdrs: 11.29291, uhdrs_tms_total_score: 38.13047, uhdrs_tfc_total_score: 10.57969, uhdrs_ind_score: 89.59766, sdmt_correct: 42.94922, strata: "Stage II" },
  { subject_id: "SUBJ-004", nominal_study_day: 0,   cuhdrs: 9.92269,  uhdrs_tms_total_score: 37.96059, uhdrs_tfc_total_score: 11.98190, uhdrs_ind_score: 99.40767, sdmt_correct: 27.54458, strata: "Stage II" },
  { subject_id: "SUBJ-004", nominal_study_day: 92,  cuhdrs: 9.47398,  uhdrs_tms_total_score: 38.99922, uhdrs_tfc_total_score: 11.56250, uhdrs_ind_score: 96.76172, sdmt_correct: 26.17500, strata: "Stage II" },
  { subject_id: "SUBJ-004", nominal_study_day: 183, cuhdrs: 9.03015,  uhdrs_tms_total_score: 40.02656, uhdrs_tfc_total_score: 11.14766, uhdrs_ind_score: 94.14453, sdmt_correct: 24.82031, strata: "Stage II" },
  { subject_id: "SUBJ-004", nominal_study_day: 274, cuhdrs: 8.61713,  uhdrs_tms_total_score: 40.87812, uhdrs_tfc_total_score: 10.72734, uhdrs_ind_score: 91.72656, sdmt_correct: 23.61406, strata: "Stage II" },
  { subject_id: "SUBJ-004", nominal_study_day: 365, cuhdrs: 8.21585,  uhdrs_tms_total_score: 42.25078, uhdrs_tfc_total_score: 10.31172, uhdrs_ind_score: 89.31875, sdmt_correct: 22.99219, strata: "Stage II" },
  { subject_id: "SUBJ-004", nominal_study_day: 456, cuhdrs: 7.77280,  uhdrs_tms_total_score: 43.16797, uhdrs_tfc_total_score: 9.82500,  uhdrs_ind_score: 86.50234, sdmt_correct: 22.01562, strata: "Stage II" },
  { subject_id: "SUBJ-005", nominal_study_day: 0,   cuhdrs: 12.34391, uhdrs_tms_total_score: 12.43614, uhdrs_tfc_total_score: 12.86969, uhdrs_ind_score: 99.92566, sdmt_correct: 31.22544, strata: "Stage I" },
  { subject_id: "SUBJ-005", nominal_study_day: 92,  cuhdrs: 11.95746, uhdrs_tms_total_score: 13.78281, uhdrs_tfc_total_score: 12.63906, uhdrs_ind_score: 98.50000, sdmt_correct: 29.89062, strata: "Stage I" },
  { subject_id: "SUBJ-005", nominal_study_day: 183, cuhdrs: 11.57521, uhdrs_tms_total_score: 15.11484, uhdrs_tfc_total_score: 12.41094, uhdrs_ind_score: 97.08984, sdmt_correct: 28.57031, strata: "Stage I" },
  { subject_id: "SUBJ-005", nominal_study_day: 274, cuhdrs: 11.18203, uhdrs_tms_total_score: 16.42578, uhdrs_tfc_total_score: 12.17656, uhdrs_ind_score: 95.66016, sdmt_correct: 27.23438, strata: "Stage I" },
  { subject_id: "SUBJ-005", nominal_study_day: 365, cuhdrs: 10.77891, uhdrs_tms_total_score: 17.73672, uhdrs_tfc_total_score: 11.93594, uhdrs_ind_score: 94.21094, sdmt_correct: 25.88281, strata: "Stage I" },
  { subject_id: "SUBJ-005", nominal_study_day: 456, cuhdrs: 10.36484, uhdrs_tms_total_score: 19.04766, uhdrs_tfc_total_score: 11.68906, uhdrs_ind_score: 92.74219, sdmt_correct: 24.51563, strata: "Stage I" },
  { subject_id: "SUBJ-006", nominal_study_day: 0,   cuhdrs: 8.33999,  uhdrs_tms_total_score: 42.78915, uhdrs_tfc_total_score: 10.89543, uhdrs_ind_score: 96.79249, sdmt_correct: 21.09392, strata: "Stage III" },
  { subject_id: "SUBJ-006", nominal_study_day: 92,  cuhdrs: 7.82344,  uhdrs_tms_total_score: 44.21875, uhdrs_tfc_total_score: 10.45312, uhdrs_ind_score: 94.32031, sdmt_correct: 19.64062, strata: "Stage III" },
  { subject_id: "SUBJ-006", nominal_study_day: 183, cuhdrs: 7.31250,  uhdrs_tms_total_score: 45.63281, uhdrs_tfc_total_score: 10.01562, uhdrs_ind_score: 91.87500, sdmt_correct: 18.20312, strata: "Stage III" },
  { subject_id: "SUBJ-006", nominal_study_day: 274, cuhdrs: 6.79688,  uhdrs_tms_total_score: 47.04688, uhdrs_tfc_total_score: 9.57031,  uhdrs_ind_score: 89.41406, sdmt_correct: 16.75000, strata: "Stage III" },
  { subject_id: "SUBJ-006", nominal_study_day: 365, cuhdrs: 6.27344,  uhdrs_tms_total_score: 48.46094, uhdrs_tfc_total_score: 9.11719,  uhdrs_ind_score: 86.93750, sdmt_correct: 15.28125, strata: "Stage III" },
  { subject_id: "SUBJ-006", nominal_study_day: 456, cuhdrs: 5.74219,  uhdrs_tms_total_score: 49.87500, uhdrs_tfc_total_score: 8.65625,  uhdrs_ind_score: 84.44531, sdmt_correct: 13.79688, strata: "Stage III" },
];

export const SUBJECT_IDS = [...new Set(RAW_DATA.map((d) => d.subject_id))];
export const TIME_POINTS = [...new Set(RAW_DATA.map((d) => d.nominal_study_day))].sort((a, b) => a - b);
export const STRATA = [...new Set(RAW_DATA.map((d) => d.strata))];

export function dayToMonthLabel(day: number): string {
  if (day === 0) return "BL";
  const m = Math.round(day / 30.44);
  return `${m}M`;
}

export type EndpointKey = keyof typeof ENDPOINTS;
