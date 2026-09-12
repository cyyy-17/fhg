import { getClientCsrfToken } from "./csrf";

/**
 * Returns headers with CSRF token for mutating administrative fetch requests.
 */
export async function getAdminMutationHeaders(): Promise<Record<string, string>> {
  let token = getClientCsrfToken();
  if (!token) {
    try {
      const res = await fetch("/api/admin/csrf");
      if (res.ok) {
        const json = await res.json();
        token = json.csrfToken || "";
      }
    } catch {
      // ignore
    }
  }

  return {
    "Content-Type": "application/json",
    "x-csrf-token": token || "",
  };
}
