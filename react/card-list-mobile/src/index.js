import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import _ from 'lodash';
import './index.css';
const log = console.log.bind(console);

let logo =
  "https://vignette1.wikia.nocookie.net/logopedia/images/7/74/TV_2_logo_2013.svg/revision/latest?cb=20131102014907";
logo = '/assets/logos/bbc.svg';

let cards = [];
for (let i = 1; i <= 96; i++) {
  let card = {
    id: `id_${i}`,
    name: "tv2",
    price: `${i + 10} kr./md.`,
    logo,
    type: "movie",
    hasProduct: false
  };
  cards.push(card);
}
cards[1].hasProduct = true;
cards[2].hasProduct = true;
cards[3].hasProduct = true;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: mapArrayIntoObject(props.cards),
      filterValue: "all"
    };
    this.onClick = this.onClick.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.filter = this.filter.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
  }

  onClick({ row, item }) {
    //log(row);
    //log(item);
    this.setState(prevState => {
      return {
        activeRow: row,
        activeItem: item.id,
        prevActiveItem: prevState.activeItem,
        prevActiveRow: prevState.activeRow
      };
    });
  }
  onCloseClick(e) {
    this.setState(prevState => {
      return {
        activeRow: -1,
        activeItem: -1,
        prevActiveItem: prevState.activeItem,
        prevActiveRow: prevState.activeRow
      };
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeItem !== this.state.activeItem) {
      if (this.state.activeItem) {
        let activeRow = `activeRow${this.state.activeRow}Css`;
        let prevActiveRow = `activeRow${this.state.prevActiveRow}Css`;
        let isNewRow = this.state.activeRow !== this.state.prevActiveRow;

        //   setTimeout(() => {
        this.setState({
          [activeRow]: "is-open",
          [prevActiveRow]: isNewRow ? "" : "is-open"
        });
        // }, 0); // next event loop
      }
    }
  }

  filter() {
    log("TODO filter");

    const { filterValue, cards } = this.state;

    switch (filterValue) {
      case "all":
        break;
      case "sport":
        break;
      case "documentary":
        break;
      case "movie":
        break;
      default:
        break;
    }
  }

  handleFilterChange(e) {
    log(e.target.value);
    this.setState({ filterValue: e.target.value }, this.filter);
  }

  render() {
    let arr = Object.values(this.state.cards);
    // TODO filter arr by this.state.filterValue

    const step = 3;
    let counter = 0;
    const row1 = arr.slice(counter * step, ++counter * step);
    const row2 = arr.slice(counter * step, ++counter * step);
    const row3 = arr.slice(counter * step, ++counter * step);
    const row4 = arr.slice(counter * step, ++counter * step);
    const row5 = arr.slice(counter * step, ++counter * step);
    const row6 = arr.slice(counter * step, ++counter * step);
    const row7 = arr.slice(counter * step, ++counter * step);
    const row8 = arr.slice(counter * step, ++counter * step);
    const row9 = arr.slice(counter * step, ++counter * step);
    const row10 = arr.slice(counter * step, ++counter * step);

    return (
      <section className="app">
        <header>Ekstra kanaler</header>

        <form className="filter-form" onSubmit={e => e.preventDefault()}>
          <div className="filter-form-body">
            <label className="filter-form__title">Filter:</label>
            <select
              id="filter-select"
              value={this.state.filterValue}
              onChange={this.handleFilterChange}
            >
              <option value="all">Alle</option>
              <option value="sport">Sport</option>
              <option value="documentary">Dokumentar</option>
              <option value="movie">Film</option>
            </select>
          </div>
        </form>

        {createRowGrid.call(this, { number: 1, rowData: row1 })}
        {createActiveRow.call(this, { activeRowCss: this.state.activeRow1Css })}

        {createRowGrid.call(this, { number: 2, rowData: row2 })}
        {createActiveRow.call(this, { activeRowCss: this.state.activeRow2Css })}

        {createRowGrid.call(this, { number: 3, rowData: row3 })}
        {createActiveRow.call(this, { activeRowCss: this.state.activeRow3Css })}

        {createRowGrid.call(this, { number: 4, rowData: row4 })}
        {createActiveRow.call(this, { activeRowCss: this.state.activeRow4Css })}
        
        {createRowGrid.call(this, { number: 5, rowData: row5 })}
        {createActiveRow.call(this, { activeRowCss: this.state.activeRow5Css })}
        
        {createRowGrid.call(this, { number: 6, rowData: row6 })}
        {createActiveRow.call(this, { activeRowCss: this.state.activeRow6Css })}
        
        {createRowGrid.call(this, { number: 7, rowData: row7 })}
        {createActiveRow.call(this, { activeRowCss: this.state.activeRow7Css })}
        
        {createRowGrid.call(this, { number: 8, rowData: row8 })}
        {createActiveRow.call(this, { activeRowCss: this.state.activeRow8Css })}
        
        {createRowGrid.call(this, { number: 9, rowData: row9 })}
        {createActiveRow.call(this, { activeRowCss: this.state.activeRow9Css })}

        {createRowGrid.call(this, { number: 10, rowData: row10 })}
        {createActiveRow.call(this, { activeRowCss: this.state.activeRow10Css })}
        
        <footer className="app__footer">Total: 60 kr./md.</footer>
      </section>
    );
  }
}

class Card extends React.Component {
  render() {
    return (
      <button
        className={cx("card", {
          "is-open": this.props.isOpen,
          "has-product": this.props.hasProduct
        })}
        onClick={this.props.onClick}
      >
        <div className="content">
          <img src={this.props.logo} />
        </div>
        <div className="footer">{this.props.price}</div>
      </button>
    );
  }
}

class ActiveRow extends React.Component {
  render() {
    return (
      <div className={cx("row-active", this.props.cssClass)}>
        {this.props.children}
      </div>
    );
  }
}

ReactDOM.render(<App cards={cards} />, qs("#root"));

function createRowGrid({ number, rowData }) {
  return (
    <div className="row">
      {rowData.map((item, index) => (
        <Card
          row={number}
          key={item.id}
          isOpen={item.id === this.state.activeItem}
          {...item}
          onClick={() => this.onClick({ row: number, item })}
        />
      ))}
    </div>
  );
}
function createActiveRow({ activeRowCss }) {
  let obj = { ...this.state.cards[this.state.activeItem] };
  delete obj.logo;
  return (
    <ActiveRow cssClass={activeRowCss}>
      <div> {JSON.stringify(obj)}</div>
      <button className="btn-close" onClick={this.onCloseClick}>
        Luk
      </button>
    </ActiveRow>
  );
}

function qs(expr, context) {
  return (context || document).querySelector(expr);
}
function qsa(expr, context) {
  return [].slice.call((context || document).querySelectorAll(expr), 0);
}

// Data structure reorder.
// better for lookup and update by id
function mapArrayIntoObject(arr) {
  return arr.reduce((acc, curr) => {
    acc[curr.id] = curr;
    return acc;
  }, {});
}

//const takeN = 3;
//array.splice(0, array.length - takeN);
