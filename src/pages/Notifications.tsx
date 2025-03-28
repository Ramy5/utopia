import React, { useEffect, useState } from "react";
import Sidebar from "../components/atoms/Sidebar/Sidebar";
import { FaArrowRightLong } from "react-icons/fa6";
import Notification from "../components/notification/Notification";
import { apiRequest } from "../utils/axios";
import { useAuth } from "../context/AuthContext";
import FormatDate from "../utils/FormatDate";
import { toast } from "react-toastify";
import { t } from "i18next";
import { Link } from "react-router-dom";

const Notifications = () => {
  const { clearAuth, role, user, token } = useAuth();
  const [notificationState, setNotificationState] = useState([]);
  const getAllNotifications = async () => {
    try {
      const data: any = await apiRequest({
        url: "/api/student/notifications",
        method: "GET",
        token,
      });
      setNotificationState(data?.data);
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  const notifications = notificationState?.map((notification: any) => {
    const date = new Date(notification?.created_at?.replace(" ", "T"));

    return {
      title: notification?.title,
      message: notification?.description,
      type: notification?.type,
      id: notification?.id,
      date: FormatDate(date),
      isHighlighted: !!!notification?.is_read,
      // notification?.notifiable_id
      // notification?.notifiable_type
    };
  });

  const deleteNotification = async (notificationId: number | string) => {
    try {
      await apiRequest({
        url: "/api/student/delete-notification",
        method: "POST",
        data: {
          id: notificationId,
        },
        token,
      });

      getAllNotifications();
      toast.success(t("notification was deleted successfully"));
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getAllNotifications();
      //   fetchRequests();
    }
  }, []);
  return (
    <Sidebar className="animate_from_left">
      <div>
        <div
          style={{ gridTemplateColumns: "20px 1fr" }}
          className="grid items-center justify-center py-3"
        >
          <Link to="/">
            <FaArrowRightLong className="cursor-pointer justify-self-start" />
          </Link>
          <h4 className="text-center">{t("notifications")}</h4>
        </div>
        <div style={{ height: "calc(100vh - 105px)" }} className="py-4">
          {notifications?.map((notification) => (
            <Notification
              onDelete={deleteNotification}
              key={notification?.id}
              {...notification}
            />
          ))}
        </div>
      </div>
    </Sidebar>
  );
};

export default Notifications;
