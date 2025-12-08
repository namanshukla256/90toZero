#!/bin/bash

echo "🚀 Setting up 90toZero Platform"
echo "================================"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"

# Create .env file if it doesn't exist
if [ ! -f backend/.env ]; then
    echo "📝 Creating backend/.env file..."
    cp backend/.env.example backend/.env
    echo "✅ Created backend/.env"
else
    echo "✅ backend/.env already exists"
fi

# Start services
echo ""
echo "🐳 Starting Docker services..."
docker-compose up -d

# Wait for services to be ready
echo ""
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check if backend is running
echo ""
echo "🔍 Checking backend health..."
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/health)

if [ $response -eq 200 ]; then
    echo "✅ Backend is running!"
    echo ""
    echo "🎉 Setup completed successfully!"
    echo ""
    echo "📍 Access points:"
    echo "   - Backend API: http://localhost:8000"
    echo "   - API Docs: http://localhost:8000/docs"
    echo "   - PostgreSQL: localhost:5432"
    echo "   - Redis: localhost:6379"
    echo ""
    echo "📚 Next steps:"
    echo "   1. Visit http://localhost:8000/docs to explore the API"
    echo "   2. Run: cd backend && chmod +x test_api.sh && ./test_api.sh"
    echo "   3. Start building the frontend!"
else
    echo "❌ Backend is not responding. Check logs with: docker-compose logs backend"
fi
