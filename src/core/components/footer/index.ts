import Component from '../../templates/components';

export default class Footer extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  createFooterLegal() {
    const footerLegal = this.elFactory('div', { class: 'footer-legal' });

    const footerLegalCopyright = this.elFactory('span', {
      class: 'footer-legal-copyright',
    });
    footerLegalCopyright.textContent =
      'Copyright © 2023 Async Race. All rights reserved.';

    footerLegal.append(footerLegalCopyright);

    const logosWrapper = this.elFactory('div', {
      class: 'footer-legal-logos-wrapper',
    });
    const logoGithubOneLink = this.elFactory('a', {
      class: 'footer-legal-logo',
      href: 'https://github.com/kornienkokostia',
      target: '_blanket',
    });
    const logoGithubOneImg = this.elFactory('img', {
      class: 'footer-legal-img footer-legal-img-github',
      src: './assets/images/icons/github-logo.svg',
      alt: 'bag',
    });

    const logoRsSchoolLink = this.elFactory('a', {
      class: 'footer-legal-logo',
      href: 'https://rs.school/js/',
      target: '_blanket',
    });
    const logoRsSchoolImg = this.elFactory('img', {
      class: 'footer-legal-img footer-legal-img-rsschool',
      src: './assets/images/icons/rs-school-logo.svg',
      alt: 'bag',
    });

    logoGithubOneLink.append(logoGithubOneImg);
    logosWrapper.append(logoGithubOneLink);
    logoRsSchoolLink.append(logoRsSchoolImg);
    logosWrapper.append(logoRsSchoolLink);

    footerLegal.append(logosWrapper);

    return footerLegal;
  }
  

  render() {
    const footerDiv = this.elFactory('div', { class: 'footer' });
    footerDiv.append(this.createFooterLegal())

    this.container.append(footerDiv);

    return this.container;
  }
}
