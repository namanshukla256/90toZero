from sqlalchemy import Column, String, DateTime, ForeignKey, Numeric
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
from app.core.database import Base


class NBFCPartner(Base):
    """NBFC Partner profile model"""
    __tablename__ = "nbfc_partners"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), unique=True, nullable=False)
    nbfc_name = Column(String, nullable=False, index=True)
    license_number = Column(String, unique=True, nullable=False)
    website = Column(String)
    
    # Contact details
    contact_person = Column(String)
    phone = Column(String)
    address = Column(String)
    city = Column(String)
    state = Column(String)
    country = Column(String, default="India")
    
    # Loan product configuration
    interest_rate_min = Column(Numeric(5, 2))  # e.g., 10.50%
    interest_rate_max = Column(Numeric(5, 2))  # e.g., 18.00%
    max_loan_amount = Column(Numeric(12, 2))
    min_loan_amount = Column(Numeric(12, 2))
    max_tenure_months = Column(String, default="24")
    min_tenure_months = Column(String, default="6")
    
    # Verification
    verified_at = Column(DateTime(timezone=True))
    is_active = Column(String, default="yes")
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationship
    user = relationship("User", backref="nbfc_partner", foreign_keys=[user_id])
