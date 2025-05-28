document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle de navegação para mobile
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times'); // Ícone de fechar
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars'); // Ícone de menu
            }
        });
    }

    // Fechar o menu ao clicar em um link (para mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                if (navToggle) { // Check if navToggle exists before trying to access its children
                    const icon = navToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // Animação de scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Verifica se o link é para uma seção na mesma página
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            } else {
                // Se for um link externo ou para outra página, permite o comportamento padrão
                window.location.href = targetId;
            }
        });
    });

    // Lógica para adicionar classe 'current' ao link de navegação ativo
    const setCurrentNavLink = () => {
        const currentPath = window.location.pathname.split('/').pop();
        navLinks.forEach(link => {
            link.classList.remove('current'); // Remove a classe de todos os links primeiro
            const linkHref = link.getAttribute('href').split('/').pop();

            // Ajusta o linkHref para o caso da página inicial ser acessada sem 'index.html'
            const isHomePage = (currentPath === '' || currentPath === 'index.html');
            const isLinkToHome = (linkHref === '' || linkHref === 'index.html');

            if (isHomePage && isLinkToHome) {
                link.classList.add('current');
            } else if (currentPath === linkHref) {
                link.classList.add('current');
            } else if (isHomePage && linkHref.startsWith('#')) {
                // Lógica para links internos na página inicial
                if (window.location.hash === linkHref) {
                    link.classList.add('current');
                }
            }
        });
    };

    // Chama a função ao carregar a página e ao mudar a hash (para links internos)
    setCurrentNavLink();
    window.addEventListener('hashchange', setCurrentNavLink);

    // Lógica para o FAQ (acordeão)
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const faqAnswer = button.nextElementSibling;
            const icon = button.querySelector('i');

            // Toggle active class on the question button
            button.classList.toggle('active');
            // Toggle active class on the answer content
            faqAnswer.classList.toggle('active');

            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');

            if (button.classList.contains('active')) {
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
            } else {
                faqAnswer.style.maxHeight = '0';
            }
        });
    });
});
