import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  renderField(field){

    // desctructuring meta from field.meta and error from field.meta:
    const { meta: { touched, error } } = field;
    const classNameFormGroup = `form-group ${touched && error ? 'has-danger' : ''}`;

    return(
      <div className={classNameFormGroup}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : '' }
        </div>
      </div>
    )
  }

  onSubmit(values){
    this.props.createPost(values, () => {
      // navigates to root directory if action creator call this function:
      this.props.history.push('/');
    });
  }

  render(){
    const { handleSubmit } = this.props;

    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
        <Field
          label="Post Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link className="btn btn-danger" to="/">Back</Link>
      </form>
    )
  }
}

function validate(values){
  const errors = {}

  if(!values.title){
    errors.title = "You must enter a title.";
  }
  if(!values.categories){
    errors.categories = "Enter at least one category.";
  }
  if(!values.content){
    errors.content = "Please enter some content.";
  }

  return errors;
}

export default reduxForm({
  validate: validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);




















