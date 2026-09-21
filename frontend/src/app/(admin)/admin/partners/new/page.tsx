import Link from "next/link";
import PartnerForm from "@/components/PartnerForm";

export default function NewPartnerPage() {
  return (
    <div>
      <Link href="/admin/partners" className="text-sm text-stone-500 hover:text-brand-navy">
        ← 紹介先マスタに戻る
      </Link>
      <h1 className="mt-4 font-serif text-xl font-bold text-brand-navy">紹介先の新規登録</h1>
      <div className="mt-6">
        <PartnerForm mode="create" />
      </div>
    </div>
  );
}
