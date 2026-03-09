/**
 * ERP & E-commerce Sync Dashboard
 * 
 * Admin page for managing Visma → Shopify → Payload sync operations.
 */

'use client'

import { useState, useEffect } from 'react'

type SyncStatus = {
  provider: string
  connected: boolean
  organizations?: Array<{
    tenantId: string
    tenantName: string
    connected: boolean
  }>
}

type SyncJobStatus = {
  status: string
  message?: string
  timestamp?: string
}

export default function SyncDashboardPage() {
  const [vismaStatus, setVismaStatus] = useState<SyncStatus | null>(null)
  const [shopifyStatus, setShopifyStatus] = useState<any>(null)
  const [syncing, setSyncing] = useState(false)
  const [lastSync, setLastSync] = useState<SyncJobStatus | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStatus()
  }, [])

  async function loadStatus() {
    setLoading(true)
    try {
      // Get Visma status
      const vismaRes = await fetch('/api/sync/visma')
      if (vismaRes.ok) {
        const vismaData = await vismaRes.json()
        setVismaStatus(vismaData)
      }

      // Get Shopify status
      const shopifyRes = await fetch('/api/sync/shopify')
      if (shopifyRes.ok) {
        const shopifyData = await shopifyRes.json()
        setShopifyStatus(shopifyData)
      }
    } catch (error) {
      console.error('Failed to load sync status:', error)
    } finally {
      setLoading(false)
    }
  }

  async function triggerVismaSync() {
    if (syncing) return
    setSyncing(true)
    try {
      const res = await fetch('/api/sync/visma', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      
      const data = await res.json()
      setLastSync({
        status: data.success ? 'success' : 'error',
        message: data.message || data.error,
        timestamp: new Date().toISOString(),
      })
      
      // Reload status after sync
      setTimeout(loadStatus, 2000)
    } catch (error) {
      setLastSync({
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      })
    } finally {
      setSyncing(false)
    }
  }

  async function triggerShopifySync() {
    if (syncing) return
    setSyncing(true)
    try {
      const res = await fetch('/api/sync/shopify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SYNC_SECRET || ''}`,
        },
      })
      
      const data = await res.json()
      setLastSync({
        status: data.success ? 'success' : 'error',
        message: `Synced ${data.created} new, ${data.updated} updated products`,
        timestamp: new Date().toISOString(),
      })
      
      // Reload status after sync
      setTimeout(loadStatus, 2000)
    } catch (error) {
      setLastSync({
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      })
    } finally {
      setSyncing(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Sync Dashboard</h1>
        <p className="text-gray-600">Loading status...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Sync Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Visma Status Card */}
        <div className="border rounded-lg p-6 bg-white shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Visma ERP</h2>
            {vismaStatus?.connected ? (
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Connected
              </span>
            ) : (
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                Disconnected
              </span>
            )}
          </div>
          
          {vismaStatus?.organizations && vismaStatus.organizations.length > 0 ? (
            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-600">Organizations:</p>
              {vismaStatus.organizations.map((org) => (
                <div key={org.tenantId} className="text-sm pl-2 border-l-2 border-blue-500">
                  {org.tenantName || org.tenantId}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-600 mb-4">
              No organizations connected
            </p>
          )}
          
          <button
            onClick={triggerVismaSync}
            disabled={syncing || !vismaStatus?.connected}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {syncing ? 'Syncing...' : 'Sync from Visma'}
          </button>
        </div>

        {/* Shopify Status Card */}
        <div className="border rounded-lg p-6 bg-white shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Shopify</h2>
            {shopifyStatus?.lastSync ? (
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Synced
              </span>
            ) : (
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                Not Synced
              </span>
            )}
          </div>
          
          {shopifyStatus?.lastSync && (
            <p className="text-sm text-gray-600 mb-2">
              Last sync: {new Date(shopifyStatus.lastSync).toLocaleString()}
            </p>
          )}
          
          {shopifyStatus?.totalProducts !== undefined && (
            <p className="text-sm text-gray-600 mb-4">
              Products: {shopifyStatus.totalProducts}
            </p>
          )}
          
          <button
            onClick={triggerShopifySync}
            disabled={syncing}
            className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {syncing ? 'Syncing...' : 'Sync from Shopify'}
          </button>
        </div>
      </div>

      {/* Last Sync Result */}
      {lastSync && (
        <div className={`mt-6 p-4 rounded-lg ${
          lastSync.status === 'success' 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          <h3 className="font-semibold mb-2">
            {lastSync.status === 'success' ? '✓ Sync Complete' : '✗ Sync Failed'}
          </h3>
          <p className="text-sm">{lastSync.message}</p>
          {lastSync.timestamp && (
            <p className="text-xs text-gray-500 mt-1">
              {new Date(lastSync.timestamp).toLocaleString()}
            </p>
          )}
        </div>
      )}

      {/* Integration Flow Diagram */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-4">Integration Flow</h3>
        <div className="flex items-center justify-center gap-4 text-sm">
          <div className="px-4 py-2 bg-blue-100 rounded">Visma ERP</div>
          <span>→</span>
          <div className="px-4 py-2 bg-purple-100 rounded">Shopify</div>
          <span>→</span>
          <div className="px-4 py-2 bg-green-100 rounded">Payload CMS</div>
          <span>→</span>
          <div className="px-4 py-2 bg-gray-200 rounded">Web Frontend</div>
        </div>
        <p className="text-xs text-gray-600 mt-4 text-center">
          Products flow from Visma (master) → Shopify (e-commerce) → Payload (content) → Website
        </p>
      </div>
    </div>
  )
}
