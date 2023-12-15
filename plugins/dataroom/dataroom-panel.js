import { DataroomElement } from './dataroom-element.js';

class DataroomPanel extends DataroomElement {
  async initialize(){
    const mode = this.getAttribute('mode');
    if(mode === null){
      this.setAttribute('mode', 'text-mode');
    }

    const button_bar = document.createElement('button-bar');
    button_bar.setAttribute('dtrm-id', 'button-bar');
    this.appendChild(button_bar);

    button_bar.addEventListener('button-clicked', (e) => {
      const new_mode = e.detail.id; 
      this.setAttribute('mode', new_mode);
    });
  }

  handleModeChange(new_mode){
    switch(new_mode){
    case "graph-mode":
      this.renderGraph();
      break;
    case "map-mode":
      this.renderMap();
      break;
    case "text-mode":
      this.renderText();
      break
    default:
      this.renderEditor();
    }
  }

  renderGraph(){
    this.container.innerHTML = `
      <graph-mode dtrm-id="${this.dtrm_id}">
        Graph Mode ${this.dtrm_id}
      </graph-mode>`
  }

  renderMap(){
    this.container.innerHTML = `
      <map-mode dtrm-id="${this.dtrm_id}">
        Map Mode ${this.dtrm_id}
      </map-mode>`
  }

  renderText(){
    this.container.innerHTML = `
      <text-mode dtrm-id="${this.dtrm_id}">
        Text Mode ${this.dtrm_id}
      </text-mode>`
  }

  renderEditor(){
    this.container.innerHTML = `
      <editor-mode dtrm-id="${this.dtrm_id}">
        Editor mode ${this.dtrm_id}
      </editor-mode>`
  }

  static get observedAttributes() {
    return ['dtrm-id', 'mode'];
  }

  attributeChangedCallback(name, old_value, new_value){
    if(new_value === old_value) return;
    switch(name){
    case "dtrm-id":
      break;
    case "mode":
      this.handleModeChange(new_value);
      break;
    default:
    }
  }
}

customElements.define('dataroom-panel', DataroomPanel)