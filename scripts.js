document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (!targetElement) {
                return;
            }

            e.preventDefault();

            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const position = targetElement.offsetTop - navbarHeight;

            window.scrollTo({
                top: position,
                behavior: 'smooth',
            });
        });
    });

    function getCurrentSection() {
        const sections = document.querySelectorAll('section[id]');
        let currentSectionId = '';

        sections.forEach(section => {
            const top = window.scrollY;
            const offset = section.offsetTop - 150;
            if (top >= offset && top < offset + section.offsetHeight) {
                currentSectionId = section.id;
            }
        });

        return currentSectionId;
    }

    function updateActiveLink() {
        const currentSectionId = getCurrentSection();

        document.querySelectorAll('#navbarOffcanvas .nav-link').forEach(link => {
            const href = link.getAttribute('href').substring(1);
            const isActive = href === currentSectionId;

            link.classList.toggle('active', isActive);
            link.parentElement.classList.toggle('active', isActive);
        });
    }

    updateActiveLink();
    window.addEventListener('scroll', updateActiveLink);

    document.querySelectorAll('#navbarOffcanvas .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const offcanvas = document.getElementById('navbarOffcanvas');
            const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
            if (bsOffcanvas) {
                bsOffcanvas.hide();
            }
        });
    });

    const hoverMediaQuery = window.matchMedia('(hover: none)');

    if (hoverMediaQuery.matches) {
        const projects = document.querySelectorAll('.project-card');
        let currentInView = null;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (currentInView && currentInView !== entry.target) {
                        currentInView.classList.remove('in-view');
                    }

                    entry.target.classList.add('in-view');
                    currentInView = entry.target;
                } else if (entry.target === currentInView) {
                    entry.target.classList.remove('in-view');
                    currentInView = null;
                }
            });
        }, {
            threshold: 0.7,
        });

        projects.forEach(project => observer.observe(project));
    }
});
