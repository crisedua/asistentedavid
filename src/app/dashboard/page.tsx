'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const todayHabits = [
  { id: 1, name: '2 porciones de fruta', completed: true, type: 'nutrition' },
  { id: 2, name: 'Caminar 30 minutos', completed: false, type: 'exercise' },
  { id: 3, name: 'Respiración 5 min', completed: true, type: 'mental' },
  { id: 4, name: 'Dormir 7-8 horas', completed: false, type: 'sleep' },
  { id: 5, name: 'Hidratación 8 vasos', completed: false, type: 'nutrition' }
]

const progressData = [
  { day: 'L', score: 450 },
  { day: 'M', score: 465 },
  { day: 'X', score: 470 },
  { day: 'J', score: 485 },
  { day: 'V', score: 490 },
  { day: 'S', score: 475 },
  { day: 'D', score: 475 }
]

export default function Dashboard() {
  const [habits, setHabits] = useState(todayHabits)
  const currentScore = 475
  const streak = 4
  const monthlyImprovement = 12

  const toggleHabit = (habitId: number) => {
    setHabits(habits.map(habit => 
      habit.id === habitId 
        ? { ...habit, completed: !habit.completed }
        : habit
    ))
  }

  const completedCount = habits.filter(h => h.completed).length
  const progressPercent = (completedCount / habits.length) * 100

  const getHabitIcon = (type: string) => {
    switch (type) {
      case 'nutrition':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        )
      case 'exercise':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
          </svg>
        )
      case 'mental':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.663 17h4.673a1.001 1.001 0 00.728-1.686l-.755-.755A11.95 11.95 0 006.25 10.75a.75.75 0 00-1.5 0 8.45 8.45 0 012.838 4.339A9.963 9.963 0 004 16.187V17a1 1 0 001 1h4.663z" clipRule="evenodd" />
            <path d="M6.25 6a2.25 2.25 0 104.5 0 2.25 2.25 0 00-4.5 0z" />
          </svg>
        )
      case 'sleep':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Hola, Alejandro
              </h1>
              <p className="text-sm text-gray-600">
                {new Date().toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-600">{currentScore}</div>
              <p className="text-xs text-gray-500">Capital de Salud</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Today's habits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Hoy</h2>
            <div className="text-sm text-gray-600">
              {completedCount}/{habits.length}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-primary-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </div>
          </div>

          {/* Habits list */}
          <div className="space-y-3">
            {habits.map((habit, index) => (
              <motion.div
                key={habit.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                onClick={() => toggleHabit(habit.id)}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center transition-colors duration-200 ${
                    habit.completed 
                      ? 'bg-primary-600 border-primary-600' 
                      : 'border-gray-300 hover:border-primary-300'
                  }`}>
                    {habit.completed && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="flex items-center">
                    <div className={`mr-3 ${habit.completed ? 'text-primary-600' : 'text-gray-400'}`}>
                      {getHabitIcon(habit.type)}
                    </div>
                    <span className={`font-medium ${habit.completed ? 'text-gray-900' : 'text-gray-700'}`}>
                      {habit.name}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Streak */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card"
        >
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-2xl">🔥</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Racha activa: {streak} días
              </h3>
              <p className="text-sm text-gray-600">¡Sigue así!</p>
            </div>
          </div>
        </motion.div>

        {/* Progress chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Progreso</h3>
            <div className="text-sm text-green-600 font-medium">
              +{monthlyImprovement} pts este mes
            </div>
          </div>

          {/* Mini chart */}
          <div className="flex items-end justify-between h-20 bg-gray-50 rounded-xl p-3">
            {progressData.map((point, index) => (
              <div key={point.day} className="flex flex-col items-center">
                <motion.div
                  className="bg-primary-600 rounded-t-sm mb-2"
                  style={{ width: '12px' }}
                  initial={{ height: 0 }}
                  animate={{ height: `${(point.score / 500) * 60}px` }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                />
                <span className="text-xs text-gray-600">{point.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Rewards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="card"
        >
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">Recompensas</h3>
              <p className="text-sm text-gray-600">
                Ganas 1 medalla al completar 7 días seguidos
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-2 gap-4"
        >
          <Link
            href="/plan"
            className="btn-secondary text-center"
          >
            Ver plan
          </Link>
          <Link
            href="/challenges"
            className="btn-secondary text-center"
          >
            Unirme a un reto
          </Link>
        </motion.div>
      </div>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex justify-around">
            <Link href="/dashboard" className="flex flex-col items-center space-y-1 text-primary-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span className="text-xs">Inicio</span>
            </Link>
            <Link href="/plan" className="flex flex-col items-center space-y-1 text-gray-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3h4v1a1 1 0 102 0V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm8 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              <span className="text-xs">Plan</span>
            </Link>
            <Link href="/achievements" className="flex flex-col items-center space-y-1 text-gray-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-xs">Logros</span>
            </Link>
            <Link href="/profile" className="flex flex-col items-center space-y-1 text-gray-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span className="text-xs">Perfil</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
