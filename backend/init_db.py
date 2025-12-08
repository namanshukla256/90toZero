#!/usr/bin/env python3
"""
Database initialization and seeding script
Run this to create tables and optionally add sample data
"""
import asyncio
import sys
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent))

from app.core.database import init_db, async_session_maker
from app.core.security import get_password_hash
from app.models import User, Company, Candidate, NBFCPartner, UserType
from app.models.company import CompanySize


async def create_sample_data():
    """Create sample users and profiles for testing"""
    async with async_session_maker() as session:
        try:
            # Create admin user first
            admin_user = User(
                email="admin@90tozero.com",
                password_hash=get_password_hash("Admin123"),
                user_type=UserType.ADMIN,
                is_verified=True,
                is_active=True
            )
            session.add(admin_user)
            
            # Create sample company users
            companies_data = [
                {
                    "email": "demo.company@90tozero.com",
                    "password": "Company123",
                    "company_name": "TechVision Solutions",
                    "industry": "Information Technology",
                    "size": CompanySize.MEDIUM,
                    "website": "https://techvision.example.com",
                    "phone": "+91-80-12345678",
                    "city": "Bangalore",
                    "state": "Karnataka"
                },
                {
                    "email": "hr@infosystems.com",
                    "password": "Company123",
                    "company_name": "InfoSystems Global",
                    "industry": "IT Services",
                    "size": CompanySize.LARGE,
                    "website": "https://infosystems.example.com",
                    "phone": "+91-22-98765432",
                    "city": "Mumbai",
                    "state": "Maharashtra"
                },
                {
                    "email": "talent@digitalminds.com",
                    "password": "Company123",
                    "company_name": "DigitalMinds Pvt Ltd",
                    "industry": "Software Development",
                    "size": CompanySize.SMALL,
                    "website": "https://digitalminds.example.com",
                    "phone": "+91-44-87654321",
                    "city": "Chennai",
                    "state": "Tamil Nadu"
                }
            ]
            
            for company_data in companies_data:
                company_user = User(
                    email=company_data["email"],
                    password_hash=get_password_hash(company_data["password"]),
                    user_type=UserType.COMPANY,
                    is_verified=True,
                    is_active=True
                )
                session.add(company_user)
                await session.flush()
                
                company_profile = Company(
                    user_id=company_user.id,
                    company_name=company_data["company_name"],
                    industry=company_data["industry"],
                    size=company_data["size"],
                    website=company_data["website"],
                    phone=company_data["phone"],
                    address="Tech Park, Tower A",
                    city=company_data["city"],
                    state=company_data["state"],
                    country="India"
                )
                session.add(company_profile)
            
            # Create sample candidate users
            candidates_data = [
                {
                    "email": "demo.candidate@90tozero.com",
                    "password": "Candidate123",
                    "full_name": "Rajesh Kumar",
                    "phone": "+91-9876543210",
                    "current_company": "ABC Technologies",
                    "current_designation": "Senior Software Engineer",
                    "current_ctc": 1500000,
                    "notice_period_days": 90,
                    "skills": ["Python", "FastAPI", "React", "PostgreSQL", "AWS"],
                    "experience_years": 6.5,
                    "education": "B.Tech - Computer Science",
                    "expected_ctc": 2000000,
                    "city": "Bangalore"
                },
                {
                    "email": "priya.sharma@email.com",
                    "password": "Candidate123",
                    "full_name": "Priya Sharma",
                    "phone": "+91-9988776655",
                    "current_company": "XYZ Corp",
                    "current_designation": "Full Stack Developer",
                    "current_ctc": 1200000,
                    "notice_period_days": 60,
                    "skills": ["JavaScript", "Node.js", "Angular", "MongoDB"],
                    "experience_years": 4.0,
                    "education": "B.E - Information Technology",
                    "expected_ctc": 1600000,
                    "city": "Pune"
                },
                {
                    "email": "amit.verma@email.com",
                    "password": "Candidate123",
                    "full_name": "Amit Verma",
                    "phone": "+91-9876512345",
                    "current_company": "Tech Innovations",
                    "current_designation": "DevOps Engineer",
                    "current_ctc": 1800000,
                    "notice_period_days": 90,
                    "skills": ["Docker", "Kubernetes", "AWS", "Jenkins", "Terraform"],
                    "experience_years": 7.0,
                    "education": "M.Tech - Computer Science",
                    "expected_ctc": 2400000,
                    "city": "Hyderabad"
                },
                {
                    "email": "sneha.patel@email.com",
                    "password": "Candidate123",
                    "full_name": "Sneha Patel",
                    "phone": "+91-9123456789",
                    "current_company": "DataTech Solutions",
                    "current_designation": "Data Scientist",
                    "current_ctc": 1600000,
                    "notice_period_days": 60,
                    "skills": ["Python", "Machine Learning", "TensorFlow", "SQL", "R"],
                    "experience_years": 5.0,
                    "education": "M.Sc - Data Science",
                    "expected_ctc": 2100000,
                    "city": "Bangalore"
                }
            ]
            
            for candidate_data in candidates_data:
                candidate_user = User(
                    email=candidate_data["email"],
                    password_hash=get_password_hash(candidate_data["password"]),
                    user_type=UserType.CANDIDATE,
                    is_verified=True,
                    is_active=True
                )
                session.add(candidate_user)
                await session.flush()
                
                candidate_profile = Candidate(
                    user_id=candidate_user.id,
                    full_name=candidate_data["full_name"],
                    phone=candidate_data["phone"],
                    current_company=candidate_data["current_company"],
                    current_designation=candidate_data["current_designation"],
                    current_ctc=candidate_data["current_ctc"],
                    notice_period_days=candidate_data["notice_period_days"],
                    skills=candidate_data["skills"],
                    experience_years=candidate_data["experience_years"],
                    highest_education=candidate_data["education"],
                    expected_ctc=candidate_data["expected_ctc"],
                    preferred_locations=["Bangalore", "Hyderabad", "Pune"],
                    city=candidate_data["city"],
                    state="Karnataka" if candidate_data["city"] == "Bangalore" else "Maharashtra",
                    country="India",
                    open_to_buyout=True
                )
                session.add(candidate_profile)
            
            # Create sample NBFC users
            nbfc_data_list = [
                {
                    "email": "demo.nbfc@90tozero.com",
                    "password": "NBFC123",
                    "nbfc_name": "QuickLoan Finance Ltd",
                    "license_number": "N-2024-12345",
                    "website": "https://quickloan.example.com",
                    "contact_person": "Priya Sharma",
                    "phone": "+91-22-87654321",
                    "city": "Mumbai",
                    "state": "Maharashtra",
                    "interest_rate_min": 10.5,
                    "interest_rate_max": 18.0,
                    "max_loan_amount": 5000000,
                    "min_loan_amount": 50000
                },
                {
                    "email": "contact@fastfinance.com",
                    "password": "NBFC123",
                    "nbfc_name": "FastFinance NBFC",
                    "license_number": "N-2024-67890",
                    "website": "https://fastfinance.example.com",
                    "contact_person": "Rahul Mehta",
                    "phone": "+91-80-12348765",
                    "city": "Bangalore",
                    "state": "Karnataka",
                    "interest_rate_min": 12.0,
                    "interest_rate_max": 20.0,
                    "max_loan_amount": 3000000,
                    "min_loan_amount": 30000
                }
            ]
            
            for nbfc_data in nbfc_data_list:
                nbfc_user = User(
                    email=nbfc_data["email"],
                    password_hash=get_password_hash(nbfc_data["password"]),
                    user_type=UserType.NBFC,
                    is_verified=True,
                    is_active=True
                )
                session.add(nbfc_user)
                await session.flush()
                
                nbfc_profile = NBFCPartner(
                    user_id=nbfc_user.id,
                    nbfc_name=nbfc_data["nbfc_name"],
                    license_number=nbfc_data["license_number"],
                    website=nbfc_data["website"],
                    contact_person=nbfc_data["contact_person"],
                    phone=nbfc_data["phone"],
                    address="Finance Tower, Business District",
                    city=nbfc_data["city"],
                    state=nbfc_data["state"],
                    country="India",
                    interest_rate_min=nbfc_data["interest_rate_min"],
                    interest_rate_max=nbfc_data["interest_rate_max"],
                    max_loan_amount=nbfc_data["max_loan_amount"],
                    min_loan_amount=nbfc_data["min_loan_amount"],
                    max_tenure_months=24,
                    min_tenure_months=6,
                    is_active=True
                )
                session.add(nbfc_profile)
            
            await session.commit()
            
            print("✅ Sample data created successfully!")
            print("\n📝 Demo Credentials:")
            print("=" * 60)
            print("\n👑 ADMIN:")
            print("   Email: admin@90tozero.com")
            print("   Password: Admin123")
            print("\n🏢 COMPANIES (3):")
            print("   1. demo.company@90tozero.com / Company123")
            print("   2. hr@infosystems.com / Company123")
            print("   3. talent@digitalminds.com / Company123")
            print("\n👨‍💼 CANDIDATES (4):")
            print("   1. demo.candidate@90tozero.com / Candidate123")
            print("   2. priya.sharma@email.com / Candidate123")
            print("   3. amit.verma@email.com / Candidate123")
            print("   4. sneha.patel@email.com / Candidate123")
            print("\n🏦 NBFC PARTNERS (2):")
            print("   1. demo.nbfc@90tozero.com / NBFC123")
            print("   2. contact@fastfinance.com / NBFC123")
            print("\n" + "=" * 60)
            print("\n💡 Total: 10 users with complete profiles created!")
            print("🚀 You can login with any of these credentials to test the platform")
            print("\n" + "=" * 60)
            
        except Exception as e:
            await session.rollback()
            print(f"❌ Error creating sample data: {e}")
            raise


async def main():
    """Main function to initialize database"""
    print("🗄️  Initializing 90toZero Database")
    print("=" * 50)
    
    try:
        # Create all tables
        print("\n📊 Creating database tables...")
        await init_db()
        print("✅ Database tables created successfully!")
        
        # Ask if user wants sample data
        print("\n❓ Do you want to create sample data for testing? (y/n): ", end="")
        response = input().strip().lower()
        
        if response == 'y':
            print("\n🌱 Creating sample data...")
            await create_sample_data()
        else:
            print("\n✅ Database initialized without sample data")
            
        print("\n🎉 Database setup completed!")
        print("\n🚀 You can now start the API server with:")
        print("   uvicorn main:app --reload")
        
    except Exception as e:
        print(f"\n❌ Error initializing database: {e}")
        sys.exit(1)


if __name__ == "__main__":
    asyncio.run(main())
