#!/bin/bash

# Test script for 90toZero Backend API

echo "🧪 Testing 90toZero Backend API"
echo "================================"

API_URL="http://localhost:8000"

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Test 1: Health Check
echo -e "\n1️⃣  Testing Health Check..."
response=$(curl -s -o /dev/null -w "%{http_code}" ${API_URL}/health)
if [ $response -eq 200 ]; then
    echo -e "${GREEN}✅ Health check passed${NC}"
else
    echo -e "${RED}❌ Health check failed (HTTP ${response})${NC}"
fi

# Test 2: Root Endpoint
echo -e "\n2️⃣  Testing Root Endpoint..."
response=$(curl -s -o /dev/null -w "%{http_code}" ${API_URL}/)
if [ $response -eq 200 ]; then
    echo -e "${GREEN}✅ Root endpoint passed${NC}"
else
    echo -e "${RED}❌ Root endpoint failed (HTTP ${response})${NC}"
fi

# Test 3: API Docs
echo -e "\n3️⃣  Testing API Documentation..."
response=$(curl -s -o /dev/null -w "%{http_code}" ${API_URL}/docs)
if [ $response -eq 200 ]; then
    echo -e "${GREEN}✅ API docs accessible${NC}"
else
    echo -e "${RED}❌ API docs failed (HTTP ${response})${NC}"
fi

# Test 4: Register Candidate
echo -e "\n4️⃣  Testing Candidate Registration..."
register_response=$(curl -s -X POST ${API_URL}/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test.candidate@example.com",
    "password": "TestPass123",
    "user_type": "candidate"
  }')

if echo "$register_response" | grep -q "access_token"; then
    echo -e "${GREEN}✅ Candidate registration passed${NC}"
    ACCESS_TOKEN=$(echo $register_response | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)
    echo "   Token: ${ACCESS_TOKEN:0:20}..."
else
    echo -e "${RED}❌ Candidate registration failed${NC}"
    echo "   Response: $register_response"
fi

# Test 5: Login
echo -e "\n5️⃣  Testing Login..."
login_response=$(curl -s -X POST ${API_URL}/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test.candidate@example.com",
    "password": "TestPass123"
  }')

if echo "$login_response" | grep -q "access_token"; then
    echo -e "${GREEN}✅ Login passed${NC}"
else
    echo -e "${RED}❌ Login failed${NC}"
fi

# Test 6: Buyout Calculator
echo -e "\n6️⃣  Testing Buyout Calculator..."
calc_response=$(curl -s -X POST ${API_URL}/api/v1/candidates/calculate-buyout \
  -H "Content-Type: application/json" \
  -d '{
    "current_monthly_salary": 100000,
    "notice_period_days": 90
  }')

if echo "$calc_response" | grep -q "buyout_amount"; then
    echo -e "${GREEN}✅ Buyout calculator passed${NC}"
    echo "   Response: $calc_response"
else
    echo -e "${RED}❌ Buyout calculator failed${NC}"
fi

echo -e "\n================================"
echo "✨ Tests completed!"
