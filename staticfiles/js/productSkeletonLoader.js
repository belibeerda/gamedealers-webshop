// Скрипт для скелетон загрузки
            window.addEventListener('load', () => {
                const preloader = document.getElementById('preloader');
                const productBlock = document.querySelector('.product');
                const mainScreenshot = document.getElementById('main-screenshot');

                if (mainScreenshot && mainScreenshot.complete) {
                    showProduct();
                } else {
                    mainScreenshot.onload = showProduct;
                }

                function showProduct() {
                    preloader.style.display = 'none';
                    productBlock.style.display = 'flex';
                }
            });