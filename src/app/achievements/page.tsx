'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const achievements = [
  {
    id: 1,
    title: '7 días de constancia',
    description: 'Completa tus hábitos por 7 días seguidos',
    icon: '🔥',
    unlocked: true,
    progress: 7,
    total: 7,
    unlockedDate: '2024-01-15'
  },
  {
    id: 2,
    title: 'Primer paso',
    description: 'Completa tu primer día de hábitos',
    icon: '👟',
    unlocked: true,
    progress: 1,
    total: 1,
    unlockedDate: '2024-01-08'
  },
  {
    id: 3,
    title: '3 semanas sin azúcar',
    description: 'Evita azúcar añadida por 21 días',
    icon: '🍎',
    unlocked: false,
    progress: 12,
    total: 21
  },
  {
    id: 4,
    title: 'Dormir como un bebé',
    description: 'Duerme 7+ horas por 10 días consecutivos',
    icon: '😴',
    unlocked: false,
    progress: 4,
    total: 10
  },
  {
    id: 5,
    title: '500 puntos de salud',
    description: 'Alcanza 500 puntos de capital de salud',
    icon: '💪',
    unlocked: false,
    progress: 475,
    total: 500
  },
  {
    id: 6,
    title: 'Atleta de fin de semana',
    description: 'Ejercítate 4 fines de semana seguidos',
    icon: '🏃‍♂️',
    unlocked: false,
    progress: 1,
    total: 4
  },
  {
    id: 7,
    title: 'Zen master',
    description: 'Medita por 30 días consecutivos',
    icon: '🧘‍♀️',
    unlocked: false,
    progress: 0,
    total: 30
  },
  {
    id: 8,
    title: 'Hidratación perfecta',
    description: 'Bebe 8 vasos de agua por 14 días',
    icon: '💧',
    unlocked: false,
    progress: 5,
    total: 14
  }
]

const levels = [
  { name: 'Bronce', min: 0, max: 499, color: 'amber' },
  { name: 'Plata', min: 500, max: 699, color: 'gray' },
  { name: 'Oro', min: 700, max: 849, color: 'yellow' },
  { name: 'Platino', min: 850, max: 1000, color: 'purple' }
]

export default function Achievements() {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all')
  const currentScore = 475
  const currentLevel = levels.find(level => currentScore >= level.min && currentScore <= level.max)
  const nextLevel = levels.find(level => level.min > currentScore)
  
  const filteredAchievements = achievements.filter(achievement => {
    if (filter === 'unlocked') return achievement.unlocked
    if (filter === 'locked') return !achievement.unlocked
    return true
  })

  const unlockedCount = achievements.filter(a => a.unlocked).length
  const progressToNext = nextLevel ? ((currentScore - currentLevel!.min) / (nextLevel.min - currentLevel!.min)) * 100 : 100

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
            <h1 className="text-xl font-semibold text-gray-900">Logros</h1>
            <div className="w-6"></div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Level progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Nivel {currentLevel?.name}
              </h2>
              <p className="text-sm text-gray-600">{currentScore} puntos</p>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              currentLevel?.color === 'amber' ? 'bg-amber-100 text-amber-600' :
              currentLevel?.color === 'gray' ? 'bg-gray-100 text-gray-600' :
              currentLevel?.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
              'bg-purple-100 text-purple-600'
            }`}>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {nextLevel && (
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progreso a {nextLevel.name}</span>
                <span>{nextLevel.min - currentScore} pts restantes</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-primary-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressToNext}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
          )}
        </motion.div>

        {/* Achievement stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card mb-6"
        >
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">{unlockedCount}</div>
              <p className="text-sm text-gray-600">Desbloqueados</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">{achievements.length - unlockedCount}</div>
              <p className="text-sm text-gray-600">Por desbloquear</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{Math.round((unlockedCount / achievements.length) * 100)}%</div>
              <p className="text-sm text-gray-600">Completado</p>
            </div>
          </div>
        </motion.div>

        {/* Filter buttons */}
        <div className="flex space-x-2 mb-6">
          {[
            { key: 'all', label: 'Todos' },
            { key: 'unlocked', label: 'Desbloqueados' },
            { key: 'locked', label: 'Bloqueados' }
          ].map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key as any)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 ${
                filter === filterOption.key
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {filterOption.label}
            </button>
          ))}
        </div>

        {/* Achievements grid */}
        <div className="grid grid-cols-2 gap-4">
          {filteredAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                achievement.unlocked
                  ? 'bg-white border-primary-200 shadow-lg'
                  : 'bg-gray-100 border-gray-200'
              }`}
            >
              <div className="text-center">
                <div className={`text-3xl mb-2 ${achievement.unlocked ? 'grayscale-0' : 'grayscale'}`}>
                  {achievement.icon}
                </div>
                <h3 className={`font-semibold text-sm mb-1 ${
                  achievement.unlocked ? 'text-gray-900' : 'text-gray-600'
                }`}>
                  {achievement.title}
                </h3>
                <p className={`text-xs mb-3 ${
                  achievement.unlocked ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {achievement.description}
                </p>

                {achievement.unlocked ? (
                  <div className="flex items-center justify-center">
                    <span className="chip chip-success text-xs">Completado</span>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>{achievement.progress}</span>
                      <span>{achievement.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-primary-600 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {achievement.unlocked && achievement.unlockedDate && (
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(achievement.unlockedDate).toLocaleDateString('es-ES')}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
