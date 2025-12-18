#!/usr/bin/env python3
import asyncio
import os
import sys
from datetime import date

# Add the current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text

# Import our models and dependencies
from app.core.database import get_db, async_session_maker
from app.core.security import get_password_hash
from app.models import User, Company, Candidate, NBFCPartner, UserType
from app.models.company import CompanySize


async def test_force_seed():
    """Test the force seed functionality locally"""
    print("Testing force seed locally...")
    
    async with async_session_maker() as db:
        try:
            # First clean everything
            await db.execute(text("DELETE FROM companies"))
            await db.execute(text("DELETE FROM candidates"))
            await db.execute(text("DELETE FROM nbfc_partners"))
            await db.execute(text("DELETE FROM users WHERE email IN ('admin@90tozero.com', 'demo.company@90tozero.com', 'demo.candidate@90tozero.com', 'demo.nbfc@90tozero.com')"))
            await db.commit()
            print("✓ Cleaned existing demo users")
            
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
                    print(f"✓ Created user: {user.email}")
                    
                except Exception as e:
                    print(f"✗ Error creating user {user_data['email']}: {str(e)}")
                    continue
            
            await db.commit()
            
            # Now create profiles separately - handle each one individually
            profile_results = []
            for user_info in created_users:
                try:
                    if user_info["type"] == "candidate":
                        candidate_profile = Candidate(
                            user_id=user_info["id"],
                            full_name="Rajesh Kumar",
                            phone="+91-98765-43210",
                            date_of_birth=date(1990, 5, 15),
                            city="Bangalore",
                            state="Karnataka", 
                            country="India",
                            highest_education="Bachelor's",
                            experience_years=5.0,
                            current_ctc=800000,
                            expected_ctc=1000000,
                            current_company="Previous Tech Corp",
                            current_designation="Software Developer"
                            # Removed open_to_buyout since it has a problematic default
                        )
                        db.add(candidate_profile)
                        await db.flush()
                        print(f"✓ Created candidate profile for {user_info['email']}")
                        user_info["profile_created"] = True
                        
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
                        await db.flush()
                        print(f"✓ Created company profile for {user_info['email']}")
                        user_info["profile_created"] = True
                        
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
                            min_loan_amount=50000
                            # Removed is_active, max_tenure_months, min_tenure_months since they have defaults
                        )
                        db.add(nbfc_profile)
                        await db.flush()
                        print(f"✓ Created NBFC profile for {user_info['email']}")
                        user_info["profile_created"] = True
                    else:
                        user_info["profile_created"] = True  # Admin doesn't need profile
                        
                except Exception as e:
                    print(f"✗ Error creating profile for {user_info['email']}: {str(e)}")
                    user_info["profile_created"] = False
                    user_info["profile_error"] = str(e)
                    # Don't rollback here, just continue with next profile
            
            await db.commit()
            
            print(f"\n✅ Successfully created {len(created_users)} demo users with profiles:")
            for user in created_users:
                print(f"  - {user['email']} ({user['type']}) - Profile: {user.get('profile_created', False)}")
                if 'profile_error' in user:
                    print(f"    Error: {user['profile_error']}")
            
        except Exception as e:
            await db.rollback()
            print(f"✗ Error during force seed: {str(e)}")
            import traceback
            traceback.print_exc()


if __name__ == "__main__":
    asyncio.run(test_force_seed())