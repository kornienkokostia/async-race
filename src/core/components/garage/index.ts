import Component from '../../templates/components';
import AppState from '../app-state';
import DB from '../db';

export default class Garage extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  private currentPage: number = 1

  createGarageHeader(){
    const garageHeader = this.elFactory('div', {class: 'garage-header'})

    const garageCreate = this.elFactory('div', {class: 'garage-create'})

    const garageCreateInput = this.elFactory('input', {class: 'garage-create-input input-text', type: 'text', 
      placeholder: 'Car name'})
    
    const garageCreateColorPicker = this.elFactory('input', {class: 'garage-create-color input-color',
      type: 'color', value: '#7dc1ff'}) 
    const garageCreateColorPickerWrapper = this.elFactory('div', 
      {class: 'garage-create-color-wrapper input-color-wrapper'}, garageCreateColorPicker)  

    const createBtn = this.elFactory('button', {class: 'garage-create-btn btn'})
    createBtn.textContent = 'Create'

    createBtn.addEventListener('click', async () => {
      const nameInput = document.querySelector('.garage-create-input') as HTMLInputElement
      if (nameInput.value !== '') {
        const colorInput = document.querySelector('.garage-create-color') as HTMLInputElement
        await DB.addCar({name: nameInput.value, color: colorInput.value})
        document.querySelector('.garage-cars')!.innerHTML = ''
        this.updateGarageAllCars()
        this.updateGarageTitle()
      }
      
    })

    garageCreate.append(garageCreateInput, garageCreateColorPickerWrapper, createBtn)

    const garageUpdate = this.elFactory('div', {class: 'garage-update'})

    const garageUpdateInput = this.elFactory('input', {class: 'garage-update-input input-text', type: 'text', 
      placeholder: 'New car name'})
    
    const garageUpdateColorPicker = this.elFactory('input', {class: 'garage-update-color input-color',
      type: 'color', value: '#00c2bb'}) 
    const garageUpdateColorPickerWrapper = this.elFactory('div', 
      {class: 'garage-update-color-wrapper input-color-wrapper'}, garageUpdateColorPicker)  

    const updateBtn = this.elFactory('button', {class: 'garage-update-btn btn'})
    updateBtn.textContent = 'Update'

    garageUpdate.append(garageUpdateInput, garageUpdateColorPickerWrapper, updateBtn)

    const headerButtons = this.elFactory('div', {class: 'garage-header-btns'})

    const raceBtnImg = this.elFactory('img', {class: 'header-btn-img', 
      src: './assets/images/icons/race-btn.svg', alt: 'header-btn-img'}) 
    const raceBtnSpan = this.elFactory('span', {})  
    raceBtnSpan.textContent = 'Race'
    const raceBtn = this.elFactory('button', {class: 'header-btn garage-race-btn btn'}, 
      raceBtnImg, raceBtnSpan)
    raceBtn.ondragstart = () => false;

    const resetBtnImg = this.elFactory('img', {class: 'header-btn-img', 
      src: './assets/images/icons/reset-btn.svg', alt: 'header-btn-img'}) 
    const resetBtnSpan = this.elFactory('span', {})  
    resetBtnSpan.textContent = 'Reset'
    const resetBtn = this.elFactory('button', {class: 'header-btn garage-reset-btn btn'}, 
      resetBtnImg, resetBtnSpan)
    raceBtn.ondragstart = () => false;

    const generateCarsBtn = this.elFactory('button', {class: 'garage-generate-cars-btn btn'})
    generateCarsBtn.textContent = 'Generate cars'

    headerButtons.append(raceBtn, resetBtn, generateCarsBtn)
    
    garageHeader.append(garageCreate, garageUpdate, headerButtons)

    return garageHeader
  }

  async updateGarageTitle(){
    const data = await DB.getAllCars()
    AppState.numOfCars = data.length
    document.querySelector('.cars-count')!.textContent = `${data.length}`
  }

  createCar(name: string, color: string, id: number){
    const garageCar = this.elFactory('div', {class: 'garage-car'})
    const garageCarHeader = this.elFactory('div', {class: 'garage-car-header'})

    const garageCarName = this.elFactory('p', {class: 'garage-car-name'})
    garageCarName.textContent = name

    const garageCarEditImg = this.elFactory('img', {class: 'garage-car-header-btn-img', 
      src: './assets/images/icons/edit-car-btn.svg', alt: 'garage-car-edit-btn-img'}) 
    const garageCarEditBtn = this.elFactory('button', {class: 'garage-car-edit-btn garage-car-header-btn'}, 
      garageCarEditImg)
    garageCarEditBtn.ondragstart = () => false;

    const garageCarDeleteImg = this.elFactory('img', {class: 'garage-car-header-btn-img', 
      src: './assets/images/icons/delete-car-btn.svg', alt: 'garage-car-delete-btn-img'}) 
    const garageCarDeleteBtn = this.elFactory('button', {class: 'garage-car-delete-btn garage-car-header-btn'}, 
      garageCarDeleteImg)
    garageCarDeleteBtn.ondragstart = () => false;

    garageCarHeader.append(garageCarName, garageCarEditBtn, garageCarDeleteBtn)

    const garageCarBody = this.elFactory('div', {class: 'garage-car-body'})
    const garageCarState = this.elFactory('div', {class: 'garage-car-state-wrapper'})
    const garageCarStateP = this.elFactory('span', {class: 'garage-car-state active'})
    garageCarStateP.textContent = 'P'
    garageCarStateP.addEventListener('click', () => {
      garageCarStateP.classList.toggle('active')
      garageCarStateD.classList.toggle('active')
    })
    const garageCarStateD = this.elFactory('span', {class: 'garage-car-state'})
    garageCarStateD.textContent = 'D'
    const garageCarStateCover = this.elFactory('div', {class: 'garage-car-state-cover'})
    garageCarStateD.addEventListener('click', () => {
      garageCarStateP.classList.toggle('active')
      garageCarStateD.classList.toggle('active')
    })
    garageCarState.append(garageCarStateP, garageCarStateD, garageCarStateCover)

    const garageCarModel = this.elFactory('div', {class: 'garage-car-model'})
    garageCarModel.innerHTML = `
    <svg width="62" height="19" viewBox="0 0 62 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path class="car" d="M0.00473164 10.8132C0.123789 11.1239 0.189718 11.4683 0.203476 11.8387C0.203476 11.8387 1.49365 14.227 2.02915 14.4783C2.54 14.7179 6.51873 14.9878 6.89055 15.012C6.77956 14.5836 6.72074 14.134 6.72074 13.671C6.72074 10.7301 9.10329 8.34578 12.046 8.34578C14.9869 8.34578 17.3704 10.7293 17.3704 13.671C17.3704 14.2957 17.3547 15.3762 17.3514 15.815C17.3486 16.1664 16.7338 16.3657 16.5057 16.582C27.4651 16.8779 37.6391 16.8362 46.603 16.2827C46.4166 15.953 45.9318 16.1119 45.9318 15.233C45.9318 14.9963 45.9195 14.2141 45.9195 13.671C45.9195 10.7302 48.302 8.34579 51.2447 8.34579C54.1856 8.34579 56.5691 10.7293 56.5691 13.671C56.5691 14.4774 56.3898 15.2421 56.0692 15.9265C56.7982 15.8434 58.9108 15.5878 59.2168 15.3582C59.5873 15.0802 60.5331 13.6848 60.6128 13.2877C60.6924 12.8907 60.7318 12.3547 60.7053 11.859C60.7447 11.3761 60.97 10.2643 61.2019 9.80139C58.8663 7.27422 51.8937 5.88483 46.4228 5.6268C45.5098 5.59359 44.0057 5.64672 43.7742 5.57367C39.8875 3.4766 35.9891 1.11834 30.2119 0.236522C24.9852 -0.204604 22.2768 0.0102644 18.3342 0.559547C14.9076 1.02961 5.00379 3.97995 5.30251 3.96623C5.31057 3.96575 5.31531 3.96575 5.31816 3.96575C5.23515 3.97714 1.81045 4.1977 1.57755 4.31058C1.47842 4.49557 1.53818 5.05812 1.45185 5.35554C1.22369 5.52678 -0.10535 10.7464 0.00660673 10.8131L0.00473164 10.8132ZM26.8999 5.25459C20.7347 4.81347 14.0042 4.14703 12.8652 3.46972C12.4554 3.17184 12.6006 2.83458 12.8719 2.70178C12.8719 2.70178 17.7679 0.888849 26.1404 0.805913C26.2509 1.18443 26.7138 4.01235 26.9002 5.25469L26.8999 5.25459ZM37.7867 4.29265C37.0572 4.76983 37.1668 5.45192 37.6473 5.75878C37.2365 5.83372 33.9248 5.7066 29.8417 5.45189C29.7241 4.85092 28.295 0.875492 28.4301 0.887878C33.2963 1.32806 37.3163 3.35919 37.5814 3.74813C37.6506 3.85153 37.9926 4.15746 37.7867 4.29265ZM60.1527 10.0386C59.7955 9.88022 59.4051 9.77397 58.9816 9.72132C58.8027 9.73413 58.6509 9.80101 58.5314 9.91295C57.4993 9.8067 56.3154 8.94721 55.0119 7.8619C55.5939 7.78932 56.3282 7.80213 57.1422 7.8619C58.558 8.42445 59.722 8.99365 60.2714 9.56857C60.3383 9.6421 60.2589 10.0453 60.1527 10.0386ZM1.8451 5.77153C1.97507 5.66528 2.67329 5.35459 3.82257 5.48029C4.97187 5.606 6.07798 7.02183 6.07798 7.02183C6.07798 7.02183 5.62738 7.35907 5.03967 7.45158C4.45293 7.54407 1.44332 7.53743 1.38735 7.45158C1.33232 7.3662 1.70944 5.87778 1.8451 5.77153ZM30.5897 7.35386C30.1946 7.15417 29.9266 6.86008 29.9697 6.82261C30.7804 7.04887 31.9116 6.89613 32.4557 7.02752C32.9998 7.15891 33.1677 7.45205 33.1677 7.45205C33.1677 7.45158 30.9847 7.55355 30.5897 7.35386ZM15.252 6.3943C14.8925 6.17943 14.6563 5.87491 14.6985 5.83933C15.4451 6.09784 16.5085 5.9897 17.0104 6.14196C17.5122 6.29422 17.655 6.59353 17.655 6.59353C17.655 6.59353 15.6116 6.60917 15.252 6.3943ZM12.0237 18.1497C14.4983 18.1497 16.5024 16.1451 16.5024 13.671C16.5024 11.1964 14.4978 9.19238 12.0237 9.19238C9.54914 9.19238 7.54508 11.1969 7.54508 13.671C7.54555 16.1451 9.55011 18.1497 12.0237 18.1497ZM12.822 10.18C12.8799 10.3384 12.555 11.9568 12.5332 12.0412C12.5284 12.0616 12.5279 12.0882 12.5303 12.1166C12.5398 12.2309 12.4426 12.3268 12.3292 12.3106C12.1864 12.2907 12.0142 12.2442 11.907 12.1366C11.6969 11.9264 11.3502 10.1795 11.3502 10.1795C11.4949 10.0353 12.6897 10.031 12.822 10.18ZM8.75842 12.2798C8.92586 12.2561 10.44 12.9121 10.5182 12.951C10.5367 12.9605 10.5632 12.9662 10.5917 12.97C10.7051 12.9842 10.7786 13.099 10.7392 13.2071C10.6903 13.3423 10.6088 13.5007 10.4807 13.5838C10.2312 13.7455 8.45004 13.7199 8.45004 13.7199C8.34047 13.5482 8.58529 12.3784 8.75842 12.2798ZM8.56963 14.7482C8.683 14.623 10.2668 14.1596 10.3517 14.1387C10.3721 14.134 10.3958 14.1216 10.4205 14.106C10.5173 14.0443 10.6468 14.0861 10.6857 14.1937C10.7345 14.3289 10.7734 14.503 10.7279 14.6486C10.6396 14.9323 9.2536 16.0508 9.2536 16.0508C9.05818 15.9905 8.49944 14.9347 8.56963 14.7482ZM10.6107 10.5119C10.7492 10.6078 11.4166 12.1176 11.4484 12.1992C11.456 12.2191 11.4707 12.2405 11.4897 12.2623C11.5632 12.35 11.5395 12.4838 11.4375 12.5369C11.3094 12.6028 11.1424 12.664 10.9921 12.6384C10.6989 12.5881 9.40829 11.3606 9.40829 11.3606C9.44339 11.159 10.4172 10.4664 10.6107 10.5119ZM12.6119 17.3707C12.4961 17.2479 12.1603 15.6319 12.1466 15.5455C12.1432 15.5251 12.1328 15.5005 12.1195 15.4748C12.0659 15.3733 12.1176 15.2476 12.2281 15.2173C12.3666 15.1798 12.5436 15.1547 12.6844 15.2121C12.9605 15.3231 13.9647 16.7931 13.9647 16.7931C13.8897 16.9828 12.7922 17.4561 12.6119 17.3707ZM10.0994 16.875C10.098 16.7062 10.9475 15.2912 10.9964 15.2186C11.0077 15.2016 11.0172 15.1764 11.0248 15.1484C11.0542 15.0374 11.178 14.9796 11.28 15.0327C11.4081 15.0991 11.5542 15.2006 11.6192 15.3382C11.7463 15.6066 11.4873 17.3688 11.4873 17.3688C11.3018 17.4566 10.1744 17.06 10.0994 16.875ZM15.5248 13.8446C15.3806 13.9318 13.7305 13.9228 13.6427 13.9185C13.6218 13.9171 13.5957 13.9219 13.5677 13.9299C13.4577 13.9612 13.3448 13.8844 13.3386 13.7696C13.3306 13.6264 13.3434 13.448 13.4283 13.3223C13.5943 13.0757 15.2417 12.4002 15.2417 12.4002C15.412 12.5136 15.6458 13.6861 15.5248 13.8446ZM14.7298 11.4999C14.6748 11.6588 13.3998 12.7075 13.3296 12.7597C13.3126 12.772 13.2955 12.7924 13.2794 12.8162C13.2149 12.9105 13.0787 12.9238 13.0005 12.8394C12.9027 12.7341 12.7984 12.5889 12.7837 12.4376C12.7538 12.1417 13.5886 10.5687 13.5886 10.5687C13.7921 10.5488 14.7208 11.3011 14.7298 11.4999ZM14.5154 16.1977C14.3504 16.1636 13.1437 15.0375 13.0825 14.9749C13.0682 14.9597 13.0459 14.9455 13.0199 14.9327C12.9179 14.881 12.887 14.7477 12.9601 14.6595C13.0521 14.5485 13.1816 14.4261 13.3301 14.3915C13.6189 14.3227 15.2876 14.945 15.2876 14.945C15.3351 15.1433 14.7113 16.1631 14.5154 16.1977ZM51.2379 18.1496C53.7125 18.1496 55.7165 16.145 55.7165 13.6709C55.7165 11.1963 53.712 9.19226 51.2379 9.19226C48.7643 9.19226 46.7592 11.1968 46.7592 13.6709C46.7592 16.145 48.7633 18.1496 51.2379 18.1496ZM52.0352 10.1798C52.0931 10.3383 51.7682 11.9567 51.7464 12.0411C51.7416 12.0615 51.7411 12.0881 51.7435 12.1165C51.753 12.2308 51.6558 12.3266 51.5424 12.3105C51.3996 12.2906 51.2274 12.2441 51.1202 12.1364C50.9101 11.9263 50.5634 10.1794 50.5634 10.1794C50.7081 10.0352 51.9034 10.0309 52.0352 10.1798ZM47.9726 12.2797C48.14 12.256 49.6541 12.912 49.7323 12.9509C49.7508 12.9604 49.7774 12.9661 49.8059 12.9698C49.9192 12.9841 49.9927 13.0989 49.9534 13.207C49.9045 13.3422 49.8229 13.5006 49.6949 13.5836C49.4454 13.7454 47.6642 13.7198 47.6642 13.7198C47.5537 13.5481 47.799 12.3783 47.9726 12.2797ZM47.7833 14.7481C47.8967 14.6229 49.4805 14.1594 49.5654 14.1386C49.5858 14.1338 49.6095 14.1215 49.6342 14.1059C49.731 14.0442 49.8605 14.0859 49.8993 14.1936C49.9482 14.3288 49.9871 14.5029 49.9416 14.6485C49.8533 14.9321 48.4673 16.0506 48.4673 16.0506C48.2723 15.9904 47.7127 14.9346 47.7833 14.7481ZM49.8248 10.5118C49.9633 10.6076 50.6307 12.1175 50.6624 12.1991C50.67 12.219 50.6847 12.2403 50.7037 12.2622C50.7772 12.3499 50.7535 12.4837 50.6515 12.5368C50.5235 12.6027 50.3565 12.6639 50.2061 12.6383C49.913 12.588 48.6223 11.3605 48.6223 11.3605C48.657 11.1589 49.6308 10.4663 49.8248 10.5118ZM51.8259 17.3706C51.7102 17.2477 51.3744 15.6317 51.3606 15.5454C51.3573 15.525 51.3469 15.5003 51.3336 15.4747C51.28 15.3732 51.3317 15.2475 51.4422 15.2172C51.5807 15.1797 51.7576 15.1546 51.8985 15.2119C52.1746 15.3229 53.1787 16.7929 53.1787 16.7929C53.1038 16.9827 52.0062 17.456 51.8259 17.3706ZM49.3135 16.8749C49.312 16.7061 50.1616 15.2911 50.2104 15.2185C50.2218 15.2014 50.2313 15.1763 50.2389 15.1483C50.2683 15.0373 50.3921 14.9795 50.4941 15.0326C50.6221 15.099 50.7682 15.2005 50.8332 15.338C50.9603 15.6065 50.7014 17.3687 50.7014 17.3687C50.5154 17.4564 49.388 17.0599 49.3135 16.8749ZM54.7384 13.8444C54.5942 13.9317 52.944 13.9227 52.8563 13.9184C52.8354 13.917 52.8093 13.9217 52.7813 13.9298C52.6713 13.9611 52.5584 13.8843 52.5522 13.7695C52.5441 13.6262 52.557 13.4479 52.6419 13.3222C52.8079 13.0755 54.4553 12.4001 54.4553 12.4001C54.6255 12.5135 54.8593 13.686 54.7384 13.8444ZM53.9434 11.4998C53.8884 11.6587 52.6134 12.7074 52.5432 12.7596C52.5261 12.7719 52.5091 12.7923 52.4929 12.816C52.4284 12.9104 52.2923 12.9237 52.214 12.8393C52.1163 12.734 52.012 12.5888 51.9973 12.4375C51.9674 12.1415 52.8022 10.5686 52.8022 10.5686C53.0057 10.5487 53.9344 11.301 53.9434 11.4998ZM53.7285 16.1976C53.5635 16.1634 52.3568 15.0374 52.2956 14.9748C52.2813 14.9596 52.259 14.9454 52.233 14.9326C52.131 14.8809 52.1001 14.7476 52.1732 14.6594C52.2652 14.5484 52.3947 14.426 52.5432 14.3914C52.832 14.3226 54.5007 14.9449 54.5007 14.9449C54.5486 15.1432 53.9249 16.163 53.7285 16.1976Z" fill="${color}"/>
    </svg>`

    const garageCarFinish = this.elFactory('img', {class: 'garage-car-finish', 
    src: './assets/images/icons/finish.svg', alt: 'garage-car-finish'}) 
    garageCarFinish.ondragstart = () => false;

    garageCarBody.append(garageCarState, garageCarModel, garageCarFinish)

    garageCar.append(garageCarHeader, garageCarBody)

    document.querySelector('.garage-cars')?.append(garageCar)
  }

  async updateGarageAllCars(){
    const data = await DB.getAllCarsWithinPage(this.currentPage)
    data.map(el => {
      this.createCar(el.name, el.color, el.id)
    })
  }

  createGarageCars(){
    const garageCarsWrapper = this.elFactory('div', {class: 'garage-cars-wrapper'})

    const garageCarsTitle = this.elFactory('p', {class: 'garage-cars-title'})
    garageCarsTitle.innerHTML = `Garage (<span class="cars-count">${AppState.numOfCars}</span>)`
    this.updateGarageTitle()

    const garageCarsPageNum = this.elFactory('p', {class: 'garage-cars-page-num'})
    garageCarsPageNum.innerHTML = `Page <span class="page-count">${this.currentPage}</span>`

    const garageCars = this.elFactory('div', {class: 'garage-cars'})
    
    this.updateGarageAllCars()
    
    garageCarsWrapper.append(garageCarsTitle, garageCarsPageNum, garageCars)

    return garageCarsWrapper
  }

  render() {
    this.container.append(this.createGarageHeader(), this.createGarageCars())
    
    return this.container;
  }
}