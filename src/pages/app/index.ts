import Page from '../../core/templates/page';
import Header from '../../core/components/header/index';
import ErrorPage, { ErrorTypes } from '../../pages/error/index';
import Footer from '../../core/components/footer/index';
import GaragePage from '../../pages/garage/index';
import WinnersPage from '../../pages/winners/index';

export const enum PageIDs {
  GaragePage = 'garage',
  WinnersPage = 'winners',
}

export default class App {
  private static container: HTMLElement = document.body;
  private static defaultPageID = 'current-page';
  private header: Header;
  private footer: Footer;
  static stringURL: string = '';
  static currentURL: string = 'garage';

  static renderNewPage(idPage: string) {
    const currentPageHTML = document.querySelector(`#${App.defaultPageID}`);

    if (currentPageHTML) {
      currentPageHTML.remove();
    }

    let page: Page | null;

    if (idPage == PageIDs.GaragePage) {
      page = new GaragePage(idPage);
    } else if (idPage == PageIDs.WinnersPage) {
      page = new WinnersPage(idPage);
    } else {
      page = new ErrorPage(idPage, ErrorTypes.Error_404);
    }

    if (page) {
      const PageHTML = page.render();
      PageHTML.id = App.defaultPageID;
      document.querySelector('.header-wrapper')!.after(PageHTML);
    }
  }

  private hashChangeHandle() {
    let hashPage = window.location.hash.slice(1);

    App.currentURL = hashPage;

    if (hashPage.length === 0) {
      window.location.hash = '#garage';
      App.currentURL = 'garage';
      App.renderNewPage(App.currentURL);
    } else {
      App.renderNewPage(App.currentURL);
    }
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', this.hashChangeHandle);
  }

  private enableRouteChangeReload() {
    window.addEventListener('DOMContentLoaded', this.hashChangeHandle);
  }

  constructor() {
    this.header = new Header('header', 'header-wrapper');
    this.footer = new Footer('footer', 'footer-wrapper');
  }

  run() {
    App.container.append(this.header.render());
    App.container.append(this.footer.render());   

    this.enableRouteChange();
    this.enableRouteChangeReload();
  }
}
