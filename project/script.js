document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.querySelector('.main-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // 1. 네비게이션 클릭 시 부드러운 스크롤 이동
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // main-content 내부에서 스크롤 이동 (데스크톱)
                if (window.innerWidth > 768) {
                    const topOffset = targetSection.offsetTop;
                    mainContent.scrollTo({
                        top: topOffset,
                        behavior: 'smooth'
                    });
                } else {
                    // 모바일에서는 window 스크롤
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // 2. 스크롤 스파이 (Scroll Spy) 기능
    const observerOptions = {
        root: window.innerWidth > 768 ? mainContent : null, // 모바일은 viewport 기준
        threshold: 0.2, // 20% 이상 보일 때 감지
        rootMargin: "-20% 0px -40% 0px" // 상단 일부 여유 두고 하단은 무시하여 상단 컨텐츠 집중
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // 모든 링크 비활성화
                navLinks.forEach(link => link.classList.remove('active'));
                
                // 현재 섹션 링크 활성화
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // 3. 코드 클릭 시 복사 기능 (사용자 편의)
    const codeBlocks = document.querySelectorAll('code');
    
    codeBlocks.forEach(code => {
        // 짧은 명령어 코드만 대상 (pre 태그 내부 제외)
        if (!code.parentElement.matches('pre')) {
            code.style.cursor = 'pointer';
            code.setAttribute('title', '클릭하여 복사');
            
            code.addEventListener('click', () => {
                const text = code.innerText;
                navigator.clipboard.writeText(text).then(() => {
                    // 복사 성공 효과
                    const originalBg = code.style.backgroundColor;
                    code.style.backgroundColor = 'rgba(63, 185, 80, 0.4)'; // 초록색
                    code.style.transition = 'background-color 0.2s';
                    
                    setTimeout(() => {
                        code.style.backgroundColor = originalBg;
                    }, 500);
                });
            });
        }
    });
});
