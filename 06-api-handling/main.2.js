let postData = [],
  authorData = [],
  postList = document.querySelector('#postList');

const postdataUrl = 'https://jsonplaceholder.typicode.com/posts',
  modal = document.querySelector('.modal'),
  modalContent = document.querySelector('.modal-content');

function init() {
  fetch(postdataUrl)
    .then(res => res.json())
    .then(res => {
      renderpostData(res);
    })
    .catch(() => {
      console.log('Post data faild');
    });
}

let postElement = (div) => {
  div = document.createElement('div');
  div.setAttribute('class', 'col s4');
  div.innerHTML = '<div><h4 class="postTitle"></h4><p class="postBody"></p><div><a class="waves-effect waves-light btn postCTA" href="javascript:void(0);">About Author</a><div class="progress"><div class="indeterminate"></div></div></div></div>'
  return div
}

const renderpostData = (res) => {
  let fragment = document.createDocumentFragment();

  Array.from(res).forEach(e => {
    const html = postElement().cloneNode(true)
    html.querySelector('.postTitle').innerHTML = e.title
    html.querySelector('.postBody').innerHTML = e.body
    html.querySelector('.postCTA').setAttribute('user-id', e.userId)
    fragment.appendChild(html)
  });
  postList.appendChild(fragment);
  postList.addEventListener('click', fetchAuthor);
}

const renderauthorData = (res) => {
  modalContent.querySelector('.data').style.display = 'block';
  modalContent.querySelector('.no-data').style.display = 'none';
  modalContent.querySelector('.name').innerHTML = res.name;
  modalContent.querySelector('.email').innerHTML = res.email;
  modalContent.querySelector('.company').innerHTML = res.company.name + '<br>' + res.company.catchPhrase + '<br>' + res.company.bs + '<br><b>Phone:- </b>' + res.phone + '<br><b>Website:- </b><a target="_blank" href="http://' + res.website + '" >' + res.website;
  modalContent.querySelector('.address').innerHTML = res.address.street + '<br>' + res.address.suite + ', ' + res.address.city + '<br><b>zipcode:- </b>' + res.address.zipcode + '<br><b>Lat:- </b>' + res.address.geo.lat + ', <b>lng:- </b>' + res.address.geo.lng;
  modelPopup();
}

const fetchAuthor = (res) => {
  let _target = res.target,
    user_id = _target.getAttribute('user-id');
  if (_target.tagName !== 'A') return false;

  _target.classList.add('active');

  if (authorData.indexOf(user_id) >= 0) {
    renderauthorData(authorData[user_id]);
    _target.classList.remove('active');
  } else {
    fetch(`https://jsonplaceholder.typicode.com/users/${user_id}`)
      .then(res => res.json())
      .then(res => {
        _target.classList.remove('active');
        renderauthorData(res);
        authorData.push(user_id);
        authorData[user_id] = res;
      })
      .catch(() => {
        authornoData();
        _target.classList.remove('active');
        console.log('Post data faild');
      });

  }


}

const authornoData = () => {
  modelPopup();
  modalContent.querySelector('.data').style.display = 'none';
  modalContent.querySelector('.no-data').style.display = 'block';
  instance.open();
}

const modelPopup = () => {
  const instance = M.Modal.init(modal, {
    onCloseEnd: function () {
      instance.destroy();
    }
  })
  instance.open()
}

init();
