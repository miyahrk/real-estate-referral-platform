import Link from "next/link";
import { notFound } from "next/navigation";
import { API_BASE_URL } from "@/lib/api";
import type { LeadStatus } from "@/lib/leadStatus";
import LeadStatusForm from "@/components/LeadStatusForm";

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

async function getLead(id: string): Promise<Lead | null> {
  const res = await fetch(`${API_BASE_URL}/api/leads/${id}`, { cache: "no-store" });
  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error("failed to load lead");
  }
  return res.json();
}

export default async function AdminLeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lead = await getLead(id);

  if (!lead) {
    notFound();
  }

  return (
    <div>
      <Link href="/admin/leads" className="text-sm text-stone-500 hover:text-brand-navy">
        ← 案件一覧に戻る
      </Link>

      <h1 className="mt-4 font-serif text-xl font-bold text-brand-navy">{lead.name}</h1>

      <dl className="mt-6 grid gap-4 rounded-lg border border-stone-200 bg-white p-6 sm:grid-cols-2">
        <Field label="連絡先" value={lead.contact} />
        <Field label="希望エリア" value={lead.area} />
        <Field label="ご予算" value={lead.budget} />
        <Field label="投資目的" value={lead.purpose} />
        <Field label="受付日" value={new Date(lead.createdAt).toLocaleString("ja-JP")} />
      </dl>

      <div className="mt-8">
        <h2 className="text-sm font-semibold text-stone-500">ステータス</h2>
        <div className="mt-2">
          <LeadStatusForm leadId={lead.id} currentStatus={lead.status} />
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <dt className="text-xs font-semibold text-stone-400">{label}</dt>
      <dd className="mt-1 text-stone-800">{value ?? "-"}</dd>
    </div>
  );
}
