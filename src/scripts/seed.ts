
export const seedData = async (strapi) => {
  try {
    // Check if data already exists to avoid duplicates
    const instructorCount = await strapi.db.query('api::instructor.instructor').count();
    if (instructorCount > 0) {
      console.log('✅ Data already exists, skipping seed.');
      return;
    }

    console.log('🌱 Starting data seed...');

    // 1. Create Instructors
    const nashwan = await strapi.entityService.create('api::instructor.instructor', {
      data: {
        name: 'نشوان محمد الثور',
        title: 'MFTA',
        credentials: 'MFTA, CME Globex',
        bio: 'مالك ومؤسس Modern Money Experts. 20 سنة خبرة عالمية. حامل درجة الماجستير في التحليل الفني (MFTA) – أعلى شهادة عالمية.',
        achievements: [
          { title: 'Blockchain Portfolio', value: '+500%' },
          { title: 'Covid-19 Portfolio', value: '+180%' },
          { title: 'Nasdaq 100 Campaign', value: '+23.8%' }
        ],
        specializations: ['Technical Analysis', 'Smart Money', 'Options'],
        locale: 'ar'
      }
    });

    const ghamdan = await strapi.entityService.create('api::instructor.instructor', {
      data: {
        name: 'غمدان محمد الثور',
        title: 'CFTe',
        credentials: 'CFTe',
        bio: 'خبير التحليل الأساسي وإدارة الصناديق. خبير مالي متخصص في التحليل الأساسي، تقييم الشركات، وإدارة الصناديق الاستثمارية بأكثر من 15 عامًا من الخبرة العملية.',
        specializations: ['Fundamental Analysis', 'Risk Management', 'Corporate Finance'],
        locale: 'ar'
      }
    });

    console.log('✅ Instructors created');

    // 2. Create Courses
    const course1 = await strapi.entityService.create('api::course.course', {
      data: {
        title: 'مسار المبتدئين: أساسيات التداول والاستثمار',
        slug: 'beginner-track',
        description: 'أساسيات التداول والاستثمار (مصري | عالمي | سلع ومعادن)',
        level: 'beginner',
        category: 'Beginner',
        instructor: nashwan.id,
        locale: 'ar'
      }
    });

    const course2 = await strapi.entityService.create('api::course.course', {
      data: {
        title: 'مسار التحليل الفني المتقدم وتتبع الأموال الذكية',
        slug: 'advanced-technical-analysis',
        description: 'إتقان تحليل السيولة وعمق السوق (Level 2 – Footprint – Bookmap – Delta) واستراتيجيات الخيارات المركبة.',
        level: 'advanced',
        category: 'Technical Analysis',
        instructor: nashwan.id,
        locale: 'ar'
      }
    });

    const course3 = await strapi.entityService.create('api::course.course', {
      data: {
        title: 'مسار الشهادات الدولية (CFTe – IFTA)',
        slug: 'international-certifications',
        description: 'التأهيل الكامل لشهادة CFTe – IFTA (المنهج الرسمي كامل)',
        level: 'expert',
        category: 'Certifications',
        instructor: [nashwan.id, ghamdan.id], // Both instructors
        locale: 'ar'
      }
    });

    const course4 = await strapi.entityService.create('api::course.course', {
      data: {
        title: 'مسار التحليل الأساسي وإدارة المحافظ والمخاطر',
        slug: 'fundamental-analysis',
        description: 'التحليل والتقييم المالي للشركات، إدارة الصناديق والتحوط المتقدم.',
        level: 'advanced',
        category: 'Fundamental Analysis',
        instructor: ghamdan.id,
        locale: 'ar'
      }
    });

    const course5 = await strapi.entityService.create('api::course.course', {
      data: {
        title: 'مسار النخبة – Golden Point Elite',
        slug: 'elite-track',
        description: 'برنامج تتبع الأموال الذكية – 8 أسابيع مع مدرب شخصي. يشمل وصول دائم لمنصة MMEC RTL.',
        level: 'expert',
        category: 'Elite',
        instructor: nashwan.id,
        locale: 'ar'
      }
    });

    console.log('✅ Courses created');

    // 3. Create Packages
    await strapi.entityService.create('api::course-package.course-package', {
      data: {
        name: 'الباقة الذهبية',
        slug: 'gold-package',
        description: 'تشمل مسار المبتدئين + مسار التحليل الفني المتقدم',
        packageType: 'gold',
        price: 5000, // Placeholder price
        courses: [course1.id, course2.id],
        locale: 'ar'
      }
    });

    await strapi.entityService.create('api::course-package.course-package', {
      data: {
        name: 'الباقة البلاتينية',
        slug: 'platinum-package',
        description: 'تشمل المسارات من 1 إلى 4',
        packageType: 'platinum',
        price: 10000, // Placeholder price
        courses: [course1.id, course2.id, course3.id, course4.id],
        locale: 'ar'
      }
    });

    await strapi.entityService.create('api::course-package.course-package', {
      data: {
        name: 'VIP Elite',
        slug: 'vip-elite',
        description: 'كل المسارات + برنامج النخبة + عضوية MMEC سنة',
        packageType: 'vip',
        price: 20000, // Placeholder price
        courses: [course1.id, course2.id, course3.id, course4.id, course5.id],
        locale: 'ar'
      }
    });

    console.log('✅ Packages created');

    // 4. Create Partnership
    await strapi.entityService.create('api::partnership.partnership', {
      data: {
        name: 'Modern Money Experts LLC',
        description: 'معهد تدريب مالي معتمد في سلطنة عمان ودول مجلس التعاون. منصة MMEC RTL – بيانات حية مدعومة بالذكاء الاصطناعي.',
        partnershipType: 'strategic',
        isExclusive: true,
        credentials: 'الوكيل الحصري في مصر',
        locale: 'ar'
      }
    });

    console.log('✅ Partnership created');

    // 5. Create Homepage Hero
    await strapi.entityService.create('api::hero-banner.hero-banner', {
      data: {
        title: 'تعلم.. حلل.. قرر بثقة',
        subtitle: 'جولدن بوينت للاستشارات وكيل معهد خبراء المال العصرية',
        description: 'Modern Money Experts LLC - الوكيل الحصري في مصر 2025-2026',
        ctaText: 'استكشف الدورات',
        ctaLink: '/courses',
        showStatistics: true,
        locale: 'ar'
      }
    });

    console.log('✅ Hero created');

    // 6. Create Statistics
    await strapi.entityService.create('api::statistic.statistic', {
      data: { label: 'سنوات خبرة', value: '15', suffix: '+', order: 1, locale: 'ar' }
    });
    await strapi.entityService.create('api::statistic.statistic', {
      data: { label: 'متدرب', value: '10', suffix: 'K', order: 2, locale: 'ar' }
    });
    await strapi.entityService.create('api::statistic.statistic', {
      data: { label: 'ندوة', value: '2,532', order: 3, locale: 'ar' }
    });
    await strapi.entityService.create('api::statistic.statistic', {
      data: { label: 'جائزة', value: '31', suffix: '+', order: 4, locale: 'ar' }
    });

    console.log('✅ Statistics created');

    // 7. Create Services
    await strapi.entityService.create('api::service.service', {
      data: {
        title: 'الدورات التدريبية',
        description: 'برامج تدريبية متكاملة من المبتدئ إلى المحترف',
        order: 1,
        locale: 'ar'
      }
    });
    await strapi.entityService.create('api::service.service', {
      data: {
        title: 'التحليل المالي',
        description: 'خدمات تحليل مالي للشركات والأفراد',
        order: 2,
        locale: 'ar'
      }
    });
    await strapi.entityService.create('api::service.service', {
      data: {
        title: 'إدارة المحافظ',
        description: 'استراتيجيات متقدمة لإدارة المحافظ والمخاطر',
        order: 3,
        locale: 'ar'
      }
    });

    console.log('✅ Services created');

    // 8. Create FAQs
    await strapi.entityService.create('api::faq.faq', {
      data: {
        question: 'ما هي طبيعة خدماتكم؟',
        answer: 'نقدم خدمات استشارية وتدريبية في مجال الاستثمار والأسواق المالية.',
        category: 'عام',
        order: 1,
        locale: 'ar'
      }
    });
    await strapi.entityService.create('api::faq.faq', {
      data: {
        question: 'هل الدورات مناسبة للمبتدئين؟',
        answer: 'نعم، لدينا برامج تبدأ من أساسيات الاستثمار والتمويل الشخصي، وصولاً إلى استراتيجيات متقدمة.',
        category: 'الدورات التدريبية',
        order: 2,
        locale: 'ar'
      }
    });

    console.log('✅ FAQs created');

    // 9. Update Global Settings
    // Note: Single types are updated, not created (if they exist) or created if not
    const globalSetting = await strapi.entityService.findMany('api::global-setting.global-setting', { locale: 'ar' });
    
    if (!globalSetting) {
        await strapi.entityService.create('api::global-setting.global-setting', {
            data: {
                siteName: 'Golden Point',
                siteDescription: 'Where Learners Become Investors',
                contactEmail: 'info@modernmoneyexperts.com',
                contactPhone: '+201020004011',
                address: '222 شارع محمد سعيد، أعلى مترو ماركت، الكوثر، الغردقة، البحر الأحمر، مصر',
                footerText: '© 2025 جميع الحقوق محفوظة جولدن بوينت Golden Point',
                locale: 'ar'
            }
        });
        console.log('✅ Global Settings created');
    }

    console.log('✨ Seed completed successfully!');

  } catch (error) {
    console.error('❌ Seed failed:', error);
  }
};
