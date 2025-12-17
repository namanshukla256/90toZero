from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from typing import Dict, Any

from app.core.database import get_db
from app.core.security import get_password_hash
from app.models import User, Company, Candidate, NBFCPartner, UserType
from app.models.company import CompanySize

router = APIRouter(prefix="/admin", tags=["Admin"])


@router.post("/seed-database", response_model=Dict[str, Any])
async def seed_database(db: AsyncSession = Depends(get_db)):
    """Seed database with default users if they don't exist"""
    try:
        # Check if admin user exists
        result = await db.execute(
            select(func.count(User.id)).where(User.user_type == UserType.ADMIN)
        )
        admin_count = result.scalar()
        
        if admin_count > 0:
            return {"message": "Database already seeded"}
        
        # Simple passwords to avoid bcrypt issues
        users_to_create = [
            {
                "email": "admin@90tozero.com",
                "password": "admin123",
                "user_type": UserType.ADMIN,
                "name": "Admin User"
            },
            {
                "email": "demo.company@90tozero.com", 
                "password": "comp123",
                "user_type": UserType.COMPANY,
                "name": "Demo Company"
            },
            {
                "email": "demo.candidate@90tozero.com",
                "password": "cand123", 
                "user_type": UserType.CANDIDATE,
                "name": "Demo Candidate"
            },
            {
                "email": "demo.nbfc@90tozero.com",
                "password": "nbfc123",
                "user_type": UserType.NBFC, 
                "name": "Demo NBFC"
            }
        ]
        
        created_users = []
        
        for user_data in users_to_create:
            try:
                # Hash password safely
                password_hash = get_password_hash(user_data["password"])
                
                user = User(
                    email=user_data["email"],
                    password_hash=password_hash,
                    user_type=user_data["user_type"],
                    is_verified=True,
                    is_active=True
                )
                db.add(user)
                await db.flush()  # Get the user ID
                
                created_users.append({
                    "email": user_data["email"],
                    "password": user_data["password"],
                    "type": user_data["user_type"].value
                })
                
                # Create profile based on user type
                if user_data["user_type"] == UserType.COMPANY:
                    company_profile = Company(
                        user_id=user.id,
                        company_name="TechVision Solutions",
                        industry="Technology",
                        size=CompanySize.MEDIUM,
                        website="https://techvision.com",
                        phone="+91-80-12345678",
                        address="Tech Park",
                        city="Bangalore",
                        state="Karnataka",
                        country="India"
                    )
                    db.add(company_profile)
                    
                elif user_data["user_type"] == UserType.CANDIDATE:
                    candidate_profile = Candidate(
                        user_id=user.id,
                        full_name="Rajesh Kumar",
                        phone="+91-98765-43210",
                        date_of_birth="1990-05-15",
                        city="Bangalore",
                        state="Karnataka", 
                        country="India",
                        highest_education="Bachelor's",
                        years_of_experience=5,
                        current_salary=800000,
                        expected_salary=1000000
                    )
                    db.add(candidate_profile)
                    
                elif user_data["user_type"] == UserType.NBFC:
                    nbfc_profile = NBFCPartner(
                        user_id=user.id,
                        nbfc_name="QuickLoan Finance",
                        license_number="N-2024-12345",
                        website="https://quickloan.com",
                        contact_person="Priya Sharma",
                        phone="+91-22-87654321",
                        address="Financial District", 
                        city="Mumbai",
                        state="Maharashtra",
                        country="India",
                        interest_rate_min=10.5,
                        interest_rate_max=18.0,
                        max_loan_amount=5000000,
                        min_loan_amount=50000,
                        is_approved=True
                    )
                    db.add(nbfc_profile)
                    
            except Exception as user_error:
                # Log individual user creation error but continue
                print(f"Error creating user {user_data['email']}: {str(user_error)}")
                continue
        
        await db.commit()
        
        response = {
            "message": f"Successfully created {len(created_users)} users",
            "users": created_users
        }
        
        return response
        
    except Exception as e:
        await db.rollback()
        error_msg = str(e)
        print(f"Database seeding error: {error_msg}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database seeding failed: {error_msg}"
        )


@router.get("/users/count", response_model=Dict[str, int])
async def get_user_counts(db: AsyncSession = Depends(get_db)):
    """Get count of users by type"""
    try:
        result = await db.execute(select(User.user_type, func.count(User.id)).group_by(User.user_type))
        counts = dict(result.fetchall())
        
        return {
            "admin": counts.get(UserType.ADMIN, 0),
            "company": counts.get(UserType.COMPANY, 0),
            "candidate": counts.get(UserType.CANDIDATE, 0),
            "nbfc": counts.get(UserType.NBFC, 0),
            "total": sum(counts.values())
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to get user counts: {str(e)}"
        )