// Dropdown menülerin çalışması için JavaScript
document.addEventListener('DOMContentLoaded', function () {
    // Tüm dropdown butonlarını seç
    const dropdownBtns = document.querySelectorAll('.dropdown-btn');

    // Her butona click event listener ekle
    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Tıklanan butonun data-menu attribute'unu al
            const menuId = this.getAttribute('data-menu');
            const dropdownContent = document.getElementById(menuId);

            // Diğer tüm açık menüleri kapat
            dropdownBtns.forEach(otherBtn => {
                if (otherBtn !== btn) {
                    const otherId = otherBtn.getAttribute('data-menu');
                    const otherContent = document.getElementById(otherId);
                    otherContent.classList.remove('show');
                    otherBtn.classList.remove('active');
                }
            });

            // Tıklanan menüyü aç/kapat
            this.classList.toggle('active');

            // Animasyon için height değişimini ayarla
            if (dropdownContent.classList.contains('show')) {
                dropdownContent.style.maxHeight = null;
                setTimeout(() => {
                    dropdownContent.classList.remove('show');
                }, 200); // animasyon süresi ile eşleşmeli
            } else {
                dropdownContent.classList.add('show');
                dropdownContent.style.maxHeight = dropdownContent.scrollHeight + "px";
            }
        });
    });

    // Sayfa herhangi bir yerine tıklandığında menüleri kapat
    document.addEventListener('click', function (event) {
        if (!event.target.closest('.dropdown')) {
            dropdownBtns.forEach(btn => {
                const menuId = btn.getAttribute('data-menu');
                const dropdownContent = document.getElementById(menuId);
                if (dropdownContent.classList.contains('show')) {
                    dropdownContent.style.maxHeight = null;
                    setTimeout(() => {
                        dropdownContent.classList.remove('show');
                    }, 200); // animasyon süresi ile eşleşmeli
                }
                btn.classList.remove('active');
            });
        }
    });

    // İç içe dropdown menüler için
    const nestedDropdownBtns = document.querySelectorAll('.nested-dropdown-btn');

    nestedDropdownBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation(); // Ana dropdown'ın kapanmasını engelle
            const menuId = this.getAttribute('data-menu');
            const dropdownContent = document.getElementById(menuId);

            // Diğer açık olan iç içe menüleri kapat
            nestedDropdownBtns.forEach(otherBtn => {
                if (otherBtn !== btn) {
                    const otherId = otherBtn.getAttribute('data-menu');
                    const otherContent = document.getElementById(otherId);
                    otherContent.classList.remove('show');
                    otherBtn.classList.remove('active');
                }
            });

            // Tıklanan menüyü aç/kapat
            this.classList.toggle('active');
            dropdownContent.classList.toggle('show');
        });
    });

    // Arama çubuğu fonksiyonalitesi
    const searchBar = document.querySelector('.search-bar');
    searchBar.addEventListener('input', function (e) {
        const searchTerm = e.target.value.toLowerCase();
        // Tüm içeriği seç (menüler, ana içerik, vs.)
        const searchableElements = document.querySelectorAll('.dropdown-item, .content *');

        searchableElements.forEach(element => {
            const text = element.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                element.style.backgroundColor = searchTerm ? '#fff3cd' : ''; // Eşleşen içeriği vurgula
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                element.style.backgroundColor = '';
            }
        });
    });

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Sayfa yüklendiğinde dark mode durumunu kontrol et
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
    if (isDarkMode) {
        body.classList.add('dark-mode');
    }

    // Dark mode toggle fonksiyonu
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        // Dark mode durumunu localStorage'a kaydet
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', null);
        }
    });

    // Diğer sayfalarda dark mode kontrolü
    document.addEventListener('DOMContentLoaded', function () {
        const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        }
    });
});