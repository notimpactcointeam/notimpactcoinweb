import { useState, useEffect } from 'react'

export function useBalance() {
  const [balance, setBalance] = useState(0.0)

  useEffect(() => {
    const storedBalance = localStorage.getItem('userBalance')
    if (storedBalance) {
      setBalance(parseFloat(storedBalance))
    }
  }, [])

  const updateBalance = (amount: number) => {
    const newBalance = Math.max(0, balance + amount)
    setBalance(parseFloat(newBalance.toFixed(2)))
    localStorage.setItem('userBalance', newBalance.toString())
  }

  return { balance, updateBalance }
}

