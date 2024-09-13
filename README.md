# Log Explosion Repro
1. Clone the project
2. Install dependencies with `npm install`
3. Build the project with `npm run build`
4. Create a GCP Account with enough credits to spin up a Cloud Run instance
4. Setup your [Google Cloud CLI](https://cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-nodejs-service)
5. Run `cd dist/pedro-yan && gcloud run deploy` and select `main.js` as the source code location
6. Follow the prompts to deploy the Cloud Run instance
   - Pick a region
   - 