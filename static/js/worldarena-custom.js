/* WorldArena 2.0 Custom JavaScript */

/**
 * Initialize tab switching functionality
 */
function initializeTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.tab-panel');
    
    tabs.forEach(button => {
        button.addEventListener('click', () => {
            tabs.forEach(tab => tab.classList.remove('active'));
            panels.forEach(panel => panel.classList.remove('active'));
            button.classList.add('active');
            const panel = document.querySelector(`.tab-panel[data-panel="${button.dataset.tab}"]`);
            if (panel) panel.classList.add('active');
        });
    });
}

/**
 * Initialize copy-to-clipboard functionality
 */
function initializeCopyButton() {
    const copyBtn = document.getElementById('copy-citation');
    const citationText = document.getElementById('citation-text');
    
    if (copyBtn && citationText) {
        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(citationText.textContent.trim());
                copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied';
                setTimeout(() => { 
                    copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy'; 
                }, 1600);
            } catch (error) {
                copyBtn.textContent = 'Copy failed';
                console.error('Failed to copy citation:', error);
            }
        });
    }
}

/**
 * Smooth scroll to section
 */
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/**
 * Highlight sidebar item based on scroll position
 */
function initializeSidebarSpy() {
    const sidebarLinks = Array.from(document.querySelectorAll('.sidebar nav a'));
    const sections = sidebarLinks
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    if (!sections.length) return;

    const setActiveLink = (sectionId) => {
        sidebarLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
        });
    };

    const observer = new IntersectionObserver((entries) => {
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        if (!visibleEntries.length) return;

        const mostVisible = visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (mostVisible?.target?.id) {
            setActiveLink(mostVisible.target.id);
        }
    }, { threshold: [0.15, 0.3, 0.5, 0.7] });

    sections.forEach(section => observer.observe(section));

    const initialSection = sections.find(section => section.id === 'overview') || sections[0];
    if (initialSection) setActiveLink(initialSection.id);
}

/**
 * Update footer links with icons
 */
function updateFooterLinks() {
    const footerLinks = document.querySelectorAll('.footer-icon-link');
    footerLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes('trophy')) {
            link.classList.add('trophy');
        }
    });
}

/**
 * Initialize all custom functionality on page load
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeTabs();
    initializeCopyButton();
    initializeSmoothScroll();
    initializeSidebarSpy();
    updateFooterLinks();
    console.log('WorldArena 2.0 page initialized');
});
