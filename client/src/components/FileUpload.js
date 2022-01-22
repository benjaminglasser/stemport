import { useState, useCallback, useMemo } from 'react';
import axios from 'axios'
import { useDropzone } from 'react-dropzone'

const FileUpload = (props) => {

    const [uploadFiles, setUploadFiles] = useState([]);

    const onDrop = useCallback(acceptedFiles => {
        // setUploadFiles((curr) =>
        //     [...curr, acceptedFiles]
        // )
        setUploadFiles(acceptedFiles)
    }, [])

    const {
        getRootProps,
        getInputProps,
        acceptedFiles,
        fileRejections,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({ onDrop, accept: '.mp3, .wav' })

    const baseStyle = {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        borderWidth: 2,
        borderRadius: 20,
        borderColor: "#26C2E7",
        borderStyle: "dashed",
        backgroundColor: "#fafafa",
        color: "#c4c4c4",
        outline: "none",
        transition: "border .24s ease-in-out",
        "&:hover": {
            background: "#26C2E7",
            cursor: "pointer"
        }
    };



    const activeStyle = {
        borderColor: "#f2f"
    };

    const acceptStyle = {
        borderColor: "#f8f"
    };

    const rejectStyle = {
        borderColor: "#f2f"
    };

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {})

        }),
        [isDragActive, isDragReject, isDragAccept, acceptStyle, activeStyle]
    );


    const acceptedFileItems = acceptedFiles.map(file => (
        <li className="list-group-item" key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <li className="list-group-item" key={file.path}>
            {file.path} - {file.size} bytes
            <ul className="list-group list-group-flush">
                {errors.map(e => (
                    <li className="list-group-item" key={e.code}>({e.message})</li>
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
            // const res = 
            await axios.post('/upload', formData, {
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
                <div>
                    <div {...getRootProps({ className: 'dropzone', style })}>
                        <input {...getInputProps()} />
                        <p>Drag and drop your stems, or click to select files</p>
                        <p>(only accepts .mp3 or .mov)</p>
                    </div>
                    <div className="d-flex mw-100 justify-content-center">
                        <input type="submit" value="Upload" className="btn btn-primary btn-lg mt-4" />
                    </div>
                </div>
                <aside className="card text-center m-4">
                    {
                        acceptedFileItems.length > 0 ? (
                            <div>
                                <h4 className="text-success mt-4">Accepted files</h4>
                                <ul className="list-group list-group-flush">{acceptedFileItems}</ul>
                            </div>) : null
                    }
                    {
                        fileRejectionItems.length > 0 ? (
                            <div>
                                <h4 className="text-danger mt-4">Rejected files</h4>
                                <ul className="list-group list-group-flush">{fileRejectionItems}</ul>
                            </div>) : null
                    }
                </aside>
            </section>
        </form>

    </div>;
};


export default FileUpload;
