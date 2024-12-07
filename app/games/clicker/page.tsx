'use client'

import { useState, useEffect } from 'react'
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useBalance } from '@/hooks/useBalance'

export default function ClickerGame() {
  const { updateBalance } = useBalance()
  const [score, setScore] = useState(0.0)
  const [clickMultiplier, setClickMultiplier] = useState(1.0)
  const [passiveIncome, setPassiveIncome] = useState(0.0)

  useEffect(() => {
    const storedMultiplier = localStorage.getItem('clickMultiplier')
    if (storedMultiplier) {
      setClickMultiplier(parseFloat(storedMultiplier))
    }

    const storedPassiveIncome = localStorage.getItem('passiveIncome')
    if (storedPassiveIncome) {
      setPassiveIncome(parseFloat(storedPassiveIncome))
    }

    const timer = setInterval(() => {
      if (passiveIncome > 0) {
        setScore(prevScore => prevScore + passiveIncome)
        updateBalance(passiveIncome)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [passiveIncome, updateBalance])

  const handleClick = () => {
    const increment = clickMultiplier
    setScore(prevScore => prevScore + increment)
    updateBalance(increment)
  }

  useEffect(() => {
    localStorage.setItem('clickMultiplier', clickMultiplier.toString())
    localStorage.setItem('passiveIncome', passiveIncome.toString())
  }, [clickMultiplier, passiveIncome])

  return (
    <Layout>
      <Card className="bg-[#2B2E33] border-[#3A3D42]">
        <CardHeader>
          <CardTitle className="text-center">Clicker Game</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center text-4xl font-bold">{score.toFixed(2)}</div>
          <Button 
            onClick={handleClick}
            className="w-full h-32 text-xl bg-[#F6C343] text-black hover:bg-[#F6C343]/80"
          >
            Click Me! (+{clickMultiplier.toFixed(2)})
          </Button>
          <div className="text-center text-sm text-[#8E8E93]">
            Passive Income: {passiveIncome.toFixed(2)} per second
          </div>
        </CardContent>
      </Card>
    </Layout>
  )
}

