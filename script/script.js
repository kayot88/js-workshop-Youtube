'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const keyboardButton = document.querySelector('.search-form__keyboard');
  const keyboardItem = document.querySelector('.keyboard');
  const searchInput = document.querySelector('.search-form__input');
  const toggleTop = () => {
    return keyboardItem.style.top
      ? (keyboardItem.style.top = '')
      : (keyboardItem.style.top = '50%');
  };

  keyboardButton.addEventListener('click', () => {
    return toggleTop();
  });
  const closeButton = document.getElementById('close-keyboard');
  closeButton.addEventListener('click', () => {
    return toggleTop();
  });
  const typing = e => {
    const myTarget = e.target;
    const content = myTarget.textContent.trim();

    const arrLetters = [...keyboardItem.querySelectorAll('button')].filter(
      item => {
        return item.style.visibility !== 'hidden';
      }
    );
    const changeLang = (btns, lang) => {
      const langRu = [
        'ё',
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        0,
        '-',
        '=',
        '⬅',
        'й',
        'ц',
        'у',
        'к',
        'е',
        'н',
        'г',
        'ш',
        'щ',
        'з',
        'х',
        'ъ',
        'ф',
        'ы',
        'в',
        'а',
        'п',
        'р',
        'о',
        'л',
        'д',
        'ж',
        'э',
        'я',
        'ч',
        'с',
        'м',
        'и',
        'т',
        'ь',
        'б',
        'ю',
        '.',
        'en',
        ' '
      ];
      const langEn = [
        '`',
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        0,
        '-',
        '=',
        '⬅',
        'q',
        'w',
        'e',
        'r',
        't',
        'y',
        'u',
        'i',
        'o',
        'p',
        '[',
        ']',
        'a',
        's',
        'd',
        'f',
        'g',
        'h',
        'j',
        'k',
        'l',
        ';',
        '"',
        'z',
        'x',
        'c',
        'v',
        'b',
        'n',
        'm',
        ',',
        '.',
        '/',
        'ru',
        ' '
      ];
      if (lang === 'en') {
        btns.forEach((elem, i) => {
          elem.textContent = langEn[i];
        });
      }
      if (lang === 'ru') {
        btns.forEach((elem, i) => {
          elem.textContent = langRu[i];
        });
      }
    };

    if (myTarget.tagName.toLowerCase() === 'button') {
      if (content === '⬅') {
        return (searchInput.value = searchInput.value.slice(0, length - 1));
      } else if (!content) {
        return (searchInput.value += ' ');
      } else if (content === 'ru' || content === 'en') {
        changeLang(arrLetters, content);
      } else {
        return (searchInput.value += myTarget.textContent.trim());
      }
    }
  };

  keyboardItem.addEventListener('click', typing);
  // menu
  {
    const burger = document.querySelector('.spinner');
    const sidebarMenu = document.querySelector('.sidebarMenu');
    burger.addEventListener('click', () => {
      sidebarMenu.classList.toggle('rollUp');
      burger.classList.toggle('active');
    });
    sidebarMenu.addEventListener('click', e => {
      let target = e.target;
      target = target.closest('a[href="#"]');

      if (target) {
        const parentNode = target.parentNode;
        sidebarMenu.querySelectorAll('li').forEach(element => {
          if (element === parentNode) {
            element.classList.add('active');
          } else {
            element.classList.remove('active');
          }
        });
      }
    });
  }
  // modal
  {
    const divYoutuber = document.querySelector('.youTuberModal');
    // console.log(divYoutuber);
    const youtuberContainer = document.getElementById('youtuberContainer');
    // console.log(youtuberContainer);
    const youtuberClose = document.getElementById('youtuberClose');
    const youtuberItems = document.querySelectorAll('[data-youtuber]');

    const qw = [3840, 2560, 1920, 1280, 854, 640, 426, 256];
    const qh = [2160, 1440, 1080, 720, 480, 360, 240, 144];

    const sizeVideo = () => {
      let vw = document.documentElement.clientWidth;
      let vh = document.documentElement.clientHeight;
      for (let index = 0; index < qw.length; index++) {
        if (vw > qw[index]) {
          youtuberContainer.querySelector('iframe').style.cssText = `
         width: ${qw[index]}px;
         height:${qh[index]}px;
         `;
          youtuberContainer.style.cssText = `
         width: ${qw[index]}px;
         height:${qh[index]}px;
         top: ${(vh - qh[index]) / 2}px;
         left: ${(vw - qw[index]) / 2}px;
         `;
          break;
        }
      }
    };

    youtuberItems.forEach(elem => {
      elem.addEventListener('click', () => {
        const idVideo = elem.dataset.youtuber;
        divYoutuber.style.display = 'block';
        const youTuberFrame = document.createElement('iframe');
        youTuberFrame.src = `https://youtube.com/embed/${idVideo}`;
        youtuberContainer.insertAdjacentElement('beforeend', youTuberFrame);
        window.addEventListener('resize', sizeVideo);
        sizeVideo();
      });
    });
    youtuberClose.addEventListener('click', () => {
      divYoutuber.style.display = '';
      youtuberContainer.textContent = '';
      window.removeEventListener('resize', sizeVideo);
    });
  }
  // youtube api
  {
    const API_KEY = 'AIzaSyDOc9wZYiYfHt6Ln_n9_eIxJrlke6RYQwo';
    const AUTH_ID =
      '564463627171-7i1scqci790mh9q2qg09hga9neii733v.apps.googleusercontent.com';
  }
});
