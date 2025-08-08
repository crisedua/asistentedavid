'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Profile() {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)
  const [notifications, setNotifications] = useState({
    dailyReminders: true,
    motivationalPush: false,
    weeklyReports: true,
    challengeInvites: true
  })

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const userData = {
    name: 'Alejandro González',
    email: 'alejandro@email.com',
    company: 'Empresa A',
    userType: 'Activo',
    memberSince: '2024-01-08',
    currentScore: 475
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
            <h1 className="text-xl font-semibold text-gray-900">Perfil</h1>
            <div className="w-6"></div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* User info card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card mb-6"
        >
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mr-4">
              <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{userData.name}</h2>
              <p className="text-sm text-gray-600">{userData.email}</p>
              <div className="flex items-center mt-1">
                <span className="chip chip-info text-xs">{userData.userType}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            <div>
              <div className="text-sm text-gray-600">Empresa</div>
              <div className="font-medium text-gray-900">{userData.company}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Capital actual</div>
              <div className="font-medium text-primary-600">{userData.currentScore} pts</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Miembro desde</div>
              <div className="font-medium text-gray-900">
                {new Date(userData.memberSince).toLocaleDateString('es-ES')}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Tiempo activo</div>
              <div className="font-medium text-gray-900">
                {Math.floor((Date.now() - new Date(userData.memberSince).getTime()) / (1000 * 60 * 60 * 24))} días
              </div>
            </div>
          </div>
        </motion.div>

        {/* Notification preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card mb-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notificaciones</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Recordatorios diarios</div>
                <div className="text-sm text-gray-600">Recordatorios para completar hábitos</div>
              </div>
              <button
                onClick={() => handleNotificationChange('dailyReminders')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.dailyReminders ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.dailyReminders ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Empujes motivacionales</div>
                <div className="text-sm text-gray-600">Mensajes de apoyo y motivación</div>
              </div>
              <button
                onClick={() => handleNotificationChange('motivationalPush')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.motivationalPush ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.motivationalPush ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Reportes semanales</div>
                <div className="text-sm text-gray-600">Resumen de tu progreso semanal</div>
              </div>
              <button
                onClick={() => handleNotificationChange('weeklyReports')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.weeklyReports ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.weeklyReports ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Invitaciones a retos</div>
                <div className="text-sm text-gray-600">Notificaciones de nuevos retos</div>
              </div>
              <button
                onClick={() => handleNotificationChange('challengeInvites')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.challengeInvites ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.challengeInvites ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Privacy and consent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card mb-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacidad y Consentimientos</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="font-medium text-green-900">Tratamiento de datos</div>
                  <div className="text-sm text-green-700">Aceptado el {new Date(userData.memberSince).toLocaleDateString('es-ES')}</div>
                </div>
              </div>
              <button 
                onClick={() => setShowPrivacyModal(true)}
                className="text-green-600 text-sm font-medium"
              >
                Ver detalle
              </button>
            </div>
          </div>
        </motion.div>

        {/* Connections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card mb-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Conexiones</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.924 2.617a.997.997 0 00-.215-.322l-.004-.004A.997.997 0 0017 2h-4a1 1 0 100 2h1.586l-3.293 3.293a1 1 0 001.414 1.414L16 5.414V7a1 1 0 102 0V3a.997.997 0 00-.076-.383z" />
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Dispositivos wearables</div>
                  <div className="text-sm text-gray-600">Conectar smartwatch o pulsera</div>
                </div>
              </div>
              <button className="text-primary-600 text-sm font-medium">Conectar</button>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-3"
        >
          <Link href="/survey" className="w-full btn-secondary block text-center">
            Retomar evaluación inicial
          </Link>
          
          <button className="w-full text-red-600 border border-red-300 hover:bg-red-50 font-semibold py-3 px-6 rounded-xl transition-colors duration-200">
            Cerrar sesión
          </button>
        </motion.div>
      </div>

      {/* Privacy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full max-h-96 overflow-y-auto"
          >
            <h3 className="text-lg font-semibold mb-4">Consentimientos Activos</h3>
            <div className="space-y-4">
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-green-900">Tratamiento de datos personales</h4>
                  <span className="text-xs text-green-700">Activo</span>
                </div>
                <p className="text-sm text-green-800 mb-2">
                  Autorización para procesar datos con fines de recomendaciones personalizadas.
                </p>
                <button className="text-sm text-green-600 hover:text-green-700 underline">
                  Revocar consentimiento
                </button>
              </div>

              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-green-900">Métricas agregadas</h4>
                  <span className="text-xs text-green-700">Activo</span>
                </div>
                <p className="text-sm text-green-800 mb-2">
                  Uso de datos agregados para reportes a empresa y Caja de Compensación.
                </p>
                <button className="text-sm text-green-600 hover:text-green-700 underline">
                  Revocar consentimiento
                </button>
              </div>
            </div>

            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="flex-1 btn-secondary"
              >
                Cerrar
              </button>
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="flex-1 btn-primary"
              >
                Descargar copia (PDF)
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
