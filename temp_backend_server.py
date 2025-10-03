from http.server import HTTPServer, BaseHTTPRequestHandler
import json
from urllib.parse import urlparse, parse_qs
from datetime import datetime, date
import uuid

class StriveHiveHandler(BaseHTT                    response = {"message": "Strive Hive API - Temporary Python Server", 
                    "version": "1.0.0", 
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
                }ler):
    # Sample data store (in memory)
    users = [
        {
            "id": 1,
            "name": "John Doe",
            "email": "john.doe@example.com",
            "age": 28,
            "height": 175.0,
            "weight": 70.0,
            "gender": "male",
            "activityLevel": "moderately_active",
            "fitnessGoal": "weight_loss",
            "weightGoal": 68.0,
            "calorieGoal": 2200,
            "createdAt": "2024-01-01T00:00:00Z",
            "updatedAt": "2024-01-16T10:30:00Z",
            "profileCompleted": True,
            "bmi": 22.9,
            "bmr": 1680,
            "healthStatus": "Normal"
        },
        {
            "id": 2,
            "name": "Jane Smith",
            "email": "jane.smith@example.com",
            "age": 25,
            "height": 165.0,
            "weight": 60.0,
            "gender": "female",
            "activityLevel": "active",
            "fitnessGoal": "maintain",
            "weightGoal": 58.0,
            "calorieGoal": 1800,
            "createdAt": "2024-01-02T00:00:00Z",
            "updatedAt": "2024-01-15T14:20:00Z",
            "profileCompleted": True,
            "bmi": 22.0,
            "bmr": 1320,
            "healthStatus": "Normal"
        }
    ]
    
    fitness_activities = [
        {
            "id": 1,
            "userId": 1,
            "activityName": "Running",
            "duration": 30,
            "caloriesBurned": 300,
            "date": "2024-01-15"
        },
        {
            "id": 2,
            "userId": 1,
            "activityName": "Weight Training",
            "duration": 45,
            "caloriesBurned": 250,
            "date": "2024-01-16"
        },
        {
            "id": 3,
            "userId": 2,
            "activityName": "Yoga",
            "duration": 60,
            "caloriesBurned": 180,
            "date": "2024-01-16"
        }
    ]
    
    nutrition_entries = [
        {
            "id": 1,
            "userId": 1,
            "foodName": "Oatmeal with Banana",
            "calories": 350,
            "protein": 12.0,
            "carbs": 65.0,
            "fat": 8.0,
            "mealType": "Breakfast",
            "date": "2024-01-16"
        },
        {
            "id": 2,
            "userId": 1,
            "foodName": "Grilled Chicken Salad",
            "calories": 450,
            "protein": 35.0,
            "carbs": 20.0,
            "fat": 25.0,
            "mealType": "Lunch",
            "date": "2024-01-16"
        },
        {
            "id": 3,
            "userId": 2,
            "foodName": "Greek Yogurt with Berries",
            "calories": 200,
            "protein": 15.0,
            "carbs": 25.0,
            "fat": 5.0,
            "mealType": "Snack",
            "date": "2024-01-16"
        }
    ]
    
    def _set_headers(self, status_code=200):
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json')
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
                response = {
                    "status": "UP", 
                    "database": "In-Memory H2", 
                    "timestamp": datetime.now().isoformat(),
                    "users": len(self.users),
                    "activities": len(self.fitness_activities),
                    "nutrition": len(self.nutrition_entries)
                }
            
            elif parsed_path.path == '/api/users':
                self._set_headers()
                response = self.users
            
            elif parsed_path.path.startswith('/api/users/') and len(path_parts) == 3:
                user_id = int(path_parts[2])
                user = next((u for u in self.users if u['id'] == user_id), None)
                if user:
                    self._set_headers()
                    response = user
                else:
                    self._set_headers(404)
                    response = {"error": "User not found", "status": "error"}
            
            elif parsed_path.path == '/api/activities':
                self._set_headers()
                # Filter by userId if provided
                query_params = parse_qs(parsed_path.query)
                user_id = query_params.get('userId', [None])[0]
                if user_id:
                    activities = [a for a in self.fitness_activities if a['userId'] == int(user_id)]
                    response = activities
                else:
                    response = self.fitness_activities
            
            elif parsed_path.path == '/api/nutrition':
                self._set_headers()
                # Filter by userId if provided
                query_params = parse_qs(parsed_path.query)
                user_id = query_params.get('userId', [None])[0]
                if user_id:
                    nutrition = [n for n in self.nutrition_entries if n['userId'] == int(user_id)]
                    response = nutrition
                else:
                    response = self.nutrition_entries
            
            elif parsed_path.path.startswith('/api/analytics/'):
                self._set_headers()
                user_id = int(path_parts[2]) if len(path_parts) > 2 else 1
                
                # Calculate analytics for user
                user_activities = [a for a in self.fitness_activities if a['userId'] == user_id]
                user_nutrition = [n for n in self.nutrition_entries if n['userId'] == user_id]
                
                total_calories_burned = sum(a['caloriesBurned'] for a in user_activities)
                total_calories_consumed = sum(n['calories'] for n in user_nutrition)
                total_workouts = len(user_activities)
                avg_workout_duration = sum(a['duration'] for a in user_activities) / len(user_activities) if user_activities else 0
                
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
                if path_parts[3] in ['week', 'month', 'year']:
                    # Generate report for specific period
                    user_id = int(path_parts[2])
                    period = path_parts[3]
                    response = self.generate_report(user_id, period)
                elif path_parts[3] == 'export' and len(path_parts) == 5:
                    # Export report in specified format
                    user_id = int(path_parts[2])
                    export_format = path_parts[4]
                    response = self.export_report(user_id, export_format)
                elif path_parts[3] == 'share':
                    # Generate shareable report link
                    user_id = int(path_parts[2])
                    response = self.generate_share_link(user_id)
                elif path_parts[3] == 'trends':
                    # Get fitness progress trends
                    user_id = int(path_parts[2])
                    response = self.get_fitness_trends(user_id)
                else:
                    self._set_headers(400)
                    response = {"error": "Invalid report endpoint", "status": "error"}
            
            else:
                self._set_headers()
                response = {
                    "message": "Strive Hive API - Temporary Python Server", 
                    "version": "1.0.0", 
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
    
    def do_POST(self):
        parsed_path = urlparse(self.path)
        content_length = int(self.headers.get('Content-Length', 0))
        
        try:
            post_data = json.loads(self.rfile.read(content_length).decode()) if content_length > 0 else {}
            
            if parsed_path.path == '/api/users':
                # Create new user
                new_id = max([u['id'] for u in self.users], default=0) + 1
                
                # Calculate BMI and BMR for new user
                height_m = post_data.get('height', 170) / 100
                weight = post_data.get('weight', 70)
                age = post_data.get('age', 25)
                gender = post_data.get('gender', 'male')
                
                # Calculate BMI
                bmi = round(weight / (height_m ** 2), 1) if height_m > 0 else 0
                
                # Calculate BMR using Mifflin-St Jeor Equation
                if gender.lower() == 'male':
                    bmr = round(10 * weight + 6.25 * (height_m * 100) - 5 * age + 5)
                else:
                    bmr = round(10 * weight + 6.25 * (height_m * 100) - 5 * age - 161)
                
                # Determine health status based on BMI
                if bmi < 18.5:
                    health_status = "Underweight"
                elif bmi < 25:
                    health_status = "Normal"
                elif bmi < 30:
                    health_status = "Overweight"
                else:
                    health_status = "Obese"
                
                new_user = {
                    **post_data,
                    'id': new_id,
                    'bmi': bmi,
                    'bmr': bmr,
                    'healthStatus': health_status,
                    'createdAt': datetime.now().isoformat() + 'Z',
                    'updatedAt': datetime.now().isoformat() + 'Z',
                    'profileCompleted': True
                }
                
                self.users.append(new_user)
                self._set_headers(201)
                response = new_user
                
            elif parsed_path.path == '/api/activities':
                # Create new activity
                new_id = max([a['id'] for a in self.fitness_activities], default=0) + 1
                new_activity = {**post_data, 'id': new_id, 'date': date.today().isoformat()}
                self.fitness_activities.append(new_activity)
                self._set_headers(201)
                response = new_activity
                
            elif parsed_path.path == '/api/nutrition':
                # Create new nutrition entry
                new_id = max([n['id'] for n in self.nutrition_entries], default=0) + 1
                new_nutrition = {**post_data, 'id': new_id, 'date': date.today().isoformat()}
                self.nutrition_entries.append(new_nutrition)
                self._set_headers(201)
                response = new_nutrition
                
            else:
                self._set_headers(400)
                response = {"error": "Invalid endpoint", "status": "error"}
            
            self.wfile.write(json.dumps(response, indent=2).encode())
            
        except Exception as e:
            self._set_headers(500)
            error_response = {"error": str(e), "status": "error"}
            self.wfile.write(json.dumps(error_response).encode())

    def do_PUT(self):
        parsed_path = urlparse(self.path)
        path_parts = parsed_path.path.strip('/').split('/')
        content_length = int(self.headers.get('Content-Length', 0))
        
        try:
            put_data = json.loads(self.rfile.read(content_length).decode()) if content_length > 0 else {}
            
            if parsed_path.path.startswith('/api/users/') and len(path_parts) == 3:
                # Update existing user
                user_id = int(path_parts[2])
                user_index = next((i for i, u in enumerate(self.users) if u['id'] == user_id), None)
                
                if user_index is not None:
                    # Calculate BMI and BMR
                    height_m = put_data.get('height', self.users[user_index]['height']) / 100
                    weight = put_data.get('weight', self.users[user_index]['weight'])
                    age = put_data.get('age', self.users[user_index]['age'])
                    gender = put_data.get('gender', self.users[user_index]['gender'])
                    
                    # Calculate BMI
                    bmi = round(weight / (height_m ** 2), 1) if height_m > 0 else 0
                    
                    # Calculate BMR using Mifflin-St Jeor Equation
                    if gender.lower() == 'male':
                        bmr = round(10 * weight + 6.25 * (height_m * 100) - 5 * age + 5)
                    else:
                        bmr = round(10 * weight + 6.25 * (height_m * 100) - 5 * age - 161)
                    
                    # Determine health status based on BMI
                    if bmi < 18.5:
                        health_status = "Underweight"
                    elif bmi < 25:
                        health_status = "Normal"
                    elif bmi < 30:
                        health_status = "Overweight"
                    else:
                        health_status = "Obese"
                    
                    # Update user data
                    updated_user = {
                        **self.users[user_index],
                        **put_data,
                        'id': user_id,
                        'bmi': bmi,
                        'bmr': bmr,
                        'healthStatus': health_status,
                        'updatedAt': datetime.now().isoformat() + 'Z',
                        'profileCompleted': True
                    }
                    
                    self.users[user_index] = updated_user
                    self._set_headers(200)
                    response = updated_user
                else:
                    self._set_headers(404)
                    response = {"error": "User not found", "status": "error"}
                    
            elif parsed_path.path.startswith('/api/activities/') and len(path_parts) == 3:
                # Update existing activity
                activity_id = int(path_parts[2])
                activity_index = next((i for i, a in enumerate(self.fitness_activities) if a['id'] == activity_id), None)
                
                if activity_index is not None:
                    updated_activity = {
                        **self.fitness_activities[activity_index],
                        **put_data,
                        'id': activity_id,
                        'updatedAt': datetime.now().isoformat()
                    }
                    self.fitness_activities[activity_index] = updated_activity
                    self._set_headers(200)
                    response = updated_activity
                else:
                    self._set_headers(404)
                    response = {"error": "Activity not found", "status": "error"}
                    
            elif parsed_path.path.startswith('/api/nutrition/') and len(path_parts) == 3:
                # Update existing nutrition entry
                nutrition_id = int(path_parts[2])
                nutrition_index = next((i for i, n in enumerate(self.nutrition_entries) if n['id'] == nutrition_id), None)
                
                if nutrition_index is not None:
                    updated_nutrition = {
                        **self.nutrition_entries[nutrition_index],
                        **put_data,
                        'id': nutrition_id,
                        'updatedAt': datetime.now().isoformat()
                    }
                    self.nutrition_entries[nutrition_index] = updated_nutrition
                    self._set_headers(200)
                    response = updated_nutrition
                else:
                    self._set_headers(404)
                    response = {"error": "Nutrition entry not found", "status": "error"}
            else:
                self._set_headers(400)
                response = {"error": "Invalid endpoint for PUT request", "status": "error"}
            
            self.wfile.write(json.dumps(response, indent=2).encode())
            
        except Exception as e:
            self._set_headers(500)
            error_response = {"error": str(e), "status": "error"}
            self.wfile.write(json.dumps(error_response).encode())

    def do_DELETE(self):
        parsed_path = urlparse(self.path)
        path_parts = parsed_path.path.strip('/').split('/')
        
        try:
            if parsed_path.path.startswith('/api/users/') and len(path_parts) == 3:
                # Delete user
                user_id = int(path_parts[2])
                user_index = next((i for i, u in enumerate(self.users) if u['id'] == user_id), None)
                
                if user_index is not None:
                    deleted_user = self.users.pop(user_index)
                    self._set_headers(200)
                    response = {"message": "User deleted successfully", "deletedUser": deleted_user}
                else:
                    self._set_headers(404)
                    response = {"error": "User not found", "status": "error"}
                    
            elif parsed_path.path.startswith('/api/activities/') and len(path_parts) == 3:
                # Delete activity
                activity_id = int(path_parts[2])
                activity_index = next((i for i, a in enumerate(self.fitness_activities) if a['id'] == activity_id), None)
                
                if activity_index is not None:
                    deleted_activity = self.fitness_activities.pop(activity_index)
                    self._set_headers(200)
                    response = {"message": "Activity deleted successfully", "deletedActivity": deleted_activity}
                else:
                    self._set_headers(404)
                    response = {"error": "Activity not found", "status": "error"}
                    
            elif parsed_path.path.startswith('/api/nutrition/') and len(path_parts) == 3:
                # Delete nutrition entry
                nutrition_id = int(path_parts[2])
                nutrition_index = next((i for i, n in enumerate(self.nutrition_entries) if n['id'] == nutrition_id), None)
                
                if nutrition_index is not None:
                    deleted_nutrition = self.nutrition_entries.pop(nutrition_index)
                    self._set_headers(200)
                    response = {"message": "Nutrition entry deleted successfully", "deletedNutrition": deleted_nutrition}
                else:
                    self._set_headers(404)
                    response = {"error": "Nutrition entry not found", "status": "error"}
            else:
                self._set_headers(400)
                response = {"error": "Invalid endpoint for DELETE request", "status": "error"}
            
            self.wfile.write(json.dumps(response, indent=2).encode())
            
        except Exception as e:
            self._set_headers(500)
            error_response = {"error": str(e), "status": "error"}
            self.wfile.write(json.dumps(error_response).encode())

    def generate_report(self, user_id, period):
        """Generate comprehensive health report for specified period"""
        from datetime import datetime, timedelta
        
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
            "generatedAt": today.isoformat()
        }
    
    def calculate_weekly_progress(self, user_id, activities):
        """Calculate weekly progress data for charts"""
        from datetime import datetime, timedelta
        
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
            # Check workout consistency over time
            workout_days = set()
            for activity in activities:
                date = datetime.fromisoformat(activity['recordedAt'].replace('Z', '+00:00')).date()
                workout_days.add(date)
            
            consistency_ratio = len(workout_days) / 30  # Days with workouts in last 30 days
            score += min(30, consistency_ratio * 30)
        
        # Calorie balance score (30% of total)
        if activities and nutrition:
            total_burned = sum(a['caloriesBurned'] for a in activities)
            total_consumed = sum(n['calories'] for n in nutrition)
            
            if total_consumed > 0:
                balance_ratio = total_burned / total_consumed
                if 0.8 <= balance_ratio <= 1.2:  # Good balance
                    score += 30
                elif 0.6 <= balance_ratio <= 1.4:  # Acceptable balance
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
    
    def export_report(self, user_id, export_format):
        """Generate export data for reports"""
        report_data = self.generate_report(user_id, 'month')
        
        if export_format == 'pdf':
            # In a real implementation, you'd generate a PDF here
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
            "reportData": report_data if export_format == 'json' else None
        }
    
    def generate_share_link(self, user_id):
        """Generate shareable report link"""
        from uuid import uuid4
        
        share_id = str(uuid4())[:8]
        share_url = f"/shared-reports/{share_id}"
        
        self._set_headers()
        return {
            "shareId": share_id,
            "shareUrl": f"https://strivehive.app{share_url}",
            "expiresAt": (datetime.now() + timedelta(days=7)).isoformat(),
            "accessLevel": "read-only"
        }
    
    def get_fitness_trends(self, user_id):
        """Get fitness progress trends and analytics"""
        from datetime import datetime, timedelta
        
        # Get data for the last 3 months for trending
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
            "peakPerformance": self.find_peak_performance(user_activities)
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
        
        # Calculate workout trend
        workout_trend = "stable"
        calorie_trend = "stable"
        
        first_month = monthly_data[months[0]]
        last_month = monthly_data[months[-1]]
        
        workout_change = last_month["totalWorkouts"] - first_month["totalWorkouts"]
        calorie_change = last_month["totalCalories"] - first_month["totalCalories"]
        
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
        
        # Base score on consistency and improvement
        months = sorted(monthly_data.keys())
        total_score = 0
        
        for month_key in months:
            month_data = monthly_data[month_key]
            monthly_score = min(100, (month_data["totalWorkouts"] * 10) + (month_data["totalCalories"] / 10))
            total_score += monthly_score
        
        return round(total_score / len(months))
    
    def analyze_weekly_pattern(self, activities):
        """Analyze weekly workout patterns"""
        from collections import defaultdict
        
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

def run_server():
    server_address = ('localhost', 8081)
    httpd = HTTPServer(server_address, StriveHiveHandler)
    print("🚀 Strive Hive Backend Server Started!")
    print("📊 API running on http://localhost:8081")
    print("🌐 Available endpoints:")
    print("   • GET  /api/health - Server status")
    print("   • GET  /api/users - List all users")
    print("   • GET  /api/users/{id} - Get specific user")
    print("   • POST /api/users - Create new user")
    print("   • PUT  /api/users/{id} - Update user profile")
    print("   • DELETE /api/users/{id} - Delete user")
    print("   • GET  /api/activities?userId={id} - List activities")
    print("   • POST /api/activities - Create new activity")
    print("   • PUT  /api/activities/{id} - Update activity")
    print("   • DELETE /api/activities/{id} - Delete activity")
    print("   • GET  /api/nutrition?userId={id} - List nutrition entries")
    print("   • POST /api/nutrition - Create new nutrition entry")
    print("   • PUT  /api/nutrition/{id} - Update nutrition entry")
    print("   • DELETE /api/nutrition/{id} - Delete nutrition entry")
    print("   • GET  /api/analytics/{userId} - User analytics")
    print("")
    print("⚡ This is a temporary Python server with full API compatibility")
    print("🔄 Your frontend should now work without network errors!")
    print("📝 All data is stored in memory (will reset on server restart)")
    print("")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
        httpd.server_close()

if __name__ == '__main__':
    run_server()