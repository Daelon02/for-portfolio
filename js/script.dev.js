"use strict";

document.addEventListener('DOMContentLoaded', function () {
  //Form
  var message = {
    loading: 'Loading...',
    success: 'Thanks! We will contact you soon!',
    failure: 'Something was wrong...'
  };
  var form = document.querySelector('.form'),
      input = form.getElementsByTagName('input'),
      textArea = form.getElementsByClassName('text_area'),
      statusMessage = document.createElement('div'),
      contactForm = document.getElementById('form'),
      contactInput = document.getElementsByTagName('input');
  statusMessage.classList.add('status');

  function sendForm(elem) {
    elem.addEventListener('submit', function (e) {
      e.preventDefault();
      elem.appendChild(statusMessage);
      var formData = new FormData(elem);

      function postData(data) {
        return new Promise(function (resolve, reject) {
          var request = new XMLHttpRequest();
          request.open('POST', 'telegram.php');
          request.setRequestHeader('Content-Type', 'application/json; charset=utf-8'); // Without AJAX request.setRequestHeader('Content-Type', 'application/x-www-urlencoded');

          var obj = {};
          formData.forEach(function (value, key) {
            obj[key] = value;
          });
          var json = JSON.stringify(obj);

          request.onreadystatechange = function () {
            if (request.readyState < 4) {
              resolve(); // statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4) {
              if (request.status == 200 && request.status < 3) {
                resolve(); // statusMessage.innerHTML = message.success;  
              } else {
                reject(); // statusMessage.innerHTML = message.failure;
              }
            }
          };

          request.send(json);
        });
      } // End postData


      function clearInput() {
        for (var i = 0; i < input.length; i++) {
          input[i].value = '';
        }
      }

      function clearTextArea() {
        for (var i = 0; i < textArea.length; i++) {
          textArea[i].value = '';
        }
      }

      postData(formData).then(function () {
        return statusMessage.innerHTML = message.loading;
      }).then(function () {
        return statusMessage.innerHTML = message.success;
      })["catch"](function () {
        return statusMessage.innerHTML = message.failure;
      }).then(clearInput).then(clearTextArea);
    });
  }

  sendForm(form);
  sendForm(contactForm); //Tabs

  var tab = document.querySelectorAll('.info-header-tab'),
      info = document.querySelectorAll('.info-header'),
      tabContent = document.querySelectorAll('.info-tabcontent');

  function hideTabContent(a) {
    for (var i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  }

  hideTabContent(1);

  function showTabContent(b) {
    if (tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
    }
  }

  info.forEach.call(info, function (el) {
    el.addEventListener('click', function (event) {
      var target = event.target;

      if (target && target.classList.contains('info-header-tab')) {
        for (var i = 0; i < tab.length; i++) {
          if (target == tab[i]) {
            hideTabContent(0);
            showTabContent(i);
            break;
          }
        }
      }
    });
  });
  var navCollapse = document.querySelector('.navbar-collapse'),
      navToggler = document.getElementById('navToggler');
  navToggler.addEventListener('click', function () {
    if (navCollapse > 350) {
      navCollapse.getElementsByClassName.width = "350px";
    } else {
      navCollapse.children[0].children[0].removeAttribute("style");
    }
  }); //Modal

  var more = document.querySelector('.more'),
      overlay = document.querySelector('.overlay'),
      close = document.querySelector('.popup-close'),
      descriptionBtn = document.querySelectorAll('.description-btn');
  more.addEventListener('click', function () {
    overlay.style.display = 'block';
    this.classList.add('more-splash');
    document.body.style.overflow = 'hidden';
  });
  close.addEventListener('click', function () {
    overlay.style.display = 'none';
    more.classList.remove('more-splash');
    document.body.style.overflow = '';
  });
  descriptionBtn.forEach.call(descriptionBtn, function (descript) {
    descript.addEventListener('click', function () {
      overlay.style.display = 'block';
      this.classList.add('description-btn-splash');
      document.body.style.overflow = 'hidden';
    });
  }); //Swiper for mobile devices

  $(window).resize(function () {
    if (document.documentElement.clientWidth <= 576) {
      var swiper = document.querySelector('.swiper'),
          images = document.querySelector('.images');
      swiper.classList.remove('hide');
      swiper.classList.add('show');
      images.classList.add('hide');
      images.classList.remove('show');
    }
  });
  $(window).resize(function () {
    if (document.documentElement.clientWidth > 1200) {
      var swiper = document.querySelector('.swiper'),
          images = document.querySelector('.images');
      swiper.classList.add('hide');
      swiper.classList.remove('show');
      images.classList.remove('hide');
      images.classList.add('show');
    }
  });
});