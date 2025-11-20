# Choreboard

Lightweight chore & bounty board built with PocketBase (backend) and a Vite + Vue SPA.

**Project layout**

- `Dockerfile` — root Dockerfile (main app / server image).
- `spa/` — Single Page App (Vite + Vue) with its own `Dockerfile`.
- `pb_*/` — PocketBase related files and folders.
- `docker-compose.yaml` / `docker-compose.prod.yaml` — compose files for local and production stacks.

**Quick overview**

- The backend uses PocketBase.
- The frontend SPA lives in `spa/` and is built with Vite + Vue.

**Configurables**

The backend container (chorebase) reads these env vars:

| Environment Variable |                 Example | Description                                                                                      |
| -------------------- | ----------------------: | ------------------------------------------------------------------------------------------------ |
| `APP_URL`            | `http://localhost:8080` | Base URL where the backend (PocketBase) is accessible.                                           |
| `ADMIN_EMAIL`        |            `EMAIL_HERE` | Initial admin account email — replace with a real address.                                       |
| `ADMIN_PASSWORD`     |       `"PASSWORD_HERE"` | Initial admin password — replace with a strong secret (keep quotes if required by your tooling). |

The frontend container (choreface) reads these env vars:

| Environment Variable |                 Example | Description           |
| -------------------- | ----------------------: | --------------------- |
| `VITE_API_URL`       | `http://localhost:8080` | PocketBase server URL |

**Development (frontend SPA)**

1. Change into the SPA folder:

   ```bash
   cd spa
   ```

2. Install dependencies and run the dev server (Vite):

   ```bash
   npm install
   npm run dev
   ```

3. Open the dev server URL that Vite prints (usually `http://localhost:5173`).

**Run locally with Docker Compose**

Build and start services (development):

```bash
docker compose up --build
```

Adjust environment variables inside compose files as needed.

**Environment & prerequisites**

- Docker Engine (modern version)
- Docker Compose v2 (or the `docker compose` plugin)
- Node.js + npm (for frontend development inside `spa/`)

**Contributing**

- Open issues and PRs against `main`.
- Prefer small, focused PRs. Describe how to run and test your changes.
