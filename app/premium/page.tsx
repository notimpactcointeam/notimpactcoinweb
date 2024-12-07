'use client'

import { useState, useEffect } from 'react'
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Crown, Check } from 'lucide-react'

export default function PremiumPage() {
  const [isPremium, setIsPremium] = useState(false)

  useEffect(() => {
    const premiumStatus = localStorage.getItem('premiumStatus')
    setIsPremium(premiumStatus === 'true')
  }, [])

  const premiumFeatures = [
    "2x earning rate on all activities",
    "Ad-free experience",
    "Exclusive premium-only tasks",
    "Priority support",
    "Early access to new features"
  ]

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Crown className="w-6 h-6 text-[#F6C343]" />
          Premium Features
        </h1>

        <Card className="bg-gradient-to-r from-[#F6C343] to-[#F6C343]/80 border-0">
          <CardHeader>
            <CardTitle className="text-black">Upgrade to Premium</CardTitle>
            <CardDescription className="text-black/80">
              Unlock exclusive benefits and boost your earnings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 mb-4">
              {premiumFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-black">
                  <Check className="w-4 h-4" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button 
              className="w-full bg-black/20 hover:bg-black/30 backdrop-blur text-white"
              disabled={isPremium}
            >
              {isPremium ? 'Already Premium' : 'Upgrade Now'}
            </Button>
          </CardContent>
        </Card>

        {isPremium && (
          <Card className="bg-[#2B2E33] border-[#3A3D42]">
            <CardHeader>
              <CardTitle>Your Premium Benefits</CardTitle>
              <CardDescription>Enjoy these exclusive features</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {premiumFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-[#F6C343]">
                    <Check className="w-4 h-4" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  )
}

