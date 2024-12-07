'use client'

import { useState, useEffect } from 'react'
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useBalance } from '@/hooks/useBalance'

interface Question {
  question: string
  options: string[]
  correctAnswer: number
}

const questions: Question[] = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correctAnswer: 2
  }
]

export default function TriviaGame() {
  const { updateBalance } = useBalance()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const handleAnswer = (selectedAnswer: number) => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
      updateBalance(10) // 10 coins for correct answer
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setGameOver(true)
    }
  }

  const restartGame = () => {
    setCurrentQuestion(0)
    setScore(0)
    setGameOver(false)
  }

  return (
    <Layout>
      <Card className="bg-[#2B2E33] border-[#3A3D42]">
        <CardHeader>
          <CardTitle className="text-center">Trivia Game</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!gameOver ? (
            <>
              <div className="text-center text-lg mb-4">{questions[currentQuestion].question}</div>
              <div className="grid gap-2">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="w-full bg-[#F6C343] text-black hover:bg-[#F6C343]/80"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="text-2xl mb-4">Game Over!</div>
              <div className="text-lg mb-4">Your score: {score}/{questions.length}</div>
              <div className="text-lg mb-4">Coins earned: {score * 10}</div>
              <Button onClick={restartGame} className="bg-[#F6C343] text-black hover:bg-[#F6C343]/80">
                Play Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </Layout>
  )
}

