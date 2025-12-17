import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    locales: [
      'ar',
      'en',
    ],
  },
  bootstrap(app: StrapiApp) {
    console.log('=== i18n Field Lock Extension Loading ===');

    // Inject CSS for visual indicators on locked fields
    const style = document.createElement('style');
    style.textContent = `
      [data-field-locked="true"] {
        position: relative;
      }
      [data-field-locked="true"] input,
      [data-field-locked="true"] textarea,
      [data-field-locked="true"] select,
      [data-field-locked="true"] .ql-editor,
      [data-field-locked="true"] button {
        background-color: #f6f6f9 !important;
        cursor: not-allowed !important;
        opacity: 0.7;
        pointer-events: none !important;
      }
      [data-field-locked="true"]::after {
        content: "🔒 Shared field";
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 11px;
        color: #666;
        background: #fff;
        padding: 2px 6px;
        border-radius: 3px;
        z-index: 10;
      }
    `;
    document.head.appendChild(style);
    console.log('✓ CSS injected');

    // List of field names that are typically non-localized
    const nonLocalizedFieldNames = [
      'price', 'discountedPrice', 'currency',
      'publishedDate', 'createdAt', 'updatedAt',
      'order', 'rating', 'value',
      'isActive', 'featured', 'showStatistics',
      'level', 'packageType',
      'thumbnail', 'featuredImage', 'photo', 'logo', 'icon', 'badge', 'backgroundImage',
      'instructor', 'courses', 'category', 'articles',
      'socialLinks', 'includes', 'benefits', 'achievements', 'specializations'
    ];

    // Lock fields based on name and type
    const lockFields = () => {
      const url = window.location.href;

      const localeMatch = url.match(/plugins%5Bi18n%5D%5Blocale%5D=([^&]+)/) ||
        url.match(/plugins\[i18n\]\[locale\]=([^&]+)/);

      if (!localeMatch) return;

      const currentLocale = localeMatch[1];
      const defaultLocale = 'en';

      if (currentLocale === defaultLocale) return;

      // Find all inputs directly - more robust than looking for wrappers first
      const allInputs = document.querySelectorAll('input, textarea, select, button[role="switch"]');
      let lockedCount = 0;

      allInputs.forEach((element) => {
        const input = element as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
        const fieldName = input.name || input.getAttribute('name') || '';
        const fieldType = input.type || input.tagName.toLowerCase();

        // Skip keys that are definitely system/internal (unless specific known ones)
        if (!fieldName || fieldName.startsWith('__') || fieldName === 'locale') return;

        // Check against our non-localized list patterns
        const shouldLock = nonLocalizedFieldNames.some(name =>
          fieldName === name ||
          fieldName.endsWith(`.${name}`) || // For nested fields like component.price
          fieldName.includes(`[${name}]`)   // For array fields
        ) ||
          // Auto-lock certain types
          fieldType === 'number' ||
          fieldType === 'file' ||
          fieldType === 'date' ||
          fieldType === 'datetime-local' ||
          // Lock relations (usually buttons or comboboxes)
          (input.tagName === 'BUTTON' && (fieldName.includes('relation') || fieldName.includes('link')));

        if (shouldLock) {
          // different handling for existing locks to avoid log spam
          if (!input.disabled) {
            console.log(`  🔒 Locking: ${fieldName} (${fieldType})`);

            input.disabled = true;
            input.readOnly = true;
            input.style.pointerEvents = 'none';

            // Find wrapper for visual style
            const wrapper = input.closest('div[class*="Input"], div[class*="Field"]') || input.parentElement;
            if (wrapper) {
              wrapper.setAttribute('data-field-locked', 'true');
            }

            lockedCount++;
          }
        }
      });

      if (lockedCount > 0) {
        // console.log(`✓ Locked ${lockedCount} items`); // Uncomment to see recurring count
      }
    };

    // Run immediately and on interval to catch dynamic content
    lockFields();
    setInterval(lockFields, 1500);

    console.log('✓ i18n Field Lock Extension loaded successfully');
  },
};
