"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/api";

export type PartnerFormValues = {
  companyName: string;
  contactPerson: string;
  area: string;
  specialty: string;
  notes: string;
};

export default function PartnerForm({
  mode,
  partnerId,
  initialValues,
}: {
  mode: "create" | "edit";
  partnerId?: string;
  initialValues?: PartnerFormValues;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      companyName: String(formData.get("companyName") ?? ""),
      contactPerson: String(formData.get("contactPerson") ?? ""),
      area: String(formData.get("area") ?? ""),
      specialty: String(formData.get("specialty") ?? ""),
      notes: String(formData.get("notes") ?? ""),
    };

    const url =
      mode === "create"
        ? `${API_BASE_URL}/api/referral-partners`
        : `${API_BASE_URL}/api/referral-partners/${partnerId}`;
    const method = mode === "create" ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error("save failed");
      }
      router.push("/admin/partners");
      router.refresh();
    } catch {
      setError("保存に失敗しました");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-xl flex-col gap-4">
      <Field label="会社名" name="companyName" defaultValue={initialValues?.companyName} required />
      <Field label="担当者" name="contactPerson" defaultValue={initialValues?.contactPerson} />
      <Field label="対応エリア" name="area" defaultValue={initialValues?.area} />
      <Field label="専門分野" name="specialty" defaultValue={initialValues?.specialty} />
      <label className="flex flex-col gap-1 text-sm text-stone-700">
        <span className="font-medium">メモ</span>
        <textarea
          name="notes"
          defaultValue={initialValues?.notes}
          rows={4}
          className="rounded-md border border-stone-300 px-3 py-2 outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy"
        />
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="mt-2 flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-brand-navy px-6 py-2 text-sm font-semibold text-white hover:bg-brand-navy-light disabled:opacity-60"
        >
          {submitting ? "保存中..." : "保存"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
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
        defaultValue={defaultValue}
        required={required}
        className="rounded-md border border-stone-300 px-3 py-2 outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy"
      />
    </label>
  );
}
