import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

function Settings() {
    const [notifications, setNotifications] =
        useState(false);

    const { t, i18n } = useTranslation();

    useEffect(() => {
        const savedValue =
            localStorage.getItem("notifications");

        if (savedValue !== null) {
            setNotifications(
                JSON.parse(savedValue)
            );
        }
    }, []);

    const handleToggle = () => {
        const newValue = !notifications;

        setNotifications(newValue);

        localStorage.setItem(
            "notifications",
            JSON.stringify(newValue)
        );
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>{t("settings")}</h1>
            <h3>Language</h3>

            <select
                onChange={(e) =>
                    i18n.changeLanguage(e.target.value)
                }
            >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
            </select>

            <h3>Notifications</h3>

            <label>
                <input
                    type="checkbox"
                    checked={notifications}
                    onChange={handleToggle}
                />

                {t("notifications")}
            </label>
        </div>
    );
}

export default Settings;