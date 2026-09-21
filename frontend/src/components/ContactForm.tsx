"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { submitLead } from "@/lib/api";

const budgetOptions = ["未定", "〜1000万円", "1000〜3000万円", "3000万円〜"];
const purposeOptions = ["資産形成", "節税", "副収入", "その他"];

export default function ContactForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      await submitLead({
        name: String(formData.get("name") ?? ""),
        contact: String(formData.get("contact") ?? ""),
        area: String(formData.get("area") ?? ""),
        budget: String(formData.get("budget") ?? ""),
        purpose: String(formData.get("purpose") ?? ""),
      });
      router.push("/thanks");
    } catch {
      setError("送信に失敗しました。しばらくしてから再度お試しください。");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex max-w-xl flex-col gap-5">
      <Field label="お名前" name="name" required />
      <Field label="ご連絡先（電話番号 or メールアドレス）" name="contact" required />
      <Field label="希望エリア" name="area" />

      <SelectField label="ご予算" name="budget" options={budgetOptions} />
      <SelectField label="投資目的" name="purpose" options={purposeOptions} />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 rounded-full bg-brand-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-navy-light disabled:opacity-60"
      >
        {submitting ? "送信中..." : "無料相談を申し込む"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  required,
}: {
  label: string;
  name: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm text-stone-700">
      <span className="font-medium">
        {label}
        {required && <span className="ml-1 text-brand-accent">*</span>}
      </span>
      <input
        name={name}
        required={required}
        className="rounded-md border border-stone-300 px-3 py-2 text-stone-900 outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <label className="flex flex-col gap-1 text-sm text-stone-700">
      <span className="font-medium">{label}</span>
      <select
        name={name}
        defaultValue=""
        className="rounded-md border border-stone-300 px-3 py-2 text-stone-900 outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy"
      >
        <option value="" disabled>
          選択してください
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
