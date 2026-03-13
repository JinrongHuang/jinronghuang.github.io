

const content_dir = 'contents/'
const config_file = 'config.yml'
const section_names = ['home', 'publications', 'projects', 'awards']


window.addEventListener('DOMContentLoaded', event => {

    const visitCountElement = document.getElementById('visit-count');
    const addVisitButton = document.getElementById('add-visit-btn');
    const avatarImage = document.getElementById('avatar-image');
    const visitCountStorageKey = 'avatar_visit_count_fallback';
    const counterNamespace = 'jinronghuang-homepage';
    const counterKey = 'avatar-visit-count';

    const getFallbackCount = () => {
        const savedCount = parseInt(localStorage.getItem(visitCountStorageKey), 10);
        return Number.isNaN(savedCount) ? 0 : savedCount;
    };

    const setFallbackCount = (nextCount) => {
        localStorage.setItem(visitCountStorageKey, nextCount.toString());
    };

    const renderVisitCount = (count) => {
        if (visitCountElement) {
            visitCountElement.textContent = count.toString();
        }
    };

    const parseCount = (payload) => {
        if (payload && typeof payload.value === 'number') {
            return payload.value;
        }
        return 0;
    };

    const loadVisitCount = () => {
        fetch(`https://api.countapi.xyz/get/${counterNamespace}/${counterKey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('counter get failed');
                }
                return response.json();
            })
            .then(data => {
                const count = parseCount(data);
                renderVisitCount(count);
                setFallbackCount(count);
            })
            .catch(() => {
                renderVisitCount(getFallbackCount());
            });
    };

    const incrementVisitCount = () => {
        fetch(`https://api.countapi.xyz/hit/${counterNamespace}/${counterKey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('counter hit failed');
                }
                return response.json();
            })
            .then(data => {
                const count = parseCount(data);
                renderVisitCount(count);
                setFallbackCount(count);
            })
            .catch(() => {
                const count = getFallbackCount() + 1;
                setFallbackCount(count);
                renderVisitCount(count);
            });
    };

    loadVisitCount();

    if (addVisitButton) {
        addVisitButton.addEventListener('click', incrementVisitCount);
    }

    if (avatarImage) {
        avatarImage.addEventListener('click', incrementVisitCount);
    }

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });


    // Yaml
    fetch(content_dir + config_file)
        .then(response => response.text())
        .then(text => {
            const yml = jsyaml.load(text);
            Object.keys(yml).forEach(key => {
                try {
                    document.getElementById(key).innerHTML = yml[key];
                } catch {
                    console.log("Unknown id and value: " + key + "," + yml[key].toString())
                }

            })
        })
        .catch(error => console.log(error));


    // Marked
    marked.use({ mangle: false, headerIds: false })
    section_names.forEach((name, idx) => {
        fetch(content_dir + name + '.md')
            .then(response => response.text())
            .then(markdown => {
                const html = marked.parse(markdown);
                document.getElementById(name + '-md').innerHTML = html;
            }).then(() => {
                // MathJax
                MathJax.typeset();
            })
            .catch(error => console.log(error));
    })

}); 
