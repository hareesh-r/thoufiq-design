document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // Element References
    // ==========================================
    const navbar = document.getElementById('navbar');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalStep1 = document.getElementById('modal-step1');
    const modalStep2 = document.getElementById('modal-step2');
    const modalSuccess = document.getElementById('modal-success');

    const btnJoinWaitlist = document.getElementById('btn-join-waitlist');
    const btnReserveSpot = document.getElementById('btn-reserve-spot');
    const btnContinue = document.getElementById('btn-continue');
    const btnBack = document.getElementById('btn-back');
    const btnReserveFinal = document.getElementById('btn-reserve-final');
    const btnWhatsapp = document.getElementById('btn-whatsapp');
    const btnCloseSuccess = document.getElementById('btn-close-success');
    const modalClose1 = document.getElementById('modal-close-1');
    const modalClose2 = document.getElementById('modal-close-2');

    const form = document.getElementById('waitlist-form-step1');
    const experienceOptions = document.getElementById('experience-options');

    // ==========================================
    // Navbar Scroll Effect
    // ==========================================
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ==========================================
    // Confetti Animation (one-time burst)
    // ==========================================
    function launchConfetti() {
        const canvas = document.getElementById('confetti-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.display = 'block';

        const colors = [
            '#7AA8FF', '#AEBEFF', '#FFD700', '#FF6B6B',
            '#4ADE80', '#A78BFA', '#FB923C', '#38BDF8',
            '#F472B6', '#FFFFFF'
        ];

        const particles = [];
        const PARTICLE_COUNT = 150;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: canvas.width / 2 + (Math.random() - 0.5) * 200,
                y: canvas.height * 0.15,
                vx: (Math.random() - 0.5) * 18,
                vy: (Math.random() - 0.7) * 14 - 2,
                w: Math.random() * 10 + 3,
                h: Math.random() * 6 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 16,
                gravity: 0.14 + Math.random() * 0.1,
                opacity: 1,
                fadeSpeed: 0.004 + Math.random() * 0.005,
            });
        }

        let animFrame;
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let alive = false;

            particles.forEach(p => {
                if (p.opacity <= 0) return;
                alive = true;

                p.x += p.vx;
                p.vy += p.gravity;
                p.y += p.vy;
                p.rotation += p.rotationSpeed;
                p.opacity -= p.fadeSpeed;
                p.vx *= 0.99;

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.globalAlpha = Math.max(0, p.opacity);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                ctx.restore();
            });

            if (alive) {
                animFrame = requestAnimationFrame(animate);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                cancelAnimationFrame(animFrame);
                canvas.style.display = 'none';
            }
        }

        animate();
    }

    // ==========================================
    // Modal Logic
    // ==========================================
    let currentStep = 0; // 0 = closed, 1 = step1, 2 = step2, 3 = success

    function openModal() {
        document.body.classList.add('modal-open');
        modalOverlay.classList.add('active');
        showStep(1);
    }

    function closeModal() {
        document.body.classList.remove('modal-open');
        modalOverlay.classList.remove('active');
        currentStep = 0;

        // Reset all modals after transition
        setTimeout(() => {
            modalStep1.style.display = '';
            modalStep2.style.display = 'none';
            modalSuccess.style.display = 'none';
            // Remove animation classes
            [modalStep1, modalStep2, modalSuccess].forEach(m => {
                m.classList.remove('animating-in', 'animating-out');
            });
        }, 400);
    }

    function showStep(step) {
        const modals = [null, modalStep1, modalStep2, modalSuccess];
        const currentModal = modals[currentStep];
        const nextModal = modals[step];

        if (currentModal && currentModal !== nextModal) {
            currentModal.classList.add('animating-out');
            currentModal.classList.remove('animating-in');

            setTimeout(() => {
                currentModal.style.display = 'none';
                currentModal.classList.remove('animating-out');

                nextModal.style.display = '';
                nextModal.classList.add('animating-in');
                currentStep = step;

                // Fire confetti when success modal appears
                if (step === 3) {
                    setTimeout(launchConfetti, 300);
                }
            }, 250);
        } else {
            nextModal.style.display = '';
            nextModal.classList.add('animating-in');
            currentStep = step;

            if (step === 3) {
                setTimeout(launchConfetti, 300);
            }
        }
    }

    // Open modal triggers
    btnJoinWaitlist.addEventListener('click', openModal);
    btnReserveSpot.addEventListener('click', openModal);

    // Close modal triggers
    modalClose1.addEventListener('click', closeModal);
    modalClose2.addEventListener('click', closeModal);

    // Close on overlay click (outside modal)
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && currentStep > 0) {
            closeModal();
        }
    });

    // ==========================================
    // Step 1 -> Step 2
    // ==========================================
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const fullName = document.getElementById('full-name').value.trim();
        const email = document.getElementById('email-id').value.trim();

        if (!fullName || !email) return;

        showStep(2);
    });

    // ==========================================
    // Step 2 -> Success
    // ==========================================

    // Experience option selection
    const options = experienceOptions.querySelectorAll('.experience-option');
    options.forEach(option => {
        option.addEventListener('click', () => {
            options.forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
        });
    });

    // Back button
    btnBack.addEventListener('click', () => {
        showStep(1);
    });

    // Reserve final
    btnReserveFinal.addEventListener('click', () => {
        showStep(3);
    });

    // ==========================================
    // Success -> WhatsApp / Close
    // ==========================================
    btnWhatsapp.addEventListener('click', () => {
        // Replace with your actual WhatsApp group link
        window.open('https://chat.whatsapp.com/your-group-invite', '_blank');
    });

    btnCloseSuccess.addEventListener('click', () => {
        closeModal();
    });
});
