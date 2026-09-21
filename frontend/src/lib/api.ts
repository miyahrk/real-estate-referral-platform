/**
 * Resolves the backend (Spring Boot, port 8080) base URL.
 *
 * Locally, http://localhost:8080 is correct. On GitHub Codespaces, the
 * frontend and backend each get a separate public URL
 * (e.g. https://<name>-3000.app.github.dev / https://<name>-8080.app.github.dev),
 * so we infer the backend URL by swapping the port in the browser's current
 * hostname. Set NEXT_PUBLIC_API_BASE_URL to override this entirely.
 */
function resolveApiBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }

  if (typeof window !== "undefined") {
    const { hostname, protocol } = window.location;
    // Codespaces forwarded URL pattern: <codespace-name>-<port>.<domain>
    const match = hostname.match(/^(.*)-3000\.(app\.github\.dev|github\.dev)$/);
    if (match) {
      return `${protocol}//${match[1]}-8080.${match[2]}`;
    }
  }

  return "http://localhost:8080";
}

export const API_BASE_URL = resolveApiBaseUrl();

export type LeadInput = {
  name: string;
  contact: string;
  area: string;
  budget: string;
  purpose: string;
};

export async function submitLead(input: LeadInput): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    throw new Error(`問い合わせの送信に失敗しました (status: ${res.status})`);
  }
}
