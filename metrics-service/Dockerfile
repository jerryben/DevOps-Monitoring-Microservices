# Use an official Python runtime as a parent image
FROM python:3.9-slim as base

# Set the working directory to /app
WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Create a virtual environment for the application dependencies
RUN python -m venv /opt/venv

# Ensure the virtual environment is used
ENV PATH="/opt/venv/bin:$PATH"

# Copy the requirements file into the container
COPY requirements.txt .

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Use a minimal image for running the application
FROM python:3.9-slim

# Set the working directory to /app
WORKDIR /app

# Copy the virtual environment from the build stage
COPY --from=base /opt/venv /opt/venv

# Ensure the virtual environment is used
ENV PATH="/opt/venv/bin:$PATH"

# Copy the application code from the build stage
COPY --from=base /app /app

# Expose the port the app runs on
EXPOSE 8000

# Run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]