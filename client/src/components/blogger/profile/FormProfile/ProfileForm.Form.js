import * as Yup from "yup";

export function initialValues(profile){
    return({
        fileAvatar: null,
        avatar: profile?.avatar || "",
        username: profile?.username || "",
        email: profile?.email || "",
    });
};


export function validationSchema(){
    return Yup.object({
        username: Yup.string().required(true),
        email: Yup.string().email(true).required(true),
        avatar: Yup.string().required(true),
    });
};