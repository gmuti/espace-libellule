console.log("main.js chargé ");

(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Date and time picker
    $('#date').datetimepicker({
        format: 'L'
    });
    $('#time').datetimepicker({
        format: 'LT'
    });


    // Service carousel
    $(".service-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        loop: true,
        dots: false,
        nav : false,
        responsive: {
            0:{ items:1 },
            576:{ items:2 },
            768:{ items:3 },
            992:{ items:4 },
            1200:{ items:5 }
        }
    });

    // Séances Collectives carousel
    $(".seances-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1200,
        loop: true,
        dots: true,
        nav: false,
        margin: 24,
        responsive: {
            0:{ items:1 },
            576:{ items:1 },
            768:{ items:2 },
            992:{ items:3 }
        }
    });


    // Pricing carousel
    $(".pricing-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        margin: 30,
        loop: true,
        dots: false,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        margin: 30,
        dots: true,
        loop: true,
        items: 1
    });

})(jQuery);

// Toast helper: affiche un petit message fixé en haut à droite
function showToast(message, type) {
    // type: 'success' | 'error' | 'info'
    var bg = (type === 'success') ? '#28a745' : (type === 'error' ? '#dc3545' : '#17a2b8');
    var toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.style.position = 'fixed';
    toast.style.right = '20px';
    toast.style.top = '20px';
    toast.style.zIndex = 9999;
    toast.style.padding = '12px 16px';
    toast.style.color = '#fff';
    toast.style.background = bg;
    toast.style.borderRadius = '4px';
    toast.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s, transform 0.3s';
    toast.innerText = message;
    document.body.appendChild(toast);
    // Force reflow pour déclencher la transition
    void toast.offsetWidth;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    // Disparition automatique
    setTimeout(function() {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px)';
        setTimeout(function(){
            if (toast && toast.parentNode) toast.parentNode.removeChild(toast);
        }, 300);
    }, 4000);
}

// Contact form
function sendMail() {
    if (typeof emailjs === 'undefined') {
        return Promise.reject(new Error('emailjs non chargé'));
    }
    var parms = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    return emailjs.send('service_vlyalkj', 'template_tq04wee', parms);
}

// Attach handler to contact form
document.addEventListener('DOMContentLoaded', function () {
    var contactForm = document.getElementById('contactForm');
    var sendMsgBtn = document.getElementById('sendMessageButton');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var originalText = sendMsgBtn ? sendMsgBtn.innerHTML : '';
            if (sendMsgBtn) {
                sendMsgBtn.disabled = true;
                sendMsgBtn.innerHTML = 'Envoi...';
            }

            // Simple validation
            var name = document.getElementById('name').value.trim();
            var email = document.getElementById('email').value.trim();
            var subject = document.getElementById('subject').value.trim();
            var message = document.getElementById('message').value.trim();
            if (!name || !email || !subject || !message) {
                if (sendMsgBtn) {
                    sendMsgBtn.disabled = false;
                    sendMsgBtn.innerHTML = originalText;
                }
                return;
            }

            sendMail()
                .then(function () {
                    contactForm.reset();
                    showToast('Message envoyé avec succès.', 'success');
                })
                .catch(function (err) {
                    console.error('Erreur en envoyant le message :', err);
                    showToast("Erreur lors de l'envoi du message. Veuillez réessayer.", 'error');
                })
                .finally(function () {
                    if (sendMsgBtn) {
                        sendMsgBtn.disabled = false;
                        sendMsgBtn.innerHTML = originalText;
                    }
                });
        });
    }
});

// gift form 
function sendGift() {
    if (typeof emailjs === 'undefined') {
        return Promise.reject(new Error('emailjs non chargé'));
    }
    var parms = {
        amount: document.getElementById('amount').value,
        recipient: document.getElementById('recipient').value,
        senderEmail: document.getElementById('senderEmail').value
    };
    return emailjs.send('service_2jcy8kq', 'template_iolrdf8', parms);
}

// Attach handler to gift form (in case page includes it)
document.addEventListener('DOMContentLoaded', function () {
    var giftForm = document.getElementById('giftForm');
    var sendBtn = document.getElementById('sendGiftButton');
    if (!giftForm) return;

    giftForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var originalText = sendBtn ? sendBtn.innerHTML : '';
        if (sendBtn) {
            sendBtn.disabled = true;
            sendBtn.innerHTML = 'Envoi...';
        }

        // Simple validation
        var amount = document.getElementById('amount').value.trim();
        var recipient = document.getElementById('recipient').value.trim();
        var senderEmail = document.getElementById('senderEmail').value.trim();
        if (!amount || !recipient || !senderEmail) {
            if (sendBtn) {
                sendBtn.disabled = false;
                sendBtn.innerHTML = originalText;
            }
            return;
        }

        sendGift()
            .then(function () {
                giftForm.reset();
                showToast('Bon cadeau envoyé avec succès.', 'success');
            })
            .catch(function (err) {
                console.error('Erreur :', err);
                showToast("Erreur lors de l'envoi du bon cadeau. Veuillez réessayer.", 'error');
            })
            .finally(function () {
                if (sendBtn) {
                    sendBtn.disabled = false;
                    sendBtn.innerHTML = originalText;
                }
            });
    });
});
