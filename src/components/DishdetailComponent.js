import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Label,
  Col,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from './LoadingComponent';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCommentModalOpen: false,
    };

    this.toggleCommentModal = this.toggleCommentModal.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);

  }

  toggleCommentModal() {
    this.setState({ isCommentModalOpen: !this.state.isCommentModalOpen });
  }

  handleCommentSubmit(values) {
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    this.toggleCommentModal();
  }

  render() {
    return (
      <>
        <Button outline onClick={this.toggleCommentModal}>
          <span className="fa fa-comments fa-lg"></span>Submit Comment
        </Button>

        <Modal
          isOpen={this.state.isCommentModalOpen}
          toggle={this.toggleCommentModal}
        >
          <ModalHeader toggle={this.toggleCommentModal}>
            Submit Comment
          </ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleCommentSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="rating" md={12}>
                  Rating
                </Label>
                <Col md={12}>
                  <Control.select
                    model=".rating"
                    className="form-control"
                    name="rating"
                    id="rating"
                    validators={{
                      required,
                    }}
                  >
                    <option>Please Select</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: "Required",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="author" md={12}>
                  {" "}
                  Your Name{" "}
                </Label>
                <Col md={12}>
                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    placeholder="First Name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less",
                    }}
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="comment" md={12}>
                  Comment
                </Label>
                <Col md={12}>
                  <Control.textarea
                    model=".comment"
                    id="comment"
                    name="comment"
                    rows="6"
                    className="form-control"
                    validators={{
                      required,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: "Required",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

function RenderDish({ dish }) {
  if (dish != null) {
    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg width={"100%"} body src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  } else {
    return <div></div>;
  }
}

function RenderComments({comments, addComment, dishId}) {
  const comment = comments.map((comment) => {
    return (
      <ul key={comment.id}>
        <li>
          <div>{comment.comment}</div>
          <div>
            {comment.author}, &nbsp;{" "}
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            }).format(new Date(comment.date))}
          </div>
        </li>
      </ul>
    );
  });
  if (comments != null) {
    return (
      <div className="col-12 col-md-5 m-1">
        <h3>Comments</h3>
        <div>{comment}</div>
        <CommentForm comments={comment} dishId={dishId} addComment={addComment} />
      </div>
    );
  } else {
    return <div></div>;
  }
}

const DishDeatil = (props) => {
  const dish = props.dish;
  if (props.isLoading) {
    return(
        <div className="container">
            <div className="row">            
                <Loading />
            </div>
        </div>
    );
}
else if (props.errMess) {
    return(
        <div className="container">
            <div className="row">            
                <h4>{props.errMess}</h4>
            </div>
        </div>
    );
}
else if (props.dish != null) 

  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <RenderDish dish={props.dish} />
        <RenderComments comments={props.comments}
        addComment={props.addComment}
        dishId={props.dish.id}
      />
      </div>
    </div>
  );
};

export default DishDeatil;
