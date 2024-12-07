'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Bolt, Trophy, GamepadIcon, User, ListTodo, ShoppingBag, HelpCircle } from 'lucide-react'
import { useBalance } from '@/hooks/useBalance'
import { useEffect } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { balance, updateBalance } = useBalance()

  useEffect(() => {
    // Daily check-in bonus
    const lastCheckIn = localStorage.getItem('lastCheckIn')
    const today = new Date().toDateString()
    if (lastCheckIn !== today) {
      updateBalance(10) // 10 coins daily bonus
      localStorage.setItem('lastCheckIn', today)
    }
  }, [updateBalance])

  return (
    <div className="flex flex-col min-h-screen bg-[#17181C] text-white">
      <header className="fixed top-0 left-0 right-0 bg-[#17181C] border-b border-[#2B2E33] p-4 z-10">
        <div className="container max-w-md mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-[#F6C343]">★</span>
            <span>{balance.toFixed(2)}</span>
          </div>
          <Link href="/help" className="text-[#8E8E93]">
            <HelpCircle size={20} />
          </Link>
        </div>
      </header>

      <main className="flex-1 container max-w-md mx-auto p-4 pt-20">
        {children}
      </main>
      
      <nav className="sticky bottom-0 w-full bg-[#17181C] border-t border-[#2B2E33]">
        <div className="container max-w-md mx-auto px-4">
          <div className="flex justify-between items-center py-2">
            <Link 
              href="/earn" 
              className={`flex flex-col items-center p-2 ${pathname === '/earn' ? 'text-[#F6C343]' : 'text-[#8E8E93]'}`}
            >
              <Bolt size={20} />
              <span className="text-xs">Earn</span>
            </Link>
            <Link 
              href="/games" 
              className={`flex flex-col items-center p-2 ${pathname === '/games' ? 'text-[#F6C343]' : 'text-[#8E8E93]'}`}
            >
              <GamepadIcon size={20} />
              <span className="text-xs">Games</span>
            </Link>
            <Link 
              href="/" 
              className={`flex flex-col items-center p-2 ${pathname === '/' ? 'text-[#F6C343]' : 'text-[#8E8E93]'}`}
            >
              <Trophy size={20} />
              <span className="text-xs">Top</span>
            </Link>
            <Link 
              href="/tasks" 
              className={`flex flex-col items-center p-2 ${pathname === '/tasks' ? 'text-[#F6C343]' : 'text-[#8E8E93]'}`}
            >
              <ListTodo size={20} />
              <span className="text-xs">Tasks</span>
            </Link>
            <Link 
              href="/store" 
              className={`flex flex-col items-center p-2 ${pathname === '/store' ? 'text-[#F6C343]' : 'text-[#8E8E93]'}`}
            >
              <ShoppingBag size={20} />
              <span className="text-xs">Store</span>
            </Link>
            <Link 
              href="/profile" 
              className={`flex flex-col items-center p-2 ${pathname === '/profile' ? 'text-[#F6C343]' : 'text-[#8E8E93]'}`}
            >
              <User size={20} />
              <span className="text-xs">Profile</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

