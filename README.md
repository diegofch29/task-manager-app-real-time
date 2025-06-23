# Task App - Aplicación de Gestión de Tareas

Una aplicación web moderna para la gestión de tareas desarrollada con React y TypeScript, que permite a los usuarios crear, editar, visualizar y administrar tareas en tiempo real.

## Características

- Creación y edición de tareas
- Gestión de equipos y asignación de tareas
- Actualización en tiempo real con SignalR
- Visualización de estados de tareas
- Interfaz moderna con Fluent UI
- Diseño responsivo
- Estado global con Redux Toolkit

## Instrucciones de Instalación

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn
- Git

### Pasos de Instalación

1. **Clonar el repositorio**

   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd task-app
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno** (opcional)

   - El proyecto está configurado para usar un servicio de API en Azure
   - La configuración se encuentra en `src/appConfig.ts`

4. **Ejecutar la aplicación en modo desarrollo**

   ```bash
   npm start
   ```

   La aplicación se abrirá en [http://localhost:3000](http://localhost:3000)

5. **Compilar para producción**
   ```bash
   npm run build
   ```

### Scripts Disponibles

- `npm start` - Ejecuta la aplicación en modo desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm test` - Ejecuta las pruebas unitarias
- `npm run eject` - Expone las configuraciones de Webpack (irreversible)

## Justificación Tecnológica

### Frontend Framework - React 19

- **¿Por qué React?** Framework maduro y ampliamente adoptado con excelente ecosistema
- **React 19** - Versión más reciente con mejoras en performance y nuevas características
- **TypeScript** - Proporciona tipado estático para mejor mantenibilidad y detección temprana de errores

### Estado Global - Redux Toolkit

- **¿Por qué Redux Toolkit?**
  - Simplifica la configuración de Redux tradicional
  - Incluye herramientas para casos de uso comunes (createSlice, createAsyncThunk)
  - Mejor experiencia de desarrollo con DevTools integradas
  - Ideal para aplicaciones con estado complejo compartido entre múltiples componentes

### UI Framework - Fluent UI

- **¿Por qué Fluent UI?**
  - Sistema de diseño consistente y moderno de Microsoft
  - Componentes accesibles y bien documentados
  - Integración perfecta con TypeScript
  - Theming avanzado y personalizable

### Comunicación en Tiempo Real - SignalR

- **¿Por qué SignalR?**
  - Protocolo eficiente para comunicación bidireccional en tiempo real
  - Manejo automático de reconexión y fallbacks
  - Integración nativa con el ecosistema .NET (backend)
  - Soporte para múltiples transportes (WebSockets, Server-Sent Events, Long Polling)

### Estilos - SASS

- **¿Por qué SASS?**
  - Preprocesador CSS que permite variables, anidación y mixins
  - Mejor organización del código CSS
  - Funcionalidades avanzadas como funciones y operaciones matemáticas

### Routing - React Router DOM v7

- **¿Por qué React Router v7?**
  - Solución estándar para routing en React
  - Versión más reciente con mejoras en performance
  - Soporte para lazy loading y code splitting

### Testing - React Testing Library

- **¿Por qué React Testing Library?**
  - Enfoque en testing que se acerca más al comportamiento del usuario
  - Mejor práctica recomendada por la comunidad React
  - Integración nativa con Jest

### Arquitectura de Carpetas

```
src/
├── components/     # Componentes reutilizables
├── features/       # Lógica de estado (reducers)
├── hooks/          # Custom hooks
├── models/         # Interfaces TypeScript
├── pages/          # Componentes de página
├── services/       # Servicios para API calls
├── store/          # Configuración de Redux
└── tests/          # Archivos de prueba
```

### Patrones Implementados

- **Redux Pattern** - Para manejo centralizado de estado
- **Component Composition** - Componentes reutilizables y modulares
- **Custom Hooks** - Encapsulación de lógica reutilizable
- **Service Layer** - Separación de lógica de API
- **TypeScript Interfaces** - Contratos de datos tipados

## Tiempo Invertido Estimado

### Desarrollo Inicial (Estimado)

- **Configuración del proyecto y dependencias**: 2-3 horas
- **Configuración de Redux Store y estructura**: 3-4 horas
- **Desarrollo de componentes base**: 8-10 horas
- **Implementación de funcionalidades CRUD**: 12-15 horas
- **Integración con SignalR**: 4-6 horas
- **Estilos y diseño responsivo**: 6-8 horas
- **Testing e integración**: 4-6 horas
- **Documentación y refinamiento**: 2-3 horas

**Total estimado**: 41-55 horas de desarrollo

### Desglose por Características

- **Gestión de Tareas (CRUD)**: 15-20 horas
- **Sistema de Estados**: 8-10 horas
- **Integración de Equipos**: 10-12 horas
- **Tiempo Real (SignalR)**: 6-8 horas
- **UI/UX y Estilos**: 8-10 horas
- **Testing**: 4-6 horas

## Tecnologías Utilizadas

### Core

- React 19.1.0
- TypeScript 4.9.5
- Redux Toolkit 2.8.2

### UI/UX

- Fluent UI React Components 9.66.2
- SASS 1.89.2
- React Router DOM 7.6.2

### Comunicación

- Microsoft SignalR 8.0.7
- React SignalR 0.2.24

### Utilidades

- Moment.js 2.30.1 (manejo de fechas)
- React Moment 1.1.3

### Testing

- React Testing Library 16.3.0
- Jest DOM 6.6.3
- User Event 13.5.0

## Estructura del Proyecto

El proyecto sigue una arquitectura modular y escalable:

- **components/**: Componentes reutilizables organizados por funcionalidad
- **features/**: Reducers de Redux organizados por dominio
- **pages/**: Componentes de nivel de página
- **services/**: Capa de servicios para comunicación con API
- **models/**: Definiciones de tipos e interfaces TypeScript
- **hooks/**: Custom hooks para lógica reutilizable

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.
