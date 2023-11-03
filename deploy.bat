@echo off
setlocal enabledelayedexpansion

REM Set the source and destination folders
set "source_folder=."
set "destination_folder=dist"

REM Create the destination folder if it doesn't exist
if not exist "%destination_folder%" (
  mkdir "%destination_folder%"
)

REM Empty the contents of the destination folder
echo Emptying the contents of the "dist" folder...
rmdir /s /q "%destination_folder%"

REM Run the "pnpm build" command
echo Building the Next.js application...
pnpm build

REM Copy the contents of the "host" folder to the destination folder
echo Copying the contents of the "host" folder...
robocopy "%source_folder%\host" "%destination_folder%" /E

REM Copy the entire ".next" folder to the destination folder
echo Copying the ".next" folder...
robocopy "%source_folder%\.next" "%destination_folder%\.next" /E

REM Removing the cache folder
echo Removing the ".next/cache" folder...
rmdir /s /q "%source_folder%\.next\cache"

REM Copy the package.json file to the destination folder
echo Copying the package.json file...
copy "%source_folder%\package.json" "%destination_folder%\"

echo Deployment preparation complete.
