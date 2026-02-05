# Foodspots App - Frontend

A Vue 3 + TypeScript + Vite frontend application for managing foodspots. Built for university coursework and deployed on Render.

## Tech Stack

- **Framework**: Vue 3 with Composition API
- **Language**: TypeScript
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Routing**: Vue Router
- **Testing**: Vitest + Vue Test Utils
- **Code Quality**: ESLint + Prettier

## Prerequisites

- Node.js 20.11.0 or higher (managed via `.nvmrc`)
- npm (comes with Node.js)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

The project uses environment-specific configuration:

- **Development** (`.env.development`):
  ```
  VITE_API_URL=http://localhost:8080
  ```

- **Production** (`.env.production`):
  ```
  VITE_API_URL=https://foodspotsapp.onrender.com
  ```

### 3. Development Server

Start the Vite development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

This will:
1. Run TypeScript type checking (`vue-tsc`)
2. Build the application with Vite
3. Output to the `dist/` directory

### 5. Preview Production Build

```bash
npm run preview
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build locally |
| `npm run test:unit` | Run unit tests with Vitest |
| `npm run build-only` | Build without type-checking |
| `npm run type-check` | Run TypeScript type checking |
| `npm run lint` | Lint and auto-fix code with ESLint |

## Project Structure

```
src/
├── api/              # API integration layer (Axios)
│   └── foodspots.ts  # Foodspot CRUD operations
├── assets/           # Static assets (CSS, images)
├── components/       # Reusable Vue components
│   ├── __tests__/    # Component unit tests
│   └── FoodspotList.vue
├── router/           # Vue Router configuration
│   └── index.ts
├── views/            # Page-level components
│   ├── HomeView.vue
│   ├── AboutView.vue
│   └── FoodspotsView.vue
├── App.vue           # Root component
└── main.ts           # Application entry point
```

## Deployment on Render

### Automatic Deployment

This project is configured for automatic deployment on Render using the `render.yaml` blueprint.

### Manual Deployment Steps

1. **Push to GitHub**: Ensure your code is pushed to a GitHub repository

2. **Create New Static Site on Render**:
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New" → "Static Site"
   - Connect your GitHub repository

3. **Configure Build Settings**:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Branch**: `main`

4. **Environment Variables**:
   - `NODE_VERSION`: `20.11.0`
   - `VITE_API_URL`: `https://foodspotsapp.onrender.com` (your backend URL)

5. **Deploy**: Click "Create Static Site"

### Using render.yaml Blueprint

Alternatively, use the included `render.yaml` for one-click deployment:

1. In Render Dashboard, click "New" → "Blueprint"
2. Connect your repository
3. Render will automatically configure everything from `render.yaml`

## Development with VSCode

### Recommended Extensions

The project includes VSCode extension recommendations in [.vscode/extensions.json](.vscode/extensions.json):

- Vue - Official (Volar)
- Vitest Explorer
- ESLint
- EditorConfig
- Prettier

Install them for the best development experience.

### Code Formatting

- **Prettier** is configured to format on save
- **ESLint** runs auto-fix on save
- Configuration in [.prettierrc.json](.prettierrc.json)

## API Integration

The frontend communicates with the backend API using Axios with the following features:

- **Base URL**: Configured via `VITE_API_URL` environment variable
- **Timeout**: 10 seconds
- **Error Handling**: Automatic error interceptor with user-friendly messages
- **Type Safety**: Full TypeScript support

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/foodspots` | Fetch all foodspots |
| POST | `/foodspots` | Create new foodspot |
| DELETE | `/foodspots/:id` | Delete foodspot by ID |

## Testing

Run unit tests:

```bash
npm run test:unit
```

Test files are located in `src/**/__tests__/` directories.

## Code Quality

- **ESLint**: Vue 3 + TypeScript rules
- **Prettier**: Consistent code formatting
- **EditorConfig**: Cross-editor consistency
- **TypeScript**: Strict type checking

Run linter:

```bash
npm run lint
```

## Troubleshooting

### Build Errors

If you encounter build errors:

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
```

### Environment Variables Not Working

Ensure environment variable names start with `VITE_` prefix. Vite only exposes variables with this prefix to the client.

### CORS Issues in Development

If you experience CORS errors:
1. Ensure your backend allows `http://localhost:5173`
2. Check backend CORS configuration
3. Verify `VITE_API_URL` in `.env.development`

## License

This project is for educational purposes as part of university coursework.

## Contact

For questions or issues, please contact the project maintainer.
