export type CmsDocumentKey =
  | 'site-content'
  | 'hero-images'
  | 'site-pages'
  | 'banner'
  | 'news';

export type CmsDocuments = Partial<Record<CmsDocumentKey, unknown>>;

export class CmsApiError extends Error {
  status: number;
  code: string;

  constructor(status: number, code: string) {
    super(code);
    this.name = 'CmsApiError';
    this.status = status;
    this.code = code;
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`/api${path}`, {
      ...init,
      credentials: 'same-origin',
      cache: 'no-store',
      headers: {
        ...(init.body ? { 'Content-Type': 'application/json' } : {}),
        ...init.headers,
      },
    });
  } catch {
    throw new CmsApiError(0, 'network_unavailable');
  }

  let body: unknown = null;
  try {
    body = await response.json();
  } catch {
    // A non-JSON proxy error is reported using a stable client-side code below.
  }

  if (!response.ok) {
    const code = body && typeof body === 'object' && 'error' in body && typeof body.error === 'string'
      ? body.error
      : 'request_failed';
    throw new CmsApiError(response.status, code);
  }
  return body as T;
}

export function fetchPublicCmsContent(): Promise<{ documents: CmsDocuments }> {
  return request('/public/content');
}

export interface ContactFormSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string;
}

export function submitContactForm(submission: ContactFormSubmission): Promise<{ accepted: true; reference?: string }> {
  return request('/public/contact', {
    method: 'POST',
    body: JSON.stringify(submission),
  });
}

export function fetchAdminSession(): Promise<{ authenticated: boolean; admin?: { email: string; displayName: string } }> {
  return request('/admin/auth/session');
}

export function loginAdmin(email: string, password: string): Promise<{ authenticated: true; admin: { email: string; displayName: string } }> {
  return request('/admin/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
}

export function logoutAdmin(): Promise<{ authenticated: false }> {
  return request('/admin/auth/logout', { method: 'POST', body: '{}' });
}

export function fetchAdminCmsContent(): Promise<{ documents: CmsDocuments }> {
  return request('/admin/content');
}

export function saveAdminCmsDocument(key: CmsDocumentKey, document: unknown): Promise<{ saved: true; key: CmsDocumentKey }> {
  return request(`/admin/content/${encodeURIComponent(key)}`, {
    method: 'PUT',
    body: JSON.stringify(document),
  });
}

export function saveAdminCmsDocuments(documents: Partial<Record<CmsDocumentKey, unknown>>): Promise<{ saved: true; keys: CmsDocumentKey[] }> {
  return request('/admin/content', {
    method: 'PUT',
    body: JSON.stringify({ documents }),
  });
}
