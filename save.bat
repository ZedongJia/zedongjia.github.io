@echo off
python update.py
git add .
git commit -m "update:new blog"
git push origin master
