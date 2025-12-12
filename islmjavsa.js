$(document).ready(function(){
    
    setTimeout(function(){ $('#preloader').fadeOut('slow', function(){ $('body').removeClass('loading'); }); }, 1500);

    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');
    window.addEventListener("mousemove", function (e) {
        const posX = e.clientX; const posY = e.clientY;
        cursorDot.style.left = `${posX}px`; cursorDot.style.top = `${posY}px`;
        cursorOutline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 500, fill: "forwards" });
    });
    $('.hover-trigger, a, button, .card, input, textarea').on('mouseenter', function(){ $('body').addClass('hovering'); }).on('mouseleave', function(){ $('body').removeClass('hovering'); });

   
    const projectsDB = [
        {
            id: 1, title: "Identité Visuelle", category: "Branding",
            images: ["img/capture-2025-10-31-011639.png", "img/iikk.png"], 
            type: "image", date: "Octobre 2025", tools: "Illustrator, Photoshop", desc: "Création d'identité visuelle complète..."
        },
        {
            id: 2, title: "Modélisation 3D", category: "3D Art",
            images: ["img/capture-2025-12-02-230052.png"],
            type: "image", date: "Décembre 2025", tools: "Blender, Cycles", desc: "Exploration artistique de la modélisation 3D..."
        },
        {
            id: 3, title: "Maquette UI/UX", category: "Web Design",
            images: ["img/mockup-lifeflow.png"],
            type: "image", date: "Septembre 2025", tools: "Figma", desc: "Interface utilisateur pour LifeFlow..."
        },
        {
            id: 4, title: "Workflow 3D", category: "3D Process",
            images: ["img/capture-2025-06-17-211010.png"],
            type: "image", date: "Juin 2025", tools: "Blender", desc: "Flux de travail 3D..."
        },
        {
            id: 5, title: "Animation 3D", category: "Motion 3D",
            images: ["img/monsetr-islam-colir-gar-dxardn.mp4"],
            type: "video", date: "2025", tools: "Blender", desc: "Court métrage d'animation..."
        },
        {
            id: 6, title: "Motion Design", category: "Video Editing",
            images: ["img/capture-2025-11-19-050209.png"],
            type: "image", date: "Nov 2025", tools: "After Effects", desc: "Vidéo promotionnelle..."
        },
        {
            id: 7, title: "Collage Artistique", category: "Art Graphique",
            images: ["img/iikk.png", "img/islmgenoicde.png"],
            type: "image", date: "2025", tools: "Photoshop", desc: "Série de collages numériques..."
        }
    ];

    
    $(window).scroll(function(){ if(this.scrollY > 20){ $('.navbar').addClass("sticky"); }else{ $('.navbar').removeClass("sticky"); } });
    $('.menu-btn').click(function(){ $('.navbar .menu').toggleClass("active"); $('.menu-btn i').toggleClass("active"); });
    $('.menu li a').click(function(){ $('.navbar .menu').removeClass("active"); $('.menu-btn i').removeClass("active"); });

    
    if($('#home').length > 0) {
        if(typeof Typed !== 'undefined') {
            new Typed(".typing", { strings: ["Graphic Designer", "Étudiant ENSAD", "Créatif 3D", "Monteur Vidéo"], typeSpeed: 100, backSpeed: 60, loop: true });
            new Typed(".typing-2", { strings: ["Graphic Designer", "Étudiant ENSAD", "Créatif 3D", "Monteur Vidéo"], typeSpeed: 100, backSpeed: 60, loop: true });
        }

        
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    $('.line').each(function(){
                        var width = $(this).attr('data-percent');
                        $('<style>').text(`.line[data-percent="${width}"]::before { width: ${width} !important; }`).appendTo('head');
                    });
                    $('.counter').each(function() {
                        var $this = $(this); var target = $this.attr('data-target');
                        $({ Counter: 0 }).animate({ Counter: target }, { duration: 2000, easing: 'swing', step: function () { $this.text(Math.ceil(this.Counter) + "%"); } });
                    });
                    skillsObserver.disconnect();
                }
            });
        }, { threshold: 0.3 });
        var skillsSection = document.querySelector('#skills'); if(skillsSection) skillsObserver.observe(skillsSection);

        
        $('.filter-btn').click(function(){
            $('.filter-btn').removeClass('active'); $(this).addClass('active');
            var filterValue = $(this).attr('data-filter');
            if(filterValue == 'all'){ $('.portfolio-content .card').fadeIn(400); } else { $('.portfolio-content .card').hide(); $('.portfolio-content .card').filter('[data-category="'+filterValue+'"]').fadeIn(400); }
        });

    
        const validateField = (field) => {
            let isValid = true;
            if(field.attr('type') === 'email') {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailPattern.test(field.val());
            } else {
                isValid = field.val().trim() !== "";
            }
            
            if(isValid) { field.removeClass('invalid').addClass('valid'); } 
            else { field.removeClass('valid').addClass('invalid'); }
            return isValid;
        };

        $('input, textarea').on('input blur', function() { validateField($(this)); });

        $('#contactForm').on('submit', function(e){
            e.preventDefault();
            let formValid = true;
            $('input, textarea').each(function() { if(!validateField($(this))) formValid = false; });

            if(formValid){
                var btn = $(this).find('button'); var txt = btn.text();
                btn.text('Envoi...').prop('disabled', true);
                setTimeout(function(){
                    btn.text(txt).prop('disabled', false);
                    $('#form-message').css('color', '#00c853').text('Message envoyé avec succès !');
                    $('input, textarea').removeClass('valid').val('');
                }, 1500);
            } else {
                $('#form-message').css('color', '#ff3333').text('Veuillez corriger les champs en rouge.');
            }
        });
    }

    if($('#project-details-page').length > 0) {
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = parseInt(urlParams.get('id'));
        const project = projectsDB.find(p => p.id === projectId);

        let currentSlide = 0;

        if(project) {
            $('#p-title').text(project.title);
            $('#p-category').text(project.category);
            $('#p-desc').text(project.desc);
            $('#p-date').text(project.date);
            $('#p-tools').text(project.tools);

            const renderMedia = () => {
                let mediaHtml = '';
                
                const sources = project.images || [project.img];
                
                if(sources.length > 1 && project.type !== 'video') {
                    $('#prev-slide, #next-slide, #slide-counter').css('display', 'flex');
                    $('#slide-counter').text(`${currentSlide + 1} / ${sources.length}`);
                } else {
                    $('#prev-slide, #next-slide, #slide-counter').hide();
                }

                if(project.type === 'video') {
                    mediaHtml = `<video src="${sources[0]}" controls autoplay muted playsinline class="project-media"></video>`;
                } else {
                    mediaHtml = `<img src="${sources[currentSlide]}" class="project-media" alt="${project.title}">`;
                }
                
                $('#p-media-container').fadeOut(200, function(){
                    $(this).html(mediaHtml).fadeIn(200);
                });
            };

            renderMedia();

            
            $('#next-slide').click(function(){
                const sources = project.images || [project.img];
                currentSlide = (currentSlide + 1) % sources.length;
                renderMedia();
            });

            $('#prev-slide').click(function(){
                const sources = project.images || [project.img];
                currentSlide = (currentSlide - 1 + sources.length) % sources.length;
                renderMedia();
            });

        } else {
            $('#p-title').text("Projet introuvable");
        }
    }

    const canvas = document.querySelector('#bg');
    if (canvas && typeof THREE !== 'undefined') {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio); renderer.setSize(window.innerWidth, window.innerHeight);
        camera.position.setZ(30);

        const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
        const material = new THREE.MeshStandardMaterial({ color: 0x00c853, wireframe: true });
        const torus = new THREE.Mesh(geometry, material); scene.add(torus);

        function addStar() {
            const geometry = new THREE.SphereGeometry(0.2, 24, 24);
            const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
            const star = new THREE.Mesh(geometry, material);
            const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));
            star.position.set(x, y, z); scene.add(star);
        }
        Array(250).fill().forEach(addStar);

        const pointLight = new THREE.PointLight(0xffffff); pointLight.position.set(20, 20, 20);
        const ambientLight = new THREE.AmbientLight(0xffffff); scene.add(pointLight, ambientLight);

        let mouseX = 0; let mouseY = 0;
        document.addEventListener('mousemove', (e) => { mouseX = e.clientX / window.innerWidth - 0.5; mouseY = e.clientY / window.innerHeight - 0.5; });

        function animate() {
            requestAnimationFrame(animate);
            torus.rotation.x += 0.005; torus.rotation.y += 0.002;
            camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
            camera.position.y += (-mouseY * 5 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);
            renderer.render(scene, camera);
        }
        animate();

        function moveCamera() { const t = document.body.getBoundingClientRect().top; torus.rotation.z += 0.01; camera.position.z = t * -0.01 + 30; }
        document.body.onscroll = moveCamera;
        window.addEventListener('resize', () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); });
    }
});