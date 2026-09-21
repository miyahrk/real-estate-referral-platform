"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/api";
import { LEAD_STATUSES, LEAD_STATUS_LABELS, type LeadStatus } from "@/lib/leadStatus";

export default function LeadStatusForm({
  leadId,
  currentStatus,
}: {
  leadId: string;
  currentStatus: LeadStatus;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<LeadStatus>(currentStatus);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/leads/${leadId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        throw new Error("update failed");
      }
      router.refresh();
    } catch {
      setError("ステータスの更新に失敗しました");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as LeadStatus)}
        className="rounded-md border border-stone-300 px-3 py-2 text-sm outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy"
      >
        {LEAD_STATUSES.map((s) => (
          <option key={s} value={s}>
            {LEAD_STATUS_LABELS[s]}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={handleSave}
        disabled={saving || status === currentStatus}
        className="rounded-full bg-brand-navy px-5 py-2 text-sm font-semibold text-white hover:bg-brand-navy-light disabled:opacity-50"
      >
        {saving ? "更新中..." : "更新"}
      </button>
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  );
}
