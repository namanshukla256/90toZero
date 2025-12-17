#!/bin/bash
# Render deployment start script

echo "Starting 90toZero API on Render..."
echo "Environment: $ENVIRONMENT"
echo "Database URL: ${DATABASE_URL:0:20}..." # Show first 20 chars only for security

# Run database migrations
echo "Running database migrations..."
python -c "
import asyncio
from app.core.database import init_db

async def setup():
    await init_db()
    print('Database initialized successfully')

asyncio.run(setup())
"

# Start the server
echo "Starting FastAPI server..."
exec python -m uvicorn main:app --host 0.0.0.0 --port $PORT --workers 1