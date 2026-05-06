// Product hover blur effect
document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth <= 768) {
        document.body.classList.add('mobile-minimal');
    }
    
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            document.body.classList.add('mobile-minimal');
        } else {
            document.body.classList.remove('mobile-minimal');
        }
    });
    
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    dropdownItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.stopPropagation();
                dropdownItems.forEach(other => {
                    if (other !== item) {
                        other.classList.remove('active');
                    }
                });
                item.classList.toggle('active');
            }
        });
    });
    
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            navMenu && 
            navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !mobileMenuToggle.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu) {
            navMenu.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
            }
            document.body.style.overflow = '';
            dropdownItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });
    
    const productHoverTargets = document.querySelectorAll('.product-hover-target');
    const productsGrid = document.getElementById('productsGrid');
    const gridWrapper = document.querySelector('.products-grid-wrapper');
    const allCells = document.querySelectorAll('.grid-cell');
    
    if (window.innerWidth > 768) {
        productHoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => {
                gridWrapper.classList.add('blur-active');
                
                allCells.forEach(cell => {
                    if (cell !== target) {
                        cell.style.filter = 'blur(3px)';
                    }
                });
                
                target.style.filter = 'blur(0)';
                target.style.position = 'relative';
                target.style.zIndex = '100';
            });
            
            target.addEventListener('mouseleave', () => {
                gridWrapper.classList.remove('blur-active');
                
                allCells.forEach(cell => {
                    cell.style.filter = 'none';
                });
                
                target.style.zIndex = '';
            });
        });
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .product-card, .step-card, .news-card, .stat-box, .tech-feature');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Newsletter
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        if (email) {
            alert('Thank you for subscribing!');
            newsletterForm.querySelector('input[type="email"]').value = '';
        }
    });
}

//
// ✅ FIXED BUTTON REDIRECTION (UPDATED PART)
//
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn-register').forEach(btn => {
        btn.addEventListener('click', () => {
            window.location.href = "register.html";
        });
    });

    document.querySelectorAll('.btn-signin').forEach(btn => {
        btn.addEventListener('click', () => {
            window.location.href = "login.html";
        });
    });
});

// Parallax
window.addEventListener('scroll', () => {
    if (window.innerWidth > 768) {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }
});

// Mobile menu init
const createMobileMenu = () => {
    const navMenu = document.querySelector('.nav-menu');
    
    if (window.innerWidth <= 768) {
        console.log('Mobile view detected');
    }
};

window.addEventListener('resize', createMobileMenu);
createMobileMenu();

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Product hover animation
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
});

// Stats observer
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-box').forEach(stat => {
    statsObserver.observe(stat);
});

document.addEventListener('DOMContentLoaded', () => {
    // ✅ Register form handling
    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            if (!name || !email || !password) {
                alert("Please fill all fields");
                return;
            }

            fetch("http://127.0.0.1:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Server error");
                }
                return res.json();
            })
            .then(data => {
                console.log("Response:", data);

                alert(data.message || "Registered successfully");

                window.location.href = "platforms.html";
            })
            .catch(err => {
                console.error("ERROR:", err);
                alert("Backend not working or blocked");
            });
        });
    }
});

console.log('ApexTradePro website loaded successfully!');