# 📹 Video Storage System - Server-Side Solution

## Problem with Old System (localStorage)

### ❌ What Was Wrong:
- **Videos stored in browser only** - Not on server
- **Lost when:**
  - Browser cache cleared
  - Different browser used
  - Different computer/device used
  - Incognito/private mode
  - Browser reinstalled

### Example:
```
You upload 3 videos → Saved to Chrome localStorage on Laptop A
Access from Firefox → Videos not there ❌
Access from Laptop B → Videos not there ❌
Clear Chrome cache → Videos gone forever ❌
```

## ✅ New System: GitHub-Based Server Storage

### How It Works:

```
┌─────────────────────────────────────────────────────────┐
│  1. Admin adds videos via admin panel                   │
│     → Saved to localStorage (temporary)                 │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  2. Admin exports videos                                 │
│     → Downloads videos-data.json                         │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  3. Run update script                                    │
│     → Commits videos-data.json to GitHub                │
│     → Pushes to repository                              │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  4. All users load from GitHub                           │
│     → Videos available on ANY device/browser ✅         │
│     → Permanent storage ✅                              │
│     → No data loss ✅                                   │
└─────────────────────────────────────────────────────────┘
```

## 📁 Files Created

### 1. `videos-data.json`
**Purpose:** Server-side database file (stored in GitHub)
- Contains all video metadata
- Loaded by all pages
- Permanent storage
- Version controlled

### 2. `js/video-storage.js`
**Purpose:** Video loading/saving module
- Loads from server (GitHub)
- Falls back to localStorage if offline
- Caches for performance
- Handles all video operations

### 3. `update-videos.sh`
**Purpose:** Sync tool to push videos to GitHub
- Interactive script
- Commits videos to Git
- Pushes to GitHub
- Makes videos permanent

### 4. API Files (for future enhancement)
- `api/videos-api.js` - Lambda function (optional)
- `save-video-api.php` - PHP API (optional)

## 🎯 How to Use (For Admins)

### Adding Videos - Step by Step:

**Step 1: Add Videos via Admin Panel**
```
1. Go to: https://allinone.ciscoaidemo.com/admin-videos.html
2. Login: admin / CiscoAI2024!
3. Click "Add New Video" tab
4. Add your videos
5. Videos are saved to localStorage (temporary!)
```

**Step 2: Export Videos**
```
1. Go to "Import/Export" tab
2. Click "Export All Videos"
3. Save file as: videos-data.json
4. File downloads to your computer
```

**Step 3: Sync to Server**
```bash
# Copy downloaded file to project directory
cp ~/Downloads/videos-data.json /home/kpanse/wsl-myprojects/Agentic-AI-demos/

# Run sync script
cd /home/kpanse/wsl-myprojects/Agentic-AI-demos
./update-videos.sh

# Follow prompts:
# - Press 'y' to commit
# - Press 'y' to push to GitHub
```

**Step 4: Verify**
```
# Wait 1-2 minutes for GitHub Pages to update
# Then visit (from ANY device/browser):
https://allinone.ciscoaidemo.com/demo-videos.html
https://ciscotube.ciscoaidemo.com

# Videos should appear! ✅
```

## 🔄 Video Loading Flow

### For Public Users (demo-videos.html, ciscotube.html):

```javascript
1. Page loads
2. VideoStorage.loadVideos() called
3. Tries to fetch from GitHub:
   https://raw.githubusercontent.com/ashmanpan/AIsocdemov1/main/videos-data.json
4. Success? → Display videos
5. Failed? → Load from localStorage cache
6. Cache also empty? → Show "No videos" message
```

### For Admin (admin-videos.html):

```javascript
1. Page loads
2. Tries to load from GitHub first
3. Fallback to localStorage
4. Admin can:
   - Add/Edit/Delete videos → Saved to localStorage
   - Export videos → Download JSON file
   - Admin runs sync script → Videos pushed to GitHub
```

## 📊 Current vs New System Comparison

| Feature | Old (localStorage) | New (GitHub) |
|---------|-------------------|--------------|
| **Storage Location** | Browser only | GitHub (server) |
| **Persistence** | Temporary | Permanent |
| **Cross-device** | ❌ No | ✅ Yes |
| **Cross-browser** | ❌ No | ✅ Yes |
| **Survives cache clear** | ❌ No | ✅ Yes |
| **Version control** | ❌ No | ✅ Yes |
| **Backup** | ❌ No backup | ✅ Git history |
| **Rollback** | ❌ Impossible | ✅ Git revert |
| **Multi-admin** | ❌ Conflicts | ✅ Merge possible |

## 🛠️ Manual Sync (Alternative Method)

If you prefer manual Git commands:

```bash
# 1. Export videos from admin panel
# 2. Save as videos-data.json in project root

# 3. Manual Git commands:
git add videos-data.json
git commit -m "Update video library - $(date '+%Y-%m-%d')"
git push

# Done! Videos are now on server
```

## 🔧 Technical Details

### Storage URL:
```
Production: https://raw.githubusercontent.com/ashmanpan/AIsocdemov1/main/videos-data.json
Local Dev: ./videos-data.json
```

### Loading Logic:
```javascript
// Priority order:
1. GitHub (server) - Primary source
2. localStorage (cache) - Fallback
3. Empty array - If all else fails
```

### Caching:
- Videos cached for 5 minutes
- Reduces GitHub API calls
- Faster page loads
- Works offline temporarily

## ⚠️ Important Notes

### For Admins:

1. **Videos are NOT automatically synced** - You must export and run the sync script
2. **Export regularly** - Don't lose your work
3. **Multiple admins** - Coordinate to avoid conflicts
4. **Test first** - Verify videos load before syncing

### For Users:

1. Videos may take 1-2 minutes to appear after sync
2. Hard refresh (Ctrl+F5) if videos don't appear
3. Videos will work offline (from cache)

## 🚀 Future Enhancements

### Planned:
1. **Auto-sync** - Videos automatically push to GitHub
2. **Real-time updates** - No manual export needed
3. **AWS DynamoDB** - Professional database
4. **API Gateway** - REST API for videos
5. **Admin webhooks** - Notify on video changes

### Advanced Option (Not yet implemented):
```
Admin Panel → Lambda Function → DynamoDB → API Gateway → All Pages
```

## 📝 Video Data Format

```json
[
  {
    "id": "1123995788",
    "url": "https://vimeo.com/1123995788",
    "title": "AI NOC Demo",
    "description": "Network operations demo",
    "category": "noc",
    "duration": "12:34",
    "thumbnail": "https://i.vimeocdn.com/video/xxx_640x360.jpg",
    "keywords": ["AI", "NOC", "Network"],
    "status": "active",
    "featured": "yes",
    "playlist": "getting-started",
    "views": "1.2K",
    "channel": "NOC",
    "dateAdded": "2025-10-02T10:30:00.000Z"
  }
]
```

## 🆘 Troubleshooting

### Videos not appearing?

**Check 1: Is videos-data.json on GitHub?**
```bash
git log --oneline -- videos-data.json
# Should show recent commits
```

**Check 2: Can you access the file?**
```
Visit: https://raw.githubusercontent.com/ashmanpan/AIsocdemov1/main/videos-data.json
Should see JSON data
```

**Check 3: Check browser console**
```
F12 → Console tab
Look for errors
Should see: "✅ Loaded X videos from server"
```

**Check 4: Clear cache**
```javascript
// In browser console:
VideoStorage.clearCache()
location.reload()
```

### "Failed to load from server" error?

1. Check internet connection
2. Verify GitHub repository is public
3. Check browser console for specific error
4. Try manual URL: `https://raw.githubusercontent.com/ashmanpan/AIsocdemov1/main/videos-data.json`

### Videos only work on one computer?

This means you haven't synced to GitHub yet!
1. Export videos from admin panel
2. Run `./update-videos.sh`
3. Confirm push to GitHub
4. Wait 1-2 minutes
5. Test from different device

## 📞 Support

For issues:
1. Check this documentation
2. Verify videos-data.json is on GitHub
3. Check browser console for errors
4. Try clearing cache: `VideoStorage.clearCache()`

---

**Summary:** Videos are now stored on GitHub (server), not in browser. Admin must export and sync for videos to persist across devices!
