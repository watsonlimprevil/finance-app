# Finance App Rollback Procedure

## Purpose

This document describes the procedure for rolling back production to a previously known good release.

---

## Current Deployment Architecture

GitHub Repository
↓
GitHub Actions
↓
Build Images
↓
Push Images To GHCR
↓
VPS Pulls Images
↓
Run Containers

Images are versioned using:

- latest
- Git Commit SHA

Examples:

ghcr.io/watsonlimprevil/finance-backend:latest

ghcr.io/watsonlimprevil/finance-backend:30597d5a426d003068b5d67eb80dc91b78fe5dca

ghcr.io/watsonlimprevil/finance-frontend:latest

ghcr.io/watsonlimprevil/finance-frontend:30597d5a426d003068b5d67eb80dc91b78fe5dca

---

# Rollback Triggers

Perform a rollback when:

- Production deployment introduces critical bugs
- Backend returns 500 errors
- Frontend becomes unusable
- Database connectivity breaks after deployment
- Deployment verification fails
- Users report severe issues after a release

---

# Step 1: Find Previous Working Release

Navigate to:

GitHub
→ Packages
→ finance-backend

GitHub
→ Packages
→ finance-frontend

Locate the previous known-good SHA tag.

Example:

30597d5a426d003068b5d67eb80dc91b78fe5dca

or

d1bcd1081ddcb688a8c3419358062d358b07d626

---

# Step 2: Update docker-compose.yml

Current deployment:

backend:
image: ghcr.io/watsonlimprevil/finance-backend:latest

frontend:
image: ghcr.io/watsonlimprevil/finance-frontend:latest

Rollback deployment:

backend:
image: ghcr.io/watsonlimprevil/finance-backend:d1bcd1081ddcb688a8c3419358062d358b07d626

frontend:
image: ghcr.io/watsonlimprevil/finance-frontend:d1bcd1081ddcb688a8c3419358062d358b07d626

---

# Step 3: Pull Rollback Images

SSH into the VPS.

Run:

docker compose pull

---

# Step 4: Deploy Rollback Release

Run:

docker compose up -d

---

# Step 5: Verify Rollback

Check running containers:

docker ps

Verify frontend:

curl https://watsondev.co.uk

Verify backend:

curl https://watsondev.co.uk/api

---

# Expected Result

Production is restored using a previously tested image version.

No rebuild is required.

No new image push is required.

Rollback time should be less than 5 minutes.

---

# Recovery Philosophy

Build Once.
Deploy Many.

Images are immutable artifacts.

Production should never rebuild code during
