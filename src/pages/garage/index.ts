import Garage from '../../core/components/garage/index';
import Page from '../../core/templates/page';

export default class GaragePage extends Page {
  public garage: Garage = new Garage("div", "garage");

  constructor(id: string) {
    super(id);
  }
  

  render() {
    const garageDiv = document.createElement('div');
    garageDiv.classList.add('garage-wrapper');
    
    garageDiv.append(this.garage.render())
   
    this.container.append(garageDiv);
    return this.container;
  }
}
