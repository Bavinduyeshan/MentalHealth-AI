import logging
from typing import Any, Dict

from app.ml.model_manager import ModelManager
from app.ml.preprocessing import encode_input

logger = logging.getLogger(__name__)

CLASS_TARGETS = ["Depression_Status", "Stress_Level", "Anxiety_Risk", "MH_Category"]
REG_TARGETS = [
    "MH_Score", "Sleep_Quality_Score", "Productivity_Impact",
    "Stress_Severity", "Social_Isolation_Score"
]

_RISK_LEVEL_MAP = {"Healthy": "Low", "At-Risk": "Moderate", "Critical": "High"}
_MH_CATEGORY_ICON = {"Healthy": "🟢", "At-Risk": "🟡", "Critical": "🔴"}

def _build_recommendations(mh_category: str) -> list[str]:
    risk = _RISK_LEVEL_MAP.get(mh_category, "Unknown")
    if risk == "Low":
        return ["Keep maintaining your healthy habits!", "Continue good sleep and exercise routine."]
    elif risk == "Moderate":
        return [
            "Consider reducing academic pressure.",
            "Increase physical activity to 30+ min/day.",
            "Aim for 7–9 hours of sleep.",
        ]
    else:
        return [
            "High risk detected — please seek professional help.",
            "Contact a counsellor or mental health service.",
            "Reduce screen time and practice mindfulness.",
        ]

def run_prediction(raw_input: Dict[str, Any]) -> Dict[str, Any]:
    clf_model, clf_scaler, clf_label_encoders, clf_cat_encoders, clf_features = ModelManager.get_clf()
    reg_model, reg_scaler, reg_cat_encoders, reg_features = ModelManager.get_reg()

    # Classification
    X_clf = clf_scaler.transform(encode_input(raw_input, clf_cat_encoders, clf_features))
    clf_pred = clf_model.predict(X_clf)[0]

    clf_labels = {
        col: clf_label_encoders[col].inverse_transform([pred])[0]
        for col, pred in zip(CLASS_TARGETS, clf_pred)
    }

    # Regression
    X_reg = reg_scaler.transform(encode_input(raw_input, reg_cat_encoders, reg_features))
    reg_pred = reg_model.predict(X_reg)[0]

    reg_scores = {col: round(float(val), 2) for col, val in zip(REG_TARGETS, reg_pred)}

    mh_category = clf_labels["MH_Category"]
    risk_level = _RISK_LEVEL_MAP.get(mh_category, "Unknown")
    icon = _MH_CATEGORY_ICON.get(mh_category, "⚪")

    return {
        "classification": clf_labels,
        "regression": reg_scores,
        "summary": {
            "mh_category": mh_category,
            "mh_category_icon": icon,
            "risk_level": risk_level,
            "mh_score": reg_scores["MH_Score"],
        },
        "recommendations": _build_recommendations(mh_category),
    }