'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const getStrengths = (score: number) => {
  // Simulate different strengths based on score
  if (score >= 700) {
    return ['Sueño', 'Actividad física', 'Bienestar mental']
  } else if (score >= 500) {
    return ['Sueño', 'Controles preventivos']
  } else {
    return ['Controles preventivos']
  }
}

const getOpportunities = (score: number) => {
  // Simulate different opportunities based on score
  if (score >= 700) {
    return ['Alimentación']
  } else if (score >= 500) {
    return ['Alimentación', 'Actividad física']
  } else {
    return ['Alimentación', 'Estrés', 'Actividad física']
  }
}

export default function SurveyResults() {
  const searchParams = useSearchParams()
  const [score, setScore] = useState(0)
  const [displayScore, setDisplayScore] = useState(0)

  useEffect(() => {
    const scoreParam = searchParams.get('score')
    const finalScore = scoreParam ? parseInt(scoreParam) : 475
    setScore(finalScore)
    
    // Animate score counter
    let current = 0
    const increment = finalScore / 50
    const timer = setInterval(() => {
      current += increment
      if (current >= finalScore) {
        setDisplayScore(finalScore)
        clearInterval(timer)
      } else {
        setDisplayScore(Math.floor(current))
      }
    }, 30)

    return () => clearInterval(timer)
  }, [searchParams])

  const strengths = getStrengths(score)
  const opportunities = getOpportunities(score)

  const getScoreColor = (score: number) => {
    if (score >= 850) return 'text-purple-600'
    if (score >= 700) return 'text-yellow-600'
    if (score >= 500) return 'text-blue-600'
    return 'text-green-600'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 850) return 'Platino'
    if (score >= 700) return 'Oro'
    if (score >= 500) return 'Plata'
    return 'Bronce'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 mx-auto mb-4 bg-primary-600 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tu capital de salud inicial
          </h1>
        </motion.div>

        {/* Score display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8 text-center"
        >
          <div className="mb-4">
            <div className={`text-6xl font-bold ${getScoreColor(score)} mb-2`}>
              {displayScore}
            </div>
            <div className="text-2xl text-gray-400 font-semibold">
              / 1000
            </div>
          </div>
          
          <div className={`inline-flex items-center px-4 py-2 rounded-full ${
            score >= 850 ? 'bg-purple-100 text-purple-800' :
            score >= 700 ? 'bg-yellow-100 text-yellow-800' :
            score >= 500 ? 'bg-blue-100 text-blue-800' :
            'bg-green-100 text-green-800'
          }`}>
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Nivel {getScoreLabel(score)}
          </div>
        </motion.div>

        {/* Strengths and Opportunities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-6 mb-8"
        >
          {/* Strengths */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Fortalezas</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {strengths.map((strength) => (
                <span key={strength} className="chip chip-success">
                  {strength}
                </span>
              ))}
            </div>
          </div>

          {/* Opportunities */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Oportunidades de mejora</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {opportunities.map((opportunity) => (
                <span key={opportunity} className="chip chip-warning">
                  {opportunity}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <p className="text-gray-700 text-center leading-relaxed">
            Este puntaje es tu punto de partida. Te proponemos un plan simple y progresivo.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Link
            href="/plan-selection"
            className="w-full btn-primary block text-center"
          >
            Crear mi plan personalizado
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
