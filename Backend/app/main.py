#
# """
# Mental Health Intelligence API
# NIBM | HND Software Engineering | ML for AI | Batch 25.1 FT
# """
#
# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from contextlib import asynccontextmanager
# import logging
#
# from app.routers import predict, health
# from app.ml.model_manager import ModelManager
#
# logging.basicConfig(
#     level=logging.INFO,
#     format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
# )
# logger = logging.getLogger(__name__)
#
#
# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     """Load ML models on startup, release on shutdown."""
#     logger.info("🚀 Starting Mental Health Intelligence API…")
#     ModelManager.load()
#     logger.info("✅ Models loaded successfully")
#     yield
#     logger.info("🛑 Shutting down API")
#
#
# app = FastAPI(
#     title="Mental Health Intelligence API",
#     description=(
#         "Production-grade FastAPI backend for the Mental Health & Lifestyle "
#         "Intelligence System. Provides multi-output classification (Depression "
#         "Status, Stress Level, Anxiety Risk, MH Category) and multi-output "
#         "regression (MH Score, Sleep Quality, Productivity Impact, Stress "
#         "Severity, Social Isolation Score) powered by trained Random Forest / "
#         "XGBoost / Gradient Boosting models."
#     ),
#     version="1.0.0",
#     docs_url="/docs",
#     redoc_url="/redoc",
#     lifespan=lifespan,
# )
#
# # ── CORS ─────────────────────────────────────────────────────────────────────
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],          # Tighten to your frontend domain in production
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
#
# # ── Routers ───────────────────────────────────────────────────────────────────
# app.include_router(health.router, prefix="/api/v1", tags=["Health"])
# app.include_router(predict.router, prefix="/api/v1", tags=["Prediction"])
#
#
# @app.get("/", tags=["Root"])
# async def root():
#     return {
#         "message": "Mental Health Intelligence API",
#         "version": "1.0.0",
#         "docs": "/docs",
#         "health": "/api/v1/health",
#     }



from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging
from pathlib import Path

from app.ml.model_manager import ModelManager
from app.routers import health, predict
from app.core.middleware import setup_middleware

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load ML models on startup"""
    logger.info("🚀 Starting Mental Health Intelligence API...")
    try:
        ModelManager.load()
        logger.info("✅ All models loaded successfully!")
    except Exception as e:
        logger.error(f"❌ Failed to load models: {e}")
        raise
    yield
    logger.info("🛑 Shutting down API")

app = FastAPI(
    title="Mental Health Intelligence API",
    description="Production-grade FastAPI backend for NIBM HND SE 25.1 FT - Mental Health & Lifestyle Intelligence System",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# Middleware
setup_middleware(app)

# Routers
app.include_router(health.router, prefix="/api/v1", tags=["Health"])
app.include_router(predict.router, prefix="/api/v1", tags=["Prediction"])

@app.get("/")
async def root():
    return {
        "message": "Mental Health Intelligence API",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs",
        "health": "/api/v1/health",
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)