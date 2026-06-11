import { useForm } from "react-hook-form";



function AddUser() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submitHandler = async (data) => {
        try {
            const response = await api.post("/users/add", data);

            console.log("Added User:", response.data);

            alert("User Added Successfully");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Add User</h1>

            <form onSubmit={handleSubmit(submitHandler)}>
                <input
                    placeholder="First Name"
                    {...register("firstName", {
                        required: true,
                    })}
                />

                {errors.firstName && (
                    <p>Name Required</p>
                )}

                <br />
                <br />

                <input
                    placeholder="Email"
                    {...register("email", {
                        required: true,
                    })}
                />

                <br />
                <br />

                <input
                    placeholder="Age"
                    {...register("age")}
                />

                <br />
                <br />

                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default AddUser;