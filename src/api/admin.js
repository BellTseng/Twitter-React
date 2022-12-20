import axios from "axios";

const baseUrl = 'https://rocky-citadel-44413.herokuapp.com'

const authToken = ''


export const adminLogin = async () => {
  try {
    const res = await axios.get(`${baseUrl}/todos`,{
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });

    return res.data.data
  }
  catch (error) {
    console.error('[Get Tweets failed]: ', error);
  }
};