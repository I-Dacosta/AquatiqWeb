import type { RequestInit } from 'next/dist/server/web/spec-extension/request';

/**
 * Minimal client for talking to the Visma integration service.
 * Uses the Flask service at VISMA_SERVICE_URL and forwards requests for sync and status.
 */

const baseUrl = (process.env.VISMA_SERVICE_URL || 'http://localhost:5001').replace(/\/$/, '')
const serviceToken = process.env.VISMA_SERVICE_TOKEN

function authHeaders(): Record<string, string> {
  return serviceToken ? { Authorization: `Bearer ${serviceToken}` } : {}
}

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${baseUrl}${path}`
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  
  // Add auth headers if available
  const auth = authHeaders()
  Object.assign(headers, auth)
  
  // Merge init headers if provided
  if (init?.headers) {
    const initHeaders = new Headers(init.headers)
    initHeaders.forEach((value, key) => {
      headers[key] = value
    })
  }
  
  const res = await fetch(url, {
    cache: 'no-store',
    ...init,
    headers,
  })

  if (!res.ok) {
    const detail = await res.text()
    throw new Error(`Visma service request failed (${res.status}): ${detail}`)
  }

  return res.json() as Promise<T>
}

export type StartSyncParams = {
  tenantId: string
  entityTypes?: string[] | 'all'
  jobType?: 'full_sync' | 'incremental_sync'
  triggeredBy?: string
  batchSize?: number
}

export async function startVismaSync({
  tenantId,
  entityTypes = 'all',
  jobType = 'full_sync',
  triggeredBy = 'web-app',
  batchSize = 100,
}: StartSyncParams) {
  if (!tenantId) {
    throw new Error('tenantId is required to start a Visma sync job')
  }

  const body = {
    tenant_id: tenantId,
    entity_types: entityTypes,
    job_type: jobType,
    triggered_by_user: triggeredBy,
    batch_size: batchSize,
  }

  return fetchJson('/api/visma/sync/start', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export async function getVismaStatus(tenantId?: string) {
  const query = tenantId ? `?tenant_id=${encodeURIComponent(tenantId)}` : ''
  return fetchJson(`/api/visma/status${query}`)
}

export async function getSyncDashboard(tenantId?: string) {
  const query = tenantId ? `?tenant_id=${encodeURIComponent(tenantId)}` : ''
  return fetchJson(`/api/visma/sync/dashboard${query}`)
}

export async function listSyncJobs(params?: { status?: string; tenantId?: string; limit?: number }) {
  const query = new URLSearchParams()
  if (params?.status) query.set('status', params.status)
  if (params?.tenantId) query.set('tenant_id', params.tenantId)
  if (params?.limit) query.set('limit', String(params.limit))
  const suffix = query.toString() ? `?${query.toString()}` : ''
  return fetchJson(`/api/visma/sync/jobs${suffix}`)
}
