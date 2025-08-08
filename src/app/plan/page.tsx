'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const weekDays = [
  { day: 'Lun', date: '15', habits: [
    { name: '2 porciones de fruta', completed: true, type: 'nutrition' },
    { name: 'Caminar 30 min', completed: true, type: 'exercise' },
    { name: 'Respiración 5 min', completed: true, type: 'mental' },
    { name: 'Dormir 7-8h', completed: true, type: 'sleep' }
  ]},
  { day: 'Mar', date: '16', habits: [
    { name: '2 porciones de fruta', completed: true, type: 'nutrition' },
    { name: 'Caminar 30 min', completed: true, type: 'exercise' },
    { name: 'Respiración 5 min', completed: false, type: 'mental' },
    { name: 'Dormir 7-8h', completed: true, type: 'sleep' }
  ]},
  { day: 'Mié', date: '17', habits: [
    { name: '2 porciones de fruta', completed: true, type: 'nutrition' },
    { name: 'Caminar 30 min', completed: false, type: 'exercise' },
    { name: 'Respiración 5 min', completed: true, type: 'mental' },
    { name: 'Dormir 7-8h', completed: true, type: 'sleep' }
  ]},
  { day: 'Jue', date: '18', habits: [
    { name: '2 porciones de fruta', completed: true, type: 'nutrition' },
    { name: 'Caminar 30 min', completed: true, type: 'exercise' },
    { name: 'Respiración 5 min', completed: true, type: 'mental' },
    { name: 'Dormir 7-8h', completed: false, type: 'sleep' }
  ]},
  { day: 'Vie', date: '19', habits: [
    { name: '2 porciones de fruta', completed: false, type: 'nutrition' },
    { name: 'Caminar 30 min', completed: false, type: 'exercise' },
    { name: 'Respiración 5 min', completed: false, type: 'mental' },
    { name: 'Dormir 7-8h', completed: false, type: 'sleep' }
  ]},
  { day: 'Sáb', date: '20', habits: [
    { name: '2 porciones de fruta', completed: false, type: 'nutrition' },
    { name: 'Caminar 30 min', completed: false, type: 'exercise' },
    { name: 'Respiración 5 min', completed: false, type: 'mental' },
    { name: 'Dormir 7-8h', completed: false, type: 'sleep' }
  ]},
  { day: 'Dom', date: '21', habits: [
    { name: '2 porciones de fruta', completed: false, type: 'nutrition' },
    { name: 'Caminar 30 min', completed: false, type: 'exercise' },
    { name: 'Respiración 5 min', completed: false, type: 'mental' },
    { name: 'Dormir 7-8h', completed: false, type: 'sleep' }
  ]}
]

export default function Plan() {
  const searchParams = useSearchParams()
  const selectedLevel = searchParams.get('level') as 'light' | 'medium' | 'intense' | null
  const [activeTab, setActiveTab] = useState<'intro' | 'habits' | 'challenges' | 'schedule'>(selectedLevel ? 'intro' : 'habits')
  const [showEditModal, setShowEditModal] = useState(false)

  const effortLabel = useMemo(() => {
    switch (selectedLevel) {
      case 'light':
        return 'Ligero'
      case 'medium':
        return 'Medio'
      case 'intense':
        return 'Intenso'
      default:
        return null
    }
  }, [selectedLevel])

  const getHabitIcon = (type: string) => {
    switch (type) {
      case 'nutrition': return '🍎'
      case 'exercise': return '🏃‍♂️'
      case 'mental': return '🧘‍♀️'
      case 'sleep': return '😴'
      default: return '✓'
    }
  }

  const getCompletionRate = (habits: any[]) => {
    const completed = habits.filter(h => h.completed).length
    return (completed / habits.length) * 100
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-800">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">Mi Plan</h1>
            <button 
              onClick={() => setShowEditModal(true)}
              className="text-primary-600 hover:text-primary-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-xl">
          {[
            ...(effortLabel ? ([{ key: 'intro', label: 'Introducción' }] as const) : []),
            { key: 'habits', label: 'Hábitos' },
            { key: 'challenges', label: 'Retos' },
            { key: 'schedule', label: 'Agenda' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                activeTab === tab.key
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Intro Tab (shown after selecting plan level) */}
        {activeTab === 'intro' && effortLabel && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Tu plan está listo</h2>
              <p className="text-gray-700 mb-4">
                Con el nivel de esfuerzo que seleccionaste ({effortLabel}), hemos diseñado una propuesta equilibrada en tres áreas clave:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Actividad física para fortalecer tu cuerpo.</li>
                <li>Alimentación para nutrirlo de forma saludable.</li>
                <li>Sueño y descanso para recuperar energía y mejorar tu bienestar mental.</li>
              </ul>
            </div>

            <div className="card">
              <p className="text-gray-700">
                Estas son las rutinas que te recomendamos adoptar para alcanzar los resultados que buscas. Empieza hoy y observa cómo tu puntaje de Capital de Salud mejora semana a semana.
              </p>
              <div className="mt-4">
                <button
                  className="w-full btn-primary"
                  onClick={() => setActiveTab('habits')}
                >
                  Ver rutinas
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Habits Tab */}
        {activeTab === 'habits' && (
          <div className="space-y-4">
            {weekDays.map((dayData, index) => {
              const completionRate = getCompletionRate(dayData.habits)
              const isToday = index === 4 // Friday for demo
              
              return (
                <motion.div
                  key={dayData.day}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`card ${isToday ? 'ring-2 ring-primary-500 ring-opacity-50' : ''}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-3 ${
                        isToday ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        <div className="text-center">
                          <div className="text-xs font-medium">{dayData.day}</div>
                          <div className="text-sm font-bold">{dayData.date}</div>
                        </div>
                      </div>
                      {isToday && (
                        <span className="chip chip-info text-xs">Hoy</span>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900">
                        {Math.round(completionRate)}%
                      </div>
                      <div className="text-xs text-gray-600">completado</div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          completionRate === 100 ? 'bg-green-500' :
                          completionRate >= 75 ? 'bg-blue-500' :
                          completionRate >= 50 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${completionRate}%` }}
                      />
                    </div>
                  </div>

                  {/* Habits */}
                  <div className="grid grid-cols-2 gap-2">
                    {dayData.habits.map((habit, habitIndex) => (
                      <div
                        key={habitIndex}
                        className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                          habit.completed ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <span className="text-lg mr-2">{getHabitIcon(habit.type)}</span>
                        <span className={`text-xs font-medium ${
                          habit.completed ? 'text-green-800' : 'text-gray-600'
                        }`}>
                          {habit.name}
                        </span>
                        {habit.completed && (
                          <svg className="w-4 h-4 text-green-600 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}

        {/* Challenges Tab */}
        {activeTab === 'challenges' && (
          <div className="space-y-4">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Retos Activos</h3>
                <Link href="/challenges" className="text-primary-600 text-sm font-medium">
                  Ver todos
                </Link>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-xl mr-3">🚶‍♂️</span>
                    <div>
                      <div className="font-medium text-blue-900">10,000 pasos</div>
                      <div className="text-sm text-blue-700">Día 3 de 5</div>
                    </div>
                  </div>
                  <div className="text-sm text-blue-700 font-medium">60%</div>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Retos Recomendados</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-xl mr-3">💧</span>
                    <div>
                      <div className="font-medium text-gray-900">Hidratación</div>
                      <div className="text-sm text-gray-600">7 días</div>
                    </div>
                  </div>
                  <button className="text-primary-600 text-sm font-medium">Unirse</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className="space-y-4">
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Recordatorios de Hoy</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-xl mr-3">🍎</span>
                    <div>
                      <div className="font-medium text-yellow-900">Fruta de la mañana</div>
                      <div className="text-sm text-yellow-700">10:00 AM</div>
                    </div>
                  </div>
                  <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">Pendiente</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-xl mr-3">🏃‍♂️</span>
                    <div>
                      <div className="font-medium text-green-900">Caminar</div>
                      <div className="text-sm text-green-700">6:00 PM</div>
                    </div>
                  </div>
                  <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">Completado</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-sm w-full"
          >
            <h3 className="text-lg font-semibold mb-4">Editar Metas</h3>
            <p className="text-sm text-gray-600 mb-6">
              Ajusta tus objetivos diarios sin recalcular tu diagnóstico inicial.
            </p>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Porciones de fruta diarias
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-lg">
                  <option>1 porción</option>
                  <option selected>2 porciones</option>
                  <option>3 porciones</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minutos de ejercicio
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-lg">
                  <option>15 minutos</option>
                  <option selected>30 minutos</option>
                  <option>45 minutos</option>
                  <option>60 minutos</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 btn-secondary"
              >
                Cancelar
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 btn-primary"
              >
                Guardar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
