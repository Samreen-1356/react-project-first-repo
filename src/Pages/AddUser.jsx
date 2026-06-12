import { useForm } from "react-hook-form";



function AddUser() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submitHandler = async (data) => {
        data.id = Date.now();
        try {

            const existingUsers =
                JSON.parse(localStorage.getItem("users")) || [];

            localStorage.setItem(
                "users",
                JSON.stringify([data, ...existingUsers])
            );
            alert("User added successfully");

        } catch (error) {
            console.log(error);
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
                    type="email"
                    {...register("email", {
                        required: true,
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    })}
                />

                {errors.email && <p>Email is invalid</p>}

                <br />
                <br />

                <input
                    type="number"
                    {...register("age", {
                        required: true,
                        min: 1,
                        max: 100,
                    })}
                />

                {errors.age && <p>Enter valid age</p>}

                <br />
                <br />

                <select
                    {...register("gender", {
                        required: true,
                    })}
                >
                    <option value="">
                        Select Gender
                    </option>

                    <option value="male">
                        Male
                    </option>

                    <option value="female">
                        Female
                    </option>
                </select>

                {errors.gender && (
                    <p>Gender Required</p>
                )}

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