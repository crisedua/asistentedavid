'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

const plans = [
  {
    id: 'light',
    name: 'Plan Ligero',
    duration: '15-20 min/día',
    description: 'Pequeños cambios sostenibles.',
    habits: [
      '2 porciones de fruta al día',
      '3 caminatas por semana',
      'Respiración 5 min/día',
      'Dormir 7-8 horas'
    ],
    color: 'green',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    id: 'medium',
    name: 'Plan Medio',
    duration: '30-40 min/día',
    description: 'Más estructura y reto moderado.',
    habits: [
      '4 porciones de frutas/verduras',
      'Ejercicio 4 veces por semana',
      'Meditación 10 min/día',
      'Rutina de sueño establecida'
    ],
    color: 'blue',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    )
  },
  {
    id: 'intense',
    name: 'Plan Intenso',
    duration: '60+ min/día',
    description: 'Transformación acelerada y supervisión.',
    habits: [
      'Plan nutricional completo',
      'Ejercicio 6 veces por semana',
      'Mindfulness 20 min/día',
      'Tracking completo de métricas'
    ],
    color: 'purple',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
      </svg>
    )
  }
]

export default function PlanSelection() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSelectPlan = async (planId: string) => {
    setSelectedPlan(planId)
    setLoading(true)
    
    // Simulate plan setup
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Redirect to dashboard
    router.push('/dashboard')
  }

  const getColorClasses = (color: string, isSelected: boolean) => {
    const baseClasses = 'transition-all duration-300'
    
    if (isSelected) {
      switch (color) {
        case 'green':
          return `${baseClasses} border-green-500 bg-green-50 shadow-green-200`
        case 'blue':
          return `${baseClasses} border-blue-500 bg-blue-50 shadow-blue-200`
        case 'purple':
          return `${baseClasses} border-purple-500 bg-purple-50 shadow-purple-200`
        default:
          return `${baseClasses} border-gray-300 bg-white`
      }
    }
    
    return `${baseClasses} border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg`
  }

  const getIconColorClasses = (color: string, isSelected: boolean) => {
    if (isSelected) {
      switch (color) {
        case 'green':
          return 'text-green-600 bg-green-100'
        case 'blue':
          return 'text-blue-600 bg-blue-100'
        case 'purple':
          return 'text-purple-600 bg-purple-100'
        default:
          return 'text-gray-600 bg-gray-100'
      }
    }
    return 'text-gray-400 bg-gray-100'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Elige tu plan
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Selecciona la intensidad que mejor se adapte a tu estilo de vida
          </p>
        </motion.div>

        {/* Plan cards */}
        <div className="space-y-4 mb-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`border-2 rounded-2xl p-6 cursor-pointer shadow-lg ${getColorClasses(plan.color, selectedPlan === plan.id)}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${getIconColorClasses(plan.color, selectedPlan === plan.id)}`}>
                    {plan.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                    <p className="text-sm text-gray-600">{plan.duration}</p>
                  </div>
                </div>
                
                {selectedPlan === plan.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                )}
              </div>

              <p className="text-gray-700 mb-4 font-medium">{plan.description}</p>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Hábitos incluidos:</h4>
                <ul className="space-y-1">
                  {plan.habits.map((habit, habitIndex) => (
                    <li key={habitIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></div>
                      {habit}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button
            onClick={() => selectedPlan && handleSelectPlan(selectedPlan)}
            disabled={!selectedPlan || loading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Configurando tu plan...
              </div>
            ) : (
              'Elegir este plan'
            )}
          </button>
          
          {!selectedPlan && (
            <p className="text-center text-sm text-gray-500 mt-3">
              Selecciona un plan para continuar
            </p>
          )}
        </motion.div>
      </div>
    </div>
  )
}
