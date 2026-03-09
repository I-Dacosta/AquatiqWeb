#!/bin/bash

echo "🚀 Aquatiq Webshop Setup"
echo "========================"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from template..."
    cp .env.example .env.local
    echo "✅ .env.local created. Please edit it with your credentials."
    echo ""
else
    echo "✅ .env.local already exists"
    echo ""
fi

# Check if node_modules exists
if [ ! -d node_modules ]; then
    echo "📦 Installing dependencies..."
    pnpm install
    echo ""
else
    echo "✅ Dependencies already installed"
    echo ""
fi

echo "🔑 Next steps:"
echo ""
echo "1. Edit .env.local and add your credentials:"
echo "   - DATABASE_URI (MongoDB connection string)"
echo "   - PAYLOAD_SECRET (generate a secure random string)"
echo "   - OPENAI_API_KEY (for AI search)"
echo "   - Optional: VISMA and SHOPIFY credentials"
echo ""
echo "2. Start MongoDB if running locally:"
echo "   mongod"
echo ""
echo "3. Run the development server:"
echo "   pnpm dev"
echo ""
echo "4. Access the application:"
echo "   - Shop: http://localhost:3000/shop"
echo "   - Admin: http://localhost:3000/admin"
echo ""
echo "5. Create your first admin user at /admin"
echo ""
echo "📚 Read SHOP_README.md for more detailed instructions"
echo ""
