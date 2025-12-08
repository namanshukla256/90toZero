from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from uuid import UUID
from decimal import Decimal


class NBFCBase(BaseModel):
    """Base NBFC schema"""
    nbfc_name: str = Field(..., min_length=2, max_length=200)
    license_number: str = Field(..., min_length=5, max_length=50)
    website: Optional[str] = None
    contact_person: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None


class NBFCCreate(NBFCBase):
    """Schema for NBFC profile creation"""
    interest_rate_min: Optional[Decimal] = Field(None, ge=0, le=100)
    interest_rate_max: Optional[Decimal] = Field(None, ge=0, le=100)
    max_loan_amount: Optional[Decimal] = Field(None, ge=0)
    min_loan_amount: Optional[Decimal] = Field(None, ge=0)


class NBFCUpdate(BaseModel):
    """Schema for NBFC profile update"""
    nbfc_name: Optional[str] = Field(None, min_length=2, max_length=200)
    website: Optional[str] = None
    contact_person: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    interest_rate_min: Optional[Decimal] = Field(None, ge=0, le=100)
    interest_rate_max: Optional[Decimal] = Field(None, ge=0, le=100)
    max_loan_amount: Optional[Decimal] = Field(None, ge=0)
    min_loan_amount: Optional[Decimal] = Field(None, ge=0)


class NBFCResponse(NBFCBase):
    """Schema for NBFC response"""
    id: UUID
    user_id: UUID
    interest_rate_min: Optional[Decimal]
    interest_rate_max: Optional[Decimal]
    max_loan_amount: Optional[Decimal]
    min_loan_amount: Optional[Decimal]
    verified_at: Optional[datetime]
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True
