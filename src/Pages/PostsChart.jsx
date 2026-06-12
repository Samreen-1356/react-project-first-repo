import { useEffect, useState } from "react";
import api from "../services/api";

import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

function PostsChart() {
    const [chartData, setChartData] = useState([]);
    const [ageData, setAgeData] = useState([]);

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
            const ageGroups = {
                "0-20": 0,
                "21-40": 0,
                "41-60": 0,
                "61+": 0,
            };

            users.forEach((user) => {
                if (user.age <= 20) ageGroups["0-20"]++;
                else if (user.age <= 40) ageGroups["21-40"]++;
                else if (user.age <= 60) ageGroups["41-60"]++;
                else ageGroups["61+"]++;
            });

            const ageChartData = Object.keys(ageGroups).map(
                (group) => ({
                    ageGroup: group,
                    count: ageGroups[group],
                })
            );

            setAgeData(ageChartData);
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
            <h1>Age Group Distribution</h1>

            <ResponsiveContainer
                width="100%"
                height={400}
            >
                <LineChart data={ageData}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="ageGroup" />

                    <YAxis />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="count"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default PostsChart;