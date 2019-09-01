module.exports.getStudentClasses = (body)=>{
    return new Promise((resolve, reject) => {
        body = JSON.parse(JSON.stringify(body)); // the fact that i have to do this is ridiculous. I want a refund.

        if(!body.hasOwnProperty("names[]") || !body.hasOwnProperty("periods[]") || !body.hasOwnProperty("letters[]") || !body.hasOwnProperty("rooms[]")){
            reject({
                errorTitle: "An Error occurred",
                errorMessage: "Missing data."
            });
            return;
        }
        if(typeof body["names[]"] === "string"){ /* for some stupid reason if only one class is submitted it will submit as a string not an array, this fixes this by putting in an array*/
            body["names[]"] = [body["names[]"]];
            body["periods[]"] = [body["periods[]"]];
            body["letters[]"] = [body["letters[]"]];
            body["rooms[]"] = [body["rooms[]"]];
        }
        if (body["names[]"].length !== body["periods[]"].length || body["letters[]"].length !== body["names[]"].length) {
           reject( {
                errorTitle: "An Error occurred",
                errorMessage: "Unequal input contents. Please try again."
            });
            return;
        }
        if (body["letters[]"].some(e => !e.match(/([A-H],?)*[A-H]$/)) || body["periods[]"].some(e => e === "" || isNaN(e) || parseInt(e) > 9 || parseInt(e) < 1)) { // some simple server side validation
            reject({errorTitle: "An Error occurred", errorMessage: "Invalid input."});
            return;
        }
        const studentClasses = [];
        body["names[]"].forEach((val, index) => {
            studentClasses.push({
                name: val,
                "letter-days": body["letters[]"][index].split(','),
                room: body["rooms[]"][index] || "",
                period: parseInt(body["periods[]"][index])
            });
        });
        resolve(studentClasses);
    });
};
