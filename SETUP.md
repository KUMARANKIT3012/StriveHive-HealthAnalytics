# 🚀 Strive Hive - Quick Setup Guide

This guide will help you get the Strive Hive Health Analytics Dashboard running quickly after cloning from GitHub.

## 📋 Prerequisites

- **Python 3.8+** (Required for the enhanced backend server)
- **Java 11+** (Optional - only needed for Spring Boot backend)
- **Modern Web Browser** (Chrome, Firefox, Safari, Edge)

## ⚡ Quick Start (3 Steps)

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/ProjectStriveHive.git
cd ProjectStriveHive
```

### Step 2: Start the Enhanced Python Backend
**Windows:**
```batch
# Double-click start_backend.bat or run:
start_backend.bat
```

**Linux/Mac:**
```bash
# Make executable and run:
chmod +x start_backend.sh
./start_backend.sh

# Or run directly:
python enhanced_backend_server.py
```

**Manual Start:**
```bash
python enhanced_backend_server.py
```

### Step 3: Open the Frontend
**Option A - Simple (Double-click):**
- Open `frontend/index.html` in your web browser

**Option B - Local Server (Recommended):**
```bash
cd frontend
python -m http.server 3000
# Then open: http://localhost:3000
```

## ✅ Verify Everything Works

1. **Backend Health Check:**
   - Visit: http://localhost:8081/api/health
   - Should show: `{"status": "healthy", "timestamp": "..."}`

2. **Frontend Dashboard:**
   - Visit: http://localhost:3000 (if using local server)
   - Or open `frontend/index.html` directly
   - Navigate to "REPORTS" tab
   - You should see:
     - 🏥 Health Analytics Dashboard header with logo
     - 📊 Perfect circular pie chart (47 sessions)
     - 📈 Activity distribution with real data

3. **API Endpoints Test:**
   ```bash
   # Health check
   curl http://localhost:8081/api/health
   
   # Weekly report
   curl http://localhost:8081/api/reports/1/week
   ```

## 🔧 Troubleshooting

### Python Backend Issues
- **"Python not found"**: Install Python 3.8+ from python.org
- **Port 8081 busy**: Change port in `enhanced_backend_server.py` line 686
- **Permission errors**: Run as administrator (Windows) or with sudo (Linux/Mac)

### Frontend Issues
- **CORS errors**: Use local server (`python -m http.server 3000`) instead of file://
- **Charts not loading**: Ensure backend is running on port 8081
- **Blank sections**: Check browser console for errors

### API Testing
```bash
# Test all endpoints:
curl http://localhost:8081/api/health
curl http://localhost:8081/api/reports/1/week  
curl http://localhost:8081/api/reports/1/month
curl http://localhost:8081/api/reports/1/year
```

## 📊 What You'll See

### Health Analytics Dashboard
- **Professional Logo**: Medical cross with analytics elements
- **Live Monitoring**: Real-time status indicators
- **Activity Distribution**: Perfect pie chart showing:
  - 🏃‍♂️ Running: 45% (21 sessions)
  - 🏋️‍♂️ Strength: 30% (14 sessions)
  - 🚴‍♂️ Cycling: 15% (7 sessions)
  - 🏊‍♂️ Other: 10% (5 sessions)

### Backend API Features
- **Reports Generation**: Weekly/Monthly/Yearly analytics
- **Export Functions**: PDF, CSV, JSON formats
- **Health Scoring**: Advanced fitness metrics
- **Trend Analysis**: Performance tracking over time

## 🌐 Deployment

### Local Development
- Backend: http://localhost:8081
- Frontend: http://localhost:3000

### Production Ready
- The Python backend is production-ready
- Add SSL/HTTPS for production deployment
- Consider using nginx as reverse proxy
- Database can be switched from in-memory to persistent

## 📝 File Structure
```
ProjectStriveHive/
├── 🐍 enhanced_backend_server.py  # Main backend server (PORT 8081)
├── 🚀 start_backend.bat/.sh       # Easy startup scripts
├── 📋 requirements.txt            # Python dependencies (none needed!)
├── 📖 SETUP.md                   # This file
├── frontend/                     # Web application
│   ├── index.html               # Main dashboard
│   ├── css/styles.css          # Professional styling
│   └── js/app.js               # Application logic
└── backend/                     # Java Spring Boot (optional)
```

## 🎯 Next Steps

1. **Customize Data**: Edit sample data in `enhanced_backend_server.py`
2. **Add Features**: Extend the API with new endpoints
3. **Deploy**: Host on cloud platform (Heroku, AWS, etc.)
4. **Database**: Connect to PostgreSQL/MySQL for persistence
5. **Authentication**: Add user login/registration system

## 💬 Support

- **Issues**: Create GitHub issue
- **Documentation**: See main README.md
- **API Reference**: Check `enhanced_backend_server.py` comments

---

**🏥 Strive Hive Health Analytics Dashboard**  
*Professional Fitness Intelligence & Performance Insights*