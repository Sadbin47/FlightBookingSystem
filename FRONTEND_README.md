# Flight Booking System Frontend

## Overview
This is the Next.js frontend for the Flight Booking System backend API.  
It supports role-based pages for customer, employee, and admin.

## Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Axios
- React Hook Form + Zod
- Socket.IO client

## Setup
1. Go to frontend folder:
```bash
cd frontend
```
2. Install dependencies:
```bash
npm install
```
3. Create `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```
4. Run:
```bash
npm run dev
```

Frontend uses port 3001 by default (see `frontend/package.json`).

## Backend Note
Backend must be running first at `http://localhost:3000`.

## Main Pages
- Public: `/`, `/login`, `/register`, `/flights`
- Customer: `/customer/dashboard`, `/customer/flights`, `/customer/bookings`
- Employee: `/employee/dashboard`, `/employee/bookings`
- Admin: `/admin/dashboard`, `/admin/flights`, `/admin/aircraft`, `/admin/employees`, `/admin/bookings`

## Login Credentials (from backend seed)
- Admin: `admin@flight.com` / `Admin@123`
- Employee: `employee@flight.com` / `Employee@123`
- Customer: `customer@flight.com` / `Customer@123`

## Testing Flow
1. Public user browses `/flights` and tries Book -> redirected to login.
2. Customer logs in, books flight with multiple passengers, checks booking list/details.
3. Employee logs in, views bookings, updates status.
4. Admin logs in, manages aircraft/flights/employees and views bookings.

## Notes
- JWT token and user are stored in localStorage.
- Protected routes are role checked in frontend.
- API errors are shown as friendly messages.
- Socket notifications are displayed in navbar notification panel.
