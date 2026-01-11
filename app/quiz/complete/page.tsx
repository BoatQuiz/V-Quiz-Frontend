'use client'
import { PrimaryButton } from '@/app/components/ui/buttons/PrimaryButton'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function CompletePage() {
    const router = useRouter();
    const handleStart = () => {
        router.push("/quiz")
    }
  return (
    <div>CompletePage
        <PrimaryButton onClick={handleStart}>Back to game</PrimaryButton>
    </div>
  )
}
