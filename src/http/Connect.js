import axios from 'axios';


//url
const url ="https://swapi.dev/api/";


export const getMovie = async () => {
    try {
      const response = await axios.get(url + "films");
      return response;
    } catch (error) {
      return error;
    }
  };

  export const getCharacters = async()=>{
      try {
          const response = await axios.get(url + "people");
          return response;
      } catch (error) {
          return reponse.error;
      }
  }