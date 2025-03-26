const menu = document.querySelector('.header-menu-body' )
const menuBtn = document.querySelector('.header-menu-icon')

const body = document.body;

if (menu && menuBtn) {
        menuBtn.addEventListener('click', () => {
        menu.classList.toggle('active' )
        menuBtn.classList.toggle('active')
        body.classList.toggle('lock')
    })

    menu.querySelectorAll('.menu-link' ).forEach(link => {
            link.addEventListener('click', () => {
            menu.classList.toggle('active')
            menuBtn.classList.toggle('active')
            body. classList. toggle('lock')
        })
    })
}