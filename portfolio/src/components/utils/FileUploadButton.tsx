import {ChangeEvent, useRef, useState} from "react";

export enum FileUploadButtonFileTypes{
    imageType='image/*, .jpg, .jpeg, .png, .gif, .bmp, .svg, .tiff, .psd, .raw, .heif, .ai, .eps, .svg, .webp',
    videoType="video/*, .mp4, .webm, .ogg, .ogv, .m4v, .avi, .wmv, .mov, .qt, .flv, .swf",
    audioType="audio/*, .mp3, .wav, .wma, .m4a, .aac, .ogg, .flac",
    pdfType="application/pdf, .pdf ",
    docType=".doc, .docx, .odt, .rtf, .tex, .wks, .wps, .wpd",



}
interface FileUploadButtonProps{
    name:string
    getFiles:(files:FileList)=>void
    accept:FileUploadButtonFileTypes.imageType | FileUploadButtonFileTypes.videoType
        | FileUploadButtonFileTypes.audioType | FileUploadButtonFileTypes.pdfType
        | FileUploadButtonFileTypes.docType
    multiple:boolean
}
const FileUploadButton=({getFiles,accept,multiple,name}:FileUploadButtonProps)=>{
    const [files,setFiles]=useState<FileList>()
    const inputRef = useRef<HTMLInputElement | null>(null);
    const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
        getFiles(e?.target?.files as FileList)
        setFiles(e?.target?.files as FileList)
    }


    function handleUploadClick() {
        if (inputRef && inputRef.current) {
            inputRef.current.click();
        }
    }

    return(
         <>
            <input
                type="file"
                name={name}
                accept={accept}
                multiple={multiple}
                onChange={(e)=>handleChange(e)}
                style={{display:'none'}}
                ref={inputRef}
            />
            {/*<label htmlFor="file" className={'bg-blue-500 text-white p-2 rounded-md cursor-pointer'}>Upload</label>*/}
             <button onClick={handleUploadClick} className={'bg-blue-500 text-white p-2 rounded-md cursor-pointer'}>{files ? `${files[0].name}` : 'Click to select'}
             </button>
        </>)
}

export default FileUploadButton
