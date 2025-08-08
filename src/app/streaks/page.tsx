'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const streaks = [
  {
    id: 1,
    name: 'Hidratación',
    description: 'Beber 8 vasos de agua',
    currentStreak: 5,
    bestStreak: 12,
    status: 'active', // active, paused, lost
    icon: '💧',
    color: 'blue'
  },
  {
    id: 2,
    name: 'Ejercicio',
    description: 'Actividad física 30+ min',
    currentStreak: 0,
    bestStreak: 8,
    status: 'lost',
    icon: '🏃‍♂️',
    color: 'green',
    canRestart: true
  },
  {
    id: 3,
    name: 'Meditación',
    description: 'Respiración consciente 5 min',
    currentStreak: 3,
    bestStreak: 7,
    status: 'active',
    icon: '🧘‍♀️',
    color: 'purple'
  },
  {
    id: 4,
    name: 'Sueño',
    description: 'Dormir 7-8 horas',
    currentStreak: 2,
    bestStreak: 15,
    status: 'paused',
    icon: '😴',
    color: 'indigo',
    pauseReason: 'Viaje de trabajo'
  },
  {
    id: 5,
    name: 'Alimentación',
    description: '5 porciones frutas/verduras',
    currentStreak: 7,
    bestStreak: 7,
    status: 'active',
    icon: '🥗',
    color: 'emerald'
  }
]

export default function Streaks() {
  const [selectedStreak, setSelectedStreak] = useState<number | null>(null)

  const getStatusColor = (status: string, color: string) => {
    switch (status) {
      case 'active':
        return {
          bg: `bg-${color}-50`,
          border: `border-${color}-200`,
          text: `text-${color}-800`,
          ring: `bg-${color}-500`
        }
      case 'paused':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'text-yellow-800',
          ring: 'bg-yellow-500'
        }
      case 'lost':
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          text: 'text-gray-600',
          ring: 'bg-gray-400'
        }
      default:
        return {
          bg: 'bg-white',
          border: 'border-gray-200',
          text: 'text-gray-900',
          ring: 'bg-gray-400'
        }
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Activa'
      case 'paused': return 'Pausada'
      case 'lost': return 'Perdida'
      default: return ''
    }
  }

  const activeStreaks = streaks.filter(s => s.status === 'active')
  const totalDays = activeStreaks.reduce((sum, s) => sum + s.currentStreak, 0)

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
            <h1 className="text-xl font-semibold text-gray-900">Rachas</h1>
            <div className="w-6"></div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card mb-6"
        >
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="text-4xl mr-2">🔥</div>
              <div>
                <div className="text-3xl font-bold text-orange-600">{totalDays}</div>
                <p className="text-sm text-gray-600">días activos</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <div className="text-center">
                <div className="text-lg font-semibold text-green-600">{activeStreaks.length}</div>
                <p className="text-xs text-gray-600">Rachas activas</p>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-blue-600">
                  {Math.max(...streaks.map(s => s.bestStreak))}
                </div>
                <p className="text-xs text-gray-600">Mejor racha</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Streaks list */}
        <div className="space-y-4">
          {streaks.map((streak, index) => {
            const colors = getStatusColor(streak.status, streak.color)
            
            return (
              <motion.div
                key={streak.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`p-4 rounded-2xl border-2 transition-all duration-200 ${colors.bg} ${colors.border}`}
                onClick={() => setSelectedStreak(selectedStreak === streak.id ? null : streak.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">{streak.icon}</div>
                    <div>
                      <h3 className={`font-semibold ${colors.text}`}>
                        {streak.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {streak.description}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center justify-end mb-1">
                      <div className={`w-2 h-2 rounded-full mr-2 ${colors.ring}`}></div>
                      <span className="text-xs font-medium text-gray-600">
                        {getStatusLabel(streak.status)}
                      </span>
                    </div>
                    <div className={`text-xl font-bold ${colors.text}`}>
                      {streak.currentStreak}
                    </div>
                    <p className="text-xs text-gray-600">días</p>
                  </div>
                </div>

                {/* Expanded content */}
                {selectedStreak === streak.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-gray-200"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-gray-600">Mejor racha:</span>
                      <span className="font-semibold text-gray-900">{streak.bestStreak} días</span>
                    </div>

                    {streak.status === 'paused' && streak.pauseReason && (
                      <div className="mb-3">
                        <span className="text-sm text-gray-600">Motivo de pausa:</span>
                        <p className="text-sm font-medium text-yellow-700">{streak.pauseReason}</p>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex space-x-2">
                      {streak.status === 'lost' && streak.canRestart && (
                        <button className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                          Reiniciar mañana
                        </button>
                      )}
                      
                      {streak.status === 'active' && (
                        <button className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                          Pausar temporalmente
                        </button>
                      )}

                      {streak.status === 'paused' && (
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                          Reanudar
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-2xl"
        >
          <div className="flex items-start">
            <div className="text-blue-600 mr-3">💡</div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Consejos para mantener rachas</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Empieza con metas pequeñas y realistas</li>
                <li>• Usa recordatorios en tu teléfono</li>
                <li>• Celebra cada hito alcanzado</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
