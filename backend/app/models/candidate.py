from sqlalchemy import Column, String, DateTime, ForeignKey, Integer, Numeric, Date, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
from app.core.database import Base


class Candidate(Base):
    """Candidate profile model"""
    __tablename__ = "candidates"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), unique=True, nullable=False)
    full_name = Column(String, nullable=False, index=True)
    phone = Column(String, nullable=False)
    date_of_birth = Column(Date)
    
    # Current employment details
    current_company = Column(String)
    current_designation = Column(String)
    current_ctc = Column(Numeric(12, 2))  # Annual CTC
    notice_period_days = Column(Integer)  # Notice period in days
    
    # Professional details
    skills = Column(JSON)  # Array of skills
    experience_years = Column(Numeric(4, 1))
    highest_education = Column(String)
    
    # Documents
    resume_url = Column(String)
    kyc_documents = Column(JSON)  # Store document URLs/references
    kyc_verified_at = Column(DateTime(timezone=True))
    
    # Preferences
    expected_ctc = Column(Numeric(12, 2))
    preferred_locations = Column(JSON)  # Array of locations
    job_type_preference = Column(String)  # full_time, contract, etc.
    open_to_buyout = Column(String, default="yes")
    
    # Address
    city = Column(String)
    state = Column(String)
    country = Column(String, default="India")
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationship
    user = relationship("User", backref="candidate", foreign_keys=[user_id])
