import React from 'react'
import StudentEditForm from '../../components/edit-forms/StudentEditForm'
import { useLocation } from 'react-router-dom'
import UsersEditForm from '../../components/edit-forms/UserEditForm';
import LibraryEditForm from '../../components/edit-forms/LibraryEditForm';

function EditScreen() {

    const location = useLocation();
    const path = location.pathname;
    const role = path.split("/")[3].split(":")[1];
    const _id = path.split("/")[4].split(":")[1];




    return (
        <div className="w-full h-full p-2 pt-5" >
            <h1 className='text-lg font-semibold'>Edit screen</h1>
            {role === "user" && <UsersEditForm _id={_id} />}
            {role === "library" && <LibraryEditForm _id={_id} />}
            {role === "student" && <StudentEditForm _id={_id} />}
        </div>
    )
}

export default EditScreen