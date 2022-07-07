import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props;

    return (
    <div className="card" >
    <div style={{    display: 'flex',
    /* justify-content: flex-end; */
    position: 'absolute',
    right: '0'}}>
      <span class="badge rounded-pill bg-danger text-white" > {source}
      </span>
    </div>
    <img className="card-img-top" src={imageUrl}  />
    <div className="card-body">
        <h5 className="card-title">{title}...</h5>
        <p className="card-text">{description}...</p>
        <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date (date).toGMTString()}</small></p>
        {/* the date that we get from the api is in ISO format so we use the Date function of javascript to convert that date to utc format we pass "date" into the object Date */}
        <a href={newsUrl} target= "_blank"className="btn btn-primary">Read More</a>
    </div>
    </div>
    )
  }
}
