import React,{useCallback} from 'react'
import {Form, Image} from "semantic-ui-react"
import {useDropzone} from "react-dropzone"
import {Editor} from "@tinymce/tinymce-react"
import {useFormik} from "formik"
import { ENV } from '../../../../utils/constants'
import {Post} from "../../../../api"
import {initialValues, validationSchema} from "./FormPost.Form"
import {image} from "../../../../assets"
import "./FormPost.scss"
import {useAuth} from "../../../../hooks"

const postController = new Post();

export function FormPost(props) {
    const {accessToken} = useAuth();
    const {onClose, onReload, post} = props

    const formik = useFormik({
        initialValues: initialValues(post),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async(formValue) => {
            try {
                if(post){
                    await postController.updatePost(accessToken, formValue, post._id);
                }else{
                    await postController.createPost(formValue, accessToken);
                }
                
                onReload();
                onClose();
            } catch (error) {
                console.error(error);
            }
        }
    })

    /**IMAGES */
    //guardar path local y archivo
    const onDrop = useCallback((acceptedFile) => {
        const file = acceptedFile[0];
        formik.setFieldValue("miniature", URL.createObjectURL(file));
        formik.setFieldValue("file", file);
    })

    const {getInputProps, getRootProps} = useDropzone({
        accept: {'image/*': ['.jpeg', '.jpg', '.png']},
        onDrop,
    });

    //mostrar imagenes depende si existe o no una previa
    const getMiniature = () =>{
        if(formik.values.file){
            return formik.values.miniature;
        }else if(formik.values.miniature){
            return `${ENV.BASE_PATH}/${formik.values.miniature}`;
        }
        return image.noImage;
    }

  return (
    <Form className="post-form" onSubmit={formik.handleSubmit}>

        <div className='post-form__miniature' {...getRootProps()}>
            <input {...getInputProps()}/>
            {getMiniature() 
            ? (<Image size="small" src={getMiniature()}/>) 
            : (
            <div>
                <span>Arrastra tu imagen</span>
            </div>
            )}
            
        </div>
        <Form.Input 
            name="title"
            placeholder="Titulo"
            onChange={formik.handleChange}
            value={formik.values.title}
            error={formik.errors.title}
            />

        <Editor
        init={{
            height: 400,
            menubar: true,
            plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
            ],
            toolbar: 
            "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
        }}
        initialValue={formik.values.content}
        onBlur={(e) => formik.setFieldValue("content", (e.target.getContent()))}
        />

        <Form.Button basic color='black' type='submit' fluid loading={formik.isSubmitting}>
            Crear
        </Form.Button>
        
    </Form>
  )
}
