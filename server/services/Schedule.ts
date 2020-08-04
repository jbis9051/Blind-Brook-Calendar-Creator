import Class from './Interface/ClassInterface';
import validateClasses from './Validate/Validate';

export default class Schedule  {
    importedClasses: Class[];
    constructor(importedClasses: Class[]) {
        this.importedClasses = importedClasses;
    }
    validate(): boolean {
        return validateClasses(this.importedClasses);
    }
}