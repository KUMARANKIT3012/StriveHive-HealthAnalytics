#!/bin/bash
# Strive Hive Backend Startup Script

echo "🏥 Starting Strive Hive Health Analytics Backend..."
echo "📊 Enhanced Python Server with Reports API"
echo ""

# Check if Python is installed
if ! command -v python &> /dev/null; then
    echo "❌ Error: Python is not installed or not in PATH"
    echo "Please install Python 3.8+ and try again"
    exit 1
fi

# Check Python version
python_version=$(python --version 2>&1 | grep -oP '\d+\.\d+')
echo "🐍 Python version: $(python --version)"

# Start the enhanced backend server
echo "🚀 Starting Enhanced Backend Server on http://localhost:8081"
echo "📈 Health Analytics Dashboard API will be available"
echo ""
echo "Available endpoints:"
echo "  - GET /api/health (health check)"
echo "  - GET /api/reports/{userId}/week"
echo "  - GET /api/reports/{userId}/month"
echo "  - GET /api/reports/{userId}/year"
echo "  - GET /api/reports/{userId}/export/pdf"
echo "  - GET /api/reports/{userId}/share"
echo "  - GET /api/reports/{userId}/trends"
echo ""
echo "💡 Press Ctrl+C to stop the server"
echo "=========================================="

python enhanced_backend_server.py