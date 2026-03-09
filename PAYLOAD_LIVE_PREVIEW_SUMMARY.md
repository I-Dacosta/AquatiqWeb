# Home Page Live Preview Implementation Summary

## ✅ What Has Been Set Up

### 1. **Payload Collection for Home Page** (`src/collections/HomePage.ts`)
   - Complete home page content structure with all sections
   - Live Preview enabled with responsive breakpoints (mobile, tablet, desktop)
   - Autosave enabled (saves every 1 second)
   - Draft versioning for content control
   - Upload support for images

### 2. **React Hook for Content Fetching** (`src/lib/hooks/useHomePageContent.ts`)
   - `useHomePageContent()` hook fetches home page data from Payload
   - Supports Live Preview mode (polling every 500ms)
   - Fallback to default content if no document exists
   - Type-safe with TypeScript support

### 3. **Updated Payload Config** (`src/payload.config.ts`)
   - Integrated HomePage collection
   - Media collection with image resizing
   - All necessary collections configured

### 4. **Example Updated Component** (`src/components/home/about-section.example.tsx`)
   - Shows how to integrate the hook with existing components
   - Demonstrates converting Payload data to component props
   - Maintains all animations and styling

### 5. **Documentation** (`PAYLOAD_HOME_PAGE_SETUP.md`)
   - Complete setup guide
   - API endpoints reference
   - Troubleshooting tips
   - Customization instructions

### 6. **Initialization Script** (`scripts/init-home-page.ts`)
   - Automatically creates the home page document
   - Populates with default content
   - Run after database setup

---

## 🚀 Quick Start

### Step 1: Run Database Migrations
```bash
cd web-app
pnpm payload migrate
```

### Step 2: Initialize Home Page Document
```bash
pnpm tsx scripts/init-home-page.ts
```

### Step 3: Create Admin User (if not already done)
```bash
pnpm payload create:admin
```

### Step 4: Start the Application
```bash
pnpm dev
```

### Step 5: Access Live Preview
1. Navigate to: `http://localhost:3000/admin`
2. Login with your admin credentials
3. Go to **Home Page** collection
4. Click the **Live Preview** button to open split-screen view
5. Edit content and see changes in real-time!

---

## 📋 Editable Sections

The following sections can now be edited in Payload:

1. **Hero Section**
   - Heading
   - Subheading
   - CTA Button Text & Link
   - Background Image

2. **About Section**
   - Multiple chapters (up to 5)
   - Each chapter has:
     - Subtitle
     - Title (multiple lines)
     - Body text
     - Highlighted text
     - Image (left or right position)

3. **Products Section**
   - Title
   - Subtitle
   - (Product list auto-populated from Products collection)

4. **Focus Areas Section**
   - Title
   - Enable/Disable toggle

5. **News Section**
   - Title
   - Enable/Disable toggle

6. **Conference Section**
   - Title
   - Enable/Disable toggle

7. **Explore Section**
   - Title
   - Enable/Disable toggle

8. **Get In Touch Section**
   - Heading
   - Description (rich text with formatting)
   - CTA Button Text & Link

---

## 🔄 How Live Preview Works

```
┌─────────────────────────────────────────────────────┐
│                 Browser Window                        │
├─────────────────┬─────────────────────────────────────┤
│                 │                                       │
│  Payload Admin  │        Live Preview of Site         │
│  (Edit Here)    │        (See Changes Here)           │
│                 │                                       │
│  • Type content │  • Updates every 500ms              │
│  • Upload image │  • Shows responsive view            │
│  • Click save   │  • Responsive breakpoints           │
│                 │                                       │
└─────────────────┴─────────────────────────────────────┘

        ↓ (Autosave every 1 second)
        
   Payload Database
```

### Behind the Scenes:
1. Admin types content in Payload admin panel
2. Content autosaves to database
3. Live Preview polls database every 500ms
4. React component fetches updated data
5. Components re-render with new content
6. Changes appear on the right side instantly

---

## 🛠️ Integration with Existing Components

To update your components to use Payload content:

### Before (Hardcoded):
```tsx
const chapters = [
  { id: 'chapter-1', surtile: 'Safety', ... },
  // ...
]
```

### After (From Payload):
```tsx
const { content, loading } = useHomePageContent()
const chapters = content?.aboutSection?.chapters || []
```

See `src/components/home/about-section.example.tsx` for a complete example.

---

## 📁 New Files Created

```
src/
├── collections/
│   └── HomePage.ts                    # ✨ NEW: Payload collection config
├── lib/
│   └── hooks/
│       └── useHomePageContent.ts      # ✨ NEW: React hook for fetching
├── migrations/
│   └── 20260102_000000_add_home_page.ts  # ✨ NEW: DB migration
└── components/
    └── home/
        └── about-section.example.tsx  # ✨ NEW: Example integration

scripts/
└── init-home-page.ts                  # ✨ NEW: Initialize script

PAYLOAD_HOME_PAGE_SETUP.md              # ✨ NEW: Setup documentation
```

---

## 🎯 Next Steps to Complete Implementation

1. **Update Components** (Optional but recommended)
   - Replace the current component files with versions that use `useHomePageContent()`
   - Start with one section at a time
   - See `about-section.example.tsx` for the pattern
   - Or replace: `src/components/home/about-section.tsx` with the example version

2. **Test Live Preview**
   - Open admin panel
   - Edit a section
   - Watch the preview update in real-time

3. **Customize Fields** (Optional)
   - Add new fields to sections as needed
   - Update Payload collection in `HomePage.ts`
   - Run database migration: `pnpm payload migrate`

4. **Deploy**
   - Live Preview works in production too
   - Set `PAYLOAD_PUBLIC_SITE_URL` in production environment
   - Admin panel at `/admin` requires authentication

---

## 💾 Environment Variables

Add to `.env.local`:

```env
# Payload CMS
PAYLOAD_SECRET=your-secret-key-here
PAYLOAD_PUBLIC_SITE_URL=http://localhost:3000

# Database (if different from defaults)
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=aquatiq
DATABASE_PASSWORD=postgres
DATABASE_NAME=aquatiq_dev
```

---

## 🔐 Access Control

- **Create**: Only logged-in admin users can create content
- **Read**: Public access (content is visible on the site)
- **Update**: Only logged-in admin users can edit
- **Delete**: Disabled (prevents accidental deletion of home page)
- **Document Limit**: Only one home page document can exist

---

## 📚 API Reference

### Get Home Page Content
```
GET /api/home-page?limit=1
GET /api/home-page?limit=1&draft=true  # For draft content in preview mode
```

### Response
```json
{
  "docs": [
    {
      "id": "...",
      "title": "Home Page",
      "heroSection": { ... },
      "aboutSection": { ... },
      // ... other sections
    }
  ]
}
```

---

## ❓ FAQ

**Q: Can I upload images in the Payload admin?**
A: Yes! Images are managed through the Media collection. Drag and drop images in the "Image" field.

**Q: How often does the preview update?**
A: Every 500ms (half a second) when in preview mode.

**Q: Can I edit content offline?**
A: You can save drafts offline, but they won't be visible on the site until you have internet and the Payload server.

**Q: Can I have multiple home pages?**
A: No, by design there's only one. You can create other page types in Payload if needed.

**Q: Do I need to restart the app when I change content?**
A: No! All changes are live. The polling mechanism in Live Preview mode handles updates automatically.

---

## 🎨 Customization Examples

See `PAYLOAD_HOME_PAGE_SETUP.md` for:
- Adding new sections
- Custom styling
- Rich text editor setup
- Image optimization

---

## ✨ Benefits of This Setup

✅ **Live Preview** - See changes in real-time without refreshing  
✅ **Split-screen** - Admin on left, preview on right  
✅ **Autosave** - Never lose work (saves every 1 second)  
✅ **Responsive** - Preview on mobile, tablet, desktop  
✅ **No Code Required** - Edit content without touching code  
✅ **Type-safe** - Full TypeScript support  
✅ **Flexible** - Add more sections anytime  
✅ **Production-ready** - Works on deployed sites too  

---

## 🚨 Troubleshooting

**Live Preview blank?**
- Check that you're logged into Payload
- Check browser console for errors
- Clear cache and reload

**Changes not saving?**
- Check Payload server logs
- Verify database connection
- Check `.env.local` for correct credentials

**Images not showing?**
- Ensure upload completed
- Check `/public/uploads` directory exists
- Verify file permissions

For more help, see `PAYLOAD_HOME_PAGE_SETUP.md`.

---

## 📞 Support Resources

- [Payload CMS Docs](https://payloadcms.com/docs)
- [Live Preview Guide](https://payloadcms.com/docs/admin/live-preview)
- [Collections Documentation](https://payloadcms.com/docs/configuration/collections)

---

**Last Updated:** January 2, 2026  
**Status:** ✅ Ready to use
