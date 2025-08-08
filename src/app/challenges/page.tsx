'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const challenges = [
  {
    id: 1,
    title: '10,000 pasos por 5 días',
    description: 'Camina al menos 10,000 pasos cada día durante 5 días consecutivos',
    participants: 24,
    duration: 5,
    currentDay: 3,
    status: 'active', // active, completed, available
    type: 'team',
    difficulty: 'medium',
    reward: 'Medalla de Caminante',
    endDate: '2024-01-20',
    icon: '🚶‍♂️',
    leaderboard: [
      { name: 'María S.', steps: 12450, position: 1 },
      { name: 'Juan P.', steps: 11200, position: 2 },
      { name: 'Tú', steps: 10800, position: 3 }
    ]
  },
  {
    id: 2,
    title: 'Hidratación perfecta',
    description: '8 vasos de agua diarios por una semana',
    participants: 15,
    duration: 7,
    currentDay: 0,
    status: 'available',
    type: 'individual',
    difficulty: 'easy',
    reward: '50 puntos bonus',
    startDate: '2024-01-22',
    icon: '💧'
  },
  {
    id: 3,
    title: 'Desconexión digital',
    description: 'Sin pantallas 1 hora antes de dormir',
    participants: 8,
    duration: 14,
    currentDay: 14,
    status: 'completed',
    type: 'team',
    difficulty: 'hard',
    reward: 'Insignia Zen',
    completedDate: '2024-01-10',
    icon: '📵'
  },
  {
    id: 4,
    title: 'Comida casera',
    description: 'Prepara todas tus comidas en casa',
    participants: 12,
    duration: 10,
    currentDay: 0,
    status: 'available',
    type: 'individual',
    difficulty: 'medium',
    reward: 'Recetas premium',
    startDate: '2024-01-25',
    icon: '🍳'
  }
]

export default function Challenges() {
  const [filter, setFilter] = useState<'all' | 'active' | 'available' | 'completed'>('all')
  const [selectedChallenge, setSelectedChallenge] = useState<number | null>(null)

  const filteredChallenges = challenges.filter(challenge => {
    if (filter === 'all') return true
    return challenge.status === filter
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Fácil'
      case 'medium': return 'Medio'
      case 'hard': return 'Difícil'
      default: return difficulty
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'border-blue-500 bg-blue-50'
      case 'completed': return 'border-green-500 bg-green-50'
      case 'available': return 'border-gray-200 bg-white'
      default: return 'border-gray-200 bg-white'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-800">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">Retos</h1>
            <button className="text-primary-600 hover:text-primary-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-3 gap-4 mb-6"
        >
          <div className="card text-center">
            <div className="text-2xl font-bold text-blue-600">1</div>
            <p className="text-xs text-gray-600">Activo</p>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-green-600">1</div>
            <p className="text-xs text-gray-600">Completado</p>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-orange-600">2</div>
            <p className="text-xs text-gray-600">Disponibles</p>
          </div>
        </motion.div>

        {/* Filter buttons */}
        <div className="flex space-x-2 mb-6 overflow-x-auto">
          {[
            { key: 'all', label: 'Todos' },
            { key: 'active', label: 'Activos' },
            { key: 'available', label: 'Disponibles' },
            { key: 'completed', label: 'Completados' }
          ].map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key as any)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                filter === filterOption.key
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {filterOption.label}
            </button>
          ))}
        </div>

        {/* Challenges list */}
        <div className="space-y-4">
          {filteredChallenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`p-4 rounded-2xl border-2 transition-all duration-200 ${getStatusColor(challenge.status)}`}
              onClick={() => setSelectedChallenge(selectedChallenge === challenge.id ? null : challenge.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start">
                  <div className="text-2xl mr-3">{challenge.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {challenge.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {challenge.description}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className={`chip text-xs ${getDifficultyColor(challenge.difficulty)}`}>
                        {getDifficultyLabel(challenge.difficulty)}
                      </span>
                      <span className="chip chip-info text-xs">
                        {challenge.type === 'team' ? 'Equipo' : 'Individual'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm text-gray-600 mb-1">
                    {challenge.participants} participantes
                  </div>
                  {challenge.status === 'active' && (
                    <div className="text-xs text-blue-600 font-medium">
                      Día {challenge.currentDay}/{challenge.duration}
                    </div>
                  )}
                </div>
              </div>

              {/* Progress bar for active challenges */}
              {challenge.status === 'active' && (
                <div className="mb-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(challenge.currentDay / challenge.duration) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Expanded content */}
              {selectedChallenge === challenge.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 pt-4 border-t border-gray-200"
                >
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-900">Recompensa:</span>
                      <span className="text-sm text-green-600 font-medium">{challenge.reward}</span>
                    </div>
                    
                    {challenge.endDate && (
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-900">Termina:</span>
                        <span className="text-sm text-gray-600">
                          {new Date(challenge.endDate).toLocaleDateString('es-ES')}
                        </span>
                      </div>
                    )}

                    {challenge.startDate && challenge.status === 'available' && (
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-900">Inicia:</span>
                        <span className="text-sm text-gray-600">
                          {new Date(challenge.startDate).toLocaleDateString('es-ES')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Leaderboard for active team challenges */}
                  {challenge.status === 'active' && challenge.leaderboard && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Top 3:</h4>
                      <div className="space-y-2">
                        {challenge.leaderboard.map((entry, idx) => (
                          <div key={idx} className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-2 ${
                                entry.position === 1 ? 'bg-yellow-100 text-yellow-800' :
                                entry.position === 2 ? 'bg-gray-100 text-gray-800' :
                                'bg-amber-100 text-amber-800'
                              }`}>
                                {entry.position}
                              </span>
                              <span className={entry.name === 'Tú' ? 'font-semibold text-primary-600' : ''}>
                                {entry.name}
                              </span>
                            </div>
                            <span className="text-gray-600">{entry.steps.toLocaleString()} pasos</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action button */}
                  <div>
                    {challenge.status === 'available' && (
                      <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                        Unirme al reto
                      </button>
                    )}
                    
                    {challenge.status === 'active' && (
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                        Ver progreso detallado
                      </button>
                    )}

                    {challenge.status === 'completed' && (
                      <div className="text-center py-2">
                        <span className="inline-flex items-center text-green-600 font-medium">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Completado
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Create challenge button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6"
        >
          <button className="w-full bg-white border-2 border-dashed border-gray-300 hover:border-primary-300 text-gray-600 hover:text-primary-600 font-medium py-4 px-4 rounded-2xl transition-colors duration-200">
            + Crear nuevo reto
          </button>
        </motion.div>
      </div>
    </div>
  )
}
