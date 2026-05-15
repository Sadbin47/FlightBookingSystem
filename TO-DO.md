# Flight Booking System Backend API - TO-DO

## Project Goal

Build a complete backend API for a Flight Booking System using NestJS, TypeScript, PostgreSQL, TypeORM, JWT authentication, role-based authorization, email notifications, WebSocket notifications, Swagger documentation, and Postman/Swagger testing.

This project is based on the submitted Advanced Web Technology proposal. The backend must support customers, employees, and admins. Customers can search and book flights with multiple passengers. Employees can manage bookings. Admins can manage flights, aircraft, and employees.

No frontend is required.

---

# Phase 0: Project Setup

## 0.1 Create NestJS Project

- [ ] Create NestJS project.
- [ ] Install required dependencies.

Required dependencies:

```bash
npm install @nestjs/typeorm typeorm pg
npm install @nestjs/config
npm install @nestjs/passport passport passport-jwt @nestjs/jwt
npm install bcryptjs
npm install class-validator class-transformer
npm install @nestjs/swagger swagger-ui-express
npm install @nestjs-modules/mailer nodemailer
npm install handlebars
npm install @nestjs/websockets @nestjs/platform-socket.io socket.io

Dev dependencies:

npm install -D @types/bcryptjs @types/passport-jwt
0.2 Create Base Folder Structure

Create this structure:

src/
  main.ts
  app.module.ts

  config/
    typeorm.config.ts

  common/
    decorators/
    guards/
    filters/
    enums/

  auth/
  users/
  flights/
  aircraft/
  bookings/
  employees/
  mail/
  notifications/
0.3 Create .env File

Create .env in project root:

PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=flight_booking_db

JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d

MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER=your_mailtrap_user
MAIL_PASS=your_mailtrap_pass
MAIL_FROM=no-reply@flightbooking.com
0.4 PostgreSQL Database
 Create PostgreSQL database:
CREATE DATABASE flight_booking_db;
Phase 1: Core App Configuration
1.1 Configure TypeORM

Create:

src/config/typeorm.config.ts

Requirements:

 Use PostgreSQL.
 Load credentials from .env.
 Use autoLoadEntities: true.
 Use synchronize: true for development.
 Export TypeORM configuration.
1.2 Configure AppModule

Update:

src/app.module.ts

Requirements:

 Import ConfigModule globally.
 Import TypeOrmModule.
 Load TypeORM config.
 Import all feature modules after they are created.
1.3 Configure main.ts

Update:

src/main.ts

Requirements:

 Enable global validation pipe.
 Use whitelist.
 Use forbidNonWhitelisted.
 Use transform.
 Configure Swagger UI at /api/docs.
 Add bearer auth to Swagger.
 Use port from .env.
Phase 2: Common Utilities
2.1 Create User Role Enum

Create:

src/common/enums/user-role.enum.ts

Roles:

ADMIN = 'admin'
EMPLOYEE = 'employee'
CUSTOMER = 'customer'
2.2 Create Booking Status Enum

Create:

src/common/enums/booking-status.enum.ts

Statuses:

PENDING = 'pending'
CONFIRMED = 'confirmed'
CANCELLED = 'cancelled'

Default booking status should be:

confirmed

or

pending

Choose one and keep it consistent. Recommended for simple project: confirmed.

2.3 Create Roles Decorator

Create:

src/common/decorators/roles.decorator.ts

Requirements:

 Implement @Roles(...roles) decorator.
 Use NestJS SetMetadata.
2.4 Create JWT Auth Guard

Create:

src/common/guards/jwt-auth.guard.ts

Requirements:

 Extend Passport AuthGuard using strategy jwt.
2.5 Create Roles Guard

Create:

src/common/guards/roles.guard.ts

Requirements:

 Read required roles from metadata.
 Check request.user.role.
 Allow access only if role matches.
 Throw or return false for unauthorized roles.
2.6 Create Global HTTP Exception Filter

Create:

src/common/filters/http-exception.filter.ts

Requirements:

 Return clean JSON error response.
 Include statusCode, timestamp, path, and message.
Phase 3: Users Module
3.1 Generate Users Module

Create:

src/users/users.module.ts
src/users/users.entity.ts
src/users/users.service.ts
src/users/users.controller.ts
3.2 User Entity

Entity fields:

 id
 email
 password
 fullName
 role
 createdAt
 bookings relation

Rules:

email must be unique.
password must not be selected accidentally if possible.
role must be enum.
createdAt must use CreateDateColumn.

Relationships:

One User has many Bookings.
One User can have one Employee profile.
3.3 Users Service

Implement:

 createUser()
 findByEmail()
 findById()
 findAll()
 updateUser()

Important:

findByEmail() must be able to include password for login validation.
Never return password in normal API responses.
Phase 4: Auth Module
4.1 Generate Auth Module

Create:

src/auth/auth.module.ts
src/auth/auth.controller.ts
src/auth/auth.service.ts
src/auth/jwt.strategy.ts
src/auth/dto/login.dto.ts
src/auth/dto/register.dto.ts
4.2 Register DTO

Fields:

 email
 password
 fullName
 role

Validation:

email must be valid.
password minimum length 6.
fullName must be string.
role must be enum.
4.3 Login DTO

Fields:

 email
 password

Validation:

email must be valid.
password must not be empty.
4.4 Auth Service

Implement:

 register()
 login()
 validateUser()

Requirements:

Hash password with bcryptjs.
Check duplicate email.
Compare password during login.
Return JWT token.
Return user info without password.
4.5 JWT Strategy

Requirements:

 Extract token from Bearer header.
 Use JWT_SECRET from .env.
 Validate user payload.
 Attach user id, email, and role to request.
4.6 Auth Controller

Endpoints:

POST /auth/register
POST /auth/login

Swagger:

 Add ApiTags.
 Add ApiOperation.
 Add useful ApiResponse decorators.
Phase 5: Aircraft Module
5.1 Generate Aircraft Module

Create:

src/aircraft/aircraft.module.ts
src/aircraft/aircraft.entity.ts
src/aircraft/aircraft.controller.ts
src/aircraft/aircraft.service.ts
src/aircraft/dto/create-aircraft.dto.ts
src/aircraft/dto/update-aircraft.dto.ts
5.2 Aircraft Entity

Fields:

 id
 model
 capacity
 manufacturer
 flights relation

Relationships:

One Aircraft has many Flights.
5.3 Aircraft DTOs

CreateAircraftDto:

 model: string
 capacity: number
 manufacturer: string

UpdateAircraftDto:

 all fields optional

Use class-validator.

5.4 Aircraft Service

Implement:

 create()
 findAll()
 findOne()
 update()
 remove()

Rules:

Throw NotFoundException if aircraft does not exist.
Capacity must be positive.
5.5 Aircraft Controller

Endpoints:

POST /admin/aircraft
GET /admin/aircraft
GET /admin/aircraft/:id
PUT /admin/aircraft/:id
DELETE /admin/aircraft/:id

Security:

 All endpoints require JWT.
 All endpoints require admin role.
Phase 6: Flights Module
6.1 Generate Flights Module

Create:

src/flights/flights.module.ts
src/flights/flight.entity.ts
src/flights/flights.controller.ts
src/flights/flights.service.ts
src/flights/dto/create-flight.dto.ts
src/flights/dto/update-flight.dto.ts
src/flights/dto/search-flight.dto.ts
6.2 Flight Entity

Fields:

 id
 flightNumber
 origin
 destination
 departureTime
 arrivalTime
 price
 aircraft
 bookings
 assignedEmployees

Relationships:

Many Flights belong to one Aircraft.
One Flight has many Bookings.
Many Flights can be assigned to many Employees.

Rules:

flightNumber should be unique.
6.3 Flight DTOs

CreateFlightDto:

 flightNumber
 origin
 destination
 departureTime
 arrivalTime
 price
 aircraftId

UpdateFlightDto:

 all fields optional

SearchFlightDto:

 origin optional
 destination optional
 date optional

Use validation decorators.

6.4 Flights Service

Implement:

 create()
 search()
 findAll()
 findOne()
 update()
 remove()

Important:

On create, validate aircraft exists.
On update, if departureTime or arrivalTime changes, trigger flight schedule update email to affected customers.
On update, emit WebSocket event for affected customers.
On delete, handle safely if flight has bookings.
6.5 Flights Controller

Public/customer endpoint:

GET /flights
GET /flights/:id

Admin endpoints:

POST /admin/flights
PUT /admin/flights/:id
DELETE /admin/flights/:id

Security:

Public flight search can be open.
Admin flight management must require JWT and admin role.
Phase 7: Bookings Module
7.1 Generate Bookings Module

Create:

src/bookings/bookings.module.ts
src/bookings/booking.entity.ts
src/bookings/passenger.entity.ts
src/bookings/bookings.controller.ts
src/bookings/bookings.service.ts
src/bookings/dto/create-booking.dto.ts
src/bookings/dto/passenger.dto.ts
src/bookings/dto/update-booking-status.dto.ts
7.2 Booking Entity

Fields:

 id
 user
 flight
 passengers
 totalPassengers
 status
 bookingDate

Relationships:

Many Bookings belong to one User.
Many Bookings belong to one Flight.
One Booking has many Passengers.
7.3 Passenger Entity

Fields:

 id
 booking
 name
 age
 passportNumber

Relationship:

Many Passengers belong to one Booking.
7.4 Booking DTOs

PassengerDto:

 name
 age
 passportNumber

CreateBookingDto:

 flightId
 passengers array

UpdateBookingStatusDto:

 status enum

Validation:

passengers must be an array.
passengers must not be empty.
nested validation must work.
age must be positive.
passportNumber must not be empty.
7.5 Bookings Service

Implement:

 createBooking()
 getCustomerBookings()
 getAllBookings()
 getBookingById()
 updateBookingStatus()

Create booking flow:

 Get logged-in customer from request.
 Validate user role is customer.
 Validate flight exists.
 Validate passenger array.
 Count already booked passengers for the flight.
 Compare with aircraft capacity.
 If capacity exceeded, throw BadRequestException.
 Create booking.
 Create passenger records.
 Send booking confirmation email.
 Emit WebSocket booking_created event.
 Return booking with user, flight, and passengers.

Booking status update flow:

 Employee/admin can update booking status.
 Validate booking exists.
 Update status.
 Send booking status update email to customer.
 Emit WebSocket booking_status_updated event.
 Return updated booking.

Booking details rules:

 Admin can view any booking.
 Employee can view any booking.
 Customer can only view own booking.
 Throw ForbiddenException if customer tries to view another customer's booking.
7.6 Bookings Controller

Endpoints:

POST /bookings
GET /customer/booking
GET /employee/bookings
PATCH /employee/bookings/:id/status
GET /bookings/:id

Security:

POST /bookings: customer only.
GET /customer/booking: customer only.
GET /employee/bookings: employee or admin.
PATCH /employee/bookings/:id/status: employee or admin.
GET /bookings/:id: authenticated users, with service-level ownership check.
Phase 8: Employees Module
8.1 Generate Employees Module

Create:

src/employees/employees.module.ts
src/employees/employee.entity.ts
src/employees/employees.controller.ts
src/employees/employees.service.ts
src/employees/dto/create-employee.dto.ts
src/employees/dto/update-employee.dto.ts
8.2 Employee Entity

Fields:

 id
 user
 roleType
 assignedFlights

Relationships:

One Employee belongs to one User.
Many Employees can be assigned to many Flights.
8.3 Employee DTOs

CreateEmployeeDto:

 userId
 roleType
 assignedFlightIds optional array

UpdateEmployeeDto:

 roleType optional
 assignedFlightIds optional array
8.4 Employees Service

Implement:

 create()
 findAll()
 findOne()
 update()

Rules:

Only users with employee role should have employee profile.
If creating employee from existing user, validate user exists.
Validate assigned flights exist.
Prevent duplicate employee profile for same user.
8.5 Employees Controller

Endpoints:

POST /admin/employees
GET /admin/employees
GET /admin/employees/:id
PATCH /admin/employees/:id

Security:

All endpoints require JWT.
All endpoints require admin role.
Phase 9: Mail Module
9.1 Generate Mail Module

Create:

src/mail/mail.module.ts
src/mail/mail.service.ts
src/mail/templates/booking-confirmation.hbs
src/mail/templates/booking-status-update.hbs
src/mail/templates/flight-schedule-update.hbs
9.2 Configure Mailer

Requirements:

 Use @nestjs-modules/mailer.
 Use Nodemailer transport.
 Load host, port, user, pass, and from from .env.
 Use Handlebars adapter.
 Templates must be loaded from src/mail/templates.
9.3 Mail Service Methods

Implement:

sendBookingConfirmationEmail(customerEmail, data)
sendBookingStatusUpdateEmail(customerEmail, data)
sendFlightScheduleUpdateEmail(customerEmail, data)
9.4 Email Templates

booking-confirmation.hbs should include:

 Customer name
 Booking ID
 Flight number
 Origin
 Destination
 Departure time
 Arrival time
 Passenger list
 Booking date

booking-status-update.hbs should include:

 Customer name
 Booking ID
 Updated status
 Flight number

flight-schedule-update.hbs should include:

 Customer name
 Flight number
 Old departure/arrival time if available
 New departure/arrival time
 Origin
 Destination
Phase 10: WebSocket Notifications Module
10.1 Generate Notifications Gateway

Create:

src/notifications/notifications.module.ts
src/notifications/notifications.gateway.ts
10.2 Gateway Requirements

Implement Socket.IO gateway.

Events to emit:

booking_created
booking_status_updated
flight_schedule_changed

Methods:

sendBookingCreated(userId, payload)
sendBookingStatusUpdated(userId, payload)
sendFlightScheduleChanged(userId, payload)

Simple room strategy:

On connection, client may join a room using userId.
Room name can be user_{id}.
Emit customer-specific notifications to that room.
Also allow general admin/employee broadcast if useful.
Phase 11: Swagger Documentation
11.1 Add Swagger Decorators

Add to controllers:

 ApiTags
 ApiBearerAuth where protected
 ApiOperation
 ApiResponse where useful
11.2 Confirm Swagger Works

Swagger URL:

http://localhost:3000/api/docs

Checklist:

 Auth endpoints visible.
 Flights endpoints visible.
 Bookings endpoints visible.
 Aircraft endpoints visible.
 Employees endpoints visible.
 Protected endpoints show Bearer Auth option.
Phase 12: Seed Data
12.1 Create Seed Method or Script

Add a seed script or provide clear README instructions.

Required default users:

Admin:

email: admin@flight.com
password: Admin@123
role: admin

Employee:

email: employee@flight.com
password: Employee@123
role: employee

Customer:

email: customer@flight.com
password: Customer@123
role: customer

Sample aircraft:

model: Boeing 737
capacity: 180
manufacturer: Boeing

Sample flight:

flightNumber: BG101
origin: Dhaka
destination: Dubai
departureTime: future date
arrivalTime: future date
price: 45000
aircraftId: 1
Phase 13: Testing Checklist
13.1 Build Test

Run:

npm run build

Fix all errors.

13.2 Start Project

Run:

npm run start:dev

Check:

http://localhost:3000/api/docs
13.3 Auth Test

Test:

 Register customer.
 Login admin.
 Login employee.
 Login customer.
 Copy JWT token.
 Test protected endpoint without token.
 Test protected endpoint with wrong role.
 Test protected endpoint with correct role.
13.4 Aircraft Test

Using admin token:

 Create aircraft.
 Get aircraft list.
 Get aircraft by ID.
 Update aircraft.
 Delete aircraft only if safe.
13.5 Flight Test

Using admin token:

 Create flight.
 Update flight.
 Delete flight only if safe.

Public:

 Search all flights.
 Search by origin.
 Search by destination.
 Search by date.
13.6 Booking Test

Using customer token:

 Create booking with one passenger.
 Create booking with multiple passengers.
 Try booking with invalid flight ID.
 Try booking with empty passengers array.
 Try booking beyond aircraft capacity.
 View own booking history.
 View own booking details.
 Try viewing another customer's booking and confirm forbidden.
13.7 Employee Booking Test

Using employee token:

 View all bookings.
 View booking details.
 Update booking status.
 Confirm customer receives email.
 Confirm WebSocket event is emitted.
13.8 Admin Test

Using admin token:

 Manage flights.
 Manage aircraft.
 Manage employees.
 Update flight schedule.
 Confirm affected customers receive email.
 Confirm WebSocket schedule update event is emitted.
13.9 Mail Test

Use Mailtrap, Ethereal, or Gmail app password.

Check:

 Booking confirmation email sent.
 Booking status update email sent.
 Flight schedule update email sent.
 Templates render correctly.
 No mail credentials hardcoded.
13.10 WebSocket Test

Check these events:

 booking_created
 booking_status_updated
 flight_schedule_changed

Use simple Socket.IO client or Postman WebSocket support if possible.

Phase 14: README

Create README.md.

Required sections:

# Flight Booking System Backend API

## Project Overview
## Features
## Technology Stack
## Database Entities and Relationships
## API Endpoints
## Installation
## Environment Variables
## Database Setup
## Running the Project
## Swagger Documentation
## Default Users
## Testing Guide
## Email Notification Testing
## WebSocket Notification Testing
## Folder Structure
## Future Improvements
Phase 15: Final Submission Preparation

Prepare these for university submission:

 GitHub repository link.
 README.md.
 TO-DO.md.
 Swagger screenshot.
 Postman collection or screenshots.
 Database table screenshots.
 Email notification screenshots.
 WebSocket notification proof.
 Short explanation of role-based access.
 Short explanation of database relationships.
 Short explanation of booking flow.
 Short explanation of mailer and WebSocket.
Required Final Endpoint List
Auth
POST /auth/register
POST /auth/login
Flights
GET /flights
GET /flights/:id
POST /admin/flights
PUT /admin/flights/:id
DELETE /admin/flights/:id
Aircraft
POST /admin/aircraft
GET /admin/aircraft
GET /admin/aircraft/:id
PUT /admin/aircraft/:id
DELETE /admin/aircraft/:id
Bookings
POST /bookings
GET /customer/booking
GET /employee/bookings
PATCH /employee/bookings/:id/status
GET /bookings/:id
Employees
POST /admin/employees
GET /admin/employees
GET /admin/employees/:id
PATCH /admin/employees/:id
Swagger
GET /api/docs
Important Error-Reduction Rules

Follow these strictly:

 Do not implement all files blindly without checking imports.
 After each module, run npm run build.
 Fix circular dependencies carefully using forwardRef only if necessary.
 Keep entity relation names consistent.
 Do not expose password in API responses.
 Do not store plain text passwords.
 Do not hardcode .env secrets.
 Always validate request bodies using DTOs.
 Always protect admin endpoints with admin role.
 Always protect employee endpoints with employee/admin role.
 Always protect customer booking endpoints with customer role.
 Ensure customer cannot view another customer's booking.
 Ensure capacity check works before booking.
 Ensure booking with multiple passengers works.
 Ensure mail service failure does not fully crash booking unless intentionally required.
 Ensure Swagger works after all controllers are added.
 Ensure final build passes.
Recommended Implementation Order

Use this exact order:

1. Project setup
2. ConfigModule and TypeORM
3. Swagger and validation
4. Common enums, guards, decorators
5. Users entity and service
6. Auth register/login/JWT
7. Aircraft module
8. Flights module
9. Bookings and passengers module
10. Employees module
11. Mail module
12. WebSocket notifications
13. Seed data
14. README
15. Final testing
Done Definition

The project is complete only when:

 npm run build passes.
 npm run start:dev runs successfully.
 Swagger opens at /api/docs.
 Admin can manage aircraft.
 Admin can manage flights.
 Admin can manage employees.
 Customer can search flights.
 Customer can book flight with multiple passengers.
 Customer can view own booking history.
 Employee can view all bookings.
 Employee/admin can update booking status.
 Booking confirmation email works.
 Booking status update email works.
 Flight schedule update email works.
 WebSocket events work.
 Role-based guards work.
 README explains how to run and test the project.

---

This prompt is aligned with your submitted proposal: **NestJS + TypeScript backend**, **PostgreSQL + TypeORM**, role-based users, booking with multiple passengers, admin/employee/customer endpoints, WebSocket notifications, mailer, Swagger, validation, and GitHub-ready submission requirements. :contentReference[oaicite:0]{index=0}