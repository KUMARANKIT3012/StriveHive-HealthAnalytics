from http.server import HTTPServer, BaseHTTPRequestHandler
import json
from urllib.parse import urlparse, parse_qs
from datetime import datetime, date, timedelta
import uuid
from collections import defaultdict

class StriveHiveHandler(BaseHTTPRequestHandler):
    # Sample data storage (in a real app, this would be a database)
    users = [
        {
            "id": 1,
            "name": "John Doe",
            "email": "john.doe@example.com",
            "age": 28,
            "height": 175,  # cm
            "weight": 70,   # kg
            "weightGoal": 68,
            "calorieGoal": 2200,
            "fitnessLevel": "intermediate",
            "createdAt": "2024-01-01T00:00:00Z"
        }
    ]
    
    fitness_activities = [
        {
            "id": 1,
            "userId": 1,
            "activityType": "running",
            "duration": 30,
            "caloriesBurned": 300,
            "intensity": "medium",
            "recordedAt": "2024-10-01T07:00:00Z",
            "notes": "Morning run in the park"
        },
        {
            "id": 2,
            "userId": 1,
            "activityType": "cycling",
            "duration": 45,
            "caloriesBurned": 400,
            "intensity": "high",
            "recordedAt": "2024-10-01T18:00:00Z",
            "notes": "Evening bike ride"
        },
        {
            "id": 3,
            "userId": 1,
            "activityType": "swimming",
            "duration": 60,
            "caloriesBurned": 500,
            "intensity": "high",
            "recordedAt": "2024-09-30T19:00:00Z",
            "notes": "Pool swimming session"
        },
        {
            "id": 4,
            "userId": 1,
            "activityType": "weightlifting",
            "duration": 45,
            "caloriesBurned": 250,
            "intensity": "medium",
            "recordedAt": "2024-09-29T16:00:00Z",
            "notes": "Upper body workout"
        },
        {
            "id": 5,
            "userId": 1,
            "activityType": "yoga",
            "duration": 60,
            "caloriesBurned": 200,
            "intensity": "low",
            "recordedAt": "2024-09-28T08:00:00Z",
            "notes": "Morning yoga session"
        }
    ]
    
    nutrition_entries = [
        {
            "id": 1,
            "userId": 1,
            "foodName": "Chicken Salad",
            "calories": 350,
            "protein": 25,
            "carbs": 15,
            "fat": 12,
            "mealType": "lunch",
            "recordedAt": "2024-10-01T12:00:00Z"
        }
    ]
    
    def _set_headers(self, status_code=200):
        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
    
    def do_OPTIONS(self):
        self._set_headers()
    
    def do_GET(self):
        parsed_path = urlparse(self.path)
        path_parts = parsed_path.path.strip('/').split('/')
        
        try:
            if parsed_path.path == '/api/health':
                self._set_headers()
                response = {"status": "healthy", "timestamp": datetime.now().isoformat()}
            
            elif parsed_path.path == '/api/users':
                self._set_headers()
                response = {"users": self.users}
            
            elif parsed_path.path.startswith('/api/users/') and len(path_parts) == 3:
                user_id = int(path_parts[2])
                user = next((u for u in self.users if u['id'] == user_id), None)
                if user:
                    # Calculate BMI and health metrics
                    if user.get('height') and user.get('weight'):
                        height_m = user['height'] / 100
                        bmi = user['weight'] / (height_m ** 2)
                        user['bmi'] = round(bmi, 1)
                        
                        if bmi < 18.5:
                            user['healthStatus'] = 'underweight'
                        elif bmi < 25:
                            user['healthStatus'] = 'normal'
                        elif bmi < 30:
                            user['healthStatus'] = 'overweight'
                        else:
                            user['healthStatus'] = 'obese'
                    
                    self._set_headers()
                    response = {"user": user}
                else:
                    self._set_headers(404)
                    response = {"error": "User not found", "status": "error"}
            
            elif parsed_path.path == '/api/activities':
                query_params = parse_qs(parsed_path.query)
                user_id = query_params.get('userId', [None])[0]
                
                if user_id:
                    user_activities = [a for a in self.fitness_activities if a['userId'] == int(user_id)]
                else:
                    user_activities = self.fitness_activities
                
                self._set_headers()
                response = {"activities": user_activities}
            
            elif parsed_path.path == '/api/nutrition':
                query_params = parse_qs(parsed_path.query)
                user_id = query_params.get('userId', [None])[0]
                
                if user_id:
                    user_nutrition = [n for n in self.nutrition_entries if n['userId'] == int(user_id)]
                else:
                    user_nutrition = self.nutrition_entries
                
                self._set_headers()
                response = {"nutrition": user_nutrition}
            
            elif parsed_path.path.startswith('/api/analytics/') and len(path_parts) == 3:
                user_id = int(path_parts[2])
                user_activities = [a for a in self.fitness_activities if a['userId'] == user_id]
                user_nutrition = [n for n in self.nutrition_entries if n['userId'] == user_id]
                
                total_calories_burned = sum(a['caloriesBurned'] for a in user_activities)
                total_calories_consumed = sum(n['calories'] for n in user_nutrition)
                total_workouts = len(user_activities)
                avg_workout_duration = sum(a['duration'] for a in user_activities) / len(user_activities) if user_activities else 0
                
                self._set_headers()
                response = {
                    "userId": user_id,
                    "totalCaloriesBurned": total_calories_burned,
                    "totalCaloriesConsumed": total_calories_consumed,
                    "totalWorkouts": total_workouts,
                    "averageWorkoutDuration": round(avg_workout_duration, 1),
                    "netCalories": total_calories_consumed - total_calories_burned,
                    "period": "current_week"
                }
            
            # Reports endpoints
            elif parsed_path.path.startswith('/api/reports/') and len(path_parts) >= 4:
                try:
                    print(f"🔍 Processing reports endpoint: {parsed_path.path}")
                    print(f"📋 Path parts: {path_parts}")
                    
                    user_id = int(path_parts[2])
                    
                    if path_parts[3] in ['week', 'month', 'year']:
                        # Generate report for specific period
                        period = path_parts[3]
                        print(f"📊 Generating {period} report for user {user_id}")
                        response = self.generate_report(user_id, period)
                    elif path_parts[3] == 'export' and len(path_parts) == 5:
                        # Export report in specified format
                        export_format = path_parts[4]
                        print(f"📄 Exporting report as {export_format} for user {user_id}")
                        response = self.export_report(user_id, 'week', export_format)  # Default to week for now
                    elif path_parts[3] == 'share':
                        # Generate shareable report link
                        print(f"🔗 Generating share link for user {user_id}")
                        response = self.generate_share_link(user_id, 'week')  # Default to week for now
                    elif path_parts[3] == 'trends':
                        # Get fitness progress trends
                        print(f"📈 Getting trends for user {user_id}")
                        response = self.get_fitness_trends(user_id)
                    else:
                        print(f"❌ Invalid endpoint: {path_parts[3]}")
                        self._set_headers(400)
                        response = {"error": "Invalid report endpoint", "status": "error"}
                        
                except Exception as e:
                    print(f"❌ Error in reports endpoint: {str(e)}")
                    import traceback
                    traceback.print_exc()
                    self._set_headers(500)
                    response = {"error": f"Internal server error: {str(e)}", "status": "error"}
            
            else:
                self._set_headers()
                response = {
                    "message": "Strive Hive API - Enhanced Python Server", 
                    "version": "2.0.0", 
                    "status": "running",
                    "endpoints": [
                        "/api/health",
                        "/api/users",
                        "/api/users/{id}",
                        "/api/activities",
                        "/api/nutrition",
                        "/api/analytics/{userId}",
                        "/api/reports/{userId}/{period}",
                        "/api/reports/{userId}/export/{format}",
                        "/api/reports/{userId}/share",
                        "/api/reports/{userId}/trends"
                    ]
                }
            
            self.wfile.write(json.dumps(response, indent=2).encode())
            
        except Exception as e:
            self._set_headers(500)
            error_response = {"error": str(e), "status": "error"}
            self.wfile.write(json.dumps(error_response).encode())
    
    def generate_report(self, user_id, period):
        """Generate comprehensive health report for specified period"""
        # Calculate date range based on period
        today = datetime.now()
        if period == 'week':
            start_date = today - timedelta(days=7)
            period_name = "Weekly"
        elif period == 'month':
            start_date = today - timedelta(days=30)
            period_name = "Monthly"
        elif period == 'year':
            start_date = today - timedelta(days=365)
            period_name = "Yearly"
        else:
            start_date = today - timedelta(days=7)
            period_name = "Weekly"
        
        # Filter activities and nutrition for the period
        user_activities = [a for a in self.fitness_activities 
                          if a['userId'] == user_id and 
                          datetime.fromisoformat(a['recordedAt'].replace('Z', '+00:00')) >= start_date]
        
        user_nutrition = [n for n in self.nutrition_entries 
                         if n['userId'] == user_id and 
                         datetime.fromisoformat(n['recordedAt'].replace('Z', '+00:00')) >= start_date]
        
        # Calculate comprehensive statistics
        total_workouts = len(user_activities)
        total_calories_burned = sum(a['caloriesBurned'] for a in user_activities)
        total_calories_consumed = sum(n['calories'] for n in user_nutrition)
        total_workout_time = sum(a['duration'] for a in user_activities)
        
        # Activity breakdown
        activity_breakdown = {}
        for activity in user_activities:
            activity_type = activity['activityType']
            if activity_type not in activity_breakdown:
                activity_breakdown[activity_type] = {
                    'count': 0,
                    'totalCalories': 0,
                    'totalDuration': 0
                }
            activity_breakdown[activity_type]['count'] += 1
            activity_breakdown[activity_type]['totalCalories'] += activity['caloriesBurned']
            activity_breakdown[activity_type]['totalDuration'] += activity['duration']
        
        # Daily averages
        days_in_period = (today - start_date).days or 1
        avg_calories_burned_daily = total_calories_burned / days_in_period
        avg_calories_consumed_daily = total_calories_consumed / days_in_period
        avg_workout_duration = total_workout_time / total_workouts if total_workouts > 0 else 0
        
        # Progress metrics
        weekly_progress = self.calculate_weekly_progress(user_id, user_activities)
        
        self._set_headers()
        return {
            "reportId": f"report_{user_id}_{period}_{int(today.timestamp())}",
            "userId": user_id,
            "period": period_name,
            "dateRange": {
                "startDate": start_date.isoformat(),
                "endDate": today.isoformat()
            },
            "summary": {
                "totalWorkouts": total_workouts,
                "totalCaloriesBurned": total_calories_burned,
                "totalCaloriesConsumed": total_calories_consumed,
                "totalWorkoutTime": total_workout_time,
                "netCalories": total_calories_consumed - total_calories_burned,
                "averageWorkoutDuration": round(avg_workout_duration, 1)
            },
            "dailyAverages": {
                "caloriesBurned": round(avg_calories_burned_daily, 1),
                "caloriesConsumed": round(avg_calories_consumed_daily, 1),
                "workoutFrequency": round(total_workouts / days_in_period, 2)
            },
            "activityBreakdown": activity_breakdown,
            "weeklyProgress": weekly_progress,
            "healthScore": self.calculate_health_score(user_id, user_activities, user_nutrition),
            "recommendations": self.generate_recommendations(user_activities, user_nutrition),
            "chartData": self.generate_chart_data(user_activities, period),
            "generatedAt": today.isoformat()
        }

    def calculate_weekly_progress(self, user_id, activities):
        """Calculate weekly progress data for charts"""
        today = datetime.now()
        weekly_data = []
        
        for i in range(7):
            day = today - timedelta(days=6-i)
            day_activities = [a for a in activities 
                            if datetime.fromisoformat(a['recordedAt'].replace('Z', '+00:00')).date() == day.date()]
            
            daily_calories = sum(a['caloriesBurned'] for a in day_activities)
            daily_duration = sum(a['duration'] for a in day_activities)
            
            weekly_data.append({
                "date": day.strftime("%Y-%m-%d"),
                "dayName": day.strftime("%a"),
                "workouts": len(day_activities),
                "caloriesBurned": daily_calories,
                "totalDuration": daily_duration
            })
        
        return weekly_data

    def calculate_health_score(self, user_id, activities, nutrition):
        """Calculate overall health score based on activity and nutrition"""
        score = 0
        
        # Activity score (40% of total)
        if activities:
            avg_weekly_workouts = len(activities) / 4  # Assuming monthly data
            if avg_weekly_workouts >= 5:
                score += 40
            elif avg_weekly_workouts >= 3:
                score += 30
            elif avg_weekly_workouts >= 1:
                score += 20
            else:
                score += 10
        
        # Consistency score (30% of total)
        if len(activities) > 0:
            workout_days = set()
            for activity in activities:
                date = datetime.fromisoformat(activity['recordedAt'].replace('Z', '+00:00')).date()
                workout_days.add(date)
            
            consistency_ratio = len(workout_days) / 30
            score += min(30, consistency_ratio * 30)
        
        # Calorie balance score (30% of total)
        if activities and nutrition:
            total_burned = sum(a['caloriesBurned'] for a in activities)
            total_consumed = sum(n['calories'] for n in nutrition)
            
            if total_consumed > 0:
                balance_ratio = total_burned / total_consumed
                if 0.8 <= balance_ratio <= 1.2:
                    score += 30
                elif 0.6 <= balance_ratio <= 1.4:
                    score += 20
                else:
                    score += 10
        
        return min(100, max(0, round(score)))

    def generate_recommendations(self, activities, nutrition):
        """Generate personalized health recommendations"""
        recommendations = []
        
        if len(activities) == 0:
            recommendations.append({
                "type": "activity",
                "priority": "high",
                "title": "Start Your Fitness Journey",
                "description": "Begin with 20-30 minutes of light exercise 3 times per week.",
                "icon": "fa-running"
            })
        elif len(activities) < 3:
            recommendations.append({
                "type": "activity",
                "priority": "medium",
                "title": "Increase Workout Frequency",
                "description": "Aim for at least 3-4 workouts per week for optimal health benefits.",
                "icon": "fa-calendar-check"
            })
        
        # Check activity variety
        activity_types = set(a['activityType'] for a in activities)
        if len(activity_types) < 2:
            recommendations.append({
                "type": "variety",
                "priority": "medium",
                "title": "Add Exercise Variety",
                "description": "Include different types of exercises like cardio, strength, and flexibility training.",
                "icon": "fa-dumbbell"
            })
        
        # Check nutrition logging
        if len(nutrition) < 7:
            recommendations.append({
                "type": "nutrition",
                "priority": "medium",
                "title": "Track Your Nutrition",
                "description": "Regular nutrition tracking helps maintain a balanced diet and reach your goals.",
                "icon": "fa-apple-alt"
            })
        
        return recommendations

    def generate_chart_data(self, activities, period):
        """Generate data for various charts"""
        chart_data = {}
        
        # Activity type distribution (pie chart)
        activity_distribution = defaultdict(int)
        for activity in activities:
            activity_distribution[activity['activityType']] += 1
        
        chart_data['activityDistribution'] = [
            {"name": activity_type, "value": count}
            for activity_type, count in activity_distribution.items()
        ]
        
        # Calories burned over time (line chart)
        daily_calories = defaultdict(int)
        for activity in activities:
            date = datetime.fromisoformat(activity['recordedAt'].replace('Z', '+00:00')).date()
            daily_calories[date.isoformat()] += activity['caloriesBurned']
        
        chart_data['caloriesOverTime'] = [
            {"date": date, "calories": calories}
            for date, calories in sorted(daily_calories.items())
        ]
        
        # Workout intensity breakdown
        intensity_breakdown = defaultdict(int)
        for activity in activities:
            intensity_breakdown[activity.get('intensity', 'medium')] += 1
        
        chart_data['intensityBreakdown'] = [
            {"intensity": intensity, "count": count}
            for intensity, count in intensity_breakdown.items()
        ]
        
        return chart_data

    def export_report(self, user_id, export_format):
        """Generate export data for reports"""
        report_data = self.generate_report(user_id, 'month')
        
        if export_format == 'pdf':
            export_url = f"/downloads/report_{user_id}_{int(datetime.now().timestamp())}.pdf"
        elif export_format == 'csv':
            export_url = f"/downloads/report_{user_id}_{int(datetime.now().timestamp())}.csv"
        else:
            export_url = f"/downloads/report_{user_id}_{int(datetime.now().timestamp())}.json"
        
        self._set_headers()
        return {
            "exportFormat": export_format,
            "downloadUrl": export_url,
            "expiresAt": (datetime.now() + timedelta(hours=24)).isoformat(),
            "reportData": report_data if export_format == 'json' else None,
            "status": "ready"
        }

    def generate_share_link(self, user_id):
        """Generate shareable report link"""
        share_id = str(uuid.uuid4())[:8]
        share_url = f"/shared-reports/{share_id}"
        
        self._set_headers()
        return {
            "shareId": share_id,
            "shareUrl": f"https://strivehive.app{share_url}",
            "shortUrl": f"https://s.hive/{share_id}",
            "expiresAt": (datetime.now() + timedelta(days=7)).isoformat(),
            "accessLevel": "read-only",
            "status": "active"
        }

    def get_fitness_trends(self, user_id):
        """Get fitness progress trends and analytics"""
        today = datetime.now()
        start_date = today - timedelta(days=90)
        
        user_activities = [a for a in self.fitness_activities 
                          if a['userId'] == user_id and 
                          datetime.fromisoformat(a['recordedAt'].replace('Z', '+00:00')) >= start_date]
        
        # Monthly breakdown
        monthly_trends = {}
        for i in range(3):
            month_start = today - timedelta(days=30*(i+1))
            month_end = today - timedelta(days=30*i)
            
            month_activities = [a for a in user_activities 
                              if month_start <= datetime.fromisoformat(a['recordedAt'].replace('Z', '+00:00')) < month_end]
            
            month_key = month_start.strftime("%Y-%m")
            monthly_trends[month_key] = {
                "totalWorkouts": len(month_activities),
                "totalCalories": sum(a['caloriesBurned'] for a in month_activities),
                "totalDuration": sum(a['duration'] for a in month_activities),
                "averageIntensity": self.calculate_average_intensity(month_activities)
            }
        
        # Calculate trends
        trend_analysis = self.analyze_trends(monthly_trends)
        
        self._set_headers()
        return {
            "userId": user_id,
            "trendsData": monthly_trends,
            "trendAnalysis": trend_analysis,
            "progressScore": self.calculate_progress_score(monthly_trends),
            "weeklyPattern": self.analyze_weekly_pattern(user_activities),
            "peakPerformance": self.find_peak_performance(user_activities),
            "projections": self.calculate_projections(user_activities)
        }

    def calculate_average_intensity(self, activities):
        """Calculate average workout intensity"""
        if not activities:
            return 0
        
        intensity_map = {"low": 1, "moderate": 2, "medium": 2, "high": 3, "vigorous": 3}
        total_intensity = sum(intensity_map.get(a.get('intensity', 'medium').lower(), 2) for a in activities)
        return round(total_intensity / len(activities), 2)

    def analyze_trends(self, monthly_data):
        """Analyze fitness trends over time"""
        months = sorted(monthly_data.keys())
        if len(months) < 2:
            return {"trend": "insufficient_data"}
        
        first_month = monthly_data[months[0]]
        last_month = monthly_data[months[-1]]
        
        workout_change = last_month["totalWorkouts"] - first_month["totalWorkouts"]
        calorie_change = last_month["totalCalories"] - first_month["totalCalories"]
        
        workout_trend = "stable"
        calorie_trend = "stable"
        
        if workout_change > 2:
            workout_trend = "improving"
        elif workout_change < -2:
            workout_trend = "declining"
        
        if calorie_change > 100:
            calorie_trend = "improving"
        elif calorie_change < -100:
            calorie_trend = "declining"
        
        return {
            "workoutTrend": workout_trend,
            "calorieTrend": calorie_trend,
            "workoutChange": workout_change,
            "calorieChange": calorie_change,
            "overallTrend": "improving" if workout_trend == "improving" and calorie_trend == "improving" else "mixed"
        }

    def calculate_progress_score(self, monthly_data):
        """Calculate overall progress score"""
        if not monthly_data:
            return 0
        
        months = sorted(monthly_data.keys())
        total_score = 0
        
        for month_key in months:
            month_data = monthly_data[month_key]
            monthly_score = min(100, (month_data["totalWorkouts"] * 10) + (month_data["totalCalories"] / 10))
            total_score += monthly_score
        
        return round(total_score / len(months))

    def analyze_weekly_pattern(self, activities):
        """Analyze weekly workout patterns"""
        day_pattern = defaultdict(list)
        
        for activity in activities:
            date = datetime.fromisoformat(activity['recordedAt'].replace('Z', '+00:00'))
            day_name = date.strftime("%A")
            day_pattern[day_name].append(activity)
        
        pattern_analysis = {}
        for day, day_activities in day_pattern.items():
            pattern_analysis[day] = {
                "workoutCount": len(day_activities),
                "averageCalories": round(sum(a['caloriesBurned'] for a in day_activities) / len(day_activities)) if day_activities else 0,
                "averageDuration": round(sum(a['duration'] for a in day_activities) / len(day_activities)) if day_activities else 0
            }
        
        return pattern_analysis

    def find_peak_performance(self, activities):
        """Find user's peak performance metrics"""
        if not activities:
            return {}
        
        best_calorie_day = max(activities, key=lambda a: a['caloriesBurned'])
        longest_workout = max(activities, key=lambda a: a['duration'])
        
        return {
            "bestCalorieDay": {
                "date": best_calorie_day['recordedAt'],
                "calories": best_calorie_day['caloriesBurned'],
                "activity": best_calorie_day['activityType']
            },
            "longestWorkout": {
                "date": longest_workout['recordedAt'],
                "duration": longest_workout['duration'],
                "activity": longest_workout['activityType']
            }
        }

    def calculate_projections(self, activities):
        """Calculate future projections based on current trends"""
        if len(activities) < 7:
            return {"status": "insufficient_data"}
        
        # Calculate weekly averages
        recent_activities = activities[-14:]  # Last 2 weeks
        weekly_avg_calories = sum(a['caloriesBurned'] for a in recent_activities) / 2
        weekly_avg_workouts = len(recent_activities) / 2
        
        # Project next month
        monthly_projection = {
            "projectedCalories": round(weekly_avg_calories * 4),
            "projectedWorkouts": round(weekly_avg_workouts * 4),
            "confidence": "medium" if len(recent_activities) >= 10 else "low"
        }
        
        return monthly_projection

def run_server():
    server_address = ('localhost', 8081)
    httpd = HTTPServer(server_address, StriveHiveHandler)
    print(f"🚀 Enhanced Strive Hive Backend Server running on http://{server_address[0]}:{server_address[1]}")
    print("📊 Reports API endpoints available:")
    print("   - GET /api/reports/{userId}/week")
    print("   - GET /api/reports/{userId}/month") 
    print("   - GET /api/reports/{userId}/year")
    print("   - GET /api/reports/{userId}/export/pdf")
    print("   - GET /api/reports/{userId}/share")
    print("   - GET /api/reports/{userId}/trends")
    print("   - GET /api/health (health check)")
    print("\n💡 Press Ctrl+C to stop the server gracefully")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user.")
        print("🧹 Cleaning up...")
        httpd.server_close()
        print("✅ Server shutdown complete.")

if __name__ == '__main__':
    run_server()