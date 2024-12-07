'use client'

import { useState } from 'react'
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useBalance } from '@/hooks/useBalance'

export default function SpinGame() {
  const { balance, updateBalance } = useBalance()
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState<number | null>(null)

  const spinWheel = () => {
    if (balance < 10) return
    setSpinning(true)
    updateBalance(-10) // Cost to spin
    setTimeout(() => {
      const winAmount = Math.floor(Math.random() * 50) + 1 // Win 1-50 coins
      setResult(winAmount)
      updateBalance(winAmount)
      setSpinning(false)
    }, 2000)
  }

  return (
    <Layout>
      <Card className="bg-zinc-800 border-zinc-700">
        <CardHeader>
          <CardTitle className="text-center">Spin Game</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center text-4xl font-bold">
            {spinning ? 'Spinning...' : result !== null ? `You won ${result} coins!` : 'Spin to win!'}
          </div>
          <Button 
            onClick={spinWheel} 
            disabled={spinning || balance < 10}
            className="w-full h-16 text-xl"
          >
            Spin (Cost: 10 coins)
          </Button>
        </CardContent>
      </Card>
    </Layout>
  )
}

