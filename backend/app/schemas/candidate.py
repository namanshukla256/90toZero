from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime, date
from uuid import UUID
from decimal import Decimal


class CandidateBase(BaseModel):
    """Base candidate schema"""
    full_name: str = Field(..., min_length=2, max_length=100)
    phone: str = Field(..., min_length=10, max_length=15)
    current_company: Optional[str] = None
    current_designation: Optional[str] = None
    current_ctc: Optional[Decimal] = Field(None, ge=0)
    notice_period_days: Optional[int] = Field(None, ge=0, le=365)
    experience_years: Optional[Decimal] = Field(None, ge=0, le=50)
    city: Optional[str] = None
    state: Optional[str] = None


class CandidateCreate(CandidateBase):
    """Schema for candidate profile creation"""
    date_of_birth: Optional[date] = None
    skills: Optional[List[str]] = []
    highest_education: Optional[str] = None
    expected_ctc: Optional[Decimal] = Field(None, ge=0)
    preferred_locations: Optional[List[str]] = []
    open_to_buyout: bool = True


class CandidateUpdate(BaseModel):
    """Schema for candidate profile update"""
    full_name: Optional[str] = Field(None, min_length=2, max_length=100)
    phone: Optional[str] = Field(None, min_length=10, max_length=15)
    current_company: Optional[str] = None
    current_designation: Optional[str] = None
    current_ctc: Optional[Decimal] = Field(None, ge=0)
    notice_period_days: Optional[int] = Field(None, ge=0, le=365)
    experience_years: Optional[Decimal] = Field(None, ge=0, le=50)
    skills: Optional[List[str]] = None
    expected_ctc: Optional[Decimal] = Field(None, ge=0)
    preferred_locations: Optional[List[str]] = None
    city: Optional[str] = None
    state: Optional[str] = None
    open_to_buyout: Optional[bool] = None


class CandidateResponse(CandidateBase):
    """Schema for candidate response"""
    id: UUID
    user_id: UUID
    date_of_birth: Optional[date]
    skills: Optional[List[str]]
    highest_education: Optional[str]
    expected_ctc: Optional[Decimal]
    preferred_locations: Optional[List[str]]
    kyc_verified_at: Optional[datetime]
    created_at: datetime
    
    class Config:
        from_attributes = True


class BuyoutCalculation(BaseModel):
    """Schema for buyout calculation request"""
    current_monthly_salary: Decimal = Field(..., ge=0)
    notice_period_days: int = Field(..., ge=0, le=365)


class BuyoutCalculationResponse(BaseModel):
    """Schema for buyout calculation response"""
    buyout_amount: Decimal
    notice_period_days: int
    monthly_salary: Decimal
    daily_salary: Decimal
