from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.api.auth import get_current_user
from app.models import User, NBFCPartner, UserType
from app.schemas.nbfc import NBFCCreate, NBFCUpdate, NBFCResponse

router = APIRouter(prefix="/nbfc", tags=["NBFC Partners"])


@router.post("/profile", response_model=NBFCResponse, status_code=status.HTTP_201_CREATED)
async def create_nbfc_profile(
    nbfc_data: NBFCCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Create NBFC profile"""
    if current_user.user_type != UserType.NBFC:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only NBFC users can create NBFC profiles"
        )
    
    # Check if profile already exists
    result = await db.execute(
        select(NBFCPartner).where(NBFCPartner.user_id == current_user.id)
    )
    existing_profile = result.scalar_one_or_none()
    
    if existing_profile:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="NBFC profile already exists"
        )
    
    # Create profile
    nbfc = NBFCPartner(
        user_id=current_user.id,
        **nbfc_data.model_dump()
    )
    
    db.add(nbfc)
    await db.commit()
    await db.refresh(nbfc)
    
    return NBFCResponse.model_validate(nbfc)


@router.get("/profile", response_model=NBFCResponse)
async def get_nbfc_profile(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get NBFC profile"""
    if current_user.user_type != UserType.NBFC:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only NBFC users can access NBFC profiles"
        )
    
    result = await db.execute(
        select(NBFCPartner).where(NBFCPartner.user_id == current_user.id)
    )
    nbfc = result.scalar_one_or_none()
    
    if not nbfc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="NBFC profile not found"
        )
    
    return NBFCResponse.model_validate(nbfc)


@router.put("/profile", response_model=NBFCResponse)
async def update_nbfc_profile(
    nbfc_data: NBFCUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Update NBFC profile"""
    if current_user.user_type != UserType.NBFC:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only NBFC users can update NBFC profiles"
        )
    
    result = await db.execute(
        select(NBFCPartner).where(NBFCPartner.user_id == current_user.id)
    )
    nbfc = result.scalar_one_or_none()
    
    if not nbfc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="NBFC profile not found"
        )
    
    # Update fields
    update_data = nbfc_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(nbfc, field, value)
    
    await db.commit()
    await db.refresh(nbfc)
    
    return NBFCResponse.model_validate(nbfc)
