'use client'

import { useState, useEffect } from 'react'
import Layout from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Gift, Zap, CheckCircle } from 'lucide-react'
import { useBalance } from '@/hooks/useBalance'

interface EarnOption {
  id: number
  title: string
  reward: number
  cooldown: number
  streak: number
}

export default function EarnPage() {
  const { balance, updateBalance } = useBalance()
  const [earnedToday, setEarnedToday] = useState(0)
  const dailyGoal = 1000
  const [earnOptions, setEarnOptions] = useState<EarnOption[]>([
    { id: 1, title: "Watch Ads", reward: 10, cooldown: 0, streak: 0 },
    { id: 2, title: "Complete Surveys", reward: 50, cooldown: 0, streak: 0 },
    { id: 3, title: "Invite Friends", reward: 100, cooldown: 0, streak: 0 },
  ])

  useEffect(() => {
    const timer = setInterval(() => {
      setEarnOptions(prev => prev.map(option => ({
        ...option,
        cooldown: Math.max(0, option.cooldown - 1)
      })))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleEarn = (id: number) => {
    const option = earnOptions.find(o => o.id === id)
    if (option) {
      const streakBonus = Math.floor(option.streak / 5) * 5 // 5% bonus for every 5 streak
      const totalReward = option.reward * (1 + streakBonus / 100)
      updateBalance(totalReward)
      setEarnedToday(prev => Math.min(prev + totalReward, dailyGoal))
      setEarnOptions(prev => prev.map(o => 
        o.id === id ? { ...o, cooldown: 60, streak: o.streak + 1 } : o
      ))
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Earn Coins</h1>

        <Card className="bg-[#2B2E33] border-[#3A3D42]">
          <CardHeader>
            <CardTitle>Daily Progress</CardTitle>
            <CardDescription>
              {earnedToday.toFixed(2)} / {dailyGoal} coins earned today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={(earnedToday / dailyGoal) * 100} className="h-2" />
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {earnOptions.map(option => (
            <Card key={option.id} className="bg-[#2B2E33] border-[#3A3D42]">
              <CardHeader>
                <CardTitle>{option.title}</CardTitle>
                <CardDescription>Earn {option.reward} coins (Streak: {option.streak})</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-[#F6C343] text-black hover:bg-[#F6C343]/80"
                  disabled={option.cooldown > 0}
                  onClick={() => handleEarn(option.id)}
                >
                  {option.cooldown > 0 ? `Cooldown: ${option.cooldown}s` : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Earn Now
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-[#F6C343] to-[#F6C343]/80 border-0">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5" />
              <CardTitle>Daily Check-in</CardTitle>
            </div>
            <CardDescription className="text-black/80">
              Come back every day for bonus coins!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-black/20 hover:bg-black/30 backdrop-blur text-white">
              <CheckCircle className="w-4 h-4 mr-2" />
              Checked In
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

