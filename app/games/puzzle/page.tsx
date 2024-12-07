'use client'

import { useState, useEffect } from 'react'
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useBalance } from '@/hooks/useBalance'

const GRID_SIZE = 4
const BLOCK_TYPES = ['I', 'L', 'T', 'O']

export default function PuzzleGame() {
  const { updateBalance } = useBalance()
  const [grid, setGrid] = useState<string[][]>(Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill('')))
  const [currentBlock, setCurrentBlock] = useState<string>('')
  const [score, setScore] = useState(0)

  useEffect(() => {
    generateNewBlock()
  }, [])

  const generateNewBlock = () => {
    setCurrentBlock(BLOCK_TYPES[Math.floor(Math.random() * BLOCK_TYPES.length)])
  }

  const placeBlock = (row: number, col: number) => {
    if (grid[row][col] !== '') return

    const newGrid = [...grid]
    newGrid[row][col] = currentBlock
    setGrid(newGrid)

    checkLines()
    generateNewBlock()
  }

  const checkLines = () => {
    let linesCleared = 0
    const newGrid = grid.map(row => {
      if (row.every(cell => cell !== '')) {
        linesCleared++
        return Array(GRID_SIZE).fill('')
      }
      return row
    })

    setGrid(newGrid)
    const points = linesCleared * 10
    setScore(prevScore => prevScore + points)
    updateBalance(points)
  }

  return (
    <Layout>
      <Card className="bg-zinc-800 border-zinc-700">
        <CardHeader>
          <CardTitle className="text-center">Block Puzzle</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">Score: {score}</div>
          <div className="grid grid-cols-4 gap-1">
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <Button
                  key={`${rowIndex}-${colIndex}`}
                  className="w-16 h-16 text-2xl"
                  variant={cell ? "default" : "outline"}
                  onClick={() => placeBlock(rowIndex, colIndex)}
                >
                  {cell}
                </Button>
              ))
            )}
          </div>
          <div className="text-center">
            Current Block: <span className="text-2xl font-bold">{currentBlock}</span>
          </div>
        </CardContent>
      </Card>
    </Layout>
  )
}

