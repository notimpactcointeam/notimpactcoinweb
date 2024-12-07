'use client'

import { useState, useEffect } from 'react'
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Check, Star } from 'lucide-react'
import { useBalance } from '@/hooks/useBalance'

interface Task {
  id: number
  title: string
  description: string
  reward: number
  progress: number
  completed: boolean
  type: 'daily' | 'in-app' | 'social'
}

export default function TasksPage() {
  const { updateBalance } = useBalance()
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Daily Login",
      description: "Login every day to earn rewards",
      reward: 100,
      progress: 100,
      completed: false,
      type: 'daily'
    },
    {
      id: 2,
      title: "Play 5 Games",
      description: "Play any 5 games",
      reward: 250,
      progress: 0,
      completed: false,
      type: 'in-app'
    },
    {
      id: 3,
      title: "Share on Telegram",
      description: "Share your progress on Telegram",
      reward: 150,
      progress: 0,
      completed: false,
      type: 'social'
    },
    {
      id: 4,
      title: "Join Official Group",
      description: "Join our official Telegram group",
      reward: 200,
      progress: 0,
      completed: false,
      type: 'social'
    },
    {
      id: 5,
      title: "Reach 1000 Coins",
      description: "Accumulate a balance of 1000 coins",
      reward: 500,
      progress: 0,
      completed: false,
      type: 'in-app'
    }
  ])

  useEffect(() => {
    // In a real app, we would fetch the user's tasks from an API
    // For now, we'll just set the daily login task to completed
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === 1 ? { ...task, progress: 100 } : task
      )
    )
  }, [])

  const handleClaim = (taskId: number) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, completed: true } : task
      )
    )
    const task = tasks.find(t => t.id === taskId)
    if (task) {
      updateBalance(task.reward)
    }
  }

  const handleSocialTask = (taskId: number) => {
    // Implement social task logic here
    // For example, open Telegram app or show share dialog
    console.log(`Handling social task ${taskId}`)
    // For demonstration, we'll just mark the task as completed
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, progress: 100, completed: true } : task
      )
    )
  }

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Daily Tasks</h1>
        <div className="grid gap-4">
          {tasks.map((task) => (
            <Card key={task.id} className="bg-[#2B2E33] border-[#3A3D42]">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{task.title}</CardTitle>
                    <CardDescription>{task.description}</CardDescription>
                  </div>
                  <div className="flex items-center gap-1 text-[#F6C343]">
                    <Star className="w-4 h-4" />
                    {task.reward}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Progress value={task.progress} className="h-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#8E8E93]">
                      {task.progress}% Complete
                    </span>
                    {task.completed ? (
                      <span className="flex items-center gap-1 text-green-400">
                        <Check className="w-4 h-4" />
                        Completed
                      </span>
                    ) : (
                      task.type === 'social' ? (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-[#F6C343] text-[#F6C343]"
                          onClick={() => handleSocialTask(task.id)}
                        >
                          Complete
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-[#F6C343] text-[#F6C343]"
                          onClick={() => handleClaim(task.id)}
                          disabled={task.progress < 100}
                        >
                          Claim
                        </Button>
                      )
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
}

