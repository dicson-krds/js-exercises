const model = {
  postData: [],
  postdataUrl: 'https://jsonplaceholder.typicode.com/posts',
  btnAuthor: null,
  authordataUrl: 'https://jsonplaceholder.typicode.com/users/'
}
const view = {
  postId: document.getElementById('post'),
  postDataHandler: () => {
    data = fetch(model.postdataUrl)
      .then((data) => data.json())
      .then((data) => {
        if (data)
          return data.map(function (data) {
            let postData = '<div class="col s4"><div><h4>' + `${data.title}` + '</h4>' + '<p>' + `${data.body}` + '</p><div><a class="waves-effect waves-light btn modal-trigger" href="JavaScript:void(0);" id="' + `${data.id}` + '">Author Details</a><div class="progress"><div class="indeterminate"></div></div></div></div></div>';
            view.postId.innerHTML += postData;
          })
      }).then(() => {
        model.btnAuthor = document.querySelectorAll('.btn');
        model.btnAuthor = Array.from(model.btnAuthor)
        model.btnAuthor.forEach(el => {
          el.addEventListener('click', controller.authorDataHandler);
        });
      }).catch(() => {
        console.log('Post data Server Down');
      });
  },
  resetPopup: () => {
    controller.modelCnt.innerHTML = '';
  },
  init: () => {
    view.postDataHandler();
  }
}

const controller = {
  modelCnt: '',
  model: document.querySelector('.modal'),
  authorDataHandler: (data) => {
    view.resetPopup();
    let btnActive = event.target;
    btnActive.classList.add('active');
    tempUrl = model.authordataUrl.concat(data.target.id);
    modelData = fetch(tempUrl)
      .then((modelData) => modelData.json())
      .then((modelData) => {
        if (modelData)
          controller.authorPopup(modelData)
        else
          controller.authornoData()

        btnActive.classList.remove('active');
      }).catch(() => {
        console.log('Author Details Server Down');
        btnActive.classList.remove('active');
        controller.authornoData();
      });
  },
  authorPopup: (data) => {
    controller.modelCnt = document.querySelector('.modal-content');
    let modelHTML = '<h5><b>Name: </b>' + `${data.name}` + '</h5><h5><b>Email ID: </b>' + `${data.email}` + '</h5><div><div><h6>Company:</h6><p>' + `${data.company.name}` + '<br>' + `${data.company.catchPhrase}` + '<br>' + `${data.company.bs}` + '<br><b>Phone:- </b>' + `${data.phone}` + '<br><b>Website:- </b><a href="https://' + `${data.website}` + '" target="_blank">' + `${data.website}` + '</a></p></div><div><h6>Address:</h6><p>' + `${data.address.street}` + ', ' + `${data.address.suite}` + '<br/>' + `${data.address.city}` + '<br><b>zipcode:- </b>' + `${data.address.zipcode}` + '<br><b>Lat:-</b> ' + `${data.address.geo.lat}` + ', <b>lng:- </b>' + `${data.address.geo.lng}` + '</p></div></div>',
      instances = M.Modal.init(controller.model, {
        onCloseEnd: function () {
          instances.destroy();
        }
      });
    controller.modelCnt.innerHTML = modelHTML;
    instances.open();
  },
  authornoData: () => {
    let instances = M.Modal.init(controller.model, {
      onCloseEnd: function () {
        instances.destroy();
      }
    });
    controller.modelCnt.innerHTML = '<div class="no-data">:( No data From Server</div>';
    instances.open();
  }
}
view.init();
