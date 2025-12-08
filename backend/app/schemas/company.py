from pydantic import BaseModel, Field, HttpUrl
from typing import Optional, List
from datetime import datetime
from uuid import UUID
from app.models.company import CompanySize


class CompanyBase(BaseModel):
    """Base company schema"""
    company_name: str = Field(..., min_length=2, max_length=200)
    industry: Optional[str] = None
    size: Optional[CompanySize] = None
    website: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None


class CompanyCreate(CompanyBase):
    """Schema for company profile creation"""
    gstin: Optional[str] = Field(None, min_length=15, max_length=15)
    cin: Optional[str] = Field(None, min_length=21, max_length=21)


class CompanyUpdate(BaseModel):
    """Schema for company profile update"""
    company_name: Optional[str] = Field(None, min_length=2, max_length=200)
    industry: Optional[str] = None
    size: Optional[CompanySize] = None
    website: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    gstin: Optional[str] = None
    cin: Optional[str] = None


class CompanyResponse(CompanyBase):
    """Schema for company response"""
    id: UUID
    user_id: UUID
    gstin: Optional[str]
    cin: Optional[str]
    verified_at: Optional[datetime]
    created_at: datetime
    
    class Config:
        from_attributes = True
