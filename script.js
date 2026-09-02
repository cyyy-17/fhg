/**
 * FOREST HILLS GARDEN — SCRIPT ENGINE (V2 PRO)
 * Features:
 * - Floating Organic Leaves Particle Canvas
 * - Live Projects Explorer & Tab Filter + Keyword Search
 * - Animated Number Counters
 * - Dynamic Live Fleet Recommendation Engine in RFP Builder
 * - Scroll Progress Bar & Sticky Header
 * - Scroll-triggered Reveal Animations
 * - Interactive Scope RFP Formatter with CC email dispatch
 * - Mobile Navigation Drawer
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. VERIFIED PROJECTS DATABASE (Extracted from 10-Page Company Portfolio) ---
  const projectsData = [
    // Ongoing Infrastructure & Commercial
    {
      client: "San Miguel Corporation / SLTC",
      title: "SLEX TR4 Highway Expansion (Packages B, C, D)",
      location: "Makati–Batangas/Laguna Corridor",
      scope: "Large-scale tree clearing, earthballing & relocation along right-of-way corridor",
      category: "ongoing",
      badge: "Ongoing"
    },
    {
      client: "San Miguel Corporation / SLTC",
      title: "SLEX TR4 Highway Expansion (Packages E & F)",
      location: "Batangas to Quezon Province",
      scope: "Corridor tree removal, earthballing and statutory environmental greening",
      category: "ongoing",
      badge: "Ongoing"
    },
    {
      client: "EEI Corporation",
      title: "Metro Manila Subway Project CP101",
      location: "Tandang Sora, Quirino Hwy, Ugong & Depot Compound",
      scope: "Tree cutting and earthballing works intended for subway stations demolition and depot facility",
      category: "ongoing",
      badge: "Ongoing"
    },
    {
      client: "Leighton Contractors (Asia) Limited",
      title: "Candaba Central Infill (3rd Viaduct Project)",
      location: "NLEX Candaba Viaduct, Pampanga / Bulacan",
      scope: "Tree removal and compensatory seedling replacement delivery",
      category: "ongoing",
      badge: "Ongoing"
    },
    {
      client: "Makati Development Corp. (Ayala)",
      title: "Sereneo / Alveo 6 Development",
      location: "Nuvali, Sta. Rosa, Laguna",
      scope: "Tree cutting, earthballing and supply & delivery of seedling replacement",
      category: "ongoing",
      badge: "Ongoing"
    },
    {
      client: "Makati Development Corp. (Ayala)",
      title: "Alveo Village 2 (Caleia)",
      location: "Vermosa Boulevard, Imus, Cavite",
      scope: "Commercial land dev tree cutting and seedling replacement delivery",
      category: "ongoing",
      badge: "Ongoing"
    },
    {
      client: "Makati Development Corp. (Ayala)",
      title: "Centrala Commercial Land Development",
      location: "Brgy. Miming, Angeles City, Pampanga",
      scope: "Estate clearing, tree cutting and replacement stock delivery",
      category: "ongoing",
      badge: "Ongoing"
    },
    {
      client: "ADHI PTPP Joint Operation",
      title: "Malolos Clark Railway Project CP S-01",
      location: "Solis to Blumentritt, Manila",
      scope: "Railway corridor tree cutting, earthballing and seedling supply",
      category: "ongoing",
      badge: "Ongoing"
    },
    {
      client: "Giga Ace 6, Inc. (AC Energy)",
      title: "Isla Wind Farm Access Road & Land Utilization",
      location: "Brgy. Pandan & Masicap, Real, Quezon",
      scope: "Access road tree removal, special land utilization clearing and sapling replacement",
      category: "ongoing",
      badge: "Ongoing"
    },

    // Tollways & Rail Infrastructure
    {
      client: "NLEX Corporation",
      title: "NLEX-SLEX Connector Road Project",
      location: "C-3 Caloocan to Sta. Mesa Traversing Manila",
      scope: "Tree cutting, balling and compensatory seedling replacement across interchange",
      category: "infrastructure",
      badge: "Completed"
    },
    {
      client: "NLEX Corporation",
      title: "NLEX Enhancement Project (Tambubong & Balagtas)",
      location: "Tambubong to Balagtas Interchanges, Bulacan",
      scope: "Tree cutting, earthballing and supply of replacement saplings for tollway widening",
      category: "infrastructure",
      badge: "Completed"
    },
    {
      client: "NLEX Corporation",
      title: "PNR Railway Tracks Realignment",
      location: "City of Manila Corridor",
      scope: "Tree cutting and replacement of affected trees along railway easement",
      category: "infrastructure",
      badge: "Completed"
    },
    {
      client: "D.M. Consunji, Inc. (DMCI)",
      title: "South Metro Manila Skyway Stage 3",
      location: "Metro Manila Corridor (Buendia to Balintawak)",
      scope: "Tree moving and earthballing for elevated expressway piers",
      category: "infrastructure",
      badge: "Completed"
    },
    {
      client: "D.M. Consunji, Inc. (DMCI)",
      title: "South Metro Manila Skyway Stage 2",
      location: "Bicutan to Alabang Viaduct Corridor",
      scope: "Specialized root-balling and transplanting of expressway trees",
      category: "infrastructure",
      badge: "Completed"
    },
    {
      client: "Shimizu Corporation (Manila Branch)",
      title: "LRT Line 1 Cavite Extension Project",
      location: "LRTA Compound, Aurora Blvd., Pasay City",
      scope: "Precision tree cutting and earthballing within depot compound",
      category: "infrastructure",
      badge: "Completed"
    },
    {
      client: "First Balfour, Inc.",
      title: "LRT Line 1 Cavite Expansion Project",
      location: "Parañaque & Pasay Right-of-Way Corridor",
      scope: "Tree cutting, earthballing and compensatory nursery tree supply",
      category: "infrastructure",
      badge: "Completed"
    },
    {
      client: "Bouygues Travaux Publics Philippines",
      title: "LRT-1 Extension (Baclaran to Dr. A. Santos)",
      location: "Baclaran, Parañaque & Las Piñas Corridor",
      scope: "Comprehensive tree cutting and earthballing along coastal alignment",
      category: "infrastructure",
      badge: "Completed"
    },
    {
      client: "DMCI / First Balfour Joint Venture",
      title: "MRT-LRT Loop Extension Project",
      location: "NIA Compound, Quezon City",
      scope: "Tree relocation and site clearing for transit loop connection",
      category: "infrastructure",
      badge: "Completed"
    },
    {
      client: "Sta. Clara International Corp.",
      title: "North-South Commuter Railway (NSCR)",
      location: "Tutuban, Manila to Malolos & Calumpit, Bulacan",
      scope: "Supply of labor, equipment & tools for coconut & fruit tree cutting along alignment",
      category: "infrastructure",
      badge: "Completed"
    },
    {
      client: "Bases Conversion & Dev. Authority (BCDA)",
      title: "Lawton Avenue Widening (Phases 1 & 2)",
      location: "5th Avenue to Bayani Road, Taguig City",
      scope: "Tree cutting, earthballing and uprooting project for urban boulevard expansion",
      category: "infrastructure",
      badge: "Completed"
    },

    // Commercial & Township Estates
    {
      client: "SM Prime Holdings, Inc.",
      title: "SM Supermalls Commercial Expansions (27+ Locations)",
      location: "Megamall, Mall of Asia, Clark, Fairview, Batangas, Lipa, etc.",
      scope: "Tree moving, carpark expansions, earthballing and tree cutting across nationwide malls",
      category: "commercial",
      badge: "Completed"
    },
    {
      client: "SM Development Corporation (SMDC)",
      title: "Calm & Dawn Residences",
      location: "Sta. Rosa, Laguna",
      scope: "Tree cutting and earthballing works to prepare multi-tower residential footprint",
      category: "commercial",
      badge: "Completed"
    },
    {
      client: "SM Development Corporation (SMDC)",
      title: "Vine & Bloom Residences",
      location: "Novaliches, QC & Dr. A. Santos Ave., Parañaque",
      scope: "Area clearing, tree removal and specimen tree earthballing",
      category: "commercial",
      badge: "Completed"
    },
    {
      client: "Keyland Corporation",
      title: "Vermira Estate Subdivision",
      location: "Brgy. Lumbang & Talisay, Lipa City, Batangas",
      scope: "Comprehensive tree removal, site clearing and masterplanned landscaping works",
      category: "commercial",
      badge: "Completed"
    },
    {
      client: "Ayala Land Estates, Inc.",
      title: "Areza Commercial Estate (Phase 1)",
      location: "Brgy. Bulacnin, Lipa City, Batangas",
      scope: "Tree removal, balling and site conditioning for flagship commercial township",
      category: "commercial",
      badge: "Completed"
    },
    {
      client: "Makati Development Corp. (MDC)",
      title: "Arbor Lanes & Tryne Enterprise Plaza (Xavier I, II, III)",
      location: "ARCA South, Taguig City",
      scope: "Earthballing, tree cutting and replacement nursery supply for mixed-use hub",
      category: "commercial",
      badge: "Completed"
    },
    {
      client: "BGC Seda Hotel & Ayala Malls",
      title: "Seda Hotel & Vertis North Greening",
      location: "Fort Bonifacio, Taguig & Vertis North, Quezon City",
      scope: "Tree moving, rootball transplanting and specimen tree stabilization",
      category: "commercial",
      badge: "Completed"
    },

    // Reforestation & National Greening Program
    {
      client: "DENR – PENRO Zambales",
      title: "Comprehensive Site Development for NGP / Reforestation",
      location: "Sitio Ulpoy, Iba (757 ha) & Susong Dalaga, Sta. Cruz (1,870 ha)",
      scope: "2,627 hectares total. Year 1 plantation establishment, Years 2–3 protection & maintenance (100% Accomplished)",
      category: "reforestation",
      badge: "Completed"
    },
    {
      client: "DENR – National Greening Program (11 Regional PENROs)",
      title: "Supply & Delivery of Quality Seedlings & Saplings",
      location: "Batangas, Laguna, Cavite, Pampanga, Bulacan, Bataan, Quezon, Zambales, Antique, Iloilo, NCR",
      scope: "Multi-year propagation and delivery of hundreds of thousands of native & fruit saplings",
      category: "reforestation",
      badge: "Completed"
    },
    {
      client: "Development Bank of the Philippines (DBP)",
      title: "DBP Forest Program Reforestation",
      location: "Baler, Province of Aurora",
      scope: "Accredited partner in establishment and greening of protected forest reserve",
      category: "reforestation",
      badge: "Completed"
    },
    {
      client: "Sta. Clara International Corp.",
      title: "La Mesa Dam Spillway Rehabilitation",
      location: "La Mesa Watershed Reserve, Quezon City",
      scope: "Tree moving and earthballing to safeguard watershed ecology during spillway upgrade",
      category: "reforestation",
      badge: "Completed"
    }
  ];

  // --- 2. RENDER PROJECTS GRID WITH LIVE FILTER & SEARCH ---
  const projectsGrid = document.getElementById('projectsGrid');
  const projectSearchInput = document.getElementById('projectSearchInput');
  const projectTabs = document.querySelectorAll('.project-tab');
  const noProjectsMsg = document.getElementById('noProjectsMessage');

  // Update Counters in Tabs
  const countAll = document.getElementById('countAll');
  const countOngoing = document.getElementById('countOngoing');
  const countInfra = document.getElementById('countInfra');
  const countComm = document.getElementById('countComm');
  const countRef = document.getElementById('countRef');

  if (countAll) countAll.textContent = projectsData.length;
  if (countOngoing) countOngoing.textContent = projectsData.filter(p => p.category === 'ongoing').length;
  // Load More state
  const INITIAL_PROJECT_COUNT = 12;
  let showingAll = false;
  let currentFilter = 'all';
  let searchQuery = '';

  function renderProjects() {
    if (!projectsGrid) return;

    let filtered;
    if (currentFilter === 'all') {
      filtered = projectsData;
    } else if (currentFilter === 'ongoing') {
      filtered = projectsData.filter(p => p.badge === 'Ongoing');
    } else {
      filtered = projectsData.filter(p => p.category === currentFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(p =>
        p.client.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.scope.toLowerCase().includes(q)
      );
    }

    // Update tab counts
    const countAll = document.getElementById('countAll');
    const countOngoing = document.getElementById('countOngoing');
    const countInfra = document.getElementById('countInfra');
    const countComm = document.getElementById('countComm');
    const countRef = document.getElementById('countRef');
    if (countAll) countAll.textContent = projectsData.length;
    if (countOngoing) countOngoing.textContent = projectsData.filter(p => p.badge === 'Ongoing').length;
    if (countInfra) countInfra.textContent = projectsData.filter(p => p.category === 'infrastructure').length;
    if (countComm) countComm.textContent = projectsData.filter(p => p.category === 'commercial').length;
    if (countRef) countRef.textContent = projectsData.filter(p => p.category === 'reforestation').length;

    if (filtered.length === 0) {
      projectsGrid.innerHTML = '';
      if (noProjectsMsg) noProjectsMsg.style.display = 'block';
      const existingBtn = document.getElementById('loadMoreProjectsBtn');
      if (existingBtn) existingBtn.style.display = 'none';
      return;
    }
    if (noProjectsMsg) noProjectsMsg.style.display = 'none';

    // Slice for load-more (bypass when searching)
    const displayItems = (searchQuery.trim() || showingAll)
      ? filtered
      : filtered.slice(0, INITIAL_PROJECT_COUNT);

    projectsGrid.innerHTML = displayItems.map(p => `
      <article class="project-card" data-reveal>
        <div>
          <div class="project-card-header">
            <span class="project-client-name">${escapeHTML(p.client)}</span>
            <span class="project-badge ${p.badge.toLowerCase()}">${escapeHTML(p.badge)}</span>
          </div>
          <h3 class="project-title">${escapeHTML(p.title)}</h3>
          <div class="project-location">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>${escapeHTML(p.location)}</span>
          </div>
        </div>
        <p class="project-scope-desc">${escapeHTML(p.scope)}</p>
      </article>
    `).join('');

    // Load More button
    let loadMoreWrapper = document.getElementById('loadMoreProjectsBtn');
    const hasMore = !searchQuery.trim() && !showingAll && filtered.length > INITIAL_PROJECT_COUNT;

    if (hasMore) {
      if (!loadMoreWrapper) {
        loadMoreWrapper = document.createElement('div');
        loadMoreWrapper.id = 'loadMoreProjectsBtn';
        loadMoreWrapper.style.cssText = 'text-align:center;margin-top:36px;grid-column:1/-1;';
        projectsGrid.insertAdjacentElement('afterend', loadMoreWrapper);
      }
      loadMoreWrapper.style.display = 'block';
      loadMoreWrapper.innerHTML = `<button class="btn btn-emerald" style="padding:14px 40px;font-size:0.95rem;" id="loadMoreBtn">
        Show All ${filtered.length} Projects &nbsp;↓
      </button>`;
      document.getElementById('loadMoreBtn').addEventListener('click', () => {
        showingAll = true;
        renderProjects();
      });
    } else {
      if (loadMoreWrapper) loadMoreWrapper.style.display = 'none';
    }

    // Trigger reveal for newly injected cards
    initReveals();
  }

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Reset showingAll on tab/search change
  projectTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      projectTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      currentFilter = tab.getAttribute('data-filter') || 'all';
      showingAll = false;
      renderProjects();
    });
  });

  // Search Input Listener
  const clearSearchBtn = document.getElementById('clearSearchBtn');

  if (projectSearchInput) {
    projectSearchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (clearSearchBtn) {
        clearSearchBtn.style.display = searchQuery.trim() ? 'flex' : 'none';
      }
      showingAll = false;
      renderProjects();
    });
  }

  if (clearSearchBtn && projectSearchInput) {
    clearSearchBtn.addEventListener('click', () => {
      projectSearchInput.value = '';
      searchQuery = '';
      clearSearchBtn.style.display = 'none';
      showingAll = false;
      projectSearchInput.focus();
      renderProjects();
    });
  }

  // Initial Render
  renderProjects();

  // --- 3. FLOATING LEAVES & NATURE PARTICLES CANVAS ---
  const canvas = document.getElementById('leafCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let width = 0;
    let height = 0;

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * -100;
        this.size = Math.random() * 12 + 6;
        this.speedX = Math.random() * 1.5 - 0.75;
        this.speedY = Math.random() * 1.2 + 0.6;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.03;
        this.type = Math.random() > 0.45 ? 'leaf' : 'mote';
        this.opacity = Math.random() * 0.35 + 0.15;
        // Logo colors: sun gold (#ffd600), vivid grass green (#4caf50), lime green (#76c442)
        this.color = Math.random() > 0.75 ? '#ffd600' : (Math.random() > 0.5 ? '#4caf50' : '#76c442');
      }
      update() {
        this.y += this.speedY;
        this.x += Math.sin(this.y * 0.008) * 0.6 + this.speedX;
        this.rotation += this.rotSpeed;

        if (this.y > height + 50 || this.x < -50 || this.x > width + 50) {
          this.reset();
        }
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;

        if (this.type === 'leaf') {
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size, this.size * 0.42, 0, 0, Math.PI * 2);
          ctx.fill();
          // Subtle organic vein
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(-this.size * 0.75, 0);
          ctx.lineTo(this.size * 0.75, 0);
          ctx.stroke();
        } else {
          // Ambient Botanical Mote
          ctx.fillStyle = this.color;
          ctx.shadowBlur = 8;
          ctx.shadowColor = this.color;
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 0.2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }
    }

    const particleCount = window.innerWidth < 768 ? 22 : 48;
    for (let i = 0; i < particleCount; i++) {
      const p = new Particle();
      p.y = Math.random() * height;
      particles.push(p);
    }

    let rafId = null;
    let canvasRunning = false;

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      rafId = requestAnimationFrame(animateParticles);
    }

    // Pause canvas when hero is off-screen to save battery & CPU
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReduced) {
      const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (!canvasRunning) {
              canvasRunning = true;
              animateParticles();
            }
          } else {
            if (rafId) {
              cancelAnimationFrame(rafId);
              rafId = null;
              canvasRunning = false;
            }
          }
        });
      }, { threshold: 0 });
      heroObserver.observe(canvas.parentElement);
    }
  }

  // --- 4. ANIMATED COUNTERS ---
  const counters = document.querySelectorAll('.counter');
  let countersAnimated = false;

  function runCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 1800;
      const startTime = performance.now();

      function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - (1 - progress) * (1 - progress);
        const currentVal = Math.floor(easeOut * target);

        counter.textContent = currentVal.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          counter.textContent = target.toLocaleString();
        }
      }
      requestAnimationFrame(updateNumber);
    });
  }

  const statsSection = document.querySelector('.hero-stats-wrapper');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          runCounters();
        }
      });
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
  }

  // --- 5. DYNAMIC LIVE FLEET RECOMMENDATION IN RFP BUILDER ---
  const estService = document.getElementById('estService');
  const estVolume = document.getElementById('estVolume');
  const liveFleetContainer = document.getElementById('liveFleetRecommendation');

  function updateFleetRecommendation() {
    if (!estService || !estVolume || !liveFleetContainer) return;

    const svc = estService.value;
    const vol = estVolume.value;

    let fleetTags = [];

    if (svc.includes('Earthballing')) {
      fleetTags = ['Heavy Crane 25T/50T Rigging', 'Root Ball Trenching Crew', 'Burlap & Wire Conditioning', 'Boom Truck Transport'];
    } else if (svc.includes('Cutting') || svc.includes('Hazardous')) {
      fleetTags = ['89 DENR Chainsaw Unit Pool', 'Wood Chipper 12-inch', 'Aerial Bucket Truck', 'OSHA Certified Tree Fallers'];
    } else if (svc.includes('Coconut')) {
      fleetTags = ['PCA Certified Chainsaws', 'Agricultural Timber Saws', 'Flatbed Hauling 10-Wheeler', 'PCA Permit Alignment'];
    } else if (svc.includes('Seedling') || svc.includes('Reforestation')) {
      fleetTags = ['100,000+ Talisay Nursery Beds', 'Closed-Van Plant Hauler', 'Mycorrhizal Inoculants', 'Multi-Year Field Foresters'];
    } else {
      fleetTags = ['Topsoil Sifting Plant', 'Heavy Bobcat Loader', 'Rotary Tillers', 'Hardscape & Softscape Team'];
    }

    if (vol.includes('Major') || vol.includes('Hectare')) {
      fleetTags.push('Multi-Team Rapid Mobilization', 'On-Site Forestry Engineer');
    }

    liveFleetContainer.innerHTML = fleetTags.map(tag => `<span class="fleet-pill">${tag}</span>`).join('');
  }

  if (estService && estVolume) {
    estService.addEventListener('change', updateFleetRecommendation);
    estVolume.addEventListener('change', updateFleetRecommendation);
    updateFleetRecommendation();
  }

  // --- 6. SCROLL PROGRESS & HEADER BLUR ---
  const progressBar = document.getElementById('scrollProgress');
  const mainHeader = document.getElementById('mainHeader');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }

    if (mainHeader) {
      if (scrollY > 40) {
        mainHeader.classList.add('scrolled');
      } else {
        mainHeader.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollY > 600) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }

    updateActiveNav();
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- 7. SCROLLSPY ACTIVE NAV HIGHLIGHT ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  function updateActiveNav() {
    const scrollPosition = window.scrollY + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // --- 8. INTERSECTION OBSERVER FOR REVEAL ANIMATIONS ---
  function initReveals() {
    const revealElements = document.querySelectorAll('[data-reveal]:not(.revealed)');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-reveal-delay') || 0;
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }
  initReveals();

  // --- 9. MOBILE MENU TOGGLE ---
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileMenuBtn.classList.toggle('active', isOpen);
      mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileDrawer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileDrawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }

  // --- 10. INTERACTIVE SCOPE ESTIMATOR / FORM HANDLERS ---
  const scopeEstimatorForm = document.getElementById('scopeEstimatorForm');
  const generalContactForm = document.getElementById('generalContactForm');

  function showToast(title, message) {
    const toast = document.getElementById('toastNotification');
    const toastTitle = document.getElementById('toastTitle');
    const toastMsg = document.getElementById('toastMessage');

    if (!toast) return;

    if (toastTitle) toastTitle.textContent = title;
    if (toastMsg) toastMsg.textContent = message;

    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  // Validation helper
  function validateField(input, msg) {
    const group = input.closest('.form-group');
    if (!group) return true;
    let errEl = group.querySelector('.form-error');
    if (!errEl) {
      errEl = document.createElement('span');
      errEl.className = 'form-error';
      group.appendChild(errEl);
    }
    const val = input.value.trim();
    if (!val) {
      group.classList.add('error');
      errEl.textContent = msg;
      return false;
    }
    if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      group.classList.add('error');
      errEl.textContent = 'Please enter a valid email address.';
      return false;
    }
    group.classList.remove('error');
    return true;
  }

  function setupFormInputClearing(form) {
    form.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('input', () => {
        const group = input.closest('.form-group');
        if (group && input.value.trim()) {
          group.classList.remove('error');
        }
      });
    });
  }

  if (scopeEstimatorForm) {
    setupFormInputClearing(scopeEstimatorForm);

    scopeEstimatorForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('estName');
      const companyInput = document.getElementById('estCompany');
      const contactInput = document.getElementById('estContact');
      const emailInput = document.getElementById('estEmail');

      let firstInvalid = null;
      if (!validateField(emailInput, 'Please enter a valid email address.')) firstInvalid = emailInput;
      if (!validateField(contactInput, 'Please enter a contact phone number.')) firstInvalid = contactInput;
      if (!validateField(companyInput, 'Please enter company or developer name.')) firstInvalid = companyInput;
      if (!validateField(nameInput, 'Please enter contact person name.')) firstInvalid = nameInput;

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      const service = document.getElementById('estService').value;
      const region = document.getElementById('estRegion').value;
      const volume = document.getElementById('estVolume').value;
      const name = nameInput.value.trim();
      const company = companyInput.value.trim();
      const contact = contactInput.value.trim();
      const email = emailInput.value.trim();

      const subject = encodeURIComponent(`[FHG Project Assessment Request] ${company} - ${service}`);
      const body = encodeURIComponent(
        `Dear Forest Hills Garden Management,\n\n` +
        `We would like to request an official project assessment / proposal with the following parameters:\n\n` +
        `• Client/Contact Person: ${name}\n` +
        `• Company/Entity: ${company}\n` +
        `• Contact Number: ${contact}\n` +
        `• Email: ${email}\n` +
        `• Primary Service: ${service}\n` +
        `• Location / Region: ${region}\n` +
        `• Estimated Scope / Volume: ${volume}\n\n` +
        `Please provide details on next steps, site inspection availability, and compliance requirements.\n\n` +
        `Thank you,\n${name} (${company})`
      );

      window.location.href = `mailto:edluna1971@yahoo.com?cc=iamfeluna@yahoo.com&subject=${subject}&body=${body}`;

      showToast(
        "Proposal Request Formatted!",
        `Prepared proposal for ${company}. Email draft launched to edluna1971@yahoo.com.`
      );
    });
  }

  if (generalContactForm) {
    setupFormInputClearing(generalContactForm);

    generalContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('contactFullName');
      const emailInput = document.getElementById('contactEmail');
      const phoneInput = document.getElementById('contactPhone');
      const subjectInput = document.getElementById('contactSubject');
      const messageInput = document.getElementById('contactMessage');

      let firstInvalid = null;
      if (!validateField(messageInput, 'Please describe project details & requirements.')) firstInvalid = messageInput;
      if (!validateField(subjectInput, 'Please enter project subject or nature.')) firstInvalid = subjectInput;
      if (!validateField(phoneInput, 'Please enter contact phone number.')) firstInvalid = phoneInput;
      if (!validateField(emailInput, 'Please enter a valid email address.')) firstInvalid = emailInput;
      if (!validateField(nameInput, 'Please enter your full name.')) firstInvalid = nameInput;

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const phone = phoneInput.value.trim();
      const subject = encodeURIComponent(`[Website Inquiry] ${subjectInput.value.trim()}`);
      const message = messageInput.value.trim();

      const body = encodeURIComponent(
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone}\n\n` +
        `Message:\n${message}`
      );

      window.location.href = `mailto:edluna1971@yahoo.com?cc=iamfeluna@yahoo.com&subject=${subject}&body=${body}`;

      showToast("Message Drafted", `Opening mail client for ${name}. Our operations desk will follow up.`);
      generalContactForm.reset();
    });
  }

  // Update footer year dynamically
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});
