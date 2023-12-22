export interface LoginForm {
    identifier          : string; //can be email, phone or username
    password            : string;
    role?               : string;
    additionalFactor?   : string; // can be used as optional field if required
}
