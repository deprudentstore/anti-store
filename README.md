# Anti Furniture Store — Next.js + Django + Postgres (Aiven)

Two separate apps in one folder:
- `backend/` — Django + DRF API + Django admin (products, categories, orders, blog, testimonials)
- `frontend/` — Next.js storefront (Tailwind, App Router)

They deploy as two separate Railway services and talk over HTTPS.

## 1. Get this onto GitHub from Termux

```bash
pkg install git -y
cd anti-store
git init
git add .
git commit -m "Initial Anti store: Django backend + Next.js frontend"
```

Create an empty repo on github.com (no README/gitignore), then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/anti-store.git
git branch -M main
git push -u origin main
```

## 2. Set up Postgres on Aiven

1. Create a free Postgres service on aiven.io.
2. Once it's running, copy the **Service URI** (looks like
   `postgres://avnadmin:PASSWORD@host:port/defaultdb?sslmode=require`).
3. You'll paste this into Railway as `DATABASE_URL` in the next step.

## 3. Deploy the backend on Railway

1. On railway.app: New Project → Deploy from GitHub repo → pick `anti-store`.
2. Set the **Root Directory** to `backend`.
3. Railway will detect the `Procfile` and use gunicorn automatically.
4. Add environment variables (Railway → Variables):
   - `SECRET_KEY` — any long random string
   - `DEBUG` — `False`
   - `DATABASE_URL` — the Aiven Postgres URI from step 2
   - `ALLOWED_HOSTS` — your Railway backend domain, e.g. `anti-backend.up.railway.app`
   - `FRONTEND_URL` — your Railway frontend domain (set after step 4), e.g. `https://anti-store.up.railway.app`
5. Deploy. Then open a shell (Railway → the service → the "⋮" menu → shell, or run locally against the same DATABASE_URL) and run:
   ```bash
   python manage.py migrate
   python manage.py createsuperuser
   ```
6. Visit `https://anti-backend.up.railway.app/admin/` and log in — that's your admin panel.
   Add categories and products here, **or** run the seed command to instantly populate 10
   sample products, 3 testimonials and 2 blog posts so the storefront isn't empty:
   ```bash
   python manage.py seed_store
   ```
   Run this the same way you ran `migrate` (Railway shell, or locally against the same
   `DATABASE_URL`). It's safe to run more than once — it won't create duplicates.
   Sample products have no photo attached (Anti didn't provide real product images), so
   they'll show the placeholder image in the storefront until you upload real photos
   through the admin — just open a product in `/admin/` and add an image.

## 4. Deploy the frontend on Railway

1. New service in the same Railway project → Deploy from the same GitHub repo.
2. Set **Root Directory** to `frontend`.
3. Add environment variable:
   - `NEXT_PUBLIC_API_URL` — `https://anti-backend.up.railway.app/api`
4. Railway auto-detects Next.js (build: `npm run build`, start: `npm start`).
5. Once it's live, go back to the backend service and update `FRONTEND_URL` and
   `ALLOWED_HOSTS`/CORS with the real frontend domain, then redeploy the backend.

## 5. Local development (optional, if you ever code on a laptop)

```bash
# backend
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # edit DATABASE_URL to point at Aiven, or leave blank for sqlite
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver

# frontend (new terminal)
cd frontend
cp .env.local.example .env.local   # point NEXT_PUBLIC_API_URL at http://127.0.0.1:8000/api for local testing
npm install
npm run dev
```

## What's already built

**Backend (Django + DRF):**
- Models: Category, Product (+ gallery images), Testimonial, BlogPost, NewsletterSubscriber, Customer, Order, OrderItem
- Full Django admin for every model (this is your "admin panel" — add products, mark featured/signature, manage orders, write blog posts, view newsletter signups, update order status)
- REST API: `/api/products/`, `/api/categories/`, `/api/testimonials/`, `/api/blog/`, `/api/newsletter/` (POST), `/api/orders/` (POST)
- Postgres via `DATABASE_URL` (works with Aiven's connection string as-is)

**Frontend (Next.js + Tailwind):**
- Home, Shop (with category filter), Product detail, Cart, Checkout, Journal (blog list + post), Our Story, Contact
- Cart persisted in the browser, checkout posts a real order to the Django API
- Newsletter signup wired to the backend
- Warm cream/olive/terracotta palette, Fraunces + Manrope type, matching the "Anti" reference look

## Next steps once it's live
- Add real product photos and copy through `/admin/`
- Hook up a payment provider (Paystack works well for Nigerian customers) in the checkout flow
- Swap placeholder SVGs in `frontend/public/` for real photography
