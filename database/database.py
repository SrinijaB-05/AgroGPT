from pymongo import MongoClient
import certifi
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Get MongoDB connection string from .env
MONGO_URL = os.getenv("MONGO_URL")

if not MONGO_URL:
    raise ValueError("❌ MONGO_URL not found in .env file. Please check your configuration.")

# ✅ Use certifi to ensure SSL certificates are trusted
ca = certifi.where()

try:
    # Create MongoDB client with SSL/TLS enabled
    client = MongoClient(MONGO_URL, tls=True, tlsCAFile=ca)

    # Access your database
    db = client["agrogpt"]

    # Define collections
    users_collection = db["users"]
    reports_collection = db["reports"]

    print("✅ Connected to MongoDB successfully!")

except Exception as e:
    print("❌ MongoDB connection failed:", e)
