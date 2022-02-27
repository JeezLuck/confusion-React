import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,ModalBody,ModalHeader,Button,Label,Row,Modal
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';



function RenderDish({ dish }) {

    if (dish != null)
        return (
            <Card key={dish.id}>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    else
        return (
            <div></div>
        );

}



function RenderComment({ comments }) {


    const commentsAray = comments.map((comment) => {
        if (comment != null)
            return (
                <ul key={comment.id} className="list-unstyled mb-3">
                    <li className="mb-3">{comment.comment}</li>
                    <li className="list-inline-item">{comment.author}</li>
                    <li className="list-inline-item mb-3">--  {new Date(comment.date).toLocaleDateString("es-ES", { year: "numeric", month: "short", day: "numeric" })}</li>
                </ul>
            );
        else
            return (
                <div></div>
            );


    });

    return (

        <div>
            <h4>Comments</h4>
            {commentsAray}
        </div>

    );

}




class DishDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);

    }


    toggleModal() {

        this.setState((state) => {
    return {isModalOpen: !state.isModalOpen}
  });
    }




    render() {

        if (this.props.dish == null)
        return (
            <div></div>
        );


        const RenderModal = () =>{
            return (
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                       <CommentFormComponent></CommentFormComponent>
                    </ModalBody>
                </Modal>
            );
        
        }

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{this.props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={this.props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComment comments={this.props.comments} />
                    <Button outline onClick={this.toggleModal}><span className="fa fa-edit fa-lg"></span> Submit Comment</Button>
                </div>
                <RenderModal></RenderModal>
            </div>
        </div>
    );

    }



}

class CommentFormComponent extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

    }


    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        // event.preventDefault();
    }

    render() {


        const maxLength = (len) => (val) => !(val) || (val.length <= len);
        const minLength = (len) => (val) => val && (val.length >= len);


        return (
            <div className="col-12">
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                        <Label htmlFor="rating">Rating</Label>
                        <Control.select model=".rating" id="rating" name="rating"
                            placeholder="Rating"
                            className="form-control">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </Control.select>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="yourName">Your Name</Label>
                        <Control.text model=".yourName" id="yourName" name="yourName"
                            placeholder="Your Name"
                            className="form-control"
                            validators={{
                                minLength: minLength(3), maxLength: maxLength(15)
                            }}
                        />
                        <Errors
                            className="text-danger"
                            model=".yourName"
                            show="touched"
                            messages={{
                                minLength: 'Must be greater than 2 characters',
                                maxLength: 'Must be 15 characters or less'
                            }}
                        />
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="comment">Comment</Label>
                        <Control.textarea model=".comment" id="comment" name="comment"
                            rows="8"
                            className="form-control" />
                    </Row>
                    <Row className="form-group">
                        <Button type="submit" color="primary">
                            Submit
                        </Button>
                    </Row>
                </LocalForm>
            </div>
        );

    }

}


export default DishDetail;