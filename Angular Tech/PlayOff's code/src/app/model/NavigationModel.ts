export class NavigationModel {
    closeURL: string;
    skipURL: string;
    heading: string;
    backURL: string;
    poppupBackUrl:string;
    contactTick:string;
    poppupcloseURL:string;

    
    function: Function;

    constructor(){
        this.heading = '';
        this.backURL = '';
        this.closeURL = '';
        this.skipURL = '';
        this.function = null;
    }
}