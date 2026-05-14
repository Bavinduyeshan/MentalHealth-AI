from fastapi import APIRouter, HTTPException
from app.schemas.prediction import StudentInput
from app.ml.prediction_service import run_prediction

router = APIRouter()

@router.post("/predict")
async def predict_mental_health(student: StudentInput):
    try:
        result = run_prediction(student.model_dump())
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")