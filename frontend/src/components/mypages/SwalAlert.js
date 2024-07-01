import React from "react";
import Swal from "sweetalert2";

export const SwalAlert = (message, icon = "error", title = "", text = "") => {
  Swal.fire({
    title: message,
    text: text,
    icon: icon,
  });
};
