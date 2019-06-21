let postData = [],
  postdataUrl = 'https://jsonplaceholder.typicode.com/posts',
  postList = document.querySelector('#postList');

const modal = document.querySelector('.modal'),
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

const renderpostData = (data) => {
  let fragment = document.createDocumentFragment();

  Array.from(data).forEach(e => {
    const html = postElement().cloneNode(true)
    html.querySelector('.postTitle').innerHTML = e.title
    html.querySelector('.postBody').innerHTML = e.body
    html.querySelector('.postCTA').setAttribute('data-id', e.id)
    fragment.appendChild(html)
  });
  postList.appendChild(fragment);
  postList.addEventListener('click', fetchAuthor);
}

const renderauthorData = (data) => {
  modalContent.querySelector('.data').style.display = 'block';
  modalContent.querySelector('.no-data').style.display = 'none';
  modalContent.querySelector('.name').innerHTML = data.name;
  modalContent.querySelector('.email').innerHTML = data.email;
  modalContent.querySelector('.phone').innerHTML = data.phone;
  modalContent.querySelector('.website').innerHTML = data.website;
  modalContent.querySelector('.website').href = 'http://' + data.website;
  modalContent.querySelector('.zipcode').innerHTML = data.address.zipcode;
  modalContent.querySelector('.lat').innerHTML = data.address.geo.lat;
  modalContent.querySelector('.lng').innerHTML = data.address.geo.lng;
  modalContent.querySelector('.company').innerHTML = data.company.name + '<br>' + data.company.catchPhrase + '<br>' + data.company.bs;
  modalContent.querySelector('.address').innerHTML = data.address.street + '<br>' + data.address.suite + ', ' + data.address.city;

  const instance = M.Modal.init(modal, {
    onCloseEnd: function () {
      instance.destroy();
    }
  })
  instance.open()
}

const fetchAuthor = (res) => {
  let _target = res.target;
  if (_target.tagName !== 'A') return false;

  let user_id = _target.getAttribute('data-id');
  _target.classList.add('active');
  fetch(`https://jsonplaceholder.typicode.com/users/${user_id}`)
    .then(res => res.json())
    .then(res => {
      _target.classList.remove('active');
      renderauthorData(res);
    })
    .catch(() => {
      authornoData();
      _target.classList.remove('active');
      console.log('Post data faild');
    });
}

const authornoData = () => {
  const instance = M.Modal.init(modal, {
    onCloseEnd: function () {
      instance.destroy();
    }
  })
  instance.open()
  modalContent.querySelector('.data').style.display = 'none';
  modalContent.querySelector('.no-data').style.display = 'block';
  instance.open();
}
init();
