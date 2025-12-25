import asyncio
from app.core.database import engine
from sqlalchemy import text

async def test():
    try:
        async with engine.connect() as conn:
            result = await conn.execute(text('SELECT 1'))
            print('✅ Database connection successful!')
            
            # Check if we have users
            result = await conn.execute(text('SELECT COUNT(*) FROM users'))
            count = result.scalar()
            print(f'📊 Found {count} users in database')
            
    except Exception as e:
        print(f'❌ Database connection failed: {e}')

asyncio.run(test())
