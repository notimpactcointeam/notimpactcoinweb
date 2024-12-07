'use client'

import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Layout from "@/components/layout"
import { useBalance } from '@/hooks/useBalance'

interface User {
  id: number
  name: string
  score: number
  avatar: string
}

export default function HomePage() {
  const [topUsers, setTopUsers] = useState<User[]>([])
  const [userRank, setUserRank] = useState(0)
  const { balance } = useBalance()

  useEffect(() => {
    fetchTopUsers()
  }, [])

  const fetchTopUsers = async () => {
    // In a real app, this would be an API call
    const users: User[] = [
      { id: 1, name: 'metasalience', score: 315800000, avatar: '/placeholder.svg' },
      { id: 2, name: 'mr_wcoin', score: 302600000, avatar: '/placeholder.svg' },
      { id: 3, name: 'winkobet', score: 248200000, avatar: '/placeholder.svg' },
      { id: 4, name: 'XXBFX', score: 224100000, avatar: '/placeholder.svg' },
      { id: 5, name: 'xaffizmedia', score: 220900000, avatar: '/placeholder.svg' },
      { id: 6, name: 'bulkmine', score: 175600000, avatar: '/placeholder.svg' },
      { id: 7, name: 'mathewngyuennn', score: 175400000, avatar: '/placeholder.svg' },
    ]
    setTopUsers(users)
    setUserRank(15300000)
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Top 3 Users */}
        <div className="flex justify-between items-end px-8 pt-4">
          {topUsers.slice(0, 3).map((user, index) => (
            <div key={user.id} className={`flex flex-col items-center ${index === 1 ? '-mt-4' : ''}`}>
              <Avatar className={`${index === 1 ? 'w-20 h-20' : 'w-16 h-16'} border-2 ${index === 1 ? 'border-yellow-400' : 'border-zinc-600'}`}>
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{index + 1}</AvatarFallback>
              </Avatar>
              <span className="mt-2 font-semibold">{user.name}</span>
              <span className="text-yellow-400 text-sm">{(user.score / 1000000).toFixed(1)}M</span>
            </div>
          ))}
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-zinc-800 rounded-lg p-3">
            <div className="text-yellow-400 text-sm">Your Balance</div>
            <div className="font-semibold">{balance.toLocaleString()}</div>
          </div>
          <div className="bg-zinc-800 rounded-lg p-3">
            <div className="text-zinc-400 text-sm">Your Rank</div>
            <div className="font-semibold">#{userRank.toLocaleString()}</div>
          </div>
          <div className="bg-zinc-800 rounded-lg p-3">
            <div className="text-blue-400 text-sm">Free rating</div>
            <div className="font-semibold">★ 0</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
            Boost Your Rank
          </Button>
          <Button variant="outline" className="w-full border-blue-500 text-blue-500 hover:bg-blue-500/10">
            Join Squad
          </Button>
        </div>

        {/* Top Users List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Top Users</h2>
          <div className="space-y-3">
            {topUsers.slice(3).map((user, index) => (
              <div key={user.id} className="flex items-center justify-between bg-zinc-800/50 p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{index + 4}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{user.name}</span>
                </div>
                <div className="text-yellow-400">{(user.score / 1000000).toFixed(1)}M</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

