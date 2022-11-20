function setUpNav() {
  const burgerButton = document.querySelector('.burgerButton');
  const navExit = document.querySelector('.navExit');
  burgerButton.addEventListener('click', toggleNav);
  navExit.addEventListener('click', toggleNav);
}

function toggleNav() {
  const optionsMenu = document.querySelector('.navOptions');

  if (optionsMenu.classList.contains('open')) { // close
    optionsMenu.classList.add('close');
    optionsMenu.classList.remove('open');
  } else { // open
    optionsMenu.classList.add('open');
    optionsMenu.classList.remove('close');
  }
}


setUpNav();
