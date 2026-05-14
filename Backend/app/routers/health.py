from fastapi import APIRouter
from app.ml.model_manager import ModelManager

router = APIRouter()

@router.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "models_loaded": ModelManager.is_loaded(),
    }