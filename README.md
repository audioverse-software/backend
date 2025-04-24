# Audioverse Backend (Express + TypeScript)

This repository provides a starter template for the Audioverse backend, built with Node.js, Express, and TypeScript. Contributors can clone this project, run it locally, and begin building API endpoints, smart-contract integrations, and other backend services.

---

## 📝 Features

- **Express** server with RESTful API setup
- **TypeScript** support for strong typing and modern JS features
- **Dev workflow** using `ts-node-dev` for hot-reload of `.ts` files
- **Build pipeline** with `tsc` to compile into `/dist`
- **Preconfigured scripts** for development, building, and production
- **.gitignore** for node modules, build artifacts, and environment files

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone git@github.com:YOUR_ORG/audioverse-backend.git
cd audioverse-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Available Scripts

- **`npm run dev`**\
  Starts the development server with hot-reloading (`ts-node-dev`).

- **`npm run build`**\
  Compiles the TypeScript source files in `src/` to JavaScript under `dist/`.

- **`npm start`**\
  Runs the compiled output from `dist/index.js`.

```bash
# development
npm run dev

# production build
npm run build
npm start
```

---

## 📂 Project Structure

```
├─ .gitignore          # Ignored files (node_modules, dist, .env)
├─ package.json        # NPM metadata & scripts
├─ tsconfig.json       # TypeScript configuration
├─ src/                # Source files (TypeScript)
│   └─ index.ts        # Entry point
└─ dist/               # Compiled JS (after `npm run build`)
```

---

## 🔧 Configuration

Create a `.env` file at the root to define environment variables:

```
PORT=3000
# e.g.
# DB_URL=your_database_url
# JWT_SECRET=your_jwt_secret
```

---

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch: `git checkout -b feat/YourFeature`
3. Commit your changes: \`git commit -m "feat: add ..."
4. Push to the branch: `git push origin feat/YourFeature`
5. Open a Pull Request

Please follow conventional commits for clear history.

---

## 📄 License

[MIT](LICENSE)

