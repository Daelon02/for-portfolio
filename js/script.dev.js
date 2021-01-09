"use strict";

function forms() {
  var message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся!',
    failure: 'Что-то пошло не так...'
  };
  var form = document.getElementsByTagName('form'),
      input = form.getElementsByTagName('input'),
      statusMessage = document.createElement('div'),
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
          request.open('POST', 'server.php');
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

      postData(formData).then(function () {
        return statusMessage.innerHTML = message.loading;
      }).then(function () {
        return statusMessage.innerHTML = message.success;
      })["catch"](function () {
        return statusMessage.innerHTML = message.failure;
      }).then(clearInput);
    });
  }

  sendForm(form);
}