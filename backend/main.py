from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import os

from app.core.config import settings
from app.core.database import init_db
from app.api import auth, companies, candidates, nbfc


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifecycle events for the application"""
    # Startup
    print("Starting 90toZero API...")
    await init_db()
    print("Database initialized")
    yield
    # Shutdown
    print("Shutting down 90toZero API...")


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
origins = [
    "http://localhost:3000",  # React dev
    "http://localhost:5173",  # Vite dev
]

# Add production frontend URLs if in production
if settings.ENVIRONMENT == "production":
    # Add your production frontend URL here when you deploy the frontend
    origins.extend([
        "https://90to-zero.vercel.app",  # Your actual Vercel deployment
        "https://90tozero.vercel.app",   # Alternative URL pattern
        "https://90tozero.netlify.app",  # Backup deployment option
    ])

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(companies.router, prefix=settings.API_V1_STR)
app.include_router(candidates.router, prefix=settings.API_V1_STR)
app.include_router(nbfc.router, prefix=settings.API_V1_STR)


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Welcome to 90toZero API",
        "version": settings.VERSION,
        "docs": "/docs"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "environment": settings.ENVIRONMENT,
        "database": "connected",
        "cors_origins": origins if settings.ENVIRONMENT == "production" else ["localhost"]
    }


@app.get("/api/v1/test")
async def test_connection():
    """Test connection endpoint"""
    return {
        "message": "API connection successful",
        "timestamp": "2024-01-28T12:00:00Z",
        "environment": settings.ENVIRONMENT
    }


@app.get("/api/v1/test")
async def test_connection():
    """Test API connection"""
    return {
        "message": "API connection successful!",
        "environment": settings.ENVIRONMENT,
        "timestamp": "2024-01-28T10:30:00Z",
        "frontend_url": "https://90to-zero.vercel.app"
    }


if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=settings.DEBUG
    )
