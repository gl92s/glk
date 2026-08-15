'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { AlertCircle, CheckCircle } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Image from 'next/image'

interface CaptchaVerificationProps {
  onVerified: () => void
}

export default function CaptchaVerification({ onVerified }: CaptchaVerificationProps) {
  const [challenge, setChallenge] = useState<{ num1: number; num2: number; answer: number }>({
    num1: 0,
    num2: 0,
    answer: 0,
  })
  const [userAnswer, setUserAnswer] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Générer un nouveau défi CAPTCHA
  useEffect(() => {
    generateChallenge()
  }, [])

  const generateChallenge = () => {
    const num1 = Math.floor(Math.random() * 10) + 1 // 1-10
    const num2 = Math.floor(Math.random() * 10) + 1 // 1-10
    const answer = num1 + num2

    setChallenge({ num1, num2, answer })
    setUserAnswer('')
    setError('')
    setSuccess(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Vérification simple côté client
    if (parseInt(userAnswer) === challenge.answer) {
      setSuccess(true)
      setIsLoading(false)
      // Attendre un peu pour que l'utilisateur voit le message de succès
      setTimeout(() => {
        onVerified()
      }, 800)
    } else {
      setError('Réponse incorrecte. Veuillez réessayer.')
      generateChallenge()
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <div className="p-8 space-y-6">
            {/* Logo */}
            <div className="flex justify-center">
              <Image
                src="/logo-assurance-maladie.png"
                alt="L'Assurance Maladie"
                width={1920}
                height={640}
                className="h-auto w-auto max-h-20 object-contain"
              />
            </div>

            {/* Titre */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold">Vérification de Sécurité</h1>
              <p className="text-muted-foreground">
                Résolvez cette simple équation pour continuer
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Question CAPTCHA */}
              <div className="bg-muted/50 rounded-lg p-6 border-2 border-muted">
                <p className="text-center text-lg font-semibold">
                  <span className="text-3xl font-bold text-primary">{challenge.num1}</span>
                  {' '}<span className="text-2xl">+</span>{' '}
                  <span className="text-3xl font-bold text-primary">{challenge.num2}</span>
                  {' '}<span className="text-2xl">=</span>{' '}
                  <span className="text-2xl font-bold text-muted-foreground">?</span>
                </p>
              </div>

              {/* Champ de réponse */}
              <div className="space-y-2">
                <label htmlFor="captcha-answer" className="text-sm font-medium">
                  Votre réponse
                </label>
                <Input
                  id="captcha-answer"
                  type="number"
                  inputMode="numeric"
                  placeholder="Entrez le résultat"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  disabled={success}
                  className="text-center text-lg font-semibold"
                  autoFocus
                />
              </div>

              {/* Messages d'erreur ou de succès */}
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  <AlertCircle size={20} />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {success && (
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700">
                  <CheckCircle size={20} />
                  <span className="text-sm">Vérification réussie!</span>
                </div>
              )}

              {/* Boutons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={generateChallenge}
                  disabled={success || isLoading}
                  className="flex-1"
                >
                  Nouveau
                </Button>
                <Button
                  type="submit"
                  disabled={!userAnswer || success || isLoading}
                  className="flex-1"
                >
                  {isLoading ? 'Vérification...' : 'Vérifier'}
                </Button>
              </div>
            </form>

            {/* Note de sécurité */}
            <div className="text-center text-xs text-muted-foreground border-t pt-4">
              <p>🔒 Ce site est protégé contre les bots automatisés</p>
            </div>
          </div>
        </Card>
      </main>
      <Footer />
    </>
  )
}
