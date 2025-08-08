# Capital de Salud - App Web Responsive

Una aplicación web moderna para el seguimiento y mejora del capital de salud personal, desarrollada con Next.js, TypeScript y Tailwind CSS.

## 🚀 Características

### Para Usuarios
- **Onboarding**: 3 slides introductorios sobre propósito, funcionamiento y privacidad
- **Registro/Login**: Formularios con validación y consentimiento de datos
- **Evaluación inicial**: Encuesta de 10 preguntas para medir capital de salud
- **Selección de plan**: 3 intensidades (Ligero, Medio, Intenso) con hábitos específicos
- **Dashboard personal**: Resumen diario con hábitos, rachas y progreso
- **Gamificación**: Sistema de logros, rachas, retos y recompensas
- **Perfil**: Gestión de datos, notificaciones y privacidad

### Para Administradores
- **Dashboard ejecutivo**: KPIs, gráficos de evolución y alertas
- **Gestión de contenido**: Cuestionarios, hábitos, retos y recompensas
- **Cumplimiento**: Accesos, empresas y registro de consentimientos

## 🛠️ Tecnologías

- **Next.js 14** con App Router
- **TypeScript** para tipado estático
- **Tailwind CSS** para estilos
- **Framer Motion** para animaciones
- **Recharts** para gráficos
- **React Hook Form** para formularios
- **Zustand** para gestión de estado
- **Headless UI** para componentes accesibles

## 📱 Diseño Responsive

La aplicación está optimizada para dispositivos móviles y puede convertirse fácilmente en app móvil. Incluye:

- Navegación mobile-first
- Gestos táctiles
- Componentes adaptables
- Iconografía clara y accesible

## 🎨 Sistema de Diseño

### Colores
- **Primario**: Verde (#22c55e) - representa salud y crecimiento
- **Secundario**: Azul (#3b82f6) - confianza y progreso
- **Estados**: Verde (éxito), Amarillo (advertencia), Rojo (error)

### Componentes
- Cards con sombras suaves y bordes redondeados
- Chips para etiquetas de estado
- Botones con estados hover y disabled
- Animaciones de entrada y transiciones

## 🚦 Rutas Principales

### Usuario
- `/` - Splash screen
- `/onboarding` - Introducción de 3 slides
- `/auth/login` - Inicio de sesión
- `/auth/register` - Registro con consentimiento
- `/survey` - Encuesta de 10 preguntas
- `/survey/results` - Resultados del capital de salud
- `/plan-selection` - Selección de intensidad
- `/dashboard` - Home del usuario
- `/plan` - Vista semanal de hábitos
- `/achievements` - Logros y niveles
- `/streaks` - Gestión de rachas
- `/challenges` - Retos individuales y de equipo
- `/profile` - Configuración personal

### Administrador
- `/admin` - Dashboard ejecutivo con KPIs

## ⚡ Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build

# Iniciar en producción
npm start
```

La aplicación estará disponible en http://localhost:3000

## 🔒 Privacidad y Datos

- Los datos personales se usan solo para recomendaciones individuales
- Las métricas se agregan para reportes empresariales y de Caja
- Nunca se expone identidad personal a terceros
- Sistema de consentimientos granular con opción de revocación
- Cumplimiento con Ley 19.628 de protección de datos

## 📊 Métricas y Gamificación

### Sistema de Puntuación
- Rango: 0-1000 puntos
- Niveles: Bronce (0-499), Plata (500-699), Oro (700-849), Platino (850+)

### Logros y Recompensas
- Medallas por constancia (7 días, 3 semanas, etc.)
- Recompensas simbólicas y con convenios
- Sistema de verificación para validar logros

### Retos
- Individuales y de equipo
- Diferentes dificultades y duraciones
- Ranking y progreso en tiempo real

## 🎯 Roadmap

- [ ] Integración con wearables
- [ ] Notificaciones push
- [ ] Modo offline
- [ ] Dashboard de Caja de Compensación
- [ ] Dashboard empresarial
- [ ] Sistema de recompensas físicas
- [ ] IA para recomendaciones personalizadas

## 👥 Tipos de Usuario

### Usuario Activo (Trabajador)
- Planes de alta intensidad
- Métricas laborales (tiempo sentado, estrés)
- Retos empresariales

### Usuario Pasivo (Jubilado)
- Planes de baja intensidad
- Foco en movilidad y bienestar social
- Actividades comunitarias

### Administrador SmartDecision
- Gestión de contenido
- Métricas agregadas
- Configuración de campañas

### Empresa
- Vista de empleados (agregada)
- Retos internos
- Reportes de bienestar

### Caja de Compensación 18
- Métricas de afiliados
- Segmentación por demografía
- Campañas de salud preventiva

---

Desarrollado con ❤️ para mejorar el capital de salud de las personas.
