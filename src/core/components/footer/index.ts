import Component from '../../templates/components';

export default class Footer extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }


  

  render() {
    const footerDiv = this.elFactory('div', { class: 'footer' });
   

    this.container.append(footerDiv);

    return this.container;
  }
}
