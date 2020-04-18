export const sharedConstants = {
    // pattern
    EMAIL_PATTERN: new RegExp(/^([a-z0-9._%+-]+[@][a-zA-Zé1-9]+[.][a-z]{2,3})+$/),
    PHONE_PATTERN: new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/),
    PASSWORD_PATTERN: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?*()@_#-$|%^\\/+=]).{8,20}$/),
         
}