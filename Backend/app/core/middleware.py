from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import time
import logging

logger = logging.getLogger(__name__)

def setup_middleware(app: FastAPI):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],           # Change to your frontend URL in production
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.middleware("http")
    async def log_requests(request, call_next):
        start = time.time()
        response = await call_next(request)
        duration = time.time() - start
        logger.info(f"{request.method} {request.url.path} - {duration:.3f}s - Status: {response.status_code}")
        return response