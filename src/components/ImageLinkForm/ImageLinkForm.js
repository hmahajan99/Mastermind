import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {

// NOTE : Always do copy image url ,not copy image so that you can paste in input field.
//        By default if initial state and detect button is clicked my github avatar will be used as imageUrl
  
  return (
    <div>
      <p className='f3'>
        {'This Magic Brain will detect faces in your pictures. Git it a try.'}
      </p>
      <p className='f6'>
        {'Eg: http://www.peopleschurch.org/wp-content/uploads/2018/04/iStock-474550332-min.png'}
      </p>
      <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
          <input className='f4 pa2 w-70 center' placeholder={'Enter image url'} type='text' onChange={onInputChange} />
          <button
            className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
            onClick={onButtonSubmit}
          >Detect</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;