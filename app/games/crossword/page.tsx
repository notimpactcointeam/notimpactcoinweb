'use client'

import { useState, useEffect } from 'react'
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useBalance } from '@/hooks/useBalance'

const WORDS = [
  { word: 'REACT', clue: 'A JavaScript library for building user interfaces' },
  { word: 'NEXT', clue: 'A React framework that enables server-side rendering' },
  { word: 'TYPESCRIPT', clue: 'A typed superset of JavaScript' },
  { word: 'TAILWIND', clue: 'A utility-first CSS framework' },
]

export default function CrosswordGame() {
  const { updateBalance } = useBalance()
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [guess, setGuess] = useState('')
  const [score, setScore] = useState(0)

  const currentWord = WORDS[currentWordIndex]

  const handleGuess = () => {
    if (guess.toUpperCase() === currentWord.word) {
      const points = currentWord.word.length * 10
      setScore(prevScore => prevScore + points)
      updateBalance(points)
      if (currentWordIndex < WORDS.length - 1) {
        setCurrentWordIndex(prevIndex => prevIndex + 1)
      } else {
        // Game completed
        updateBalance(score * 2) // Bonus for completing all words
      }
      setGuess('')
    } else {
      // Incorrect guess, maybe deduct points?
      setScore(prevScore => Math.max(0, prevScore - 5))
    }
  }

  return (
    <Layout>
      <Card className="bg-zinc-800 border-zinc-700">
        <CardHeader>
          <CardTitle className="text-center">Crossword Puzzle</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">Score: {score}</div>
          <div className="text-center text-xl font-bold">{currentWord.clue}</div>
          <Input 
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter your guess"
          />
          <Button onClick={handleGuess} className="w-full">
            Submit Guess
          </Button>
        </CardContent>
      </Card>
    </Layout>
  )
}

