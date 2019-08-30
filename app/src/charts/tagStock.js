import React from 'react'

export default class TagStock extends React.Component {
  
  render() {
    return (
      <ul className="nav">
        {this
          .props
          .tags
          .map((tag,index) => {
            return (
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={()=>this.props.tagClick(tag)}>{`${index+1}:${tag}`}</a>
              </li>
            )
          })
        }
      </ul>
    )
  }
}