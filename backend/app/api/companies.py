from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.api.auth import get_current_user
from app.models import User, Company, UserType
from app.schemas.company import CompanyCreate, CompanyUpdate, CompanyResponse

router = APIRouter(prefix="/companies", tags=["Companies"])


@router.post("/profile", response_model=CompanyResponse, status_code=status.HTTP_201_CREATED)
async def create_company_profile(
    company_data: CompanyCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Create company profile"""
    # Verify user type
    if current_user.user_type != UserType.COMPANY:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only company users can create company profiles"
        )
    
    # Check if profile already exists
    result = await db.execute(
        select(Company).where(Company.user_id == current_user.id)
    )
    existing_profile = result.scalar_one_or_none()
    
    if existing_profile:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Company profile already exists"
        )
    
    # Create profile
    company = Company(
        user_id=current_user.id,
        **company_data.model_dump()
    )
    
    db.add(company)
    await db.commit()
    await db.refresh(company)
    
    return CompanyResponse.model_validate(company)


@router.get("/profile", response_model=CompanyResponse)
async def get_company_profile(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get company profile"""
    if current_user.user_type != UserType.COMPANY:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only company users can access company profiles"
        )
    
    result = await db.execute(
        select(Company).where(Company.user_id == current_user.id)
    )
    company = result.scalar_one_or_none()
    
    if not company:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Company profile not found"
        )
    
    return CompanyResponse.model_validate(company)


@router.put("/profile", response_model=CompanyResponse)
async def update_company_profile(
    company_data: CompanyUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Update company profile"""
    if current_user.user_type != UserType.COMPANY:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only company users can update company profiles"
        )
    
    result = await db.execute(
        select(Company).where(Company.user_id == current_user.id)
    )
    company = result.scalar_one_or_none()
    
    if not company:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Company profile not found"
        )
    
    # Update fields
    update_data = company_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(company, field, value)
    
    await db.commit()
    await db.refresh(company)
    
    return CompanyResponse.model_validate(company)
