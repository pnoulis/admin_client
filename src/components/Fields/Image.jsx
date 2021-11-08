import {useEffect, useState, createRef} from "react";
import {FORM_STORE} from "lib/stores";
import {Resizable} from "re-resizable";
import style from "./styles/imgfield.module.scss";

const
{useFormContext} = FORM_STORE,
mime = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "image/tiff",
  "image/bmp",
],
mimeAccept = mime.reduce((acc, cur) => acc.concat(",", cur));

export function ImageField() {
  const {fields, edit, setForm} = useFormContext(),
        img = fields.img;

  if (fields.img instanceof File) return (
    <UploadedImage fields={fields} edit={edit} setForm={setForm} img={img}/>
  ); else if (!Object.keys(img).length) return (
    <UploadImage fields={fields} edit={edit} setForm={setForm} img={img}/>
  ); else return (
    <ViewImage edit={edit} setForm={setForm} img={img}/>
  );
}

function UploadedImage({fields, edit, setForm, img}) {

  function handleCancel(e) {
    e.preventDefault();
    setForm("setInput", "img", {});
  }
  return (
    <div className={style.imageUploaded}>
      <p>{fields.img.name}</p>
      <p onClick={handleCancel}>cancel</p>
    </div>
  );
}
function UploadImage({edit, setForm}) {
  const id = (Math.random() + 1).toString(36).substring(7);

  function handleUpload(e) {
    e.preventDefault();
    if (!edit) return;
    setForm("setInput", "img", e.target.files.item(0));
  }

  return (
    <div className={style.uploadImage}>
      <label className={style.inputWrapper} htmlFor={id}>
        <span>upload</span>
        <input type="file"
               id={id}
               name="img"
               accept={mimeAccept}
               onChange={handleUpload}
        />
      </label>
    </div>
  );
}

function ViewImage({fields, edit, setForm, img}) {
  const imgStyle = {
    display: "inline-block",
    objectFit: "cover",
    width: "100%",
    height: "100%",
  };

  function handleChange(e) {
    e.preventDefault();
    if (!edit) return;
    setForm("setInput", "img", {});
  }

  return (
    <div className={style.viewImage}>
      <p onClick={handleChange}>change</p>
      <Resizable
        style={{margin: "auto"}}
        minHeight={80}
        width={"100%"}
        height={"100%"}
        minWidth={90}
        maxWidth={300}
        maxHeight={300}
        defaultSize={{width: 90, height: 80}}>
        <img style={imgStyle} src={img}/>
      </Resizable>
    </div>
  );
}

