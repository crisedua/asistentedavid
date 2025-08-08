'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

const kpiData = [
  { title: 'Usuarios activos (30 días)', value: '2,847', change: '+12%', positive: true },
  { title: 'Capital de salud promedio', value: '542', change: '+8 pts', positive: true },
  { title: 'Tasa participación semanal', value: '73%', change: '-2%', positive: false },
  { title: 'Rachas >7 días activas', value: '1,203', change: '+18%', positive: true }
]

const healthEvolutionData = [
  { month: 'Jul', score: 485 },
  { month: 'Ago', score: 498 },
  { month: 'Sep', score: 512 },
  { month: 'Oct', score: 528 },
  { month: 'Nov', score: 535 },
  { month: 'Dic', score: 542 }
]

const segmentData = [
  { name: 'Activos', value: 2156, percentage: 75.7 },
  { name: 'Pasivos', value: 691, percentage: 24.3 }
]

const companyData = [
  { company: 'Empresa A', improvement: 24, users: 456 },
  { company: 'Empresa B', improvement: 19, users: 302 },
  { company: 'Empresa C', improvement: 16, users: 234 },
  { company: 'Empresa D', improvement: 14, users: 189 },
  { company: 'Empresa E', improvement: 12, users: 145 }
]

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444']

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'compliance'>('overview')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Panel General - SmartDecision</h1>
            <div className="flex space-x-3">
              <button className="btn-secondary">Exportar reporte</button>
              <button className="btn-primary">Crear campaña</button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-xl w-fit">
          {[
            { key: 'overview', label: 'Visión General' },
            { key: 'content', label: 'Gestión de Contenido' },
            { key: 'compliance', label: 'Accesos y Cumplimiento' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`py-2 px-4 text-sm font-medium rounded-lg transition-colors duration-200 ${
                activeTab === tab.key
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {kpiData.map((kpi, index) => (
                <motion.div
                  key={kpi.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card"
                >
                  <h3 className="text-sm font-medium text-gray-600 mb-2">{kpi.title}</h3>
                  <div className="flex items-end justify-between">
                    <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
                    <div className={`text-sm font-medium ${
                      kpi.positive ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {kpi.change}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Health Evolution Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="card"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Evolución Capital de Salud Promedio
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={healthEvolutionData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#22c55e"
                        strokeWidth={3}
                        dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Segment Distribution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="card"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Distribución por Segmentos
                </h3>
                <div className="flex items-center justify-between">
                  <div className="h-48 w-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={segmentData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          dataKey="value"
                        >
                          {segmentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-3">
                    {segmentData.map((segment, index) => (
                      <div key={segment.name} className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: COLORS[index] }}
                        />
                        <span className="text-sm text-gray-600 mr-2">{segment.name}:</span>
                        <span className="text-sm font-semibold text-gray-900">
                          {segment.value.toLocaleString()} ({segment.percentage}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Top Companies Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Empresas con Mayor Mejora Mensual
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Empresa</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Mejora (pts)</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Usuarios</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Tendencia</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companyData.map((company, index) => (
                      <tr key={company.company} className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium text-gray-900">{company.company}</td>
                        <td className="py-3 px-4 text-green-600 font-semibold">+{company.improvement}</td>
                        <td className="py-3 px-4 text-gray-600">{company.users.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L10 4.414 4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-green-600 ml-1">Subiendo</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Alerts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Alertas</h3>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <svg className="w-5 h-5 text-yellow-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-medium text-yellow-900">Empresa F - Baja adherencia</div>
                    <div className="text-sm text-yellow-700">Participación semanal bajo 50% por 3 semanas</div>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
                  <svg className="w-5 h-5 text-red-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-medium text-red-900">Segmento 45-55 años</div>
                    <div className="text-sm text-red-700">Caída de 15 puntos promedio en últimas 2 semanas</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Content Management Tab */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3h4v1a1 1 0 102 0V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 102 0v2a1 1 0 10-2 0V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Cuestionarios</h3>
                <p className="text-sm text-gray-600 mb-3">Crear y editar preguntas de evaluación</p>
                <button className="btn-primary w-full text-sm">Gestionar</button>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Hábitos & Planes</h3>
                <p className="text-sm text-gray-600 mb-3">Catálogo de micro-hábitos por categoría</p>
                <button className="btn-primary w-full text-sm">Gestionar</button>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Retos</h3>
                <p className="text-sm text-gray-600 mb-3">Plantillas de retos y objetivos</p>
                <button className="btn-primary w-full text-sm">Gestionar</button>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Recompensas</h3>
                <p className="text-sm text-gray-600 mb-3">Beneficios y requisitos de validación</p>
                <button className="btn-primary w-full text-sm">Gestionar</button>
              </div>
            </div>
          </div>
        )}

        {/* Compliance Tab */}
        {activeTab === 'compliance' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Cuentas de Caja 18</h3>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">Total cuentas activas</div>
                  <div className="text-2xl font-bold text-gray-900">1</div>
                  <button className="btn-secondary w-full text-sm">Gestionar accesos</button>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Empresas</h3>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">Empresas registradas</div>
                  <div className="text-2xl font-bold text-gray-900">127</div>
                  <button className="btn-secondary w-full text-sm">Ver listado</button>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Consentimientos</h3>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">Tasa de aceptación</div>
                  <div className="text-2xl font-bold text-green-600">97.2%</div>
                  <div className="text-xs text-gray-500">Revocaciones: 0.3%</div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Registro de Cumplimiento</h3>
                <button className="btn-primary">Exportar reporte (PDF)</button>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">Cumplimiento de Privacidad</h4>
                    <p className="text-sm text-blue-800">
                      Todos los datos mostrados son agregados. No se muestran identidades personales 
                      en ningún reporte o dashboard. Última auditoría: 15 de enero 2024.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
