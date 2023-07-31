import * as Yup from "yup";

export function initialValues(post){
    return({
        title: post?.title || "",
        content: post?.content || "",
        miniature: post?.miniature || "",
        file: null
    })
}

export function validationSchema(){
    return Yup.object({
        title: Yup.string().required("Campo obligatorio"),
        content: Yup.string().required("Campo obligatorio"),
        miniature: Yup.string().required("Campo obligatorio")
    })
}