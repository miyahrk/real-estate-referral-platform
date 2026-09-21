import Link from "next/link";
import { API_BASE_URL } from "@/lib/api";
import { LEAD_STATUS_LABELS, type LeadStatus } from "@/lib/leadStatus";

type Lead = {
  id: string;
  name: string;
  contact: string;
  area: string | null;
  budget: string | null;
  purpose: string | null;
  status: LeadStatus;
  createdAt: string;
};

async function getLeads(): Promise<Lead[]> {
  const res = await fetch(`${API_BASE_URL}/api/leads`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("案件一覧の取得に失敗しました");
  }
  return res.json();
}

export default async function AdminLeadsPage() {
  const leads = await getLeads();

  return (
    <div>
      <h1 className="font-serif text-xl font-bold text-brand-navy">案件一覧</h1>
      <p className="mt-1 text-sm text-stone-500">全{leads.length}件</p>

      <div className="mt-6 overflow-x-auto rounded-lg border border-stone-200 bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-stone-50 text-stone-500">
            <tr>
              <th className="px-4 py-3">お名前</th>
              <th className="px-4 py-3">連絡先</th>
              <th className="px-4 py-3">エリア</th>
              <th className="px-4 py-3">ステータス</th>
              <th className="px-4 py-3">受付日</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-stone-400">
                  まだ案件がありません
                </td>
              </tr>
            )}
            {leads.map((lead) => (
              <tr key={lead.id} className="border-t border-stone-100 hover:bg-stone-50">
                <td className="px-4 py-3">
                  <Link href={`/admin/leads/${lead.id}`} className="font-medium text-brand-navy hover:underline">
                    {lead.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-stone-600">{lead.contact}</td>
                <td className="px-4 py-3 text-stone-600">{lead.area ?? "-"}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={lead.status} />
                </td>
                <td className="px-4 py-3 text-stone-500">
                  {new Date(lead.createdAt).toLocaleDateString("ja-JP")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: LeadStatus }) {
  const colors: Record<LeadStatus, string> = {
    new: "bg-blue-100 text-blue-700",
    hearing: "bg-amber-100 text-amber-700",
    referred: "bg-purple-100 text-purple-700",
    closed_won: "bg-green-100 text-green-700",
    closed_lost: "bg-stone-200 text-stone-500",
  };

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${colors[status]}`}>
      {LEAD_STATUS_LABELS[status]}
    </span>
  );
}
