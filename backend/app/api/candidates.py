from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from decimal import Decimal

from app.core.database import get_db
from app.api.auth import get_current_user
from app.models import User, Candidate, UserType
from app.schemas.candidate import (
    CandidateCreate,
    CandidateUpdate,
    CandidateResponse,
    BuyoutCalculation,
    BuyoutCalculationResponse
)

router = APIRouter(prefix="/candidates", tags=["Candidates"])


@router.post("/profile", response_model=CandidateResponse, status_code=status.HTTP_201_CREATED)
async def create_candidate_profile(
    candidate_data: CandidateCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Create candidate profile"""
    if current_user.user_type != UserType.CANDIDATE:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only candidate users can create candidate profiles"
        )
    
    # Check if profile already exists
    result = await db.execute(
        select(Candidate).where(Candidate.user_id == current_user.id)
    )
    existing_profile = result.scalar_one_or_none()
    
    if existing_profile:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Candidate profile already exists"
        )
    
    # Create profile
    candidate = Candidate(
        user_id=current_user.id,
        **candidate_data.model_dump()
    )
    
    db.add(candidate)
    await db.commit()
    await db.refresh(candidate)
    
    return CandidateResponse.model_validate(candidate)


@router.get("/profile", response_model=CandidateResponse)
async def get_candidate_profile(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get candidate profile"""
    if current_user.user_type != UserType.CANDIDATE:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only candidate users can access candidate profiles"
        )
    
    result = await db.execute(
        select(Candidate).where(Candidate.user_id == current_user.id)
    )
    candidate = result.scalar_one_or_none()
    
    if not candidate:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Candidate profile not found"
        )
    
    return CandidateResponse.model_validate(candidate)


@router.put("/profile", response_model=CandidateResponse)
async def update_candidate_profile(
    candidate_data: CandidateUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Update candidate profile"""
    if current_user.user_type != UserType.CANDIDATE:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only candidate users can update candidate profiles"
        )
    
    result = await db.execute(
        select(Candidate).where(Candidate.user_id == current_user.id)
    )
    candidate = result.scalar_one_or_none()
    
    if not candidate:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Candidate profile not found"
        )
    
    # Update fields
    update_data = candidate_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(candidate, field, value)
    
    await db.commit()
    await db.refresh(candidate)
    
    return CandidateResponse.model_validate(candidate)


@router.post("/calculate-buyout", response_model=BuyoutCalculationResponse)
async def calculate_buyout(calculation: BuyoutCalculation):
    """Calculate buyout amount based on salary and notice period"""
    daily_salary = calculation.current_monthly_salary / Decimal("30")
    buyout_amount = daily_salary * Decimal(str(calculation.notice_period_days))
    
    return BuyoutCalculationResponse(
        buyout_amount=round(buyout_amount, 2),
        notice_period_days=calculation.notice_period_days,
        monthly_salary=calculation.current_monthly_salary,
        daily_salary=round(daily_salary, 2)
    )
