# My Modern React Setup

⚡️ Vite + React 19 + TypeScript

## Features

- ⚡️ Vite for fast builds and HMR
- ⚛️ React 19 with TypeScript
- 🔄 Tanstack Query for data fetching
- 💅 Sass Modules + Tailwind CSS
- 🛡️ Error Boundaries for production error handling
- 🔍 Dev error overlay for development
- ✨ Prettier for code formatting
- 🐳 Docker support (Production Nginx + Development container)

## Getting Started

### Local Development
```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Visit `http://localhost:5173`

## Docker Deployment

This repository includes two Docker configurations: one for production (Nginx) and one for development (Vite).

### 1. Production Build (Nginx)

Uses `Dockerfile`. Builds the static assets and serves them via Nginx on port 80.
```bash
# Build the production image
docker build -f Dockerfile -t my-react-app-prod .

# Run the container (Map host port 8080 to container port 80)
docker run -d -p 8080:80 --name my-react-app-prod my-react-app-prod
```

Visit `http://localhost:8080`

### 2. Development Build (Hot Reloading)

Uses `Dockerfile.dev`. Installs dependencies and runs the Vite dev server on port 5173.
```bash
# Build the dev image
docker build -f Dockerfile.dev -t my-react-app-dev .

# Run the container (Map host port 5173 to container port 5173)
# Note: For HMR to work, this requires volume mounting (see Docker Compose below)
docker run -d -p 5173:5173 --name my-react-app-dev my-react-app-dev
```

### Using Docker Compose (Orchestration)

**Note:** This repository does not contain a `docker-compose.yml` file. It is designed to be orchestrated by the parent repository (`Pickard-Index`).

If you are running this as part of the full stack:

1. Navigate to the `Pickard-Index` root directory.

2. **Production Mode:**
```bash
docker compose up -d --build
```

3. **Development Mode:**
```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Docker Commands (General)
```bash
# Stop container
docker stop my-react-app-prod

# Start container
docker start my-react-app-prod

# Remove container
docker rm my-react-app-prod

# View logs
docker logs my-react-app-prod

# Access container shell
docker exec -it my-react-app-prod sh
```

## Project Structure
```
.
├── src/
│   ├── components/
│   │   └── ErrorBoundary.tsx
│   ├── App.tsx
│   ├── App.module.scss
│   ├── main.tsx
│   └── index.scss
├── public/
├── Dockerfile              # Production configuration
├── Dockerfile.dev          # Development configuration
├── nginx.conf
├── .dockerignore
├── .gitignore
├── .prettierrc
├── eslint.config.js
├── tailwind.config.js
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── index.html
```

## Error Handling

### Development

- Syntax/compile errors show Vite's dev overlay
- Runtime render errors caught by Error Boundary
- Test error handling with the "Trigger Render Error" button

### Production

- Error Boundary displays user-friendly error UI
- Prevents full application crashes
- Test with: `npm run build && npm run preview`

## Technology Stack

- **Frontend Framework:** React 19
- **Build Tool:** Vite
- **Language:** TypeScript
- **Data Fetching:** Tanstack Query
- **Styling:** Sass Modules + Tailwind CSS
- **Code Formatting:** Prettier
- **Web Server:** Nginx (production)
- **Container:** Docker

## License

MIT