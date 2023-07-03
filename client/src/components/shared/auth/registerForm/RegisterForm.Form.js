import * as Yup from "yup";

export function initialValues(){
    return({
        avatar: "",
        fileAvatar: null,
        username: "",
        email: "",
        password: "",
        repeatPassword: ""
    })
}

export function validationSchema(){
    return Yup.object({
        username: Yup.string().required("Campo obligatorio"),
        email: Yup.string().email("El email no es valido").required("Campo obligatorio"),
        password: Yup.string().required("Campo obligatorio"),
        repeatPassword: Yup.string().required("Campo obligatorio").oneOf([Yup.ref("password")], "Las contraseñas deben ser iguales"),
    })
}
