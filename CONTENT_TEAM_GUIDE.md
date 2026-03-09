# Content Team Quick Reference

## Publishing Products from Visma to Website

### Overview
Products sync from Visma ERP → land in Payload as **DRAFTS** → You add content → Publish to website

---

## Step-by-Step Process

### 1. Login to Payload Admin
- URL: `http://localhost:3000/admin`
- Email: `admin@aquatiq.no`
- Password: `admin123`

### 2. Find Draft Products
1. Click **"Products"** in sidebar
2. Filter by Status: **"Draft"**
3. These products need your attention!

### 3. Edit Product
Click on a draft product to edit

#### Read-Only Fields (from Visma)
❌ **Do NOT edit these** (they auto-update from ERP):
- Product Code
- SKU
- Visma Name
- Price
- Cost
- Stock
- Visma Category

#### Your Content Fields (ADD CONTENT HERE)
✅ **You CAN and SHOULD edit these**:

**Display Name** 🏷️
- Marketing-friendly product name
- Can be different from Visma name
- Example: "Pro Clean Industrial Degreaser" instead of "CLN-500-IND"

**Short Description** 📝
- Brief sales copy (2-3 sentences)
- Shows in product listings
- Make it compelling!

**Long Description** 📄
- Detailed product information
- Rich text editor (bold, lists, etc.)
- Include benefits, usage, applications

**Images** 📸
- Upload 3-5 high-quality images
- Add descriptive alt text
- Check "Is Primary" for main image
- Recommended: 1200x1200px or larger

**Specifications** 🔧
- Technical details as label/value pairs
- Examples:
  - Volume → 5 liters
  - pH Level → 7-8
  - Temperature Range → 5-60°C

**Category** 🗂️
- Select website category
- Different from Visma category
- Choose most relevant

**Related Products** 🔗
- Link complementary products
- Cross-selling opportunity

**SEO Title** 🔍
- Custom page title for Google
- Include keywords
- Max 60 characters

**SEO Description** 🔍
- Meta description for search results
- Compelling summary
- Max 160 characters

### 4. Publish Product
1. Scroll to **Status** field (right sidebar)
2. Change from **"Draft"** to **"Published"**
3. Click **"Save"** button
4. ✅ Product is now live on website!

### 5. Optional: Feature Product
- Check **"Featured"** box (right sidebar)
- Featured products show on homepage
- Use for promotions or bestsellers

---

## Content Quality Checklist

Before publishing, ensure:

- [ ] Display name is marketing-friendly
- [ ] Short description is compelling (not just Visma name)
- [ ] Long description has useful details
- [ ] At least 3 product images uploaded
- [ ] Primary image selected
- [ ] All images have alt text
- [ ] Technical specs added
- [ ] Category assigned
- [ ] SEO title and description filled
- [ ] Related products linked (if applicable)

---

## What Happens After Publishing?

✅ **Product appears on website immediately**
- Visible at: `/products/[slug]`
- Appears in product listings
- Searchable by customers

✅ **Prices and stock stay current**
- Auto-updates from Visma during sync
- Your content is preserved

✅ **Product stays published**
- Remains live through Visma syncs
- Only you can unpublish it

---

## Common Tasks

### Unpublish a Product
1. Edit product
2. Set Status to **"Archived"**
3. Save
4. Product removed from website

### Edit Published Product
1. Edit product normally
2. Make changes
3. Save
4. Changes appear immediately on website

### Update Images
1. Add new images in Images array
2. Delete old images (trash icon)
3. Mark new primary image
4. Save

### Check Product Status
- **Draft** = Not on website yet
- **Published** = Live on website
- **Archived** = Hidden from website

---

## Tips & Best Practices

### Writing Product Descriptions

**Short Description (The Hook)**
```
Example:
"Heavy-duty industrial degreaser that cuts through 
tough grime. Safe on most surfaces, biodegradable 
formula. Perfect for factories and workshops."
```

**Long Description (The Details)**
- Start with benefits
- Add technical details
- Include use cases
- List key features
- Mention safety info

### Image Guidelines

**Do:**
- Use high-resolution images (min 1200x1200)
- Show product from multiple angles
- Include usage/application photos
- Use consistent lighting
- Add descriptive alt text

**Don't:**
- Use blurry or pixelated images
- Mix different photo styles
- Forget alt text
- Use images with watermarks

### SEO Best Practices

**Title:**
- Include product name + key feature
- Example: "Pro Clean Industrial Degreaser | Heavy-Duty | 5L"

**Description:**
- Start with main benefit
- Include keywords naturally
- Add call to action
- Example: "Powerful industrial degreaser for tough cleaning jobs. Biodegradable formula, safe on surfaces. Order now for fast shipping."

### Categories

Choose the most specific category:
- Chemistry → Cleaning Chemicals → Degreasers
- Not just: Chemistry

---

## Troubleshooting

### Product Not Showing on Website

**Check:**
1. Is Status = "Published"? ✅
2. Did you click Save? ✅
3. Refresh website page
4. Check `/products` page

### Images Not Displaying

**Check:**
1. Image uploaded successfully?
2. Image marked as primary?
3. Alt text added?
4. File size reasonable? (< 5MB)

### Can't Edit Visma Fields

**This is normal!**
- Visma fields are read-only
- They auto-update from ERP
- Edit content fields instead

### Product Disappeared After Sync

**Unlikely but check:**
1. Status still "Published"?
2. Product still exists in Payload?
3. Check with tech team about sync errors

---

## Getting Help

**Questions?**
1. Check [VISMA_SYNC_GUIDE.md](VISMA_SYNC_GUIDE.md) for detailed info
2. Ask tech team about:
   - Sync issues
   - System errors
   - Missing products
3. For content questions:
   - Refer to brand guidelines
   - Consult marketing team

---

## Quick Reference Card

| Task | Steps |
|------|-------|
| **Publish Product** | Draft → Add content → Status: Published → Save |
| **Feature Product** | Edit → Check "Featured" → Save |
| **Add Images** | Edit → Images → Add Image → Upload → Alt text → Save |
| **Unpublish** | Edit → Status: Archived → Save |
| **Link Products** | Edit → Related Products → Select → Save |
| **Update SEO** | Edit → SEO Title/Description → Save |

---

## Remember

1. **Visma = Master Data** (prices, stock)
2. **You = Content Master** (images, descriptions)
3. **Published = Live** (visible to customers)
4. **Draft = Work in Progress** (not visible)
5. **Save Often** (changes aren't live until saved)

Happy publishing! 🚀
