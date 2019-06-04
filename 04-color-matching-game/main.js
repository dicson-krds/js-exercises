//Color matching game
const model = {
  randomColors: ['red', 'green', 'blue', 'tomato', 'orange', 'gray', 'violet', 'brown'],
  tile: document.querySelectorAll('#board > li'),
  tileColors: [],
  currentIndex: '',
  previousIndex: '',
  steps: 1,
  gamechecker: 1,
  currentColor: '',
  previousColor: '',
  incrementSteps: () => model.steps++,
}
const view = {
  board: document.querySelector('.board'),
  tileBoard: document.querySelectorAll('.board li'),
  steps: document.querySelector('#steps'),
  congratsMsg: document.querySelector('#congrats'),
  updateSteps: count => {
    steps.innerHTML = steps.innerHTML.replace(/[0-9]/g, '') + count;
  },
  colorMatching: () => {
    if (model.previousColor) {
      if (model.currentColor == model.previousColor) {
        model.tile[model.currentIndex].style.pointerEvents = 'none';
        model.tile[model.previousIndex].style.pointerEvents = 'none';
        view.gameCompleted();
      } else {
        model.tile[model.currentIndex].setAttribute('style', '');
        model.tile[model.previousIndex].setAttribute('style', '');
      }
      model.previousIndex = '';
    }
    else {
      model.previousIndex = model.currentIndex;
      model.tile[model.currentIndex].style.pointerEvents = 'none';
    }
  },
  gameCompleted: () => {
    if (model.gamechecker == model.randomColors.length) {
      view.congratsMsg.removeAttribute('style');
      view.board.removeEventListener('click', controller.clickHandler)
    }

    ++model.gamechecker;
  },
  init: () => {
    controller.shuffle();
    view.board.addEventListener('click', controller.clickHandler);
  }
}

const controller = {
  setTilesColor: () => {
    controller.shuffle();
    for (let i = 0; i < model.tileColors.length; i++) {
      model.tile[i].style.backgroundColor = model.tileColors[i];
    }
  },
  shuffle: () => {
    model.tileColors = model.randomColors.concat(model.randomColors);
    model.tileColors = model.tileColors.sort(function () {
      return .5 - Math.random();
    });
    console.log(model.tileColors);
  },
  clickHandler: (e) => {
    if (e.target.tagName !== 'LI') return false;
    view.updateSteps(model.incrementSteps())
    model.currentIndex = Array.from(model.tile).indexOf(e.target)
    model.currentColor = model.tileColors[model.currentIndex]
    model.previousColor = model.tileColors[model.previousIndex]

    e.target.style.backgroundColor = model.currentColor;
    view.colorMatching();
  }
}

view.init();
