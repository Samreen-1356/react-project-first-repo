import { useEffect, useState } from "react";
import api from "../services/api";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

function PostsChart() {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        api.get("/users?limit=50").then((res) => {
            const users = res.data.users;

            const bloodGroups = {};

            users.forEach((user) => {
                bloodGroups[user.bloodGroup] =
                    (bloodGroups[user.bloodGroup] || 0) + 1;
            });

            const data = Object.keys(bloodGroups).map(
                (group) => ({
                    bloodGroup: group,
                    count: bloodGroups[group],
                })
            );

            setChartData(data);
        });
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h1>Blood Group Distribution</h1>

            <ResponsiveContainer
                width="100%"
                height={400}
            >
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="bloodGroup" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="count"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default PostsChart;