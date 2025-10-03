@echo off
echo Starting Strive Hive Backend Server...
echo.

cd /d "%~dp0"

REM Set classpath for all dependencies
set CLASSPATH=target\classes

REM Add Maven dependencies to classpath (this will need Maven to download dependencies first)
if exist "target\dependency\*.jar" (
    for %%i in (target\dependency\*.jar) do set CLASSPATH=!CLASSPATH!;%%i
)

echo Running Spring Boot Application...
java -cp "%CLASSPATH%" com.strivehive.StriveHiveApplication

pause