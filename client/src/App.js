import React from 'react';
import Nav from './components/nav';
import Search from './components/search';
import Body from './components/body'
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { uniqBy } from 'lodash';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      data: [],
      filtered: [],
      perPage: 10,
      currentPage: 0,
      search: ""
    };
  }

  getData = async () => {
    axios.get('http://localhost:5000/')
          .then(res => {
            console.log(res);
          })

    const response = await axios.get('http://localhost:5000/characters')
        .then(res => {
          let data = [...res.data];
          data = uniqBy(data, 'name')
          // console.log(data);
          const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage);
          const postData = slice.map(data => 
            <React.Fragment key={data._id}>
              <article className="card">
                <h3>{data.titles[0]}</h3>
                <h3>{data.name}</h3>
                <button className="view-btn" onClick={() => this.getDetail(data.name)}>View</button>
              </article>
            </React.Fragment>)

            this.setState({
                pageCount: Math.ceil(data.length / this.state.perPage),
                data: data,
                filtered: postData
            })
        }).catch(error => console.log('Error en petición GET', error))
    return response
  }

  getDetail = id => {
    let getInfo = this.state.data.find( data => {
      const item = data.name.includes( id )
      return item
    })
    let detail = <React.Fragment >
        <article className="info">
          <h3 id="name">{getInfo.name}</h3>
          <h3 id="title">Titles</h3>
            <ul id="titles">
              {
                getInfo.titles && getInfo.titles.map((el, i) => {
                  return <li key={i}>{el}</li>
                })
              }
            </ul>
          <h3 id="books">Books</h3>
            <ul>
              {
                getInfo.books && getInfo.books.map((el, i) => {
                  return <li key={i}>{el}</li>
                })
              }
            </ul>
          <button id="btn-back"onClick={this.getData}>Get back</button>
        </article>
      </React.Fragment>
    console.log(getInfo)
    this.setState({ filtered: detail })
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
        currentPage: selectedPage,
        offset: offset
    }, () => {
        this.getData()
    });

  };

  handleSearch = async (e) => {
    this.setState({ search: e.target.value })
    if (this.state.search === "") {
      this.setState.filtered = this.state.data
    }
    const filter = await this.state.data.filter( data => {
      const filterItems = data.name.toLowerCase().includes( this.state.search.toLowerCase() 
      )
      return filterItems
    })

    const toRender = await filter.map((data, index) => 
      <React.Fragment key={index}>
        <article className="card">
          <h3>{data.title}</h3>
          <h3>{data.name}</h3>
          <button className="view-btn" key={data.url}>View</button>
        </article>
      </React.Fragment>)
    console.log(filter);
    this.setState({ filtered: toRender})
  }

  componentDidMount = () => {
    this.getData();
  }

  render() {
    return (
      <div className="App">
        <Nav />
        <Search handleSearch={this.handleSearch}/>
        <Body valueFromParent={this.state.filtered} handleFilter={this.state.search}/>
        <ReactPaginate
          className="footer-page"
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}/>    
      </div>
    );
  }
}

export default App;
