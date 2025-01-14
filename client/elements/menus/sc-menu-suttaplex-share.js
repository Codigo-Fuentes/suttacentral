import { LitElement, html, css } from 'lit';

import { LitLocalized } from '../addons/sc-localization-mixin';
import { API_ROOT } from '../../constants';
import copyToClipboard from '../../utils/copy';
import { volPagesToString } from '../../utils/suttaplex';
import { icon } from '../../img/sc-icon';

/*
Menu on top of the suttaplex parallel's list for copying information from parallels to clipboard.
*/

export class SCMenuSuttaplexShare extends LitLocalized(LitElement) {
  static properties = {
    item: { type: Object },
    parallels: { type: Object },
    loadingParallels: { type: Boolean },
    areParallelsAvailable: { type: Boolean },
    localizedStringsPath: { type: String },
  };

  constructor() {
    super();
    this.item = [];
    this.parallels = [];
    this.loadingParallels = false;
    this.areParallelsAvailable = false;
    this.localizedStringsPath = '/localization/elements/interface';
  }

  static styles = css`
    :host {
      outline: none;
    }

    .button-text {
      color: var(--sc-primary-text-color);
      font-weight: 500;
    }

    .button-text:hover {
      background-color: var(--sc-tertiary-background-color);
      transition: background-color 0.2s ease;
      cursor: pointer;
    }

    .button-text:active {
      background-color: var(--sc-textual-info-background-color);
      transition: background-color 0.2s ease;
      cursor: pointer;
    }

    .table-element {
      white-space: nowrap;
      height: 48px;
      padding: 0 16px;
      display: flex;
      align-items: center;
    }

    .table-element[disabled] {
      color: var(--sc-icon-color);
    }

    .icon {
      margin-right: var(--sc-size-md);
      fill: var(--sc-icon-color);
    }

    .disabled {
      pointer-events: none;
      opacity: 0.6;
    }
  `;

  render() {
    return html`
      <li
        id="btnCopyLink"
        class="table-element button-text"
        @click=${this.#copyLink}
        title=${this.#computeLink(this.item)}
      >
        ${icon.link} ${this.localize('share:copyLink')}
      </li>
      <li id="btnCopyContent" class="table-element button-text" @click=${this.#copyContent}>
        ${icon.content_copy} ${this.localize('share:copyTable')}
      </li>
      <li id="btnCopyCite" class="table-element button-text" @click=${this.#copyCite}>
        ${icon.format_quote} ${this.localize('share:cite')}
      </li>
    `;
  }

  async #fetchParallels() {
    this.loadingParallels = true;
    this.parallels = await (await fetch(this.#getAPIEndpoint(this.item))).json();
    this.loadingParallels = false;
    this.#didRespond();
  }

  #didRespond() {
    if (this.parallels) {
      this.shadowRoot.querySelector('#btnCopyContent').classList.remove('disabled');
      this.shadowRoot.querySelector('#btnCopyCite').classList.remove('disabled');
    } else {
      this.shadowRoot.querySelector('#btnCopyContent').classList.add('disabled');
      this.shadowRoot.querySelector('#btnCopyCite').classList.add('disabled');
    }
  }

  #notifyCopy(message, success) {
    this.dispatchEvent(
      new CustomEvent('par-menu-copied', {
        detail: { message, success },
        bubbles: true,
        composed: true,
      })
    );
  }

  // copy the parallels-table in html-string
  async #copyContent() {
    try {
      await this.#fetchParallels();
      const table = this.#computeCopyTable();
      copyToClipboard(table);
      this.#notifyCopy(this.localize('share:tableCopied'), true);
    } catch (err) {
      this.#notifyCopy(this.localize('share:error'), false);
      console.error(err);
    }
  }

  #computeLink() {
    const url = window.location;
    const baseUrl = `${url.protocol}//${url.host}`;
    try {
      return `${baseUrl}/${this.item.uid}`;
    } catch (err) {
      this.#notifyCopy(this.localize('share:error'), false);
    }
  }

  // Copy the link to the suttaplex page
  #copyLink() {
    try {
      const link = this.#computeLink();
      copyToClipboard(link);
      this.#notifyCopy(this.localize('share:linkCopied'), true);
    } catch (err) {
      this.#notifyCopy(this.localize('share:error'), false);
      console.error(err);
    }
  }

  //  copy cite-information about parallels and bibliography.
  async #copyCite() {
    await this.#fetchParallels();
    this.#computeCiteData();
    try {
      const cite = this.#computeCiteData();
      copyToClipboard(cite);
      this.#notifyCopy(this.localize('share:citeCopied'), true);
    } catch (err) {
      this.#notifyCopy(this.localize('share:error'), false);
      console.error(err);
    }
  }

  #computeIcon(parallel) {
    switch (parallel.type) {
      case 'full':
        if (parallel.resembling) {
          return '≈';
        }
        return '⮀';
      case 'retelling':
        return '🔃';
      case 'mention':
        return '❞';
      default:
        return '';
    }
  }

  // creates a parallels-table in html-string
  #computeCopyTable() {
    let body = `<table>\n  <caption>${this.item.original_title}</caption>\n`;
    for (const section of Object.keys(this.parallels)) {
      let tbody = '<tbody>\n';
      const size = this.parallels[section].length;
      let first = true;
      let tr = '';
      for (const parallel of this.parallels[section]) {
        tr = '  <tr>\n';
        if (first) {
          tr += `    <td rowspan=${size}>${section}</td>\n`;
          first = false;
        }
        tr += `    <td>${this.#computeIcon(parallel)}</td>\n`;
        tr += `    <td>${parallel.to.to}</td>\n`;
        tr += `    <td>${parallel.to.original_title}</td>\n`;
        tbody += `${tr}  </tr>\n`;
      }

      body += `${tbody}</tbody>\n`;
    }
    body += '</table>\n';
    return body;
  }

  #computeCiteData() {
    let result = '';
    for (const section of Object.keys(this.parallels)) {
      const acronymUid = this.#generateAcronymUid(this.item.acronym, section);
      result += `Parallels for ${acronymUid} ${this.item.translated_title} `;
      const volpages = volPagesToString(this.item.volpages);
      result += volpages ? `(${volpages})` : '';
      result = this.#strip(result, ' ');
      result += ': ';
      for (const parallel of this.parallels[section]) {
        result += this.#generateAcronymUid(parallel.to.acronym, parallel.to.to);
        result += ' ';
        const parallelVolpages = volPagesToString(parallel.to.volpages);
        result += parallelVolpages ? `(${parallelVolpages}) ` : '';
        if (parallel.to.biblio) {
          result += this.#getTextFromHtml(parallel.to.biblio);
        }
        result = this.#strip(result, ' ');
        result += '; ';
      }
      result = this.#strip(result, ' ');
      result = this.#strip(result, ';');
      result += '\n';
    }
    result += `Retrieved from ${window.location.href} on ${new Date()}.`;
    return result;
  }

  #strip(s, toStrip) {
    if (s[s.length - 1] === toStrip) {
      return s.substring(0, s.length - 1);
    }
    return s;
  }

  #generateAcronymUid(acronym, uid) {
    if (acronym) {
      const paragraph = uid.split(/#(.+)/)[1];
      if (paragraph) {
        acronym += `#${paragraph}`;
      }
      return acronym;
    }
    return uid;
  }

  #getTextFromHtml(htmlString) {
    const tmp = document.createElement('div');
    tmp.innerHTML = htmlString;
    return tmp.textContent;
  }

  #getAPIEndpoint(item) {
    return `${API_ROOT}/parallels/${item.uid}`;
  }
}

customElements.define('sc-menu-suttaplex-share', SCMenuSuttaplexShare);
