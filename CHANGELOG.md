# Forest Hills Garden (FHG) Enterprise Platform — System Changelog & Handover Guide

## Release 1.0.0 — Full Production System Handover

This document outlines the architectural enhancements, security controls, CMS administration capabilities, and deployment procedures implemented for the **Forest Hills Garden (FHG)** commercial landscape architecture and industrial contracting web application.

---

### 1. Architectural Upgrades & Full-Stack Admin CMS

#### 1.1 Atomic Storage Architecture
- **Per-Domain KV Partitioning**: Upgraded storage architecture from a single monolithic key to 11 atomic keys (`fhg:company`, `fhg:services`, `fhg:projects`, `fhg:clients`, `fhg:equipment`, `fhg:species`, `fhg:faqs`, `fhg:protocol`, `fhg:documents`, `fhg:inquiries`, `fhg:settings`). Concurrent updates to different sections no longer cause data overwrite collisions.
- **Hybrid Storage Driver**: Seamless zero-config failover between **Vercel KV / Upstash Redis** (in production cloud environments) and **Local JSON filesystem storage** (`data/admin-db.json` in local development or offline mode).
- **Zero-Downtime Migration**: Built-in backward-compatibility layer automatically detects and migrates legacy monolithic data payloads into per-domain atomic keys.

#### 1.2 Enterprise Public Data Propagation
- **100% Admin Dynamic Public UI**: All public-facing sections across the entire platform are dynamically wired to administrative storage with fallback to verified default baselines:
  - **Company Identity & Stats**: Hero metric counters (28+ years tenure, 98.7% survival, 90 chainsaws, 230K+ saplings) are fully editable via the Admin Company tab.
  - **Legal Dossier**: DTI registration, BIR OCN/TIN/RDO numbers, PhilGEPS platinum certification, SSS/PhilHealth/Pag-IBIG employer IDs, DENR chainsaw registry numbers, and DBP Forest accreditation numbers reflect directly in footers, credentials tabs, and compliance cards.
  - **Nursery Capacities**: Sitio Latag (100K+), Tumaway (80K+), and Aya (50K+) seedling numbers dynamically calculate and reflect live nursery stock counts.
  - **Compliance Protocols**: Turnkey stages (site inspection, inventory census, permit compliance, crane mobilization, guarantee maintenance) are synchronized with the CMS protocol editor.
  - **Contact & Dispatch**: Telefax numbers, mobile hotlines, official emails, and Google Plus Code coordinates dynamically propagate across all contact cards, RFP estimators, and schema metadata.

#### 1.3 Modular Admin Panel
- **Company Profile Hub Refactoring**: Modularized the monolithic company manager into 6 focused sub-forms:
  1. `CompanyIdentityForm.tsx`: Brand name, acronym, founder, manager, and tenure ranges.
  2. `CompanyTransitionForm.tsx`: SEC corporate conversion status, registration numbers, and corporate structure.
  3. `CompanyLegalForm.tsx`: Government permits, tax registrations, and DENR nursery accreditations.
  4. `CompanyContactForm.tsx`: Dispatch locations, telefax, cell hotlines, and emails.
  5. `CompanySafetyForm.tsx`: 12-month survival guarantee terms, replacement coverage, and safe manhour milestones.
  6. `CompanyStatsForm.tsx`: Metric counters displayed in the website hero banner.

---

### 2. Security & Compliance Architecture

#### 2.1 Credential & Session Hardening
- **HMAC-SHA256 Signed Sessions**: Administrator sessions utilize tamper-proof Web Crypto HMAC signatures with a 7-day sliding expiration.
- **Environment Key Separation**: Checks `SESSION_SECRET` with fallback to `ADMIN_SESSION_SECRET` and `ADMIN_PASSWORD`.
- **Admin Password Management**: Password changes performed via the System Settings interface persist immediately to the secure `fhg:settings` atomic store without requiring server redeployment.
- **Login Defense & Rate Limiting**: Built-in sliding-window rate limiters block brute-force attempts on `/api/admin/auth/login` (10 requests per 15 minutes) and prevent spam flooding on `/api/inquiry` (10 requests per 10 minutes).

#### 2.2 Strict Input Validation & Schema Guardrails
- **Zod Runtime Validation**: Every PUT/POST API route parses and validates inbound client payloads against strict Zod schemas (`companyDataSchema`, `serviceItemSchema`, `projectItemSchema`, `equipmentItemSchema`, `speciesItemSchema`, `faqItemSchema`, `protocolStepSchema`, `documentItemSchema`, `adminSettingsSchema`). Invalid schemas are rejected with standard HTTP 422 errors before reaching storage.

#### 2.3 Cloud File Storage & Media Uploads
- **Dual-Mode Upload Pipeline**: `/api/admin/upload` automatically stores uploaded files in **Vercel Blob** when `BLOB_READ_WRITE_TOKEN` is present, and smoothly falls back to local disk storage (`public/uploads/`) during local development.
- **MIME Type & File Extension Whitelisting**: Restricts uploads to verified images (`.jpg`, `.jpeg`, `.png`, `.webp`) and business documents (`.pdf`). Rejects file sizes exceeding 10 MB.

#### 2.4 SEO & Privacy Compliance
- **Dynamic Multi-Domain Canonicalization**: Centralized `SITE_URL` utility (`src/lib/site.ts`) derives canonical tags, OpenGraph previews, and Schema.org JSON-LD definitions from `process.env.NEXT_PUBLIC_SITE_URL`.
- **Search Engine Isolation**: Dynamic `robots.ts` disallows search bot crawlers from indexing `/admin/*`, `/api/*`, and internal build assets (`/_next/*`).
- **Data Privacy Act (RA 10173)**: Inquiries inbox provides full audit records with timestamp, client dossier, and secure deletion guarded by `AdminModal` confirmations.

---

### 3. Business Continuity & Disaster Recovery

#### 3.1 Snapshots & Backups
- **Export System Snapshot**: One-click download of a formatted JSON archive containing all 11 business domains (`fhg_full_backup_YYYY-MM-DD.json`).
- **Restore from JSON**: Secure file upload restores entire company profiles, equipment lists, and catalogs with automatic format validation.
- **Factory Baseline Reset**: One-click restoration back to Forest Hills Garden official default records, guarded by double confirmation.

---

### 4. Client Handover & Quick-Start Checklist

1. **Environment Variables**: Configure the following in your hosting provider (e.g. Vercel Project Settings):
   ```env
   # Canonical Site URL (Your domain)
   NEXT_PUBLIC_SITE_URL=https://foresthillsgarden.ph

   # Admin Authentication & Session
   ADMIN_PASSWORD=your_secure_password_here
   SESSION_SECRET=your_32_character_random_secret_key_here

   # Database (Vercel KV / Upstash Redis)
   KV_REST_API_URL=https://...
   KV_REST_API_TOKEN=...

   # Cloud File Uploads (Vercel Blob)
   BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
   ```

2. **Accessing the CMS Back-Office**:
   - URL: `/admin` (or `/admin/login`)
   - Sign in using your `ADMIN_PASSWORD`.
   - Update company details, equipment, and species anytime; changes propagate live to all website visitors immediately.

3. **Routine Backups**:
   - Navigate to **Admin Panel -> System Settings**.
   - Click **Download JSON Backup** before large organizational updates or server migrations.
