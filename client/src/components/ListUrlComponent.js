/*eslint react/jsx-filename-extension: 0 */
/*eslint react/prop-types: 0 */

import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CheckCircle from '@material-ui/icons/CheckCircle';
import HomePageComponent from './HomePageComponent';
import '../styles/ListUrlComponent.css';
//import queryString from "query-string";
const Rx = require('rxjs');

class ListUrlComponent extends React.Component {
  // const token = queryString.parse(props.location.search).token;
  // if (!token) {
  //     window.localStorage.setItem("jwt",token);
  //     props.history.push("/");
  //  }
  constructor(props){
    super(props);
    this.state = {
      listdata: []
    };
  }

  
  componentWillMount(){
    Rx.from(fetch(`/apps`)
             .then(res => {
               console.log(res);
               this.setState({listdata: res})
             }))
  }
  
  render(){
  //const { classes } = this.props;
  const data = ['css', 'html', 'javascript', 'nodejs'];
  return (
    <div>
      <HomePageComponent />
      {data.map((x) =>
          <div className="root">
            <Card className="card">
              <CardHeader
                avatar={
                  <Avatar aria-label="Recipe" className="avatar">
                    <CheckCircle className="checkCircle" />
                  </Avatar>
                }
                title={x}
                subheader="September 14, 2016"
              />
            </Card>
          </div>
        )
      }
    </div>
  );
}
}
export default (ListUrlComponent);

