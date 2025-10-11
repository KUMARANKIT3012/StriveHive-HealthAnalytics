# Spring Boot Development Reminder

## Python Backend Files Location
Python backend files have been moved to `.hidden_python_backup/` folder.

## To start Python backend for testing (if needed):
```bash
cd .hidden_python_backup
python enhanced_backend_server.py
```

## Spring Boot Backend Development
The Spring Boot backend should implement the same API endpoints:

### Required Endpoints:
- `GET /health` - Health check
- `GET /api/reports/data` - Get all reports data
- `GET /api/reports/export` - Export functionality
- `POST /api/reports/share` - Share functionality

### Port Configuration:
- Use port 8081 (same as Python backend)
- Frontend is already configured for port 8081

### File Structure:
```
backend/
├── src/main/java/com/strivehive/
│   ├── controller/ (create ReportsController here)
│   ├── service/ (create ReportsService here)
│   ├── model/ (create data models here)
│   └── StriveHiveApplication.java
```

This file can be deleted once Spring Boot development is complete.