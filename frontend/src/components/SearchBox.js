import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  }

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='ml-sm-0 p-3 w-75'
      ></Form.Control>
      <Button id="btn-search" type='submit' size="md" variant='outline-success' 
      className='rounded-circle border-0 bg-transparent'>
      <i class="fas fa-search"></i>
      </Button>
    </Form>
  )
}

export default SearchBox;
