import * as Ajv from 'ajv';
import Class from '../interfaces/class-interface';
import schema from './schema';

interface errorResponse {
    errorTitle: string,
    errorMessage: string
}

export default (importedClasses: Class[]): boolean  => {
    const ajv = new Ajv();

    const validate: Ajv.ValidateFunction = ajv.compile(schema);
    const properlyFormattedClasses = validate(importedClasses);

    if(!properlyFormattedClasses) {
        const error = (validate.errors as Ajv.ErrorObject[])[0].params;
        const errorResponse: errorResponse = { errorTitle: "An Error occured", errorMessage: '' };

        if ("missingProperty" in error) {
            errorResponse.errorMessage = "Missing data.";
            throw errorResponse
        }
        if ("limit" in error) {
            const invalidPeriod = "comparison" in error;
            if (invalidPeriod) {
                errorResponse.errorMessage = "One of the periods was invalid. Please enter a period ranging from 1- 8.";
                throw errorResponse;
            }
            errorResponse.errorMessage = "Invalid input length. Please try again.";
            throw errorResponse;
        }
        errorResponse.errorMessage = "Invalid input.";
        throw errorResponse;
    } 
    return true;
}