// Translation functionality
document.addEventListener('DOMContentLoaded', function() {
    const translateBtn = document.getElementById('translate-btn');
    const htmlElement = document.documentElement;
    
    // Check if Google Translate API script is already loaded
    function isGoogleTranslateScriptLoaded() {
        return typeof google !== 'undefined' && typeof google.translate !== 'undefined';
    }
    
    // Load Google Translate API script
    function loadGoogleTranslateScript() {
        if (!isGoogleTranslateScriptLoaded()) {
            const script = document.createElement('script');
            script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            script.async = true;
            document.body.appendChild(script);
            
            // Define the callback function
            window.googleTranslateElementInit = function() {
                new google.translate.TranslateElement({
                    pageLanguage: 'ar',
                    includedLanguages: 'en',
                    autoDisplay: false,
                    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
                }, 'google_translate_element');
                
                // Hide the Google Translate widget
                const translateWidget = document.querySelector('.goog-te-menu-frame');
                if (translateWidget) {
                    translateWidget.style.display = 'none';
                }
            };
        }
    }
    
    // Create a hidden div for Google Translate
    const translateElement = document.createElement('div');
    translateElement.id = 'google_translate_element';
    translateElement.style.display = 'none';
    document.body.appendChild(translateElement);
    
    // Initialize translation state
    let isEnglish = false;
    
    // Toggle translation
    function toggleTranslation() {
        if (!isGoogleTranslateScriptLoaded()) {
            loadGoogleTranslateScript();
            // Wait for script to load
            const checkInterval = setInterval(() => {
                if (isGoogleTranslateScriptLoaded()) {
                    clearInterval(checkInterval);
                    performTranslation();
                }
            }, 100);
        } else {
            performTranslation();
        }
    }
    
    // Perform the actual translation
    function performTranslation() {
        const translateSelect = document.querySelector('.goog-te-combo');
        
        if (translateSelect) {
            if (!isEnglish) {
                // Translate to English
                translateSelect.value = 'en';
                translateSelect.dispatchEvent(new Event('change'));
                translateBtn.textContent = 'العربية';
                htmlElement.setAttribute('dir', 'ltr');
                htmlElement.setAttribute('lang', 'en');
                isEnglish = true;
            } else {
                // Translate back to Arabic
                translateSelect.value = 'ar';
                translateSelect.dispatchEvent(new Event('change'));
                translateBtn.textContent = 'English';
                htmlElement.setAttribute('dir', 'rtl');
                htmlElement.setAttribute('lang', 'ar');
                isEnglish = false;
            }
        }
    }
    
    // Add click event to translation button
    if (translateBtn) {
        translateBtn.addEventListener('click', toggleTranslation);
    }
    
    // Alternative translation method if Google Translate fails
    function fallbackTranslation() {
        // Define translations for key elements
        const translations = {
            // Navigation
            'الرئيسية': 'Home',
            'من نحن': 'About Us',
            'خدماتنا': 'Our Services',
            
            // Home page
            'عيادة برايت للأسنان': 'Bright Dental Clinic',
            'ابتسامة مشرقة تدوم مدى الحياة': 'A Bright Smile That Lasts a Lifetime',
            'نقدم أفضل رعاية للأسنان بأحدث التقنيات والمعدات': 'We provide the best dental care with the latest technologies and equipment',
            'احجز موعدك الآن': 'Book Your Appointment Now',
            'صور من عيادتنا': 'Images from Our Clinic',
            
            // About page
            'تأسست عيادة برايت للأسنان في عام 2012': 'Bright Dental Clinic was established in 2012',
            'رؤيتنا': 'Our Vision',
            'التزامنا': 'Our Commitment',
            'فريقنا': 'Our Team',
            'هل تحتاج إلى استشارة؟': 'Need a Consultation?',
            'تواصل معنا الآن لحجز موعد أو للحصول على استشارة': 'Contact us now to book an appointment or get a consultation',
            'تواصل عبر الواتساب': 'Contact via WhatsApp',
            
            // Services page
            'خدماتنا': 'Our Services',
            'نقدم في عيادة برايت للأسنان مجموعة متكاملة من خدمات طب الأسنان بأعلى معايير الجودة': 'At Bright Dental Clinic, we offer a comprehensive range of dental services with the highest quality standards',
            'علاجات الأسنان': 'Dental Treatments',
            'تنظيف الأسنان': 'Teeth Cleaning',
            'تبييض الأسنان': 'Teeth Whitening',
            'علاج تسوسات الأسنان': 'Cavity Treatment',
            'علاج العصب': 'Root Canal Treatment',
            'تقويم الأسنان': 'Dental Braces',
            'تقويم الأسنان المعدني': 'Metal Braces',
            'تقويم الأسنان الشفاف': 'Clear Braces',
            'زراعة وجراحة الأسنان': 'Dental Implants and Surgery',
            'خلع الأسنان العادي': 'Regular Tooth Extraction',
            'خلع الأسنان الجراحي': 'Surgical Tooth Extraction',
            'زراعة الأسنان': 'Dental Implants',
            
            // Footer
            'واتساب': 'WhatsApp',
            'انستغرام': 'Instagram',
            'العنوان': 'Address',
            'رأس الخيمة - القصيدات - بناية شوكولالا - 301': 'Ras Al Khaimah - Al Qusaidat - Chocolala Building - 301',
            'جميع الحقوق محفوظة': 'All Rights Reserved'
        };
        
        // Function to translate text content
        function translateElement(element) {
            if (element.childNodes.length === 1 && element.childNodes[0].nodeType === 3) {
                const text = element.textContent.trim();
                if (translations[text]) {
                    element.textContent = translations[text];
                }
            } else {
                element.childNodes.forEach(child => {
                    if (child.nodeType === 1) { // Element node
                        translateElement(child);
                    }
                });
            }
        }
        
        // Toggle between Arabic and English
        if (!isEnglish) {
            // Add fade-out class
            document.body.classList.add('fade-out');
            
            // Wait for fade-out animation
            setTimeout(() => {
                // Translate to English
                translateElement(document.body);
                translateBtn.textContent = 'العربية';
                htmlElement.setAttribute('dir', 'ltr');
                htmlElement.setAttribute('lang', 'en');
                isEnglish = true;
                
                // Add fade-in class
                document.body.classList.remove('fade-out');
                document.body.classList.add('fade-in');
            }, 300);
        } else {
            // Reload the page to restore Arabic content
            window.location.reload();
        }
    }
    
    // Use fallback if Google Translate fails to load after 3 seconds
    setTimeout(() => {
        if (!isGoogleTranslateScriptLoaded() && translateBtn) {
            translateBtn.removeEventListener('click', toggleTranslation);
            translateBtn.addEventListener('click', fallbackTranslation);
        }
    }, 3000);
});

// Add smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add animation to elements when they come into view
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe service items, gallery items, and sections
    document.querySelectorAll('.service-item, .gallery-item, section').forEach(item => {
        observer.observe(item);
    });
});

// Fix WhatsApp link for mobile
document.addEventListener('DOMContentLoaded', function() {
    const whatsappLinks = document.querySelectorAll('a.whatsapp-btn');
    
    whatsappLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes('wa.me/')) {
            // Ensure the number has the correct format with country code
            const phoneNumber = href.split('wa.me/')[1];
            if (!phoneNumber.startsWith('+')) {
                // Add UAE country code if not present
                link.setAttribute('href', `https://wa.me/+971${phoneNumber}`);
            }
        }
    });
});
