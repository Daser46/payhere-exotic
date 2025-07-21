// utils/wishlist.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

interface WishlistItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  productId: string
}

export const getOrCreateAnonymousUser = async (email: string) => {
  // Check if user exists
  const { data: existingUser } = await supabase
    .from('anonymous_users')
    .select('id')
    .eq('email', email)
    .single()
    
  if (existingUser) return existingUser.id
  
  // Create new anonymous user
  const { data: newUser } = await supabase
    .from('anonymous_users')
    .insert([{ email }])
    .select('id')
    .single()
    
  return newUser?.id
}

export const addToWishlist = async (email: string, item: Omit<WishlistItem, 'id'>) => {
  const userId = await getOrCreateAnonymousUser(email)
  
  const { data, error } = await supabase
    .from('wishlist_items')
    .upsert({
      user_id: userId,
      product_id: item.productId,
      product_data: item,
      original_price: item.originalPrice || item.price
    })
    .select()
    
  if (error) throw error
  return data
}

export const removeFromWishlist = async (email: string, productId: string) => {
  const userId = await getOrCreateAnonymousUser(email)
  
  const { error } = await supabase
    .from('wishlist_items')
    .delete()
    .eq('user_id', userId)
    .eq('product_id', productId)
    
  if (error) throw error
}

export const getWishlist = async (email: string) => {
  const userId = await getOrCreateAnonymousUser(email)
  
  const { data, error } = await supabase
    .from('wishlist_items')
    .select('product_data')
    .eq('user_id', userId)
    
  if (error) throw error
  return data?.map(item => item.product_data) as WishlistItem[] || []
}