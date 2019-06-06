//Color matching game
const model = {
  randomColors: ['red', 'green', 'blue', 'tomato', 'orange', 'gray', 'violet', 'brown'],
  tileColors: [],
  getramdomColor: () => model.randomColors,
  currentIndex: '',
  previousIndex: '',
  steps: 1,
  gamechecker: 1,
  clearTime: 200,
  incrementSteps: () => model.steps++,
}
const view = {
  board: document.querySelector('#board'),
  tile: document.querySelectorAll('#board > li'),
  steps: document.querySelector('#steps'),
  congratsMsg: document.querySelector('#congrats'),
  setTilesColor: () => {
    view.shuffle();
    for (let i = 0; i < model.tileColors.length; i++) {
      view.tile[i].style.backgroundColor = model.tileColors[i];
    }
  },
  shuffle: () => {
    model.tileColors = model.randomColors.concat(model.randomColors);
    model.tileColors = model.tileColors.sort(function () {
      return .5 - Math.random();
    });
  },
  updateSteps: count => {
    steps.innerHTML = steps.innerHTML.replace(/[0-9]/g, '') + count;
  },
  gameCompleted: () => {
    if (model.gamechecker == model.randomColors.length) {
      view.congratsMsg.removeAttribute('style');
      view.board.removeEventListener('click', controller.clickHandler)
    }
    ++model.gamechecker;
  },
  init: () => {
    view.shuffle();
    view.board.addEventListener('click', controller.clickHandler);
  }
}

const controller = {
  compareTiles: () => {
    if (model.tileColors[model.previousIndex]) {
      if (model.tileColors[model.currentIndex] == model.tileColors[model.previousIndex]) {
        view.tile[model.currentIndex].style.pointerEvents = 'none';
        view.tile[model.previousIndex].style.pointerEvents = 'none';
        view.gameCompleted();
      } else {
        setTimeout(() => {
          view.tile[model.currentIndex].setAttribute('style', '');
          view.tile[model.previousIndex].setAttribute('style', '');
        }, model.clearTime)
      }
      setTimeout(() => { model.previousIndex = '' }, model.clearTime);
    }
    else {
      model.previousIndex = model.currentIndex;
      view.tile[model.currentIndex].style.pointerEvents = 'none';
    }
  },
  clickHandler: (e) => {
    if (e.target.tagName !== 'LI') return false;
    view.updateSteps(model.incrementSteps())
    model.currentIndex = Array.from(view.tile).indexOf(e.target)

    e.target.style.backgroundColor = model.tileColors[model.currentIndex];
    controller.compareTiles();
  }
}

view.init();
