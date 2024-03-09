import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import TinderCard from "react-tinder-card";
import "./displayFilteredUser.css"
//import "./swipeButton.css";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

function DisplayFilteredUsers() {

const { state } = useLocation();
const { email } = state || {};
const navigate = useNavigate();

 // console.log(email);

  // array of users 
  // will be getting from the database later and store it here
  const [peoples, setPeople] = useState([
    {
      name: 'hi',
      major: 'CS',
      age: '21',
      url: `https://media.gettyimages.com/photos/amazon-ceo-jeff-bezos-founder-of-space-venture-blue-origin-and-owner-picture-id1036094130?k=6&m=1036094130&s=612x612&w=0&h=3tKtZs6_SIXFZ2sdRUB4LjAf_GlfCMekP2Morwkt5EM=`
    }, 
    {
      name: 'hello',
      major: 'DS',
      age: '20',
      url:`https://media.gettyimages.com/photos/of-tesla-and-space-x-elon-musk-attends-the-2015-vanity-fair-oscar-picture-id464172224?k=6&m=464172224&s=612x612&w=0&h=M9Wf9-mcTJBLRWKFhAX_QGVAPXogzxyvZeCiIV5O3pw=`
    }

  ]);

  const swiped= (direction, nameToDelete) => {

  }

  const outOfFrame=(name)=> {

  }
  
  const handleSubmit = (buttonType) => {
    if (buttonType === 'close') {
      
    } else if (buttonType === 'like') {
      
    } else if(buttonType === 'arrow') {
      
    }
  };

  return (

  <div className="tinderCard_container">
      {peoples.map((person, index) => (
       <TinderCard
          key={index}
          className="swipe"
         preventSwipe={[`up`, `down`]}
          onSwipe={(dir) => swiped(dir, person.name,index)}
          onCardLeftScreen={() => outOfFrame(person.name,index)}
        > 
        <div className="card" style={{
          backgroundImage:"url("+person.url+")"
        }}>
          <h3>{person.name}  {person.age} </h3>
          <div className="arrowButton">
          <IconButton onClick={() => handleSubmit('arrow')}>
          <ArrowCircleUpIcon sx={{ color: 'grey' }}  fontSize="large" className="arrow_button"/>
  
         </IconButton>
         </div>
        </div>
         </TinderCard>
      ))}

    <div className="swipeButton">
    <IconButton onClick={() => handleSubmit('close')}>
      <CloseIcon sx={{ color: 'black' }} fontSize="large" className="close_button"/>
    </IconButton>
    <IconButton onClick={() => handleSubmit('like')}>
      <FavoriteIcon sx={{ color: 'red' }}  fontSize="large" className="favorite_button"/>
    </IconButton>
  </div>
</div>
  
  );
}

export default DisplayFilteredUsers;
