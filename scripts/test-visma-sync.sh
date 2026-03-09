#!/bin/bash

# Visma → Payload Sync Test Script
# This script tests the complete sync workflow

set -e

echo "🚀 Visma → Payload Sync Test"
echo "==============================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
WEB_APP_URL="${WEB_APP_URL:-http://localhost:3000}"
VISMA_SERVICE_URL="${VISMA_SERVICE_URL:-http://localhost:5001}"
SYNC_SECRET="${SYNC_SECRET:-test-secret}"

# Step 1: Check Visma Service
echo "📡 Step 1: Checking Visma Service..."
if curl -s -f "${VISMA_SERVICE_URL}/health" > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Visma service is running"
else
    echo -e "${RED}✗${NC} Visma service is not responding"
    echo "   Please start the Visma service first:"
    echo "   cd /Volumes/Lagring/Aquatiq/Aquatiq\\ integrasjonen\\ /apps/visma_service"
    echo "   python app.py"
    exit 1
fi
echo ""

# Step 2: Check Web App
echo "🌐 Step 2: Checking Web Application..."
if curl -s -f "${WEB_APP_URL}/api/health" > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Web application is running"
else
    echo -e "${RED}✗${NC} Web application is not responding"
    echo "   Please start the web app first:"
    echo "   npm run dev"
    exit 1
fi
echo ""

# Step 3: Trigger Sync
echo "🔄 Step 3: Triggering product sync..."
SYNC_RESPONSE=$(curl -s -X POST "${WEB_APP_URL}/api/sync/visma" \
    -H "Authorization: Bearer ${SYNC_SECRET}" \
    -H "Content-Type: application/json")

if echo "$SYNC_RESPONSE" | grep -q '"success":true'; then
    echo -e "${GREEN}✓${NC} Sync completed successfully"
    
    # Extract stats if available
    CREATED=$(echo "$SYNC_RESPONSE" | grep -o '"created":[0-9]*' | grep -o '[0-9]*')
    UPDATED=$(echo "$SYNC_RESPONSE" | grep -o '"updated":[0-9]*' | grep -o '[0-9]*')
    SKIPPED=$(echo "$SYNC_RESPONSE" | grep -o '"skipped":[0-9]*' | grep -o '[0-9]*')
    
    echo "   📊 Stats:"
    echo "   - Created: ${CREATED:-0}"
    echo "   - Updated: ${UPDATED:-0}"
    echo "   - Skipped: ${SKIPPED:-0}"
else
    echo -e "${RED}✗${NC} Sync failed"
    echo "   Response: $SYNC_RESPONSE"
    exit 1
fi
echo ""

# Step 4: Check Products
echo "📦 Step 4: Checking products in Payload..."
PRODUCTS_RESPONSE=$(curl -s "${WEB_APP_URL}/api/products?limit=5")

if echo "$PRODUCTS_RESPONSE" | grep -q '"success":true'; then
    PRODUCT_COUNT=$(echo "$PRODUCTS_RESPONSE" | grep -o '"totalDocs":[0-9]*' | grep -o '[0-9]*')
    echo -e "${GREEN}✓${NC} Found ${PRODUCT_COUNT:-0} published products"
    
    if [ "${PRODUCT_COUNT:-0}" -eq 0 ]; then
        echo -e "${YELLOW}⚠${NC}  No published products yet"
        echo "   Products are created with status='draft'"
        echo "   Login to Payload admin to publish them:"
        echo "   ${WEB_APP_URL}/admin"
    fi
else
    echo -e "${YELLOW}⚠${NC}  Could not fetch products"
fi
echo ""

# Step 5: Instructions
echo "✅ Sync test complete!"
echo ""
echo "Next steps:"
echo "1. Login to Payload Admin:"
echo "   ${WEB_APP_URL}/admin"
echo ""
echo "2. Go to Products collection"
echo ""
echo "3. Edit a draft product:"
echo "   - Upload images"
echo "   - Add descriptions"
echo "   - Set status to 'Published'"
echo "   - Save"
echo ""
echo "4. View on website:"
echo "   ${WEB_APP_URL}/products"
echo ""
echo "📚 For more info, see:"
echo "   - VISMA_SYNC_GUIDE.md"
echo "   - ARCHITECTURE.md"
echo ""
