
const classifiedColumn = document.querySelectorAll('.classifiedColumn'),
  pocket = document.getElementById('pocket'),
  pocketLength = pocket.querySelectorAll("li").length,
  pocketData = document.querySelector('.pocket ul');

console.log(pocketLength);

const handler = (event) => {
  let data = event.target.innerHTML.charAt(0)
  if (event.target.nodeName === 'LI') {
    // switch (data) {
    //   case 'A':
    //     classifiedColumn[0].appendChild(event.target)
    //     break;
    //   case 'B':
    //     classifiedColumn[1].appendChild(event.target)
    //     break;
    //   case 'C':
    //     classifiedColumn[2].appendChild(event.target)
    //     break;
    //   default:
    //   // code block
    // }
    if (data === 'A') {
      classifiedColumn[0].appendChild(event.target)
    }
    if (data === 'B') {
      classifiedColumn[1].appendChild(event.target)
    }
    if (data === 'C') {
      classifiedColumn[2].appendChild(event.target)
    }
    for (let i = 0; i < pocketLength; i++) {
      let list = classifiedColumn[i];
      Array.from(list.querySelectorAll("li:not(:first-child)"))
        .sort((a, b) => {
          if (a.innerHTML > b.innerHTML) return 1
          else return -1
        })
        .forEach(li => list.appendChild(li));
    }

    if (pocketData.children.length === 0) {
      pocket.parentNode.removeChild(pocket)
    }
  }

}

pocket.addEventListener('click', handler);

