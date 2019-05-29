
const classifiedColumn = document.querySelectorAll('.classifiedColumn'),
  pocket = document.getElementById('pocket'),
  pocketLength = pocket.querySelectorAll("li").length,
  pocketData = document.querySelector('#pocket ul');

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
    } else if (data === 'B') {
      classifiedColumn[1].appendChild(event.target)
    } else if (data === 'C') {
      classifiedColumn[2].appendChild(event.target)
    }

    for (let i = 0; i < 3; i++) {
      let list = classifiedColumn[i];
      console.log(list);
      Array.from(list.querySelectorAll("li:not(:first-child)"))
        .sort((a, b) => {
          if (a.innerHTML > b.innerHTML)
            return 1
          else
            return -1
        }).forEach(li => list.appendChild(li));
    }

    if (pocketData.childElementCount === 0) pocket.remove();
  }

}

pocket.addEventListener('click', handler);
