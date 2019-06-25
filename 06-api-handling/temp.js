const model = {
  postData: [],
  authorData: [],
  getAuthorData: _ => model.authorData,
  updateAuthorData: data => model.authorData.push(data),
  checkAuthorData: id => model.authorData.find(data => data.id === parseInt(id)),
  getPostData: _ => model.postData,
  setPostData: (data) => model.postData = data
}

const controller = {
  fetchPostData: _ => {
    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then(res => res.json())
      .then(res => {
        model.setPostData(res)
        view.renderPosts(model.getPostData());
      })
      .catch(err => view.renderError(err))
  },
  fetchAuthor: e => {
    if (e.target.tagName !== 'A') return false;
    e.preventDefault()
    let user_id = e.target.getAttribute('data-id');
    const existingData = model.checkAuthorData(user_id)
    if(existingData) {
      view.renderModal(existingData)
    }
    else {
      fetch(`https://jsonplaceholder.typicode.com/users/${user_id}`)
        .then(res => res.json())
        .then(res => {
          view.renderModal(res)
          model.updateAuthorData(res)
        })
        .catch(err => view.renderError(err))
    }
  }
}

const view = {
  postBox: document.querySelector('#postBox'),
  modal: document.querySelector('#modal'),
  modalContent: modal.querySelector('.modal-content'),
  postHTML: () => {
    const div = document.createElement('div')
    div.innerHTML = `<div class="col s12 m4"><div class="card">
    <div class="card-content"><span class="card-title"></span><p class="card-desc"></p></div>
    <div class="card-action"><a class="waves-effect waves-light btn red accent-2 authorCta" href="#">About Author</a></div>
    </div></div>`
    return div
  },
  renderError: err => {
    M.toast({html: err, classes: 'red accent-4'})
  },
  renderPosts: data => {
    let fragment = document.createDocumentFragment()
    data.forEach(post => {
      const html = view.postHTML().cloneNode(true)
      html.querySelector('.card-title').innerHTML = post.title
      html.querySelector('.card-desc').innerHTML = post.body
      html.querySelector('.authorCta').setAttribute('data-id', post.userId)
      fragment.appendChild(html)
    })
    view.postBox.addEventListener('click', controller.fetchAuthor)
    view.postBox.appendChild(fragment)
  },
  renderModal: data => {
    view.modalContent.querySelector('.name').innerHTML = data.name;
    view.modalContent.querySelector('.phone').innerHTML = data.phone;
    view.modalContent.querySelector('.email').innerHTML = data.email;
    view.modalContent.querySelector('.website').innerHTML = data.website;

    const instance = M.Modal.init(view.modal, {
      onCloseEnd: _ => instance.destroy()
    })
    instance.open()
  }
}

controller.fetchPostData()
