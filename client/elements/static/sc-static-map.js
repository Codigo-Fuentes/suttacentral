import { html, css, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { SCStaticPage } from '../addons/sc-static-page';
import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { typographyStaticStyles } from '../styles/sc-typography-static-styles';
import '../sc-map';
import mapData from '../../utils/mapData';
import { icon } from '../../img/sc-icon';

export class SCStaticMap extends SCStaticPage {
  static properties = {
    features: Array,
    layerNames: Array,
  };

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/static-map';

    this.features = [];
    this.layerNames = [];
    mapData.then(({ features, layerNames }) => {
      this.features = features;
      this.layerNames = layerNames;
    });
  }

  static styles = [
    unsafeCSS(layoutSimpleStyles),
    unsafeCSS(typographyCommonStyles),
    unsafeCSS(typographyStaticStyles),
    css`
article
{
    max-width: 100%;
}

.columns
{
    columns: 3 480px;
    margin-top: 2rem
}

.features-section
{
    break-inside: avoid;
}

ul
{
  padding-left: 0
}

li
{
    margin: .5em 0;
    padding: 0;
    list-style: none;
}

a
{
    font-family: var(--sc-sans-font);
    
    display: flex;
    max-width: max-content;

    padding: 0.2em 1em 0.2em 1em;

    text-decoration: none;

    border: 1px solid var(--sc-border-color);
    border-radius: 1.5em;
}

a svg
{
    width: 1.5em;
    display: inline-block;
    vertical-align: middle;
    margin-top: -0.2em;
    margin-left: -0.6em;
    margin-right: 0.2em;
}

h3{
  margin-top: 0
}

.features-section  {
  margin-bottom: 2rem
}
    `,
  ];

  _featuresList() {
    return this.layerNames.map(layerName => {
      let listItems = this._sortObjectsByStringKey(
        this.features.filter(feature => feature.properties.layer == layerName),
        feature => feature.properties.name
      ).map(this._featureItem);
      return html`<div class="features-section">
        <h3>${layerName}</h3>
        <ul>
          ${listItems}
        </ul>
      </div>`;
    });
  }

  _sortObjectsByStringKey(objectList, keyFn) {
    return objectList.sort((a, b) => keyFn(a).localeCompare(keyFn(b)));
  }

  _featureItem(feature) {
    let name = feature.properties.name;
    let linkedName = feature.properties.define
      ? html`<a href="/define/${feature.properties.define}"
          >${icon.marker[feature.properties.icon]}${name}</a
        >`
      : name;
    return html`<li>${linkedName}</li>`;
  }

  render() {
    return html`
      <main>
        <article>
          <h1>${unsafeHTML(this.localize('static-map:1'))}</h1>
          <sc-map id="map" hide-static-map-button></sc-map>
          <h2>${unsafeHTML(this.localize('static-map:2'))}</h2>
          <div class="columns">${this._featuresList()}</div>
        </article>
      </main>
    `;
  }
}

customElements.define('sc-static-map', SCStaticMap);
