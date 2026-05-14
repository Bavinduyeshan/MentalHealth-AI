import os
import logging
from pathlib import Path
from typing import Any, Dict
import joblib

logger = logging.getLogger(__name__)

_PROJECT_ROOT = Path(__file__).resolve().parents[2]
MODELS_DIR = Path(os.getenv("MODELS_DIR", _PROJECT_ROOT / "models")).resolve()

class _ModelStore:
    clf_model = None
    clf_scaler = None
    clf_label_encoders: Dict = {}
    clf_cat_encoders: Dict = {}
    clf_features: list = []

    reg_model = None
    reg_scaler = None
    reg_cat_encoders: Dict = {}
    reg_features: list = []

    _loaded: bool = False


def _load_pkl(filename: str) -> Any:
    path = MODELS_DIR / filename
    if not path.exists():
        logger.error(f"❌ Model file not found: {path}")
        raise FileNotFoundError(f"Critical model missing: {filename}")
    logger.info(f"✅ Loaded {filename}")
    return joblib.load(path)


class ModelManager:
    @classmethod
    def load(cls) -> None:
        if _ModelStore._loaded:
            return

        logger.info(f"Loading models from: {MODELS_DIR}")

        _ModelStore.clf_model = _load_pkl("clf_model.pkl")
        _ModelStore.clf_scaler = _load_pkl("clf_scaler.pkl")
        _ModelStore.clf_label_encoders = _load_pkl("clf_label_encoders.pkl")
        _ModelStore.clf_cat_encoders = _load_pkl("clf_cat_encoders.pkl")
        _ModelStore.clf_features = _load_pkl("clf_features.pkl")

        _ModelStore.reg_model = _load_pkl("reg_model.pkl")
        _ModelStore.reg_scaler = _load_pkl("reg_scaler.pkl")
        _ModelStore.reg_cat_encoders = _load_pkl("reg_cat_encoders.pkl")
        _ModelStore.reg_features = _load_pkl("reg_features.pkl")

        _ModelStore._loaded = True
        logger.info("🎉 All ML artefacts loaded successfully!")

    @classmethod
    def get_clf(cls):
        cls._assert_loaded()
        return (
            _ModelStore.clf_model,
            _ModelStore.clf_scaler,
            _ModelStore.clf_label_encoders,
            _ModelStore.clf_cat_encoders,
            _ModelStore.clf_features,
        )

    @classmethod
    def get_reg(cls):
        cls._assert_loaded()
        return (
            _ModelStore.reg_model,
            _ModelStore.reg_scaler,
            _ModelStore.reg_cat_encoders,
            _ModelStore.reg_features,
        )

    @classmethod
    def is_loaded(cls) -> bool:
        return _ModelStore._loaded

    @classmethod
    def _assert_loaded(cls):
        if not _ModelStore._loaded:
            raise RuntimeError("Models not loaded. Call ModelManager.load() first.")