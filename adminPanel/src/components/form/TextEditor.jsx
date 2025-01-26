import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
function TextEditor({name,control,defaultValue="",label="label",hight,rules={},}) {
  return (
      <div className='mb-4 '>
          {label && <label className='form-label'>{label}</label>}
       <Controller
                name={name}
        control={control}
        rules={rules}
                render={({ field: { onChange } }) => (
                    <Editor
                        initialValue={defaultValue}
                        apiKey='e12yl2lzcz7n0hqnvmnzdz5sinlrp1cmlyf2elmugj3o99f6'
                        init={
                            {
                                branding: false,
                                height: hight,
                                plugins: [
                                    "advlist",
                                    "autolink",
                                    "lists",
                                    "link",
                                    "charmap",
                                    "preview",
                                    "anchor",
                                    "searchreplace",
                                    "visualblocks",
                                    "code",
                                    "fullscreen",
                                    "insertdatetime",
                                    "media",
                                    "table",
                                    "code",
                                    "help",
                                    "wordcount",
                                    "anchor",],
                                toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",

                            }}
                        onEditorChange={onChange}
                    ></Editor>
                )
                }
            />
    </div>
  )
}

export default TextEditor
