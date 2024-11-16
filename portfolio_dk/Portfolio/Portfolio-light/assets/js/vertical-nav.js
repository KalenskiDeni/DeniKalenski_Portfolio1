document.addEventListener("DOMContentLoaded", function () {
    const nav = document.querySelector('.vertical-nav');
    const sliderSection = document.querySelector('.header-project4'); // Section where nav should be hidden
    const nextSection = document.querySelector('.next-project'); // Section where nav should also be hidden
    const navLinks = document.querySelectorAll('.vertical-nav a');
    const headers = document.querySelectorAll('.section-padding h4[id]'); // Sections with IDs

    // Define the offset value
    const scrollOffset = 100; // Adjust this value as needed

    function activateNavLink() {
        let currentSection = null;
        const scrollPosition = window.scrollY + window.innerHeight / 5; // Middle of the viewport
        const buffer = 340; // Buffer in pixels for more precise activation range

        headers.forEach(header => {
            const sectionTop = header.getBoundingClientRect().top + window.scrollY;
            const sectionHeight = header.offsetHeight;

            // Check if the scroll position is within the buffer zone of the section
            if (scrollPosition >= sectionTop - buffer && scrollPosition < sectionTop + sectionHeight + buffer) {
                currentSection = header;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (currentSection && link.getAttribute('href') === `#${currentSection.id}`) {
                link.classList.add('active');
            }
        });
    }

    function toggleNavVisibility() {
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        const sliderTop = sliderSection.getBoundingClientRect().top + window.scrollY;
        const sliderBottom = sliderTop + sliderSection.offsetHeight;
        const nextTop = nextSection.getBoundingClientRect().top + window.scrollY;
        const nextBottom = nextTop + nextSection.offsetHeight;

        // Check if current scroll position is within the slider section or the next project section
        if ((scrollPosition >= sliderTop && scrollPosition <= sliderBottom) ||
            (scrollPosition >= nextTop && scrollPosition <= nextBottom)) {
            nav.classList.add('hidden');
        } else {
            nav.classList.remove('hidden');
        }
    }

    function scrollToSection(targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - scrollOffset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            // Ensure the correct section is highlighted after scrolling
            setTimeout(activateNavLink, 600); // Adjust the timeout if necessary
        }
    }

    window.addEventListener('scroll', function () {
        activateNavLink();
        toggleNavVisibility();
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            scrollToSection(targetId);
        });
    });

    // Initial call to highlight the current section and set visibility when the page is loaded
    activateNavLink();
    toggleNavVisibility();
});
