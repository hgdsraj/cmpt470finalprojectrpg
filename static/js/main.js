window.onload = () => {

  fetch('./channels.json')
    .then(
      function (response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }

        // Examine the text in the response
        response.json().then(function (data) {
          console.log(data);

          if (data.length === 0) {
            return;
          }
          channelsList = ``;
          for (let i = 0; i < data.length; i++) {
            channelsList += `<li><a href="/chat/${data[i]}">${data[i]}</a></li>`;
          }
          channelsList = `<ul>${channelsList}</ul>`;
          document.getElementById("channels").innerHTML = channelsList;
        });
      }
    )
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });

  const createChannelButton = document.getElementById('submit');

  createChannelButton.addEventListener('click', (e) => {
    e.preventDefault();
    channelName = document.getElementById('channel_name').value;
    if (channelName === '') {
      alert('channel name cannot be empty');
      return;
    }
    post('/channel', {'channel_name': channelName});
  });

  createChannelButton.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
    createChannelButton.click();
  });

};

/**
 * sends a request to the specified url from a form. this will change the window location.
 * @param {string} path the path to send the post request to
 * @param {object} params the paramiters to add to the url
 * @param {string} [method=post] the method to use on the form
 * taken from https://stackoverflow.com/questions/133925/javascript-post-request-like-a-form-submit
 */

function post(path, params, method = 'post') {

  // The rest of this code assumes you are not using a library.
  // It can be made less wordy if you use one.
  const form = document.createElement('form');
  form.method = method;
  form.action = path;

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.name = key;
      hiddenField.value = params[key];

      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
  form.submit();

}
