# Flight Booking System (Frontend + Backend)

## Structure
- `frontend/`: Next.js + TypeScript + Tailwind
- `backend/`: NestJS + TypeScript + PostgreSQL
- `Others/`: reference folders, notes

## Backend Run
1. Configure env:
   - edit `backend/.env` (copy from `backend/.env.example` if needed)
2. Create Postgres DB (once):
```sql
CREATE DATABASE flight_booking_db;
```
3. Install + seed + run:
```bash
cd backend
npm install
npm run seed
npm run start:dev
```
4. Swagger:
- `http://localhost:3000/api/docs`

## Frontend Run
```bash
cd frontend
npm install
npm run dev
```
- UI: `http://localhost:3001`

## Default Users (from seed)
- Admin: `admin@flight.com` / `Admin@123`
- Employee: `employee@flight.com` / `Employee@123`
- Customer: `customer@flight.com` / `Customer@123`
