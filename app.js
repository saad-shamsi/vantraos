/* ===================================================================
   VANTRA OS — Interactive Logic & Dynamics
   - Lucide Icons Initialization
   - IntersectionObserver Scroll Reveal
   - Interactive ROI & Leakage Calculator
   - Form Submission with Dynamic WhatsApp Forwarding
   - Mobile Navigation Drawer
=================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  
  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('active');
    });

    // Close drawer when link clicked
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
      });
    });
  }

  // 3. Scroll Reveal Animation via IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 4. Interactive ROI & Margin Leakage Calculator
  const eventsRange = document.getElementById('eventsRange');
  const avgRevenueRange = document.getElementById('avgRevenueRange');
  const vendorsRange = document.getElementById('vendorsRange');

  const eventsCountVal = document.getElementById('eventsCountVal');
  const avgRevenueVal = document.getElementById('avgRevenueVal');
  const vendorsVal = document.getElementById('vendorsVal');

  const leakageRecoveredVal = document.getElementById('leakageRecoveredVal');
  const hoursSavedVal = document.getElementById('hoursSavedVal');
  const overbillingVal = document.getElementById('overbillingVal');
  const delayedProtectedVal = document.getElementById('delayedProtectedVal');

  function formatPKR(amount) {
    return 'PKR ' + Math.round(amount).toLocaleString('en-PK');
  }

  function recalculateROI() {
    if (!eventsRange || !avgRevenueRange || !vendorsRange) return;

    const events = parseInt(eventsRange.value, 10);
    const revenuePerEvent = parseInt(avgRevenueRange.value, 10);
    const vendorsPerEvent = parseInt(vendorsRange.value, 10);

    // Update Display Labels
    eventsCountVal.textContent = `${events} Events`;
    avgRevenueVal.textContent = formatPKR(revenuePerEvent);
    vendorsVal.textContent = `${vendorsPerEvent} Vendors`;

    // Monthly Gross Volume
    const totalMonthlyRevenue = events * revenuePerEvent;

    // Empirical Benchmarks:
    // ~5% lost in unrecorded vendor adjustments / duplicate invoicing / cartage creep
    const overbillingsRecovered = totalMonthlyRevenue * 0.018; 
    
    // ~3.2% preserved through delayed billing rate locking (preventing margin erosion)
    const delayedBillsProtected = totalMonthlyRevenue * 0.032;

    const totalRecovered = overbillingsRecovered + delayedBillsProtected;

    // Time savings: Approx 6 hours saved per event across quote/sheet/ledger/calls
    const hoursSaved = events * 6;

    // Update DOM
    if (leakageRecoveredVal) leakageRecoveredVal.textContent = formatPKR(totalRecovered);
    if (hoursSavedVal) hoursSavedVal.textContent = `${hoursSaved} hrs / mo`;
    if (overbillingVal) overbillingVal.textContent = formatPKR(overbillingsRecovered);
    if (delayedProtectedVal) delayedProtectedVal.textContent = formatPKR(delayedBillsProtected);
  }

  if (eventsRange && avgRevenueRange && vendorsRange) {
    eventsRange.addEventListener('input', recalculateROI);
    avgRevenueRange.addEventListener('input', recalculateROI);
    vendorsRange.addEventListener('input', recalculateROI);
    recalculateROI();
  }

  // 5. Early Access Waitlist Form Submission
  const waitlistForm = document.getElementById('waitlistForm');
  const formSuccess = document.getElementById('formSuccess');

  if (waitlistForm && formSuccess) {
    waitlistForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('fullName').value.trim();
      const business = document.getElementById('businessName').value.trim();
      const industry = document.getElementById('industry').value;
      const city = document.getElementById('city').value.trim();
      const phone = document.getElementById('whatsapp').value.trim();
      const volume = document.getElementById('eventsPerMonth').value;
      const pain = document.getElementById('biggestPain').value.trim();

      // Submit feedback button animation
      const submitBtn = document.getElementById('submitBtn');
      if (submitBtn) {
        submitBtn.innerHTML = `<span>Securing Priority Slot...</span>`;
        submitBtn.disabled = true;
      }

      // Store in localStorage for persistence
      const submission = {
        name,
        business,
        industry,
        city,
        phone,
        volume,
        pain,
        timestamp: new Date().toISOString()
      };

      try {
        const stored = JSON.parse(localStorage.getItem('vantra_waitlist_leads') || '[]');
        stored.push(submission);
        localStorage.setItem('vantra_waitlist_leads', JSON.stringify(stored));
      } catch (err) {
        console.warn('Storage unavailable', err);
      }

      // Transition to success state
      setTimeout(() => {
        waitlistForm.style.display = 'none';
        formSuccess.style.display = 'block';

        // Re-run lucide icons on dynamic content
        if (window.lucide) window.lucide.createIcons();

        // Optional: auto-open WhatsApp with personalized data
        const textMsg = encodeURIComponent(
          `Hi Vantra OS! I just applied for Early Access Pilot.\n\n` +
          `• Name: ${name}\n` +
          `• Business: ${business} (${city})\n` +
          `• Industry: ${industry}\n` +
          `• Monthly Volume: ${volume}\n` +
          `• WhatsApp: ${phone}\n` +
          (pain ? `• Key Bottleneck: ${pain}\n` : '') +
          `\nLooking forward to scheduling the system walkthrough!`
        );

        const waUrl = `https://wa.me/923332839452?text=${textMsg}`;
        const fastTrackLink = formSuccess.querySelector('a');
        if (fastTrackLink) {
          fastTrackLink.href = waUrl;
        }
      }, 700);
    });
  }

  // 6. Smooth Navbar background blur on scroll
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        navbar.style.boxShadow = '0 10px 25px -5px rgba(15, 23, 42, 0.08)';
      } else {
        navbar.style.boxShadow = 'none';
      }
    });
  }
});
