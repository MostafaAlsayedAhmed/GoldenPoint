# Strapi i18n Issue Summary (v5.31.2)

## Problem
You want some fields in a localized content type (e.g. `price`, `image`, `dates`, `id`) to stay **the same across all locales** and not change per language.

---

## What Was Tried
- Used **non-localized fields** (`pluginOptions.i18n.localized: false`).
- Admin UI still allowed editing those fields in every locale.
- API returned **different values per locale**.

---

## Key Finding (Important)
In **Strapi v5.31.2**, this behavior is **expected and by design**:

- Each locale is stored as a **separate database row**.
- “Non-localized” fields:
  - Are copied **only once** when a translation is created.
  - Are **not shared or synced** afterward.
- Admin UI does **not lock** non-localized fields.
- Editing a field in one locale does **not** update other locales.
- There is **no single-source-of-truth** for non-localized fields inside a localized content type.
- This is **by design, not a bug**.

This explains why the API returns different values per locale.

---

## Correct Solutions (Ranked)

### ✅ Best / Production-Safe Solution
**Move shared fields to a separate, non-localized content type**

**Recommended structure:**
- `serviceShared` (not localized)
  - price
  - image
  - dates
- `service` (localized)
  - title
  - description
  - relation → `serviceShared` (1:1)

**Result:**
- One true source of truth
- No accidental overwrites
- Consistent API across locales
- Recommended approach for Strapi v5

---

### ⚠️ Workarounds (if refactor is not possible)
1. **Lifecycle hooks**
   - Block or sync shared fields when editing non-default locales.
2. **Admin UI extension**
   - Disable or hide shared fields in non-default locales (best UX, requires custom admin code).

---

## Existing Data Issue
- Data already diverged between locales.
- You must:
  1. Choose a master locale.
  2. Sync all other locales to it (script/migration).
  3. Enforce one of the solutions above to prevent future divergence.

---

## Final Conclusion
- Non-localized fields are **not truly shared in Strapi v5**.
- There is **no single-source-of-truth** within localized content types.
- Your Admin UI and API behavior are correct and expected.
- **The only clean, future-proof solution is a separate shared content type**.
