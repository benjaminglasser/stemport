import { useState, useCallback } from 'react';
import axios from 'axios'
import { useDropzone } from 'react-dropzone'

const FileUpload = (props) => {

    const [uploadFiles, setUploadFiles] = useState([]);
    // const [filename, setFilename] = useState('')
    // const [uploadedFile, setUploadedFile] = useState({});

    // const [progress, setProgress] = useState(0);
    // const [isUploading, setUploading] = useState(false);

    // const { fileRejections,
    //     isDragActive,
    //     acceptedFiles,
    //     isDragAccept,
    //     isDragReject,
    //     getRootProps,
    //     getInputProps } = useDropzone({
    //         onDrop: (acceptedFiles) => {
    //             setUploadFiles((...prevFiles) =>
    //                 acceptedFiles.reduce(
    //                     (acc, file) => ({
    //                         ...acc,
    //                         [file.name]: {
    //                             file
    //                         }
    //                     }),
    //                     ...prevFiles
    //                 )
    //             );
    //         },
    //         accept: ".jpg,.jpeg,.mp3,.wav"
    //     });
    const onDrop = useCallback(acceptedFiles => {
        setUploadFiles(acceptedFiles)
    }, [])

    const { getRootProps, getInputProps, acceptedFiles,
        fileRejections, } = useDropzone({ onDrop, accept: '.mp3, .wav' })


    // const files = uploadFiles.map(file => (
    //     <li key={file.path}>
    //         {file.path} - {file.size} bytes
    //     </li>
    // ));

    const acceptedFileItems = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
            <ul>
                {errors.map(e => (
                    <li key={e.code}>{e.message}</li>
                ))}
            </ul>
        </li>
    ));

    const onSubmit = async e => {
        e.preventDefault();

        const formData = new FormData();

        for (let i = 0; i < uploadFiles.length; i++) {
            formData.append(`files`, uploadFiles[i]);
        }

        try {
            const res = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // const { fileName, filePath } = res.data;

            // setUploadedFile({ fileName, filePath })

        } catch (err) {
            if (err.response.status === 500) {
                console.log('There was a problem with the server')
            } else {
                console.log(err.response.data.msg)
            }
        }
    }

    return <div>
        <form onSubmit={onSubmit}>

            <section className="container">
                <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                    <p>(only accepts .mp3 or .mov)</p>
                </div>
                <aside>
                    <h4>Accepted files</h4>
                    <ul>{acceptedFileItems}</ul>
                    <h4>Rejected files</h4>
                    <ul>{fileRejectionItems}</ul>
                </aside>
            </section>

            <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4" />
        </form>

    </div>;
};


export default FileUpload;
