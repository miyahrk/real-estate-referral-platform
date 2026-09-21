export const LEAD_STATUSES = [
  "new",
  "hearing",
  "referred",
  "closed_won",
  "closed_lost",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: "新規",
  hearing: "ヒアリング中",
  referred: "紹介済み",
  closed_won: "成約",
  closed_lost: "不成立",
};
