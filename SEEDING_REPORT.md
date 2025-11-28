# Data Seeding Report

I have extracted the following data from your images/text and programmed the CMS to automatically insert it.

## 👨‍🏫 Instructors (Added)

1. **Nashwan Mohammed Al-Thawr** (MFTA)
   - **Credentials**: MFTA, CME Globex
   - **Bio**: Owner/Founder Modern Money Experts. 20 years global experience.
   - **Achievements**: +500% Blockchain Portfolio, +180% Covid-19 Portfolio, +23.8% Nasdaq 100.
   - **Specializations**: Technical Analysis, Smart Money, Options.

2. **Ghamdan Mohammed Al-Thawr** (CFTe)
   - **Credentials**: CFTe
   - **Bio**: Fundamental Analysis Expert, Fund Management. 15+ years experience.
   - **Specializations**: Fundamental Analysis, Risk Management, Corporate Finance.

## 🎓 Courses (Added)

1. **Beginner Track**: Trading & Investment Basics (Instructor: Nashwan)
2. **Advanced Technical Analysis**: Liquidity, Market Depth, Order Flow (Instructor: Nashwan)
3. **International Certifications**: CFTe – IFTA preparation (Instructors: Nashwan + Ghamdan)
4. **Fundamental Analysis**: Corporate Finance, Risk Management (Instructor: Ghamdan)
5. **Elite Track**: Smart Money Tracking (Instructor: Nashwan)

## 📦 Packages (Added)

1. **Gold Package**: Beginner + Advanced Tech (Price: 5000 EGP)
2. **Platinum Package**: Tracks 1-4 (Price: 10000 EGP)
3. **VIP Elite**: All Tracks + Elite Program + MMEC (Price: 20000 EGP)

## 🤝 Partnerships (Added)

- **Modern Money Experts LLC**: Strategic Partner, Exclusive Agent in Egypt.

## 🏠 Homepage Content (Added)

- **Hero Banner**: "تعلم.. حلل.. قرر بثقة"
- **Statistics**: 15+ Years, 10K Trainees, 2,532 Seminars, 31+ Awards.
- **Services**: Training Courses, Financial Analysis, Portfolio Management.
- **FAQs**: General questions about services and courses.
- **Global Settings**: Contact info, address, footer text.

---

## 🔄 How to Reset/Re-seed

The seed script (`src/scripts/seed.ts`) runs automatically when you start the server, **BUT only if the database is empty** (specifically, if there are no instructors).

To re-run the seed:
1. Go to Admin Panel > Content Manager.
2. Delete all **Instructors**.
3. Restart the server (`npm run develop`).
4. The script will detect 0 instructors and re-populate everything.
