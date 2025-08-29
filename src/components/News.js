import React, { Component } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      articles: [],
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchNews();
  }

  fetchNews = async () => {
    this.setState({ loading: true, error: null });

    const { page } = this.state;
    const { country, category, apiKey, pageSize } = this.props;

   
 const url = 'https://newsapi.org/v2/everything?domains=wsj.com&apiKey=38a263174ea04bfd85df07bc59d485dd&pageSize=20&page=$(this.state.page)'

    try {
      let data = await fetch(url);
      if (!data.ok) throw new Error(`Error ${data.status}: ${data.statusText}`);

      let parsedData = await data.json();

      this.setState({
        articles: parsedData.articles || [],
        totalResults: parsedData.totalResults || 0,
        loading: false,
      });
    } catch (error) {
      this.setState({
        error: error.message,
        loading: false,
      });
    }
  };

  handleToprevpage = async () => {
    await this.setState((prevState) => ({
      page: Math.max(prevState.page - 1, 1),
    }));
    this.fetchNews();
  };

  handleTonextpage = async () => {
    await this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
    this.fetchNews();
  };

  render() {
    return (
     <div className="container my-2" style={{ paddingTop: '70px' }}>
  <h1 className="text-center my-2">
    SNAP HEADLINES
  </h1>

        {this.state.loading ? (
          <div className="text-center my-3">
            <Spinner />
          </div>
        ) : (
          <>
            {this.state.error && (
              <div className="alert alert-danger text-center" role="alert">
                {this.state.error}
              </div>
            )}

            <div className="row">
              {this.state.articles.map((element) => (
                <div className="col-md-4" key={element.url || Math.random()}>
                  <Newsitem
                    imgUrl={element.urlToImage}
                    title={element.title ? element.title.slice(0, 60) : 'No title available'}
                    description={element.description ? element.description.slice(0, 90) : 'No description available'}
                    author={element.author}
                    date={element.publishedAt}
                    newsurl={element.url}
                  />
                </div>
              ))}
            </div>

            <div className="container d-flex justify-content-between my-2">
              <button className="btn btn-primary" onClick={this.handleToprevpage} disabled={this.state.page === 1}>
                &larr; Previous
              </button>
              <button
                className="btn btn-primary"
                onClick={this.handleTonextpage}
                disabled={this.state.page >= Math.ceil(this.state.totalResults / this.props.pageSize)}
              >
                Next &rarr;
              </button>
            </div>
          </>
        )}
      </div>
    );
  }
}
