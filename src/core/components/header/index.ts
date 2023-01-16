import Component from '../../templates/components';

export default class Header extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  createLogo(){
    const logo = this.elFactory('a', {class: 'header-logo', href: '/#'})
    const logoText = this.elFactory('span', {class: 'header-logo-text'})
    logoText.textContent = 'Async Race'
    logo.append(logoText)
    return logo
  }

  createNavButtons(){
    const navBtns = this.elFactory('div', {class: 'header-nav-btns'})

    const garageBtnImg = this.elFactory('img', {class: 'header-btn-img', 
      src: './assets/images/icons/garage-btn.svg', alt: 'header-btn-img'})
    garageBtnImg.ondragstart = () => false;
    const garageBtnSpan = this.elFactory('span', {})  
    garageBtnSpan.textContent = 'Garage'
    const garageBtn = this.elFactory('button', {class: 'header-btn header-btn-garage btn'}, 
      garageBtnImg, garageBtnSpan)
    garageBtn.addEventListener('click', () => {
      window.location.hash = '#garage'
    })  
    
    const winnersBtnImg = this.elFactory('img', {class: 'header-btn-img', 
      src: './assets/images/icons/winners-btn.svg', alt: 'header-btn-img'}) 
    const winnersBtnSpan = this.elFactory('span', {})  
    winnersBtnSpan.textContent = 'Winners'
    const winnersBtn = this.elFactory('button', {class: 'header-btn header-btn-winners btn'}, 
      winnersBtnImg, winnersBtnSpan)
    winnersBtn.ondragstart = () => false;
    winnersBtn.addEventListener('click', () => {
      window.location.hash = '#winners'
    })   

    navBtns.append(garageBtn, winnersBtn)
    return navBtns
  }  

  render() {
    this.container.append(this.createLogo())
    this.container.append(this.createNavButtons())

    return this.container;
  }
}
