import React, { useState } from "react";
import axios from 'axios';
import "./recipe_gen.css"


const Recipegen = () => {
  const [inputValue, setInputValue] = useState("Ingredients list:\n1. \n2. \n3. \n4. ");
  const [reply,setReply] = useState('');

  const sendMessage = async () => {
    setReply('');
    if (inputValue.trim() ==='') return;
    
    const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
    const apiKey = process.env.REACT_APP_API_KEY;

    try{
      let finalPrompt = "Give me a reciepe that only uses the following ingeridents with ingredients measurement as list and step by step cooking process.\n" + inputValue;
      const response = await axios.post(
        apiUrl,
        {
          prompt: finalPrompt,
          max_tokens:500
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`
          }
        }
      );

      const botReply = response.data.choices[0].text.trim();
      setReply(botReply);
    }catch (error){
      console.error('Error',error.response.data);
    }
  }

  
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();  
  }

  const displayResultWithLineBreaks = (result) => {
    return result.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };


  return (
    <div className="input-container">
      <form className="input-form" onSubmit={handleSubmit}>
        <textarea
          className="input-box"
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter text here..."
        ></textarea>
        <button type="submit">Generate Recipe</button>
      </form>

      <div className="recipe-result">
        {displayResultWithLineBreaks(reply)}
      </div>
      
    </div>
  );
};

export default Recipegen;


