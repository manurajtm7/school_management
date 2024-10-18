import { Button } from '@material-tailwind/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-toastify';


const LibraryEditForm = ({ _id }) => {
    const [bookTitle, setBookTitle] = useState('');
    const [bookId, setBookId] = useState('');
    const [receipientDet, setReceipientDet] = useState('');
    const [isReturned, setIsReturned] = useState(false);


    const { data, isLoading, error } = useQuery({
        queryKey: ["students"],
        queryFn: async () => {
            return (await fetch(`http://localhost:5050/library/view/:${_id}`)).json()
        }

    })

    console.log('====================================');
    console.log(data);
    console.log('====================================');
 

    const { mutate } = useMutation(
        {
            mutationFn: () => {
                fetch(`http://localhost:5050/library/update/:${_id}`, {
                    method: "PUT",
                    body: JSON.stringify({
                        book_id: bookId,
                        book_title: bookTitle,
                        receipient_det: receipientDet,
                        is_returned : isReturned
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


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(bookId, bookTitle, receipientDet, isReturned);
        mutate()
    };
    const handleChange = (e) => {
        console.log("handler :", e.target.value);

        setReceipientDet(e.target.value)
    }

    return (
        <form onSubmit={handleSubmit} className="w-full h-[40vh]  book-form flex gap-2 flex-col items-start justify-center transition-all">
            <div className='w-1/3 flex flex-col'>
                <label>Book Title</label>
                <input
                    type="text"
                    value={bookTitle}
                    onChange={(e) => setBookTitle(e.target.value)}
                    required
                    className='h-8 bg-zinc-100'
                />
            </div>

            <div className='w-1/3 flex flex-col'>
                <label>Book ID</label>
                <input
                    type="text"
                    value={bookId}
                    onChange={(e) => setBookId(e.target.value)}
                    required
                    className='h-8 bg-zinc-100'
                />
            </div>

            <div className='w-1/3 flex flex-col'>
                <label>Receipient</label>
                <select
                    onChange={handleChange}
                    name="student_data" id="studentData"
                    value={receipientDet}
                    className=' h-10 bg-zinc-800 text-white'
                >
                    {
                        data?.map((student, index) => (
                            <option key={index} value={student?._id}>{student.name}</option>
                        ))
                    }
                </select>
            </div>

            <div className='w-1/3 flex gap-2'>
                <label>Is Returned?</label>
                <input
                    type="checkbox"
                    checked={isReturned}
                    onChange={(e) => setIsReturned(e.target.checked)}
                />
            </div>

            <Button type="submit" className=' h-max bg-black rounded'>Submit</Button>
        </form>
    );
};

export default LibraryEditForm;
