import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css";
import DragAndDrop from '../../util-components/drag-and-drop/DragAndDrop';
import DragAndDropFile from '../../util-components/drag-and-drop/DragAndDrop';
import { Controller, useForm } from 'react-hook-form';
import { Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { PostStudentSupportTicket } from '../../../services/StudentServices';
import { toast } from 'react-toastify';

const AddSupportTicket = ({refreshList, close}) => {
    const [isLoading, setLoading] = useState(false)
    const {
        control,
        reset,
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch
    } = useForm();
    const [attachment, setAttachment] = useState();

    const handleFileSubmit = (data) => {
        setLoading(true);
        const formData = new FormData();
        for (const key in data) {
              formData.append(key, data[key]);
          }
          if(attachment && attachment[0]){
            formData.append('supportAttachment', attachment[0])
          }
          PostStudentSupportTicket(data).then((res)=>{
            toast.success(res?.message)
            refreshList();
          }).catch((err)=>{
            toast.error(err?.response?.data?.message)
          }).finally(()=>{
            setLoading(false)
          })
        // PostStudentSupportTicket()
    }
    const handleUploadAttachment = (e) => {
        if (e.target.files && e.target.files[0]) {
            if (e.target.files[0]?.type !== 'image/jpeg' &&
                e.target.files[0]?.type !== 'image/jpg' &&
                e.target.files[0]?.type !== 'image/png' &&
                e.target.files[0]?.type !== 'image/gif' &&
                e.target.files[0]?.type !== 'application/pdf'
            ) {
                Swal.fire({
                    title: "Choose only preferred file types !!",
                    icon: "warning",
                    confirmButtonText: 'Ok'
                })
            } else {
                setAttachment(e.target.files);
            }

        }
    }
    const onDeleteAttachment = () => {
        setAttachment('');
    }
    return (
        <div className="modal-content">
            <div className="page-wrapper-new p-0">
                <div className="content">
                    <div className="modal-header border-0 custom-modal-header">
                        <div className="page-title">
                            <h4>Add New Ticket</h4>
                        </div>
                        <button type="button" className="close" onClick={close} data-bs-dismiss="modal" aria-label="Close">
                            <i className="feather-x" ></i>
                        </button>
                    </div>
                    <div className="modal-body custom-modal-body">
                        <form onSubmit={handleSubmit(handleFileSubmit)}>
                            <div className="tickets-add-list">
                                <div className="settings-inner-blk add-course-info p-0">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="input-block">
                                                <label className="form-label">Ticket Title <code>*</code></label>
                                                <input
                                                placeholder='Enter ticket title'
                                                    {...register('ticketSubject', {
                                                        required: 'Ticket title is required.'
                                                    })}
                                                    type="text" className="form-control" />
                                                {errors.ticketSubject && <div className='error-italic'> {errors.ticketSubject.message} </div>}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="input-block">
                                                <label className="form-label">Category<code>*</code></label>
                                                <select className="form-select select country-select" name="sellist1"
                                                    {...register("category", {
                                                        required: "Category is required",
                                                    })}

                                                >
                                                    <option value="">Select a category</option>
                                                    <option value="General">General</option>
                                                    <option value="Technical">Technical</option>
                                                    <option value="Help">Help</option>
                                                </select>
                                                {errors.category && (
                                                    <div className='error-italic'>
                                                        {errors.category.message}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="input-block">
                                                <label className="form-label">Priority<code>*</code></label>
                                                <select className="form-select select country-select" name="sellist1"
                                                    {...register("ticketPriority", {
                                                        required: "Priority is required",
                                                    })}

                                                >
                                                    <option value="">Select a priority</option>
                                                    <option value="HIGH">High</option>
                                                    <option value="MEDIUM">Medium</option>
                                                    <option value="LOW">Low</option>
                                                </select>
                                                {errors.ticketPriority && (
                                                    <div className='error-italic'>
                                                        {errors.ticketPriority.message}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="input-block">
                                                <label className="form-label">Description<code>*</code></label>
                                                {/* <div id="editor"></div> */}
                                                <Col md="12" className='mb-5'>
                                                    <textarea
                                                        placeholder="Describe issue here..."
                                                         className="form-control"
                                                        {...register('message', {
                                                            required: "Ticket explanation is required",
                                                            pattern: {
                                                                value: /^(?=.*[a-zA-Z]{1,}).*$/,
                                                                message: "Ticket explanation is required",
                                                            },
                                                        })}
                                                    >
                                                    </textarea>
                                                </Col>
                                                {errors.message && (
                                                    <div className='error-italic'>
                                                        {errors.message.message}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="input-block ">
                                                <label className="form-label">Attachment <code>(max : 2MB)</code></label>
                                                <div className="file-drop">
                                                    <div action="#" className="dropzone clickable-btn" onClick={() => {
                                                        document.getElementById('attachment').click()
                                                    }}>
                                                        <p >Upload Attachments </p>
                                                    </div>
                                                    {/* <DragAndDropFile /> */}
                                                </div>
                                                <input
                                                    id="attachment"
                                                    type="file"
                                                    name="attachment"
                                                    accept="image/jpeg, image/png, image/gif, application/pdf"
                                                    style={{ display: "none" }}
                                                    onChange={(e) => {
                                                        handleUploadAttachment(e);
                                                        // field.onChange(e.target.files[0]);
                                                    }}
                                                />
                                                <div className="accept-drag-file">
                                                    {
                                                        attachment && attachment[0] ?
                                                            <p> {attachment[0]?.name} 
                                                            <i className="fa-regular fa-trash-can text-danger ms-1 clickable-btn" aria-hidden="true" onClick={onDeleteAttachment}></i></p> :
                                                            <p>Accept File Type: jpg, jpeg, png, pdf</p>
                                                    }

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer-btn">
                                <button type="submit" className="btn btn-primary">{isLoading ? 'Submitting...' :'Submit'}</button>
                                <button type="button" className="btn btn-outline-primary" data-bs-dismiss="modal" onClick={close}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>)
}

export default AddSupportTicket