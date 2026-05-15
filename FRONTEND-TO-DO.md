# Flight Booking System Frontend TO-DO

## Phase 1: Setup

- [ ] Create Next.js TypeScript project.
- [ ] Install Tailwind CSS.
- [ ] Install Axios.
- [ ] Install socket.io-client.
- [ ] Create `.env.local`.
- [ ] Configure `NEXT_PUBLIC_API_BASE_URL=http://localhost:3000`.
- [ ] Create folder structure.
- [ ] Create shared TypeScript types.
- [ ] Create Axios API client.

## Phase 2: Auth

- [ ] Create login page.
- [ ] Create register page.
- [ ] Create AuthContext or equivalent auth state.
- [ ] Store JWT token.
- [ ] Store user info.
- [ ] Add logout.
- [ ] Add role-based redirect.
- [ ] Add protected route logic.

## Phase 3: Layout

- [ ] Create Navbar.
- [ ] Create Sidebar.
- [ ] Create dashboard layout.
- [ ] Add role-based menu items.
- [ ] Add logout button.
- [ ] Add current user display.

## Phase 4: Public Pages

- [ ] Create home page.
- [ ] Create public flight search page.
- [ ] Add flight search filters.
- [ ] Add flight cards/table.
- [ ] Add login redirect when public user tries to book.

## Phase 5: Customer Pages

- [ ] Create customer dashboard.
- [ ] Create customer flight search page.
- [ ] Create booking page/form.
- [ ] Add multiple passenger form.
- [ ] Connect `POST /bookings`.
- [ ] Create customer booking history page.
- [ ] Connect `GET /customer/booking`.
- [ ] Create booking details page.
- [ ] Connect `GET /bookings/:id`.

## Phase 6: Employee Pages

- [ ] Create employee dashboard.
- [ ] Create employee booking management page.
- [ ] Connect `GET /employee/bookings`.
- [ ] Create booking details page.
- [ ] Add booking status update form.
- [ ] Connect `PATCH /employee/bookings/:id/status`.

## Phase 7: Admin Pages

- [ ] Create admin dashboard.
- [ ] Create admin flight management page.
- [ ] Connect flight create/update/delete APIs.
- [ ] Create admin aircraft management page.
- [ ] Connect aircraft create/update/delete APIs.
- [ ] Create admin employee management page.
- [ ] Connect employee create/update APIs.
- [ ] Create admin booking view page if supported.

## Phase 8: WebSocket Notifications

- [ ] Install and configure Socket.IO client.
- [ ] Connect after login.
- [ ] Join user room if backend supports it.
- [ ] Listen for `booking_created`.
- [ ] Listen for `booking_status_updated`.
- [ ] Listen for `flight_schedule_changed`.
- [ ] Create notification bell/panel.
- [ ] Show toast or visible message for new notifications.

## Phase 9: Error Handling

- [ ] Handle 400 errors.
- [ ] Handle 401 errors.
- [ ] Handle 403 errors.
- [ ] Handle 404 errors.
- [ ] Handle server errors.
- [ ] Add loading states.
- [ ] Add success messages.
- [ ] Add delete confirmations.

## Phase 10: Final Testing

- [ ] Test public flight browsing.
- [ ] Test customer login.
- [ ] Test customer booking with multiple passengers.
- [ ] Test customer booking history.
- [ ] Test employee booking management.
- [ ] Test booking status update.
- [ ] Test admin aircraft management.
- [ ] Test admin flight management.
- [ ] Test admin employee management.
- [ ] Test protected routes.
- [ ] Test logout.
- [ ] Test frontend build.

## Phase 11: Documentation

- [ ] Create or update frontend README.
- [ ] Add setup instructions.
- [ ] Add environment variable instructions.
- [ ] Add backend dependency note.
- [ ] Add default login credentials.
- [ ] Add testing flow.