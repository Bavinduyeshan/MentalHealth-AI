from pydantic import BaseModel, Field
from typing import Literal

class StudentInput(BaseModel):
    Age: int = Field(..., ge=17, le=30, description="Student age")
    Gender: Literal["Male", "Female", "Non-binary"]
    Sleep_Hours: float = Field(..., ge=3, le=10)
    Study_Hours: float = Field(..., ge=0, le=12)
    Screen_Time: float = Field(..., ge=0, le=12)
    Exercise_Frequency: Literal["None", "Low", "Moderate", "High"]
    Diet_Quality: Literal["Poor", "Fair", "Good", "Excellent"]
    Social_Interaction: Literal["Very Low", "Low", "Moderate", "High"]
    Academic_Pressure: Literal["Low", "Moderate", "High", "Very High"]
    Financial_Stress: Literal["None", "Low", "Moderate", "High"]
    Relationship_Status: Literal["Single", "In Relationship", "Complicated"]
    Living_Situation: Literal["With Family", "Hostel", "Alone", "With Friends"]
    Therapy: Literal["Yes", "No"]
    Medication: Literal["Yes", "No"]
    Substance_Use: Literal["Never", "Occasionally", "Regularly"]
    GPA: float = Field(..., ge=1.5, le=4.0)
    Year_of_Study: int = Field(..., ge=1, le=5)
    Family_History: Literal["Yes", "No"]