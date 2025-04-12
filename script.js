document.addEventListener('DOMContentLoaded', function() {
    // Ajouter ce code à votre fichier JavaScript existant (document.addEventListener('DOMContentLoaded', function() { ... })

// Carrousel d'équipe
function initTeamCarousel() {
    const carousel = document.querySelector('.team-carousel');
    const track = document.querySelector('.team-carousel-track');
    const prevBtn = document.querySelector('.team-carousel-btn.prev');
    const nextBtn = document.querySelector('.team-carousel-btn.next');
    const dotsContainer = document.querySelector('.team-carousel-dots');
    
    if (!carousel || !track) return;
    
    const teamMembers = track.querySelectorAll('.team-member');
    const totalMembers = teamMembers.length;
    
    // Déterminer combien de membres afficher à la fois en fonction de la largeur d'écran
    function getItemsPerView() {
        if (window.innerWidth > 1200) return 4;
        if (window.innerWidth > 992) return 3;
        if (window.innerWidth > 576) return 2;
        
        return 1;
    }
    
    let itemsPerView = getItemsPerView();
    let currentIndex = 0;
    let maxIndex = totalMembers - itemsPerView;
    let autoplayInterval = null;
    const autoplayDelay = 1000; // Délai en ms entre chaque défilement automatique
    
    // Créer les dots de navigation
    for (let i = 0; i <= maxIndex; i++) {
        const dot = document.createElement('div');
        dot.classList.add('team-carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.setAttribute('data-index', i);
        dotsContainer.appendChild(dot);
        
        dot.addEventListener('click', () => {
            goToSlide(i);
            resetAutoplay(); // Réinitialiser l'autoplay après un clic manuel
        });
    }
    
    // Mettre à jour les dots
    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.team-carousel-dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Fonction pour aller à une slide spécifique
    function goToSlide(index) {
        currentIndex = index;
        if (currentIndex < 0) currentIndex = maxIndex;
        if (currentIndex > maxIndex) currentIndex = 0;
        
        const slideWidth = teamMembers[0].offsetWidth + 32; // 32px pour les marges (16px * 2)
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        
        updateDots();
    }
    
    // Passer à la slide suivante
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    // Passer à la slide précédente
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }
    
    // Démarrer le défilement automatique
    function startAutoplay() {
        if (autoplayInterval) clearInterval(autoplayInterval);
        autoplayInterval = setInterval(nextSlide, autoplayDelay);
    }
    
    // Réinitialiser le défilement automatique (après une interaction utilisateur)
    function resetAutoplay() {
        if (autoplayInterval) clearInterval(autoplayInterval);
        startAutoplay();
    }
    
    // Arrêter le défilement automatique
    function stopAutoplay() {
        if (autoplayInterval) clearInterval(autoplayInterval);
    }
    
    // Événements pour les boutons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoplay();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoplay();
        });
    }
    
    // Arrêter l'autoplay quand la souris survole le carrousel
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    
    // Gérer le responsive
    window.addEventListener('resize', () => {
        const newItemsPerView = getItemsPerView();
        if (newItemsPerView !== itemsPerView) {
            itemsPerView = newItemsPerView;
            maxIndex = totalMembers - itemsPerView;
            
            // Recréer les dots
            dotsContainer.innerHTML = '';
            for (let i = 0; i <= maxIndex; i++) {
                const dot = document.createElement('div');
                dot.classList.add('team-carousel-dot');
                if (i === currentIndex) dot.classList.add('active');
                dot.setAttribute('data-index', i);
                dotsContainer.appendChild(dot);
                
                dot.addEventListener('click', () => {
                    goToSlide(i);
                    resetAutoplay();
                });
            }
            
            // S'assurer que l'index courant est valide
            if (currentIndex > maxIndex) {
                currentIndex = maxIndex;
            }
            
            goToSlide(currentIndex);
        }
    });
    
    // Activer le mode touch/swipe pour mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoplay(); // Arrêter l'autoplay pendant le toucher
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoplay(); // Redémarrer l'autoplay après le toucher
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50; // Seuil de sensibilité en pixels
        
        if (touchStartX - touchEndX > swipeThreshold) {
            // Swipe gauche (suivant)
            nextSlide();
        } else if (touchEndX - touchStartX > swipeThreshold) {
            // Swipe droite (précédent)
            prevSlide();
        }
    }
    
    // Initialiser
    goToSlide(0);
    startAutoplay(); // Démarrer le défilement automatique
}

// Appeler la fonction d'initialisation du carrousel d'équipe
initTeamCarousel();
    // Navigation sticky au défilement
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Menu hamburger pour le responsive
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Fermeture du menu en cliquant sur un lien
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });

    // Animation au défilement
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if(elementTop < windowHeight - 100) {
                element.classList.add('appear');
            }
        });
    }
    
    window.addEventListener('scroll', checkFade);
    checkFade(); // Vérifier au chargement de la page

    // Carrousel d'images automatique
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.carousel-dot');
    
    function showSlide(index) {
        // Désactiver tous les slides et dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Activer le slide et dot courant
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Navigation par les dots
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-index'));
            showSlide(slideIndex);
            clearInterval(slideInterval); // Arrêter l'auto-rotation
            slideInterval = setInterval(nextSlide, 2000); // Redémarrer l'auto-rotation
        });
    });
    
    // Démarrer l'auto-rotation
    let slideInterval = setInterval(nextSlide, 2000);
    
    // Arrêter l'auto-rotation quand on survole le carrousel
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
        });
        
        carousel.addEventListener('mouseleave', function() {
            slideInterval = setInterval(nextSlide, 2000);
        });
    }
    
    // Animation du carrousel de sponsors
    const sponsorsTrack = document.querySelector('.sponsors-track');
    if (sponsorsTrack) {
        // Cloner les éléments pour créer une animation infinie
        const sponsorItems = document.querySelectorAll('.sponsor-item');
        sponsorItems.forEach(item => {
            const clone = item.cloneNode(true);
            sponsorsTrack.appendChild(clone);
        });
    }
    
    // Gestion du formulaire de contact
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les valeurs du formulaire
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validations côté client simples
            if (!name || !email || !subject || !message) {
                alert('Veuillez remplir tous les champs.');
                return;
            }
            
            if (!validateEmail(email)) {
                alert('Veuillez entrer une adresse email valide.');
                return;
            }
            
            // Simuler l'envoi du formulaire (pour démonstration)
            alert('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.');
            contactForm.reset();
        });
    }
    
    // Fonction utilitaire pour valider un email
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Effet de zoom sur la photo de la compétition au survol
    const competitionPoster = document.querySelector('.competition-poster img');
    if (competitionPoster) {
        competitionPoster.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        competitionPoster.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Animer les éléments de navigation lors du clic
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            // Ne pas exécuter si la navigation est déjà en cours
            if (this.classList.contains('nav-active')) return;
            
            // Ajouter et supprimer la classe après animation
            this.classList.add('nav-active');
            setTimeout(() => {
                this.classList.remove('nav-active');
            }, 300);
        });
    });
    
    // Vidéo - lecture automatique, masquage des contrôles et boucle
    const videoContainer = document.querySelector('.video-container');
    if (videoContainer) {
        // Si c'est une vidéo MP4 (non YouTube)
        const videoElement = videoContainer.querySelector('video');
        if (videoElement) {
            // S'assurer que la vidéo joue automatiquement et en boucle
            videoElement.autoplay = true;
            videoElement.loop = true;
            videoElement.muted = true; // Autoplay nécessite souvent que la vidéo soit muette
            videoElement.controls = false; // Masquer les contrôles
            videoElement.playsInline = true; // Important pour iOS
            
            // Forcer la lecture au chargement et en cas de pause
            videoElement.play().catch(e => {
                console.log("Erreur de lecture automatique:", e);
                // Tentative de lecture après interaction utilisateur
                document.body.addEventListener('click', () => videoElement.play(), {once: true});
            });
        } 
        // Si c'est une iframe (YouTube ou autre)
        else {
            const videoFrame = videoContainer.querySelector('iframe');
            if (videoFrame) {
                // Modifier l'URL pour inclure les paramètres nécessaires
                if (videoFrame.src.includes('youtube')) {
                    // Pour YouTube: autoplay=1, loop=1, controls=0, etc.
                    let newSrc = videoFrame.src;
                    // Ajouter le paramètre enablejsapi=1 s'il n'est pas déjà présent
                    if (!newSrc.includes('enablejsapi=')) {
                        newSrc += (newSrc.includes('?') ? '&' : '?') + 'enablejsapi=1';
                    }
                    // Ajouter les autres paramètres
                    newSrc += '&autoplay=1&mute=1&controls=0&disablekb=1&loop=1&playlist=VIDEO_ID&rel=0&showinfo=0';
                    // Pour le loop avec YouTube, il faut spécifier un playlist même pour une seule vidéo
                    // Remplacer VIDEO_ID par l'ID réel de la vidéo si c'est YouTube
                    videoFrame.src = newSrc;
                    
                    // Fonction pour vérifier si la vidéo est visible et la lire
                    function checkVideoVisibility() {
                        const rect = videoContainer.getBoundingClientRect();
                        const isVisible = 
                            rect.top >= -rect.height/2 &&
                            rect.left >= 0 &&
                            rect.bottom <= (window.innerHeight + rect.height/2) &&
                            rect.right <= (window.innerWidth || document.documentElement.clientWidth);
                            
                        if (isVisible) {
                            // Utiliser l'API postMessage pour contrôler la vidéo YouTube
                            videoFrame.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                        }
                    }
                    
                    // S'assurer que la vidéo joue quand elle est visible
                    window.addEventListener('scroll', checkVideoVisibility);
                    setInterval(checkVideoVisibility, 2000); // Vérifier régulièrement
                    
                    // Appeler la fonction immédiatement
                    checkVideoVisibility();
                    
                    // Réagir aux événements de la vidéo (comme la fin de lecture)
                    window.addEventListener('message', function(event) {
                        try {
                            const data = JSON.parse(event.data);
                            if (data.event === 'onStateChange' && data.info === 0) { // 0 = vidéo terminée
                                videoFrame.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                            }
                        } catch (e) {
                            // Ignorer les erreurs de parsing JSON
                        }
                    });
                } 
                // Pour une vidéo MP4 dans une iframe
                else if (videoFrame.src.includes('.mp4')) {
                    // Modifier l'URL pour inclure autoplay et les autres paramètres
                    videoFrame.src = `${videoFrame.src}#t=0.001&autoplay=1&loop=1&controls=0&muted=1`;
                }
            }
        }
    }
});
// JavaScript pour le carousel d'images
document.addEventListener('DOMContentLoaded', function() {
    const posters = document.querySelectorAll('.competition-poster img');
    let currentPoster = 0;
    
    // Fonction pour changer d'image
    function changeImage() {
      // Retirer la classe active de toutes les images
      posters.forEach(img => img.classList.remove('active'));
      
      // Passer à l'image suivante
      currentPoster = (currentPoster + 1) % posters.length;
      
      // Ajouter la classe active à l'image courante
      posters[currentPoster].classList.add('active');
    }
    
    // Changer d'image toutes les 3 secondes
    setInterval(changeImage, 2000);
  });
  document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner les éléments du diaporama une seule fois pour améliorer les performances
    const forumSlideshow = document.querySelector('.forum-slideshow');
    const forumSlides = document.querySelectorAll('.forum-slide');
    const forumDots = document.querySelectorAll('.forum-dot');
    let currentForumSlide = 0;
    let forumInterval = null;
    
    // Précharger les images si possible
    function preloadImages() {
        const images = document.querySelectorAll('.forum-slide img');
        if (images.length) {
            images.forEach(img => {
                if (img.dataset.src) {
                    const newImg = new Image();
                    newImg.src = img.dataset.src;
                    newImg.onload = function() {
                        img.src = img.dataset.src;
                    };
                }
            });
        }
    }
    
    // Fonction pour montrer une diapositive spécifique
    function showForumSlide(index) {
        // Cacher toutes les diapositives et désactiver tous les points en une seule fois
        document.querySelector('.forum-slide.active')?.classList.remove('active');
        document.querySelector('.forum-dot.active')?.classList.remove('active');
        
        // Activer seulement la diapositive et le point correspondants
        forumSlides[index].classList.add('active');
        forumDots[index].classList.add('active');
        
        currentForumSlide = index;
    }
    
    // Fonction pour passer à la diapositive suivante
    function nextForumSlide() {
        currentForumSlide = (currentForumSlide + 1) % forumSlides.length;
        showForumSlide(currentForumSlide);
    }
    
    // Démarrer le diaporama automatique avec RequestAnimationFrame pour de meilleures performances
    function startForumSlideshow() {
        if (forumInterval) clearInterval(forumInterval);
        forumInterval = setInterval(nextForumSlide, 2000);
    }
    
    // Utiliser la délégation d'événements pour les points
    if (forumDots.length) {
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('forum-dot')) {
                const slideIndex = parseInt(e.target.getAttribute('data-index'));
                showForumSlide(slideIndex);
                
                // Redémarrer l'intervalle après un clic manuel
                clearInterval(forumInterval);
                startForumSlideshow();
            }
        });
    }
    
    // Gérer le survol du diaporama (arrêter l'autoplay)
    if (forumSlideshow) {
        forumSlideshow.addEventListener('mouseenter', function() {
            clearInterval(forumInterval);
        });
        
        forumSlideshow.addEventListener('mouseleave', function() {
            startForumSlideshow();
        });
    }
    
    // Précharger les images avant de commencer
    preloadImages();
    
    // Initialiser le diaporama
    if (forumSlides.length) {
        showForumSlide(0);
        startForumSlideshow();
    }
});
