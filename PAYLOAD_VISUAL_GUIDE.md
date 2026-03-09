# Payload Live Preview - Visual Guide

## How It Works

### The Live Preview Split Screen

```
┌─ Browser Window ──────────────────────────────────────────────────┐
│                                                                      │
│  PAYLOAD ADMIN PANEL                │    LIVE PREVIEW              │
│  (Left Side)                         │    (Right Side)              │
│                                      │                              │
│  ┌──────────────────────┐            │  ┌──────────────────────┐   │
│  │ Home Page            │            │  │                      │   │
│  │ ─────────────────── │            │  │  Welcome to Aquatiq  │   │
│  │                      │            │  │  Food Safety...      │   │
│  │ Hero Section         │            │  │  [Change As You Type]│   │
│  │ ┌──────────────────┐ │            │  │                      │   │
│  │ │ Heading:         │ │   ←────────┼──│  (Updates ~500ms)   │   │
│  │ │ [Type here]      │ │    Auto    │  │                      │   │
│  │ └──────────────────┘ │    Save    │  └──────────────────────┘   │
│  │                      │    Every   │                              │
│  │ About Section        │    1 sec   │  🔄 Real-time Updates       │
│  │ ┌──────────────────┐ │            │                              │
│  │ │ Chapters...      │ │            │  📱 Responsive              │
│  │ │ [Edit Content]   │ │            │  • Mobile                   │
│  │ └──────────────────┘ │            │  • Tablet                   │
│  │                      │            │  • Desktop                  │
│  │ [Save] [Publish]     │            │                              │
│  └──────────────────────┘            │  Preview Breakpoint ▼       │
│                                      │                              │
└──────────────────────────────────────┴──────────────────────────────┘
```

### Data Flow

```
Admin Edits Content
        ↓
Auto-save to Database (every 1 sec)
        ↓
Live Preview Polls (every 500ms)
        ↓
React Component Updates
        ↓
Visual Changes in Preview
```

---

## Home Page Structure in Payload

```
Home Page
│
├── 🎨 Hero Section
│   ├── Heading
│   ├── Subheading
│   ├── CTA Text & Link
│   └── Background Image
│
├── 📖 About Section
│   └── Chapters (up to 5)
│       ├── Subtitle
│       ├── Title (multiple lines)
│       ├── Body Text
│       ├── Highlight Color (blue)
│       └── Image (left or right)
│
├── 🛍️ Products Section
│   ├── Title
│   └── Subtitle
│
├── 🎯 Focus Areas Section
│   ├── Enabled/Disabled
│   └── Title
│
├── 📰 News Section
│   ├── Enabled/Disabled
│   └── Title
│
├── 🎤 Conference Section
│   ├── Enabled/Disabled
│   └── Title
│
├── 🔍 Explore Section
│   ├── Enabled/Disabled
│   └── Title
│
└── 💬 Get In Touch Section
    ├── Heading
    ├── Description (Rich Text)
    ├── CTA Text & Link
    └── (Enable/Disable via parent)
```

---

## Step-by-Step Usage

### 1. Access the Admin Panel
```
URL: http://localhost:3000/admin
     ↓
Login with admin credentials
     ↓
Dashboard loaded
```

### 2. Open Home Page Collection
```
Sidebar Menu
├── Users
├── Products
├── Media
├── Orders
└── ⭐ Home Page ← Click here
     ↓
Shows "Home Page" document
```

### 3. Click Live Preview
```
Admin Panel Header
├── [Save]
├── [Publish]
├── [Preview] ← Click "Live Preview"
│   ├── 📱 Mobile (375×667)
│   ├── 📱 Tablet (768×1024)
│   └── 💻 Desktop (1440×900)
```

### 4. Edit Content & See Changes
```
LEFT PANEL (Admin)          RIGHT PANEL (Preview)
├── Hero Section            ├── 🔄 Updates automatically
│   ├── [Type heading]  →   │   ├── Your new heading
│   ├── [Type subheading]→  │   ├── Your new subheading
│   └── [Upload image]  →   │   └── Image appears
│
└── [Changes auto-save]     └── [~500ms latency]
```

---

## Editing Different Field Types

### Text Field
```
┌─ Field Name ──────────────────┐
│ Heading                        │
├────────────────────────────────┤
│ [Welcome to Aquatiq]           │  ← Type here
└────────────────────────────────┘
```

### Textarea Field
```
┌─ Field Name ──────────────────┐
│ Subheading                     │
├────────────────────────────────┤
│ [Food Safety Solutions for     │  ← Multiple lines
│  a Safer Tomorrow]             │
└────────────────────────────────┘
```

### Rich Text Field
```
┌─ Description ──────────────────┐
│ [B] [I] [U] [Link] [More...]  │  ← Formatting options
├────────────────────────────────┤
│ Lorem ipsum dolor sit amet...  │  ← Edit with formatting
│                                │
└────────────────────────────────┘
```

### Image Upload
```
┌─ Image Upload ─────────────────┐
│ [Drag image here or click]     │
├────────────────────────────────┤
│ 📷 food.png (200 KB)           │  ← Uploaded images
│ 🗑️ [Remove]                    │
└────────────────────────────────┘
```

### Select Dropdown
```
┌─ Image Position ──────────────────┐
│ ┌─────────────────────────────────┐│
│ │ Right ▼                          ││  ← Click to change
│ └────────┬────────────────────────┘│
│          │                         │
│ ┌────────▼────────────────────────┐│
│ │ Left                             ││
│ │ Right ✓                          ││
│ └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

### Array Field (Multiple Items)
```
┌─ Chapters ─────────────────────┐
│                                │
│ + [Add Chapter]  ← Click       │
│                                │
│ ▶ Chapter 1                    │
│   ├── ID: chapter-1            │
│   ├── Subtitle: Safety         │
│   ├── Titles: [line 1] [line 2]│
│   ├── Text: We cover all...    │
│   └── Image: [Upload]          │
│                                │
│ ▶ Chapter 2                    │
│   ├── ID: chapter-2            │
│   ├── ...                      │
│                                │
└─ [Add Chapter] [Save Changes] ─┘
```

---

## Responsive Preview Breakpoints

### Mobile View (375×667)
```
┌─────────────────┐
│                 │
│   Mobile View   │
│   Portrait      │
│   375 × 667     │
│                 │
│   Content here  │
│   stacked       │
│   vertically    │
│                 │
└─────────────────┘
```

### Tablet View (768×1024)
```
┌──────────────────────┐
│                      │
│   Tablet View        │
│   Portrait           │
│   768 × 1024         │
│                      │
│ Content side by side │
│ 2-column layout      │
│                      │
└──────────────────────┘
```

### Desktop View (1440×900)
```
┌────────────────────────────────────┐
│                                    │
│       Desktop View                 │
│       1440 × 900                   │
│                                    │
│ Full 3-4 column layout             │
│ Shows complete design              │
│                                    │
└────────────────────────────────────┘
```

---

## Workflow Timeline

```
⏰ Timeline of Changes

T=0s    Admin starts typing in Payload admin
        └─ Content is being edited in real-time

T=1s    Autosave trigger
        └─ Changes saved to database

T=1.5s  Live Preview polls database
        └─ Fetches updated content

T=2s    React component re-renders
        └─ Updates virtual DOM

T=2s+   Browser updates pixels
        └─ Visual changes appear on screen

Result: Human sees update within ~1-2 seconds of typing
```

---

## Publishing Workflow

```
Draft Status:
├── Editing → Auto-saved as Draft
├── Not visible on public site
└── Only accessible in preview mode

Publishing:
├── Click [Publish] button
├── Changes saved as Published version
└── Now visible to everyone

Unpublishing:
├── Click [Unpublish] button
├── Reverts to previous version
└── Changes hidden from public
```

---

## Keyboard Shortcuts

```
In Payload Admin:
├── Cmd/Ctrl + S ......... Save
├── Cmd/Ctrl + Shift + P . Publish
└── Escape ............... Close modal
```

---

## Common Tasks

### Edit Hero Heading
1. Click "Home Page" collection
2. Scroll to "Hero Section"
3. Edit "Heading" field
4. See change in preview within 1 second
5. Auto-saves automatically

### Add About Chapter
1. Click "Home Page" collection
2. Scroll to "About Section"
3. Click "+ Add Chapter"
4. Fill in:
   - ID: chapter-4
   - Surtitle: Innovation
   - Title Lines: [Your content]
   - Text: [Your content]
   - Image: [Upload or select]
5. Save
6. New chapter appears in preview

### Update Focus Areas
1. Click "Home Page" collection
2. Scroll to "Focus Areas Section"
3. Edit Title
4. Check/uncheck "Enabled" to show/hide
5. Changes appear immediately

### Upload Images
1. Click image upload field
2. Drag image or click to browse
3. Wait for upload to complete
4. Image appears in preview
5. Optional: Crop in the admin UI

---

## Tips & Tricks

💡 **Autosave** - Don't worry about clicking save. Changes are automatically saved every second.

💡 **Preview Always Open** - Keep preview open while editing to see changes in real-time.

💡 **Mobile Testing** - Switch to mobile breakpoint to see how content looks on phones.

💡 **Rich Text** - Use the formatting toolbar in description fields for bold, italic, links, etc.

💡 **Drag & Drop Images** - You can drag images directly into image upload fields.

💡 **Keyboard Shortcuts** - Use Cmd/Ctrl+S to manually save (though not usually needed).

💡 **Responsive Design** - Test all three breakpoints (mobile, tablet, desktop) to ensure content looks good everywhere.

---

## Troubleshooting Visual Guide

### Issue: Preview Not Updating
```
❌ Preview blank or not changing

✅ Solutions:
1. Check if logged in (look for user menu)
2. Check browser console (F12) for errors
3. Verify network tab shows API calls
4. Try refreshing the page
5. Check that dev server is running
```

### Issue: Image Upload Failed
```
❌ Image shows error icon

✅ Solutions:
1. Check file size (< 5MB recommended)
2. Check file format (JPG, PNG, GIF)
3. Verify /public/uploads exists
4. Check file permissions
5. Try different image
```

### Issue: Content Not Saving
```
❌ Changes disappear on refresh

✅ Solutions:
1. Check database connection
2. Look at terminal for error messages
3. Verify .env.local variables
4. Restart dev server
5. Check file permissions
```

---

## Browser Compatibility

```
Supported:
✅ Chrome/Chromium 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+

Not Supported:
❌ Internet Explorer
❌ Very old browsers
```

---

**Last Updated:** January 2, 2026
