import requests
import json
import time

BASE_URL = "https://revamp-ai.onrender.com/api/v1"

print("Logging in to demo account...")
r = requests.post(f"{BASE_URL}/auth/login", json={"email": "demo@domain.com", "password": "demo"})
if r.status_code != 200:
    print("Login failed, trying to register...")
    requests.post(f"{BASE_URL}/auth/register", json={"email": "demo@domain.com", "password": "demo", "full_name": "Demo User"})
    r = requests.post(f"{BASE_URL}/auth/login", json={"email": "demo@domain.com", "password": "demo"})

token = r.json()["access_token"]
headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

print("Creating Project 1...")
r1 = requests.post(f"{BASE_URL}/projects", headers=headers, json={
    "name": "Global Threat Landscape Q4",
    "description": "Comprehensive analysis of emerging APT activities across financial sectors.",
    "project_type": "advisory"
})
p1 = r1.json()
print("Project 1:", p1.get('id'))

print("Creating Project 2...")
r2 = requests.post(f"{BASE_URL}/projects", headers=headers, json={
    "name": "Zero-Day Vulnerability Advisory",
    "description": "Immediate advisory on CVE-2026-9999 for internal security teams.",
    "project_type": "technical"
})
p2 = r2.json()

# Create dummy transformations for Project 1
print("Creating dummy transformation...")
requests.post(f"{BASE_URL}/transformations", headers=headers, json={
    "project_id": p1.get("id"),
    "name": "Executive Summary for CISO",
    "source_type": "text",
    "source_content": "Extensive 50 page technical report about threat actors...",
    "target_format": "executive_summary",
    "target_audience": "c-level",
    "tone": "professional",
    "language": "English"
})

# Complete a dummy job if possible? Can't really easily fake a job completion unless I hit internal APIs.
# We will just leave them as 'pending' or whatever the default is.

print("Demo data seeded successfully!")
