import { useState, useEffect } from 'react'

export function useReferral() {
  const [referralCode, setReferralCode] = useState('')
  const [referredUsers, setReferredUsers] = useState<string[]>([])

  useEffect(() => {
    const storedCode = localStorage.getItem('referralCode')
    if (storedCode) {
      setReferralCode(storedCode)
    } else {
      const newCode = generateReferralCode()
      setReferralCode(newCode)
      localStorage.setItem('referralCode', newCode)
    }

    const storedReferredUsers = localStorage.getItem('referredUsers')
    if (storedReferredUsers) {
      setReferredUsers(JSON.parse(storedReferredUsers))
    }
  }, [])

  const generateReferralCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase()
  }

  const addReferredUser = (userId: string) => {
    setReferredUsers(prev => {
      const newReferredUsers = [...prev, userId]
      localStorage.setItem('referredUsers', JSON.stringify(newReferredUsers))
      return newReferredUsers
    })
  }

  return { referralCode, referredUsers, addReferredUser }
}

