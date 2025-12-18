from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from typing import Dict, Any

from app.core.database import get_db
from app.core.security import get_password_hash
from app.models import User, Company, Candidate, NBFCPartner, UserType
from app.models.company import CompanySize

router = APIRouter(prefix="/admin", tags=["Admin"])


@router.post("/cleanup-orphaned", response_model=Dict[str, Any])
async def cleanup_orphaned_profiles(db: AsyncSession = Depends(get_db)):
    """Clean up orphaned profiles that don't have valid users"""
    try:
        from sqlalchemy import text
        
        # Delete all orphaned profiles
        company_result = await db.execute(text("DELETE FROM companies WHERE user_id IS NULL OR user_id NOT IN (SELECT id FROM users) RETURNING id"))
        deleted_companies = company_result.fetchall()
        
        candidate_result = await db.execute(text("DELETE FROM candidates WHERE user_id IS NULL OR user_id NOT IN (SELECT id FROM users) RETURNING id"))
        deleted_candidates = candidate_result.fetchall()
        
        nbfc_result = await db.execute(text("DELETE FROM nbfc_partners WHERE user_id IS NULL OR user_id NOT IN (SELECT id FROM users) RETURNING id"))
        deleted_nbfcs = nbfc_result.fetchall()
        
        await db.commit()
        
        return {
            "message": "Orphaned profiles cleaned up",
            "deleted": {
                "companies": len(deleted_companies),
                "candidates": len(deleted_candidates),
                "nbfcs": len(deleted_nbfcs)
            },
            "deleted_ids": {
                "companies": [str(row[0]) for row in deleted_companies],
                "candidates": [str(row[0]) for row in deleted_candidates],
                "nbfcs": [str(row[0]) for row in deleted_nbfcs]
            }
        }
        
    except Exception as e:
        await db.rollback()
        return {
            "error": "Failed to cleanup orphaned profiles",
            "detail": str(e)
        }


@router.get("/debug/user-profiles", response_model=Dict[str, Any])
async def debug_user_profiles(db: AsyncSession = Depends(get_db)):
    """Debug endpoint to check which users have profiles created"""
    try:
        # Get all users
        result = await db.execute(select(User).where(User.email.like('%demo%') | User.email.like('%admin%')))
        users = result.scalars().all()
        
        user_info = []
        for user in users:
            user_data = {
                "email": user.email,
                "type": user.user_type.value,
                "user_id": str(user.id),
                "has_profile": False,
                "profile_data": None
            }
            
            # Check for profile based on user type
            if user.user_type == UserType.CANDIDATE:
                result = await db.execute(select(Candidate).where(Candidate.user_id == user.id))
                profile = result.scalar_one_or_none()
                if profile:
                    user_data["has_profile"] = True
                    user_data["profile_data"] = {
                        "full_name": profile.full_name,
                        "phone": profile.phone,
                        "city": profile.city
                    }
            elif user.user_type == UserType.COMPANY:
                result = await db.execute(select(Company).where(Company.user_id == user.id))
                profile = result.scalar_one_or_none()
                if profile:
                    user_data["has_profile"] = True
                    user_data["profile_data"] = {
                        "company_name": profile.company_name,
                        "industry": profile.industry
                    }
            elif user.user_type == UserType.NBFC:
                result = await db.execute(select(NBFCPartner).where(NBFCPartner.user_id == user.id))
                profile = result.scalar_one_or_none()
                if profile:
                    user_data["has_profile"] = True
                    user_data["profile_data"] = {
                        "nbfc_name": profile.nbfc_name,
                        "license_number": profile.license_number
                    }
            
            user_info.append(user_data)
        
        return {
            "total_users": len(user_info),
            "users": user_info
        }
        
    except Exception as e:
        return {
            "error": "Failed to debug user profiles",
            "detail": str(e)
        }


@router.post("/test-user-creation", response_model=Dict[str, Any])
async def test_user_creation(db: AsyncSession = Depends(get_db)):
    """Test creating a single user to debug issues"""
    try:
        # Try to create just one admin user
        test_password = "test123"
        password_hash = get_password_hash(test_password)
        
        test_user = User(
            email="test@90tozero.com",
            password_hash=password_hash,
            user_type=UserType.ADMIN,
            is_verified=True,
            is_active=True
        )
        
        db.add(test_user)
        await db.commit()
        await db.refresh(test_user)
        
        return {
            "message": "Test user created successfully",
            "user_id": str(test_user.id),
            "email": test_user.email,
            "user_type": test_user.user_type.value
        }
        
    except Exception as e:
        await db.rollback()
        error_detail = str(e)
        print(f"Error creating test user: {error_detail}")
        return {
            "error": "Failed to create test user",
            "detail": error_detail,
            "type": type(e).__name__
        }


@router.post("/force-seed-simple", response_model=Dict[str, Any])
async def force_seed_simple(db: AsyncSession = Depends(get_db)):
    """Simple force seed that creates users and profiles separately"""
    try:
        from sqlalchemy import text
        
        # First clean everything
        await db.execute(text("DELETE FROM companies"))
        await db.execute(text("DELETE FROM candidates"))
        await db.execute(text("DELETE FROM nbfc_partners"))
        await db.execute(text("DELETE FROM users WHERE email IN ('admin@90tozero.com', 'demo.company@90tozero.com', 'demo.candidate@90tozero.com', 'demo.nbfc@90tozero.com')"))
        await db.commit()
        
        # Create users first
        demo_users = [
            {
                "email": "admin@90tozero.com",
                "password": "admin123",
                "user_type": UserType.ADMIN
            },
            {
                "email": "demo.company@90tozero.com", 
                "password": "comp123",
                "user_type": UserType.COMPANY
            },
            {
                "email": "demo.candidate@90tozero.com",
                "password": "cand123",
                "user_type": UserType.CANDIDATE
            },
            {
                "email": "demo.nbfc@90tozero.com",
                "password": "nbfc123",
                "user_type": UserType.NBFC
            }
        ]
        
        created_users = []
        
        # Create users only first
        for user_data in demo_users:
            try:
                password_hash = get_password_hash(user_data["password"])
                
                user = User(
                    email=user_data["email"],
                    password_hash=password_hash,
                    user_type=user_data["user_type"],
                    is_verified=True,
                    is_active=True
                )
                db.add(user)
                await db.flush()
                await db.refresh(user)
                
                created_users.append({
                    "email": user.email,
                    "password": user_data["password"],
                    "type": user.user_type.value,
                    "id": str(user.id)
                })
                
            except Exception as e:
                print(f"Error creating user {user_data['email']}: {str(e)}")
                continue
        
        await db.commit()
        
        # Now create profiles separately
        for user_info in created_users:
            try:
                if user_info["type"] == "candidate":
                    candidate_profile = Candidate(
                        user_id=user_info["id"],
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
                    
                elif user_info["type"] == "company":
                    company_profile = Company(
                        user_id=user_info["id"],
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
                    
                elif user_info["type"] == "nbfc":
                    nbfc_profile = NBFCPartner(
                        user_id=user_info["id"],
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
                    
                await db.flush()
                user_info["profile_created"] = True
                
            except Exception as e:
                print(f"Error creating profile for {user_info['email']}: {str(e)}")
                user_info["profile_created"] = False
                user_info["profile_error"] = str(e)
        
        await db.commit()
        
        return {
            "message": f"Simple force-created {len(created_users)} demo users",
            "users": created_users
        }
        
    except Exception as e:
        await db.rollback()
        return {
            "error": "Failed to simple force-seed users",
            "detail": str(e)
        }


@router.post("/force-seed", response_model=Dict[str, Any])
async def force_seed_demo_users(db: AsyncSession = Depends(get_db)):
    """Force create demo users for testing, even if admin exists"""
    try:
        # Delete any existing demo users AND their profiles first
        demo_emails = [
            "admin@90tozero.com",
            "demo.company@90tozero.com", 
            "demo.candidate@90tozero.com",
            "demo.nbfc@90tozero.com"
        ]
        
        for email in demo_emails:
            result = await db.execute(select(User).where(User.email == email))
            existing_user = result.scalar_one_or_none()
            if existing_user:
                user_id = existing_user.id
                
                # Delete profiles first (to avoid foreign key constraints)
                # Delete candidate profile
                result = await db.execute(select(Candidate).where(Candidate.user_id == user_id))
                candidate_profile = result.scalar_one_or_none()
                if candidate_profile:
                    await db.delete(candidate_profile)
                
                # Delete company profile  
                result = await db.execute(select(Company).where(Company.user_id == user_id))
                company_profile = result.scalar_one_or_none()
                if company_profile:
                    await db.delete(company_profile)
                
                # Delete NBFC profile
                result = await db.execute(select(NBFCPartner).where(NBFCPartner.user_id == user_id))
                nbfc_profile = result.scalar_one_or_none()
                if nbfc_profile:
                    await db.delete(nbfc_profile)
                
                # Now delete the user
                await db.delete(existing_user)
        
        # Clean up any orphaned profiles (profiles without users)
        # This will handle any corrupted profile data
        from sqlalchemy import text
        await db.execute(text("DELETE FROM companies WHERE user_id IS NULL OR user_id NOT IN (SELECT id FROM users)"))
        await db.execute(text("DELETE FROM candidates WHERE user_id IS NULL OR user_id NOT IN (SELECT id FROM users)"))
        await db.execute(text("DELETE FROM nbfc_partners WHERE user_id IS NULL OR user_id NOT IN (SELECT id FROM users)"))
        
        await db.commit()
        
        # Now create fresh demo users
        demo_users = [
            {
                "email": "admin@90tozero.com",
                "password": "admin123",
                "user_type": UserType.ADMIN
            },
            {
                "email": "demo.company@90tozero.com", 
                "password": "comp123",
                "user_type": UserType.COMPANY
            },
            {
                "email": "demo.candidate@90tozero.com",
                "password": "cand123",
                "user_type": UserType.CANDIDATE
            },
            {
                "email": "demo.nbfc@90tozero.com",
                "password": "nbfc123",
                "user_type": UserType.NBFC
            }
        ]
        
        created_users = []
        
        for user_data in demo_users:
            try:
                password_hash = get_password_hash(user_data["password"])
                
                user = User(
                    email=user_data["email"],
                    password_hash=password_hash,
                    user_type=user_data["user_type"],
                    is_verified=True,
                    is_active=True
                )
                db.add(user)
                await db.flush()  # This gets the user.id
                await db.refresh(user)  # Ensure user is fully loaded
                
                user_info = {
                    "email": user_data["email"], 
                    "password": user_data["password"],
                    "type": user_data["user_type"].value,
                    "id": str(user.id),
                    "profiles_created": []
                }
                
                # Create profile based on user type
                if user_data["user_type"] == UserType.COMPANY:
                    try:
                        company_profile = Company(
                            user_id=user.id,  # Make sure user.id is set
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
                        await db.flush()
                        user_info["profiles_created"].append("company")
                        print(f"Company profile created for {user_data['email']} with user_id: {user.id}")
                    except Exception as profile_error:
                        print(f"Failed to create company profile for {user_data['email']}: {str(profile_error)}")
                        user_info["profile_error"] = str(profile_error)
                    
                elif user_data["user_type"] == UserType.CANDIDATE:
                    try:
                        candidate_profile = Candidate(
                            user_id=user.id,  # Make sure user.id is set
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
                        await db.flush()
                        user_info["profiles_created"].append("candidate")
                        print(f"Candidate profile created for {user_data['email']} with user_id: {user.id}")
                    except Exception as profile_error:
                        print(f"Failed to create candidate profile for {user_data['email']}: {str(profile_error)}")
                        user_info["profile_error"] = str(profile_error)
                    
                elif user_data["user_type"] == UserType.NBFC:
                    try:
                        nbfc_profile = NBFCPartner(
                            user_id=user.id,  # Make sure user.id is set
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
                        await db.flush()
                        user_info["profiles_created"].append("nbfc")
                        print(f"NBFC profile created for {user_data['email']} with user_id: {user.id}")
                    except Exception as profile_error:
                        print(f"Failed to create NBFC profile for {user_data['email']}: {str(profile_error)}")
                        user_info["profile_error"] = str(profile_error)
                
                created_users.append(user_info)
                print(f"Successfully created user: {user_data['email']} with ID: {user.id}")
                
            except Exception as user_error:
                print(f"Error creating user {user_data['email']}: {str(user_error)}")
                import traceback
                traceback.print_exc()
                continue
        
        await db.commit()
        
        return {
            "message": f"Force-created {len(created_users)} demo users",
            "users": created_users
        }
        
    except Exception as e:
        await db.rollback()
        return {
            "error": "Failed to force-seed users",
            "detail": str(e)
        }


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
                print(f"Creating user: {user_data['email']}")
                
                # Hash password safely
                password_hash = get_password_hash(user_data["password"])
                print(f"Password hashed successfully for {user_data['email']}")
                
                user = User(
                    email=user_data["email"],
                    password_hash=password_hash,
                    user_type=user_data["user_type"],
                    is_verified=True,
                    is_active=True
                )
                db.add(user)
                print(f"User added to session: {user_data['email']}")
                
                await db.flush()  # Get the user ID
                print(f"User flushed, got ID: {user.id}")
                
                created_users.append({
                    "email": user_data["email"],
                    "password": user_data["password"],
                    "type": user_data["user_type"].value,
                    "id": str(user.id)
                })
                
                print(f"User {user_data['email']} created successfully")
                
                # Skip profile creation for now to simplify debugging
                # We'll add profiles back once basic user creation works
                    
            except Exception as user_error:
                # Log individual user creation error but continue
                error_msg = str(user_error)
                print(f"Error creating user {user_data['email']}: {error_msg}")
                print(f"Error type: {type(user_error).__name__}")
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