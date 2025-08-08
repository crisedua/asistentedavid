'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

const questions = [
  {
    id: 1,
    question: "En los últimos 14 días, ¿cuántos días realizaste al menos 30 minutos de actividad física moderada?",
    type: "select",
    options: [
      { value: 0, label: "0 días" },
      { value: 1, label: "1-2 días" },
      { value: 2, label: "3-4 días" },
      { value: 3, label: "5-6 días" },
      { value: 4, label: "7+ días" }
    ]
  },
  {
    id: 2,
    question: "¿Cuántas porciones de frutas/verduras consumes en un día promedio?",
    type: "select",
    options: [
      { value: 0, label: "0 porciones" },
      { value: 1, label: "1-2 porciones" },
      { value: 2, label: "3-4 porciones" },
      { value: 3, label: "5+ porciones" }
    ]
  },
  {
    id: 3,
    question: "Califica tu sueño promedio de la última semana.",
    type: "likert",
    options: [
      { value: 1, label: "Muy malo" },
      { value: 2, label: "Malo" },
      { value: 3, label: "Regular" },
      { value: 4, label: "Bueno" },
      { value: 5, label: "Muy bueno" }
    ]
  },
  {
    id: 4,
    question: "¿Fumas actualmente?",
    type: "select",
    options: [
      { value: 2, label: "No" },
      { value: 1, label: "Ocasional" },
      { value: 0, label: "Diario" }
    ]
  },
  {
    id: 5,
    question: "¿Con qué frecuencia consumes alcohol?",
    type: "select",
    options: [
      { value: 4, label: "Nunca" },
      { value: 3, label: "Mensual" },
      { value: 2, label: "Semanal" },
      { value: 1, label: "2-3 veces/semana" },
      { value: 0, label: "Diario" }
    ]
  },
  {
    id: 6,
    question: "OMS-5 Bienestar: 'Me he sentido alegre y de buen humor'.",
    type: "likert",
    options: [
      { value: 1, label: "Nunca" },
      { value: 2, label: "Rara vez" },
      { value: 3, label: "A veces" },
      { value: 4, label: "Frecuentemente" },
      { value: 5, label: "Siempre" }
    ]
  },
  {
    id: 7,
    question: "¿Tienes diagnóstico crónico activo?",
    type: "select",
    options: [
      { value: 2, label: "Ninguno" },
      { value: 1, label: "1 diagnóstico" },
      { value: 0, label: "2 o más" }
    ]
  },
  {
    id: 8,
    question: "¿Cuántas horas pasas sentado en un día laboral promedio?",
    type: "select",
    options: [
      { value: 3, label: "≤4 horas" },
      { value: 2, label: "5-7 horas" },
      { value: 1, label: "8-10 horas" },
      { value: 0, label: ">10 horas" }
    ]
  },
  {
    id: 9,
    question: "¿Cuántos días de la última semana sentiste estrés alto?",
    type: "select",
    options: [
      { value: 3, label: "0 días" },
      { value: 2, label: "1-2 días" },
      { value: 1, label: "3-4 días" },
      { value: 0, label: "5-7 días" }
    ]
  },
  {
    id: 10,
    question: "¿Te has realizado controles preventivos en el último año?",
    type: "yesno",
    options: [
      { value: 1, label: "Sí" },
      { value: 0, label: "No" }
    ]
  }
]

export default function Survey() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [loading, setLoading] = useState(false)

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers({ ...answers, [questionId]: value })
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      finishSurvey()
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const finishSurvey = async () => {
    setLoading(true)
    
    // Calculate score (simple sum for demo)
    const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0)
    const normalizedScore = Math.min(1000, (totalScore / 30) * 1000) // Normalize to max 1000
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Redirect to results with score
    router.push(`/survey/results?score=${Math.round(normalizedScore)}`)
  }

  const currentQ = questions[currentQuestion]
  const isAnswered = answers[currentQ.id] !== undefined
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Evaluación inicial
          </h1>
          <p className="text-gray-600">
            {currentQuestion + 1} de {questions.length} preguntas
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Tiempo estimado: 3-5 minutos
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progreso</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-primary-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6 mb-8"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-6 leading-relaxed">
              {currentQ.question}
            </h2>

            <div className="space-y-3">
              {currentQ.type === 'likert' ? (
                <div className="space-y-3">
                  {currentQ.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(currentQ.id, option.value)}
                      className={`w-full p-4 text-left rounded-xl border-2 transition-colors duration-200 ${
                        answers[currentQ.id] === option.value
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{option.label}</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`w-5 h-5 ${
                                star <= option.value
                                  ? 'text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {currentQ.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(currentQ.id, option.value)}
                      className={`w-full p-4 text-left rounded-xl border-2 transition-colors duration-200 ${
                        answers[currentQ.id] === option.value
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                          answers[currentQ.id] === option.value
                            ? 'border-primary-500 bg-primary-500'
                            : 'border-gray-300'
                        }`}>
                          {answers[currentQ.id] === option.value && (
                            <div className="w-full h-full rounded-full bg-white scale-50"></div>
                          )}
                        </div>
                        <span className="font-medium">{option.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevQuestion}
            className={`text-gray-600 hover:text-gray-800 transition-colors duration-200 ${
              currentQuestion === 0 ? 'invisible' : ''
            }`}
          >
            Anterior
          </button>

          <button
            onClick={() => {
              // Save progress to localStorage
              localStorage.setItem('surveyProgress', JSON.stringify({ currentQuestion, answers }))
            }}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            Guardar y continuar luego
          </button>

          <button
            onClick={nextQuestion}
            disabled={!isAnswered || loading}
            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : currentQuestion === questions.length - 1 ? (
              'Finalizar'
            ) : (
              'Siguiente'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
