import { Button, Card, Typography } from "@material-tailwind/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import StudentForm from "../../components/forms/StudentForm";
import { useState } from "react";
import { toast } from "react-toastify";

const TABLE_HEAD = ["Roll No", "Name", "class", ""];

export function StudentsScreen() {

    const [formActive, setFormActive] = useState(false);
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["students"],
        queryFn: async () => {
            return (await fetch("http://localhost:5050/student/view")).json()
        }

    })

    const handleDelete = (id) => {

        if (!confirm("do you want to delete ?")) return

        fetch(`http://localhost:5050/student/delete/:${id}` , {
            method : "DELETE"
        }).then((res) => {
            if (res.ok) {
                refetch()
                toast.success("student data deleted");
            }
            else toast.error("Error while deleting studnet data")
        })
    }


    if (isLoading) return <h1>Loading...</h1>

    return (
        <Card className="h-full w-full bg-transparent">
            <Typography className="h-20 px-3 py-5 text-lg font-semibold">Student details</Typography>
            <div className="w-full px-2">
                {
                    formActive && <StudentForm refetch={refetch} />
                }
            </div>
            <div className="w-4/5 h-14  grid items-start justify-items-end">
                <Button className={`${formActive ? "bg-red-500" : "bg-black"} "rounded"`} onClick={() => setFormActive(pre => !pre)}>{formActive ? "cancel" : "New record"}</Button>
            </div>
            <table className="w-1/2 min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th
                                key={head}
                                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map(({ _id, roll_no, name, class_of }, index) => {
                        const isLast = index === data.length - 1;
                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                        return (
                            <tr key={index}>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {roll_no}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {name}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {class_of}
                                    </Typography>
                                </td>

                                <td className={classes}>
                                    <Typography
                                        as="a"
                                        href="#"
                                        variant="small"
                                        color="blue-gray"
                                        className="font-medium"
                                    >
                                        Edit
                                    </Typography>
                                </td>

                                <td className={classes}>
                                    <Typography
                                        as="a"
                                        href="#"
                                        variant="small"
                                        color="blue-gray"
                                        className="font-medium text-red-500"
                                        onClick={() => handleDelete(_id)}
                                    >
                                        Delete
                                    </Typography>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Card>
    );
}