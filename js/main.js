document.addEventListener('DOMContentLoaded', () => {
    const sideNavToggler = document.getElementsByClassName('sidenav-toggler')[0];
    const bottomNav = document.getElementsByClassName('bottomnav')[0];
    if (!bottomNav.classList.contains('hidden')) {
        bottomNav.classList.add('hidden');
    }
    if (!sideNavToggler.classList.contains('onnavbar')) {
        sideNavToggler.classList.add('onnavbar')
    }
    sideNavToggler.addEventListener('click', (e) => {
        bottomNav.classList.toggle('hidden');
        sideNavToggler.classList.toggle('onnavbar');
    })
})