export class UserPayload {
    username:string = "";
    saluation:string = "";
    firstName:string = "";
    lastName:string = "";
    designation:string = "";
    email:string = "";
    phoneNumber:string = "";
    addressLine1:string = "";
    addressLine2:string = "";
    city:string = "";
    postcode:string = "";
    roleId:any = 1;
    regionId:any;
    divisionId:any;
    districtId:any;
    tehsilId:any;
    markazId:any;

}

export class UserValidation {
    username:any = {
        required:false,
    };
    saluation:any = {
        required:false
    };
    firstName:any = {
        required:true,
        fieldName:"firstName",
        fieldText:"first_name",
        errorMessages:[
            "first_name_req"
        ]
    };
    lastName:any = {
        required:true,
        fieldName:"lastName",
        fieldText:"last_name",
        errorMessages:[
            "last_name_req"
        ]
    };
    designation:any = {
        required:true,
        fieldName:"designation",
        fieldText:"designation",
        errorMessages:[
            "designation_req"
        ]
    };
    email:any = {
        required:true,
        fieldName:"email",
        fieldText:"email",
        errorMessages:[
            "email_req"
        ]
    };
    phoneNumber:any = {
        required:true,
        fieldName:"phoneNumber",
        fieldText:"phone_no",
        errorMessages:[
            "phone_req"
        ]
    };
    addressLine1:any = {
        required:true,
        fieldName:"addressLine1",
        fieldText:"address_l1",
        errorMessages:[
            "address_l1_req"
        ]
    };
    addressLine2:any = {
        required:false,
        fieldName:"addressLine2",
        fieldText:"address_l2",
        errorMessages:[
            "address_l2_req"
        ]
    };
    city:any = {
        required:true,
        fieldName:"city",
        fieldText:"city",
        errorMessages:[
            "city_req"
        ]
    };
    postcode:any = {
        required:true,
        fieldName:"postcode",
        fieldText:"postal",
        errorMessages:[
            "postal_req"
        ]
    };
    station:any = {
        required:true,
        fieldName:"station",
        fieldText:"station",
        errorMessages:[
            "station_req"
        ]
    };
    department:any = {
        required:true,
        fieldName:"department",
        fieldText:"department",
        errorMessages:[
            "department_req"
        ]
    };
    roleId:any = {
        required:true,
        fieldName:"roleId",
        fieldText:"role_id",
        errorMessages:[
            "role_id_req"
        ]
    };
    regionId:any = {
        required:true,
        fieldName:"regionId",
        fieldText:"region",
        errorMessages:[
            "regionError"
        ]
    };
    divisionId:any = {
        required:true,
        fieldName:"divisionId",
        fieldText:"division",
        errorMessages:[
            "divisionError"
        ]
    };
    districtId:any = {
        required:true,
        fieldName:"districtId",
        fieldText:"district",
        errorMessages:[
            "districtError"
        ]
    };
    tehsilId:any = {
        required:true,
        fieldName:"tehsilId",
        fieldText:"tehsil",
        errorMessages:[
            "tehsilError"
        ]
    };
    markazId:any = {
        required:true,
        fieldName:"markazId",
        fieldText:"markaz",
        errorMessages:[
            "markazError"
        ]
    };
}