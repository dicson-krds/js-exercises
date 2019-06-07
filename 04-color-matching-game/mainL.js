const model = {
  uniqueColors: ['red', 'green', 'yellow', 'cornflowerblue', 'blue', 'purple', 'cyan', 'magenta'],
  colorBox: [],
  selectedIndex: null,
  chosenColor: 0,
  steps: 1,
  getColorBox: () => model.colorBox,
  getselectedIndex: () => model.selectedIndex,
  getsteps: () => model.steps,
  createColorBox: () => {
    model.colorBox = model.uniqueColors.map(item => [item, item]).flat().sort(() => Math.random() - 0.5)
  },
  checkChosenColor: () => model.uniqueColors.length === model.chosenColor,
  updateChosenColor: () => model.chosenColor++,
  updateSelectedIndex: id => model.selectedIndex = id,
  incrementSteps: () => model.steps++,
}

const view = {
  board: document.querySelector('.board'),
  cards: document.querySelectorAll('.board li'),
  congratsMsg: document.querySelector('#congrats'),
  steps: document.querySelector('.steps'),
  renderTile: (index, color) => {
    view.cards[index].setAttribute('style', `background-color:${color};pointer-events: none`)
  },
  freezeBoard: status => {
    status ?
      board.style.pointerEvents = 'none' :
      board.style.pointerEvents = 'auto'
  },
  freezeTiles: (arr) => {
    arr.forEach(index => view.cards[index].style.pointerEvents = 'none')
  },
  resetTiles: (arr) => {
    arr.forEach(index => view.cards[index].removeAttribute('style'))
  },
  updateSteps: count => {
    steps.innerHTML = steps.innerHTML.replace(/[0-9]/g, '') + count;
  },
  gameCompleted: () => {
    view.congratsMsg.removeAttribute('style');
    view.board.removeEventListener('click', view.triggerAction)
  },
  init: () => {
    view.board.addEventListener('click', controller.triggerAction)
  },
}
const controller = {
  board: document.querySelector('.board'),
  cards: document.querySelectorAll('.board li'),
  triggerAction: e => {
    if (e.target.tagName !== 'LI') return false;
    view.updateSteps(model.incrementSteps())

    const index = Array.from(controller.cards).indexOf(e.target);
    const previousIndex = model.getselectedIndex();
    view.renderTile(index, model.getColorBox()[index])

    if (previousIndex == null) {
      model.updateSelectedIndex(index)
    }
    else {
      controller.compareTiles(previousIndex, index)
    }
  },
  compareTiles: (previousIndex, index) => {
    const colorBox = model.getColorBox()

    if (colorBox[previousIndex] === colorBox[index]) {
      view.freezeTiles([previousIndex, index])
      model.updateChosenColor()
      model.updateSelectedIndex(null)
      if (model.checkChosenColor()) {
        view.gameCompleted()
      }
    }
    else {
      view.freezeBoard(true)
      setTimeout(() => {
        view.resetTiles([previousIndex, index])
        model.updateSelectedIndex(null)
        view.freezeBoard(false)
      }, 600)
    }
  }
}

model.createColorBox()
view.init()
