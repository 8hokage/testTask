### 1) Start PostgreSQL
From the project root:

```bash
docker compose up -d
```

This starts PostgreSQL on `localhost:5432` with database `testtask`.

### 2) Backend

```bash
cd back
```

Create `back/.env` with:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/testtask?schema=public"
PORT=3001
```

Install and initialize Prisma client:

```bash
npm install
npx prisma generate
npm run db:push   # or: npm run db:migrate
npm run dev
```

### 3) Frontend

```bash
cd front
```

Install and run:
```bash
npm install
npm run dev
```

Open the app at `http://localhost:3000`.
