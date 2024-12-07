'use client'

import { useState, useEffect } from 'react'
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useBalance } from '@/hooks/useBalance'
import { ShoppingCart, Zap, Star } from 'lucide-react'

interface StoreItem {
  id: string
  name: string
  description: string
  price: number
  effect: () => void
}

export default function StorePage() {
  const { balance, updateBalance } = useBalance()
  const [purchasedItems, setPurchasedItems] = useState<string[]>([])

  const storeItems: StoreItem[] = [
    {
      id: 'double_earnings',
      name: 'Double Earnings',
      description: 'Double your earnings from all activities for 24 hours',
      price: 1000,
      effect: () => {
        // Implement the double earnings effect
        localStorage.setItem('doubleEarnings', (Date.now() + 24 * 60 * 60 * 1000).toString())
      }
    },
    {
      id: 'extra_spin',
      name: 'Extra Spin',
      description: 'Get an extra spin in the Spin Game',
      price: 500,
      effect: () => {
        // Implement the extra spin effect
        const extraSpins = parseInt(localStorage.getItem('extraSpins') || '0')
        localStorage.setItem('extraSpins', (extraSpins + 1).toString())
      }
    },
    {
      id: 'premium_upgrade',
      name: 'Premium Upgrade',
      description: 'Upgrade to Premium status with exclusive benefits',
      price: 5000,
      effect: () => {
        // Implement the premium upgrade effect
        localStorage.setItem('premiumStatus', 'true')
      }
    }
  ]

  useEffect(() => {
    const storedPurchases = localStorage.getItem('purchasedItems')
    if (storedPurchases) {
      setPurchasedItems(JSON.parse(storedPurchases))
    }
  }, [])

  const handlePurchase = (item: StoreItem) => {
    if (balance >= item.price) {
      updateBalance(-item.price)
      item.effect()
      const newPurchasedItems = [...purchasedItems, item.id]
      setPurchasedItems(newPurchasedItems)
      localStorage.setItem('purchasedItems', JSON.stringify(newPurchasedItems))
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ShoppingCart className="w-6 h-6" />
          Store
        </h1>

        <div className="grid gap-4">
          {storeItems.map((item) => (
            <Card key={item.id} className="bg-[#2B2E33] border-[#3A3D42]">
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-[#F6C343]">{item.price} coins</span>
                  <Button
                    onClick={() => handlePurchase(item)}
                    disabled={balance < item.price || purchasedItems.includes(item.id)}
                    className="bg-[#F6C343] text-black hover:bg-[#F6C343]/80"
                  >
                    {purchasedItems.includes(item.id) ? 'Purchased' : 'Buy'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
}

