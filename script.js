document.addEventListener('DOMContentLoaded', function() {
    // 轮播功能
    const slideshows = document.querySelectorAll('.slideshow-container');
    
    slideshows.forEach(slideshow => {
        const slides = slideshow.querySelectorAll('.slide');
        const dots = slideshow.querySelectorAll('.dot');
        let currentSlide = 0;
        
        // 显示初始幻灯片
        showSlide(currentSlide);
        
        // 自动轮播
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 4000);
        
        // 点击圆点切换幻灯片
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
        
        // 显示指定幻灯片
        function showSlide(n) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[n].classList.add('active');
            dots[n].classList.add('active');
        }
        
        // 点击图片预览
        slides.forEach(slide => {
            const img = slide.querySelector('img');
            img.addEventListener('click', function() {
                previewImage.src = this.src;
                overlay.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });
    });

    // 图片预览功能
    const overlay = document.getElementById('imagePreview');
    const previewImage = document.getElementById('previewImage');
    const closeButton = document.querySelector('.close-preview');
    
    closeButton.addEventListener('click', closePreview);
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closePreview();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePreview();
        }
    });
    
    function closePreview() {
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    const familyContainer = document.querySelector('.family-scroll-container');
    if (familyContainer) {
        // 克隆图片实现无限滚动
        const images = familyContainer.querySelectorAll('.family-image');
        images.forEach(img => {
            const clone = img.cloneNode(true);
            familyContainer.appendChild(clone);
        });

        let scrollInterval;
        const speed = 1; // 滚动速度

        function startAutoScroll() {
            scrollInterval = setInterval(() => {
                familyContainer.scrollLeft += speed;
                
                // 当滚动到一半时，重置到开始位置实现无缝循环
                if (familyContainer.scrollLeft >= (familyContainer.scrollWidth / 2)) {
                    familyContainer.scrollLeft = 0;
                }
            }, 20);
        }

        function stopAutoScroll() {
            clearInterval(scrollInterval);
        }

        // 鼠标进入停止滚动，移出继续滚动
        familyContainer.addEventListener('mouseenter', stopAutoScroll);
        familyContainer.addEventListener('mouseleave', startAutoScroll);

        // 开始自动滚动
        startAutoScroll();

        // 点击图片预览
        familyContainer.querySelectorAll('.family-image').forEach(img => {
            img.addEventListener('click', function() {
                previewImage.src = this.src;
                overlay.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });
    }
}); 