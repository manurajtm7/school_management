import { Button } from '@material-tailwind/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';


const StudentForm = ({ refetch }) => {
    const [name, setName] = useState('');
    const [rollNo, setRollNo] = useState('');
    const [classOf, setClassOf] = useState('');

    const { data, isLoading, error } = useQuery({
        queryKey: ["students"],
        queryFn: async () => {
            return (await fetch("http://localhost:5050/student/view")).json()
        }

    })


    const { mutate } = useMutation(
        {
            mutationFn: () => {
                fetch("http://localhost:5050/student/create", {
                    method: "POST",
                    body: JSON.stringify({
                        name,
                        roll_no: rollNo,
                        class_of: classOf
                    }),
                    headers: { "Content-Type": "application/json" }

                }).then(res => {
                    if (res.ok) {
                        refetch()
                    }
                })
            }
        }
    )

    const handleSubmit = async (e) => {
        e.preventDefault();
        mutate()
    };

    return (
        <form onSubmit={handleSubmit} className="w-full h-[40vh]  book-form flex gap-2 flex-col items-start justify-center transition-all">
            <div className='w-1/3 flex flex-col'>
                <label>Student name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className='h-8 bg-zinc-100'
                />
            </div>

            <div className='w-1/3 flex flex-col'>
                <label>Student roll number</label>
                <input
                    type="text"
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    requirsetClass
                    className='h-8 bg-zinc-100'
                />
            </div>

            <div className='w-1/3 flex flex-col'>
                <label>Student class</label>
                <input
                    type="text"
                    value={classOf}
                    onChange={(e) => setClassOf(e.target.value)}
                    requirsetClass
                    className='h-8 bg-zinc-100'
                />
            </div>

            <Button type="submit" className=' h-max bg-black rounded'>Submit</Button>
        </form>
    );
};

export default StudentForm;
