import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';



 function RenderDish({dish}) {

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

 function RenderComment({comments}) {


    const commentsAray = comments.map((comment) => {
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
                {commentsAray}
        </div>

    );

}

const DishDetail = (props) => {

    if (props.dish == null)
    return(
        <div></div>
    );

      return (
        <div className="container">
        <div className="row">
            <Breadcrumb>
                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
            </div>                
        </div>
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderDish dish={props.dish} />
            </div>
            <div className="col-12 col-md-5 m-1">
                <RenderComment comments={props.comments} />
            </div>
        </div>
        </div>
      );


  }


export default DishDetail;