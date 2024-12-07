'use client'

import { useState, useEffect } from 'react'
import Layout from "@/components/layout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Crown, Gift, Settings, Share, Copy } from 'lucide-react'
import { useBalance } from '@/hooks/useBalance'
// import { useReferral } from '@/hooks/useReferral'

export default function ProfilePage() {
  const { balance } = useBalance()
  const [referralCode, setReferralCode] = useState('')
  const [referredUsers, setReferredUsers] = useState<string[]>([])
  const [rank, setRank] = useState(15300000)

  useEffect(() => {
    // In a real app, we would fetch the user's rank from an API
    setRank(15300000)
    // Generate or retrieve referral code
    const storedCode = localStorage.getItem('referralCode')
    if (storedCode) {
      setReferralCode(storedCode)
    } else {
      const newCode = Math.random().toString(36).substring(2, 8).toUpperCase()
      setReferralCode(newCode)
      localStorage.setItem('referralCode', newCode)
    }

    // Retrieve referred users
    const storedReferredUsers = localStorage.getItem('referredUsers')
    if (storedReferredUsers) {
      setReferredUsers(JSON.parse(storedReferredUsers))
    }
  }, [])

  const copyReferralLink = () => {
    navigator.clipboard.writeText(`https://t.me/YourBotName?start=${referralCode}`)
    // You might want to show a toast or some feedback here
  }

  const shareReferralLink = () => {
    // Implement sharing functionality, e.g., open a share dialog or copy to clipboard
    if (navigator.share) {
      navigator.share({
        title: 'Join me on NotImpC App!',
        text: 'Use my referral link to join and earn coins!',
        url: `https://t.me/YourBotName?start=${referralCode}`
      })
    } else {
      copyReferralLink()
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="flex items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">Username</h1>
            <p className="text-[#8E8E93]">Joined 2 months ago</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-[#2B2E33] border-[#3A3D42]">
            <CardHeader>
              <CardTitle className="text-[#F6C343]">{balance.toFixed(2)}</CardTitle>
              <CardDescription>Balance</CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-[#2B2E33] border-[#3A3D42]">
            <CardHeader>
              <CardTitle>#{rank.toLocaleString()}</CardTitle>
              <CardDescription>Rank</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Premium */}
        <Card className="bg-gradient-to-r from-[#F6C343] to-[#F6C343]/80 border-0">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5" />
              <CardTitle>Premium Status</CardTitle>
            </div>
            <CardDescription className="text-black/80">
              Unlock exclusive features and boost your earnings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-black/20 hover:bg-black/30 backdrop-blur text-white">
              Upgrade to Premium
            </Button>
          </CardContent>
        </Card>

        {/* Referral Program */}
        <Card className="bg-[#2B2E33] border-[#3A3D42]">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5" />
              <CardTitle>Referral Program</CardTitle>
            </div>
            <CardDescription>
              Invite friends and earn 10% of their earnings!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Input value={`https://t.me/YourBotName?start=${referralCode}`} readOnly className="bg-[#3A3D42] border-[#4A4D52]" />
              <Button onClick={copyReferralLink} variant="outline" size="icon">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-[#8E8E93]">Referred Users: {referredUsers.length}</p>
            <Button className="w-full bg-[#F6C343] text-black hover:bg-[#F6C343]/80" onClick={shareReferralLink}>
              <Share className="w-4 h-4 mr-2" />
              Share Referral Link
            </Button>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start gap-2 text-[#8E8E93] border-[#3A3D42]">
            <Settings className="w-4 h-4" />
            Settings
          </Button>
        </div>
      </div>
    </Layout>
  )
}

