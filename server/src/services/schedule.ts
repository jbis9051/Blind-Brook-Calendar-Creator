import Class from './interfaces/class-interface';
import validateClasses from '../validate/validate';

export default class Schedule {
    importedClasses: Class[];
    constructor(importedClasses: Class[]) {
        this.importedClasses = importedClasses;
    }
    validate(): boolean {
        return validateClasses(this.importedClasses);
    }
}