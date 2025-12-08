# API Quick Reference Guide

## Base URL
```
http://localhost:8000/api/v1
```

## 🔐 Authentication

### Register New User
```bash
POST /auth/register

Body:
{
  "email": "user@example.com",
  "password": "SecurePass123",
  "user_type": "candidate"  # or "company", "nbfc", "admin"
}

Response: 201 Created
{
  "access_token": "eyJ0eXAiOiJKV1...",
  "refresh_token": "eyJ0eXAiOiJKV1...",
  "token_type": "bearer",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "user_type": "candidate",
    "is_verified": false,
    "is_active": true,
    "created_at": "2025-12-08T..."
  }
}
```

### Login
```bash
POST /auth/login

Body:
{
  "email": "user@example.com",
  "password": "SecurePass123"
}

Response: 200 OK
{
  "access_token": "eyJ0eXAiOiJKV1...",
  "refresh_token": "eyJ0eXAiOiJKV1...",
  "token_type": "bearer",
  "user": {...}
}
```

### Refresh Token
```bash
POST /auth/refresh

Body:
{
  "refresh_token": "eyJ0eXAiOiJKV1..."
}

Response: 200 OK
{
  "access_token": "new_token...",
  "refresh_token": "new_refresh_token...",
  "token_type": "bearer",
  "user": {...}
}
```

### Get Current User
```bash
GET /auth/me
Authorization: Bearer {access_token}

Response: 200 OK
{
  "id": "uuid",
  "email": "user@example.com",
  "user_type": "candidate",
  "is_verified": false,
  "is_active": true,
  "created_at": "2025-12-08T..."
}
```

---

## 👔 Company APIs

### Create Company Profile
```bash
POST /companies/profile
Authorization: Bearer {access_token}

Body:
{
  "company_name": "Tech Corp",
  "industry": "Technology",
  "size": "medium",
  "gstin": "29ABCDE1234F1Z5",
  "cin": "U12345KA2020PTC123456",
  "website": "https://techcorp.com",
  "phone": "+91-1234567890",
  "address": "123 Business Park",
  "city": "Bangalore",
  "state": "Karnataka"
}

Response: 201 Created
{
  "id": "uuid",
  "user_id": "uuid",
  "company_name": "Tech Corp",
  ...
}
```

### Get Company Profile
```bash
GET /companies/profile
Authorization: Bearer {access_token}

Response: 200 OK
{
  "id": "uuid",
  "company_name": "Tech Corp",
  ...
}
```

### Update Company Profile
```bash
PUT /companies/profile
Authorization: Bearer {access_token}

Body:
{
  "company_name": "Updated Tech Corp",
  "phone": "+91-9876543210"
}

Response: 200 OK
```

---

## 👨‍💼 Candidate APIs

### Create Candidate Profile
```bash
POST /candidates/profile
Authorization: Bearer {access_token}

Body:
{
  "full_name": "John Doe",
  "phone": "+91-9876543210",
  "date_of_birth": "1995-05-15",
  "current_company": "ABC Technologies",
  "current_designation": "Senior Developer",
  "current_ctc": 1200000,
  "notice_period_days": 90,
  "skills": ["Python", "React", "AWS"],
  "experience_years": 5.5,
  "highest_education": "B.Tech Computer Science",
  "expected_ctc": 1800000,
  "preferred_locations": ["Bangalore", "Mumbai"],
  "city": "Bangalore",
  "state": "Karnataka",
  "open_to_buyout": true
}

Response: 201 Created
```

### Get Candidate Profile
```bash
GET /candidates/profile
Authorization: Bearer {access_token}

Response: 200 OK
```

### Update Candidate Profile
```bash
PUT /candidates/profile
Authorization: Bearer {access_token}

Body:
{
  "current_ctc": 1300000,
  "notice_period_days": 60
}

Response: 200 OK
```

### Calculate Buyout Amount
```bash
POST /candidates/calculate-buyout

Body:
{
  "current_monthly_salary": 100000,
  "notice_period_days": 90
}

Response: 200 OK
{
  "buyout_amount": 300000.00,
  "notice_period_days": 90,
  "monthly_salary": 100000.00,
  "daily_salary": 3333.33
}
```

---

## 🏦 NBFC APIs

### Create NBFC Profile
```bash
POST /nbfc/profile
Authorization: Bearer {access_token}

Body:
{
  "nbfc_name": "XYZ Finance Ltd",
  "license_number": "N-12345678",
  "website": "https://xyzfinance.com",
  "contact_person": "Jane Smith",
  "phone": "+91-1234567890",
  "address": "456 Financial District",
  "city": "Mumbai",
  "state": "Maharashtra",
  "interest_rate_min": 10.5,
  "interest_rate_max": 18.0,
  "max_loan_amount": 5000000,
  "min_loan_amount": 50000
}

Response: 201 Created
```

### Get NBFC Profile
```bash
GET /nbfc/profile
Authorization: Bearer {access_token}

Response: 200 OK
```

### Update NBFC Profile
```bash
PUT /nbfc/profile
Authorization: Bearer {access_token}

Body:
{
  "interest_rate_min": 9.5,
  "max_loan_amount": 10000000
}

Response: 200 OK
```

---

## 🔧 Utility Endpoints

### Health Check
```bash
GET /health

Response: 200 OK
{
  "status": "healthy",
  "environment": "development"
}
```

### Root
```bash
GET /

Response: 200 OK
{
  "message": "Welcome to 90toZero API",
  "version": "1.0.0",
  "docs": "/docs"
}
```

---

## 📝 Common Response Codes

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid input data
- `401 Unauthorized` - Invalid or missing authentication
- `403 Forbidden` - User doesn't have permission
- `404 Not Found` - Resource not found
- `422 Unprocessable Entity` - Validation error
- `500 Internal Server Error` - Server error

---

## 🧪 Testing with cURL

### Complete Flow Example

```bash
# 1. Register a candidate
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123",
    "user_type": "candidate"
  }'

# Save the access_token from response

# 2. Create candidate profile
curl -X POST http://localhost:8000/api/v1/candidates/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "full_name": "John Doe",
    "phone": "+91-9876543210",
    "current_company": "ABC Tech",
    "current_designation": "Developer",
    "current_ctc": 1200000,
    "notice_period_days": 90,
    "skills": ["Python", "React"],
    "experience_years": 5,
    "city": "Bangalore",
    "state": "Karnataka"
  }'

# 3. Calculate buyout
curl -X POST http://localhost:8000/api/v1/candidates/calculate-buyout \
  -H "Content-Type: application/json" \
  -d '{
    "current_monthly_salary": 100000,
    "notice_period_days": 90
  }'

# 4. Get profile
curl -X GET http://localhost:8000/api/v1/candidates/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## 🔍 Interactive Documentation

Visit **http://localhost:8000/docs** for interactive Swagger UI where you can:
- View all endpoints
- Test APIs directly from browser
- See request/response schemas
- Authorize with JWT tokens

Alternative documentation: **http://localhost:8000/redoc**

---

## 💡 Tips

1. **Always include Authorization header** for protected endpoints:
   ```
   Authorization: Bearer {your_access_token}
   ```

2. **Token expiry**: Access tokens expire in 30 minutes, use refresh token to get new ones

3. **User types must match**: 
   - Candidates can only create candidate profiles
   - Companies can only create company profiles
   - NBFCs can only create NBFC profiles

4. **Email must be unique** - Each email can only register once

5. **Password requirements**:
   - Minimum 8 characters
   - At least one uppercase letter
   - At least one digit

6. **Buyout calculation formula**:
   ```
   Buyout Amount = (Monthly Salary / 30) × Notice Period Days
   ```
