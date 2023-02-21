document.addEventListener('DOMContentLoaded', () => {
    const sideNavToggler = document.getElementsByClassName('sidenav-toggler')[0];
    const bottomNav = document.getElementsByClassName('bottomnav')[0];
    const signInButtons = document.getElementsByClassName('signin-button')
    const signInDesktop = document.getElementById('signin-desktop')
    if (!bottomNav.classList.contains('hidden')) {
        bottomNav.classList.add('hidden');
    }
    if (!sideNavToggler.classList.contains('onnavbar')) {
        sideNavToggler.classList.add('onnavbar')
    }
    sideNavToggler.addEventListener('click', (e) => {
        bottomNav.classList.toggle('hidden');
        sideNavToggler.classList.toggle('onnavbar');
    });

    if (signInDesktop) { }

    function ShowSignInForm() {
        if (!signInDesktop.classList.contains('nonedisplay')) {
            signInDesktop.classList.add('nonedisplay')
        }
        signInButtons[0].addEventListener('click', () => {
            signInDesktop.classList.toggle('nonedisplay')
        })
        signInButtons[1].addEventListener('click', () => {
            signInDesktop.classList.toggle('nonedisplay')
        })
    }



});