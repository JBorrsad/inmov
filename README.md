# Prueba de Maquetación - InmoValley (Home)

Este proyecto es una prueba técnica de maquetación. He replicado el diseño de su página principal manteniendo la fidelidad visual y añadiendo funcionalidades interactivas con JavaScript.

## Tecnologías utilizadas

- **HTML5 semántico** - Estructura clara con etiquetas apropiadas
- **CSS3 con variables personalizadas** - Sistema de diseño escalable y mantenible
- **Bootstrap 5** - Sistema de grid y utilidades para responsive
- **jQuery** - Funcionalidades del buscador, navegación y efectos

He elegido estas tecnologías porque permiten un desarrollo ágil manteniendo código limpio y organizado, tal como se solicitaba en la prueba técnica.

## Estructura del proyecto

```
Prueba_Maquetacion/
├── index.html           # Página principal maquetada
├── css/
│   ├── base.css         # Variables, reset y tipografías
│   ├── layout.css       # Estructura general y grids
│   ├── responsive.css   # Media queries
│   └── components/      # CSS por componente (header, hero, search, etc.)
├── js/
│   ├── core.js          # Inicialización de módulos
│   ├── navigation.js    # Menú móvil y scroll suave
│   ├── hero-search.js   # Lógica del buscador
│   ├── properties.js    # Favoritos y filtrado
│   └── ...              # Otros módulos
└── Assets/              # Imágenes y SVG de la prueba
```

## Decisiones de maquetación

He organizado el código siguiendo la metodología **BEM** con el prefijo `iv-` (InmoValley) para mantener las clases descriptivas y evitar conflictos. El CSS está separado en componentes independientes (header, hero, search, properties, etc.) para facilitar el mantenimiento.

En JavaScript he creado módulos pequeños con una responsabilidad clara cada uno: `Navigation` gestiona el menú, `HeroSearch` el buscador, `Properties` los favoritos y filtros, etc. Cada módulo sigue el patrón IIFE y expone solo lo necesario.

He implementado un buscador funcional que filtra las propiedades según criterios (estado, tipo, población, precio, etc.) y un sistema de favoritos que persiste en localStorage.

## Cómo ejecutar el proyecto

1. Clona o descarga este repositorio
2. Abre `index.html` directamente en tu navegador

**Opción alternativa** (servidor local):
```bash
npx serve .
```

O usa la extensión Live Server de VS Code.



## Características implementadas

- Buscador de propiedades con filtros funcionales
- Sistema de favoritos con localStorage
- Menú móvil lateral deslizante
- Animaciones suaves en scroll
- Diseño responsive (móvil, tablet, desktop)
- Hover effects en tarjetas y botones

---

