const model = {
  triangleArray: [],
  getTriangleArray: () => model.triangleArray,
  updateTriangleArray: (val) => model.triangleArray.push(val),
  resetTriangle: () => model.triangleArray = [],
  output: document.querySelector('.frame'),
}
const view = {
  getValue: (e) => {
    e.preventDefault();
    let setArrayValue = []
    new FormData(e.target).get('ip').trim().split(' ').forEach(data => {
      if (!isNaN(parseInt(data)))
        setArrayValue.push(parseInt(data))
    });
    controller.addValue(setArrayValue)
    e.target.reset()
  },
  resetFrame: () => {
    model.output.innerHTML = '';
  },
  init: () => {
    document.querySelector('.input').addEventListener('submit', view.getValue);
  }
}

const controller = {
  addValue: (val) => {
    model.updateTriangleArray(val)
    let tempArray = []

    if (val.length == 1) {
      controller.createTriangle(model.getTriangleArray())
      model.resetTriangle();
      return false
    }

    for (let i = 0; i < val.length - 1; i++) {
      tempArray.push(parseInt(val[i]) + parseInt(val[i + 1]))
    }
    controller.addValue(tempArray);
  },
  createTriangle: (arr) => {
    let Value = [],
      space = '',
      stringSpace = '\xa0',
      spanTag = '';
    view.resetFrame();
    for (let i = (arr.length - 1); i >= 0; i--) {
      space = arr[arr.length - 1].toString().length
      //space = stringSpace.repeat(space);
      //Value = arr[i].join(space)
      console.log(space);
      Value = arr[i].join('</span><span>')
      model.output.insertAdjacentHTML('beforeend', '<div><span>' + Value + '</span></div>');
      if (i == 0) {
        //spanTag = document.querySelectorAll('.frame span')
        //spanTag.style.width = space + 'em';
        spanTag = document.querySelectorAll('.frame span');
        [].forEach.call(spanTag, function (span) {
          span.style.width = space + 'em';
        });
      }
    }

  }
}
view.init();
