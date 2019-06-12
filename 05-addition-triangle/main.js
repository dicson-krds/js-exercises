const model = {
  triangleArray: [],
  getTriangleArray: () => model.triangleArray,
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
  setVisibility: (val) => {
    let targetRow = val.querySelectorAll('div'),
      currentRow = targetRow.length;

    let interval = setInterval(function () {
      currentRow -= 1;
      targetRow[currentRow].style.visibility = 'visible';
      if (currentRow == 0)
        clearInterval(interval)
    }, 600);
  },
  init: () => {
    document.querySelector('.input').addEventListener('submit', view.getValue);
  }
}

const controller = {
  addValue: (val) => {
    model.triangleArray.push(val)
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
    let frameValue = [],
      space = '',
      stringSpace = '\xa0';
    view.resetFrame();
    for (let i = (arr.length - 1); i >= 0; i--) {
      space = stringSpace.repeat(arr[i].length);
      frameValue = arr[i].join(space)
      model.output.insertAdjacentHTML('beforeend', '<div>' + frameValue + '</div>');
      if (i == 0) {
        divTag = document.querySelectorAll('.frame div');
        [].forEach.call(divTag, function (e) {
          e.style.visibility = 'hidden';
        });
        let finalFrame = document.querySelector('.frame')
        view.setVisibility(finalFrame);
      }
    }
  }
}
view.init();
