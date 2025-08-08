'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 to-secondary-600">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 to-secondary-600 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center text-white max-w-md"
      >
        {/* Logo removido de la home (se mantiene en el header global) */}

        {/* Título removido para evitar duplicar el logo */}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xl mb-8 opacity-90"
        >
          Cuida tu bienestar con hábitos simples
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            href="/onboarding"
            className="inline-block bg-white text-primary-600 font-semibold py-4 px-8 rounded-xl hover:bg-gray-100 transition-colors duration-200 text-lg"
          >
            Comenzar
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8"
        >
          <Link
            href="/auth/login"
            className="text-white text-opacity-80 hover:text-opacity-100 transition-opacity duration-200"
          >
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
