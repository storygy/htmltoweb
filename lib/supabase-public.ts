import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// 创建用于公开访问的 Supabase 客户端（不使用 localStorage，适合无痕浏览）
export const supabasePublic: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)
