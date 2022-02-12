import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
  CardTitle } from 'reactstrap';

class DishDetail extends Component {


  renderDish(dish) {

      if (dish != null)
          return(
              <Card key={dish.id}>
                  <CardImg top src={dish.image} alt={dish.name} />
                  <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                  </CardBody>
              </Card>
          );
      else
          return(
              <div></div>
          );
          
  }

  renderComment(dish) {

    if (dish == null)
    return(
        <div></div>
    );

    const comments = dish.comments.map((comment) => {
        if (comment != null)
        return(
            <ul key={comment.id} className="list-unstyled mb-3">
                <li className= "mb-3">{comment.comment}</li>
                <li className="list-inline-item">{comment.author}</li>
                <li className="list-inline-item mb-3">--  {new Date(comment.date).toLocaleDateString("es-ES",  { year: "numeric", month: "short", day: "numeric" })}</li>
            </ul>
        );
    else
        return(
            <div></div>
        );

        
    });

    return(

        <div>
            <h4>Comments</h4>
                {comments}
        </div>

    );

}



  render() {

    const { dish } = this.props;

    if (dish == null)
    return(
        <div></div>
    );

      return (
          <div className="container">
              <div className="row">
                <div  className="col-12 col-md-5 m-1">
                  {this.renderDish(dish)}
                </div>
                <div  className="col-12 col-md-5 m-1">
                  {this.renderComment(dish)}
                </div>
              </div>
          </div>
      );
  }
}

export default DishDetail;