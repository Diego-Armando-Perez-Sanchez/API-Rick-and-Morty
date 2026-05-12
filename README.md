# Rick and Morty API - Aplicación Web

Es una aplicación web interactiva desarrollada con React que consume la API oficial de Rick and Morty. Permite explorar personajes, filtrar por especie, buscar por nombre y ver detalles individuales de cada personaje.

## Características

- **Exploración de personajes**: Visualiza todos los personajes de la serie Rick and Morty
- **Búsqueda por nombre**: Filtra personajes en tiempo real por su nombre
- **Filtrado por especie**: Descubre personajes agrupados por su especie (Humano, Alien, Robot, Criatura Mitológica)
- **Paginación**: Visualización de 12 personajes por página con navegación intuitiva
- **Diseño responsive**: Interfaz adaptada para dispositivos móviles, tablets y escritorio
- **Interfaz moderna**: UI limpia y atractiva con animaciones suaves e iconos FontAwesome
- **React Router**: Navegación SPA (Single Page Application) fluida entre páginas
- **Detalles del personaje**: Información completa de cada personaje (especie, estado, género)

## Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** (gestor de paquetes, incluido con Node.js)

Verifica la instalación con:
```bash
node --version
npm --version
```

## Instalación

### 1. Clonar o descargar el repositorio
```bash
cd "ruta/al/proyecto/API-RickAndMorty"
```

### 2. Instalar dependencias
```bash
npm install
```

Este comando descargará e instalará todas las dependencias necesarias del proyecto:
- **React 19.2.6**: Framework principal
- **React Router DOM 7.15.0**: Enrutamiento de aplicación
- **Material-UI 9.0.1**: Componentes de interfaz
- **FontAwesome 7.2.0**: Iconografía
- **Vite 8.0.12**: Herramienta de construcción y desarrollo

## Cómo Ejecutar

### Modo Desarrollo
Para ejecutar la aplicación en modo desarrollo con hot reload:

```bash
npm run dev
```

La aplicación se abrirá automáticamente en `http://localhost:5173` (o en el puerto que indique Vite).

### Construcción para Producción
Para generar una versión optimizada lista para despliegue:

```bash
npm run build
```

Los archivos compilados se generarán en la carpeta `dist/`.

### Vista Previa de Producción
Para previsualizar la versión de producción localmente:

```bash
npm run preview
```

### Linting
Para verificar la calidad del código:

```bash
npm run lint
```

## Estructura del Proyecto

```
API-RickAndMorty/
├── src/
│   ├── Components/
│   │   ├── Header/           # Encabezado con logo y título
│   │   ├── Nav/              # Menú de navegación responsive
│   │   ├── Footer/           # Pie de página
│   │   └── CardCharacter/    # Tarjeta individual del personaje
│   ├── Pages/
│   │   ├── Home/             # Página de inicio
│   │   ├── Characters/       # Listado de personajes con búsqueda
│   │   ├── CharactersDetails/# Detalles de un personaje específico
│   │   ├── Filter/           # Filtrado por especie
│   │   └── Error/            # Página de error 404
│   ├── App.jsx               # Componente principal con rutas
│   ├── App.css               # Estilos globales
│   └── main.jsx              # Punto de entrada de la aplicación
├── public/                   # Archivos estáticos
├── package.json              # Dependencias y scripts
├── vite.config.js            # Configuración de Vite
├── eslint.config.js          # Configuración de ESLint
└── README.md                 # Este archivo

```

## Paleta de Colores

- **Naranja**: `#ff9800` - Acentos principales
- **Verde**: `#4e9630` - Acentos secundarios
- **Oscuro**: `#282c34` - Fondo principal
- **Gris**: `#3c3e44` - Bordes y elementos secundarios
- **Blanco**: `#ffffff` - Texto principal

## Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| **React** | 19.2.6 | Framework principal |
| **React Router DOM** | 7.15.0 | Enrutamiento SPA |
| **Vite** | 8.0.12 | Herramienta de construcción |
| **Material-UI** | 9.0.1 | Componentes de interfaz |
| **FontAwesome** | 7.2.0 | Iconografía |
| **Emotion** | 11.14.0+ | CSS-in-JS |
| **ESLint** | 10.3.0 | Linting de código |

## API Utilizada

**Rick and Morty API**: https://rickandmortyapi.com/api/

Endpoints principales utilizados:
- `GET /api/character` - Obtener todos los personajes
- `GET /api/character/{id}` - Obtener detalles de un personaje específico
- `GET /api/character?species={species}` - Filtrar personajes por especie

## Características Responsive

La aplicación está optimizada para:
- **Desktop**: 992px y superior
- **Tablet**: 768px a 991px
- **Móvil**: Menos de 768px

## Funcionalidades Implementadas

- Visualización de todos los personajes de la API
- Paginación con 12 personajes por página
- Búsqueda en tiempo real por nombre
- Filtrado por especie (Humano, Alien, Robot, Mitológico)
- Página de detalles del personaje
- Menú hamburger responsive para móviles
- Iconos FontAwesome integrados
- Diseño limpio y moderno con bordes redondos
- Animaciones suaves en tarjetas y navegación
- Página de error 404 personalizada
- Footer con información

## Solución de Problemas

### El puerto 5173 ya está en uso
Si el puerto está ocupado, Vite automáticamente intentará usar el siguiente puerto disponible.

### Errores al instalar dependencias
```bash
# Limpiar cache de npm
npm cache clean --force

# Reinstalar dependencias
npm install
```

### La API no responde
Verifica tu conexión a internet. La aplicación consume datos de `https://rickandmortyapi.com/api/`

## Notas de Desarrollo

- La aplicación fetch todos los personajes de una sola vez y realiza paginación del lado del cliente
- Los filtros se aplican en tiempo real sin necesidad de recargar la página
- El router está configurado con BrowserRouter para navegación SPA fluida

## Licencia

Este proyecto utiliza la API de Rick and Morty que es de acceso público.

## Autor

Desarrollado como proyecto educativo en la Universidad de La Amazonia (UDLA) por Diego Armando Pérez Sánchez.

---

**¡Disfruta explorando el universo de Rick and Morty! 🚀**
