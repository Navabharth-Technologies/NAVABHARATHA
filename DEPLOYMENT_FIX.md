# Deployment Troubleshooting Guide - HTML Displaying as Text

## Problem: Your website shows raw HTML code instead of rendering the page

This happens when the web server serves HTML files with the wrong MIME type (as `text/plain` instead of `text/html`).

---

## Solutions by Hosting Platform:

### 🔷 **Solution 1: Traditional Web Hosting (cPanel, Apache)**

If you're using traditional hosting like HostGator, Bluehost, GoDaddy, etc.:

1. **Upload the `.htaccess` file** I created to the root directory (same folder as `index.html`)

2. **Check file permissions:**
   - `.htaccess` should be `644`
   - `index.html` should be `644`
   - Folders should be `755`

3. **Verify your hosting supports `.htaccess`:**
   - Most Apache servers do
   - Check with your hosting provider if unsure

4. **Clear your browser cache** and test again

**Files to upload:**
- ✅ `.htaccess` (created for you)
- ✅ All HTML, CSS, JS files

---

### 🔷 **Solution 2: Netlify**

If you're deploying to Netlify:

1. **Add the `netlify.toml` file** I created to your root directory

2. **Deploy steps:**
   ```bash
   # If using Git
   git add .
   git commit -m "Fix MIME type issue"
   git push
   
   # Netlify will auto-deploy
   ```

3. **Or drag and drop:**
   - Go to Netlify dashboard
   - Drag your entire ZED folder
   - Drop it on the deploy zone

**Files needed:**
- ✅ `netlify.toml` (created for you)

---

### 🔷 **Solution 3: Vercel**

If you're deploying to Vercel:

1. **Add the `vercel.json` file** I created to your root directory

2. **Deploy:**
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Deploy
   vercel
   ```

**Files needed:**
- ✅ `vercel.json` (created for you)

---

### 🔷 **Solution 4: GitHub Pages**

If you're using GitHub Pages:

1. **Ensure your repository structure is correct:**
   ```
   your-repo/
   ├── index.html
   ├── style.css
   ├── script.js
   └── assets/
   ```

2. **In GitHub repository settings:**
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` or `master`
   - Folder: `/ (root)`
   - Click Save

3. **Wait 2-3 minutes** for deployment

4. **Access via:** `https://yourusername.github.io/repository-name/`

**GitHub Pages automatically serves HTML correctly**, so if you're using it and seeing this issue:
- Check your repository is public
- Ensure `index.html` is in the root
- Clear browser cache

---

## 🛠️ **General Troubleshooting Steps:**

### Step 1: Check Your File Structure
```
ZED/
├── .htaccess          ← NEW (for Apache servers)
├── netlify.toml       ← NEW (for Netlify)
├── vercel.json        ← NEW (for Vercel)
├── index.html
├── style.css
├── script.js
├── performance.js
├── translations.js
└── assets/
    ├── navabharatha_logo.png
    ├── final3.png
    └── about-image.png
```

### Step 2: Verify HTML is Correct
Open `index.html` in a text editor and check:
- ✅ It starts with `<!DOCTYPE html>`
- ✅ Has proper `<html>`, `<head>`, `<body>` tags
- ✅ No PHP or server-side code mixed in

### Step 3: Check Browser
1. **Clear cache:**
   - Chrome: `Ctrl + Shift + Delete`
   - Select "Cached images and files"
   - Clear

2. **Try incognito/private mode**

3. **Try a different browser**

### Step 4: Check Server Response
1. Open Chrome DevTools (F12)
2. Go to Network tab
3. Reload the page
4. Click on `index.html` in the list
5. Check **Headers** tab:

**Should see:**
```
Content-Type: text/html; charset=UTF-8
```

**If you see:**
```
Content-Type: text/plain
```
↑ This is the problem! Use the solutions above.

---

## 📋 **Platform-Specific Instructions:**

### **I'm using cPanel hosting:**
1. Log into cPanel
2. Go to "File Manager"
3. Upload `.htaccess` to `public_html/` folder
4. Make sure `index.html` is also in `public_html/`
5. Set permissions: `.htaccess` = 644
6. Visit your website

### **I'm using Netlify:**
1. Add `netlify.toml` to your project
2. Push to Git or drag-drop to Netlify
3. Wait for deploy to complete
4. Visit your site

### **I'm using Vercel:**
1. Add `vercel.json` to your project
2. Run `vercel` command in terminal
3. Follow prompts
4. Visit the provided URL

### **I'm using shared hosting (GoDaddy, Hostinger, etc.):**
1. Upload `.htaccess` to root directory (usually `public_html/`)
2. Upload all website files to the same directory
3. Access: `http://yourdomain.com`

---

## 🚨 **Still Not Working?**

### Check these common issues:

1. **Wrong directory:**
   - Files should be in `public_html/` or `www/` or root directory
   - NOT in a subdirectory unless that's your intention

2. **Missing index file:**
   - Server looks for `index.html` or `index.htm`
   - Make sure filename is exactly `index.html` (lowercase)

3. **File permissions:**
   ```
   Files: 644
   Folders: 755
   ```

4. **.htaccess not working:**
   - Some servers use Nginx instead of Apache
   - Contact your host about MIME type configuration

5. **CDN/Cloudflare:**
   - If using Cloudflare, purge cache
   - Go to Cloudflare dashboard → Caching → Purge Everything

---

## 📞 **Contact Your Hosting Provider:**

If none of the above works, contact your hosting support with this message:

```
Hi,

My website is serving HTML files with MIME type "text/plain" 
instead of "text/html", causing the HTML code to display as 
plain text in the browser.

Can you please:
1. Check the server MIME type configuration
2. Enable .htaccess files if using Apache
3. Ensure HTML files are served with Content-Type: text/html

Website: navabharatha.com
Issue: HTML displaying as raw text instead of rendering

Thank you!
```

---

## ✅ **Quick Checklist:**

- [ ] Uploaded `.htaccess` (if Apache/cPanel hosting)
- [ ] Uploaded `netlify.toml` (if Netlify)
- [ ] Uploaded `vercel.json` (if Vercel)
- [ ] Files are in correct directory (`public_html/` or root)
- [ ] `index.html` is present in root
- [ ] File permissions are correct (644 for files, 755 for folders)
- [ ] Cleared browser cache
- [ ] Tested in incognito mode
- [ ] Checked Network tab for Content-Type header

---

## 🎯 **Most Likely Solution:**

Based on your URL `navabharatha.com/index.html#home`, you're using **traditional web hosting**.

**Do this:**
1. ✅ Upload the `.htaccess` file I created
2. ✅ Make sure it's in the same directory as `index.html`
3. ✅ Clear your browser cache
4. ✅ Reload the page

**This should fix it immediately!**

---

**Need help?** Tell me:
1. What hosting platform are you using?
2. How did you upload the files?
3. What does the Network tab show for Content-Type?
