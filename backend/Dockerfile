# Use official lightweight Python image
FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Create a non-privileged user for security
RUN useradd -m celeryuser && chown -R celeryuser /app

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the code
COPY . .

# Switch to the non-privileged user
USER celeryuser

# Set PYTHONPATH
ENV PYTHONPATH=/app