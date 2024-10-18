import { Button } from '@material-tailwind/react';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';


const UsersEditForm = ({ _id }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');



    const { mutate } = useMutation(
        {
            mutationFn: () => {
                fetch(`http://localhost:5050/users/update/:${_id}` , {
                    method: "PUT",
                    body: JSON.stringify({
                        username,
                        role,
                        password
                    }),
                    headers: { "Content-Type": "application/json" }

                }).then(res => {
                    if (res.ok) {
                        toast.success("Updated success!")
                    }
                })
            }
        }
    )


    const handleChange = (e) => {
        setRole(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        mutate()
    };

    return (
        <form onSubmit={handleSubmit} className="w-full h-[40vh]  book-form flex gap-2 flex-col items-start justify-center transition-all">
            <div className='w-1/3 flex flex-col'>
                <label>username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className='h-8 bg-zinc-100'
                />
            </div>
            <div className='w-1/3 flex flex-col'>
                <label>Password</label>
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className='h-8 bg-zinc-100'
                />
            </div>


            <div className='w-1/3 flex flex-col'>
                <label>Password</label>
                <select
                    onChange={handleChange}
                    name="student_data" id="studentData"
                    value={role}
                    className=' h-10 bg-zinc-800 text-white'
                >
                    <option value="admin">Admin</option>
                    <option value="office">Office</option>
                    <option value="library">Library</option>
                </select>
            </div>

            <Button type="submit" className=' h-max bg-black rounded'>Submit</Button>
        </form>
    );
};

export default UsersEditForm;
