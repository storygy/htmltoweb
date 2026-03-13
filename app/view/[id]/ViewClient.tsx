'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { App } from '@/lib/types'

interface ViewClientProps {
  appId: string
}

export function ViewClient({ appId }: ViewClientProps) {
  const [app, setApp] = useState<App | null>(null)
  const [htmlUrl, setHtmlUrl] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const [isWechat, setIsWechat] = useState(false)

  useEffect(() => {
    // Detect WeChat browser
    const ua = navigator.userAgent.toLowerCase()
    setIsWechat(ua.indexOf('micromessenger') > -1)

    // Fetch app data
    const fetchApp = async () => {
      const { data, error } = await supabase
        .from('apps')
        .select('*')
        .eq('id', appId)
        .single()

      if (error || !data) {
        setError('应用不存在或已被删除')
        setLoading(false)
        return
      }

      setApp(data)

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('user-apps')
        .getPublicUrl(data.storage_path)

      setHtmlUrl(urlData.publicUrl)
      setLoading(false)
    }

    fetchApp()
  }, [appId])

  // WeChat browser detection and guidance
  if (isWechat) {
    return (
      <div className="min-h-screen bg-white">
        {/* WeChat Guide */}
        <div className="fixed inset-0 bg-white flex items-center justify-center p-8 z-50">
          <div className="text-center">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              请在外部浏览器中打开
            </h2>
            <p className="text-gray-600 mb-6">
              点击右上角 <span className="text-primary-500 font-medium">···</span> 菜单，选择 <span className="text-primary-500 font-medium">在浏览器中打开</span>
            </p>
            <div className="bg-gray-50 rounded-lg p-4 text-left max-w-xs mx-auto">
              <p className="text-sm text-gray-600 mb-2">复制链接：</p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={typeof window !== 'undefined' ? window.location.href : ''}
                  className="flex-1 text-xs bg-white border rounded px-2 py-1"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href)
                    alert('链接已复制')
                  }}
                  className="text-xs bg-primary-500 text-white px-3 py-1 rounded"
                >
                  复制
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">出错了</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Full Screen Iframe */}
      <iframe
        src={htmlUrl}
        className="w-full h-screen border-none"
        title={app?.title || '应用'}
        sandbox="allow-same-origin allow-scripts allow-top-navigation allow-forms"
      />
    </div>
  )
}
