const model = {
  triangleArray: [],
  getTriangleArray: () => model.triangleArray,
  updateTriangleArray: (arr) => model.triangleArray.push(arr),
  resetTriangle: () => model.triangleArray = []
}

const controller = {
  init: () => {
    document.querySelector('.input').addEventListener('submit', controller.arrayFrominput)
  },
  arrayFrominput: (e) => {
    e.preventDefault()
    let baseArray = []
    new FormData(e.target).get('ip').trim().split(' ').forEach(val => {
      if (!isNaN(parseInt(val))) {
        baseArray.push(parseInt(val))
      }
    });
    controller.sumArray(baseArray)
    e.target.reset()
  },
  sumArray: (arr) => {
    model.updateTriangleArray(arr)
    const tempArr = []

    if (arr.length == 1) {
      view.renderTriangle(model.getTriangleArray())
      controller.createTriangle(model.getTriangleArray())
      model.resetTriangle();
      return false
    }

    for (let i = 0; i < arr.length - 1; i++) {
      tempArr.push(parseInt(arr[i]) + parseInt(arr[i + 1]))
    }
    controller.sumArray(tempArr)
  },
  createTriangle: (arr) => {
    let spaces = 0;
    for (let i = (arr.length - 1); i >= 0; i--) {
      let totalChar = arr[i].reduce((acc, cv) => cv.toString().length + acc, 0)
      if (spaces) {
        const splitSpace = Math.ceil(spaces / (arr[i].length - 1));
        console.log(splitSpace);
      }
      spaces = totalChar + spaces
    }
  }
}
const view = {
  output: document.querySelector('.output'),
  renderTriangle: (arr) => {
    view.output.innerHTML = '';
    let highestInt = arr.flat().pop().toString().length;
    let nbsp = new Array(highestInt + 1).join('&nbsp;')
    arr.forEach((arr, index) => {
      setTimeout(() => {
        let a = document.createElement('div');
        a.classList.add(`row_${index}`);
        view.output.insertBefore(a, document.querySelector(`.row_${index - 1}`))
        arr.forEach((item, i) => {
          let b = document.createElement('span')
          b.innerHTML = item + nbsp;
          document.querySelector(`.row_${index}`).append(b)
        })
      }, 1000 * index)
    })
  }
}

controller.init()
