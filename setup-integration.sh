#!/bin/bash

# Visma → Shopify → Payload Integration Setup Script
# This script helps configure the integration components

set -e

echo "🚀 Visma → Shopify → Payload Integration Setup"
echo "=============================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Directories
BACKEND_DIR="/Volumes/Lagring/Aquatiq/Aquatiq integrasjonen"
WEBAPP_DIR="/Volumes/Lagring/aquatiq web/web-app"

echo "Step 1: Checking Prerequisites"
echo "------------------------------"

# Check if directories exist
if [ ! -d "$BACKEND_DIR" ]; then
  echo -e "${RED}✗ Backend directory not found: $BACKEND_DIR${NC}"
  exit 1
fi

if [ ! -d "$WEBAPP_DIR" ]; then
  echo -e "${RED}✗ Web app directory not found: $WEBAPP_DIR${NC}"
  exit 1
fi

echo -e "${GREEN}✓ Directories found${NC}"

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
  echo -e "${RED}✗ Python 3 not found${NC}"
  exit 1
fi
echo -e "${GREEN}✓ Python 3 installed${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
  echo -e "${RED}✗ Node.js not found${NC}"
  exit 1
fi
echo -e "${GREEN}✓ Node.js installed${NC}"

echo ""
echo "Step 2: Environment Configuration"
echo "----------------------------------"

# Check backend .env
if [ ! -f "$BACKEND_DIR/.env" ]; then
  echo -e "${YELLOW}⚠ Backend .env not found, creating from example...${NC}"
  if [ -f "$BACKEND_DIR/.env.example" ]; then
    cp "$BACKEND_DIR/.env.example" "$BACKEND_DIR/.env"
    echo -e "${GREEN}✓ Created $BACKEND_DIR/.env${NC}"
    echo -e "${YELLOW}! Please edit .env and add your Visma credentials${NC}"
  else
    echo -e "${RED}✗ .env.example not found${NC}"
  fi
else
  echo -e "${GREEN}✓ Backend .env exists${NC}"
fi

# Check web app .env.local
if [ ! -f "$WEBAPP_DIR/.env.local" ]; then
  echo -e "${YELLOW}⚠ Web app .env.local not found, creating from example...${NC}"
  if [ -f "$WEBAPP_DIR/.env.example" ]; then
    cp "$WEBAPP_DIR/.env.example" "$WEBAPP_DIR/.env.local"
    echo -e "${GREEN}✓ Created $WEBAPP_DIR/.env.local${NC}"
    echo -e "${YELLOW}! Please edit .env.local and add your credentials${NC}"
  else
    echo -e "${RED}✗ .env.example not found${NC}"
  fi
else
  echo -e "${GREEN}✓ Web app .env.local exists${NC}"
fi

echo ""
echo "Step 3: Database Check"
echo "----------------------"

# Check if PostgreSQL is running
if command -v psql &> /dev/null; then
  if psql -h localhost -U aquatiq -d aquatiq_dev -c '\q' 2>/dev/null; then
    echo -e "${GREEN}✓ PostgreSQL is accessible${NC}"
  else
    echo -e "${YELLOW}⚠ PostgreSQL not accessible (this is OK if using Docker)${NC}"
  fi
else
  echo -e "${YELLOW}⚠ psql not found (this is OK if using Docker)${NC}"
fi

echo ""
echo "Step 4: Install Dependencies"
echo "-----------------------------"

read -p "Install Python dependencies for Visma service? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  cd "$BACKEND_DIR/apps/visma_service"
  if [ -f "requirements.txt" ]; then
    echo "Installing Python packages..."
    pip install -r requirements.txt
    echo -e "${GREEN}✓ Python dependencies installed${NC}"
  else
    echo -e "${RED}✗ requirements.txt not found${NC}"
  fi
fi

read -p "Install Node.js dependencies for web app? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  cd "$WEBAPP_DIR"
  if [ -f "package.json" ]; then
    echo "Installing Node packages..."
    npm install
    echo -e "${GREEN}✓ Node dependencies installed${NC}"
  else
    echo -e "${RED}✗ package.json not found${NC}"
  fi
fi

echo ""
echo "Step 5: Verify Configuration"
echo "-----------------------------"

echo "Checking required environment variables..."

# Check backend env vars
MISSING_BACKEND=0
cd "$BACKEND_DIR"
if [ -f ".env" ]; then
  for VAR in VISMA_CLIENT_ID VISMA_CLIENT_SECRET VISMA_TENANT_ID SHOPIFY_STORE_DOMAIN SHOPIFY_ADMIN_API_KEY; do
    if ! grep -q "^$VAR=" .env || grep -q "^$VAR=your-" .env || grep -q "^$VAR=$" .env; then
      echo -e "${YELLOW}⚠ $VAR not configured in backend .env${NC}"
      MISSING_BACKEND=1
    fi
  done
  
  if [ $MISSING_BACKEND -eq 0 ]; then
    echo -e "${GREEN}✓ Backend environment variables configured${NC}"
  fi
else
  echo -e "${RED}✗ Backend .env file not found${NC}"
fi

# Check web app env vars
MISSING_WEBAPP=0
cd "$WEBAPP_DIR"
if [ -f ".env.local" ]; then
  for VAR in DATABASE_URI PAYLOAD_SECRET NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN VISMA_SERVICE_URL; do
    if ! grep -q "^$VAR=" .env.local || grep -q "^$VAR=your-" .env.local; then
      echo -e "${YELLOW}⚠ $VAR not configured in web app .env.local${NC}"
      MISSING_WEBAPP=1
    fi
  done
  
  if [ $MISSING_WEBAPP -eq 0 ]; then
    echo -e "${GREEN}✓ Web app environment variables configured${NC}"
  fi
else
  echo -e "${RED}✗ Web app .env.local file not found${NC}"
fi

echo ""
echo "=============================================="
echo "Setup Summary"
echo "=============================================="
echo ""

if [ $MISSING_BACKEND -eq 1 ]; then
  echo -e "${YELLOW}⚠ Backend environment needs configuration${NC}"
  echo "  Edit: $BACKEND_DIR/.env"
fi

if [ $MISSING_WEBAPP -eq 1 ]; then
  echo -e "${YELLOW}⚠ Web app environment needs configuration${NC}"
  echo "  Edit: $WEBAPP_DIR/.env.local"
fi

echo ""
echo "Next Steps:"
echo "1. Configure environment variables (see above)"
echo "2. Start Visma service: cd '$BACKEND_DIR/apps/visma_service' && python app.py"
echo "3. Start web app: cd '$WEBAPP_DIR' && npm run dev"
echo "4. Authenticate with Visma: http://localhost:5001/api/visma/auth-url"
echo "5. Trigger initial sync: http://localhost:3000/admin/sync"
echo ""
echo "Documentation:"
echo "  - Integration Guide: $WEBAPP_DIR/INTEGRATION_GUIDE.md"
echo "  - Architecture: $WEBAPP_DIR/ARCHITECTURE.md"
echo "  - Shop README: $WEBAPP_DIR/SHOP_README.md"
echo ""
echo -e "${GREEN}Setup complete! 🎉${NC}"
