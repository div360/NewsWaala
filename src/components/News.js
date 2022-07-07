import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading';
import PropTypes from 'prop-types'

import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {

  static defaultProps = {
    country:'in',
    pageSize:8,
    category:'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category:PropTypes.string,    
  }

  capitalizeFirstLetter=(string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props){
    super(props);
    this.state={
      articles: [],
      loading:false,
      page:1,
      totalResults: 0
    }
    
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsWala`;
  }

  async updateNews(pageNo){
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    //page Size sets how many articles to be displayed on one page -->  taken from the api
    this.setState({ loading:true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(50);
    this.setState({ loading:false });

    // loading will remain true till  the api loads and parses the data to data.json

    this.setState({articles: parsedData.articles,
      totalResults: parsedData.totalResults})
    
    this.props.setProgress(100);
  }

  async componentDidMount(){
    this.updateNews();
  }
  // componentDidMount() method
  // This method gets invoked once the component has been rendered.

  // As a result, the constructor of our application gets executed first, followed by the ‘render method,’ and at last, the ComponentDidMount() method is invoked.
  // First of all, we would use our copied News URL in the component Did Mount method as a variable. This URL will help in fetching the News in our application.
  // After that, we would be using the Fetch API. Remember, the fetch API takes a URL and returns a promise. Here, how you can use the fetch API:- 
  // Async keyword is used to make a function asynchronous. Async can wait inside its body to resolve for some of the promises. The await keyword will stop the execution until a defined task is completed. In our case, it will wait for the promise to be resolved. 
  // Once, The promise is resolved, it would provide us the data. We can parse the data as text or JSON. After that, we would use the setState method to set the state of the articles as parsed Data articles.

  
  handlePreviousClick = async ()=>{
    this.setState({
    page: this.state.page - 1});

    this.updateNews();
  }

  //the handlePreviousClick will run on clicking the previous button and componenDidMount will run when the page first reloads
  
  handleNextClick = async () =>{
      this.setState({
        page: this.state.page + 1})

      this.updateNews();
    
  }

  fetchMoreData = async () => {  
    this.setState({page: this.state.page + 1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=322128915f3141c8a8b50a488a0f7236&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults
    })
  };


  render() {
    return (
          <>
          <h2 className='text-center' style={{margin:"35px 0px"}}>NewsWala - Laaya Laaya NewsWala news ki daily dose laaya</h2>
          <h3 className='text-center' style={{margin:"35px 0px"}}>Top Stories from {this.capitalizeFirstLetter(this.props.category)}</h3>
          
          {this.state.loading && <Loading/>}
            {/* when loading is true display the loading gif */}

            <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Loading/>}
                > 
            <div className="container">
            <div className="row">
              
            {/* To do that, first of all, we have to iterate the articles array and then render its data in the NewsItem. We can do so by using the map() method.

            map() method: The map() method is the most commonly used function to iterate over an array of data in JSX. You can attach the map() method to the array and use a callback function that gets called for each iteration.

            In our case, The map would go through each of the objects in the array, and it will make each individual array item available to us as an element. Notice, Inside the arrow function, we have returned the NewsItem Component.
            See below */}

            { this.state.articles.map((element) => {
              // \!sthis.state.loading && --<. for when loading is true don't display the news items
              return <div className='col-md-4'key={element.url} >
                {/* We have to pass a unique to every element which will be returned when this funciton will run --> this.articles.map((element)=>....)  , so as every news article will have a unique url we will pass url as the key here */}
              {/* returning our newsitem component */}
              <NewsItem title={element.title?element.title:" "} description={element.description?element.description:" "} imageUrl={element.urlToImage?element.urlToImage:"https://newsinterpretation.com/wp-content/uploads/2020/03/news33.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}></NewsItem>

              {/* using ternary operator in title , description and image url that if element.title is true then element.title else null
              --> element.title?element.title */}
            </div>

            // See inside the json we pasted in article as an array there are different keywords --> title, description. imageUrl etc and by using those we can access content related to them
            })}
           </div>
          </div> 
          </InfiniteScroll>

          {/* <div className="container d-flex justify-content-between" >
          <button disabled={this.state.page <= 1} type="button"  className="btn btn-primary" onClick={this.handlePreviousClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button"  className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>  */}
           
      {/* // this.state.totalResults / 20  gives the total no of pages as we do totalResults /20 we want 20 articles in one page
      // Math.ceil() method
      // We have a total of 38 results so if we render 20 News on one page then it will take 1.9 pages to render all the NewsItems. But, we want to display two pages. Thus, To overcome this issue we would use math.ceil() method. This method rounds a number up to the next largest integer. 
      // In the above code we have used the if-else statement to use the function only if the next page exists otherwise it won’t be executed. Now if the function is executed then the state of the page will be updated by 1. */}

          {/* </div> */}
        </>
    )
  }
}
