import Link from "next/link";
import { API_BASE_URL } from "@/lib/api";

type ReferralPartner = {
  id: string;
  companyName: string;
  contactPerson: string | null;
  area: string | null;
  specialty: string | null;
};

async function getPartners(): Promise<ReferralPartner[]> {
  const res = await fetch(`${API_BASE_URL}/api/referral-partners`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("failed to load referral partners");
  }
  return res.json();
}

export default async function AdminPartnersPage() {
  const partners = await getPartners();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-xl font-bold text-brand-navy">紹介先マスタ</h1>
        <Link
          href="/admin/partners/new"
          className="rounded-full bg-brand-navy px-5 py-2 text-sm font-semibold text-white hover:bg-brand-navy-light"
        >
          新規登録
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-stone-200 bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-stone-50 text-stone-500">
            <tr>
              <th className="px-4 py-3">会社名</th>
              <th className="px-4 py-3">担当者</th>
              <th className="px-4 py-3">対応エリア</th>
              <th className="px-4 py-3">専門分野</th>
            </tr>
          </thead>
          <tbody>
            {partners.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-stone-400">
                  まだ紹介先が登録されていません
                </td>
              </tr>
            )}
            {partners.map((partner) => (
              <tr key={partner.id} className="border-t border-stone-100 hover:bg-stone-50">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/partners/${partner.id}/edit`}
                    className="font-medium text-brand-navy hover:underline"
                  >
                    {partner.companyName}
                  </Link>
                </td>
                <td className="px-4 py-3 text-stone-600">{partner.contactPerson ?? "-"}</td>
                <td className="px-4 py-3 text-stone-600">{partner.area ?? "-"}</td>
                <td className="px-4 py-3 text-stone-600">{partner.specialty ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
