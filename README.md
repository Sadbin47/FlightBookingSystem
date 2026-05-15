# Flight Booking System (Backend + Frontend)

## Overview
This repository contains:
- Backend API (`NestJS + TypeScript + PostgreSQL`) in project root
- Frontend app (`Next.js + TypeScript + Tailwind`) inside `frontend/`

## Backend Quick Start
1. Create `.env` using `.env.example`
2. Create PostgreSQL database:
```sql
CREATE DATABASE flight_booking_db;
```
3. Install and run:
```bash
npm install
npm run seed
npm run start:dev
```
4. Swagger:
- `http://localhost:3000/api/docs`

## Frontend Quick Start
1. Go to frontend folder:
```bash
cd frontend
```
2. Create `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```
3. Install and run:
```bash
npm install
npm run dev
```
4. Frontend URL:
- `http://localhost:3001`

## Default Test Users
- Admin: `admin@flight.com` / `Admin@123`
- Employee: `employee@flight.com` / `Employee@123`
- Customer: `customer@flight.com` / `Customer@123`

## Main Features
- JWT login/register
- Role-based routes and API access
- Public flight search
- Customer booking with multiple passengers
- Employee booking status update
- Admin management: flights, aircraft, employees
- Email + WebSocket notifications

## Important Frontend Pages
- Public: `/`, `/login`, `/register`, `/flights`
- Customer: `/customer/dashboard`, `/customer/flights`, `/customer/bookings`
- Employee: `/employee/dashboard`, `/employee/bookings`
- Admin: `/admin/dashboard`, `/admin/flights`, `/admin/aircraft`, `/admin/employees`, `/admin/bookings`

## Notes
- Frontend uses `NEXT_PUBLIC_API_BASE_URL` for API and socket connection.
- Full frontend guide is in `FRONTEND_README.md`.
