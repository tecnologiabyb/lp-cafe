// ==========================================================================
// CAFÉ PDS - INTERACTIVE SCRIPT
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. FAQ ACCORDION LOGIC
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = item.querySelector('.accordion-content');
            const icon = header.querySelector('.accordion-icon');

            // Close all other items
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherContent = otherItem.querySelector('.accordion-content');
                    if (otherContent) otherContent.style.maxHeight = null;
                    const otherIcon = otherItem.querySelector('.accordion-icon');
                    if (otherIcon) otherIcon.textContent = 'v';
                }
            });

            // Toggle current item
            const isActive = item.classList.toggle('active');
            if (isActive) {
                content.style.maxHeight = content.scrollHeight + 'px';
                icon.textContent = '^';
            } else {
                content.style.maxHeight = null;
                icon.textContent = 'v';
            }
        });
    });

    // 2. MODAL CONTROLS
    const modal = document.getElementById('subscriptionModal');
    const openBtns = document.querySelectorAll('.open-modal-btn');
    const closeBtn = document.getElementById('closeModal');

    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'https://cafepds.com.br/produtos/gourmet-pds-500g-moido/';
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Radio option card active highlight
    const optionCards = document.querySelectorAll('.option-card');
    optionCards.forEach(card => {
        card.addEventListener('click', () => {
            const input = card.querySelector('input[type="radio"]');
            if (input) {
                const name = input.name;
                document.querySelectorAll(`input[name="${name}"]`).forEach(r => {
                    r.closest('.option-card').classList.remove('active');
                });
                card.classList.add('active');
                input.checked = true;
            }
        });
    });
});

// 3. TESTIMONIAL SWITCHER (adicione novos depoimentos neste array)
const testimonials = [
    {
        quote: '"A hora que abre a caixa e o perfume se espalha é sensacional!"',
        author: 'Hugo Niy'
    },
    {
        quote: '"Minha equipe e minhas clientes amaram seu café. Uma experiência com sabor de sofisticação. Parabéns!!!"',
        author: 'Ligiane'
    },
    {
        quote: '"Depois de anos experimentando, por fim, o melhor grão! Agora só compramos dele tem quase um ano. Parabéns! Vocês são os melhores!"',
        author: 'Carolina Thomé'
    }
];
let currentTestimonial = 0;

function stepTestimonial(dir) {
    const textEl = document.getElementById('quoteText');
    const authorEl = document.getElementById('quoteAuthor');
    if (!textEl || testimonials.length < 2) return;
    currentTestimonial = (currentTestimonial + dir + testimonials.length) % testimonials.length;
    textEl.style.opacity = 0;
    authorEl.style.opacity = 0;
    setTimeout(() => {
        textEl.textContent = testimonials[currentTestimonial].quote;
        authorEl.textContent = testimonials[currentTestimonial].author;
        textEl.style.opacity = 1;
        authorEl.style.opacity = 1;
    }, 200);
}

// 4. DYNAMIC PRICE UPDATE IN MODAL
function updatePrice(price) {
    const priceEl = document.getElementById('totalPrice');
    if (priceEl) {
        priceEl.textContent = `R$ ${price.toFixed(2).replace('.', ',')} / mês`;
    }
}

// 5. HANDLE FORM SUBMISSION & TOAST
function handleFormSubmit(event) {
    event.preventDefault();
    const modal = document.getElementById('subscriptionModal');
    const toast = document.getElementById('toast');

    modal.classList.remove('active');
    document.body.style.overflow = '';

    if (toast) {
        toast.classList.add('active');
        setTimeout(() => {
            toast.classList.remove('active');
        }, 4000);
    }
}

