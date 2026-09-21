import Link from "next/link";
import { notFound } from "next/navigation";
import { API_BASE_URL } from "@/lib/api";
import PartnerForm from "@/components/PartnerForm";

type ReferralPartner = {
  id: string;
  companyName: string;
  contactPerson: string | null;
  area: string | null;
  specialty: string | null;
  notes: string | null;
};

async function getPartner(id: string): Promise<ReferralPartner | null> {
  const res = await fetch(`${API_BASE_URL}/api/referral-partners/${id}`, { cache: "no-store" });
  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error("failed to load referral partner");
  }
  return res.json();
}

export default async function EditPartnerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const partner = await getPartner(id);

  if (!partner) {
    notFound();
  }

  return (
    <div>
      <Link href="/admin/partners" className="text-sm text-stone-500 hover:text-brand-navy">
        ← 紹介先マスタに戻る
      </Link>
      <h1 className="mt-4 font-serif text-xl font-bold text-brand-navy">{partner.companyName} の編集</h1>
      <div className="mt-6">
        <PartnerForm
          mode="edit"
          partnerId={partner.id}
          initialValues={{
            companyName: partner.companyName,
            contactPerson: partner.contactPerson ?? "",
            area: partner.area ?? "",
            specialty: partner.specialty ?? "",
            notes: partner.notes ?? "",
          }}
        />
      </div>
    </div>
  );
}
