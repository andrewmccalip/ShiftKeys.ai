# ShiftKeys.ai Landing Page

A simple Flask-based landing page for ShiftKeys.ai with a download link.

## Local Development

1. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Run the Flask app:
   ```
   python app.py
   ```

3. Visit http://localhost:8080 in your browser.

## Docker Development

1. Build the Docker image:
   ```
   docker build -t shiftkeys-landing .
   ```

2. Run the Docker container:
   ```
   docker run -p 8080:8080 shiftkeys-landing
   ```

3. Visit http://localhost:8080 in your browser.

## Deploying to Google Cloud Run

1. Build and push the Docker image to Google Container Registry:
   ```
   gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/shiftkeys-landing
   ```

2. Deploy to Cloud Run:
   ```
   gcloud run deploy shiftkeys-landing --image gcr.io/YOUR_PROJECT_ID/shiftkeys-landing --platform managed
   ```

Replace `YOUR_PROJECT_ID` with your actual Google Cloud Project ID. 