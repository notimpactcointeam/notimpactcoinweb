'use client'

import { useState, useEffect } from 'react'
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useBalance } from '@/hooks/useBalance'

const GRID_SIZE = 4

export default function Game2048() {
  const { updateBalance } = useBalance()
  const [grid, setGrid] = useState<number[][]>(Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0)))
  const [score, setScore] = useState(0)

  useEffect(() => {
    addNewTile()
    addNewTile()
  }, [])

  const addNewTile = () => {
    const emptyTiles = []
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (grid[i][j] === 0) {
          emptyTiles.push({ i, j })
        }
      }
    }
    if (emptyTiles.length > 0) {
      const { i, j } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)]
      const newGrid = [...grid]
      newGrid[i][j] = Math.random() < 0.9 ? 2 : 4
      setGrid(newGrid)
    }
  }

  const move = (direction: 'up' | 'down' | 'left' | 'right') => {
    let newGrid = [...grid]
    let moved = false
    let newScore = score

    // Implement move logic here
    // This is a simplified version, you'd need to implement the full 2048 logic

    if (moved) {
      addNewTile()
      setScore(newScore)
      updateBalance(newScore - score)
    }
  }

  return (
    <Layout>
      <Card className="bg-zinc-800 border-zinc-700">
        <CardHeader>
          <CardTitle className="text-center">2048</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">Score: {score}</div>
          <div className="grid grid-cols-4 gap-2">
            {grid.map((row, i) =>
              row.map((cell, j) => (
                <div 
                  key={`${i}-${j}`}
                  className="w-16 h-16 flex items-center justify-center text-2xl font-bold bg-zinc-700 rounded"
                >
                  {cell !== 0 && cell}
                </div>
              ))
            )}
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Button onClick={() => move('up')}>Up</Button>
            <Button onClick={() => move('left')}>Left</Button>
            <Button onClick={() => move('right')}>Right</Button>
            <div></div>
            <Button onClick={() => move('down')}>Down</Button>
          </div>
        </CardContent>
      </Card>
    </Layout>
  )
}

