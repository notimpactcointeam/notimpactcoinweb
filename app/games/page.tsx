'use client'

import { useState, useEffect } from 'react'
import Layout from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Dices, Grid, Type, Calculator, MousePointer } from 'lucide-react'
import { Progress } from "@/components/ui/progress"

interface Game {
  id: number
  title: string
  description: string
  icon: React.ElementType
  href: string
  progress: number
}

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([
    {
      id: 1,
      title: "Spin Game",
      description: "Spin the wheel to win prizes",
      icon: Dices,
      href: "/games/spin",
      progress: 0
    },
    {
      id: 2,
      title: "Block Puzzle",
      description: "Arrange blocks to clear lines",
      icon: Grid,
      href: "/games/puzzle",
      progress: 0
    },
    {
      id: 3,
      title: "Crossword",
      description: "Test your vocabulary",
      icon: Type,
      href: "/games/crossword",
      progress: 0
    },
    {
      id: 4,
      title: "2048",
      description: "Merge tiles to reach 2048",
      icon: Calculator,
      href: "/games/2048",
      progress: 0
    },
    {
      id: 5,
      title: "Clicker",
      description: "Click to earn points",
      icon: MousePointer,
      href: "/games/clicker",
      progress: 0
    }
  ])

  useEffect(() => {
    // In a real app, we would fetch the user's game progress from an API
  }, [])

  return (
    <Layout>
      <div className="grid gap-4">
        <h1 className="text-2xl font-bold">Games</h1>
        {games.map((game) => (
          <Link key={game.id} href={game.href}>
            <Card className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700 transition-colors">
              <CardHeader className="flex flex-row items-center gap-4">
                <game.icon className="w-8 h-8 text-blue-400" />
                <div className="flex-1">
                  <CardTitle>{game.title}</CardTitle>
                  <CardDescription className="text-zinc-400">{game.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={game.progress} className="h-2" />
                <p className="text-right text-sm text-zinc-400 mt-1">{game.progress}% Complete</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

