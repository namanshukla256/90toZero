# 90toZero - Notice Period Buyout Platform

A comprehensive platform connecting companies, candidates, and NBFC partners for notice period buyout financing.

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Python 3.11+ (for local development)
- Node.js 18+ (for frontend development)

### Running with Docker

1. **Clone the repository**
```bash
cd /home/naman/Downloads/MyCode/90toZero
```

2. **Create environment file**
```bash
cp backend/.env.example backend/.env
```

3. **Start all services**
```bash
docker-compose up -d
```

4. **Access the application**
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs
- Frontend: http://localhost:3000

### Running Locally (Backend)

1. **Install dependencies**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

2. **Set up database**
```bash
# Start PostgreSQL (via Docker or local installation)
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=90tozero postgres:15-alpine
```

3. **Configure environment**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Run the server**
```bash
uvicorn main:app --reload
```

## 📁 Project Structure

```
90toZero/
├── backend/
│   ├── app/
│   │   ├── api/          # API endpoints
│   │   ├── core/         # Configuration, database, security
│   │   ├── models/       # SQLAlchemy models
│   │   ├── schemas/      # Pydantic schemas
│   │   └── services/     # Business logic
│   ├── main.py           # FastAPI application
│   ├── requirements.txt  # Python dependencies
│   └── Dockerfile
├── frontend/             # React application (to be created)
├── docker-compose.yml    # Docker orchestration
└── spec.md              # Project specification

```

## 🔑 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh access token
- `GET /api/v1/auth/me` - Get current user

### Companies
- `POST /api/v1/companies/profile` - Create company profile
- `GET /api/v1/companies/profile` - Get company profile
- `PUT /api/v1/companies/profile` - Update company profile

### Candidates
- `POST /api/v1/candidates/profile` - Create candidate profile
- `GET /api/v1/candidates/profile` - Get candidate profile
- `PUT /api/v1/candidates/profile` - Update candidate profile
- `POST /api/v1/candidates/calculate-buyout` - Calculate buyout amount

### NBFC Partners
- `POST /api/v1/nbfc/profile` - Create NBFC profile
- `GET /api/v1/nbfc/profile` - Get NBFC profile
- `PUT /api/v1/nbfc/profile` - Update NBFC profile

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy 2.0 (async)
- **Authentication**: JWT
- **Validation**: Pydantic V2

### Frontend (Coming Soon)
- **Framework**: React 18 + TypeScript
- **State Management**: Redux Toolkit / Zustand
- **UI Library**: Material-UI / Tailwind CSS

## 📝 Development

### Running Tests
```bash
cd backend
pytest
```

### Code Formatting
```bash
# Backend
black app/
ruff check app/
```

## 🔐 Environment Variables

See `backend/.env.example` for all available configuration options.

## 📖 Documentation

- Full specification: See [spec.md](./spec.md)
- API Documentation: http://localhost:8000/docs (when running)

## 🤝 Contributing

This is a private project. For questions or contributions, contact the project owner.

## 📄 License

Proprietary - All rights reserved
