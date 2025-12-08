from sqlalchemy import Column, String, DateTime, ForeignKey, Enum as SQLEnum, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
import enum
from app.core.database import Base


class CompanySize(str, enum.Enum):
    """Company size enumeration"""
    STARTUP = "startup"
    SMALL = "small"
    MEDIUM = "medium"
    LARGE = "large"
    ENTERPRISE = "enterprise"


class Company(Base):
    """Company profile model"""
    __tablename__ = "companies"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), unique=True, nullable=False)
    company_name = Column(String, nullable=False, index=True)
    industry = Column(String)
    size = Column(SQLEnum(CompanySize))
    gstin = Column(String, unique=True)
    cin = Column(String, unique=True)
    website = Column(String)
    address = Column(String)
    city = Column(String)
    state = Column(String)
    country = Column(String, default="India")
    phone = Column(String)
    verified_at = Column(DateTime(timezone=True))
    verification_documents = Column(JSON)  # Store document URLs/references
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationship
    user = relationship("User", backref="company", foreign_keys=[user_id])
