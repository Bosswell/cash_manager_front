import React from "react";
import InputGroup from "../components/InputGroup";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Button from "react-bootstrap/Button";

function RecipeForm({ name, content, onContentChange, onInputChange, onSubmit, buttonText }) {
    return (
        <form className={'form'}>
            <InputGroup onChange={onInputChange} name={'name'} label={'Recipe name'} type={'text'} value={name} required={true}/>
            <div className={'cke-name'}>Content</div>
            <CKEditor
                editor={ ClassicEditor }
                data={ content }
                onChange={ onContentChange }
                required={true}
            />
            <Button type={'submit'} variant={'success'} onClick={onSubmit}>{ buttonText }</Button>
        </form>
    )
}

export default RecipeForm;