const model = {
  triangleArray: [],
  getTriangleArray: () => model.triangleArray,
  updateTriangleArray: (val) => model.triangleArray.push(val)
}
const view = {
  getValue: (e) => {
    e.preventDefault();
    let setArrayValue = []
    new FormData(e.target).get('ip').trim().split(' ').forEach(data => {
      if (!isNaN(parseInt(data)))
        setArrayValue.push(parseInt(data))
    });
    view.addValue(setArrayValue)
  },
  addValue: (val) => {
    model.updateTriangleArray(val)
    //console.log(val);
    let tempArray = []

    if (val.length == 1) {

    }

    for (let i = 0; i < val.length - 1; i++) {
      tempArray.push(parseInt(val[i]) + parseInt(val[i + 1]))
    }
    //view.addValue(tempArray)
    console.log(view.addValue(tempArray));
  },
  init: () => {
    document.querySelector('.input').addEventListener('submit', view.getValue);
  }
}

const controller = {
  createTriangle: () => {

  }
}
view.init();
