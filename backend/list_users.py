import asyncio
from app.core.database import async_session_maker
from app.models.user import User
from sqlalchemy import select

async def list_users():
    async with async_session_maker() as session:
        result = await session.execute(
            select(User.email, User.user_type, User.is_active)
        )
        users = result.all()
        
        print("📋 Existing Users in Database:\n" + "="*50)
        for email, user_type, is_active in users:
            status = "✅ Active" if is_active else "❌ Inactive"
            print(f"{status} | {str(user_type.value).upper():10} | {email}")
        print("="*50)

asyncio.run(list_users())
