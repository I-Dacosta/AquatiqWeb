# Home Page Live Preview Implementation Guide

## Overview

The home page is now fully editable in Payload CMS with Live Preview functionality. This allows admins to:
- Edit home page content in the Payload admin panel
- See changes in real-time on a split-screen preview
- Manage hero section, about section, products, focus areas, news, conference, explore, and get-in-touch sections

## Setup Steps

### 1. Environment Variables

Add the following to your `.env.local`:

```env
# Payload CMS
PAYLOAD_SECRET=your-secret-key-here
PAYLOAD_PUBLIC_SITE_URL=http://localhost:3000

# Database (if not already set)
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=aquatiq
DATABASE_PASSWORD=postgres
DATABASE_NAME=aquatiq_dev
```

### 2. Install Payload CMS (if not already installed)

The project already has Payload configured. If you need to set up the database:

```bash
# Generate migrations
pnpm payload migrate:create

# Run migrations
pnpm payload migrate

# Create admin user
pnpm payload create:admin
```

### 3. Access the Admin Panel

Once Payload is running, navigate to:
```
http://localhost:3000/admin
```

### 4. Create/Edit Home Page Content

1. In the Payload admin, go to **Home Page** collection
2. Click on the **Home Page** document (there's only one)
3. Edit the various sections:
   - **Hero Section**: Main heading, subheading, CTA button
   - **About Section**: Chapters with titles, text, images
   - **Products Section**: Title and subtitle
   - **Focus Areas Section**: Enable/disable and title
   - **News Section**: Enable/disable and title
   - **Conference Section**: Enable/disable and title
   - **Explore Section**: Enable/disable and title
   - **Get In Touch Section**: Heading, description, CTA

### 5. Live Preview Mode

#### How to Use Live Preview:

1. **Open Home Page in Payload Admin**
   - Navigate to: `http://localhost:3000/admin/collections/home-page`

2. **Enable Live Preview**
   - Look for the **Live Preview** button/panel in the Payload admin
   - The preview will open a split-screen view

3. **Make Edits and See Changes**
   - Edit content in the left panel (Payload admin)
   - See changes reflected in the right panel (your site) in real-time
   - The preview updates every 500ms automatically

#### Preview Breakpoints:

The Live Preview includes responsive breakpoints:
- **Mobile**: 375×667
- **Tablet**: 768×1024
- **Desktop**: 1440×900

You can switch between these to see how your content looks on different devices.

## File Structure

```
src/
├── collections/
│   └── HomePage.ts              # Payload collection configuration
├── lib/
│   └── hooks/
│       └── useHomePageContent.ts # React hook for fetching content
└── components/
    └── home/
        ├── home.tsx             # Main home component (to be updated)
        └── [other sections]     # Section components
```

## Implementation in React Components

### Using the Hook in Your Components

```tsx
import { useHomePageContent } from '@/lib/hooks/useHomePageContent'

export function AboutSection() {
  const { content, loading, error } = useHomePageContent()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  const chapters = content?.aboutSection?.chapters || []

  return (
    <section>
      {chapters.map((chapter) => (
        <div key={chapter.id}>
          <h2>{chapter.titleLines?.map(line => line.line).join(' ')}</h2>
          <p>{chapter.text}</p>
          {chapter.image && (
            <img 
              src={chapter.image.url} 
              alt={chapter.image.alt || 'Chapter image'}
            />
          )}
        </div>
      ))}
    </section>
  )
}
```

## API Endpoints

The following API endpoints are available:

### Get Home Page Content
```
GET /api/home-page
GET /api/home-page?draft=true  # For draft/preview content
```

Response:
```json
{
  "docs": [
    {
      "id": "home-page-id",
      "title": "Home Page",
      "heroSection": { ... },
      "aboutSection": { ... },
      ...
    }
  ]
}
```

## Key Features

### 1. **Autosave**
- Content is automatically saved every 1 second while editing
- No need to manually click save

### 2. **Draft Versioning**
- All changes are saved as drafts
- You can publish/unpublish content using Payload's versioning system

### 3. **Real-time Updates**
- When in preview mode, changes are fetched every 500ms
- No need to refresh the page to see updates

### 4. **Image Management**
- Upload images directly in the Payload admin
- Images are automatically resized for different breakpoints:
  - Thumbnail: 400×300
  - Card: 768×1024
  - Tablet: 1024×auto

### 5. **Access Control**
- Only authenticated users can create/update home page content
- The home page document cannot be deleted or duplicated
- Only one home page document can exist

## Customization

### Adding New Sections

To add a new section to the home page:

1. **Update the HomePage collection** in `src/collections/HomePage.ts`:

```typescript
{
  name: 'newSection',
  type: 'group',
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
    },
    // Add your fields here
  ],
},
```

2. **Update the HomePage type** (automatically generated in `src/payload-types.ts`)

3. **Update your React component** to use the new section data

### Styling

All sections maintain their current styling. Update styles in the respective component files as needed.

## Troubleshooting

### Live Preview Not Updating
- Check browser console for errors
- Ensure you're logged into Payload
- Clear browser cache and reload
- Check that `PAYLOAD_PUBLIC_SITE_URL` is set correctly in `.env.local`

### Images Not Showing in Preview
- Ensure the image upload is complete
- Check that `/public/uploads` directory exists
- Verify image file permissions

### Content Not Saving
- Check Payload logs in the terminal
- Ensure database is running
- Verify database credentials in `.env.local`

## Next Steps

1. **Create the Home Page document** in Payload admin
2. **Update existing components** to use `useHomePageContent()` hook
3. **Test Live Preview** by editing content in Payload
4. **Deploy** - Live Preview works in production as well

## Additional Resources

- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Live Preview Guide](https://payloadcms.com/docs/admin/live-preview)
- [Collections Documentation](https://payloadcms.com/docs/configuration/collections)
