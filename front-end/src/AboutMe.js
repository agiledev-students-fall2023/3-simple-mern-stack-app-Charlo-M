import React, { useEffect, useState } from 'react';

const  AboutMe = () =>{
 const [aboutData, setAboutData] = useState({});

  useEffect(() => {
    fetch('http://localhost:8000/about')
      .then(response => {
        // console.log(response.json())
        return response.json()})
      .then(data => setAboutData({...data})
      );
  }, []);

  // if (!aboutData) {
  //   return null;
  // }

  return (
    <div>
      <h2>About Me</h2>
      <p>{aboutData.content}</p>
      <img src={aboutData.imageUrl} alt="My Photo" />
    </div>
  );
};

export default AboutMe;
