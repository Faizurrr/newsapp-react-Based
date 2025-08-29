import React, { Component } from 'react';

export default class NewsItem extends Component {
  render() {
    // Destructure props BEFORE return
    let { title, description, imgUrl , newsurl ,author, date} = this.props;

    return (
     
  <div className='my-2'>
    <div className="card">
      <img
        src={imgUrl}
        className="card-img-top"
        alt="NewS"
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{title}...</h5>
        <p className="card-text">{description}....</p>
        <p className="card-text">
          <small className="text-body-secondary">
            By {!author ? "Unknown" : author} on {date}
          </small>
        

            </p>
            <a href={newsurl} target='blank' className="btn btn-sm btn-dark ">Read More</a>
      </div>
    </div>
  </div>
);

}
}    


