import axios from "axios";

export const film_nuovi = async () => {
    let response;

    //  axios.get chiuso
    try {
        response = await axios.get('http://127.0.0.1:5000/film/nuovi');
        if(response.status === 200)
            return response.data;
        return response.status;
    } catch (e) {
        // catch error
        throw new Error(e.message)
    }

}
