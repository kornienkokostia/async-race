import Winners from '../../core/components/winners/index';
import Page from '../../core/templates/page';

export default class WinnersPage extends Page {
  public winners: Winners = new Winners('div', 'winners');

  constructor(id: string) {
    super(id);
  }

  render() {
    const winnersDiv = document.createElement('div');
    winnersDiv.classList.add('winners-wrapper');

    winnersDiv.append(this.winners.render());

    this.container.append(winnersDiv);
    return this.container;
  }
}
