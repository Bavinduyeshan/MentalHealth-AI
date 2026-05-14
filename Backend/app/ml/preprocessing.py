import logging
import pandas as pd
from typing import Any, Dict, List

logger = logging.getLogger(__name__)

def _find_col(cols: List[str], keyword: str) -> str | None:
    for c in cols:
        if keyword.lower() in c.lower():
            return c
    return None

def encode_input(
        raw: Dict[str, Any],
        cat_encoders: Dict[str, Any],
        feature_list: List[str],
) -> pd.DataFrame:
    """Preprocess input exactly as done in the notebook"""
    df = pd.DataFrame([raw])

    # Encode categorical features
    for col, le in cat_encoders.items():
        if col in df.columns:
            try:
                df[col] = le.transform(df[col].astype(str))
            except ValueError:
                logger.warning(f"Unseen category in {col}: {df[col].iloc[0]}. Using 0.")
                df[col] = 0

    # Feature Engineering (must match notebook)
    sleep_col = _find_col(df.columns.tolist(), "sleep")
    screen_col = _find_col(df.columns.tolist(), "screen")
    study_col = _find_col(df.columns.tolist(), "study")
    gpa_col = _find_col(df.columns.tolist(), "gpa")

    if sleep_col and screen_col:
        df["sleep_screen_ratio"] = df[sleep_col] / (df[screen_col] + 0.1)
    if study_col and gpa_col:
        df["study_gpa_interact"] = df[study_col] * df[gpa_col]
    if sleep_col:
        df["sleep_deficit"] = (8 - df[sleep_col]).clip(lower=0)

    # Align to training features
    for col in feature_list:
        if col not in df.columns:
            df[col] = 0

    return df[feature_list].fillna(0)