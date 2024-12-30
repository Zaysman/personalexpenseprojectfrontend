
class JSONRequests {

    //The purpose of this method is to send a get request to the backend, handles response and returns the payload on an ok response
    async sendGetRequest(destinationURL) {
        console.log("sending GET request to: ", destinationURL);

        try {
            const response = await fetch(destinationURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            //If we don't receive an OK response (200-299), print the error message and throw the error
            if(!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            //If we get an OK response, return the response data in JSON format
            const data = await response.json();
            return data;

        } catch (error) {
            console.error("There was an issue with the fetch operation ");
        }
    }

    //Sends a Post request, handles response and returns data after an ok response.
    async sendPostRequest(destinationURL, payload) {
        console.log("sending Post request to:", destinationURL);

        try {
            const response = await fetch(destinationURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            //If response is not ok, then throw error
            if(!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            //If the response is ok,then we return the data from the backend
            const data = response.json();
            return data;

        } catch(error) {
            console.error("There was an issue with sending the Post request:", error);
            throw error; //Re-throw the error so it can be handled by the caller method
        }
    }


    //Sends a Put request, handles response and returns data after the update on an ok response
    async sendPutRequest(destinationURL, payload) {
        console.log("Sending Put request to:", destinationURL);

        try {
            const response = await fetch(destinationURL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            //If we get a non-ok response, we throw an error to be handled by caller method.
            if(!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }

            //If the response is ok, then we return the data from the backend
            const data =  response.json();
            return data; 

        } catch(error) {
            console.error("There was an issue with sending the Put request:", error);
            throw error;
        }
    }

    //Sends a DELETE request, handles response, and confirms success on an OK response
    async sendDeleteRequest(destinationURL) {
    console.log("Sending DELETE request to:", destinationURL);

    try {
        const response = await fetch(destinationURL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // If response is not ok, then throw error
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        console.log("DELETE request successful");
        return true; // Indicate successful deletion

    } catch (error) {
        console.error("There was an issue with sending the DELETE request:", error);
        throw error; // Re-throw the error for the caller to handle
    }
}

}

export default JSONRequests;