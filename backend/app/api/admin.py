from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from typing import Dict

from app.core.database import get_db
from app.core.security import get_password_hash
from app.models import User, Company, Candidate, NBFCPartner, UserType
from app.models.company import CompanySize

router = APIRouter(prefix="/admin", tags=["Admin"])


@router.post("/seed-database", response_model=Dict[str, str])
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
        
        # Create admin user
        admin_user = User(
            email="admin@90tozero.com",
            password_hash=get_password_hash("Admin123"),
            user_type=UserType.ADMIN,
            is_verified=True,
            is_active=True
        )
        db.add(admin_user)
        
        # Create demo company user
        company_user = User(
            email="demo.company@90tozero.com",
            password_hash=get_password_hash("Company123"),
            user_type=UserType.COMPANY,
            is_verified=True,
            is_active=True
        )
        db.add(company_user)
        await db.flush()
        
        company_profile = Company(
            user_id=company_user.id,
            company_name="TechVision Solutions",
            industry="Information Technology",
            size=CompanySize.MEDIUM,
            website="https://techvision.example.com",
            phone="+91-80-12345678",
            address="Tech Park, Tower A",
            city="Bangalore",
            state="Karnataka",
            country="India"
        )
        db.add(company_profile)
        
        # Create demo candidate user
        candidate_user = User(
            email="demo.candidate@90tozero.com",
            password_hash=get_password_hash("Candidate123"),
            user_type=UserType.CANDIDATE,
            is_verified=True,
            is_active=True
        )
        db.add(candidate_user)
        await db.flush()
        
        candidate_profile = Candidate(
            user_id=candidate_user.id,
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
        
        # Create demo NBFC user
        nbfc_user = User(
            email="demo.nbfc@90tozero.com",
            password_hash=get_password_hash("NBFC123"),
            user_type=UserType.NBFC,
            is_verified=True,
            is_active=True
        )
        db.add(nbfc_user)
        await db.flush()
        
        nbfc_profile = NBFCPartner(
            user_id=nbfc_user.id,
            nbfc_name="QuickLoan Finance Ltd",
            license_number="N-2024-12345",
            website="https://quickloan.example.com",
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
        
        await db.commit()
        
        return {
            "message": "Database seeded successfully",
            "admin": "admin@90tozero.com / Admin123",
            "company": "demo.company@90tozero.com / Company123", 
            "candidate": "demo.candidate@90tozero.com / Candidate123",
            "nbfc": "demo.nbfc@90tozero.com / NBFC123"
        }
        
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to seed database: {str(e)}"
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